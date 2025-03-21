import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

// Define the type for a template item
interface Template {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
}

const featuredTemplates: Template[] = [
  {
    id: "1",
    title: "Modern Minimal",
    imageUrl: "https://picsum.photos/seed/1/500/300",
    description: "A clean template with modern minimalist style.",
  },
  {
    id: "2",
    title: "Creative Studio",
    imageUrl: "https://picsum.photos/seed/2/500/300",
    description: "A vibrant template for creative projects.",
  },
  {
    id: "3",
    title: "Dynamic Grid",
    imageUrl: "https://picsum.photos/seed/3/500/300",
    description: "A template focused on fluid grid layouts.",
  },
  {
    id: "4",
    title: "Sleek Portfolio",
    imageUrl: "https://picsum.photos/seed/4/500/300",
    description: "Showcase your work with this sleek design.",
  },
  {
    id: "5",
    title: "Bold & Brassy",
    imageUrl: "https://picsum.photos/seed/5/500/300",
    description: "Make an impact with a bold visual statement.",
  },
];

const FeaturedTemplatesCarousel: React.FC = () => {
  // State to manage current page in the carousel (each page shows a set of items)
  const [currentPage, setCurrentPage] = useState<number>(0);
  // State to determine how many items to show per page based on viewport width
  const [itemsPerPage, setItemsPerPage] = useState<number>(1);
  // Direction of animation: 1 for next, -1 for previous
  const [slideDirection, setSlideDirection] = useState<number>(0);

  // Update the itemsPerPage state when the window resizes
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsPerPage(3);
      } else if (width >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Adjust currentPage if itemsPerPage change makes the current page invalid
  useEffect(() => {
    const totalPages = Math.ceil(featuredTemplates.length / itemsPerPage);
    if (currentPage >= totalPages) {
      setCurrentPage(Math.max(totalPages - 1, 0));
    }
  }, [itemsPerPage, currentPage]);

  const totalPages = Math.ceil(featuredTemplates.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const displayedTemplates = featuredTemplates.slice(startIndex, startIndex + itemsPerPage);

  // Framer Motion variants for slide animation. The animation slides in from left or right depending on direction.
  const variants: Variants = {
    initial: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 50 : -50,
    }),
    animate: { opacity: 1, x: 0 },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -50 : 50,
    }),
  };

  // Handler for navigating to the previous page
  const handlePrev = () => {
    if (currentPage > 0) {
      setSlideDirection(-1);
      setCurrentPage((prev) => Math.max(prev - 1, 0));
    }
  };

  // Handler for navigating to the next page
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setSlideDirection(1);
      setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
    }
  };

  return (
    <div className="w-full px-4 py-6">
      <h2 className="mb-4 text-2xl font-arial-sans-serif font-semibold text-[#34495e]">
        Featured Templates
      </h2>
      <div className="relative">
        {/* Carousel Content */}
        <AnimatePresence custom={slideDirection} initial={false} mode="wait">
          <motion.div
            key={currentPage}
            custom={slideDirection}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex gap-4"
          >
            {displayedTemplates.map((template) => (
              <div key={template.id} style={{ flex: `0 0 ${100 / itemsPerPage}%` }}>
                <Card className="rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={template.imageUrl}
                    alt={template.title}
                    className="h-40 w-full object-cover rounded-t-lg"
                  />
                  <CardContent className="p-4">
                    <CardTitle className="mb-2 text-xl font-arial-sans-serif text-[#34495e]">
                      {template.title}
                    </CardTitle>
                    <p className="text-base font-helvetica-sans-serif text-[#34495e]">
                      {template.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {totalPages > 1 && (
          <>
            <button
              aria-label="Previous templates"
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="absolute left-0 top-1/2 z-10 transform -translate-y-1/2 bg-[#3498db] p-2 rounded-full text-white focus:outline-none transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              aria-label="Next templates"
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              className="absolute right-0 top-1/2 z-10 transform -translate-y-1/2 bg-[#3498db] p-2 rounded-full text-white focus:outline-none transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FeaturedTemplatesCarousel;