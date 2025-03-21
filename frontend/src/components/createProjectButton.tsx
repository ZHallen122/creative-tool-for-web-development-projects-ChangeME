import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type CreateProjectButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const CreateProjectButton: React.FC<CreateProjectButtonProps> = ({ onClick }) => {
  const navigate = useNavigate();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (onClick) {
      onClick(event);
    } else {
      // Scroll to top to ensure the page starts at the top after navigation
      window.scrollTo(0, 0);
      // Navigate to the project creation page
      navigate("/create-project");
    }
  };

  return (
    <Button
      onClick={handleClick}
      className="flex items-center bg-[#3498db] hover:bg-[#5dade2] text-white rounded-md px-6 h-11 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3498db]"
    >
      <Plus className="mr-2" size={20} strokeWidth={2} />
      <span className="font-helvetica text-base">Create Project</span>
    </Button>
  );
};

export default CreateProjectButton;