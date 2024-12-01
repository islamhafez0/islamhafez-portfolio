import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";
import { motion } from "framer-motion";

function StarField() {
  const ref = useRef<any>();
  const sphere = useMemo(
    () =>
      new Float32Array(
        random.inSphere(new Float32Array(5000), { radius: 1.5 })
      ),
    []
  );
  console.log(sphere);
  useFrame((_, delta) => {
    const rotationSpeedX = 0.1;
    const rotationSpeedY = 0.15;
    ref.current.rotation.x -= delta * rotationSpeedX;
    ref.current.rotation.y -= delta * rotationSpeedY;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

const BackgroundAnimation = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
        <StarField />
      </Canvas>
    </div>
  );
};

export default BackgroundAnimation;
