// Demo Mode Data - Pre-loaded analysis for offline demonstration
// This allows the app to work without API calls during presentations

export const DEMO_PAPER = {
  name: "LLMs for Scientific Discovery - Nature 2024.pdf",
  text: `Large Language Models for Scientific Discovery: A Comprehensive Analysis

Abstract
Large Language Models (LLMs) are revolutionizing scientific research across domains. This comprehensive study analyzes the application of GPT-4, Claude, and open-source models (LLaMA, Mistral) in accelerating scientific discovery. We evaluate performance on 500+ research papers across biology, chemistry, physics, and materials science. Our findings demonstrate that LLM-assisted research reduces literature review time by 73%, improves hypothesis generation quality by 45%, and achieves 94.3% accuracy in extracting key findings. We introduce PRISM-Bench, a new benchmark for evaluating AI research assistants, and propose a framework for responsible AI-augmented scientific discovery.

1. Introduction
The exponential growth of scientific literature has created an unprecedented challenge for researchers. With over 5 million papers published annually, no human can comprehensively review their field. Large Language Models offer a transformative solution by enabling rapid synthesis of vast knowledge bases, intelligent hypothesis generation, and automated experimental design suggestions.

Recent advances in LLMs—particularly GPT-4's 128K context window and multimodal capabilities—have opened new frontiers in AI-assisted research. These models can now process entire research papers, understand complex figures, and generate novel hypotheses grounded in existing literature.

2. Methodology
2.1 Dataset Construction
We curated a diverse corpus of 500 peer-reviewed papers from Nature, Science, Cell, and Physical Review Letters (2020-2024). Papers were stratified across:
- Biology/Medicine: 150 papers (genomics, drug discovery, protein structure)
- Chemistry: 120 papers (synthesis, catalysis, materials)
- Physics: 130 papers (quantum computing, condensed matter, astrophysics)
- Interdisciplinary: 100 papers (AI for science, computational biology)

2.2 Evaluation Framework
We developed PRISM-Bench with the following metrics:
- Factual Accuracy: Does the summary correctly represent findings?
- Comprehensiveness: Are all key contributions captured?
- Critical Analysis: Does the AI identify limitations and future directions?
- Hypothesis Quality: Are generated hypotheses novel and testable?

2.3 Model Comparison
We evaluated:
- GPT-4 Turbo (128K context)
- Claude 3 Opus (200K context)
- Gemini 1.5 Pro (1M context)
- LLaMA-3 70B (open-source baseline)
- Mistral Large (open-source)

3. Results

3.1 Literature Review Acceleration
LLM-assisted review dramatically reduced research time:
- Traditional manual review: 8.2 hours per paper
- LLM-assisted review: 2.2 hours per paper (73% reduction)
- Quality scores remained comparable (4.2 vs 4.1 on 5-point scale)

3.2 Summary Accuracy
Model performance on factual accuracy (PRISM-Bench):
| Model | Accuracy | Comprehensiveness | Critical Analysis |
|-------|----------|-------------------|-------------------|
| GPT-4 Turbo | 94.3% | 91.2% | 87.5% |
| Claude 3 Opus | 93.8% | 92.4% | 89.1% |
| Gemini 1.5 Pro | 92.1% | 90.8% | 85.3% |
| LLaMA-3 70B | 87.2% | 84.1% | 78.4% |

3.3 Hypothesis Generation
"LLMs generated novel, testable hypotheses in 78% of evaluated papers, with 23% leading to successful experimental validation" - Section 3.3

Expert blind review rated LLM-generated hypotheses:
- Novelty: 4.1/5.0 (comparable to human-generated: 4.3/5.0)
- Testability: 4.4/5.0 (higher than human-generated: 4.0/5.0)
- Scientific rigor: 3.9/5.0 (slightly lower than human: 4.5/5.0)

3.4 Cross-Domain Discovery
Most exciting finding: LLMs identified cross-domain connections missed by human experts in 34% of cases. Example: An LLM connected protein folding dynamics research with quantum error correction algorithms, inspiring a novel quantum-inspired protein structure prediction approach.

4. Discussion

4.1 Transformative Potential
"The integration of LLMs into the scientific workflow represents a paradigm shift comparable to the introduction of electronic databases in the 1990s" - Section 4.1

Key benefits observed:
- Democratization of access to cutting-edge research synthesis
- Reduction of cognitive load on researchers
- Acceleration of interdisciplinary discovery

4.2 Limitations and Challenges
- Hallucination risk: LLMs occasionally generate plausible but incorrect claims (5.7% error rate)
- Citation accuracy: Only 82% of LLM-generated citations were verified as accurate
- Bias propagation: Models may amplify existing biases in training data
- Reproducibility: Stochastic outputs complicate exact reproduction

4.3 Responsible AI in Science
We propose the FAIR-AI framework for responsible use:
- Findability: Clear attribution of AI-assisted contributions
- Accountability: Human verification of AI-generated claims
- Integrity: Disclosure of AI tools used in research
- Reproducibility: Logging of prompts and model versions

5. Conclusion
Large Language Models have emerged as powerful tools for accelerating scientific discovery. Our comprehensive evaluation demonstrates that leading LLMs can accurately summarize research (94.3% accuracy), generate valuable hypotheses (45% quality improvement), and identify novel cross-domain connections. However, responsible deployment requires human oversight to mitigate hallucination risks and ensure scientific integrity. We release PRISM-Bench as a community resource for evaluating AI research assistants.

References
[1] Brown et al. (2020). Language Models are Few-Shot Learners. NeurIPS.
[2] Bubeck et al. (2023). Sparks of AGI: GPT-4 Analysis. Microsoft Research.
[3] Anthropic. (2024). Claude 3 Technical Report. Anthropic.
[4] Team Gemini. (2024). Gemini 1.5 Technical Report. Google DeepMind.
[5] Touvron et al. (2023). LLaMA 2: Open Foundation Models. Meta AI.
[6] Boiko et al. (2023). Autonomous Scientific Research with LLMs. Nature.
[7] AI4Science Team. (2024). The Impact of AI on Scientific Publishing. Science.
[8] Jumper et al. (2021). AlphaFold 2: Protein Structure Prediction. Nature.`,
};

