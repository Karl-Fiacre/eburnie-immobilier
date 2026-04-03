import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { company } from "@/config/company";

const WhatsAppButton = () => (
  <motion.a
    href={company.whatsapp.url}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg"
    aria-label="Contacter via WhatsApp"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 1, type: "spring", stiffness: 200 }}
    whileHover={{ scale: 1.15 }}
    whileTap={{ scale: 0.95 }}
  >
    <MessageCircle className="h-7 w-7" />
  </motion.a>
);

export default WhatsAppButton;
