
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Plus, LogOut, Users, ChevronDown, ChevronUp, Trash2, Edit, Download } from "lucide-react";

function FacultyDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const events = JSON.parse(localStorage.getItem("events") || "[]");
  const registrations = JSON.parse(localStorage.getItem("registrations") || "[]");
  const user = JSON.parse(localStorage.getItem("user"));
  const [expandedEvent, setExpandedEvent] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const facultyEvents = events.filter(event => event.createdBy === user?.collegeId);

  const getEventRegistrations = (eventId) => {
    return registrations.filter(reg => reg.eventId === eventId);
  };

  const toggleEventExpansion = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    
    // Remove related registrations
    const updatedRegistrations = registrations.filter(reg => reg.eventId !== eventId);
    localStorage.setItem("registrations", JSON.stringify(updatedRegistrations));
    
    toast({
      title: "Event Deleted",
      description: "The event and all its registrations have been removed.",
      duration: 3000,
    });
  };

  const downloadRegistrations = (event) => {
    const eventRegistrations = getEventRegistrations(event.id);
    const csvContent = [
      ["Name", "College ID", "Branch", "Year", "Section", "Email", "Phone", "Registration Date"],
      ...eventRegistrations.map(reg => [
        reg.name,
        reg.collegeId,
        reg.branch,
        reg.year,
        reg.section,
        reg.email,
        reg.phone,
        new Date(reg.registrationDate).toLocaleDateString()
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.title}_registrations.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFFFF] to-[#00ACAC]/10 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#1A2229]">Faculty Dashboard</h1>
          <div className="flex space-x-4">
            <Button
              onClick={() => navigate("/faculty/add-event")}
              className="bg-[#00ACAC] text-white hover:bg-[#00ACAC]/90"
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Event
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-[#A94442] text-[#A94442] hover:bg-[#A94442]/10"
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {facultyEvents.map((event) => {
            const eventRegistrations = getEventRegistrations(event.id);
            const isExpanded = expandedEvent === event.id;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-lg bg-white p-6 shadow-lg"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#1A2229]">{event.title}</h3>
                    <span className="mt-1 inline-block rounded-full bg-[#00ACAC]/10 px-2 py-1 text-xs font-medium text-[#00ACAC]">
                      {eventRegistrations.length} Registrations
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-[#00ACAC] hover:bg-[#00ACAC]/10"
                      onClick={() => navigate(`/faculty/edit-event/${event.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-[#A94442] hover:bg-[#A94442]/10"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mb-4 space-y-2 text-sm text-[#1A2229]/70">
                  <p><strong>Date:</strong> {event.date}</p>
                  <p><strong>Time:</strong> {event.time}</p>
                  <p><strong>Venue:</strong> {event.venue}</p>
                  <p><strong>Category:</strong> {event.category}</p>
                  <p><strong>Organized By:</strong> {event.organizedBy}</p>
                </div>

                {event.poster && (
                  <div className="mb-4">
                    <img 
                      src={event.poster} 
                      alt={`${event.title} poster`}
                      className="h-40 w-full rounded-lg object-cover"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#00ACAC]"
                    onClick={() => toggleEventExpansion(event.id)}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    View Registrations
                    {isExpanded ? (
                      <ChevronUp className="ml-2 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                  {eventRegistrations.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#00ACAC] text-[#00ACAC] hover:bg-[#00ACAC]/10"
                      onClick={() => downloadRegistrations(event)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Export CSV
                    </Button>
                  )}
                </div>

                <AnimatePresence>
                  {isExpanded && eventRegistrations.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 border-t pt-4"
                    >
                      <h4 className="mb-3 font-semibold text-[#1A2229]">Registered Students</h4>
                      <div className="max-h-60 space-y-2 overflow-y-auto">
                        {eventRegistrations.map((registration) => (
                          <motion.div
                            key={registration.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-lg bg-gray-50 p-3 text-sm"
                          >
                            <p className="font-medium text-[#1A2229]">{registration.name}</p>
                            <p className="text-[#1A2229]/70">
                              {registration.branch} - Year {registration.year}, Section {registration.section}
                            </p>
                            <p className="text-[#1A2229]/70">
                              ID: {registration.collegeId}
                            </p>
                            <p className="text-[#1A2229]/70">
                              Contact: {registration.phone}
                            </p>
                            <p className="text-[#1A2229]/70">
                              Email: {registration.email}
                            </p>
                            {registration.clubName && (
                              <p className="text-[#1A2229]/70">
                                Club: {registration.clubName}
                              </p>
                            )}
                            <p className="mt-1 text-xs text-[#00ACAC]">
                              Registered on: {new Date(registration.registrationDate).toLocaleDateString()}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {facultyEvents.length === 0 && (
            <div className="col-span-full text-center text-[#1A2229]/70">
              <p>You haven't created any events yet.</p>
              <Button
                onClick={() => navigate("/faculty/add-event")}
                className="mt-4 bg-[#00ACAC] text-white hover:bg-[#00ACAC]/90"
              >
                <Plus className="mr-2 h-4 w-4" /> Create Your First Event
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FacultyDashboard;
