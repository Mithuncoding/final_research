// Demo Mode Data - Pre-loaded analysis for offline demonstration
// This allows the app to work without API calls during presentations

export const DEMO_PAPER = {
  name: "Deep Learning for Network Intrusion Detection - A Survey.pdf",
  text: `Deep Learning for Network Intrusion Detection: A Comprehensive Survey

Abstract
Network intrusion detection systems (NIDS) are critical for cybersecurity. This survey comprehensively reviews deep learning approaches for NIDS, analyzing 150+ papers from 2018-2024. We categorize methods into CNN-based, RNN-based, and hybrid architectures, evaluating performance on benchmark datasets including NSL-KDD, CICIDS2017, and UNSW-NB15. Our findings reveal that hybrid models combining CNNs with attention mechanisms achieve 99.2% accuracy, outperforming traditional machine learning by 15%. We identify key challenges including adversarial attacks, class imbalance, and real-time processing requirements.

1. Introduction
The exponential growth of network traffic has made manual intrusion detection impractical. Traditional signature-based systems fail to detect zero-day attacks, while anomaly-based systems suffer from high false positive rates. Deep learning offers a promising solution by automatically learning complex patterns from network traffic data.

2. Methodology
We conducted a systematic literature review following PRISMA guidelines. We searched IEEE Xplore, ACM Digital Library, and Google Scholar using keywords: "deep learning", "intrusion detection", "network security", "CNN", "LSTM", "autoencoder". After screening 892 papers, we included 156 studies meeting our inclusion criteria.

2.1 Data Preprocessing Pipeline
Network traffic data requires extensive preprocessing. We normalize numerical features using min-max scaling, encode categorical features using one-hot encoding, and handle class imbalance using SMOTE oversampling. Feature selection using correlation analysis reduces dimensionality by 40%.

2.2 Deep Learning Architectures
We analyze three main architectures:
- Convolutional Neural Networks (CNNs): Extract spatial features from packet payloads
- Recurrent Neural Networks (RNNs/LSTMs): Capture temporal patterns in traffic flows
- Autoencoders: Learn compact representations for anomaly detection

3. Results
Our experimental evaluation on CICIDS2017 shows:
- CNN models: 97.8% accuracy, 96.2% F1-score
- LSTM models: 98.1% accuracy, 97.5% F1-score
- Hybrid CNN-LSTM: 99.2% accuracy, 98.8% F1-score
- Training time: 45 minutes on NVIDIA RTX 3090

The hybrid architecture outperforms single-model approaches by leveraging both spatial and temporal features.

4. Discussion
"The integration of attention mechanisms with deep learning models significantly improves interpretability without sacrificing accuracy" (Section 4.2). Our analysis reveals that transformer-based models show promise but require substantial computational resources.

Key challenges identified:
- Adversarial robustness: Models vulnerable to adversarial perturbations
- Real-time processing: Deep models struggle with 10Gbps traffic speeds
- Explainability: Black-box nature limits adoption in critical infrastructure

5. Conclusion
Deep learning has revolutionized network intrusion detection. Hybrid architectures combining CNNs with attention mechanisms represent the current state-of-the-art. Future work should focus on adversarial robustness and efficient real-time processing.

References
[1] Zhang et al. (2023). Attention-Based Intrusion Detection. IEEE TIFS.
[2] Kumar et al. (2022). Deep Learning for Cybersecurity. ACM Computing Surveys.
[3] Wang et al. (2024). Transformer Networks for Network Security. NDSS.
[4] Liu et al. (2023). Adversarial Attacks on NIDS. USENIX Security.
[5] Chen et al. (2022). Real-time Deep Learning IDS. IEEE TDSC.`,
};

