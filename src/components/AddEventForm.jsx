
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, X } from "lucide-react";

function AddEventForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    time: "",
    venue: "",
    description: "",
    facultyCoordinator: "",
    studentCoordinator: "",
    organizedBy: "",
    registrationDeadline: "",
    maxParticipants: "",
    poster: null,
    posterPreview: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.date || !formData.time || !formData.venue) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.poster) {
      toast({
        title: "Missing Poster",
        description: "Please upload an event poster.",
        variant: "destructive"
      });
      return;
    }

    const events = JSON.parse(localStorage.getItem("events") || "[]");
    const newEvent = {
      ...formData,
      id: Date.now(),
      createdBy: JSON.parse(localStorage.getItem("user"))?.collegeId,
      createdAt: new Date().toISOString()
    };

    // Convert poster to base64 for storage
    const reader = new FileReader();
    reader.onloadend = () => {
      newEvent.poster = reader.result;
      events.push(newEvent);
      localStorage.setItem("events", JSON.stringify(events));
      
      toast({
        title: "Event Added Successfully! 🎉",
        description: "Your new event has been created and is now visible to students.",
        duration: 5000,
      });

      // Show notification to all users
      const notifications = JSON.parse(localStorage.getItem("notifications") || "[]");
      notifications.push({
        id: Date.now(),
        type: "new_event",
        title: "New Event Added",
        message: `New event: ${newEvent.title} on ${new Date(newEvent.date).toLocaleDateString()}`,
        date: new Date().toISOString(),
        read: false
      });
      localStorage.setItem("notifications", JSON.stringify(notifications));

      navigate("/faculty/dashboard");
    };
    reader.readAsDataURL(formData.poster);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePosterUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File Too Large",
          description: "Please upload an image smaller than 5MB.",
          variant: "destructive"
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: "Please upload an image file.",
          variant: "destructive"
        });
        return;
      }

      setFormData({
        ...formData,
        poster: file,
        posterPreview: URL.createObjectURL(file)
      });
    }
  };

  const removePoster = () => {
    setFormData({
      ...formData,
      poster: null,
      posterPreview: null
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFFFF] to-[#00ACAC]/10 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg"
        >
          <div className="mb-6 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/faculty/dashboard")}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-2xl font-bold text-[#1A2229]">Add New Event</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#1A2229]">
                Event Poster *
              </label>
              <div className="mt-2">
                {formData.posterPreview ? (
                  <div className="relative">
                    <img
                      src={formData.posterPreview}
                      alt="Event poster preview"
                      className="h-64 w-full rounded-lg object-cover"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 rounded-full bg-white/80 text-[#A94442] hover:bg-white"
                      onClick={removePoster}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <label className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#00ACAC]/30 bg-[#00ACAC]/5 hover:bg-[#00ACAC]/10">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="mb-3 h-12 w-12 text-[#00ACAC]" />
                        <p className="mb-2 text-sm text-[#1A2229]">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-[#1A2229]/70">
                          PNG, JPG or JPEG (MAX. 5MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handlePosterUpload}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[#1A2229]">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A2229]">
                  Category *
                </label>
                <select
                  name="category"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option value="seminar">Seminar</option>
                  <option value="workshop">Workshop</option>
                  <option value="hackathon">Hackathon</option>
                  <option value="quiz">Quiz</option>
                  <option value="talkshow">Talk Show</option>
                  <option value="bootcamp">Bootcamp</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A2229]">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A2229]">
                  Time *
                </label>
                <input
                  type="time"
                  name="time"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A2229]">
                  Venue *
                </label>
                <input
                  type="text"
                  name="venue"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A2229]">
                  Organized By (Club/Department) *
                </label>
                <input
                  type="text"
                  name="organizedBy"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A2229]">
                  Faculty Coordinator *
                </label>
                <input
                  type="text"
                  name="facultyCoordinator"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A2229]">
                  Student Coordinator *
                </label>
                <input
                  type="text"
                  name="studentCoordinator"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A2229]">
                  Registration Deadline *
                </label>
                <input
                  type="date"
                  name="registrationDeadline"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A2229]">
                  Maximum Participants
                </label>
                <input
                  type="number"
                  name="maxParticipants"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#1A2229]">
                  Event Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows="4"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-[#A94442] text-white transition-all duration-300 hover:bg-[#A94442]/90"
              >
                Add Event
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default AddEventForm;
