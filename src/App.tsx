import { Suspense, lazy } from "react";

const Navbar = lazy(() => import("./components/ui/Navbar"));
const Hero = lazy(() => import("./components/sections/Hero"));
const About = lazy(() => import("./components/sections/About"));
const Experience = lazy(() => import("./components/sections/Experience"));
const Skills = lazy(() => import("./components/sections/Skills"));
const Projects = lazy(() => import("./components/sections/Projects"));
const Testimonials = lazy(() => import("./components/sections/Testimonials"));
const Contact = lazy(() => import("./components/sections/Contact"));
const Footer = lazy(() => import("./components/sections/Footer"));
const Background = lazy(() => import("./components/BackgroundAnimation"));
const CustomCursor = lazy(() => import("./components/ui/CustomCursor"));
const ScrollProgress = lazy(() => import("./components/ui/ScrollProgress"));

function App() {
  return (
    <div className="min-h-screen text-white">
      <Suspense
        fallback={
          <div className="flex items-center justify-center px-4 h-16 gap-2">
            Loading
            <div className="dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        }
      >
        <Background />
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Testimonials />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
}
export default App;