export const DEMO_CORE_ANALYSIS = {
  title:
    "Deep Learning for Network Intrusion Detection: A Comprehensive Survey",
  authors: ["Research Team", "IEEE Publication"],
  takeaways: [
    "Hybrid CNN-LSTM architectures achieve 99.2% accuracy in network intrusion detection, outperforming traditional ML by 15%",
    "Attention mechanisms significantly improve model interpretability without sacrificing detection accuracy",
    "Real-time processing remains a key challenge - deep models struggle with 10Gbps traffic speeds",
    "Adversarial robustness is critical - current models are vulnerable to adversarial perturbations",
    "Transformer-based models show promise but require substantial computational resources",
  ],
  summary:
    "This comprehensive survey reviews deep learning approaches for network intrusion detection systems (NIDS), analyzing over 150 papers from 2018-2024. The study categorizes methods into CNN-based, RNN-based, and hybrid architectures, evaluating their performance on benchmark datasets including NSL-KDD, CICIDS2017, and UNSW-NB15. The research reveals that hybrid models combining Convolutional Neural Networks with attention mechanisms achieve state-of-the-art performance with 99.2% accuracy, significantly outperforming traditional machine learning approaches. The survey identifies critical challenges in the field including adversarial attacks, class imbalance in datasets, and requirements for real-time processing at high network speeds. The findings provide valuable insights for researchers and practitioners developing next-generation intrusion detection systems.",
  problemStatement:
    "Traditional signature-based intrusion detection systems fail to detect zero-day attacks, while anomaly-based systems suffer from high false positive rates. The exponential growth of network traffic has made manual intrusion detection impractical, necessitating automated deep learning solutions that can learn complex patterns from network traffic data.",
  methodology:
    "The study follows a systematic literature review using PRISMA guidelines. The researchers searched IEEE Xplore, ACM Digital Library, and Google Scholar using specific keywords related to deep learning and intrusion detection. After screening 892 papers, 156 studies meeting inclusion criteria were analyzed. The methodology includes evaluation on benchmark datasets (CICIDS2017, NSL-KDD, UNSW-NB15) with comprehensive data preprocessing including min-max normalization, one-hot encoding, and SMOTE oversampling for class imbalance.",
  keyFindings: [
    {
      finding:
        "Hybrid CNN-LSTM architectures achieve the highest detection accuracy at 99.2% with 98.8% F1-score",
      evidence:
        '"Hybrid CNN-LSTM: 99.2% accuracy, 98.8% F1-score" - Results Section',
    },
    {
      finding:
        "Attention mechanisms improve interpretability while maintaining high accuracy",
      evidence:
        '"The integration of attention mechanisms with deep learning models significantly improves interpretability without sacrificing accuracy" - Section 4.2',
    },
    {
      finding:
        "Deep learning models outperform traditional ML by 15% in accuracy",
      evidence:
        '"Our findings reveal that hybrid models combining CNNs with attention mechanisms achieve 99.2% accuracy, outperforming traditional machine learning by 15%" - Abstract',
    },
    {
      finding:
        "Feature selection using correlation analysis reduces dimensionality by 40%",
      evidence:
        '"Feature selection using correlation analysis reduces dimensionality by 40%" - Section 2.1',
    },
    {
      finding:
        "Current models face challenges with adversarial robustness and real-time processing",
      evidence:
        '"Models vulnerable to adversarial perturbations" and "Deep models struggle with 10Gbps traffic speeds" - Section 4',
    },
  ],
};

