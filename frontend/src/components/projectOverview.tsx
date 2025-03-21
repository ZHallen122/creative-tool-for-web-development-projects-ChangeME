import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit3, Share2, Trash2 } from "lucide-react";

// Define the Project interface
interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  status: "in-progress" | "completed" | "pending";
}

// Simulate an API call to fetch projects with mock data
const fetchProjects = async (): Promise<Project[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data: Project[] = [
        {
          id: "1",
          title: "Landing Page Redesign",
          description:
            "A modern landing page for client X, utilizing a modern minimalist design approach.",
          imageUrl: "https://picsum.photos/seed/project1/500/300",
          status: "in-progress",
        },
        {
          id: "2",
          title: "E-commerce Platform",
          description:
            "A scalable online store featuring integrated payment gateways and a smooth user experience.",
          imageUrl: "https://picsum.photos/seed/project2/500/300",
          status: "completed",
        },
        {
          id: "3",
          title: "Portfolio Website",
          description:
            "A clean and modern portfolio website to showcase creative projects and unique design aesthetics.",
          imageUrl: "https://picsum.photos/seed/project3/500/300",
          status: "pending",
        },
      ];
      resolve(data);
    }, 1000);
  });
};

const ProjectOverview: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Scroll to top on mount and fetch projects
  useEffect(() => {
    window.scrollTo(0, 0);
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        // If API returns undefined or empty you can use mock data (already handled here)
        setProjects(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, []);

  // Handler for navigation to create project page
  const handleCreateProject = () => {
    navigate("/create-project");
  };

  // Handlers for project actions
  const handleEdit = (projectId: string) => {
    console.log("Edit project: ", projectId);
  };

  const handleShare = (projectId: string) => {
    console.log("Share project: ", projectId);
  };

  const handleDelete = (projectId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (confirmDelete) {
      console.log("Delete project: ", projectId);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="font-arial text-[24px] text-[#34495e] mb-6">
        Project Overview
      </h1>

      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center font-helvetica text-[16px] text-[#34495e]">
          Loading projects...
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center">
          <p className="font-helvetica text-[16px] text-[#34495e] mb-4">
            You don&apos;t have any projects yet.
          </p>
          <Button
            onClick={handleCreateProject}
            className="bg-[#3498db] hover:bg-[#5aa9f5] text-white h-11 rounded-full transition duration-300 px-6"
          >
            Create Project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="font-arial text-[24px] text-[#34495e]">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-auto rounded-md mb-4"
                  />
                  <CardDescription className="font-helvetica text-[16px] text-[#34495e]">
                    {project.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button
                    onClick={() => handleEdit(project.id)}
                    className="bg-[#3498db] hover:bg-[#5aa9f5] text-white h-11 rounded-full transition duration-300 px-4 flex items-center"
                  >
                    <Edit3 size={16} className="mr-1" /> Edit
                  </Button>
                  <Button
                    onClick={() => handleShare(project.id)}
                    className="bg-[#3498db] hover:bg-[#5aa9f5] text-white h-11 rounded-full transition duration-300 px-4 flex items-center"
                  >
                    <Share2 size={16} className="mr-1" /> Share
                  </Button>
                  <Button
                    onClick={() => handleDelete(project.id)}
                    className="bg-[#e74c3c] hover:bg-[#f08a80] text-white h-11 rounded-full transition duration-300 px-4 flex items-center"
                  >
                    <Trash2 size={16} className="mr-1" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectOverview;