import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProjectCards, { Project } from "@/components/projectCards";
import CollaborationTools from "@/components/collaborationTools";
import { Button } from "@/components/ui/button";

// Simulated API call to fetch projects with mock data
const fetchProjects = async (): Promise<Project[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data: Project[] = [
        {
          id: "1",
          title: "Landing Page Redesign",
          description:
            "A modern landing page for client X, utilizing a modern minimalist design approach.",
          thumbnailUrl: "https://picsum.photos/seed/project1/500/300",
          status: "in-progress",
        },
        {
          id: "2",
          title: "E-commerce Platform",
          description:
            "A scalable online store featuring integrated payment gateways and a smooth user experience.",
          thumbnailUrl: "https://picsum.photos/seed/project2/500/300",
          status: "completed",
        },
        {
          id: "3",
          title: "Portfolio Website",
          description:
            "A clean and modern portfolio website to showcase creative projects and unique design aesthetics.",
          thumbnailUrl: "https://picsum.photos/seed/project3/500/300",
          status: "pending",
        },
      ];
      resolve(data);
    }, 1000);
  });
};

const ProjectDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Scroll to top on mount and fetch projects
  useEffect(() => {
    window.scrollTo(0, 0);
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  // Navigate to the project creation page
  const handleCreateProject = () => {
    navigate("/create-project");
  };

  // Handlers for project actions
  const handleEdit = (project: Project) => {
    console.log("Edit project:", project.id);
    // For example, navigate to an edit project page:
    // navigate(`/edit-project/${project.id}`);
  };

  const handleShare = (project: Project) => {
    console.log("Share project:", project.id);
  };

  const handleDelete = (project: Project) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (confirmDelete) {
      // Remove the project from state to simulate deletion
      setProjects((prevProjects) =>
        prevProjects.filter((p) => p.id !== project.id)
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto p-4">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="font-arial text-[24px] text-[#34495e]">
            Project Dashboard
          </h1>
          <Button
            onClick={handleCreateProject}
            className="bg-[#3498db] hover:bg-[#5aa9f5] text-white rounded-full h-[44px] px-6 transition duration-300"
          >
            Create New Project
          </Button>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center font-helvetica text-[16px] text-[#34495e]">
            Loading projects...
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Projects Section */}
            <div>
              {projects.length === 0 ? (
                <div className="text-center">
                  <p className="font-helvetica text-[16px] text-[#34495e] mb-4">
                    You don&apos;t have any projects yet.
                  </p>
                  <Button
                    onClick={handleCreateProject}
                    className="bg-[#3498db] hover:bg-[#5aa9f5] text-white h-[44px] rounded-full transition duration-300 px-6"
                  >
                    Create Project
                  </Button>
                </div>
              ) : (
                <ProjectCards
                  projects={projects}
                  onEdit={handleEdit}
                  onShare={handleShare}
                  onDelete={handleDelete}
                />
              )}
            </div>

            {/* Collaboration Tools Section */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-arial text-[20px] text-[#34495e] mb-4">
                Collaboration
              </h2>
              <CollaborationTools />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectDashboard;