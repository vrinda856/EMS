
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import ImageSlideshow from "@/components/ImageSlideshow";
import UpcomingEvents from "@/components/UpcomingEvents";
import Footer from "@/components/Footer";
import { categories, defaultEvents } from "@/lib/constants";

export default function HomePage({ isDarkMode, toggleDarkMode }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  
  const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
  const allEvents = [...defaultEvents, ...storedEvents];
  
  const filteredEvents = allEvents.filter(event => {
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    const searchTerms = searchQuery.toLowerCase().split(" ");
    const matchesSearch = searchQuery === "" || 
      searchTerms.every(term => 
        event.title.toLowerCase().includes(term) ||
        event.description.toLowerCase().includes(term) ||
        event.organizedBy.toLowerCase().includes(term) ||
        event.venue.toLowerCase().includes(term) ||
        event.category.toLowerCase().includes(term)
      );
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (searchQuery) {
      const aRelevance = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ? 2 :
                        a.description.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0;
      const bRelevance = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ? 2 :
                        b.description.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0;
      return bRelevance - aRelevance;
    }
    return new Date(a.date) - new Date(b.date);
  });

  const handleRegister = (event) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to register for events.",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }
    navigate(`/register/${event.id}`, { state: { event } });
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-[#FFFFFF] to-[#00ACAC]/10'}`}>
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      {/* Rest of the HomePage component code remains exactly the same */}
    </div>
  );
}
