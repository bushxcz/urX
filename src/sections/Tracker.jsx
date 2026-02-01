import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, DollarSign, Users, ChevronRight } from 'lucide-react';
import ShimmerButton from '../components/ShimmerButton';

/**
 * Tracker - Input form for monetization stats
 */
export default function Tracker({ onSubmit }) {
    const [formData, setFormData] = useState({
        dateStart: '',
        dateEnd: '',
        impressions: '',
        revenue: '',
        engagement: '',
        followers: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        }
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
            placeholder: '1,250,000',
        },
        {
            name: 'revenue',
            label: 'Ad Revenue Share ($)',
            type: 'number',
            icon: DollarSign,
            placeholder: '1,450.00',
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
        {
            name: 'followers',
            label: 'Follower Count',
            type: 'number',
            icon: Users,
            placeholder: '50,000',
        },
    ];

    return (
        <section id="tracker" className="relative pt-12 md:pt-24 pb-8 md:pb-12 px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8 md:mb-16"
                >
                    <p className="font-serif italic text-subtle text-lg mb-4">
                        Input Interface
                    </p>
                    <h2 className="text-4xl md:text-5xl font-sans font-semibold text-obsidian mb-4">
                        Track Your Stats
                    </h2>
                    <p className="text-subtle text-lg max-w-xl mx-auto">
                        Enter your X monetization data to analyze your revenue efficiency and growth patterns.
                    </p>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-white rounded-2xl border border-border-subtle shadow-sm p-6 md:p-12"
                >
                    <form onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 gap-6">
                            {inputFields.map((field, index) => {
                                const Icon = field.icon;
                                return (
                                    <motion.div
                                        key={field.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                        className="space-y-2"
                                    >
                                        <label
                                            htmlFor={field.name}
                                            className="block text-sm font-medium text-obsidian"
                                        >
                                            {field.label}
                                        </label>
                                        <div className="relative">
                                            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-subtle" />
                                            <input
                                                type={field.type}
                                                id={field.name}
                                                name={field.name}
                                                value={formData[field.name]}
                                                onChange={handleChange}
                                                placeholder={field.placeholder}
                                                step={field.step}
                                                className="w-full pl-12 pr-4 py-3.5 bg-fog border border-transparent rounded-lg 
                                   font-data text-obsidian placeholder:text-subtle/50
                                   focus:outline-none focus:ring-1 focus:ring-obsidian/20 focus:border-obsidian/20
                                   transition-all"
                                            />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Submit Button */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="mt-10 flex justify-center"
                        >
                            <ShimmerButton type="submit" className="whitespace-nowrap">
                                Analyze
                            </ShimmerButton>
                        </motion.div>
                    </form>
                </motion.div>

                {/* Helper Text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="text-center text-subtle text-sm mt-6"
                >
                    Your data is processed locally. We never store your sensitive information.
                </motion.p>
            </div>
        </section>
    );
}
