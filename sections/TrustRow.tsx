import React from 'react';
import { ShieldCheck, Database, FileCheck } from 'lucide-react';

const TrustRow: React.FC = () => {
  return (
    <div className="w-full border-b border-seq-border/30 bg-seq-ink relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
        <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-16 opacity-70 hover:opacity-100 transition-opacity duration-300">
            
            {/* Badge 1 */}
            <div className="flex items-center gap-3 group cursor-default">
                <FileCheck size={16} className="text-seq-subtext group-hover:text-seq-jade transition-colors" />
                <span className="text-xs font-mono text-seq-subtext uppercase tracking-wider">Cited Outputs</span>
            </div>

            {/* Badge 2 */}
            <div className="flex items-center gap-3 group cursor-default">
                <ShieldCheck size={16} className="text-seq-subtext group-hover:text-seq-jade transition-colors" />
                <span className="text-xs font-mono text-seq-subtext uppercase tracking-wider">Secure by Design</span>
            </div>

            {/* Badge 3 */}
            <div className="flex items-center gap-3 group cursor-default">
                <Database size={16} className="text-seq-subtext group-hover:text-seq-jade transition-colors" />
                <span className="text-xs font-mono text-seq-subtext uppercase tracking-wider">Transparent Lineage</span>
            </div>

        </div>
      </div>
    </div>
  );
};

export default TrustRow;