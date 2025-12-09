import React from 'react';
import DiagramCanvas from '../components/Visuals/Diagrams/DiagramCanvas';
import ArchitectureDiagram from '../components/Visuals/Diagrams/ArchitectureDiagram';
import LinkageGraph from '../components/Visuals/Diagrams/LinkageGraph';
import CoherenceChart from '../components/Visuals/Diagrams/CoherenceChart';

const Diagrams: React.FC = () => {
  return (
    <div className="bg-seq-ink min-h-screen w-full text-seq-text font-sans selection:bg-seq-jade/20 selection:text-seq-jade pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-medium text-white tracking-tight mb-4">
            Sequence Visual Language
          </h1>
          <p className="text-seq-subtext max-w-2xl mx-auto">
            High-fidelity scientific diagrams rendered in code.
          </p>
        </div>

        <div className="grid gap-16">
          {/* Diagram 1: Architecture */}
          <DiagramCanvas
            title="Sequence Engine Architecture"
            figureNum="01"
            caption="The core feedback loop: Future State drives Frame selection, which informs Linkages and Options. Action outcomes update Coherence Δ."
          >
            <ArchitectureDiagram />
          </DiagramCanvas>

          {/* Diagram 2: Linkage Graph */}
          <DiagramCanvas
            title="Causal Linkage Graph"
            figureNum="02"
            caption="A Directed Acyclic Graph (DAG) representing dependencies. Hover over the Target State to visualize the critical path."
          >
            <LinkageGraph />
          </DiagramCanvas>

          {/* Diagram 3: Coherence Chart */}
          <DiagramCanvas
            title="Coherence Δ Over Time"
            figureNum="03"
            caption="Real-time tracking of prediction error minimization. Upward trend indicates increasing coherence and reduced entropy."
          >
            <CoherenceChart />
          </DiagramCanvas>
        </div>

      </div>
    </div>
  );
};

export default Diagrams;


