
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LogIn, Menu, X, User, Bell, LogOut, Search, Calendar, Share2 } from "lucide-react";

export default function Navbar({ searchQuery, setSearchQuery, showSearch, setShowSearch, isDarkMode, toggleDarkMode }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [notifications, setNotifications] = useState([]);
  const searchRef = React.useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowSearch]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
    const recentEvents = storedEvents
      .filter(event => {
        const eventDate = new Date(event.date);
        const now = new Date();
        const threeDaysAgo = new Date(now.setDate(now.getDate() - 3));
        return new Date(event.date) >= threeDaysAgo;
      })
      .map(event => ({
        id: event.id,
        title: event.title,
        message: `New event: ${event.title} on ${new Date(event.date).toLocaleDateString()}`,
        date: event.date
      }));

    setNotifications(recentEvents);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logged Out Successfully",
      description: "See you next time!",
      duration: 3000,
    });
    navigate("/login");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'SKIT Event Management System',
        text: 'Check out these amazing events!',
        url: window.location.href,
      })
      .then(() => {
        toast({
          title: "Shared Successfully",
          description: "Thanks for sharing!",
          duration: 2000,
        });
      })
      .catch(() => {
        toast({
          title: "Share Cancelled",
          description: "No worries, maybe next time!",
          variant: "destructive",
          duration: 2000,
        });
      });
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const addToCalendar = (event) => {
    const startDate = new Date(event.date);
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 2);

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate.toISOString().replace(/-|:|\.\d\d\d/g, "")}/${endDate.toISOString().replace(/-|:|\.\d\d\d/g, "")}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.venue)}`;
    
    window.open(calendarUrl, '_blank');
    
    toast({
      title: "Calendar Event Created",
      description: "Event has been added to your calendar",
      duration: 2000,
    });
  };

  return (
    <nav className={`fixed left-0 right-0 top-0 z-50 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white'} shadow-md transition-colors duration-300`}>
      {/* Rest of the Navbar component code remains exactly the same */}
    </nav>
  );
}
