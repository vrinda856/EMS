
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";

function NotificationCenter({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem("notifications") || "[]");
    setNotifications(storedNotifications.filter(n => !n.readBy?.includes(user?.collegeId)));
  }, [isOpen, user?.collegeId]);

  const markAsRead = (notificationId) => {
    const allNotifications = JSON.parse(localStorage.getItem("notifications") || "[]");
    const updatedNotifications = allNotifications.map(notification => {
      if (notification.id === notificationId) {
        return {
          ...notification,
          readBy: [...(notification.readBy || []), user?.collegeId]
        };
      }
      return notification;
    });
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
    setNotifications(notifications.filter(n => n.id !== notificationId));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute right-0 top-16 z-50 w-96 rounded-xl bg-white p-4 shadow-xl"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="mr-2 h-5 w-5 text-[#00ACAC]" />
              <h3 className="text-lg font-semibold text-[#1A2229]">Notifications</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-[#1A2229]/70 hover:text-[#1A2229]"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-[#1A2229]/70">
                No new notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mb-2 rounded-lg border border-gray-100 p-4 hover:bg-gray-50"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <h4 className="font-medium text-[#1A2229]">
                      {notification.title}
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                      className="text-xs text-[#00ACAC]"
                    >
                      Mark as read
                    </Button>
                  </div>
                  <p className="text-sm text-[#1A2229]/70">
                    {notification.message}
                  </p>
                  <p className="mt-2 text-xs text-[#1A2229]/50">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NotificationCenter;
