import { motion } from 'framer-motion';
import ShimmerButton from '../components/ShimmerButton';
import RevenueGraph from '../components/RevenueGraph';

/**
 * Hero - Landing section with headline, subtext, and revenue visualization
 */
export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-8 md:pb-10 px-4 md:px-6">
            <div className="max-w-7xl mx-auto w-full">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Left Column - Text Content */}
                    <div className="space-y-8">
                        {/* Editorial Accent */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="font-serif italic text-subtle text-lg"
                        >
                            For X Creators
                        </motion.p>

                        {/* Main Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-sans font-semibold text-obsidian leading-[1.1] tracking-tight"
                        >
                            Revenue
                            <br />
                            <span className="text-emerald-accent">Traceability.</span>
                        </motion.h1>

                        {/* Subtext */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg md:text-xl text-subtle max-w-lg leading-relaxed"
                        >
                            The reasoning layer for X Creators. Capture stats, map growth,
                            and ensure every post is defensible.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-wrap gap-4 pt-4"
                        >
                            <ShimmerButton onClick={() => document.getElementById('cycle-tracker')?.scrollIntoView({ behavior: 'smooth' })}>
                                Start Tracking
                            </ShimmerButton>
                            <a
                                href="#dashboard"
                                className="px-8 py-4 rounded-lg border border-border-subtle text-obsidian font-semibold text-sm hover:bg-fog transition-colors"
                            >
                                View Demo
                            </a>
                        </motion.div>

                        {/* Stats Row */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex gap-6 md:gap-12 pt-6 md:pt-8 border-t border-border-subtle"
                        >
                            <div>
                                <p className="font-data text-2xl md:text-3xl font-semibold text-obsidian">
                                    $2.4M+
                                </p>
                                <p className="text-subtle text-sm mt-1">Revenue Tracked</p>
                            </div>
                            <div>
                                <p className="font-data text-2xl md:text-3xl font-semibold text-obsidian">
                                    12K+
                                </p>
                                <p className="text-subtle text-sm mt-1">Active Creators</p>
                            </div>
                            <div>
                                <p className="font-data text-2xl md:text-3xl font-semibold text-obsidian">
                                    47%
                                </p>
                                <p className="text-subtle text-sm mt-1">Avg. Growth</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Revenue Graph */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-accent/5 to-transparent rounded-3xl" />
                        <div className="relative bg-white/50 backdrop-blur-sm rounded-3xl border border-border-subtle p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-sans font-medium text-obsidian">
                                    Revenue Growth
                                </h3>
                                <span className="font-data text-sm text-emerald-accent bg-emerald-accent/10 px-3 py-1 rounded-full">
                                    +47.2%
                                </span>
                            </div>
                            <RevenueGraph />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