export const DEMO_ADVANCED_ANALYSIS = {
  strengths: [
    {
      point:
        "Comprehensive scope covering 156 papers using rigorous PRISMA methodology",
      evidence:
        '"We conducted a systematic literature review following PRISMA guidelines... we included 156 studies meeting our inclusion criteria" - Section 2',
    },
    {
      point:
        "Thorough comparison across multiple benchmark datasets ensuring reproducibility",
      evidence:
        '"evaluating performance on benchmark datasets including NSL-KDD, CICIDS2017, and UNSW-NB15" - Abstract',
    },
    {
      point:
        "Novel hybrid architecture achieving state-of-the-art 99.2% detection accuracy",
      evidence: '"Hybrid CNN-LSTM: 99.2% accuracy, 98.8% F1-score" - Section 3',
    },
    {
      point:
        "Detailed preprocessing pipeline addressing common data challenges",
      evidence:
        '"We normalize numerical features using min-max scaling, encode categorical features using one-hot encoding, and handle class imbalance using SMOTE oversampling" - Section 2.1',
    },
  ],
  weaknesses: [
    {
      point:
        "Limited analysis of computational cost and deployment considerations",
      evidence:
        '"transformer-based models show promise but require substantial computational resources" - Section 4',
    },
    {
      point:
        "Insufficient coverage of privacy-preserving techniques for sensitive network data",
      evidence:
        "The survey does not address federated learning or differential privacy approaches",
    },
    {
      point:
        "Evaluation limited to well-known datasets, may not reflect real-world network diversity",
      evidence:
        'Evaluation focused on "NSL-KDD, CICIDS2017, and UNSW-NB15" without testing on production networks',
    },
  ],
  hypotheses: [
    {
      hypothesis:
        "Federated learning-based intrusion detection could achieve comparable accuracy while preserving data privacy across distributed networks",
      experimentalDesign:
        "1. Deploy federated learning framework across 5+ network nodes\n2. Train local models on each node's traffic data\n3. Aggregate model updates using secure aggregation\n4. Compare accuracy, privacy guarantees, and communication overhead vs. centralized approach\n5. Evaluate on CICIDS2017 with data partitioned across nodes",
      expectedOutcome:
        "Accuracy within 2-3% of centralized training while protecting raw traffic data from central collection",
    },
    {
      hypothesis:
        "Graph Neural Networks (GNNs) modeling network topology could improve detection of coordinated multi-stage attacks",
      experimentalDesign:
        "1. Construct network flow graphs with hosts as nodes and connections as edges\n2. Design GNN architecture to learn attack patterns across topology\n3. Train on datasets with labeled multi-stage attacks (APT scenarios)\n4. Compare with flow-based methods on detecting lateral movement\n5. Measure precision/recall on advanced persistent threat detection",
      expectedOutcome:
        "15-20% improvement in detecting coordinated attacks compared to individual flow analysis",
    },
    {
      hypothesis:
        "Adversarial training with generated attack variations could significantly improve model robustness against evasion attacks",
      experimentalDesign:
        "1. Generate adversarial examples using FGSM, PGD, and C&W attacks\n2. Augment training data with adversarial samples\n3. Train robust models with adversarial training objectives\n4. Evaluate detection accuracy under various attack perturbation budgets\n5. Test generalization to unseen attack variations",
      expectedOutcome:
        "Maintain >95% accuracy under adversarial perturbations while baseline models drop to <70%",
    },
  ],
};

export const DEMO_REFERENCES = {
  references: [
    {
      apa: "Zhang, Y., Chen, X., & Wang, L. (2023). Attention-Based Intrusion Detection Using Deep Neural Networks. IEEE Transactions on Information Forensics and Security, 18(4), 1234-1248.",
      bibtex:
        "@article{zhang2023attention,\n  title={Attention-Based Intrusion Detection Using Deep Neural Networks},\n  author={Zhang, Yiming and Chen, Xiaoming and Wang, Lei},\n  journal={IEEE Transactions on Information Forensics and Security},\n  volume={18},\n  number={4},\n  pages={1234--1248},\n  year={2023}\n}",
    },
    {
      apa: "Kumar, R., Singh, A., & Patel, M. (2022). Deep Learning for Cybersecurity: A Comprehensive Review. ACM Computing Surveys, 55(3), 1-38.",
      bibtex:
        "@article{kumar2022deep,\n  title={Deep Learning for Cybersecurity: A Comprehensive Review},\n  author={Kumar, Rajesh and Singh, Amit and Patel, Meera},\n  journal={ACM Computing Surveys},\n  volume={55},\n  number={3},\n  pages={1--38},\n  year={2022}\n}",
    },
    {
      apa: "Wang, H., Liu, J., & Zhang, Q. (2024). Transformer Networks for Network Security: Architecture and Applications. Network and Distributed System Security Symposium (NDSS).",
      bibtex:
        "@inproceedings{wang2024transformer,\n  title={Transformer Networks for Network Security: Architecture and Applications},\n  author={Wang, Hui and Liu, Jing and Zhang, Qian},\n  booktitle={Network and Distributed System Security Symposium (NDSS)},\n  year={2024}\n}",
    },
    {
      apa: "Liu, S., Chen, Y., & Wu, T. (2023). Adversarial Attacks on Network Intrusion Detection Systems. USENIX Security Symposium, 2023.",
      bibtex:
        "@inproceedings{liu2023adversarial,\n  title={Adversarial Attacks on Network Intrusion Detection Systems},\n  author={Liu, Sheng and Chen, Yan and Wu, Ting},\n  booktitle={USENIX Security Symposium},\n  year={2023}\n}",
    },
    {
      apa: "Chen, B., Yang, F., & Li, X. (2022). Real-time Deep Learning IDS for High-Speed Networks. IEEE Transactions on Dependable and Secure Computing, 19(5), 3001-3015.",
      bibtex:
        "@article{chen2022realtime,\n  title={Real-time Deep Learning IDS for High-Speed Networks},\n  author={Chen, Bo and Yang, Fei and Li, Xin},\n  journal={IEEE Transactions on Dependable and Secure Computing},\n  volume={19},\n  number={5},\n  pages={3001--3015},\n  year={2022}\n}",
    },
  ],
};

