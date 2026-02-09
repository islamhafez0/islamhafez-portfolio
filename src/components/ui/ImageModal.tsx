import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageSrc: string;
    imageAlt: string;
}

const ImageModal = ({ isOpen, onClose, imageSrc, imageAlt }: ImageModalProps) => {
    // Handle ESC key press
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            // Prevent body scroll when modal is open
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-pointer"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Close Button - Fixed to viewport */}
                    <motion.button
                        onClick={onClose}
                        className="fixed top-6 right-6 md:top-10 md:right-10 z-[10000] p-4 rounded-full bg-white text-black hover:bg-gray-200 hover:scale-110 transition-all duration-300 group shadow-2xl"
                        aria-label="Close modal"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ delay: 0.1 }}
                    >
                        <X className="w-6 h-6 md:w-7 md:h-7 transition-transform duration-300 group-hover:rotate-90" />
                    </motion.button>

                    {/* Image Container */}
                    <motion.div
                        className="relative max-w-7xl max-h-[90vh] w-full z-[9990]"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 300,
                            duration: 0.3
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={imageSrc}
                            alt={imageAlt}
                            className="w-full h-full object-contain rounded-lg shadow-2xl"
                            style={{
                                maxHeight: "90vh",
                            }}
                        />

                        {/* Image Caption */}
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <p className="text-white text-lg font-medium">{imageAlt}</p>
                        </motion.div>
                    </motion.div>

                    {/* Hint Text */}
                    <motion.p
                        className="fixed bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm z-[9990]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Press ESC or click outside to close
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ImageModal;
