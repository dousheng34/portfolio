"use client";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";

export default function Scene3D() {
        return (
                  <div className="absolute inset-0 z-0">
                        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                                <ambientLight intensity={0.5} />
                                <Environment preset="city" />
                                <Float speed={2}>
                                          <mesh>
                                                      <icosahedronGeometry args={[1, 1]} />
                                                      <MeshTransmissionMaterial thickness={0.5} anisotropy={0.1} chromaticAberration={0.1} />
                                          /mesh>mesh>
                                </loat>Float>
                        </nvas>Canvas>
                  </iv>div>
                );
}</div>
