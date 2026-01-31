import { motion } from 'framer-motion';

/**
 * RevenueGraph - Technical SVG visualization with dashed lines and pulsing nodes
 */
export default function RevenueGraph() {
    // Sample data points for the graph
    const dataPoints = [
        { x: 50, y: 180 },
        { x: 120, y: 140 },
        { x: 190, y: 160 },
        { x: 260, y: 100 },
        { x: 330, y: 120 },
        { x: 400, y: 60 },
        { x: 470, y: 80 },
        { x: 540, y: 40 },
    ];

    // Create path string
    const pathD = dataPoints
        .map((point, i) => `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
        .join(' ');

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            <svg
                viewBox="0 0 600 220"
                className="w-full h-auto"
                preserveAspectRatio="xMidYMid meet"
            >
                {/* Grid lines */}
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path
                            d="M 40 0 L 0 0 0 40"
                            fill="none"
                            stroke="rgba(17,17,17,0.08)"
                            strokeWidth="1"
                        />
                    </pattern>

                    {/* Gradient for the line */}
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#10B981" stopOpacity="1" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.3" />
                    </linearGradient>

                    {/* Glow filter */}
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Background grid */}
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Dashed baseline */}
                <line
                    x1="30"
                    y1="200"
                    x2="570"
                    y2="200"
                    stroke="rgba(17,17,17,0.2)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                />

                {/* Main revenue line */}
                <motion.path
                    d={pathD}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#glow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />

                {/* Dashed projection line */}
                <motion.path
                    d="M 540 40 L 580 20"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 0.5 }}
                />

                {/* Data nodes */}
                {dataPoints.map((point, index) => (
                    <motion.g key={index}>
                        {/* Outer pulse ring */}
                        <motion.circle
                            cx={point.x}
                            cy={point.y}
                            r="12"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="1"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 0, 0.5]
                            }}
                            transition={{
                                delay: index * 0.15 + 0.5,
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Inner node */}
                        <motion.circle
                            cx={point.x}
                            cy={point.y}
                            r="6"
                            fill="#FAFAFA"
                            stroke="#10B981"
                            strokeWidth="2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                        />
                    </motion.g>
                ))}

                {/* Labels */}
                <motion.text
                    x="540"
                    y="30"
                    fill="#10B981"
                    fontSize="12"
                    fontFamily="JetBrains Mono"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2 }}
                >
                    +47%
                </motion.text>

                <text
                    x="30"
                    y="215"
                    fill="rgba(17,17,17,0.4)"
                    fontSize="10"
                    fontFamily="Inter"
                >
                    Jan
                </text>
                <text
                    x="540"
                    y="215"
                    fill="rgba(17,17,17,0.4)"
                    fontSize="10"
                    fontFamily="Inter"
                >
                    Dec
                </text>
            </svg>
        </div>
    );
}
