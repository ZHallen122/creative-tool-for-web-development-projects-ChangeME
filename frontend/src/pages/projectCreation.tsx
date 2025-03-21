import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TemplateSelectionDropdown from "../components/templateSelectionDropdown";
import ProjectTitleInput from "../components/projectTitleInput";
import CreateProjectButton from "../components/createProjectButton";

// Define the Template interface as used in the template dropdown component.
interface Template {
  id: string;
  name: string;
  category: string;
  previewUrl: string;
}

const ProjectCreation: React.FC = () => {
  const navigate = useNavigate();

  // Local state for the selected template, project title, errors, and form submission state.
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [projectTitle, setProjectTitle] = useState<string>("");
  const [titleError, setTitleError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // On component mount, scroll to the top of the page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handler for when a template is selected from the dropdown.
  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    if (formError) {
      setFormError(null);
    }
  };

  // Handler for when the project title input changes.
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectTitle(e.target.value);
    if (e.target.value.trim() !== "" && titleError) {
      setTitleError(null);
    }
  };

  // Handler for clearing the project title.
  const handleTitleClear = () => {
    setProjectTitle("");
  };

  // Handler for form submission.
  const handleFormSubmit = async () => {
    // Validate required fields.
    let valid = true;
    if (!selectedTemplate) {
      setFormError("Please select a template for your project.");
      valid = false;
    }
    if (projectTitle.trim() === "") {
      setTitleError("Project title is required.");
      valid = false;
    }
    if (!valid) return;

    setIsSubmitting(true);
    try {
      // Simulate an API call delay.
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // On successful creation, navigate to the Project Dashboard.
      navigate("/dashboard");
    } catch (error: any) {
      setFormError(error.message || "Failed to create project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#34495e]">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl md:text-3xl font-semibold font-arial-sans-serif mb-6">
          Create New Project
        </h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Panel: Template Selection and Preview */}
          <div className="md:w-2/5 w-full">
            <TemplateSelectionDropdown onTemplateSelect={handleTemplateSelect} />
          </div>
          {/* Right Panel: Project Details Form */}
          <div className="md:w-3/5 w-full">
            <div className="bg-white rounded shadow p-6">
              <ProjectTitleInput
                value={projectTitle}
                onChange={handleTitleChange}
                onClear={handleTitleClear}
                error={titleError || ""}
              />
              {formError && (
                <p className="mb-4 text-sm text-red-500">{formError}</p>
              )}
              <CreateProjectButton onClick={handleFormSubmit} />
              {isSubmitting && (
                <p className="mt-4 text-sm text-[#34495e]">Creating project...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreation;