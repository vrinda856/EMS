
import React from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, MapPin, Users } from "lucide-react";

function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  // Combine default and stored events
  const defaultEvents = JSON.parse(localStorage.getItem("defaultEvents") || "[]");
  const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
  const allEvents = [...defaultEvents, ...storedEvents];
  
  // Find the specific event
  const event = allEvents.find(e => e.id.toString() === eventId);

  if (!event) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1A2229]">Event not found</h2>
          <Button
            onClick={() => navigate("/")}
            className="mt-4 bg-[#00ACAC] text-white hover:bg-[#00ACAC]/90"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFFFF] to-[#00ACAC]/10 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-lg"
        >
          <div className="mb-6 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => window.close()}
              className="text-[#1A2229] hover:bg-[#00ACAC]/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <span className={`category-badge ${event.category}`}>
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </span>
          </div>

          {event.poster && (
            <img
              src={event.poster}
              alt={`${event.title} poster`}
              className="mb-8 h-96 w-full rounded-lg object-cover"
            />
          )}

          <h1 className="mb-4 text-3xl font-bold text-[#1A2229]">{event.title}</h1>

          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-[#00ACAC]" />
              <div>
                <p className="text-sm font-medium text-[#1A2229]">Date</p>
                <p className="text-[#1A2229]/70">
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-[#00ACAC]" />
              <div>
                <p className="text-sm font-medium text-[#1A2229]">Time</p>
                <p className="text-[#1A2229]/70">{event.time}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-[#00ACAC]" />
              <div>
                <p className="text-sm font-medium text-[#1A2229]">Venue</p>
                <p className="text-[#1A2229]/70">{event.venue}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-[#00ACAC]" />
              <div>
                <p className="text-sm font-medium text-[#1A2229]">Organized By</p>
                <p className="text-[#1A2229]/70">{event.organizedBy}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-3 text-xl font-semibold text-[#1A2229]">About the Event</h2>
            <p className="text-[#1A2229]/70">{event.description}</p>
          </div>

          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold text-[#1A2229]">Faculty Coordinator</h3>
              <p className="text-[#1A2229]/70">{event.facultyCoordinator}</p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-[#1A2229]">Student Coordinator</h3>
              <p className="text-[#1A2229]/70">{event.studentCoordinator}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="mb-2 font-semibold text-[#1A2229]">Registration Details</h3>
            <div className="rounded-lg bg-[#00ACAC]/5 p-4">
              <p className="mb-2 text-[#1A2229]">
                <span className="font-medium">Registration Deadline:</span>{" "}
                {new Date(event.registrationDeadline).toLocaleDateString()}
              </p>
              {event.maxParticipants && (
                <p className="text-[#1A2229]">
                  <span className="font-medium">Maximum Participants:</span>{" "}
                  {event.maxParticipants}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={() => navigate(`/register/${event.id}`, { state: { event } })}
              className="bg-[#A94442] text-white transition-all duration-300 hover:bg-[#A94442]/90"
            >
              Register Now
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default EventDetails;
