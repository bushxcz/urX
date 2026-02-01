import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

/**
 * Navbar - Glassmorphism navbar with logo and navigation
 */
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { label: 'Dashboard', href: '#dashboard' },
        { label: 'Tracker', href: '#tracker' },
        { label: 'Analytics', href: '#analytics' },
    ];

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 glass border-b border-border-subtle"
        >
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-3 group">
                        <img
                            src="/urx-icon.svg"
                            alt="urX Logo"
                            className="w-10 h-10 group-hover:scale-105 transition-transform"
                        />
                        <span className="font-sans font-semibold text-xl text-obsidian">
                            urX
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-subtle hover:text-obsidian transition-colors font-medium text-sm"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="#tracker"
                            className="bg-obsidian text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-obsidian/90 transition-colors"
                        >
                            Get Started
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-obsidian"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden pt-4 pb-2"
                    >
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="text-subtle hover:text-obsidian transition-colors font-medium text-sm py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="#tracker"
                                className="bg-obsidian text-white px-5 py-2.5 rounded-lg text-sm font-medium text-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Get Started
                            </a>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
}