export const DEMO_GLOSSARY = {
  terms: [
    {
      term: "NIDS",
      definition:
        "Network Intrusion Detection System - a security mechanism that monitors network traffic for suspicious activity and policy violations.",
    },
    {
      term: "Zero-day Attack",
      definition:
        "An attack exploiting a previously unknown vulnerability, making it undetectable by signature-based systems.",
    },
    {
      term: "CNN",
      definition:
        "Convolutional Neural Network - a deep learning architecture that excels at extracting spatial features from structured data.",
    },
    {
      term: "LSTM",
      definition:
        "Long Short-Term Memory - a recurrent neural network architecture capable of learning long-term dependencies in sequential data.",
    },
    {
      term: "SMOTE",
      definition:
        "Synthetic Minority Over-sampling Technique - a method to address class imbalance by generating synthetic samples of the minority class.",
    },
    {
      term: "F1-Score",
      definition:
        "A harmonic mean of precision and recall, providing a balanced measure of classification performance.",
    },
    {
      term: "Autoencoder",
      definition:
        "A neural network that learns to compress data into a lower-dimensional representation and reconstruct it, useful for anomaly detection.",
    },
    {
      term: "Adversarial Attack",
      definition:
        "Malicious inputs crafted to fool machine learning models while appearing normal to humans.",
    },
    {
      term: "CICIDS2017",
      definition:
        "Canadian Institute for Cybersecurity Intrusion Detection Systems 2017 - a benchmark dataset for evaluating NIDS.",
    },
    {
      term: "Attention Mechanism",
      definition:
        "A neural network component that allows the model to focus on relevant parts of the input, improving interpretability.",
    },
  ],
};

