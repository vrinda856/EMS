
import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

function UpcomingEvents() {
  // Get all events from localStorage
  const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
  
  // Sort events by date and get upcoming ones
  const upcomingEvents = [...storedEvents]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .filter(event => new Date(event.date) >= new Date())
    .slice(0, 5); // Show only next 5 upcoming events

  return (
    <div className="mb-12 rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1A2229]">Upcoming Events</h2>
        <Calendar className="h-6 w-6 text-[#00ACAC]" />
      </div>
      <div className="space-y-4">
        {upcomingEvents.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between rounded-lg border border-gray-100 p-4 hover:bg-gray-50"
          >
            <div>
              <h3 className="font-semibold text-[#1A2229]">{event.title}</h3>
              <div className="mt-1 text-sm text-[#1A2229]/70">
                <p>{new Date(event.date).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
                <p>{event.time} • {event.venue}</p>
                <p className="mt-1 text-[#00ACAC]">Organized by: {event.organizedBy}</p>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">
              <div className="rounded-full bg-[#A94442]/10 px-4 py-1 text-sm font-medium text-[#A94442]">
                New Event
              </div>
            </div>
          </motion.div>
        ))}
        {upcomingEvents.length === 0 && (
          <div className="text-center text-[#1A2229]/70">
            No upcoming events at the moment
          </div>
        )}
      </div>
    </div>
  );
}

export default UpcomingEvents;
