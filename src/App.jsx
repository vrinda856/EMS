
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { LogIn, Menu, X, User, Bell, Search, LogOut } from "lucide-react";
import UpcomingEvents from "@/components/UpcomingEvents";
import ImageSlideshow from "@/components/ImageSlideshow";
import RegistrationForm from "@/components/RegistrationForm";
import LoginForm from "@/components/LoginForm";
import SignUpForm from "@/components/SignUpForm";
import UserProfile from "@/components/UserProfile";
import AddEventForm from "@/components/AddEventForm";
import FacultyDashboard from "@/components/FacultyDashboard";
import Footer from "@/components/Footer";

const categories = [
  { id: "all", name: "All Events" },
  { id: "seminar", name: "Seminars" },
  { id: "workshop", name: "Workshops" },
  { id: "hackathon", name: "Hackathons" },
  { id: "quiz", name: "Quizzes" },
  { id: "talkshow", name: "Talk Shows" },
  { id: "bootcamp", name: "Bootcamps" }
];

const defaultEvents = [
  {
    id: 1,
    title: "Web Development Workshop",
    category: "workshop",
    date: "2025-05-15",
    description: "Learn modern web development techniques from industry experts",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    time: "10:00 AM",
    venue: "Computer Lab 1",
    organizedBy: "Computer Science Department"
  },
  {
    id: 2,
    title: "AI & Machine Learning Seminar",
    category: "seminar",
    date: "2025-05-20",
    description: "Explore the latest trends in AI and Machine Learning",
    image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c",
    time: "2:00 PM",
    venue: "Seminar Hall",
    organizedBy: "AI Research Club"
  },
  {
    id: 3,
    title: "College Hackathon 2025",
    category: "hackathon",
    date: "2025-06-01",
    description: "24-hour coding challenge with amazing prizes",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    time: "9:00 AM",
    venue: "Main Auditorium",
    organizedBy: "Coding Club"
  }
];

function HomePage() {
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
    <div className="min-h-screen bg-gradient-to-br from-[#FFFFFF] to-[#00ACAC]/10">
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 pt-24 sm:px-6 lg:px-8"
      >
        <div className="mb-12 text-center">
          <h1 className="mb-2 text-4xl font-bold text-[#1A2229]">
            SKIT Event Management System
          </h1>
          <p className="text-lg text-[#1A2229]/70">
            Swami Keshvanand Institute of Technology, Management & Gramothan
          </p>
        </div>

        <ImageSlideshow />
        <UpcomingEvents />

        <div className="mb-8 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`transition-all duration-300 ${
                selectedCategory === category.id 
                  ? "bg-[#A94442] text-white hover:bg-[#A94442]/90" 
                  : "border-[#00ACAC] text-[#1A2229] hover:bg-[#00ACAC]/10"
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="event-card"
            >
              <div className="relative">
                <img  
                  alt={`${event.title} event`}
                  className="h-64 w-full object-cover"
                  src={event.image} />
                <span className={`category-badge ${event.category}`}>
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </span>
              </div>
              <div className="bg-white p-6">
                <h3 className="mb-2 text-xl font-bold text-[#1A2229]">{event.title}</h3>
                <p className="mb-4 text-[#1A2229]/70">{event.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#1A2229]/50">{event.date}</span>
                  <Button
                    onClick={() => handleRegister(event)}
                    className="bg-[#00ACAC] text-white transition-all duration-300 hover:bg-[#00ACAC]/90 hover:scale-105"
                  >
                    Register Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}

function Navbar({ searchQuery, setSearchQuery, showSearch, setShowSearch }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [notifications, setNotifications] = useState([]);

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

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img  
                className="h-12 w-auto" 
                alt="SKIT Logo"
                src="/src/images/logo.png" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="/" className="nav-link">Home</a>
                <a href="https://www.skit.ac.in/" className="nav-link">About</a>
                <a href="#" className="nav-link">Contact</a>
                {user?.role === "faculty" && (
                  <a href="/faculty/dashboard" className="nav-link">Dashboard</a>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-[#1A2229] hover:bg-[#00ACAC]/10"
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <Search className="h-5 w-5" />
                </Button>
                <AnimatePresence>
                  {showSearch && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "300px" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="absolute right-0 top-0"
                    >
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search events..."
                        className="w-full rounded-md border border-gray-300 px-4 py-2 pr-10 focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                      />
                      {searchQuery && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setSearchQuery("")}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-[#1A2229] hover:bg-[#00ACAC]/10"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#A94442] text-xs text-white">
                      {notifications.length}
                    </span>
                  )}
                </Button>
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-80 rounded-lg bg-white p-4 shadow-lg"
                    >
                      <h3 className="mb-3 font-semibold text-[#1A2229]">Notifications</h3>
                      <div className="max-h-60 space-y-2 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className="rounded-lg bg-[#00ACAC]/5 p-3 text-sm"
                            >
                              <p className="text-[#1A2229]">{notification.message}</p>
                              <p className="mt-1 text-xs text-[#00ACAC]">
                                {new Date(notification.date).toLocaleDateString()}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-center text-sm text-[#1A2229]/70">
                            No new notifications
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {user ? (
                <>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-[#1A2229] hover:bg-[#00ACAC]/10"
                    onClick={() => navigate("/profile")}
                  >
                    <User className="h-5 w-5" />
                  </Button>
                  <Button
                    onClick={handleLogout}
                    className="bg-[#A94442] text-white hover:bg-[#A94442]/90"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => navigate("/signup")}
                    className="bg-[#00ACAC] text-white hover:bg-[#00ACAC]/90"
                  >
                    Sign Up
                  </Button>
                  <Button
                    onClick={() => navigate("/login")}
                    className="bg-[#A94442] text-white hover:bg-[#A94442]/90"
                  >
                    <LogIn className="mr-2 h-4 w-4" /> Login
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#1A2229]"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a href="/" className="nav-link block">Home</a>
            <a href="#" className="nav-link block">About</a>
            <a href="#" className="nav-link block">Contact</a>
            {user?.role === "faculty" && (
              <a href="/faculty/dashboard" className="nav-link block">Dashboard</a>
            )}
            {user ? (
              <>
                <Button
                  onClick={() => navigate("/profile")}
                  className="mt-2 w-full bg-[#00ACAC] text-white hover:bg-[#00ACAC]/90"
                >
                  <User className="mr-2 h-4 w-4" /> Profile
                </Button>
                <Button
                  onClick={handleLogout}
                  className="mt-2 w-full bg-[#A94442] text-white hover:bg-[#A94442]/90"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigate("/signup")}
                  className="mt-2 w-full bg-[#00ACAC] text-white hover:bg-[#00ACAC]/90"
                >
                  Sign Up
                </Button>
                <Button
                  onClick={() => navigate("/login")}
                  className="mt-2 w-full bg-[#A94442] text-white hover:bg-[#A94442]/90"
                >
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function PrivateRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  
  return children;
}

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/register/:eventId" 
          element={
            <PrivateRoute allowedRoles={["student"]}>
              <RegistrationForm />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/faculty/dashboard" 
          element={
            <PrivateRoute allowedRoles={["faculty"]}>
              <FacultyDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/faculty/add-event" 
          element={
            <PrivateRoute allowedRoles={["faculty"]}>
              <AddEventForm />
            </PrivateRoute>
          } 
        />
      </Routes>
    </>
  );
}

export default App;
