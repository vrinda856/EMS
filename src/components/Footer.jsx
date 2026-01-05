
import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#1A2229] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div className="footer-section">
            <img
              src="/src/images/logo.png"
              alt="SKIT Logo"
              className="mb-4 h-16 w-auto"
            />
            <p className="text-sm text-gray-300">
              Swami Keshvanand Institute of Technology, Management & Gramothan (SKIT)
              is committed to academic excellence and holistic development.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Academic Programs</a></li>
              <li><a href="#" className="footer-link">Campus Life</a></li>
              <li><a href="#" className="footer-link">Research</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-heading">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#00ACAC]" />
                <span className="text-sm">Ramnagaria, Jagatpura, Jaipur</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-[#00ACAC]" />
                <span className="text-sm">+91 141 2752165</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-[#00ACAC]" />
                <span className="text-sm">info@skit.ac.in</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="footer-section">
            <h3 className="footer-heading">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="footer-link">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="footer-link">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/skitjaipurofficial/" className="footer-link">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="footer-link">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} SKIT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
