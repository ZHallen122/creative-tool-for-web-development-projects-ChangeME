import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Share2, Trash } from "lucide-react";

// Define the Project interface to represent individual project details
export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string; // Optional URL for the project preview; uses placeholder if absent.
  status: "in-progress" | "completed" | "pending";
}

// Props for the container component that renders a grid of project cards
interface ProjectCardsProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onShare: (project: Project) => void;
  onDelete: (project: Project) => void;
}

// Single project card props interface
interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onShare: (project: Project) => void;
  onDelete: (project: Project) => void;
}

/**
 * ProjectCard component renders an individual project's details within a styled card.
 * It displays the project thumbnail, title, description, a status indicator,
 * and action buttons (Edit, Share, Delete) with associated callbacks.
 */
const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onShare,
  onDelete
}) => {
  // Determine status color based on project status.
  // "in-progress" uses primary (#3498db), "completed" uses secondary (#2ecc71),
  // and "pending" (or any other status) uses accent (#e74c3c)
  let statusColor = "";
  switch (project.status) {
    case "in-progress":
      statusColor = "bg-[#3498db]";
      break;
    case "completed":
      statusColor = "bg-[#2ecc71]";
      break;
    case "pending":
    default:
      statusColor = "bg-[#e74c3c]";
      break;
  }

  // Use the provided thumbnailUrl or a placeholder image if not available.
  const thumbnail = project.thumbnailUrl || "https://picsum.photos/500/300";

  return (
    <Card className="rounded-lg shadow hover:shadow-lg transition-shadow duration-300 bg-[#ffffff]">
      {/* Project Thumbnail */}
      <img
        src={thumbnail}
        alt={project.title}
        className="w-full h-40 object-cover rounded-t-lg"
      />

      {/* Card Header: Title and Status Indicator */}
      <CardHeader className="p-4">
        <CardTitle className="text-xl text-[#34495e] font-arial">
          {project.title}
        </CardTitle>
        {/* Status indicator as a small colored circle */}
        <div
          className={`w-3 h-3 rounded-full ${statusColor} mt-2`}
          title={project.status}
        />
      </CardHeader>

      {/* Card Content: Description */}
      <CardContent className="p-4">
        <CardDescription className="text-base text-[#34495e] font-helvetica">
          {project.description}
        </CardDescription>
      </CardContent>

      {/* Card Footer: Action Buttons */}
      <CardFooter className="p-4 flex justify-end space-x-2">
        <Button
          onClick={() => onEdit(project)}
          className="h-11 rounded transition-colors duration-300 hover:bg-opacity-90"
          variant="default"
        >
          <Edit size={16} className="mr-1" />
          Edit
        </Button>
        <Button
          onClick={() => onShare(project)}
          className="h-11 rounded transition-colors duration-300 hover:bg-opacity-90"
          variant="secondary"
        >
          <Share2 size={16} className="mr-1" />
          Share
        </Button>
        <Button
          onClick={() => onDelete(project)}
          className="h-11 rounded transition-colors duration-300 hover:bg-opacity-90"
          variant="destructive"
        >
          <Trash size={16} className="mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

/**
 * ProjectCards component renders a responsive grid of project cards.
 * It displays an empty state message if no projects are available.
 */
const ProjectCards: React.FC<ProjectCardsProps> = ({
  projects,
  onEdit,
  onShare,
  onDelete
}) => {
  // If no projects are provided, display an informative empty state.
  if (!projects || projects.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-xl text-[#34495e] font-helvetica">
          No projects found. Create a new project to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {projects.map((project) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <ProjectCard
            project={project}
            onEdit={onEdit}
            onShare={onShare}
            onDelete={onDelete}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectCards;