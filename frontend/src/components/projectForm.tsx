import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';

// Importing Shadcn/UI Components (assumes these files exist)
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Zod schema for form validation
const projectFormSchema = z.object({
  title: z.string().min(3, { message: 'Project title must be at least 3 characters' }),
  template: z.string().nonempty({ message: 'Template selection is required' }),
});

type ProjectFormData = z.infer<typeof projectFormSchema>;

// Define a type for Template objects
type Template = {
  id: string;
  name: string;
  category: string;
  previewImage: string;
};

// Mock data for project templates
const templates: Template[] = [
  {
    id: 'template1',
    name: 'Modern Landing Page',
    category: 'Landing',
    previewImage: 'https://picsum.photos/500/300?random=1',
  },
  {
    id: 'template2',
    name: 'Portfolio Showcase',
    category: 'Portfolio',
    previewImage: 'https://picsum.photos/500/300?random=2',
  },
  {
    id: 'template3',
    name: 'E-commerce Store',
    category: 'E-commerce',
    previewImage: 'https://picsum.photos/500/300?random=3',
  },
];

const ProjectForm: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ProjectFormData>({ resolver: zodResolver(projectFormSchema) });

  // Watch the selected template id to update the preview dynamically
  const selectedTemplateId = watch('template');
  const selectedTemplate = templates.find((temp) => temp.id === selectedTemplateId);

  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // Form submission handler
  const onSubmit: SubmitHandler<ProjectFormData> = async (data) => {
    setIsLoading(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      // Simulate an API call (replace with real API integration)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitSuccess('Project created successfully!');
      reset();
    } catch (error: any) {
      setSubmitError('An error occurred while creating the project.');
    }

    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Panel: Template Preview */}
        <div className="w-full md:w-2/5">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-xl font-arial-sans-serif">Template Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedTemplate ? (
                <div>
                  <img
                    src={selectedTemplate.previewImage}
                    alt={selectedTemplate.name}
                    className="w-full h-auto rounded shadow-sm"
                  />
                  <p className="mt-2 text-center font-helvetica-sans-serif text-lg text-[#34495e]">
                    {selectedTemplate.name}
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-center h-48 border border-dashed border-gray-300 rounded">
                  <span className="text-gray-500 font-helvetica-sans-serif">No Template Selected</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        {/* Right Panel: Project Creation Form */}
        <div className="w-full md:w-3/5">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-xl font-arial-sans-serif">Create New Project</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Project Title Input */}
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block mb-1 font-semibold font-helvetica-sans-serif text-[#34495e]"
                  >
                    Project Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Enter project title"
                    {...register('title')}
                    className={`w-full border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded px-3 h-10 focus:outline-none focus:border-[#3498db]`}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                  )}
                </div>
                {/* Template Selection Dropdown */}
                <div className="mb-4">
                  <label
                    htmlFor="template"
                    className="block mb-1 font-semibold font-helvetica-sans-serif text-[#34495e]"
                  >
                    Select Template
                  </label>
                  <select
                    id="template"
                    {...register('template')}
                    className={`w-full border ${errors.template ? 'border-red-500' : 'border-gray-300'} rounded px-3 h-10 focus:outline-none focus:border-[#3498db]`}
                  >
                    <option value="">-- Select a Template --</option>
                    {templates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name} – {template.category}
                      </option>
                    ))}
                  </select>
                  {errors.template && (
                    <p className="text-red-500 text-sm mt-1">{errors.template.message}</p>
                  )}
                </div>
                {/* Submit Button */}
                <div>
                  <Button
                    type="submit"
                    className="w-full py-3 bg-[#3498db] text-white rounded hover:bg-[#5dade2] transition duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="animate-spin mr-2 h-5 w-5" />
                        <span>Creating...</span>
                      </div>
                    ) : (
                      'Create Project'
                    )}
                  </Button>
                </div>
              </form>
              {submitError && (
                <div className="mt-4 text-red-500 text-center">{submitError}</div>
              )}
              {submitSuccess && (
                <div className="mt-4 text-green-600 text-center">{submitSuccess}</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;