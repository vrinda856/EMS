
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, Link } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    collegeId: "",
    password: "",
    role: "student"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => 
      u.collegeId === formData.collegeId && 
      u.password === formData.password &&
      u.role === formData.role
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify({ 
        role: user.role, 
        collegeId: user.collegeId 
      }));
      
      toast({
        title: "Login Successful! 🎉",
        description: "Welcome back!",
        duration: 3000,
      });

      if (user.role === "faculty") {
        navigate("/faculty/dashboard");
      } else {
        navigate("/");
      }
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    }
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
          className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-lg"
        >
          <h2 className="mb-6 text-2xl font-bold text-[#1A2229]">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#1A2229]">
                Role
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

            <div>
              <label className="block text-sm font-medium text-[#1A2229]">
                College ID
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
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00ACAC] focus:outline-none focus:ring-1 focus:ring-[#00ACAC]"
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#A94442] text-white transition-all duration-300 hover:bg-[#A94442]/90"
            >
              Login
            </Button>

            <div className="text-center text-sm text-[#1A2229]/70">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#00ACAC] hover:underline">
                Sign up here
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginForm;
