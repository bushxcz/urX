import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, TrendingUp, DollarSign, Users, Plus, Trash2, ChevronDown } from 'lucide-react';
import ShimmerButton from '../components/ShimmerButton';

/**
 * CycleTracker - Multi-cycle payout input and tracking
 * Allows users to add 5+ payout cycles (each lasting 2 weeks)
 */
export default function CycleTracker({ cycles, onAddCycle, onDeleteCycle }) {
    const [isFormOpen, setIsFormOpen] = useState(true);
    const [formData, setFormData] = useState({
        dateStart: '',
        dateEnd: '',
        impressions: '',
        revenue: '',
        engagement: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.dateStart && formData.dateEnd && formData.impressions && formData.revenue && formData.engagement) {
            onAddCycle({
                ...formData,
                id: Date.now(),
                impressions: parseFloat(formData.impressions),
                revenue: parseFloat(formData.revenue),
                engagement: parseFloat(formData.engagement),
            });
            // Reset form
            setFormData({
                dateStart: '',
                dateEnd: '',
                impressions: '',
                revenue: '',
                engagement: '',
            });
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const calculatePPI = (revenue, impressions) => {
        return impressions > 0 ? (revenue / impressions).toFixed(6) : '0';
    };

    const calculatePPE = (revenue, impressions, engagement) => {
        const engagements = impressions * (engagement / 100);
        return engagements > 0 ? (revenue / engagements).toFixed(4) : '0';
    };

    const inputFields = [
        {
            name: 'dateStart',
            label: 'Start Date',
            type: 'date',
            icon: Calendar,
            placeholder: '',
        },
        {
            name: 'dateEnd',
            label: 'End Date',
            type: 'date',
            icon: Calendar,
            placeholder: '',
        },
        {
            name: 'impressions',
            label: 'Total Impressions',
            type: 'number',
            icon: TrendingUp,
            placeholder: '1,000,000',
        },
        {
            name: 'revenue',
            label: 'Revenue ($)',
            type: 'number',
            icon: DollarSign,
            placeholder: '450.00',
            step: '0.01',
        },
        {
            name: 'engagement',
            label: 'Engagement Rate (%)',
            type: 'number',
            icon: Users,
            placeholder: '4.5',
            step: '0.1',
        },
    ];

    return (
        <section id="cycle-tracker" className="relative pt-8 md:pt-12 pb-4 md:pb-8 px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8 md:mb-12"
                >
                    <p className="font-serif italic text-subtle text-lg mb-4">
                        Multi-Cycle Analysis
                    </p>
                    <h2 className="text-4xl md:text-5xl font-sans font-semibold text-obsidian mb-4">
                        Track Your Payout Cycles
                    </h2>
                    <p className="text-subtle text-lg max-w-xl mx-auto">
                        Add your 2-week payout cycles to analyze pay-per-impression and engagement trends over time.
                    </p>
                </motion.div>

                {/* Add Cycle Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-white rounded-2xl border border-border-subtle shadow-sm overflow-hidden mb-8"
                >
                    {/* Form Header */}
                    <button
                        onClick={() => setIsFormOpen(!isFormOpen)}
                        className="w-full flex items-center justify-between p-6 hover:bg-fog/50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-accent/10 rounded-xl flex items-center justify-center">
                                <Plus className="w-5 h-5 text-emerald-accent" />
                            </div>
                            <span className="font-sans font-medium text-obsidian">Add New Payout Cycle</span>
                        </div>
                        <motion.div
                            animate={{ rotate: isFormOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown className="w-5 h-5 text-subtle" />
                        </motion.div>
                    </button>

                    {/* Collapsible Form */}
                    <AnimatePresence>
                        {isFormOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <form onSubmit={handleSubmit} className="p-6 pt-0 border-t border-border-subtle">
                                    <div className="grid md:grid-cols-3 gap-4 pt-6">
                                        {inputFields.map((field) => {
                                            const Icon = field.icon;
                                            return (
                                                <div key={field.name} className="space-y-2">
                                                    <label
                                                        htmlFor={`cycle-${field.name}`}
                                                        className="block text-sm font-medium text-obsidian"
                                                    >
                                                        {field.label}
                                                    </label>
                                                    <div className="relative">
                                                        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-subtle" />
                                                        <input
                                                            type={field.type}
                                                            id={`cycle-${field.name}`}
                                                            name={field.name}
                                                            value={formData[field.name]}
                                                            onChange={handleChange}
                                                            placeholder={field.placeholder}
                                                            step={field.step}
                                                            required
                                                            className="w-full pl-10 pr-4 py-3 bg-fog border border-transparent rounded-lg 
                                                               font-data text-obsidian placeholder:text-subtle/50
                                                               focus:outline-none focus:ring-1 focus:ring-obsidian/20 focus:border-obsidian/20
                                                               transition-all text-sm"
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="mt-6 flex justify-end">
                                        <ShimmerButton type="submit">
                                            Add
                                        </ShimmerButton>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Cycles Table */}
                {cycles.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-2xl border border-border-subtle shadow-sm overflow-hidden"
                    >
                        <div className="p-6 border-b border-border-subtle">
                            <h3 className="font-sans font-medium text-obsidian">
                                Payout Cycles ({cycles.length})
                            </h3>
                            <p className="text-subtle text-sm mt-1">
                                Your tracked 2-week payout periods
                            </p>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-fog/50">
                                        <th className="text-left text-xs font-medium text-subtle uppercase tracking-wider px-6 py-3">
                                            #
                                        </th>
                                        <th className="text-left text-xs font-medium text-subtle uppercase tracking-wider px-6 py-3">
                                            Date Range
                                        </th>
                                        <th className="text-right text-xs font-medium text-subtle uppercase tracking-wider px-6 py-3">
                                            Impressions
                                        </th>
                                        <th className="text-right text-xs font-medium text-subtle uppercase tracking-wider px-6 py-3">
                                            Revenue
                                        </th>
                                        <th className="text-right text-xs font-medium text-subtle uppercase tracking-wider px-6 py-3">
                                            Engagement
                                        </th>
                                        <th className="text-right text-xs font-medium text-subtle uppercase tracking-wider px-6 py-3">
                                            PPI
                                        </th>
                                        <th className="text-right text-xs font-medium text-subtle uppercase tracking-wider px-6 py-3">
                                            PPE
                                        </th>
                                        <th className="text-center text-xs font-medium text-subtle uppercase tracking-wider px-6 py-3">

                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-subtle">
                                    <AnimatePresence>
                                        {cycles.map((cycle, index) => (
                                            <motion.tr
                                                key={cycle.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{ duration: 0.3 }}
                                                className="hover:bg-fog/30 transition-colors"
                                            >
                                                <td className="px-6 py-4 font-data text-sm text-subtle">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="font-data text-sm text-obsidian">
                                                        {formatDate(cycle.dateStart)} – {formatDate(cycle.dateEnd)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right font-data text-sm text-obsidian">
                                                    {cycle.impressions.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 text-right font-data text-sm text-obsidian font-medium">
                                                    ${cycle.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </td>
                                                <td className="px-6 py-4 text-right font-data text-sm text-obsidian">
                                                    {cycle.engagement}%
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className="font-data text-sm text-emerald-accent font-medium">
                                                        ${calculatePPI(cycle.revenue, cycle.impressions)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className="font-data text-sm text-emerald-accent font-medium">
                                                        ${calculatePPE(cycle.revenue, cycle.impressions, cycle.engagement)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={() => onDeleteCycle(cycle.id)}
                                                        className="p-2 text-subtle hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete cycle"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}

                {/* Empty State */}
                {cycles.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 bg-fog/30 rounded-2xl border border-dashed border-border-subtle"
                    >
                        <div className="w-16 h-16 bg-fog rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-8 h-8 text-subtle" />
                        </div>
                        <p className="text-subtle font-medium mb-2">No cycles added yet</p>
                        <p className="text-subtle text-sm max-w-sm mx-auto">
                            Add your first 2-week payout cycle above to start tracking your revenue trends.
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
