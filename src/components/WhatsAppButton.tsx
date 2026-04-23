import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { company } from "@/config/company";

const WhatsAppButton = () => (
  <motion.a
    href={company.whatsapp.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/40"
    aria-label="Contacter via WhatsApp"
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
    whileHover={{ scale: 1.15 }}
    whileTap={{ scale: 0.92 }}
  >
    <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-green-500/40" />
    <span className="absolute -inset-2 -z-10 rounded-full bg-green-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
    <motion.div
      animate={{ rotate: [0, -8, 8, -8, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
    >
      <MessageCircle className="h-7 w-7" />
    </motion.div>
  </motion.a>
);

export default WhatsAppButton;
