import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PlusCircle, Quote, User } from "lucide-react";
import { useEffect, useState } from "react";
import { getTestimonials } from "../../api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

type Testimonial = {
  name: string;
  job_title: string;
  company: string;
  testimonial: string;
  image: string;
};

const Testimonials = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [isLoading, seIsLoading] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        seIsLoading(true);
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.log(error);
      } finally {
        seIsLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-gray-900/50 backdrop-blur-sm">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-between items-center mb-12 relative">
            <h2 className="text-4xl font-bold text-center">Testimonials</h2>
            <a
              href="https://islamhafez-testimonials.vercel.app/"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
              rel="noopener noreferrer"
              target="_blank"
            >
              <PlusCircle className="w-5 h-5" />
              Add Your Testimonial
            </a>
          </div>

          <div className="max-w-6xl">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true, el: ".custom_bullets" }}
              navigation
              autoplay={{ delay: 5000 }}
              grabCursor={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="pb-12"
            >
              {testimonials?.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <TestimonialCard
                    testimonial={testimonial}
                    index={index}
                    inView={inView}
                    isLoading={isLoading}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="custom_bullets flex items-center justify-center mt-8 gap-1"></div>
          <a
            href="https://islamhafez-testimonials.vercel.app/"
            rel="noopener noreferrer"
            target="_blank"
            className="flex md:hidden mt-12 max-w-[215px] mx-auto items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            Add Your Testimonial
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

const TestimonialSkeleton = () => (
  <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-lg animate-pulse min-h-[216px]">
    <div className="h-4 w-3/4 bg-gray-200 rounded mb-4"></div>
    <div className="h-3 w-2/3 bg-gray-200 rounded mb-6"></div>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gray-200"></div>
      <div className="space-y-2">
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
        <div className="h-3 w-48 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

type TestimonialCardProps = {
  testimonial: Testimonial;
  index: number;
  inView: boolean;
  isLoading: boolean;
};

const TestimonialCard = ({
  testimonial,
  index,
  inView,
  isLoading,
}: TestimonialCardProps) => {
  if (isLoading) {
    return <TestimonialSkeleton />;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-lg relative flex flex-col justify-between min-h-[216px]"
    >
      <Quote className="absolute top-4 right-4 w-8 h-8 text-indigo-800" />

      <p className="text-gray-300 mb-6 italic line-clamp-4">
        "{testimonial.testimonial}"
      </p>

      <div className="flex items-center gap-4">
        {testimonial.image && !testimonial.image.includes("null") ? (
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
            <User className="w-6 h-6 text-gray-500" />
          </div>
        )}

        <div>
          <h3 className="font-semibold">{testimonial.name}</h3>
          <p className="text-sm text-gray-400">
            {testimonial.job_title} at {testimonial.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
