import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, BarChart3, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import PremiumCard from '../components/PremiumCard';

/**
 * CycleAnalytics - Analytics display for multi-cycle payout analysis
 * Shows per-cycle metrics, averages, and trends
 */
export default function CycleAnalytics({ cycles }) {
    // Calculate metrics for each cycle and averages
    const analytics = useMemo(() => {
        if (cycles.length === 0) return null;

        const cycleMetrics = cycles.map((cycle, index) => {
            const ppi = cycle.revenue / cycle.impressions;
            const engagements = cycle.impressions * (cycle.engagement / 100);
            const ppe = engagements > 0 ? cycle.revenue / engagements : 0;

            return {
                ...cycle,
                cycleNumber: index + 1,
                label: `Cycle ${index + 1}`,
                ppi,
                ppe,
                engagements,
            };
        });

        // Calculate averages
        const totalRevenue = cycles.reduce((sum, c) => sum + c.revenue, 0);
        const totalImpressions = cycles.reduce((sum, c) => sum + c.impressions, 0);
        const avgPPI = cycleMetrics.reduce((sum, c) => sum + c.ppi, 0) / cycles.length;
        const avgPPE = cycleMetrics.reduce((sum, c) => sum + c.ppe, 0) / cycles.length;
        const avgRevenue = totalRevenue / cycles.length;
        const avgEngagement = cycles.reduce((sum, c) => sum + c.engagement, 0) / cycles.length;

        // Calculate trends (comparing last to first)
        let ppiTrend = 0;
        let ppeTrend = 0;
        let revenueTrend = 0;

        if (cycles.length >= 2) {
            const first = cycleMetrics[0];
            const last = cycleMetrics[cycleMetrics.length - 1];
            ppiTrend = ((last.ppi - first.ppi) / first.ppi) * 100;
            ppeTrend = ((last.ppe - first.ppe) / first.ppe) * 100;
            revenueTrend = ((last.revenue - first.revenue) / first.revenue) * 100;
        }

        return {
            cycleMetrics,
            totalRevenue,
            totalImpressions,
            avgPPI,
            avgPPE,
            avgRevenue,
            avgEngagement,
            ppiTrend,
            ppeTrend,
            revenueTrend,
        };
    }, [cycles]);

    if (!analytics || cycles.length === 0) {
        return null;
    }

    const summaryCards = [
        {
            id: 'avgPPI',
            title: 'Average Pay per Impression',
            value: `$${analytics.avgPPI.toFixed(6)}`,
            trend: analytics.ppiTrend,
            icon: DollarSign,
            description: 'Revenue earned per single impression',
        },
        {
            id: 'avgPPE',
            title: 'Average Pay per Engagement',
            value: `$${analytics.avgPPE.toFixed(4)}`,
            trend: analytics.ppeTrend,
            icon: Target,
            description: 'Revenue earned per engagement action',
        },
        {
            id: 'totalRevenue',
            title: 'Total Revenue',
            value: `$${analytics.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            trend: analytics.revenueTrend,
            icon: BarChart3,
            description: `Sum of ${cycles.length} payout cycles`,
        },
        {
            id: 'avgRevenue',
            title: 'Average per Cycle',
            value: `$${analytics.avgRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            trend: null,
            icon: TrendingUp,
            description: 'Mean revenue per 2-week period',
        },
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white border border-border-subtle rounded-lg shadow-lg p-4">
                    <p className="font-sans font-medium text-obsidian mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="font-data text-sm" style={{ color: entry.color }}>
                            {entry.name === 'ppi' ? 'PPI' : entry.name === 'ppe' ? 'PPE' : entry.name === 'revenue' ? 'Revenue' : entry.name}:
                            {entry.name === 'revenue' ? ` $${entry.value.toLocaleString()}` : ` $${entry.value.toFixed(6)}`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <section id="cycle-analytics" className="relative pt-8 md:pt-12 pb-12 md:pb-24 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8 md:mb-12"
                >
                    <p className="font-serif italic text-subtle text-lg mb-4">
                        Multi-Cycle Insights
                    </p>
                    <h2 className="text-4xl md:text-5xl font-sans font-semibold text-obsidian mb-4">
                        Payout Analytics
                    </h2>
                    <p className="text-subtle text-lg max-w-xl mx-auto">
                        Analyze your pay-per-impression and pay-per-engagement trends across all cycles.
                    </p>
                </motion.div>

                {/* Summary Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
                    {summaryCards.map((card, index) => {
                        const Icon = card.icon;
                        const hasTrend = card.trend !== null && !isNaN(card.trend) && isFinite(card.trend);
                        const isPositive = card.trend >= 0;

                        return (
                            <PremiumCard key={card.id} delay={index * 0.1}>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 bg-fog rounded-xl flex items-center justify-center">
                                        <Icon className="w-6 h-6 text-obsidian" />
                                    </div>
                                    {hasTrend && (
                                        <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-emerald-accent' : 'text-red-500'}`}>
                                            {isPositive ? (
                                                <ArrowUpRight className="w-4 h-4" />
                                            ) : (
                                                <ArrowDownRight className="w-4 h-4" />
                                            )}
                                            {Math.abs(card.trend).toFixed(1)}%
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-subtle text-sm font-medium mb-1">
                                    {card.title}
                                </h3>
                                <p className="font-data text-2xl md:text-3xl font-semibold text-obsidian mb-2">
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
                    {/* Revenue Trend Chart */}
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
                                    Revenue per Cycle
                                </h3>
                                <p className="text-subtle text-sm">Earnings trend across payout periods</p>
                            </div>
                            <span className="font-data text-sm text-emerald-accent bg-emerald-accent/10 px-3 py-1 rounded-full">
                                {cycles.length} cycles
                            </span>
                        </div>

                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={analytics.cycleMetrics}>
                                    <defs>
                                        <linearGradient id="revenueGradientCycle" x1="0" y1="0" x2="0" y2="1">
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
                                        fill="url(#revenueGradientCycle)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* PPI/PPE Trend Chart */}
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
                                    PPI & PPE Trends
                                </h3>
                                <p className="text-subtle text-sm">Pay-per-impression vs engagement</p>
                            </div>
                            <div className="flex items-center gap-4 text-xs">
                                <span className="flex items-center gap-1">
                                    <span className="w-3 h-3 bg-obsidian rounded-full"></span>
                                    PPI
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="w-3 h-3 bg-emerald-accent rounded-full"></span>
                                    PPE
                                </span>
                            </div>
                        </div>

                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={analytics.cycleMetrics}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#EAEAEA" />
                                    <XAxis
                                        dataKey="label"
                                        tick={{ fill: 'rgba(17,17,17,0.6)', fontSize: 12 }}
                                        axisLine={{ stroke: '#EAEAEA' }}
                                    />
                                    <YAxis
                                        tick={{ fill: 'rgba(17,17,17,0.6)', fontSize: 12 }}
                                        axisLine={{ stroke: '#EAEAEA' }}
                                        tickFormatter={(value) => `$${value.toFixed(4)}`}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line
                                        type="monotone"
                                        dataKey="ppe"
                                        name="ppe"
                                        stroke="#10B981"
                                        strokeWidth={2}
                                        dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                                        activeDot={{ r: 6, fill: '#10B981' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </div>

                {/* Averages Summary Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-8 md:mt-12 bg-gradient-to-r from-obsidian to-obsidian/90 rounded-2xl p-6 md:p-10"
                >
                    <div className="grid md:grid-cols-4 gap-6 md:gap-8">
                        <div className="text-center md:text-left">
                            <p className="font-serif italic text-white/60 text-sm mb-1">Cycles Analyzed</p>
                            <p className="font-data text-3xl md:text-4xl font-bold text-white">{cycles.length}</p>
                        </div>
                        <div className="text-center md:text-left">
                            <p className="font-serif italic text-white/60 text-sm mb-1">Total Impressions</p>
                            <p className="font-data text-3xl md:text-4xl font-bold text-white">
                                {(analytics.totalImpressions / 1000000).toFixed(2)}M
                            </p>
                        </div>
                        <div className="text-center md:text-left">
                            <p className="font-serif italic text-white/60 text-sm mb-1">Avg Engagement</p>
                            <p className="font-data text-3xl md:text-4xl font-bold text-white">
                                {analytics.avgEngagement.toFixed(1)}%
                            </p>
                        </div>
                        <div className="text-center md:text-left">
                            <p className="font-serif italic text-white/60 text-sm mb-1">Total Earnings</p>
                            <p className="font-data text-3xl md:text-4xl font-bold text-emerald-accent">
                                ${analytics.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
