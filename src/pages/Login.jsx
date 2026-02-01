import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import TechnicalGrid from '../components/TechnicalGrid';
import ShimmerButton from '../components/ShimmerButton';

/**
 * Login - Authentication page/modal with sign in/sign up
 * @param {boolean} isModal - When true, renders without full-page wrapper
 * @param {function} onSuccess - Callback when login succeeds (for modal mode)
 */
export default function Login({ isModal = false, onSuccess }) {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const { signIn, signUp } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            if (isSignUp) {
                await signUp(email, password);
                setSuccess('Account created! Check your email to verify.');
            } else {
                await signIn(email, password);
                if (onSuccess) onSuccess();
            }
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const formContent = (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 w-full max-w-md"
        >
            {/* Logo */}
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <img
                        src="/urx-icon.svg"
                        alt="urX Logo"
                        className="w-12 h-12"
                    />
                    <span className="font-sans font-bold text-3xl text-obsidian">urX</span>
                </div>
                <p className="text-subtle">
                    {isSignUp ? 'Create your account' : 'Sign in to save your data'}
                </p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl border border-border-subtle shadow-sm p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div className="space-y-2">
                        <label htmlFor="login-email" className="block text-sm font-medium text-obsidian">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-subtle" />
                            <input
                                type="email"
                                id="login-email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                className="w-full pl-12 pr-4 py-3.5 bg-fog border border-transparent rounded-lg 
                                           font-data text-obsidian placeholder:text-subtle/50
                                           focus:outline-none focus:ring-1 focus:ring-obsidian/20 focus:border-obsidian/20
                                           transition-all"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label htmlFor="login-password" className="block text-sm font-medium text-obsidian">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-subtle" />
                            <input
                                type="password"
                                id="login-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                minLength={6}
                                className="w-full pl-12 pr-4 py-3.5 bg-fog border border-transparent rounded-lg 
                                           font-data text-obsidian placeholder:text-subtle/50
                                           focus:outline-none focus:ring-1 focus:ring-obsidian/20 focus:border-obsidian/20
                                           transition-all"
                            />
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-red-500 text-sm bg-red-50 px-4 py-3 rounded-lg"
                        >
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{error}</span>
                        </motion.div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-emerald-600 text-sm bg-emerald-50 px-4 py-3 rounded-lg"
                        >
                            <CheckCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{success}</span>
                        </motion.div>
                    )}

                    {/* Submit Button */}
                    <ShimmerButton type="submit" className="w-full justify-center" disabled={loading}>
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                {isSignUp ? 'Create Account' : 'Sign In'}
                                <ArrowRight className="w-4 h-4" />
                            </span>
                        )}
                    </ShimmerButton>
                </form>

                {/* Toggle Sign Up / Sign In */}
                <div className="mt-6 text-center">
                    <button
                        type="button"
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            setError(null);
                            setSuccess(null);
                        }}
                        className="text-subtle hover:text-obsidian text-sm transition-colors"
                    >
                        {isSignUp ? (
                            <>Already have an account? <span className="font-medium text-obsidian">Sign In</span></>
                        ) : (
                            <>Don't have an account? <span className="font-medium text-obsidian">Sign Up</span></>
                        )}
                    </button>
                </div>
            </div>

            {/* Footer */}
            <p className="text-center text-subtle text-xs mt-6">
                By continuing, you agree to our Terms and Privacy Policy.
            </p>
        </motion.div>
    );

    // Modal mode - just return the form
    if (isModal) {
        return formContent;
    }

    // Full page mode
    return (
        <div className="relative min-h-screen bg-canvas flex items-center justify-center px-4">
            <TechnicalGrid />
            {formContent}
        </div>
    );
}
