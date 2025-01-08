// src/components/Cube.tsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type CubeProps = {
  width?: number;
  height?: number;
  theme?: 'dark' | 'light';
};

const Cube: React.FC<CubeProps> = ({ 
  width = 400, 
  height = 400, 
  theme = 'dark'
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const cursorLightRef = useRef<THREE.PointLight | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(3, 3, 3);
    
    // Material changes only for light mode, keeping dark mode exactly the same
    const material = new THREE.MeshPhysicalMaterial(
      theme === 'dark' 
        ? {
            color: 0x000000,
            metalness: 1,
            roughness: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.4,
            fog: true
          }
        : {
            color: 0x9333EA,         // purple-600 from Tailwind color palette
            metalness: 0.7,
            roughness: 0.0,
            clearcoat: 1.0,
            clearcoatRoughness: 0.0,
            fog: true,
            reflectivity: 1,
            transmission: 0,
            transparent: false,
            envMapIntensity: 2
          }
    );
    
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: theme === 'dark' ? 0x000000 : 0xffffff,  // Pure white edges in light mode
      linewidth: 0,
      transparent: theme === 'dark' ? false : true,
      opacity: theme === 'dark' ? 1 : 0.2,  // Very subtle edges in light mode
      fog: true
    });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    cube.add(wireframe);

    // Light setup - keep dark mode exactly the same, make light mode bright with more purple
    const mainLight = new THREE.PointLight(
      theme === 'dark' ? 0x6366f1 : 0xffffff,  // More noticeable purple
      theme === 'dark' ? 300 : 500,
      100
    );
    mainLight.position.set(5, 5, 3);
    scene.add(mainLight);

    const lightGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const lightMaterial = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x6366f1 : 0xe2d9ff,  // More noticeable purple
      transparent: true,
      opacity: theme === 'dark' ? 0.5 : 0.2,
      fog: true
    });
    const lightSphere = new THREE.Mesh(lightGeometry, lightMaterial);
    lightSphere.position.copy(mainLight.position);
    scene.add(lightSphere);

    const secondaryLight = new THREE.PointLight(
      theme === 'dark' ? 0x6366f1 : 0xe2d9ff,  // More noticeable purple
      theme === 'dark' ? 100 : 300,
      100
    );
    secondaryLight.position.set(-3, 2, 3);
    scene.add(secondaryLight);

    const ambientLight = new THREE.AmbientLight(
      theme === 'dark' ? 0x6366f1 : 0xe2d9ff,  // More noticeable purple
      theme === 'dark' ? 0.3 : 0.6
    );
    scene.add(ambientLight);

    const cursorLight = new THREE.PointLight(
      theme === 'dark' ? 0x6366f1 : 0xe2d9ff,  // More noticeable purple
      theme === 'dark' ? 150 : 250,
      10
    );
    cursorLight.position.set(0, 0, 5);
    scene.add(cursorLight);
    cursorLightRef.current = cursorLight;

    // Rest of the existing code remains exactly the same
    const handleMouseMove = (event: MouseEvent) => {
      if (!cursorLightRef.current || !mount) return;

      const rect = mount.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      cursorLightRef.current.position.set(x * 5, y * 5, 5);
    };

    mount.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.005;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

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
  }, [theme, width, height]);

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