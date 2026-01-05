
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function RegistrationForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const event = location.state?.event;
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    name: "",
    year: "",
    section: "",
    branch: "",
    collegeId: user?.collegeId || "",
    phone: "",
    email: "",
    clubName: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get existing registrations or initialize empty array
    const registrations = JSON.parse(localStorage.getItem("registrations") || "[]");
    
    // Create new registration object
    const newRegistration = {
      id: Date.now(),
      eventId: event.id,
      eventTitle: event.title,
      registrationDate: new Date().toISOString(),
      status: "Registered",
      ...formData
    };
    
    // Add to registrations
    registrations.push(newRegistration);
    localStorage.setItem("registrations", JSON.stringify(registrations));
    
    // Show success toast
    toast({
      title: "Registration Successful! 🎉",
      description: "You have been registered for the event. Check your email for confirmation.",
      duration: 5000,
    });
    
    navigate("/");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!event) {
    return <div>No event selected</div>;
  }

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
              onClick={() => navigate("/")}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-2xl font-bold text-[#1A2229]">
              Event Registration
            </h2>
          </div>

          <div className="mb-6 rounded-lg bg-[#1A2229]/5 p-4">
            <h3 className="font-semibold text-[#1A2229]">{event.title}</h3>
            <p className="text-sm text-[#1A2229]/70">{event.date}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[#1A2229]">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A2229]">
                  Year
                </label>
                <select
                  name="year"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                  onChange={handleChange}
                >
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A2229]">
                  Section
                </label>
                <input
                  type="text"
                  name="section"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A2229]">
                  Branch
                </label>
                <select
                  name="branch"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                  onChange={handleChange}
                >
                  <option value="">Select Branch</option>
                  <option value="CSE">Computer Science</option>
                  <option value="IT">Information Technology</option>
                  <option value="ECE">Electronics & Communication</option>
                  <option value="EE">Electrical Engineering</option>
                  <option value="ME">Mechanical Engineering</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A2229]">
                  College ID
                </label>
                <input
                  type="text"
                  name="collegeId"
                  required
                  value={formData.collegeId}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A2229]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#1A2229]">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#1A2229]">
                  Club Name (if applicable)
                </label>
                <input
                  type="text"
                  name="clubName"
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
                Submit Registration
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default RegistrationForm;