export const DEMO_CORE_ANALYSIS = {
  title: "Large Language Models for Scientific Discovery: A Comprehensive Analysis",
  authors: ["AI Research Consortium", "Nature 2024"],
  publicationYear: "2024",
  takeaways: [
    "LLM-assisted research reduces literature review time by 73% while maintaining quality",
    "GPT-4 achieves 94.3% accuracy in extracting and summarizing key findings from research papers",
    "AI-generated hypotheses led to successful experimental validation in 23% of cases",
    "LLMs identified cross-domain connections missed by human experts in 34% of papers",
    "PRISM-Bench introduced as a new standard for evaluating AI research assistants",
  ],
  summary:
    "This groundbreaking study evaluates Large Language Models (GPT-4, Claude 3, Gemini 1.5, LLaMA-3) for accelerating scientific discovery across 500+ research papers in biology, chemistry, physics, and materials science. The research demonstrates that LLM-assisted review reduces research time by 73% while maintaining quality, with GPT-4 achieving 94.3% accuracy in factual extraction. Remarkably, LLMs generated novel hypotheses that led to successful experimental validation in 23% of cases, and identified valuable cross-domain connections missed by human experts in 34% of papers. The study introduces PRISM-Bench, a comprehensive benchmark for AI research assistants, and proposes the FAIR-AI framework for responsible AI use in science. These findings herald a transformative shift in scientific research methodology.",
  problemStatement:
    "The exponential growth of scientific literature—with over 5 million papers published annually—has created an unprecedented challenge for researchers. No human can comprehensively review their field, leading to missed discoveries, redundant research, and slower scientific progress. Traditional literature review methods are time-consuming, incomplete, and prone to bias toward familiar sources.",
  methodology:
    "The study curated 500 peer-reviewed papers from Nature, Science, Cell, and Physical Review Letters (2020-2024), stratified across biology (150 papers), chemistry (120), physics (130), and interdisciplinary research (100). The authors developed PRISM-Bench, a novel evaluation framework measuring factual accuracy, comprehensiveness, critical analysis, and hypothesis quality. Five leading LLMs were compared: GPT-4 Turbo (128K context), Claude 3 Opus (200K), Gemini 1.5 Pro (1M), LLaMA-3 70B, and Mistral Large. Expert blind reviews validated AI-generated outputs against human baselines.",
  keyFindings: [
    {
      finding: "LLM-assisted literature review reduces research time by 73% (8.2 hours to 2.2 hours per paper)",
      evidence: '"Traditional manual review: 8.2 hours per paper; LLM-assisted review: 2.2 hours per paper (73% reduction)" - Section 3.1',
    },
    {
      finding: "GPT-4 Turbo achieves 94.3% factual accuracy on the PRISM-Bench evaluation",
      evidence: '"GPT-4 Turbo | 94.3% | 91.2% | 87.5%" - Table 1, Section 3.2',
    },
    {
      finding: "LLM-generated hypotheses are more testable than human-generated ones (4.4 vs 4.0 on 5-point scale)",
      evidence: '"Testability: 4.4/5.0 (higher than human-generated: 4.0/5.0)" - Section 3.3',
    },
    {
      finding: "Cross-domain discovery: LLMs identified connections missed by human experts in 34% of cases",
      evidence: '"LLMs identified cross-domain connections missed by human experts in 34% of cases" - Section 3.4',
    },
    {
      finding: "23% of AI-generated hypotheses led to successful experimental validation",
      evidence: '"LLMs generated novel, testable hypotheses in 78% of evaluated papers, with 23% leading to successful experimental validation" - Section 3.3',
    },
    {
      finding: "Claude 3 Opus achieved the highest critical analysis score (89.1%)",
      evidence: '"Claude 3 Opus | 93.8% | 92.4% | 89.1%" - Table 1, Section 3.2',
    },
  ],
};

export const DEMO_ADVANCED_ANALYSIS = {
  strengths: [
    {
      point: "Unprecedented scale: 500+ papers across 4 major scientific domains",
      evidence: '"We curated a diverse corpus of 500 peer-reviewed papers from Nature, Science, Cell, and Physical Review Letters" - Section 2.1',
    },
    {
      point: "Novel benchmark: Introduction of PRISM-Bench for standardized evaluation",
      evidence: '"We developed PRISM-Bench with metrics: Factual Accuracy, Comprehensiveness, Critical Analysis, Hypothesis Quality" - Section 2.2',
    },
    {
      point: "Practical impact: 73% reduction in literature review time with maintained quality",
      evidence: '"Quality scores remained comparable (4.2 vs 4.1 on 5-point scale)" - Section 3.1',
    },
    {
      point: "Rigorous methodology: Expert blind reviews for hypothesis validation",
      evidence: '"Expert blind review rated LLM-generated hypotheses" - Section 3.3',
    },
    {
      point: "Responsible AI focus: Introduction of FAIR-AI framework for ethical use",
      evidence: '"We propose the FAIR-AI framework: Findability, Accountability, Integrity, Reproducibility" - Section 4.3',
    },
  ],
  weaknesses: [
    {
      point: "Hallucination risk not fully mitigated (5.7% error rate)",
      evidence: '"Hallucination risk: LLMs occasionally generate plausible but incorrect claims (5.7% error rate)" - Section 4.2',
    },
    {
      point: "Citation accuracy concerns (only 82% verified)",
      evidence: '"Citation accuracy: Only 82% of LLM-generated citations were verified as accurate" - Section 4.2',
    },
    {
      point: "Limited evaluation of open-source models compared to proprietary ones",
      evidence: '"LLaMA-3 70B | 87.2% | 84.1% | 78.4%" shows significant gap vs proprietary models - Section 3.2',
    },
    {
      point: "Reproducibility challenges due to stochastic model outputs",
      evidence: '"Reproducibility: Stochastic outputs complicate exact reproduction" - Section 4.2',
    },
  ],
  hypotheses: [
    {
      hypothesis: "Fine-tuning LLMs on domain-specific scientific corpora could reduce hallucination rates below 1%",
      experimentalDesign:
        "1. Curate domain-specific training datasets from verified sources\n2. Fine-tune base models using LoRA/QLoRA techniques\n3. Evaluate on PRISM-Bench factual accuracy metrics\n4. Compare hallucination rates with base models\n5. Test generalization across scientific domains",
      expectedOutcome: "Reduction of hallucination rate from 5.7% to <1% while maintaining 94%+ accuracy",
    },
    {
      hypothesis: "Multi-agent LLM systems with verification loops could achieve near-perfect citation accuracy",
      experimentalDesign:
        "1. Design multi-agent architecture: Generator, Verifier, Corrector agents\n2. Implement real-time citation verification against databases\n3. Create feedback loop for self-correction\n4. Evaluate on citation accuracy benchmark\n5. Measure latency vs accuracy tradeoffs",
      expectedOutcome: "Citation accuracy improvement from 82% to 98%+ with acceptable latency overhead",
    },
    {
      hypothesis: "Retrieval-Augmented Generation (RAG) with specialized scientific databases could unlock domain-expert-level analysis",
      experimentalDesign:
        "1. Build vector databases from PubMed, arXiv, and patent databases\n2. Implement RAG pipeline with semantic search\n3. Compare with base LLM on domain-specific tasks\n4. Evaluate using expert panel blind review\n5. Measure improvement in technical accuracy and depth",
      expectedOutcome: "Domain expertise scores matching human experts (4.5+ on 5-point scale)",
    },
  ],
};

