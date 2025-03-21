import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Define a Zod schema for the invite form
const inviteSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  permission: z.enum(['viewer', 'editor']),
});

type InviteFormValues = z.infer<typeof inviteSchema>;

const InviteCollaboratorsButton: React.FC = () => {
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Loading state for form submission
  const [loading, setLoading] = useState<boolean>(false);
  // Error state for API errors
  const [apiError, setApiError] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: '',
      permission: 'viewer',
    },
  });

  // Simulate an API call to invite a collaborator
  const inviteCollaborator = async (data: InviteFormValues): Promise<void> => {
    // Simulated API delay (replace this with real API integration)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For demonstration, we'll assume success. You can simulate an error by calling reject(new Error('Error message'));
        resolve();
      }, 1000);
    });
  };

  const onSubmit = async (data: InviteFormValues) => {
    setApiError('');
    setLoading(true);
    try {
      await inviteCollaborator(data);
      // Optionally you could add a success notification here.
      // For now, we reset the form and close the modal upon successful invitation.
      reset();
      setIsModalOpen(false);
    } catch (error: any) {
      // Handle error case: display user friendly error message
      setApiError(error?.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handler to close the modal and reset any error messages
  const handleClose = () => {
    setApiError('');
    reset();
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        type="button"
        className="flex items-center justify-center gap-2 px-6 py-2 bg-[#3498db] text-white rounded-md h-[44px] transition-colors duration-300 hover:bg-[#5dade2] font-helvetica text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3498db]"
      >
        <UserPlus size={18} />
        Invite Collaborators
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { duration: 0.3, ease: 'easeInOut' } }}
              exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.2, ease: 'easeInOut' } }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-arial text-[#34495e]">Invite Collaborators</h2>
                <button
                  onClick={handleClose}
                  type="button"
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Invitation Form */}
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-helvetica text-[#34495e] mb-1">
                    Collaborator Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="example@domain.com"
                    className="w-full border border-gray-300 rounded px-3 h-[40px] focus:outline-none focus:border-[#3498db] transition-colors duration-200"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="permission" className="block text-sm font-helvetica text-[#34495e] mb-1">
                    Permission
                  </label>
                  <select
                    id="permission"
                    {...register('permission')}
                    className="w-full border border-gray-300 rounded px-3 h-[40px] focus:outline-none focus:border-[#3498db] transition-colors duration-200"
                  >
                    <option value="viewer">Viewer</option>
                    <option value="editor">Editor</option>
                  </select>
                </div>

                {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 px-6 py-2 bg-[#3498db] text-white rounded-md h-[44px] transition-colors duration-300 hover:bg-[#5dade2] font-helvetica text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3498db] disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send Invitation'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InviteCollaboratorsButton;