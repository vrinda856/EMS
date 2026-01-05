
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function SearchModal({ isOpen, onClose, defaultEvents = [] }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const events = [
        ...JSON.parse(localStorage.getItem("events") || "[]"),
        ...defaultEvents
      ];
      
      const filtered = events.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [searchTerm, defaultEvents]);

  const handleEventClick = (event) => {
    onClose();
    navigate(`/event/${event.id}`, { state: { event } });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-20"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl rounded-xl bg-white p-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center">
              <Search className="mr-2 h-5 w-5 text-[#1A2229]/70" />
              <input
                type="text"
                placeholder="Search events..."
                className="flex-1 border-none bg-transparent text-lg outline-none placeholder:text-[#1A2229]/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-[#1A2229]/70 hover:text-[#1A2229]"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {results.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="cursor-pointer rounded-lg p-4 hover:bg-gray-50"
                  onClick={() => handleEventClick(event)}
                >
                  <h4 className="font-medium text-[#1A2229]">{event.title}</h4>
                  <p className="mt-1 text-sm text-[#1A2229]/70">
                    {event.description}
                  </p>
                  <div className="mt-2 flex items-center text-xs text-[#1A2229]/50">
                    <span className="mr-2 rounded-full bg-[#00ACAC]/10 px-2 py-1 text-[#00ACAC]">
                      {event.category}
                    </span>
                    <span>{event.date}</span>
                  </div>
                </motion.div>
              ))}

              {searchTerm && results.length === 0 && (
                <div className="py-8 text-center text-[#1A2229]/70">
                  No events found
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SearchModal;