export const DEMO_REFERENCES = {
  references: [
    {
      apa: "Brown, T., Mann, B., Ryder, N., Subbiah, M., et al. (2020). Language Models are Few-Shot Learners. Advances in Neural Information Processing Systems, 33, 1877-1901.",
      bibtex:
        "@article{brown2020language,\n  title={Language Models are Few-Shot Learners},\n  author={Brown, Tom and Mann, Benjamin and Ryder, Nick and Subbiah, Melanie and others},\n  journal={Advances in Neural Information Processing Systems},\n  volume={33},\n  pages={1877--1901},\n  year={2020}\n}",
    },
    {
      apa: "Bubeck, S., Chandrasekaran, V., Eldan, R., et al. (2023). Sparks of Artificial General Intelligence: Early Experiments with GPT-4. Microsoft Research.",
      bibtex:
        "@article{bubeck2023sparks,\n  title={Sparks of Artificial General Intelligence: Early Experiments with GPT-4},\n  author={Bubeck, S{\\'{e}}bastien and Chandrasekaran, Varun and Eldan, Ronen and others},\n  journal={Microsoft Research},\n  year={2023}\n}",
    },
    {
      apa: "Anthropic. (2024). The Claude 3 Model Family: A New Standard for AI Assistants. Anthropic Technical Report.",
      bibtex:
        "@techreport{anthropic2024claude,\n  title={The Claude 3 Model Family: A New Standard for AI Assistants},\n  author={Anthropic},\n  institution={Anthropic},\n  year={2024}\n}",
    },
    {
      apa: "Team Gemini. (2024). Gemini 1.5: Unlocking Multimodal Understanding Across Millions of Tokens. Google DeepMind.",
      bibtex:
        "@techreport{gemini2024,\n  title={Gemini 1.5: Unlocking Multimodal Understanding Across Millions of Tokens},\n  author={Team Gemini},\n  institution={Google DeepMind},\n  year={2024}\n}",
    },
    {
      apa: "Touvron, H., Martin, L., Stone, K., et al. (2023). LLaMA 2: Open Foundation and Fine-Tuned Chat Models. Meta AI.",
      bibtex:
        "@article{touvron2023llama,\n  title={LLaMA 2: Open Foundation and Fine-Tuned Chat Models},\n  author={Touvron, Hugo and Martin, Louis and Stone, Kevin and others},\n  journal={Meta AI},\n  year={2023}\n}",
    },
    {
      apa: "Boiko, D. A., MacKnight, R., Kline, B., & Gomes, G. (2023). Autonomous scientific research capabilities of large language models. Nature, 624(7990), 570-578.",
      bibtex:
        "@article{boiko2023autonomous,\n  title={Autonomous scientific research capabilities of large language models},\n  author={Boiko, Daniil A and MacKnight, Robert and Kline, Ben and Gomes, Gerbrand},\n  journal={Nature},\n  volume={624},\n  number={7990},\n  pages={570--578},\n  year={2023}\n}",
    },
  ],
};

export const DEMO_GLOSSARY = {
  terms: [
    {
      term: "LLM",
      definition: "Large Language Model - an AI model trained on massive text corpora capable of understanding and generating human-like text.",
    },
    {
      term: "GPT-4",
      definition: "Generative Pre-trained Transformer 4 - OpenAI's flagship multimodal model with 128K context window and advanced reasoning.",
    },
    {
      term: "Claude 3",
      definition: "Anthropic's latest AI assistant family (Haiku, Sonnet, Opus) with 200K context and strong analytical capabilities.",
    },
    {
      term: "Context Window",
      definition: "The maximum amount of text an LLM can process in a single interaction, measured in tokens (roughly 0.75 words per token).",
    },
    {
      term: "Hallucination",
      definition: "When an AI generates plausible but factually incorrect or fabricated information with apparent confidence.",
    },
    {
      term: "RAG",
      definition: "Retrieval-Augmented Generation - a technique that enhances LLM responses by retrieving relevant information from external databases.",
    },
    {
      term: "PRISM-Bench",
      definition: "A benchmark introduced in this study for evaluating AI research assistants on accuracy, comprehensiveness, and hypothesis quality.",
    },
    {
      term: "FAIR-AI",
      definition: "Framework for responsible AI use: Findability, Accountability, Integrity, Reproducibility.",
    },
    {
      term: "Fine-tuning",
      definition: "The process of further training a pre-trained model on domain-specific data to improve performance on specific tasks.",
    },
    {
      term: "Zero-shot Learning",
      definition: "The ability of a model to perform tasks without specific training examples, relying on general knowledge.",
    },
  ],
};

export const DEMO_KNOWLEDGE_GRAPH = {
  nodes: [
    // Main central node
    { id: "1", label: "LLMs for Scientific Discovery", type: "main", group: 1, val: 40, glow: true },
    
    // Models cluster
    { id: "2", label: "GPT-4 Turbo", type: "method", group: 2, val: 22, glow: true },
    { id: "3", label: "Claude 3 Opus", type: "method", group: 2, val: 20 },
    { id: "4", label: "Gemini 1.5 Pro", type: "method", group: 2, val: 18 },
    { id: "5", label: "LLaMA-3 70B", type: "method", group: 2, val: 14 },
    { id: "6", label: "Mistral Large", type: "method", group: 2, val: 14 },
    
    // Results cluster
    { id: "7", label: "94.3% Accuracy", type: "result", group: 8, val: 24, glow: true },
    { id: "8", label: "73% Time Reduction", type: "result", group: 8, val: 22, glow: true },
    { id: "9", label: "45% Quality Boost", type: "result", group: 8, val: 18 },
    { id: "10", label: "23% Validation Rate", type: "result", group: 8, val: 16 },
    
    // Domains cluster
    { id: "11", label: "Biology/Medicine", type: "dataset", group: 5, val: 14 },
    { id: "12", label: "Chemistry", type: "dataset", group: 5, val: 12 },
    { id: "13", label: "Physics", type: "dataset", group: 5, val: 12 },
    { id: "14", label: "Interdisciplinary", type: "dataset", group: 5, val: 10 },
    
    // Challenges cluster
    { id: "15", label: "Hallucination Risk", type: "challenge", group: 6, val: 16 },
    { id: "16", label: "Citation Accuracy", type: "challenge", group: 6, val: 14 },
    { id: "17", label: "Reproducibility", type: "challenge", group: 6, val: 12 },
    { id: "18", label: "Bias Propagation", type: "challenge", group: 6, val: 12 },
    
    // Framework nodes
    { id: "19", label: "PRISM-Bench", type: "solution", group: 7, val: 20, glow: true },
    { id: "20", label: "FAIR-AI Framework", type: "solution", group: 7, val: 18 },
    
    // Capabilities cluster
    { id: "21", label: "Literature Review", type: "finding", group: 3, val: 18 },
    { id: "22", label: "Hypothesis Generation", type: "finding", group: 3, val: 16 },
    { id: "23", label: "Cross-Domain Discovery", type: "finding", group: 3, val: 18, glow: true },
    { id: "24", label: "Critical Analysis", type: "finding", group: 3, val: 14 },
    
    // Technical features
    { id: "25", label: "128K Context", type: "concept", group: 9, val: 12 },
    { id: "26", label: "Multimodal", type: "concept", group: 9, val: 12 },
  ],
  links: [
    // Core connections to models
    { source: "1", target: "2", relationship: "evaluated" },
    { source: "1", target: "3", relationship: "evaluated" },
    { source: "1", target: "4", relationship: "evaluated" },
    { source: "1", target: "5", relationship: "evaluated" },
    { source: "1", target: "6", relationship: "evaluated" },
    
    // Models to results
    { source: "2", target: "7", relationship: "achieves" },
    { source: "2", target: "8", relationship: "enables" },
    { source: "3", target: "24", relationship: "excels at" },
    
    // Core to capabilities
    { source: "1", target: "21", relationship: "accelerates" },
    { source: "1", target: "22", relationship: "enables" },
    { source: "1", target: "23", relationship: "discovers" },
    { source: "1", target: "24", relationship: "performs" },
    
    // Capabilities to results
    { source: "21", target: "8", relationship: "achieves" },
    { source: "22", target: "9", relationship: "shows" },
    { source: "22", target: "10", relationship: "validated by" },
    
    // Core to domains
    { source: "1", target: "11", relationship: "applied to" },
    { source: "1", target: "12", relationship: "applied to" },
    { source: "1", target: "13", relationship: "applied to" },
    { source: "1", target: "14", relationship: "applied to" },
    
    // Core to challenges
    { source: "1", target: "15", relationship: "faces" },
    { source: "1", target: "16", relationship: "faces" },
    { source: "1", target: "17", relationship: "faces" },
    { source: "1", target: "18", relationship: "faces" },
    
    // Frameworks address challenges
    { source: "19", target: "7", relationship: "measures" },
    { source: "20", target: "15", relationship: "mitigates" },
    { source: "20", target: "17", relationship: "addresses" },
    
    // Model features
    { source: "2", target: "25", relationship: "features" },
    { source: "2", target: "26", relationship: "supports" },
    { source: "4", target: "25", relationship: "extends to 1M" },
    
    // Cross-connections
    { source: "23", target: "14", relationship: "enables" },
    { source: "22", target: "23", relationship: "leads to" },
  ],
};

export const DEMO_CHAT_MESSAGES = [
  {
    role: "user",
    content: "What makes this paper significant for researchers?",
  },
  {
    role: "assistant",
    content:
      "This paper is significant for several compelling reasons:\n\n## 🔬 **Transformative Impact**\n\n1. **73% Time Savings**: The study proves LLMs can reduce literature review time from 8.2 hours to 2.2 hours per paper without quality loss—a game-changer for researchers drowning in publications.\n\n2. **Validated Discoveries**: An remarkable **23% of AI-generated hypotheses led to successful experimental validation**, demonstrating LLMs can contribute meaningfully to the scientific method.\n\n3. **Cross-Domain Insights**: LLMs identified connections missed by human experts in **34% of cases**—potentially accelerating interdisciplinary breakthroughs.\n\n## 📊 **Rigorous Methodology**\n\n- **500+ papers** across 4 major scientific domains\n- **5 state-of-the-art models** systematically compared\n- **Expert blind reviews** for unbiased evaluation\n- **PRISM-Bench**: A new community standard for AI research assistants\n\n## ⚖️ **Responsible AI Focus**\n\nThe FAIR-AI framework addresses critical concerns:\n- Transparency in AI use\n- Human verification of claims\n- Reproducibility standards\n\nThis isn't just about speed—it's about augmenting human intelligence to tackle research challenges at unprecedented scale.",
  },
  {
    role: "user",
    content: "How does GPT-4 compare to Claude 3 in this study?",
  },
  {
    role: "assistant",
    content:
      "Here's a detailed comparison based on the study's findings:\n\n| Metric | GPT-4 Turbo | Claude 3 Opus |\n|--------|-------------|---------------|\n| **Factual Accuracy** | **94.3%** ✓ | 93.8% |\n| **Comprehensiveness** | 91.2% | **92.4%** ✓ |\n| **Critical Analysis** | 87.5% | **89.1%** ✓ |\n| **Context Window** | 128K tokens | **200K tokens** ✓ |\n\n## 🏆 **Key Differences**\n\n**GPT-4 Turbo excels at:**\n- Pure factual accuracy (94.3% vs 93.8%)\n- Extracting precise numerical findings\n- Multimodal understanding (figures/charts)\n\n**Claude 3 Opus excels at:**\n- Critical analysis and identifying limitations (89.1%)\n- Comprehensive coverage of paper contents (92.4%)\n- Longer context handling (200K tokens)\n\n## 💡 **Practical Recommendation**\n\nThe study suggests using:\n- **GPT-4** for fact-extraction and summary tasks\n- **Claude 3** for critique generation and identifying research gaps\n- **Gemini 1.5 Pro** when processing extremely long documents (1M context)\n\nBoth are excellent choices—the differences are marginal. The 5.7% hallucination rate applies to all models, emphasizing the need for human verification regardless of choice.",
  },
];

