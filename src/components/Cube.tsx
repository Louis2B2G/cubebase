// src/components/Cube.tsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type CubeProps = {
  width?: number;
  height?: number;
};

const Cube: React.FC<CubeProps> = ({ width = 400, height = 400 }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const cursorLightRef = useRef<THREE.PointLight | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup - REMOVED background and fog
    const scene = new THREE.Scene();

    // Camera adjustment for better perspective
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    // Renderer setup - ensure transparent background
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true // This makes the background transparent
    });
    renderer.setClearColor(0x000000, 0); // Set clear color to transparent
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // Create a bigger geometry from the start
    const geometry = new THREE.BoxGeometry(3, 3, 3);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x000000,
      metalness: 1,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.4,
      fog: true
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Add white edges to the cube at the same scale
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x000000,
      linewidth: 0,
      fog: true
    });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    cube.add(wireframe);

    // Light setup from top-right
    const mainLight = new THREE.PointLight(0x6366f1, 300, 100);
    mainLight.position.set(5, 5, 3);
    scene.add(mainLight);

    // Add volumetric light effect
    const lightGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const lightMaterial = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.5,
      fog: true
    });
    const lightSphere = new THREE.Mesh(lightGeometry, lightMaterial);
    lightSphere.position.copy(mainLight.position);
    scene.add(lightSphere);

    // Subtle secondary light for balance (blue tint)
    const secondaryLight = new THREE.PointLight(0x6366f1, 100, 100);
    secondaryLight.position.set(-3, 2, 3);
    scene.add(secondaryLight);

    // Ambient light with slight purple tint
    const ambientLight = new THREE.AmbientLight(0x6366f1, 0.3);
    scene.add(ambientLight);

    // Add cursor light with gradient effect
    const cursorLight = new THREE.PointLight(0x6366f1, 150, 10);
    cursorLight.position.set(0, 0, 5);
    scene.add(cursorLight);
    cursorLightRef.current = cursorLight;

    // Add mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      if (!cursorLightRef.current || !mount) return;

      // Convert mouse position to normalized device coordinates (-1 to +1)
      const rect = mount.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Update light position
      cursorLightRef.current.position.set(x * 5, y * 5, 5);
    };

    mount.addEventListener('mousemove', handleMouseMove);

    // Animation loop with fixed rotation axis
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Use quaternion for smoother rotation
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.005;
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mount.removeEventListener('mousemove', handleMouseMove);
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      edges.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: `${width}px`, 
        height: `${height}px` 
      }}
    />
  );
};

export default Cube;