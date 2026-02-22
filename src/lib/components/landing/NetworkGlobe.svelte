<!--
  NetworkGlobe Component
  Renders a 3D wireframe animated globe on a canvas.
-->
<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    interface Props {
        class?: string;
    }

    let { class: className = "" }: Props = $props();

    let canvas: HTMLCanvasElement;
    let animationId: number;

    onMount(() => {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set internal resolution
        canvas.width = 800;
        canvas.height = 800;

        const points: { x: number; y: number; z: number }[] = [];
        const numPoints = 60;
        const radius = 300;
        let rotation = 0;

        // Generate points on a sphere using Golden Lattice
        for (let i = 0; i < numPoints; i++) {
            const phi = Math.acos(-1 + (2 * i) / numPoints);
            const theta = Math.sqrt(numPoints * Math.PI) * phi;

            points.push({
                x: radius * Math.cos(theta) * Math.sin(phi),
                y: radius * Math.sin(theta) * Math.sin(phi),
                z: radius * Math.cos(phi),
            });
        }

        function project(
            p: { x: number; y: number; z: number },
            angle: number,
        ) {
            // Rotation around Y-axis
            const x = p.x * Math.cos(angle) - p.z * Math.sin(angle);
            const z = p.x * Math.sin(angle) + p.z * Math.cos(angle);

            // Basic perspective projection
            const fieldOfView = 800;
            const scale = fieldOfView / (fieldOfView + z);
            return {
                x: x * scale + 400,
                y: p.y * scale + 400,
                scale: scale,
                z: z,
            };
        }

        function animate() {
            ctx.clearRect(0, 0, 800, 800);
            rotation += 0.003;

            const projectedPoints = points.map((p) => project(p, rotation));

            // Draw connections
            ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
            ctx.lineWidth = 5;

            for (let i = 0; i < projectedPoints.length; i++) {
                for (let j = i + 1; j < projectedPoints.length; j++) {
                    const p1 = projectedPoints[i];
                    const p2 = projectedPoints[j];
                    const dist = Math.sqrt(
                        Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2),
                    );

                    // Only draw lines between points that are relatively close
                    if (dist < 200) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            // Draw nodes
            projectedPoints.forEach((p) => {
                const size = p.scale * 3.5;
                const opacity = Math.min(
                    1,
                    (p.z + radius) / (2 * radius) + 0.2,
                ); // Fading nodes in background but brighter

                ctx.shadowBlur = 8;
                ctx.shadowColor = `rgba(255, 204, 0, ${opacity})`;
                ctx.fillStyle = `rgba(255, 204, 0, ${opacity})`; // More vibrant yellow

                ctx.beginPath();
                ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                ctx.fill();

                ctx.shadowBlur = 0; // reset
            });

            animationId = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            if (animationId) cancelAnimationFrame(animationId);
        };
    });
</script>

<canvas bind:this={canvas} class="w-full h-full aspect-square {className}"
></canvas>
