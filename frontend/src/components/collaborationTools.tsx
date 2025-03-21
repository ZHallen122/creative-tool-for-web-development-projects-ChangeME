import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus, MessageSquare, CheckCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Import shadcn/ui components
import { Button } from "@/components/ui/button";

// ----------------------------------------------------------------
// Type Definitions
// ----------------------------------------------------------------
interface Collaborator {
  id: string;
  name: string;
  email: string;
  avatar: string;
  online: boolean;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

// ----------------------------------------------------------------
// Zod Schema for Invite Form
// ----------------------------------------------------------------
const inviteSchema = z.object({
  email: z.string().email("Invalid email address"),
});
type InviteFormData = z.infer<typeof inviteSchema>;

// ----------------------------------------------------------------
// Invite Modal Component
// ----------------------------------------------------------------
interface InviteModalProps {
  onClose: () => void;
  onInvite: (email: string) => void;
}

const InviteModal: React.FC<InviteModalProps> = ({ onClose, onInvite }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
  });

  const onSubmit = (data: InviteFormData) => {
    onInvite(data.email);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="bg-white rounded shadow p-6 w-11/12 sm:w-96"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[#34495e] font-arial">
              Invite Collaborator
            </h3>
            <button
              onClick={onClose}
              className="text-[#e74c3c] transition duration-300 hover:text-[#e74c3c]"
              aria-label="Close invitation modal"
            >
              <XCircle size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#34495e] font-helvetica"
              >
                Email<span className="text-[#e74c3c] ml-1">*</span>
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className="mt-1 block w-full h-10 border border-gray-300 rounded px-3 focus:outline-none focus:ring-2 focus:ring-[#3498db]"
                placeholder="collaborator@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#3498db] text-white rounded transition duration-300 hover:bg-[#5dade2] px-4 py-2"
              >
                {isSubmitting ? "Inviting..." : "Invite"}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ----------------------------------------------------------------
// Chat Message Component
// ----------------------------------------------------------------
interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-2">
        <span className="font-semibold text-[#3498db] font-arial">
          {message.sender}
        </span>
        <span className="text-xs text-gray-500">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
      <p className="text-base text-[#34495e] font-helvetica">{message.content}</p>
    </div>
  );
};

// ----------------------------------------------------------------
// Collaboration Tools Main Component
// ----------------------------------------------------------------
const CollaborationTools: React.FC = () => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>("");

  // Simulate API calls to fetch collaborators and messages
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Mocked collaborators data
        const mockCollaborators: Collaborator[] = [
          {
            id: "1",
            name: "Alice Johnson",
            email: "alice@example.com",
            avatar: "https://picsum.photos/seed/alice/50/50",
            online: true,
          },
          {
            id: "2",
            name: "Bob Smith",
            email: "bob@example.com",
            avatar: "https://picsum.photos/seed/bob/50/50",
            online: false,
          },
          {
            id: "3",
            name: "Carol Danvers",
            email: "carol@example.com",
            avatar: "https://picsum.photos/seed/carol/50/50",
            online: true,
          },
        ];
        // Mocked messages data
        const mockMessages: Message[] = [
          {
            id: "m1",
            sender: "Alice Johnson",
            content: "Hey team, let's start discussing the new feature.",
            timestamp: new Date(),
          },
          {
            id: "m2",
            sender: "Bob Smith",
            content: "I have some ideas about the layout.",
            timestamp: new Date(),
          },
        ];
        setCollaborators(mockCollaborators);
        setMessages(mockMessages);
      } catch (err) {
        setError("Failed to fetch collaboration data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handler for inviting a new collaborator
  const handleInvite = async (email: string) => {
    try {
      // Simulate API call delay for inviting
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Create a new collaborator from the provided email (using a basic name extraction)
      const newCollaborator: Collaborator = {
        id: (collaborators.length + 1).toString(),
        name: email.split("@")[0],
        email: email,
        avatar: `https://picsum.photos/seed/${encodeURIComponent(email)}/50/50`,
        online: false,
      };
      setCollaborators((prev) => [...prev, newCollaborator]);
      setIsInviteModalOpen(false);
    } catch (err) {
      alert("Failed to invite collaborator. Please try again.");
    }
  };

  // Handler for sending a chat message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    try {
      const message: Message = {
        id: (messages.length + 1).toString(),
        sender: "You",
        content: newMessage,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, message]);
      setNewMessage("");
    } catch (err) {
      alert("Failed to send message. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full p-4">
        <p className="text-[#34495e] font-helvetica">
          Loading collaboration tools...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full p-4">
        <p className="text-red-500 font-helvetica">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Collaborators Section */}
        <div className="bg-white shadow rounded p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[20px] font-arial text-[#34495e]">
              Collaborators
            </h2>
            <Button
              onClick={() => setIsInviteModalOpen(true)}
              className="bg-[#3498db] text-white rounded transition duration-300 hover:bg-[#5dade2] px-4 py-2"
            >
              <UserPlus size={16} className="mr-2" /> Invite
            </Button>
          </div>
          <div className="space-y-4">
            {collaborators.map((collab) => (
              <div key={collab.id} className="flex items-center space-x-4">
                <img
                  src={collab.avatar}
                  alt={collab.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-base font-arial text-[#34495e]">
                    {collab.name}
                  </p>
                  <p className="text-sm font-helvetica text-gray-500">
                    {collab.email}
                  </p>
                </div>
                <div className="ml-auto">
                  {collab.online ? (
                    <CheckCircle size={20} className="text-[#2ecc71]" />
                  ) : (
                    <XCircle size={20} className="text-gray-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Chat Section */}
        <div className="bg-white shadow rounded p-4 flex flex-col">
          <h2 className="text-[20px] font-arial text-[#34495e] mb-4">
            Project Chat
          </h2>
          <div
            className="flex-1 overflow-y-auto space-y-4 mb-4"
            style={{ maxHeight: "300px" }}
          >
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 h-10 rounded px-3 focus:outline-none focus:ring-2 focus:ring-[#3498db]"
            />
            <Button
              type="submit"
              className="ml-2 bg-[#3498db] text-white rounded transition duration-300 hover:bg-[#5dade2] px-4 py-2"
            >
              <MessageSquare size={16} />
            </Button>
          </form>
        </div>
      </div>
      {/* Invite Modal */}
      <AnimatePresence>
        {isInviteModalOpen && (
          <InviteModal
            onClose={() => setIsInviteModalOpen(false)}
            onInvite={handleInvite}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollaborationTools;