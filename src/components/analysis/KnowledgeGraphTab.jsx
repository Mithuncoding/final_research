import { useEffect, useState, useRef, useCallback } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { Card } from '../ui/Card';
import { Maximize2, Minimize2, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

// Stunning color palette for nodes
const NODE_COLORS = {
  main: '#ff0066',      // Hot pink for main concept
  method: '#00ffcc',    // Cyan for methods
  finding: '#ffcc00',   // Gold for findings
  dataset: '#00ccff',   // Blue for datasets
  challenge: '#ff6633', // Orange for challenges
  solution: '#66ff66',  // Green for solutions
  result: '#cc66ff',    // Purple for results
  technique: '#ff99cc', // Pink for techniques
  concept: '#66ccff',   // Light blue for concepts
};

export default function KnowledgeGraphTab({ analysis }) {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);
  const graphRef = useRef();

  useEffect(() => {
    if (analysis) {
      console.log('📊 Generating graph from analysis:', analysis);
      const data = generateGraphData(analysis);
      console.log('📊 Generated graph data:', data);
      setGraphData(data);
    }
  }, [analysis]);

  // Auto-rotate effect
  useEffect(() => {
    let angle = 0;
    let animationId;
    
    const rotate = () => {
      if (graphRef.current) {
        angle += 0.003;
        const distance = 350;
        graphRef.current.cameraPosition({
          x: distance * Math.sin(angle),
          y: 100,
          z: distance * Math.cos(angle)
        });
      }
      animationId = requestAnimationFrame(rotate);
    };
    
    // Start rotation after a short delay to let the graph initialize
    const timeout = setTimeout(() => rotate(), 1000);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationId);
    };
  }, [graphData]);

  const generateGraphData = (data) => {
    // Check if we have structured knowledge graph data
    if (data.knowledgeGraph && data.knowledgeGraph.nodes && data.knowledgeGraph.nodes.length > 0) {
      console.log('✅ Using pre-loaded knowledge graph');
      return {
        nodes: data.knowledgeGraph.nodes.map(n => ({ 
          ...n, 
          val: n.val || 15,
          color: getNodeColor(n.type || n.group)
        })),
        links: data.knowledgeGraph.links.map(l => ({
          ...l
        }))
      };
    }

    console.log('⚠️ No knowledge graph, generating from analysis...');
    
    // Fallback: Generate graph from analysis data
    const nodes = [];
    const links = [];
    
    // Central node
    nodes.push({ 
      id: 'paper', 
      label: data.title?.substring(0, 30) + '...' || 'Research Paper', 
      group: 1, 
      val: 30,
      type: 'main',
      color: NODE_COLORS.main
    });

    // Add key findings as nodes
    if (data.keyFindings && data.keyFindings.length > 0) {
      data.keyFindings.forEach((finding, i) => {
        const id = `finding-${i}`;
        const label = typeof finding === 'string' 
          ? finding.substring(0, 25) + '...' 
          : finding.finding?.substring(0, 25) + '...';
        nodes.push({ 
          id, 
          label, 
          group: 3, 
          val: 15,
          type: 'finding',
          color: NODE_COLORS.finding
        });
        links.push({ source: 'paper', target: id });
      });
    }

    // Add methodology
    if (data.methodology) {
      nodes.push({ 
        id: 'method', 
        label: 'Methodology', 
        group: 2, 
        val: 20,
        type: 'method',
        color: NODE_COLORS.method
      });
      links.push({ source: 'paper', target: 'method' });
    }

    // Add problem statement
    if (data.problemStatement) {
      nodes.push({ 
        id: 'problem', 
        label: 'Problem', 
        group: 5, 
        val: 18,
        type: 'challenge',
        color: NODE_COLORS.challenge
      });
      links.push({ source: 'paper', target: 'problem' });
    }

    return { nodes, links };
  };

  const getNodeColor = (type) => {
    if (typeof type === 'number') {
      const colors = Object.values(NODE_COLORS);
      return colors[type % colors.length];
    }
    return NODE_COLORS[type] || NODE_COLORS.concept;
  };

  const handleNodeClick = useCallback((node) => {
    if (!graphRef.current) return;
    
    const distance = 120;
    const distRatio = 1 + distance / Math.hypot(node.x || 1, node.y || 1, node.z || 1);

    graphRef.current.cameraPosition(
      { x: (node.x || 0) * distRatio, y: (node.y || 0) * distRatio, z: (node.z || 0) * distRatio },
      node,
      1500
    );
  }, []);

  const resetCamera = () => {
    graphRef.current?.cameraPosition({ x: 0, y: 100, z: 400 }, { x: 0, y: 0, z: 0 }, 1000);
  };

  return (
    <div className={`relative transition-all duration-500 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      <Card className={`relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 ${isFullscreen ? 'rounded-none h-screen' : 'h-[650px] rounded-2xl'}`}>
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Control Panel */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <Button 
            size="sm" 
            variant="secondary"
            onClick={resetCamera}
            className="bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button 
            size="sm" 
            variant="secondary"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>

        {/* Title Panel */}
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-gradient-to-r from-purple-900/90 to-slate-900/90 backdrop-blur-xl px-6 py-4 rounded-2xl border border-purple-500/30 shadow-2xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Knowledge Graph</h3>
                <p className="text-purple-300 text-sm">3D Concept Visualization</p>
              </div>
            </div>
            <div className="flex gap-4 mt-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-pink-500 shadow-lg shadow-pink-500/50" />
                <span className="text-slate-300">{graphData.nodes.length} Nodes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50" />
                <span className="text-slate-300">{graphData.links.length} Links</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hovered Node Info */}
        {hoveredNode && (
          <div className="absolute bottom-4 left-4 z-20 animate-fadeIn">
            <div className="bg-slate-900/95 backdrop-blur-xl px-5 py-3 rounded-xl border border-purple-500/30 shadow-2xl max-w-sm">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full shadow-lg"
                  style={{ backgroundColor: hoveredNode.color }} 
                />
                <span className="font-semibold text-white">{hoveredNode.label}</span>
              </div>
              {hoveredNode.type && (
                <p className="text-purple-300 text-sm mt-1 capitalize">Type: {hoveredNode.type}</p>
              )}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 right-4 z-20">
          <div className="bg-slate-900/80 backdrop-blur-xl px-4 py-3 rounded-xl border border-white/10">
            <p className="text-xs text-slate-400 mb-2 font-semibold">Legend</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              {Object.entries(NODE_COLORS).slice(0, 6).map(([key, color]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }} />
                  <span className="text-slate-300 capitalize">{key}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The 3D Graph */}
        <ForceGraph3D
          ref={graphRef}
          graphData={graphData}
          nodeLabel="label"
          nodeColor={node => node.color || '#ffffff'}
          nodeVal={node => node.val || 10}
          nodeOpacity={0.9}
          linkColor={() => '#ffffff'}
          linkOpacity={0.3}
          linkWidth={2}
          linkDirectionalParticles={3}
          linkDirectionalParticleWidth={3}
          linkDirectionalParticleColor={() => '#00ffcc'}
          linkDirectionalParticleSpeed={0.006}
          backgroundColor="transparent"
          onNodeClick={handleNodeClick}
          onNodeHover={node => setHoveredNode(node)}
          showNavInfo={false}
          enableNodeDrag={true}
          warmupTicks={50}
          cooldownTicks={100}
        />
      </Card>
    </div>
  );
}
