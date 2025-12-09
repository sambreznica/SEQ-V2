import React, { useState } from 'react';
import Section from '../components/Layout/Section';
import Button from '../components/UI/Button';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { submitEarlyAccess } from '../lib/earlyAccess';

const CTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const [futureSelf, setFutureSelf] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Basic validation
    if (!email || !email.includes('@')) {
        setError("Please enter a valid email address.");
        return;
    }

    setIsSubmitting(true);

    try {
        await submitEarlyAccess({
            email,
            future_state: futureSelf || undefined,
            source: "landing-footer"
        });

        console.info("[EarlyAccess] Landing footer submission stored.");
        setSubmitted(true);
        setEmail('');
        setFutureSelf('');
    } catch (err) {
        console.error("[EarlyAccess] Landing footer Supabase error:", err);
        setError("Something went wrong. Please try again.");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <Section className="text-center pb-32 pt-20 border-t border-seq-border/30 bg-gradient-to-b from-seq-ink to-seq-charcoal">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-10"
        >
            <div className="space-y-4">
                <h2 className="text-5xl md:text-6xl font-semibold text-white tracking-tighter">Be first.</h2>
                <p className="text-seq-subtext text-lg">We're onboarding in waves. Secure your position in the chain.</p>
            </div>
            
            {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto relative z-10">
                    <div className="group relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-seq-subtext/50 font-mono text-xs">
                            EMAIL_INPUT //
                        </div>
                        <input 
                            type="email" 
                            required
                            placeholder="operator@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isSubmitting}
                            className="w-full bg-seq-ink border border-seq-border text-white pl-32 pr-4 py-4 rounded-sm focus:border-seq-jade focus:ring-1 focus:ring-seq-jade outline-none transition-all placeholder:text-seq-subtext/20 font-mono text-sm disabled:opacity-50"
                        />
                    </div>
                    
                    <div className="group relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-seq-subtext/50 font-mono text-xs">
                            FUTURE_STATE //
                        </div>
                         <input 
                            type="text" 
                            value={futureSelf}
                            onChange={(e) => setFutureSelf(e.target.value)}
                            disabled={isSubmitting}
                            placeholder="Who are you becoming?"
                            className="w-full bg-seq-ink border border-seq-border text-white pl-32 pr-4 py-4 rounded-sm focus:border-seq-jade focus:ring-1 focus:ring-seq-jade outline-none transition-all placeholder:text-seq-subtext/20 font-mono text-sm disabled:opacity-50"
                        />
                    </div>

                    <Button 
                        variant="primary" 
                        className="w-full justify-center mt-2 py-4 text-base" 
                        icon={!isSubmitting ? <ArrowRight size={16}/> : undefined}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Join the Founding Cohort"}
                    </Button>
                    
                    {error && (
                        <p className="text-xs text-red-400 font-mono">
                            {error}
                        </p>
                    )}
                    
                    <p className="text-[10px] text-seq-subtext/40 font-mono pt-2">
                        NO SPAM. DIRECT CHANNEL ONLY. ENCRYPTED.
                    </p>
                </form>
            ) : (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-8 bg-seq-jade/5 border border-seq-jade/20 rounded-sm text-center space-y-4"
                >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-seq-jade/10 text-seq-jade mb-2">
                        <Check size={24} />
                    </div>
                    <h3 className="text-xl text-white font-medium">Sequence Initiated.</h3>
                    <p className="text-seq-subtext text-sm">
                        Check your inbox. We will contact you directly when your cohort window opens.
                    </p>
                </motion.div>
            )}
        </motion.div>
    </Section>
  );
};

export default CTA;
