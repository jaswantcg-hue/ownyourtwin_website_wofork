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
  let pulseConnections: THREE.LineSegments;
  let time = 0;
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

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

    // Handle resize and mouse movement
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
  }

  // Handle mouse movement for interactive rotation
  function handleMouseMove(event: MouseEvent) {
    targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
    targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  // Create particle system representing neurons
  function createParticles() {
    const particleCount = 1200;
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
      const radius = 1.2 + Math.random() * 0.6;

      // Create more pronounced brain lobes (left & right hemispheres)
      const lobeFactor = Math.sin(phi * 3) * 0.4 + Math.cos(theta * 2) * 0.2;
      const hemisphereGap = Math.abs(Math.cos(theta)) < 0.1 ? -0.15 : 0;

      // More organic brain shape with wrinkles
      const wrinkleFactor = Math.sin(theta * 5) * Math.cos(phi * 3) * 0.1;

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta) * (1 + lobeFactor) + hemisphereGap;
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.7 + wrinkleFactor;
      positions[i3 + 2] = radius * Math.cos(phi) * (1 + Math.sin(theta * 2) * 0.2);

      // Better color distribution - darker base with gradient
      const distanceFromCenter = Math.sqrt(positions[i3] ** 2 + positions[i3 + 1] ** 2 + positions[i3 + 2] ** 2);
      const normalizedDist = (distanceFromCenter - 1.2) / 0.6;

      // Core is darker, outer is brighter with purple/pink gradient
      const coreBrightness = 0.3 + normalizedDist * 0.4;
      const variation = Math.random() * 0.15;

      colors[i3] = Math.min(1, rgb.r * (coreBrightness + variation));
      colors[i3 + 1] = Math.min(1, rgb.g * (coreBrightness + variation * 0.5));
      colors[i3 + 2] = Math.min(1, rgb.b * (coreBrightness + variation) + 0.2);

      // Smaller particles with variation
      sizes[i] = Math.random() * 2.5 + 0.8;
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

          // Pulsing effect with varied timing
          float pulse = sin(time * 1.5 + position.x * 2.0 + position.z) * 0.3 + 0.7;
          vAlpha = 0.5 + pulse * 0.3;

          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * pixelRatio * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          // Circular particle with soft glow
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          if (dist > 0.5) discard;

          // Stronger falloff for more defined particles
          float alpha = smoothstep(0.5, 0.0, dist) * vAlpha * 0.75;

          // Add inner glow
          float glow = smoothstep(0.5, 0.2, dist);
          vec3 finalColor = vColor * (0.6 + glow * 0.4);

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
  }

  // Create neural connections between particles
  function createConnections() {
    const connectionCount = 600;
    const positions = particles.geometry.attributes.position.array as Float32Array;
    const linePositions = new Float32Array(connectionCount * 6);
    const lineColors = new Float32Array(connectionCount * 6);
    const pulsePositions = new Float32Array(150 * 6);
    const pulseColors = new Float32Array(150 * 6);

    const rgb = hexToRgb(color);
    const particleCount = positions.length / 3;

    for (let i = 0; i < connectionCount; i++) {
      const i6 = i * 6;

      // Pick two random nearby particles
      const idx1 = Math.floor(Math.random() * particleCount);
      let idx2 = Math.floor(Math.random() * particleCount);

      // Ensure they're relatively close for realistic neural connections
      const attempts = 15;
      for (let a = 0; a < attempts; a++) {
        idx2 = Math.floor(Math.random() * particleCount);
        const dx = positions[idx1 * 3] - positions[idx2 * 3];
        const dy = positions[idx1 * 3 + 1] - positions[idx2 * 3 + 1];
        const dz = positions[idx1 * 3 + 2] - positions[idx2 * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 0.8) break;
      }

      linePositions[i6] = positions[idx1 * 3];
      linePositions[i6 + 1] = positions[idx1 * 3 + 1];
      linePositions[i6 + 2] = positions[idx1 * 3 + 2];
      linePositions[i6 + 3] = positions[idx2 * 3];
      linePositions[i6 + 4] = positions[idx2 * 3 + 1];
      linePositions[i6 + 5] = positions[idx2 * 3 + 2];

      // Connection colors - subtle and darker
      const alpha = 0.2 + Math.random() * 0.15;
      lineColors[i6] = rgb.r * alpha * 0.6;
      lineColors[i6 + 1] = rgb.g * alpha * 0.6;
      lineColors[i6 + 2] = rgb.b * alpha * 0.6;
      lineColors[i6 + 3] = rgb.r * alpha * 0.6;
      lineColors[i6 + 4] = rgb.g * alpha * 0.6;
      lineColors[i6 + 5] = rgb.b * alpha * 0.6;
    }

    // Create pulse connections (brighter, animated)
    for (let i = 0; i < 150; i++) {
      const sourceIdx = i * 4;
      const i6 = i * 6;

      pulsePositions[i6] = linePositions[sourceIdx * 6];
      pulsePositions[i6 + 1] = linePositions[sourceIdx * 6 + 1];
      pulsePositions[i6 + 2] = linePositions[sourceIdx * 6 + 2];
      pulsePositions[i6 + 3] = linePositions[sourceIdx * 6 + 3];
      pulsePositions[i6 + 4] = linePositions[sourceIdx * 6 + 4];
      pulsePositions[i6 + 5] = linePositions[sourceIdx * 6 + 5];

      // Brighter pulse colors
      pulseColors[i6] = rgb.r * 0.8;
      pulseColors[i6 + 1] = rgb.g * 0.6;
      pulseColors[i6 + 2] = rgb.b;
      pulseColors[i6 + 3] = rgb.r * 0.8;
      pulseColors[i6 + 4] = rgb.g * 0.6;
      pulseColors[i6 + 5] = rgb.b;
    }

    // Static connections
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.NormalBlending,
    });

    connections = new THREE.LineSegments(geometry, material);
    scene.add(connections);

    // Animated pulse connections
    const pulseGeometry = new THREE.BufferGeometry();
    pulseGeometry.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));
    pulseGeometry.setAttribute('color', new THREE.BufferAttribute(pulseColors, 3));

    const pulseMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      linewidth: 2,
    });

    pulseConnections = new THREE.LineSegments(pulseGeometry, pulseMaterial);
    scene.add(pulseConnections);
  }

  // Animation loop
  function animate() {
    animationId = requestAnimationFrame(animate);

    time += 0.01 * intensity;

    // Smooth mouse tracking
    mouseX += (targetMouseX * 0.3 - mouseX) * 0.05;
    mouseY += (targetMouseY * 0.3 - mouseY) * 0.05;

    // Update shader uniforms
    if (particles.material instanceof THREE.ShaderMaterial) {
      particles.material.uniforms.time.value = time;
    }

    // Interactive rotation with mouse + gentle auto-rotation
    const autoRotationY = time * 0.08;
    const autoRotationX = Math.sin(time * 0.15) * 0.1;

    particles.rotation.y = autoRotationY + mouseX * 0.5;
    particles.rotation.x = autoRotationX + mouseY * 0.3;

    connections.rotation.y = autoRotationY + mouseX * 0.5;
    connections.rotation.x = autoRotationX + mouseY * 0.3;

    // Pulse connections animation
    if (pulseConnections) {
      pulseConnections.rotation.y = autoRotationY + mouseX * 0.5;
      pulseConnections.rotation.x = autoRotationX + mouseY * 0.3;

      // Animated pulse opacity
      const pulseMaterial = pulseConnections.material as THREE.LineBasicMaterial;
      pulseMaterial.opacity = 0.3 + Math.sin(time * 2) * 0.25;
    }

    // Breathing effect
    const breathe = 1 + Math.sin(time * 0.4) * 0.04;
    particles.scale.set(breathe, breathe, breathe);
    connections.scale.set(breathe, breathe, breathe);
    if (pulseConnections) {
      pulseConnections.scale.set(breathe, breathe, breathe);
    }

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
    window.removeEventListener('mousemove', handleMouseMove);

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

    if (pulseConnections) {
      pulseConnections.geometry.dispose();
      (pulseConnections.material as THREE.Material).dispose();
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
