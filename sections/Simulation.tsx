import React, { useState, useRef } from 'react';
import Section from '../components/Layout/Section';
import Button from '../components/UI/Button';
import { Upload, Film, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";

export const DEFAULT_SIMULATION_PROMPT = `
Generate an ultra-calm, cinematic brain-space visualization representing a thinking system.

Dark ink background. Thin luminous filaments forming a network of synapses (Linkages), small dim nodes for Causes, larger brighter nodes for Effects. Soft jade/teal pulses traveling along filaments to show signal flow and Coherence Δ increasing.

Subtle volumetric dust clouds representing uncertainty resolving into structure. Motion must be slow, deliberate, low-gravity, and seamless loop.

No anatomical brain, no neon colors, no text, no UI chrome — just a scientific, intelligent causal universe.
`.trim();

const Simulation: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [prompt, setPrompt] = useState(DEFAULT_SIMULATION_PROMPT);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      setVideoUrl(''); // Reset previous result
      setError('');
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data URL prefix
        const base64Data = result.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for API key in aistudio
    try {
        const aistudio = (window as any).aistudio;
        if (aistudio && !await aistudio.hasSelectedApiKey()) {
             await aistudio.openSelectKey();
        }
    } catch (err) {
        console.warn("API Key selection check failed, proceeding anyway", err);
    }

    setLoading(true);
    setError('');
    setStatus('Initializing APC Neural Interface...');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let base64Image = undefined;
      
      if (file) {
        setStatus('Processing Input Frame...');
        base64Image = await convertToBase64(file);
      }

      setStatus('Simulating Causal Sequence...');

      // Veo generation call
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        // Only include image if user provided one
        ...(base64Image && file ? {
            image: {
                imageBytes: base64Image,
                mimeType: file.type
            }
        } : {}),
        config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: aspectRatio
        }
      });

      // Polling loop
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({operation: operation});
        setStatus('Rendering Delta State...');
      }

      if (operation.response?.generatedVideos?.[0]?.video?.uri) {
         const downloadLink = operation.response.generatedVideos[0].video.uri;
         const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
         const blob = await response.blob();
         const videoObjectUrl = URL.createObjectURL(blob);
         setVideoUrl(videoObjectUrl);
         setStatus('Sequence Complete.');
      } else {
        throw new Error("Simulation failed to produce a valid URI.");
      }

    } catch (err: any) {
        console.error(err);
        setError(err.message || "An error occurred during simulation.");
        setStatus('Failed.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <Section className="border-t border-seq-border/30 bg-seq-charcoal/30 relative overflow-hidden">
        {/* Background aesthetic touches */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-seq-jade/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-seq-jade/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
            
            {/* Control Panel */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
            >
                <div>
                    <h2 className="text-3xl font-medium mb-2">Causal brain-space simulation.</h2>
                    <p className="text-seq-subtext">Visualize the internal logic of the engine. Generate high-fidelity causal loops using Veo.</p>
                </div>

                <form onSubmit={handleGenerate} className="space-y-6">
                    
                    {/* Prompt Input */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-mono text-seq-subtext uppercase tracking-wider">Simulation Directive</label>
                            <button 
                                type="button"
                                onClick={() => setPrompt(DEFAULT_SIMULATION_PROMPT)}
                                className="text-xs font-mono text-seq-jade hover:text-white transition-colors flex items-center gap-1"
                            >
                                <RefreshCw size={10} /> RESET_TO_DEFAULT
                            </button>
                        </div>
                        <textarea 
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            rows={8}
                            className="w-full bg-seq-ink border border-seq-border text-white px-4 py-3 rounded-sm focus:border-seq-jade focus:ring-1 focus:ring-seq-jade outline-none transition-all placeholder:text-seq-subtext/30 font-mono text-sm leading-relaxed resize-none"
                        />
                    </div>

                    {/* File Input (Optional) */}
                    <div className="space-y-2">
                         <label className="text-xs font-mono text-seq-subtext uppercase tracking-wider">Reference Frame (Optional)</label>
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className={`
                                border border-dashed rounded-sm p-6 text-center cursor-pointer transition-all duration-300 group
                                ${file ? 'border-seq-jade/50 bg-seq-jade/5' : 'border-seq-border hover:border-seq-jade/30 hover:bg-seq-panel'}
                            `}
                        >
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                accept="image/*" 
                                onChange={handleFileSelect} 
                                className="hidden" 
                            />
                            <div className="flex items-center justify-center gap-3">
                                <Upload size={16} className="text-seq-subtext group-hover:text-seq-jade" />
                                <span className="text-xs font-mono text-seq-subtext">
                                    {file ? file.name : "UPLOAD_STATIC_IMAGE_SOURCE"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Aspect Ratio Control */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                             <label className="text-xs font-mono text-seq-subtext uppercase tracking-wider">Dimensions</label>
                             <div className="flex gap-2">
                                <button 
                                    type="button"
                                    onClick={() => setAspectRatio('16:9')}
                                    className={`flex-1 py-2 text-xs font-mono border rounded-sm transition-colors ${aspectRatio === '16:9' ? 'border-seq-jade text-seq-jade bg-seq-jade/10' : 'border-seq-border text-seq-subtext'}`}
                                >
                                    16:9
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setAspectRatio('9:16')}
                                    className={`flex-1 py-2 text-xs font-mono border rounded-sm transition-colors ${aspectRatio === '9:16' ? 'border-seq-jade text-seq-jade bg-seq-jade/10' : 'border-seq-border text-seq-subtext'}`}
                                >
                                    9:16
                                </button>
                             </div>
                        </div>
                         <div className="space-y-2">
                             <label className="text-xs font-mono text-seq-subtext uppercase tracking-wider">Model</label>
                             <div className="py-2 px-3 text-xs font-mono border border-seq-border rounded-sm text-seq-subtext bg-seq-panel opacity-70">
                                VEO-3.1-PREVIEW
                             </div>
                         </div>
                    </div>

                    <Button 
                        disabled={loading}
                        className={`w-full ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        icon={loading ? <Loader2 className="animate-spin" size={16}/> : <Sparkles size={16}/>}
                    >
                        {loading ? status : "INITIATE SIMULATION"}
                    </Button>
                    
                    {error && (
                        <div className="text-red-400 text-xs font-mono border-l-2 border-red-400 pl-3 py-1">
                            Error: {error}
                        </div>
                    )}
                </form>
            </motion.div>

            {/* Preview / Result Area */}
            <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className={`relative aspect-video bg-seq-ink border border-seq-border rounded-sm overflow-hidden flex items-center justify-center group ${aspectRatio === '9:16' ? 'max-w-xs mx-auto aspect-[9/16]' : 'w-full'}`}
            >
                {!preview && !videoUrl && (
                    <div className="text-center space-y-3 opacity-30">
                        <Film size={48} className="mx-auto" />
                        <div className="text-xs font-mono">AWAITING_INPUT_SIGNAL</div>
                    </div>
                )}

                {/* Static Preview (if image uploaded) */}
                {preview && !videoUrl && !loading && (
                    <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-contain bg-black" />
                )}

                {/* Loading Overlay */}
                <AnimatePresence>
                    {loading && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-seq-ink/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center"
                        >
                            <div className="w-64 h-1 bg-seq-border rounded-full overflow-hidden mb-4">
                                <motion.div 
                                    className="h-full bg-seq-jade"
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '100%' }}
                                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                />
                            </div>
                            <span className="text-seq-jade font-mono text-xs tracking-widest animate-pulse">{status}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Result Video */}
                {videoUrl && (
                    <video 
                        src={videoUrl} 
                        controls 
                        autoPlay 
                        loop 
                        className="absolute inset-0 w-full h-full object-contain bg-black"
                    />
                )}
            </motion.div>
        </div>
    </Section>
  );
};

export default Simulation;