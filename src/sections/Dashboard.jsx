import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import PremiumCard from '../components/PremiumCard';

/**
 * Dashboard - Analytics display with cards and charts
 */
export default function Dashboard({ data }) {
    const [activeMetric, setActiveMetric] = useState('cpm');

    // Sample historical data
    const chartData = [
        { month: 'Jan', cpm: 1.2, revenue: 890, impressions: 742000 },
        { month: 'Feb', cpm: 1.4, revenue: 1120, impressions: 800000 },
        { month: 'Mar', cpm: 1.3, revenue: 980, impressions: 754000 },
        { month: 'Apr', cpm: 1.6, revenue: 1380, impressions: 862500 },
        { month: 'May', cpm: 1.8, revenue: 1620, impressions: 900000 },
        { month: 'Jun', cpm: 1.7, revenue: 1530, impressions: 900000 },
        { month: 'Jul', cpm: 2.0, revenue: 1900, impressions: 950000 },
        { month: 'Aug', cpm: 2.2, revenue: 2310, impressions: 1050000 },
        { month: 'Sep', cpm: 2.1, revenue: 2205, impressions: 1050000 },
        { month: 'Oct', cpm: 2.4, revenue: 2640, impressions: 1100000 },
        { month: 'Nov', cpm: 2.6, revenue: 2990, impressions: 1150000 },
        { month: 'Dec', cpm: 2.8, revenue: 3360, impressions: 1200000 },
    ];

    // Calculate metrics from data or use defaults
    const metrics = useMemo(() => {
        if (data?.impressions && data?.revenue) {
            const impressions = parseFloat(data.impressions);
            const revenue = parseFloat(data.revenue);
            const cpm = (revenue / impressions) * 1000;
            const revenuePer1M = (revenue / impressions) * 1000000;

            return {
                cpm: cpm.toFixed(2),
                revenuePer1M: revenuePer1M.toFixed(0),
                growthTrend: '+47.2',
                cpmChange: '+12.5',
                revenueChange: '+23.1',
                growthChange: '+8.4',
            };
        }

        return {
            cpm: '2.84',
            revenuePer1M: '2840',
            growthTrend: '+47.2',
            cpmChange: '+12.5',
            revenueChange: '+23.1',
            growthChange: '+8.4',
        };
    }, [data]);

    const metricCards = [
        {
            id: 'cpm',
            title: 'Effective CPM',
            value: `$${metrics.cpm}`,
            change: metrics.cpmChange,
            positive: true,
            icon: DollarSign,
            description: 'Revenue per 1,000 impressions',
        },
        {
            id: 'revenue',
            title: 'Revenue per 1M',
            value: `$${metrics.revenuePer1M}`,
            change: metrics.revenueChange,
            positive: true,
            icon: BarChart3,
            description: 'Projected revenue per million impressions',
        },
        {
            id: 'growth',
            title: 'Growth Trend',
            value: `${metrics.growthTrend}%`,
            change: metrics.growthChange,
            positive: true,
            icon: TrendingUp,
            description: 'Month-over-month growth rate',
        },
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white border border-border-subtle rounded-lg shadow-lg p-4">
                    <p className="font-sans font-medium text-obsidian mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="font-data text-sm" style={{ color: entry.color }}>
                            {entry.name}: {entry.name === 'cpm' ? `$${entry.value}` :
                                entry.name === 'revenue' ? `$${entry.value.toLocaleString()}` :
                                    entry.value.toLocaleString()}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <section id="dashboard" className="relative pt-8 md:pt-12 pb-12 md:pb-24 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8 md:mb-16"
                >
                    <p className="font-serif italic text-subtle text-lg mb-4">
                        Monetization Analyzer
                    </p>
                    <h2 className="text-4xl md:text-5xl font-sans font-semibold text-obsidian mb-4">
                        Your Revenue Dashboard
                    </h2>
                    <p className="text-subtle text-lg max-w-xl mx-auto">
                        Visualize your growth and revenue efficiency with actionable insights.
                    </p>
                </motion.div>

                {/* Metric Cards */}
                <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
                    {metricCards.map((card, index) => {
                        const Icon = card.icon;
                        const isActive = activeMetric === card.id;

                        return (
                            <PremiumCard
                                key={card.id}
                                delay={index * 0.1}
                                isSelected={isActive}
                                className={`cursor-pointer ${isActive ? 'ring-2 ring-emerald-accent/30' : ''}`}
                                onClick={() => setActiveMetric(card.id)}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 bg-fog rounded-xl flex items-center justify-center">
                                        <Icon className="w-6 h-6 text-obsidian" />
                                    </div>
                                    <div className={`flex items-center gap-1 text-sm font-medium ${card.positive ? 'text-emerald-accent' : 'text-red-500'
                                        }`}>
                                        {card.positive ? (
                                            <ArrowUpRight className="w-4 h-4" />
                                        ) : (
                                            <ArrowDownRight className="w-4 h-4" />
                                        )}
                                        {card.change}%
                                    </div>
                                </div>

                                <h3 className="text-subtle text-sm font-medium mb-1">
                                    {card.title}
                                </h3>
                                <p className="font-data text-3xl font-semibold text-obsidian mb-2">
                                    {card.value}
                                </p>
                                <p className="text-subtle text-xs">
                                    {card.description}
                                </p>
                            </PremiumCard>
                        );
                    })}
                </div>

                {/* Charts Section */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Area Chart - Revenue Over Time */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-white rounded-2xl border border-border-subtle shadow-sm p-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="font-sans font-medium text-obsidian">
                                    Revenue Trend
                                </h3>
                                <p className="text-subtle text-sm">Monthly earnings overview</p>
                            </div>
                            <span className="font-data text-sm text-emerald-accent bg-emerald-accent/10 px-3 py-1 rounded-full">
                                +156% YoY
                            </span>
                        </div>

                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#EAEAEA" />
                                    <XAxis
                                        dataKey="month"
                                        tick={{ fill: 'rgba(17,17,17,0.6)', fontSize: 12 }}
                                        axisLine={{ stroke: '#EAEAEA' }}
                                    />
                                    <YAxis
                                        tick={{ fill: 'rgba(17,17,17,0.6)', fontSize: 12 }}
                                        axisLine={{ stroke: '#EAEAEA' }}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#10B981"
                                        strokeWidth={2}
                                        fill="url(#revenueGradient)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Line Chart - CPM Trend */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-white rounded-2xl border border-border-subtle shadow-sm p-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="font-sans font-medium text-obsidian">
                                    CPM Evolution
                                </h3>
                                <p className="text-subtle text-sm">Cost per mille over time</p>
                            </div>
                            <span className="font-data text-sm text-emerald-accent bg-emerald-accent/10 px-3 py-1 rounded-full">
                                $2.84 avg
                            </span>
                        </div>

                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#EAEAEA" />
                                    <XAxis
                                        dataKey="month"
                                        tick={{ fill: 'rgba(17,17,17,0.6)', fontSize: 12 }}
                                        axisLine={{ stroke: '#EAEAEA' }}
                                    />
                                    <YAxis
                                        tick={{ fill: 'rgba(17,17,17,0.6)', fontSize: 12 }}
                                        axisLine={{ stroke: '#EAEAEA' }}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line
                                        type="monotone"
                                        dataKey="cpm"
                                        stroke="#111111"
                                        strokeWidth={2}
                                        dot={{ fill: '#111111', strokeWidth: 2, r: 4 }}
                                        activeDot={{ r: 6, fill: '#10B981' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </div>

                {/* Insights Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-8 md:mt-12 bg-gradient-to-r from-obsidian to-obsidian/90 rounded-2xl p-6 md:p-12"
                >
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="font-serif italic text-white/60 text-lg mb-2">
                                AI Insight
                            </h3>
                            <p className="text-2xl md:text-3xl font-sans font-medium text-white leading-relaxed">
                                Your CPM has increased by <span className="text-emerald-accent">133%</span> this year.
                                Posting between 2-4 PM yields{' '}
                                <span className="text-emerald-accent">23% higher</span> engagement.
                            </p>
                        </div>
                        <div className="flex md:justify-end">
                            <div className="bg-white/10 backdrop-blur rounded-xl p-6 max-w-xs">
                                <p className="text-white/60 text-sm mb-2">Projected Q1 Revenue</p>
                                <p className="font-data text-4xl font-bold text-white">
                                    $12,480
                                </p>
                                <p className="text-emerald-accent text-sm mt-2 flex items-center gap-1">
                                    <ArrowUpRight className="w-4 h-4" />
                                    +34% from current pace
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
