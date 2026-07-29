import { useEffect, useRef } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

// Subtle floating particle field for hero sections. Deliberately minimal:
// a single Points cloud, no post-processing, capped pixel ratio.
export function ParticleBackground({ className, count = 220, color = "#ff5a1f" }) {
  const mountRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color,
      size: 0.045,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let frameId;
    const clock = new THREE.Clock();

    function animate() {
      const t = clock.getElapsedTime();
      points.rotation.y = t * 0.03;
      points.rotation.x = Math.sin(t * 0.05) * 0.08;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }
    animate();

    function handleResize() {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [count, color, reducedMotion]);

  if (reducedMotion) return null;

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
