import React, { useState, useEffect, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface Template {
  id: string;
  name: string;
  category: string;
  previewUrl: string;
}

interface TemplateSelectionDropdownProps {
  onTemplateSelect: (template: Template) => void;
}

const TemplateSelectionDropdown: React.FC<TemplateSelectionDropdownProps> = ({ onTemplateSelect }) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        // Simulate network delay for API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        const data: Template[] = [
          {
            id: "1",
            name: "Business Landing Page",
            category: "Business",
            previewUrl: "https://picsum.photos/500/300",
          },
          {
            id: "2",
            name: "Portfolio Showcase",
            category: "Portfolio",
            previewUrl: "https://picsum.photos/500/300?random=1",
          },
          {
            id: "3",
            name: "E-commerce Store",
            category: "E-commerce",
            previewUrl: "https://picsum.photos/500/300?random=2",
          },
          {
            id: "4",
            name: "Tech Blog",
            category: "Blog",
            previewUrl: "https://picsum.photos/500/300?random=3",
          },
          {
            id: "5",
            name: "Creative Agency",
            category: "Creative",
            previewUrl: "https://picsum.photos/500/300?random=4",
          },
        ];
        if (!data || data.length === 0) {
          // Fallback: if API returns empty, throw an error to be handled below.
          throw new Error("No templates found");
        }
        setTemplates(data);
      } catch (err: any) {
        setError(err.message || "Failed to load templates");
      } finally {
        setLoading(false);
      }
    }
    fetchTemplates();
  }, []);

  const categories: string[] = [
    "All",
    ...Array.from(new Set(templates.map((template) => template.category))),
  ];
  const filteredTemplates = templates.filter(
    (template) => selectedCategory === "All" || template.category === selectedCategory
  );

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    // Reset current template selection when category is changed
    setSelectedTemplate(null);
  };

  const handleTemplateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const templateId = e.target.value;
    const foundTemplate = filteredTemplates.find((template) => template.id === templateId) || null;
    setSelectedTemplate(foundTemplate);
    if (foundTemplate) {
      onTemplateSelect(foundTemplate);
    }
  };

  if (loading) {
    return <p className="text-center text-[#34495e]">Loading templates...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <label htmlFor="template-category" className="block text-sm font-medium text-[#34495e] mb-1">
          Select Template Category
        </label>
        <div className="relative">
          <select
            id="template-category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="h-10 w-full border border-gray-300 rounded px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#3498db]"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500"
            size={20}
          />
        </div>
      </div>

      <div>
        <label htmlFor="template" className="block text-sm font-medium text-[#34495e] mb-1">
          Select Template
        </label>
        <div className="relative">
          <select
            id="template"
            value={selectedTemplate ? selectedTemplate.id : ""}
            onChange={handleTemplateChange}
            className="h-10 w-full border border-gray-300 rounded px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#3498db]"
          >
            <option value="">-- Select a Template --</option>
            {filteredTemplates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500"
            size={20}
          />
        </div>
      </div>

      {selectedTemplate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-4 bg-white rounded shadow"
        >
          <p className="text-lg font-semibold text-[#34495e] mb-2">
            {selectedTemplate.name} Preview
          </p>
          <img
            src={selectedTemplate.previewUrl}
            alt={`${selectedTemplate.name} preview`}
            className="w-full h-auto rounded"
          />
        </motion.div>
      )}
    </div>
  );
};

export default TemplateSelectionDropdown;