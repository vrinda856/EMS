
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function SignUpForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    collegeId: "",
    password: "",
    confirmPassword: "",
    role: "student",
    branch: "",
    year: "",
    section: "",
    phone: "",
    department: "",
    designation: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Check if user already exists
    if (users.some(user => user.collegeId === formData.collegeId)) {
      toast({
        title: "Registration Failed",
        description: "A user with this College ID already exists.",
        variant: "destructive"
      });
      return;
    }

    // Create new user
    const newUser = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    delete newUser.confirmPassword;

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    toast({
      title: "Registration Successful! 🎉",
      description: "Your account has been created. Please login to continue.",
      duration: 5000,
    });

    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
              onClick={() => navigate("/login")}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-2xl font-bold text-[#1A2229]">Sign Up</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[#1A2229]">
                  Full Name *
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
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A2229]">
                  College ID *
                </label>
                <input
                  type="text"
                  name="collegeId"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A2229]">
                  Role *
                </label>
                <select
                  name="role"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                  onChange={handleChange}
                  value={formData.role}
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                </select>
              </div>

              {formData.role === "student" ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#1A2229]">
                      Branch *
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
                      Year *
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
                      Section *
                    </label>
                    <input
                      type="text"
                      name="section"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                      onChange={handleChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#1A2229]">
                      Department *
                    </label>
                    <input
                      type="text"
                      name="department"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1A2229]">
                      Designation *
                    </label>
                    <input
                      type="text"
                      name="designation"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-[#1A2229]">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A2229]">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A2229]">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
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
                Create Account
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default SignUpForm;
