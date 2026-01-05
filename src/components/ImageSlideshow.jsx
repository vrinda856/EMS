
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const images = [
  {
    url: "/src/images/img2.jpeg",
    // alt: "Large auditorium filled with students during a seminar"
  },
  {
    url: "/src/images/img1.jpeg",
    // alt: "Students in formal attire gathered for a group photo"
  },
  {
    url: "/src/images/img3.jpeg",
    // alt: "Computer lab session with students engaged in learning"
  },
  {
    url: "/src/images/img4.jpeg",
    // alt: "Students receiving certificates after workshop completion"
  }
];

function ImageSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative mb-12 h-[500px] w-full overflow-hidden rounded-xl">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex].url}
          alt={images[currentIndex].alt}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute h-full w-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8">
        <motion.p
          key={`text-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center text-xl font-semibold text-white"
        >
          {images[currentIndex].alt}
        </motion.p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/40"
        onClick={handlePrevious}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/40"
        onClick={handleNext}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-4" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlideshow;
