import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMotionValue, useSpring } from "framer-motion";

const Sphere = ({ mouseX, mouseY, isMobile }) => {
  const meshRef = useRef();
  const innerRef = useRef();

  const springX = useSpring(0, { stiffness: 80, damping: 25 });
  const springY = useSpring(0, { stiffness: 80, damping: 25 });

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (isMobile) {
      meshRef.current.rotation.y += 0.004;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    } else {
      const targetRotY =
        (mouseX.get() / window.innerWidth) * Math.PI - Math.PI / 2;
      const targetRotX =
        (mouseY.get() / window.innerHeight) * Math.PI - Math.PI / 2;
      springX.set(targetRotX * 0.4);
      springY.set(targetRotY * 0.4);
      meshRef.current.rotation.x = springX.get();
      meshRef.current.rotation.y = springY.get() + t * 0.1;
    }

    // Subtle pulse scale
    if (innerRef.current) {
      innerRef.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.03);
    }
  });

  return (
    <group ref={meshRef}>
      {/* Main sphere */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#1a0a2e"
          emissive="#b224ef"
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh>
        <sphereGeometry args={[2.02, 24, 24]} />
        <meshBasicMaterial
          color="#00f2fe"
          wireframe
          opacity={0.08}
          transparent
        />
      </mesh>

      {/* Outer glow shell */}
      <mesh>
        <sphereGeometry args={[2.4, 32, 32]} />
        <meshBasicMaterial
          color="#b224ef"
          opacity={0.04}
          transparent
          side={2}
        />
      </mesh>
    </group>
  );
};

const Scene3D = ({ isMobile = false }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <div
      className="absolute inset-0 z-0"
      onMouseMove={!isMobile ? handleMouseMove : undefined}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        <pointLight position={[-8, -8, -8]} intensity={1.2} color="#00f2fe" />
        <pointLight position={[0, 6, -6]} intensity={0.8} color="#b224ef" />
        <Sphere mouseX={mouseX} mouseY={mouseY} isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
