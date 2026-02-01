import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import PremiumCard from '../components/PremiumCard';

/**
 * Dashboard - Analytics display with cards and charts
 * Shows demo data initially, switches to user data when available
 */
export default function Dashboard({ cycles = [] }) {
    const [activeMetric, setActiveMetric] = useState('cpm');

    // Demo data for when user has no cycles
    const demoData = [
        { label: 'Jan 1-14', cpm: 1.85, revenue: 450, impressions: 243000 },
        { label: 'Jan 15-28', cpm: 2.10, revenue: 520, impressions: 248000 },
        { label: 'Jan 29-Feb 11', cpm: 2.35, revenue: 610, impressions: 260000 },
        { label: 'Feb 12-25', cpm: 2.50, revenue: 680, impressions: 272000 },
        { label: 'Feb 26-Mar 11', cpm: 2.84, revenue: 780, impressions: 275000 },
    ];

    const isDemo = cycles.length === 0;

    // Transform cycles into chart data format, or use demo
    const chartData = useMemo(() => {
        if (isDemo) {
            return demoData;
        }

        return cycles.map((cycle, index) => {
            const cpm = (cycle.revenue / cycle.impressions) * 1000;
            return {
                label: `Cycle ${index + 1}`,
                cpm: parseFloat(cpm.toFixed(2)),
                revenue: cycle.revenue,
                impressions: cycle.impressions,
            };
        });
    }, [cycles, isDemo]);

    // Calculate metrics from cycles or demo
    const metrics = useMemo(() => {
        const dataToUse = isDemo ? demoData : cycles.map(c => ({
            ...c,
            cpm: (c.revenue / c.impressions) * 1000
        }));

        const totalImpressions = dataToUse.reduce((sum, c) => sum + (c.impressions || 0), 0);
        const totalRevenue = dataToUse.reduce((sum, c) => sum + (c.revenue || 0), 0);
        const avgCpm = totalImpressions > 0 ? (totalRevenue / totalImpressions) * 1000 : 0;
        const revenuePer1M = totalImpressions > 0 ? (totalRevenue / totalImpressions) * 1000000 : 0;

        // Calculate growth trend
        let cpmChange = 0;
        let revenueChange = 0;
        if (dataToUse.length >= 2) {
            const first = dataToUse[0];
            const last = dataToUse[dataToUse.length - 1];
            const firstCpm = first.cpm || (first.revenue / first.impressions) * 1000;
            const lastCpm = last.cpm || (last.revenue / last.impressions) * 1000;
            cpmChange = firstCpm > 0 ? ((lastCpm - firstCpm) / firstCpm) * 100 : 0;
            revenueChange = first.revenue > 0 ? ((last.revenue - first.revenue) / first.revenue) * 100 : 0;
        }

        return {
            cpm: avgCpm.toFixed(2),
            revenuePer1M: revenuePer1M.toFixed(0),
            totalRevenue: totalRevenue.toFixed(2),
            growthTrend: revenueChange.toFixed(1),
            cpmChange: cpmChange >= 0 ? `+${cpmChange.toFixed(1)}` : cpmChange.toFixed(1),
            revenueChange: revenueChange >= 0 ? `+${revenueChange.toFixed(1)}` : revenueChange.toFixed(1),
            growthChange: revenueChange >= 0 ? `+${revenueChange.toFixed(1)}` : revenueChange.toFixed(1),
            hasData: !isDemo,
            isDemo,
        };
    }, [cycles, isDemo]);

    const metricCards = [
        {
            id: 'cpm',
            title: 'Effective CPM',
            value: `$${metrics.cpm}`,
            change: metrics.cpmChange,
            positive: parseFloat(metrics.cpmChange) >= 0,
            icon: DollarSign,
            description: 'Revenue per 1,000 impressions',
        },
        {
            id: 'revenue',
            title: 'Revenue per 1M',
            value: `$${metrics.revenuePer1M}`,
            change: metrics.revenueChange,
            positive: parseFloat(metrics.revenueChange) >= 0,
            icon: BarChart3,
            description: 'Projected revenue per million impressions',
        },
        {
            id: 'growth',
            title: 'Growth Trend',
            value: `${parseFloat(metrics.growthTrend) >= 0 ? '+' : ''}${metrics.growthTrend}%`,
            change: metrics.growthChange,
            positive: parseFloat(metrics.growthTrend) >= 0,
            icon: TrendingUp,
            description: cycles.length >= 2 ? 'First to last cycle comparison' : 'Add more cycles to see trend',
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
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <p className="font-serif italic text-subtle text-lg">
                            {metrics.isDemo ? 'Sample Analytics' : 'Lifetime Stats'}
                        </p>
                        {metrics.isDemo && (
                            <span className="bg-amber-100 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full">
                                Demo Data
                            </span>
                        )}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-sans font-semibold text-obsidian mb-4">
                        {metrics.isDemo ? 'Revenue Dashboard' : 'Your Revenue Dashboard'}
                    </h2>
                    <p className="text-subtle text-lg max-w-xl mx-auto">
                        {metrics.isDemo
                            ? 'See how your analytics will look. Add your first payout cycle below to see your real stats.'
                            : `Calculated from ${cycles.length} payout cycle${cycles.length > 1 ? 's' : ''}.`
                        }
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
                                    {metrics.hasData && cycles.length >= 2 && (
                                        <div className={`flex items-center gap-1 text-sm font-medium ${card.positive ? 'text-emerald-accent' : 'text-red-500'
                                            }`}>
                                            {card.positive ? (
                                                <ArrowUpRight className="w-4 h-4" />
                                            ) : (
                                                <ArrowDownRight className="w-4 h-4" />
                                            )}
                                            {card.change}%
                                        </div>
                                    )}
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
                                <p className="text-subtle text-sm">
                                    {cycles.length > 0 ? 'Your earnings per cycle' : 'Add cycles to see your data'}
                                </p>
                            </div>
                            {cycles.length > 0 && (
                                <span className="font-data text-sm text-emerald-accent bg-emerald-accent/10 px-3 py-1 rounded-full">
                                    ${cycles.reduce((sum, c) => sum + c.revenue, 0).toLocaleString()} total
                                </span>
                            )}
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
                                        dataKey="label"
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
                                <p className="text-subtle text-sm">
                                    {cycles.length > 0 ? 'Cost per mille over time' : 'Add cycles to see your data'}
                                </p>
                            </div>
                            {cycles.length > 0 && (
                                <span className="font-data text-sm text-emerald-accent bg-emerald-accent/10 px-3 py-1 rounded-full">
                                    ${metrics.cpm} avg
                                </span>
                            )}
                        </div>

                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#EAEAEA" />
                                    <XAxis
                                        dataKey="label"
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

                {/* Insights Section - Only show if we have data */}
                {cycles.length > 0 && (
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
                                    Your Stats
                                </h3>
                                <p className="text-2xl md:text-3xl font-sans font-medium text-white leading-relaxed">
                                    You've tracked <span className="text-emerald-accent">{cycles.length} cycle{cycles.length > 1 ? 's' : ''}</span> with
                                    an average CPM of <span className="text-emerald-accent">${metrics.cpm}</span>.
                                </p>
                            </div>
                            <div className="flex md:justify-end">
                                <div className="bg-white/10 backdrop-blur rounded-xl p-6 max-w-xs">
                                    <p className="text-white/60 text-sm mb-2">Total Revenue</p>
                                    <p className="font-data text-4xl font-bold text-white">
                                        ${cycles.reduce((sum, c) => sum + c.revenue, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </p>
                                    <p className="text-emerald-accent text-sm mt-2 flex items-center gap-1">
                                        <ArrowUpRight className="w-4 h-4" />
                                        {cycles.reduce((sum, c) => sum + c.impressions, 0).toLocaleString()} impressions
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
