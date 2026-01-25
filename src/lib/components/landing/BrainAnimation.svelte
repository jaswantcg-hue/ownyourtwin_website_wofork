<!--
  Brain Animation Component
  3D animated brain/neural network visualization using Three.js
  Creates a futuristic digital twin representation
-->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';

  interface Props {
    /** Animation intensity */
    intensity?: number;
    /** Base color for particles */
    color?: string;
    /** Additional CSS classes */
    class?: string;
  }

  let {
    intensity = 1,
    color = '#8b5cf6',
    class: className = '',
  }: Props = $props();

  let containerRef: HTMLDivElement;
  let animationId: number;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let particles: THREE.Points;
  let connections: THREE.LineSegments;
  let time = 0;

  // Convert hex to RGB
  function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255,
    } : { r: 0.55, g: 0.36, b: 0.96 };
  }

  // Initialize Three.js scene
  function initScene() {
    if (!containerRef) return;

    const width = containerRef.clientWidth;
    const height = containerRef.clientHeight;

    // Scene setup
    scene = new THREE.Scene();

    // Camera setup
    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.appendChild(renderer.domElement);

    // Create brain-like particle system
    createParticles();
    createConnections();

    // Start animation
    animate();

    // Handle resize
    window.addEventListener('resize', handleResize);
  }

  // Create particle system representing neurons
  function createParticles() {
    const particleCount = 800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const rgb = hexToRgb(color);

    // Create brain-shaped distribution
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Spherical distribution with brain-like shape
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.5 + Math.random() * 0.8;

      // Add some variation for brain lobes
      const lobeFactor = Math.sin(phi * 2) * 0.3;

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta) * (1 + lobeFactor);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.8;
      positions[i3 + 2] = radius * Math.cos(phi);

      // Varying colors
      const colorVariation = 0.2 + Math.random() * 0.3;
      colors[i3] = rgb.r * colorVariation + 0.5;
      colors[i3 + 1] = rgb.g * colorVariation + 0.3;
      colors[i3 + 2] = rgb.b * colorVariation + 0.7;

      sizes[i] = Math.random() * 3 + 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom shader material for glowing particles
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: renderer.getPixelRatio() },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float time;
        uniform float pixelRatio;

        void main() {
          vColor = color;

          // Pulsing effect
          float pulse = sin(time * 2.0 + position.x * 3.0) * 0.5 + 0.5;
          vAlpha = 0.6 + pulse * 0.4;

          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * pixelRatio * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          // Circular particle with soft edges
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;

          float alpha = smoothstep(0.5, 0.1, dist) * vAlpha;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
  }

  // Create neural connections between particles
  function createConnections() {
    const connectionCount = 400;
    const positions = particles.geometry.attributes.position.array as Float32Array;
    const linePositions = new Float32Array(connectionCount * 6);
    const lineColors = new Float32Array(connectionCount * 6);

    const rgb = hexToRgb(color);
    const particleCount = positions.length / 3;

    for (let i = 0; i < connectionCount; i++) {
      const i6 = i * 6;

      // Pick two random nearby particles
      const idx1 = Math.floor(Math.random() * particleCount);
      let idx2 = Math.floor(Math.random() * particleCount);

      // Ensure they're relatively close
      const attempts = 10;
      for (let a = 0; a < attempts; a++) {
        idx2 = Math.floor(Math.random() * particleCount);
        const dx = positions[idx1 * 3] - positions[idx2 * 3];
        const dy = positions[idx1 * 3 + 1] - positions[idx2 * 3 + 1];
        const dz = positions[idx1 * 3 + 2] - positions[idx2 * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 1.0) break;
      }

      linePositions[i6] = positions[idx1 * 3];
      linePositions[i6 + 1] = positions[idx1 * 3 + 1];
      linePositions[i6 + 2] = positions[idx1 * 3 + 2];
      linePositions[i6 + 3] = positions[idx2 * 3];
      linePositions[i6 + 4] = positions[idx2 * 3 + 1];
      linePositions[i6 + 5] = positions[idx2 * 3 + 2];

      // Connection colors
      const alpha = 0.3 + Math.random() * 0.2;
      lineColors[i6] = rgb.r * alpha;
      lineColors[i6 + 1] = rgb.g * alpha;
      lineColors[i6 + 2] = rgb.b * alpha;
      lineColors[i6 + 3] = rgb.r * alpha;
      lineColors[i6 + 4] = rgb.g * alpha;
      lineColors[i6 + 5] = rgb.b * alpha;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    connections = new THREE.LineSegments(geometry, material);
    scene.add(connections);
  }

  // Animation loop
  function animate() {
    animationId = requestAnimationFrame(animate);

    time += 0.01 * intensity;

    // Update shader uniforms
    if (particles.material instanceof THREE.ShaderMaterial) {
      particles.material.uniforms.time.value = time;
    }

    // Gentle rotation
    particles.rotation.y = time * 0.1;
    particles.rotation.x = Math.sin(time * 0.2) * 0.1;

    connections.rotation.y = time * 0.1;
    connections.rotation.x = Math.sin(time * 0.2) * 0.1;

    // Breathing effect
    const breathe = 1 + Math.sin(time * 0.5) * 0.05;
    particles.scale.set(breathe, breathe, breathe);
    connections.scale.set(breathe, breathe, breathe);

    renderer.render(scene, camera);
  }

  // Handle window resize
  function handleResize() {
    if (!containerRef || !camera || !renderer) return;

    const width = containerRef.clientWidth;
    const height = containerRef.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  }

  // Cleanup
  function cleanup() {
    if (typeof window === 'undefined') return;

    if (animationId) {
      cancelAnimationFrame(animationId);
    }

    window.removeEventListener('resize', handleResize);

    if (renderer) {
      renderer.dispose();
    }

    if (particles) {
      particles.geometry.dispose();
      (particles.material as THREE.Material).dispose();
    }

    if (connections) {
      connections.geometry.dispose();
      (connections.material as THREE.Material).dispose();
    }
  }

  onMount(() => {
    initScene();
  });

  onDestroy(() => {
    cleanup();
  });
</script>

<div
  bind:this={containerRef}
  class="w-full h-full min-h-[400px] {className}"
  aria-hidden="true"
></div>

<style>
  div :global(canvas) {
    display: block;
  }
</style>
