import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  Text,
  RoundedBox,
  Torus,
  Cylinder,
} from "@react-three/drei";
import * as THREE from "three";

function TechyShape() {
  const centralCoreRef = useRef<THREE.Mesh>(null!);
  const orbitRingRef = useRef<THREE.Group>(null!);
  const dataRingsRef = useRef<THREE.Group>(null!);
  const hologramRef = useRef<THREE.Mesh>(null!);
  const lightRef = useRef<THREE.DirectionalLight>(null!);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Central core pulsing and rotation
    if (centralCoreRef.current) {
      centralCoreRef.current.rotation.y = time * 0.8;
      centralCoreRef.current.rotation.x = Math.sin(time * 0.5) * 0.3;
      const scale = 1 + Math.sin(time * 2) * 0.1;
      centralCoreRef.current.scale.setScalar(scale);
    }

    // Orbit rings rotation
    if (orbitRingRef.current) {
      orbitRingRef.current.rotation.y = time * 0.6;
      orbitRingRef.current.rotation.z = time * 0.4;
    }

    // Data rings counter rotation
    if (dataRingsRef.current) {
      dataRingsRef.current.rotation.y = -time * 1.2;
      dataRingsRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
    }

    // Hologram flickering
    if (hologramRef.current) {
      const material = hologramRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.3 + Math.sin(time * 8) * 0.2;
      hologramRef.current.position.y = Math.sin(time * 2) * 0.2;
    }

    // Dynamic lighting
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(time * 0.7) * 3;
      lightRef.current.position.z = Math.cos(time * 0.7) * 3;
      lightRef.current.intensity = 1.5 + Math.sin(time * 3) * 0.3;
    }
  });

  const circuitParticles = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(500 * 3);
    const colors = new Float32Array(500 * 3);

    for (let i = 0; i < 500; i++) {
      // Create circuit-like grid positions
      const angle = (i / 500) * Math.PI * 2 * 8;
      const radius = 2 + Math.random() * 4;
      positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] =
        Math.sin(angle) * radius + (Math.random() - 0.5) * 0.5;

      // Tech colors: cyan, green, blue
      colors[i * 3] = Math.random() * 0.3; // R
      colors[i * 3 + 1] = 0.5 + Math.random() * 0.5; // G
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geometry;
  }, []);

  const binaryTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 512, 512);

    ctx.fillStyle = "#00ff41";
    ctx.font = "10px monospace";

    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const binary = Math.random() > 0.5 ? "1" : "0";
      ctx.fillText(binary, x, y);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    return texture;
  }, []);

  return (
    <>
      {/* Tech-themed lighting */}
      <ambientLight intensity={0.2} color="#001122" />
      <directionalLight
        ref={lightRef}
        position={[3, 3, 3]}
        intensity={1.5}
        color="#00ffff"
      />
      <pointLight position={[-3, -3, 3]} intensity={1} color="#00ff41" />
      <pointLight position={[3, -3, -3]} intensity={0.8} color="#0080ff" />

      {/* Circuit-like particle system */}
      <points geometry={circuitParticles}>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation={true}
        />
      </points>

      {/* Central tech core */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh ref={centralCoreRef}>
          <RoundedBox args={[1.5, 1.5, 1.5]} radius={0.1} smoothness={4}>
            <meshStandardMaterial
              color="#001122"
              metalness={0.9}
              roughness={0.1}
              emissive="#003366"
              emissiveIntensity={0.5}
            />
          </RoundedBox>

          {/* Core details */}
          {[...Array(6)].map((_, i) => (
            <mesh key={i} position={[0, 0, 0.76]}>
              <ringGeometry args={[0.3, 0.4, 8]} />
              <meshBasicMaterial color="#00ffff" transparent opacity={0.6} />
            </mesh>
          ))}
        </mesh>
      </Float>

      {/* Orbiting data rings */}
      <group ref={orbitRingRef}>
        <Torus args={[2.5, 0.05, 16, 100]} position={[0, 0, 0]}>
          <meshBasicMaterial color="#00ff41" transparent opacity={0.7} />
        </Torus>
        <Torus
          args={[3, 0.03, 16, 100]}
          position={[0, 0, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshBasicMaterial color="#0080ff" transparent opacity={0.5} />
        </Torus>
      </group>

      {/* Counter-rotating data streams */}
      <group ref={dataRingsRef}>
        <Torus args={[3.5, 0.02, 16, 100]} rotation={[0, 0, Math.PI / 4]}>
          <meshBasicMaterial color="#ffff00" transparent opacity={0.4} />
        </Torus>
        <Torus args={[4, 0.015, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
          <meshBasicMaterial color="#ff0080" transparent opacity={0.3} />
        </Torus>
      </group>

      {/* Holographic display */}
      <mesh ref={hologramRef} position={[0, 2, 0]}>
        <planeGeometry args={[2, 1]} />
        <meshBasicMaterial
          map={binaryTexture}
          transparent
          opacity={0.4}
          color="#00ff41"
        />
      </mesh>

      {/* Tech nodes */}
      {[
        {
          pos: [2.5, 1, 1.5] as [number, number, number],
          color: "#00ffff",
          shape: "box",
        },
        {
          pos: [-2, -1.5, 2] as [number, number, number],
          color: "#00ff41",
          shape: "cylinder",
        },
        {
          pos: [1.5, -2, -2.5] as [number, number, number],
          color: "#0080ff",
          shape: "box",
        },
        {
          pos: [-3, 2, -1] as [number, number, number],
          color: "#ffff00",
          shape: "cylinder",
        },
      ].map((node, i) => (
        <Float
          key={i}
          speed={1.5 + i * 0.3}
          rotationIntensity={0.5}
          floatIntensity={0.4}
        >
          <mesh position={node.pos} scale={[0.3, 0.3, 0.3]}>
            {node.shape === "box" ? (
              <RoundedBox args={[1, 1, 1]} radius={0.1} smoothness={2}>
                <meshStandardMaterial
                  color={node.color}
                  metalness={0.8}
                  roughness={0.2}
                  emissive={node.color}
                  emissiveIntensity={0.3}
                />
              </RoundedBox>
            ) : (
              <Cylinder args={[0.5, 0.5, 1, 8]}>
                <meshStandardMaterial
                  color={node.color}
                  metalness={0.9}
                  roughness={0.1}
                  emissive={node.color}
                  emissiveIntensity={0.2}
                />
              </Cylinder>
            )}
          </mesh>
        </Float>
      ))}

      {/* Floating tech text */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <Text
          position={[0, -3, 0]}
          fontSize={0.3}
          color="#00ffff"
          anchorX="center"
          anchorY="middle"
        >
          {"< ISLAM HAFEZ />"}
        </Text>
      </Float>
    </>
  );
}

export default function HeroShape() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <TechyShape />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
