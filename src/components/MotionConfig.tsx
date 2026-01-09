import { LazyMotion, domAnimation } from "framer-motion";
import { ReactNode } from "react";

interface MotionConfigProps {
  children: ReactNode;
}

/**
 * LazyMotion wrapper to reduce Framer Motion bundle size
 * Only loads the essential DOM animation features
 */
function MotionConfig({ children }: MotionConfigProps) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}

export default MotionConfig;