export const DEMO_KNOWLEDGE_GRAPH = {
  nodes: [
    // Main central node
    { id: "1", label: "Deep Learning for NIDS", type: "main", group: 1, val: 35, glow: true },
    
    // Methods cluster
    { id: "2", label: "CNN", type: "method", group: 2, val: 18 },
    { id: "3", label: "LSTM/RNN", type: "method", group: 2, val: 18 },
    { id: "4", label: "Attention Mechanism", type: "method", group: 2, val: 16 },
    { id: "5", label: "Transformer", type: "method", group: 2, val: 14 },
    { id: "6", label: "Autoencoder", type: "method", group: 2, val: 14 },
    
    // Results cluster
    { id: "7", label: "99.2% Accuracy", type: "result", group: 8, val: 20, glow: true },
    { id: "8", label: "98.8% F1-Score", type: "result", group: 8, val: 16 },
    { id: "9", label: "15% Improvement", type: "result", group: 8, val: 14 },
    
    // Datasets cluster
    { id: "10", label: "CICIDS2017", type: "dataset", group: 5, val: 12 },
    { id: "11", label: "NSL-KDD", type: "dataset", group: 5, val: 12 },
    { id: "12", label: "UNSW-NB15", type: "dataset", group: 5, val: 12 },
    
    // Challenges cluster
    { id: "13", label: "Adversarial Attacks", type: "challenge", group: 6, val: 14 },
    { id: "14", label: "Real-time Processing", type: "challenge", group: 6, val: 14 },
    { id: "15", label: "Explainability", type: "challenge", group: 6, val: 12 },
    { id: "16", label: "Class Imbalance", type: "challenge", group: 6, val: 12 },
    
    // Solutions cluster
    { id: "17", label: "Hybrid CNN-LSTM", type: "solution", group: 7, val: 22, glow: true },
    { id: "18", label: "SMOTE Oversampling", type: "technique", group: 9, val: 10 },
    { id: "19", label: "Min-Max Scaling", type: "technique", group: 9, val: 8 },
    
    // Applications cluster
    { id: "20", label: "Intrusion Detection", type: "finding", group: 3, val: 18 },
    { id: "21", label: "Network Security", type: "finding", group: 3, val: 16 },
    { id: "22", label: "Anomaly Detection", type: "finding", group: 3, val: 14 },
    
    // Concepts cluster
    { id: "23", label: "Feature Extraction", type: "concept", group: 9, val: 12 },
    { id: "24", label: "Spatial Features", type: "concept", group: 9, val: 10 },
    { id: "25", label: "Temporal Patterns", type: "concept", group: 9, val: 10 },
  ],
  links: [
    // Core connections to methods
    { source: "1", target: "2", relationship: "uses" },
    { source: "1", target: "3", relationship: "uses" },
    { source: "1", target: "4", relationship: "incorporates" },
    { source: "1", target: "5", relationship: "explores" },
    { source: "1", target: "6", relationship: "applies" },
    
    // Methods to hybrid solution
    { source: "2", target: "17", relationship: "component of" },
    { source: "3", target: "17", relationship: "component of" },
    { source: "4", target: "17", relationship: "enhances" },
    
    // Hybrid to results
    { source: "17", target: "7", relationship: "achieves" },
    { source: "17", target: "8", relationship: "achieves" },
    { source: "17", target: "9", relationship: "demonstrates" },
    
    // Core to applications
    { source: "1", target: "20", relationship: "applied to" },
    { source: "1", target: "21", relationship: "enables" },
    { source: "20", target: "22", relationship: "includes" },
    
    // Core to challenges
    { source: "1", target: "13", relationship: "faces" },
    { source: "1", target: "14", relationship: "faces" },
    { source: "1", target: "15", relationship: "lacks" },
    { source: "1", target: "16", relationship: "addresses" },
    
    // Challenge solutions
    { source: "16", target: "18", relationship: "solved by" },
    { source: "18", target: "19", relationship: "combined with" },
    
    // Datasets connections
    { source: "20", target: "10", relationship: "evaluated on" },
    { source: "20", target: "11", relationship: "evaluated on" },
    { source: "20", target: "12", relationship: "evaluated on" },
    
    // Feature concepts
    { source: "2", target: "24", relationship: "extracts" },
    { source: "3", target: "25", relationship: "captures" },
    { source: "23", target: "24", relationship: "includes" },
    { source: "23", target: "25", relationship: "includes" },
    
    // Cross-connections for visual interest
    { source: "4", target: "15", relationship: "improves" },
    { source: "7", target: "21", relationship: "validates" },
  ],
};

export const DEMO_CHAT_MESSAGES = [
  {
    role: "user",
    content: "What is the main contribution of this paper?",
  },
  {
    role: "assistant",
    content:
      "The main contribution of this survey paper is a **comprehensive analysis of deep learning approaches for network intrusion detection**, covering 156 papers from 2018-2024. The key findings include:\n\n1. **Hybrid CNN-LSTM architectures** achieve state-of-the-art performance with **99.2% accuracy** and 98.8% F1-score\n\n2. **Attention mechanisms** significantly improve model interpretability without sacrificing detection accuracy\n\n3. The survey identifies critical **open challenges**:\n   - Adversarial robustness vulnerabilities\n   - Real-time processing at 10Gbps speeds\n   - Explainability requirements for critical infrastructure\n\nThis work provides valuable guidance for researchers and practitioners developing next-generation intrusion detection systems.",
  },
  {
    role: "user",
    content:
      "How does the hybrid model compare to traditional machine learning?",
  },
  {
    role: "assistant",
    content:
      "According to the paper, hybrid deep learning models significantly outperform traditional machine learning:\n\n| Approach | Accuracy | F1-Score |\n|----------|----------|----------|\n| Traditional ML | ~84% | ~82% |\n| CNN | 97.8% | 96.2% |\n| LSTM | 98.1% | 97.5% |\n| **Hybrid CNN-LSTM** | **99.2%** | **98.8%** |\n\n**Key advantages of the hybrid approach:**\n\n1. **15% accuracy improvement** over traditional ML (as stated in the abstract)\n\n2. **Dual feature extraction**: CNNs capture spatial features from packet payloads while LSTMs capture temporal patterns in traffic flows\n\n3. **Better generalization**: The combination reduces overfitting to specific attack signatures\n\nThe trade-off is **computational cost** - training takes ~45 minutes on an NVIDIA RTX 3090, which may be prohibitive for resource-constrained environments.",
  },
];

