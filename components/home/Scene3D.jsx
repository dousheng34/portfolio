"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

const mouse = { x: 0, y: 0 };

const Core = () => {
    const ref = useRef();
    useFrame(({ clock }) => {
          if (!ref.current) return;
          const t = clock.elapsedTime;
          ref.current.scale.setScalar(1 + Math.sin(t * 2.1) * 0.06);
          ref.current.material.emissiveIntensity = 1.8 + Math.sin(t * 1.4) * 0.6;
    });
    return (
          <mesh ref={ref}>
                  <icosahedronGeometry args={[0.55, 2]} />
                  <meshStandardMaterial
                            color="#1a0aff"
                            emissive="#3b6eff"
                            emissiveIntensity={2.2}
                            roughness={0}
                            metalness={1}
                            toneMapped={false}
                          />
          </mesh>mesh>
        );
};

const Ring = ({ radius, tube, rotSpeed, color, opacity, initialRotation }) => {
    const ref = useRef();
    useFrame(({ clock }) => {
          if (!ref.current) return;
          const t = clock.elapsedTime;

                 ref.current.rotation.x = initialRotation[0] + t * rotSpeed[0];
          ref.current.rotation.y = initialRotation[1] + t * rotSpeed[1];
          ref.current.rotation.z = initialRotation[2] + t * rotSpeed[2];
    });
    return (
          <mesh ref={ref}>
                  <torusGeometry args={[radius, tube, 8, 200]} />
                  <meshBasicMaterial color={color} opacity={opacity} transparent toneMapped={false} />
          </mesh>mesh>
        );
};

const EnergyOrb = ({ position, color, size, speed, amplitude }) => {
    const ref = useRef();
    const origin = useMemo(() => [...position], [position]);
    useFrame(({ clock }) => {
          if (!ref.current) return;
          const t = clock.elapsedTime * speed;
          ref.current.position.set(
                  origin[0] + Math.cos(t * 0.8) * amplitude,
                  origin[1] + Math.sin(t) * amplitude,
                  origin[2] + Math.sin(t * 0.5) * amplitude * 0.5
                );
    });
    return (
          <mesh ref={ref} position={position}>
                  <sphereGeometry args={[size, 16, 16]} />
                  <meshStandardMaterial
                            color={color}
                            emissive={color}
                            emissiveIntensity={3}
                            roughness={0}
                            toneMapped={false}
                          />
          </mesh>mesh>
        );
};

const GlassDroid = () => {
    const groupRef = useRef();
    const rot = useRef({ x: 0, y: 0 });
    useFrame(({ clock }) => {
          if (!groupRef.current) return;
          const t = clock.elapsedTime;
          rot.current.x = THREE.MathUtils.lerp(rot.current.x, -mouse.y * 0.45, 0.05);
          rot.current.y = THREE.MathUtils.lerp(rot.current.y,  mouse.x * 0.45, 0.05);
          groupRef.current.rotation.x = rot.current.x;
          groupRef.current.rotation.y = rot.current.y + t * 0.07;
    });
    return (
          <group ref={groupRef}>
                  <mesh>
                          <icosahedronGeometry args={[1.6, 1]} />
                          <MeshTransmissionMaterial
                                      backside
                                      samples={8}
                                      thickness={0.4}
                         roughness={0.02}
                                      transmission={1}
                                      ior={1.5}
                                      chromaticAberration={0.08}
                                      anisotropy={0.3}
                                      distortion={0.4}
                                      distortionScale={0.4}
                                      temporalDistortion={0.1}
                                      envMapIntensity={1.5}
                                      color="#c0d8ff"
                                      attenuationColor="#1a6aff"
                                      attenuationDistance={2}
                                    />
                  </mesh>mesh>
                <mesh>
                        <icosahedronGeometry args={[1.65, 1]} />
                        <meshBasicMaterial color="#3b6eff" wireframe opacity={0.07} transparent toneMapped={false} />
                </mesh>mesh>
                <Ring radius={2.2} tube={0.004} rotSpeed={[0.3,  0.2,  0]}   color="#3b6eff" opacity={0.5} initialRotation={[0, 0, 0]} />
                <Ring radius={2.5} tube={0.003} rotSpeed={[-0.25, 0, 0.3]}   color="#a855f7" opacity={0.35} initialRotation={[Math.PI / 4, 0, 0]} />
                <Ring radius={2.0} tube={0.003} rotSpeed={[0
                                                           const SceneContents = () => (
                                                               <>
                                                                   <ambientLight intensity={0.08} />
                                                                   <pointLight position={[8,   8,  8]}  intensity={4}   color="#ffffff" />
                                                                   <pointLight position={[-8, -6, -6]}  intensity={2.5} color="#3b6eff" />
                                                                   <pointLight position={[4,  -4,  6]}  intensity={2}   color="#a855f7" />
                                                                   <spotLight position={[0, 14, 4]} intensity={3} color="#60a5fa" angle={0.22} penumbra={1} />
                                                                   <Environment preset="city" />
                                                                   <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.5}>
                                                                         <GlassDroid />
                                                                   </Float>Float>
                                                                   <EnergyOrb position={[ 3.4,  0.5, 0]}  color="#3b6eff" size={0.10} speed={0.7} amplitude={0.28} />
                                                                   <EnergyOrb position={[-3.1, -1.1, 0]}  color="#a855f7" size={0.08} speed={0.5} amplitude={0.22} />
                                                                   <EnergyOrb position={[ 2.6, -2.2, 1]}  color="#06b6d4" size={0.06} speed={1.0} amplitude={0.20} />
                                                                   <EnergyOrb position={[-2.2,  2.4, 0]}  color="#f97316" size={0.05} speed={0.8} amplitude={0.18} />
                                                                   <EnergyOrb position={[ 0.5,  3.0, -1]} color="#22d3ee" size={0.05} speed={0.9} amplitude={0.15} />
                                                                   <EffectComposer multisampling={0}>
                                                                         <Bloom intensity={1.4} luminanceThreshold={0.15} luminanceSmoothing={0.9} mipmapBlur />
                                                                         <Vignette eskil={false} offset={0.15} darkness={0.85} />
                                                                   </EffectComposer>EffectComposer>
                                                               </>>
                                                             );
                                                           
                                                           const Scene3D = ({ isMobile = false }) => {
                                                               const handleMouseMove = (e) => {
                                                                     mouse.x = (e.clientX / window.innerWidth)  * 2 - 1;
                                                                     mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
                                                               };
                                                               return (
                                                                     <div className="absolute inset-0 z-0" onMouseMove={!isMobile ? handleMouseMove : undefined}>
                                                                           <Canvas
                                                                                     camera={{ position: [0, 0, 7], fov: 40 }}
                                                                                     gl={{
                                                                                                 antialias: true,
                                                                                                 alpha: true,
                                                                                                 powerPreference: "high-performance",
                                                                                                 toneMapping: THREE.ACESFilmicToneMapping,
                                                                                                 toneMappingExposure: 1.2,
                                                                                     }}
                                                                                     dpr={[1, isMobile ? 1.5 : 2]}
                                                                                     performance={{ min: 0.5 }}
                                                                                   >
                                                                                   <SceneContents />
                                                                           </Canvas>Canvas>
                                                                     </div>div>
                                                                   );
                                                           };
                                                           
                                                           export default Scene3D;</></mesh>
