"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Slow rotation
    meshRef.current.rotation.y = t * 0.1;
    meshRef.current.rotation.z = t * 0.05;

    // Slight floating motion
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.2;
    
    // Subtle reaction to mouse
    const mouseX = (state.pointer.x * window.innerWidth) / 2;
    const mouseY = (state.pointer.y * window.innerHeight) / 2;
    
    meshRef.current.position.x += (state.pointer.x * 2 - meshRef.current.position.x) * 0.02;
  });

  return (
    <Sphere 
      ref={meshRef} 
      args={[1, 64, 64]} 
      scale={hovered ? 1.5 : 1.2}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      position={[0, 0, 0]}
    >
      <MeshDistortMaterial 
        color={hovered ? "#ff2a9d" : "#1a5cff"} 
        envMapIntensity={0.8} 
        clearcoat={1} 
        clearcoatRoughness={0} 
        metalness={0.8}
        roughness={0.1}
        distort={0.4} 
        speed={hovered ? 4 : 1.5} 
        transparent
        opacity={0.15}
      />
    </Sphere>
  );
}

export default function ThreeCanvas() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#1a5cff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ff2a9d" />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}
