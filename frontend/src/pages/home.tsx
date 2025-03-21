import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import FeaturedTemplatesCarousel from "@/components/featuredTemplatesCarousel";
import CallToActionButton from "@/components/callToActionButton";

const Home: React.FC = () => {
  // Scroll to top on mount (for route transitions)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mobile menu toggle state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-white text-[#34495e]">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-arial-sans-serif font-semibold text-[#34495e]">
            CreativeTool
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              className="hover:text-[#3498db] transition-colors duration-300 font-helvetica-sans-serif"
            >
              Home
            </Link>
            <Link
              to="/templates"
              className="hover:text-[#3498db] transition-colors duration-300 font-helvetica-sans-serif"
            >
              Templates
            </Link>
            <Link
              to="/dashboard"
              className="hover:text-[#3498db] transition-colors duration-300 font-helvetica-sans-serif"
            >
              Dashboard
            </Link>
            <Link
              to="/resources"
              className="hover:text-[#3498db] transition-colors duration-300 font-helvetica-sans-serif"
            >
              Resources
            </Link>
            <CallToActionButton className="ml-4">Create Project</CallToActionButton>
          </nav>
          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-[#3498db] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <nav className="flex flex-col px-4 py-4 space-y-4">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#3498db] transition-colors duration-300 font-helvetica-sans-serif"
              >
                Home
              </Link>
              <Link
                to="/templates"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#3498db] transition-colors duration-300 font-helvetica-sans-serif"
              >
                Templates
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#3498db] transition-colors duration-300 font-helvetica-sans-serif"
              >
                Dashboard
              </Link>
              <Link
                to="/resources"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#3498db] transition-colors duration-300 font-helvetica-sans-serif"
              >
                Resources
              </Link>
              <CallToActionButton onClick={() => setIsMobileMenuOpen(false)}>
                Create Project
              </CallToActionButton>
            </nav>
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-white px-4 py-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-arial-sans-serif font-semibold text-[#34495e] mb-4 leading-tight">
                Design, Develop, Collaborate
              </h1>
              <p className="text-lg md:text-xl font-helvetica-sans-serif mb-6">
                Kickstart your next web development project with modern templates, real-time collaboration,
                and simplified project management.
              </p>
              <CallToActionButton> Create New Project </CallToActionButton>
            </div>
            <div className="mt-8 md:mt-0 md:w-1/2">
              <img
                src="https://picsum.photos/500/300"
                alt="Hero Illustration"
                className="w-full rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>

        {/* Featured Templates Carousel Section */}
        <section className="bg-white px-4 py-12">
          <FeaturedTemplatesCarousel />
        </section>

        {/* Alternating Section: Real-time Collaboration */}
        <section className="bg-gray-50 px-4 py-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <img
                src="https://picsum.photos/500/300?random=1"
                alt="Real-time Collaboration"
                className="w-full rounded-lg shadow-md"
              />
            </div>
            <div className="mt-6 md:mt-0 md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-arial-sans-serif font-semibold text-[#34495e] mb-4">
                Real-time Collaboration
              </h2>
              <p className="text-base font-helvetica-sans-serif mb-4">
                Collaborate with your team instantly with our integrated real-time collaboration tools.
                Share feedback, assign tasks, and sync changes seamlessly.
              </p>
              <CallToActionButton>Learn More</CallToActionButton>
            </div>
          </div>
        </section>

        {/* Alternating Section: Effortless Project Management */}
        <section className="bg-white px-4 py-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:order-2">
              <img
                src="https://picsum.photos/500/300?random=2"
                alt="Effortless Project Management"
                className="w-full rounded-lg shadow-md"
              />
            </div>
            <div className="mt-6 md:mt-0 md:w-1/2 md:pr-12 md:order-1">
              <h2 className="text-3xl font-arial-sans-serif font-semibold text-[#34495e] mb-4">
                Effortless Project Management
              </h2>
              <p className="text-base font-helvetica-sans-serif mb-4">
                Organize your projects, keep track of milestones, and manage deadlines effortlessly with our
                intuitive project management interface.
              </p>
              <CallToActionButton>Get Started</CallToActionButton>
            </div>
          </div>
        </section>

        {/* Final Call-To-Action Section */}
        <section className="bg-[#2ecc71] px-4 py-16">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-arial-sans-serif font-semibold text-white mb-4">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-base font-helvetica-sans-serif text-white mb-8">
              Join thousands of web professionals who are boosting their productivity with CreativeTool.
            </p>
            <CallToActionButton className="bg-white text-[#2ecc71] hover:bg-gray-100">
              Get Started Today
            </CallToActionButton>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-100 px-4 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo and Description */}
          <div>
            <h3 className="text-xl font-arial-sans-serif font-semibold text-[#34495e] mb-2">
              CreativeTool
            </h3>
            <p className="text-sm font-helvetica-sans-serif text-[#34495e]">
              Your all-in-one platform for creative web development projects. Design. Develop. Collaborate.
            </p>
          </div>
          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-arial-sans-serif font-semibold text-[#34495e] mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm hover:text-[#3498db] transition-colors duration-300 font-helvetica-sans-serif"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/templates"
                  className="text-sm hover:text-[#3498db] transition-colors duration-300 font-helvetica-sans-serif"
                >
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-sm hover:text-[#3498db] transition-colors duration-300 font-helvetica-sans-serif"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="text-sm hover:text-[#3498db] transition-colors duration-300 font-helvetica-sans-serif"
                >
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          {/* Column 3: Legal Information */}
          <div>
            <h4 className="text-lg font-arial-sans-serif font-semibold text-[#34495e] mb-2">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="text-sm hover:text-[#3498db] transition-colors duration-300 font-helvetica-sans-serif"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm hover:text-[#3498db] transition-colors duration-300 font-helvetica-sans-serif"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm hover:text-[#3498db] transition-colors duration-300 font-helvetica-sans-serif"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center">
          <p className="text-xs font-helvetica-sans-serif text-[#34495e]">
            © {new Date().getFullYear()} CreativeTool. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;