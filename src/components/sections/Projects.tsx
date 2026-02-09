import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { ArrowUpRight, Github, ChevronDown, Expand } from "lucide-react";
import "./projects.css";
import { projects } from "../../utils/constants";
import { useReducedMotion, useMediaQuery } from "../../utils/hooks";
import ImageModal from "../ui/ImageModal";

// Configuration constants
const MIN_SWIPE_DISTANCE = 50; // Minimum swipe distance in pixels
const SCROLL_HEIGHT_PER_SLIDE = 40; // vh per slide for scroll sensitivity
const MIN_CONTAINER_HEIGHT = 150; // Minimum container height in vh

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const touchRef = useRef<{ start: number | null; end: number | null }>({
    start: null,
    end: null,
  });
  const loadedImagesRef = useRef<Set<string>>(new Set());
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Scroll progress mapping
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Image preloading effect
  useEffect(() => {
    const preloadIndices = [index - 1, index, index + 1].filter(
      (i) => i >= 0 && i < projects.length,
    );

    preloadIndices.forEach((i) => {
      const imageSrc = projects[i].image;
      if (!loadedImagesRef.current.has(imageSrc)) {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => loadedImagesRef.current.add(imageSrc);
      }
    });
  }, [index]);

  // Smooth scroll progress mapping to index
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setShowScrollHint(false); // Hide hint after first scroll

      // Calculate index based on scroll position
      const newIndex = Math.min(
        Math.floor(latest * projects.length),
        projects.length - 1,
      );
      setIndex((prev) => (newIndex !== prev ? newIndex : prev));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Handle manual navigation (clicking dots/buttons)
  const scrollToSlide = useCallback(
    (i: number) => {
      if (containerRef.current) {
        setShowScrollHint(false);
        const containerTop = containerRef.current.offsetTop;
        const containerHeight = containerRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;

        // Calculate scroll range accounting for viewport height
        // This matches the scrollYProgress calculation with offset ["start start", "end end"]
        const scrollRange = containerHeight - viewportHeight;

        // Target the middle of the slide's progress range for smooth alignment
        const targetProgress = (i + 0.5) / projects.length;
        const targetScroll = containerTop + targetProgress * scrollRange;

        window.scrollTo({
          top: targetScroll,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      }
    },
    [prefersReducedMotion],
  );

  // Touch gesture handlers for mobile
  const onTouchStart = (e: React.TouchEvent) => {
    touchRef.current = { start: e.targetTouches[0].clientX, end: null };
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchRef.current.end = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    const { start, end } = touchRef.current;
    if (start === null || end === null) return;

    const distance = start - end;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;

    if (isLeftSwipe) {
      const newIndex = Math.min(index + 1, projects.length - 1);
      if (newIndex !== index) scrollToSlide(newIndex);
    } else if (isRightSwipe) {
      const newIndex = Math.max(index - 1, 0);
      if (newIndex !== index) scrollToSlide(newIndex);
    }

    touchRef.current = { start: null, end: null };
  };

  const current = projects[index];

  // Empty state handling
  if (!projects.length || !current) {
    return (
      <section className="relative w-full bg-black py-28 min-h-screen flex items-center justify-center">
        <p className="text-white/50 text-xl">No projects to display</p>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      style={{
        height: `${Math.max(projects.length * SCROLL_HEIGHT_PER_SLIDE, MIN_CONTAINER_HEIGHT)}vh`,
      }}
      className="relative w-full bg-black py-28"
      aria-roledescription="carousel"
      aria-label={`Project showcase with ${projects.length} projects`}
      id="projects"
    >
      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Viewing project ${index + 1} of ${projects.length}: ${current.title}`}
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          className={`slider2-container ${isMobile ? "mobile" : ""} h-full w-full`}
          onTouchStart={isMobile ? onTouchStart : undefined}
          onTouchMove={isMobile ? onTouchMove : undefined}
          onTouchEnd={isMobile ? onTouchEnd : undefined}
        >
          {/* Progress Indicator */}
          <div className="slide-counter" aria-hidden="true">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </div>

          {/* Scroll Hint */}
          <AnimatePresence>
            {showScrollHint && !isMobile && (
              <motion.div
                className="scroll-hint"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span>Scroll to explore</span>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ChevronDown className="w-4 h-4 mx-auto mt-2" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Vertical Progress Bar */}
          <div className="progress-bar-container" aria-hidden="true">
            <div
              className="progress-bar-fill"
              style={{ height: `${((index + 1) / projects.length) * 100}%` }}
            />
          </div>

          {/* Background */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`bg-${index}`}
              className="cinematic-bg cursor-pointer group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0.1 : 0.3,
                ease: "easeOut",
              }}
              onClick={() => setIsModalOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsModalOpen(true);
                }
              }}
              aria-label={`View full size image of ${current.title}`}
            >
              <img
                src={current.image}
                alt={current.title}
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <div className="cinematic-overlay group-hover:opacity-90 transition-opacity duration-300" />

              {/* Hover hint */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full">
                  <p className="text-white text-sm font-medium">
                    Click to view full image
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Content */}
          <motion.div className="content-2">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`content-${index}`}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="content-wrapper"
                role="group"
                aria-roledescription="slide"
                aria-label={`Project ${index + 1} of ${projects.length}: ${current.title}`}
              >
                <motion.span
                  className="category-tag-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.5, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: prefersReducedMotion ? 0.05 : 0.15 }}
                >
                  / {current.title}
                </motion.span>

                <motion.h2
                  className="cinematic-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: prefersReducedMotion ? 0.05 : 0.2,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                >
                  {current.title}
                </motion.h2>

                <motion.p
                  className="text-base md:text-xl text-white/70 max-w-2xl mb-8 leading-relaxed font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: prefersReducedMotion ? 0.05 : 0.2,
                    delay: prefersReducedMotion ? 0 : 0.05,
                  }}
                >
                  {current.description}
                </motion.p>

                <div className="tech-tags">
                  {current.tech &&
                    current.tech.map((tag: string, i: number) => (
                      <motion.span
                        key={tag}
                        className="tech-tag"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.15,
                          delay: prefersReducedMotion ? 0 : 0.1 + i * 0.02,
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: prefersReducedMotion ? 0.05 : 0.15,
                    delay: prefersReducedMotion ? 0 : 0.1,
                  }}
                >
                  <div className="flex items-center gap-6 pt-4">
                    {current.demo && (
                      <a
                        href={current.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center gap-3 px-8 py-4 bg-white text-black rounded-none overflow-hidden transition-all duration-300 hover:pr-10"
                      >
                        <span className="relative z-10 text-sm font-bold tracking-[0.2em] uppercase">
                          View Project
                        </span>
                        <ArrowUpRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        <div className="absolute inset-0 bg-white z-0" />
                      </a>
                    )}

                    {/* Expand Image Button */}
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="group flex items-center justify-center w-14 h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:border-white hover:scale-110"
                      aria-label="View full image"
                      title="View full image"
                    >
                      <Expand className="w-5 h-5 text-white transition-colors duration-300 group-hover:text-black" />
                    </button>

                    {current.github && (
                      <a
                        href={current.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center w-14 h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:border-white hover:scale-110"
                        aria-label="View Source Code"
                      >
                        <Github className="w-5 h-5 text-white transition-colors duration-300 group-hover:text-black" />
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Navigation */}
          {!isMobile && (
            <nav className="nav-line" aria-label="Project navigation">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => scrollToSlide(i)}
                  className={`nav-item-2 ${i === index ? "active" : ""}`}
                  aria-label={`Go to project: ${p.title}`}
                  aria-current={i === index ? "true" : undefined}
                >
                  <span className="label">{p.title}</span>
                  <div className="line-indicator" />
                </button>
              ))}
            </nav>
          )}

          {/* Mobile pagination */}
          {isMobile && (
            <nav className="mobile-pagination" aria-label="Project navigation">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => scrollToSlide(i)}
                  className={`pagination-dot ${i === index ? "active" : ""}`}
                  aria-label={`Go to project: ${p.title}`}
                  aria-current={i === index ? "true" : undefined}
                  title={p.title}
                />
              ))}
            </nav>
          )}
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={current.image}
        imageAlt={current.title}
      />
    </section>
  );
};

export default Projects;
