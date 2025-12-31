# KSCST Student Project Proposal Data for "PRISM"

Here is the technical content you need to copy-paste into your KSCST MS Word format.

**Note**: You will need to fill in your personal details (College Name, Names, USN, Guide details) yourself.

---

**2. Project Title:**
PRISM: The Ultimate AI Research Assistant - A Privacy-First, Multimodal Platform for Scientific Discovery

**3. Branch:**
Computer Science & Engineering (or Information Science & Engineering)

**4. Theme:** 6. Big Data, IoT, Artificial Intelligence, Data Engineering, Robotics (in agriculture, health, education, digital literacy, assistive aid)\_

**12. Scope / Objectives of the project:**
The scope of this project is to develop a comprehensive, browser-based research assistant that leverages Generative AI to accelerate scientific discovery while prioritizing user privacy.

**Objectives:**

1.  **Unified Research Interface**: To design and develop a single-page application (SPA) that combines document reading, critical analysis, and synthesis in one dashboard.
2.  **Privacy-First Architecture**: To implement client-side text extraction (PDF/DOCX) ensuring that user documents are processed locally, with only essential text chunks sent to the AI API, protecting intellectual property.
3.  **Multimodal Understanding**: To integrate capabilities for analyzing non-textual elements, such as interpreting charts, graphs, and figures within scientific papers.
4.  **Generative Scientific Ideation**: To build an "Ideation Lab" feature that goes beyond summarization to generate novel hypotheses and experimental protocols based on the analyzed literature.
5.  **Adaptive Personalization**: To implement an intelligent onboarding system that assesses user expertise and tailors the AI's output complexity (e.g., student vs. expert modes).

**13. Methodology:**
The project follows a modular Single Page Application (SPA) architecture combined with cloud-based Large Language Models (LLMs).

1.  **Input Processing**: Users upload files (PDFs/DOCXs) via the frontend. Key metadata is extracted, and the document is parsed into text chunks entirely on the client side using `pdfjs-dist` and `mammoth.js`.
2.  **Intelligent Orchestration**: A central routing engine determines the complexity of user requests. Simple tasks (glossaries, citations) are routed to a faster model (Gemini Flash), while complex analytical tasks (critiques, ideation) are sent to a reasoning-heavy model (Gemini Pro).
3.  **Structured Analysis**: We utilize "Structured Output" (JSON schema validation) to force the AI to return data in specific formats, ensuring rigorous citation of evidence (quotes) for every claim made.
4.  **User Interface**: A React-based dashboard renders the structured data into interactive cards. It features specialized tabs for "Key Takeaways," "Critique," "Ideation," and "Chat," providing a dynamic reading experience.
5.  **Synthesis**: For multi-paper analysis, the system aggregates findings across documents to identify conflicting or supporting evidence, presenting a unified literature review.

**14. Expected Outcome of the project:**

1.  **Fully Functional Software**: A deployable web application capable of analyzing scientific papers with high accuracy.
2.  **Reduction in Literature Review Time**: A quantifiable reduction in the time required for researchers to screen and understand complex papers (estimated 70% time saving).
3.  **Novel Hypothesis Generation**: A demonstrated capability of the system to propose valid, testable scientific hypotheses from input data.
4.  **Privacy Benchmark**: A validated architecture that proves sensitive documents can be analyzed by LLMs without full-document cloud storage.
5.  **Publication**: A research paper on "AI-Assisted Scientific Discovery" submitted to a relevant conference.

**15. Is the project proposed relevant to the Industry / Society or Institution?**
**Yes**

**Details:**
This project is highly relevant to **Academic Institutions (R&D Centers)** and the **Knowledge Industry**.

- **Institution**: Researchers and PhD scholars at universities spend massive amounts of time on literature surveys. Prism automates this, allowing them to focus on core experimentation.
- **Society**: By lowering the barrier to understanding complex science, it democratizes access to knowledge for students and the general public.
- **Support**: We are utilizing the Gemini API (Google) for the underlying intelligence layer.

**16. Can the product or process to be developed in the project be taken up for filing a Patent?**
**Yes**

**Prior Art search done?**
**No**

The system introduces novel software methodologies that may qualify for patent filing, specifically:

1.  **Privacy-First Client-Side Architecture**: A unique method for parsing and chunking sensitive documents entirely within the client browser, ensuring data sovereignty.
2.  **Generative Ideation Algorithm**: A structured workflow for synthesizing purely static literature into novel, testable scientific hypotheses.
    _A comprehensive prior art search and patent evaluation will be considered after prototype testing and validation._

**17. Budget details:**

_Note: Since this is a software project, costs are primarily operational/cloud costs._

| Budget Item                           | Amount (Rs.)  |
| :------------------------------------ | :------------ |
| **a) Materials / Consumables**        |               |
| - Domain Name & SSL (1 year)          | 1,500.00      |
| - Cloud Hosting (Vercel/Netlify Pro)  | 2,000.00      |
| - AI API Credits (Gemini/OpenAI)      | 3,000.00      |
| **b) Labor**                          | 0.00          |
| **c) Travel** (To KSCST Exhibition)   | 2,000.00      |
| **e) Miscellaneous** (Reports/Prints) | 1,500.00      |
| **Total**                             | **10,000.00** |

**18. Any other technical details:**

- **Architecture**: Serverless Single Page Application (SPA) hosted on Vercel/Netlify for scalability and zero-maintenance infrastructure.
- **Security Standard**: Implements "Zero-Retention" privacy protocol; document chunks are ephemeral and processed in-memory without persistent cloud storage.
- **AI Models**: Utilizes a hybrid inference engine:
  - **Gemini 2.5 Flash**: For low-latency real-time chat and summarization (<500ms response).
  - **Gemini 2.5 Pro**: For complex reasoning, critique, and hypothesis generation.
- **Novelty**: Features a proprietary "Ideation Engine" that uses chain-of-thought prompting to cross-reference academic claims against known scientific axioms.