export const DEMO_RELATED_QUERIES = {
  categorizedQueries: {
    similar: [
      {
        query: "deep learning intrusion detection survey 2024",
        reason: "Finds recent surveys on the same topic for comparison",
      },
      {
        query: "CNN LSTM network anomaly detection",
        reason: "Targets papers using similar hybrid architectures",
      },
      {
        query: "machine learning NIDS benchmark comparison",
        reason: "Identifies studies with comparative evaluations",
      },
    ],
    methodology: [
      {
        query: "CICIDS2017 deep learning classification",
        reason: "Papers using the same benchmark dataset",
      },
      {
        query: "SMOTE class imbalance intrusion detection",
        reason: "Studies addressing data imbalance similarly",
      },
    ],
    evolution: [
      {
        query: "network intrusion detection historical survey",
        reason: "Traces the evolution of IDS techniques",
      },
      {
        query: "signature-based vs anomaly-based IDS",
        reason:
          "Foundational comparison that motivated deep learning approaches",
      },
    ],
    contradictory: [
      {
        query: "deep learning IDS limitations false positives",
        reason: "Papers critiquing deep learning approaches in NIDS",
      },
      {
        query: "traditional ML vs deep learning network security",
        reason: "Studies favoring simpler approaches",
      },
    ],
  },
  queries: [
    "deep learning intrusion detection survey 2024",
    "CNN LSTM network anomaly detection",
    "machine learning NIDS benchmark comparison",
    "CICIDS2017 deep learning classification",
    "SMOTE class imbalance intrusion detection",
    "network intrusion detection historical survey",
    "signature-based vs anomaly-based IDS",
    "deep learning IDS limitations false positives",
    "traditional ML vs deep learning network security",
  ],
  stats: {
    totalQueries: 9,
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
      title: "Deep Learning for Network Intrusion Detection",
      bullets: [
        "Comprehensive Survey of 150+ Papers (2018-2024)",
        "Focus: CNN, RNN, and Hybrid Architectures",
        "Benchmark Evaluation: NSL-KDD, CICIDS2017, UNSW-NB15",
        "Key Result: 99.2% Accuracy with Hybrid Models",
      ],
    },
    {
      title: "The Problem: Network Security Challenges",
      bullets: [
        "Exponential growth of network traffic makes manual detection impractical",
        "Signature-based systems fail to detect zero-day attacks",
        "Anomaly-based systems suffer from high false positive rates",
        "Need for automated deep learning solutions",
      ],
    },
    {
      title: "Methodology: Systematic Literature Review",
      bullets: [
        "PRISMA guidelines for systematic review",
        "Searched IEEE, ACM, and Google Scholar",
        "Screened 892 papers → 156 studies included",
        "Comprehensive data preprocessing pipeline",
      ],
    },
    {
      title: "Deep Learning Architectures Analyzed",
      bullets: [
        "CNNs: Extract spatial features from packet payloads",
        "RNNs/LSTMs: Capture temporal patterns in traffic flows",
        "Autoencoders: Learn compact representations for anomaly detection",
        "Hybrid CNN-LSTM: Combines spatial and temporal features",
      ],
    },
    {
      title: "Key Results",
      bullets: [
        "CNN models: 97.8% accuracy, 96.2% F1-score",
        "LSTM models: 98.1% accuracy, 97.5% F1-score",
        "Hybrid CNN-LSTM: 99.2% accuracy, 98.8% F1-score",
        "15% improvement over traditional machine learning",
      ],
    },
    {
      title: "Challenges & Future Directions",
      bullets: [
        "Adversarial Robustness: Models vulnerable to adversarial perturbations",
        "Real-time Processing: Struggle with 10Gbps traffic speeds",
        "Explainability: Black-box nature limits adoption",
        "Future: Focus on robust, efficient, interpretable models",
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
