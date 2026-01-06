'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { fadeInScale, spring } from '@/lib/animations';

interface AIInterpretationModalProps {
    content: string;
    palaceName: string;
    fullName: string;
    isOpen: boolean;
    onClose: () => void;
}

const AIInterpretationModal: React.FC<AIInterpretationModalProps> = ({
    content,
    palaceName,
    fullName,
    isOpen,
    onClose,
}) => {
    const [sections, setSections] = useState<Array<{ id: string; title: string; element: HTMLElement | null }>>([]);
    const contentRef = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState<string>('');

    // Extract sections from markdown content after render
    useEffect(() => {
        if (!content || !isOpen) return;

        // Wait for markdown to render
        const timer = setTimeout(() => {
            if (!contentRef.current) return;

            const headings = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
            const extractedSections: Array<{ id: string; title: string; element: HTMLElement | null }> = [];

            headings.forEach((heading, index) => {
                const id = `section-${index}`;
                (heading as HTMLElement).id = id;
                extractedSections.push({
                    id,
                    title: heading.textContent || `Phần ${index + 1}`,
                    element: heading as HTMLElement,
                });
            });

            setSections(extractedSections);
            if (extractedSections.length > 0) {
                setActiveSection(extractedSections[0].id);
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [content, isOpen]);

    // Update active section on scroll
    useEffect(() => {
        if (!contentRef.current || sections.length === 0) return;

        const handleScroll = () => {
            if (!contentRef.current) return;
            const scrollPosition = contentRef.current.scrollTop + 150;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section.element) {
                    const rect = section.element.getBoundingClientRect();
                    const containerRect = contentRef.current.getBoundingClientRect();
                    const relativeTop = rect.top - containerRect.top;
                    
                    if (relativeTop <= 150) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        const container = contentRef.current;
        container.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        return () => container.removeEventListener('scroll', handleScroll);
    }, [sections]);

    const scrollToSection = (sectionId: string) => {
        const section = sections.find(s => s.id === sectionId);
        if (section?.element) {
            section.element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(sectionId);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(content);
            alert('Đã sao chép vào clipboard!');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="w-full max-w-4xl max-h-[90vh] bg-background-dark rounded-2xl sm:rounded-3xl border-2 border-primary/30 shadow-2xl shadow-primary/20 overflow-hidden pointer-events-auto flex flex-col"
                            variants={fadeInScale}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={spring.bouncy}
                        >
                            {/* Header */}
                            <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 to-primary/10 p-4 sm:p-6 border-b border-primary/30">
                                <div className="absolute top-0 right-0 size-48 bg-primary/20 blur-3xl -mr-24 -mt-24" />
                                
                                <div className="relative z-10 flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <motion.span
                                                className="material-symbols-outlined text-primary text-2xl"
                                                animate={{ rotate: [0, 10, -10, 0] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                auto_awesome
                                            </motion.span>
                                            <h2 className="text-xl sm:text-2xl font-black">Luận Giải AI Cá Nhân Hóa</h2>
                                        </div>
                                        <p className="text-sm text-text-secondary">
                                            {palaceName} • {fullName}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <motion.button
                                            onClick={copyToClipboard}
                                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            title="Sao chép"
                                        >
                                            <span className="material-symbols-outlined text-sm text-text-secondary">content_copy</span>
                                        </motion.button>
                                        <motion.button
                                            onClick={onClose}
                                            className="size-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center"
                                            whileHover={{ scale: 1.1, rotate: 90 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <span className="material-symbols-outlined text-lg">close</span>
                                        </motion.button>
                                    </div>
                                </div>
                            </div>

                            {/* Content with Sidebar Navigation */}
                            <div className="flex flex-1 overflow-hidden">
                                {/* Navigation Sidebar */}
                                {sections.length > 0 && (
                                    <div className="hidden lg:block w-64 border-r border-white/10 bg-background-dark/50 p-4 overflow-y-auto">
                                        <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-3">
                                            Mục Lục
                                        </h3>
                                        <nav className="space-y-1">
                                            {sections.map((section) => (
                                                <motion.button
                                                    key={section.id}
                                                    onClick={() => scrollToSection(section.id)}
                                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                                                        activeSection === section.id
                                                            ? 'bg-primary/20 text-primary border border-primary/30'
                                                            : 'text-text-secondary hover:text-white hover:bg-white/5'
                                                    }`}
                                                    whileHover={{ x: 4 }}
                                                    transition={{ type: 'spring', stiffness: 400 }}
                                                >
                                                    {section.title}
                                                </motion.button>
                                            ))}
                                        </nav>
                                    </div>
                                )}

                                {/* Main Content */}
                                <div
                                    ref={contentRef}
                                    className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar"
                                >
                                    <div className="prose prose-invert prose-lg max-w-none">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                h1: ({ node, ...props }) => (
                                                    <h1 className="text-2xl sm:text-3xl font-black text-white mb-4 mt-8 first:mt-0" {...props} />
                                                ),
                                                h2: ({ node, ...props }) => (
                                                    <h2 className="text-xl sm:text-2xl font-black text-primary mb-3 mt-6" {...props} />
                                                ),
                                                h3: ({ node, ...props }) => (
                                                    <h3 className="text-lg sm:text-xl font-bold text-primary/90 mb-2 mt-4" {...props} />
                                                ),
                                                p: ({ node, ...props }) => (
                                                    <p className="text-text-secondary leading-relaxed mb-4" {...props} />
                                                ),
                                                strong: ({ node, ...props }) => (
                                                    <strong className="text-white font-bold" {...props} />
                                                ),
                                                ul: ({ node, ...props }) => (
                                                    <ul className="list-disc list-inside space-y-2 mb-4 text-text-secondary" {...props} />
                                                ),
                                                ol: ({ node, ...props }) => (
                                                    <ol className="list-decimal list-inside space-y-2 mb-4 text-text-secondary" {...props} />
                                                ),
                                                li: ({ node, ...props }) => (
                                                    <li className="leading-relaxed" {...props} />
                                                ),
                                            }}
                                        >
                                            {content}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AIInterpretationModal;

