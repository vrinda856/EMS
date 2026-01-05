
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, BookOpen, Building, GraduationCap } from "lucide-react";

function UserProfile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userDetails = JSON.parse(localStorage.getItem("users"))?.find(u => u.collegeId === user?.collegeId);

  if (!userDetails) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#1A2229]">User not found</h2>
          <Button
            onClick={() => navigate("/")}
            className="mt-4 bg-[#A94442] text-white hover:bg-[#A94442]/90"
          >
            Go Home
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
            <h2 className="text-2xl font-bold text-[#1A2229]">Profile</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#00ACAC]/10 text-3xl font-bold text-[#00ACAC]">
                {userDetails.name.charAt(0)}
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-[#1A2229]">{userDetails.name}</h3>
              <p className="text-[#1A2229]/70">{userDetails.role.charAt(0).toUpperCase() + userDetails.role.slice(1)}</p>
            </div>

            <div className="space-y-4 rounded-lg bg-[#1A2229]/5 p-6">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#00ACAC]" />
                <span className="text-[#1A2229]">{userDetails.email}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#00ACAC]" />
                <span className="text-[#1A2229]">{userDetails.phone}</span>
              </div>

              {userDetails.role === "student" ? (
                <>
                  <div className="flex items-center space-x-3">
                    <BookOpen className="h-5 w-5 text-[#00ACAC]" />
                    <span className="text-[#1A2229]">
                      {userDetails.branch} - Year {userDetails.year}, Section {userDetails.section}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-3">
                    <Building className="h-5 w-5 text-[#00ACAC]" />
                    <span className="text-[#1A2229]">{userDetails.department}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="h-5 w-5 text-[#00ACAC]" />
                    <span className="text-[#1A2229]">{userDetails.designation}</span>
                  </div>
                </>
              )}
            </div>

            {userDetails.role === "student" && (
              <div className="space-y-4">
                <h4 className="font-semibold text-[#1A2229]">Registered Events</h4>
                <div className="space-y-2">
                  {JSON.parse(localStorage.getItem("registrations") || "[]")
                    .filter(reg => reg.collegeId === userDetails.collegeId)
                    .map(registration => (
                      <div
                        key={registration.id}
                        className="rounded-lg bg-[#00ACAC]/5 p-4"
                      >
                        <h5 className="font-medium text-[#1A2229]">{registration.eventTitle}</h5>
                        <p className="text-sm text-[#1A2229]/70">
                          Registered on: {new Date(registration.registrationDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm font-medium text-[#00ACAC]">
                          Status: {registration.status}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default UserProfile;