export const DEMO_RELATED_QUERIES = {
  categorizedQueries: {
    similar: [
      {
        query: "GPT-4 scientific research applications 2024",
        reason: "Finds recent studies on LLM applications in science",
      },
      {
        query: "AI literature review automation evaluation",
        reason: "Papers evaluating AI-assisted research workflows",
      },
      {
        query: "Large language models hypothesis generation",
        reason: "Studies on LLM capabilities for scientific ideation",
      },
    ],
    methodology: [
      {
        query: "PRISM-Bench AI evaluation benchmark",
        reason: "Papers using or extending the new benchmark",
      },
      {
        query: "LLM hallucination detection scientific text",
        reason: "Methods for verifying AI-generated scientific claims",
      },
    ],
    evolution: [
      {
        query: "history AI scientific discovery automation",
        reason: "Traces the evolution of AI in research",
      },
      {
        query: "expert systems vs LLMs knowledge extraction",
        reason: "Compares classical AI with modern LLM approaches",
      },
    ],
    contradictory: [
      {
        query: "LLM limitations scientific accuracy critique",
        reason: "Papers questioning LLM reliability in science",
      },
      {
        query: "human vs AI research quality comparison",
        reason: "Studies favoring human-only research approaches",
      },
    ],
  },
  queries: [
    "GPT-4 scientific research applications 2024",
    "AI literature review automation evaluation",
    "Large language models hypothesis generation",
    "PRISM-Bench AI evaluation benchmark",
    "LLM hallucination detection scientific text",
    "history AI scientific discovery automation",
    "LLM limitations scientific accuracy critique",
  ],
  stats: {
    totalQueries: 7,
    categories: 4,
    similar: 3,
    methodology: 2,
    evolution: 2,
    contradictory: 2,
  },
};

export const DEMO_PRESENTATION = {
  slides: [
    {
      title: "LLMs for Scientific Discovery",
      bullets: [
        "Comprehensive evaluation of 5 leading AI models",
        "500+ research papers across 4 scientific domains",
        "Introducing PRISM-Bench: New evaluation standard",
        "FAIR-AI Framework for responsible use",
      ],
    },
    {
      title: "The Research Information Overload Problem",
      bullets: [
        "5+ million papers published annually—impossible to review manually",
        "Researchers spend 8+ hours per paper on literature review",
        "Cross-domain discoveries often missed due to siloed reading",
        "Urgent need for AI-assisted research acceleration",
      ],
    },
    {
      title: "Methodology: Rigorous Multi-Model Evaluation",
      bullets: [
        "500 papers from Nature, Science, Cell, Physical Review Letters",
        "5 models tested: GPT-4, Claude 3, Gemini 1.5, LLaMA-3, Mistral",
        "Expert blind reviews for unbiased quality assessment",
        "PRISM-Bench: Accuracy, Comprehensiveness, Critical Analysis, Hypothesis Quality",
      ],
    },
    {
      title: "Key Results: Transformative Potential",
      bullets: [
        "73% reduction in literature review time (8.2h → 2.2h)",
        "94.3% factual accuracy (GPT-4 Turbo)",
        "23% of AI hypotheses led to experimental validation",
        "34% cross-domain connections missed by humans discovered",
      ],
    },
    {
      title: "Model Comparison: Who Leads?",
      bullets: [
        "GPT-4 Turbo: Best factual accuracy (94.3%)",
        "Claude 3 Opus: Best critical analysis (89.1%)",
        "Gemini 1.5 Pro: Largest context (1M tokens)",
        "Open-source gap: LLaMA-3 at 87.2% (7% below GPT-4)",
      ],
    },
    {
      title: "Challenges & Responsible Use",
      bullets: [
        "5.7% hallucination rate—human verification essential",
        "82% citation accuracy—needs improvement",
        "FAIR-AI Framework: Findability, Accountability, Integrity, Reproducibility",
        "Future: Fine-tuning, RAG, multi-agent verification",
      ],
    },
  ],
};

// Helper to check if demo mode is active
export const isDemoMode = () => {
  return sessionStorage.getItem("prism_demo_mode") === "true";
};

export const enableDemoMode = () => {
  sessionStorage.setItem("prism_demo_mode", "true");
};

export const disableDemoMode = () => {
  sessionStorage.removeItem("prism_demo_mode");
};
