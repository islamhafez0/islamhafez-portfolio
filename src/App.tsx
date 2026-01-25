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
// const Background = lazy(() => import("./components/BackgroundAnimation"));
const CustomCursor = lazy(() => import("./components/ui/CustomCursor"));
const ScrollProgress = lazy(() => import("./components/ui/ScrollProgress"));
const GitHubContributions = lazy(
  () => import("./components/sections/GitHubContributions"),
);
function App() {
  // const [loadBackground, setLoadBackground] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoadBackground(true);
  //   }, 1500);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div className="min-h-screen transition-colors duration-300">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Skip to main content
      </a>

      {/* {loadBackground && (
        <Suspense fallback={null}>
          <Background />
        </Suspense>
      )} */}

      <Suspense
        fallback={
          <div className="flex items-center justify-center px-4 h-screen gap-2">
            <span className="text-lg">Loading</span>
            <div className="dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        }
      >
        <ScrollProgress />
        <CustomCursor />
        <Navbar />

        <main id="main-content">
          <Hero />
          <About />
          <Experience />
          <Skills />
          <GitHubContributions />
          <Projects />
          <Testimonials />
          <Contact />
        </main>

        <Footer />
      </Suspense>
    </div>
  );
}
export default App;
