# PRISM: 100 Interview Questions & Answers

This document contains 100 comprehensive interview questions and answers tailored for the **PRISM AI Research Assistant** project. It focuses on AI architecture, product vision, data processing, and technical strategy.

---

## 🏗️ Category 1: Project Vision & Strategy (20 Qs)

**Q1: What is PRISM and what specific problem does it solve in the scientific community?**
**A:** PRISM is an AI-powered end-to-end research workflow assistant. It solves the "information overload" problem for researchers who struggle to keep up with thousands of papers. Unlike simple PDF summarizers, PRISM transforms passive reading into an active ideation process by extracting evidence, generating hypotheses, and synthesizing multiple papers.
_Real-time Example:_ A PhD student can use PRISM to screen 50 papers in an afternoon instead of a week, identifying which ones specifically use a certain methodology they need.

**Q2: Why did you choose a "Privacy-First" architecture for a research assistant?**
**A:** Research often involves pre-publication, sensitive Intellectual Property (IP). Sending full, proprietary PDFs to cloud servers is a security risk. PRISM parses files on the client-side (vrowser) so the actual document never leaves the user's machine—only ephemeral, anonymized text chunks reach the AI.
_Project Context:_ We use `pdf.js` and `mammoth.js` to process files directly in the browser.

**Q3: How does PRISM differentiate itself from generic LLM chat interfaces (like ChatGPT)?**
**A:** ChatGPT is general-purpose and prone to hallucinations. PRISM is context-bounded to the uploaded scientific document and uses "Evidence Forcing"—requiring the AI to provide direct verbatim quotes for every claim. It also includes specialized scientific tools like a Reference Extractor and an Ideation Lab.
_Real-time Example:_ If ChatGPT is asked about a paper's results, it might generalize. PRISM will say "The paper states: 'X results were achieved' (Line 42)."

**Q4: Who are the primary personas PRISM is designed for, and how does it adapt to them?**
**A:** PRISM targets Students, Engineers, and Domain Experts. It uses an "Adaptive Expertise Quiz" at onboarding to assess the user's level. Based on the score, the AI adjusts its technical depth, jargon usage, and summary complexity.
_Project Context:_ `analysisService.js` contains specific instructions for each persona level.

**Q5: What is the significance of the "Ideation Lab" feature?**
**A:** Most AI tools focus on looking backward (summarizing what was done). The Ideation Lab looks forward by using Chain-of-Thought prompting to generate testable scientific hypotheses and experimental designs based on the paper's findings.
_Real-time Example:_ After reading a paper on graphene, PRISM might suggest a specific doping method not mentioned in the original text but logically derived from its results.

**Q6: How does PRISM handle "Scientific Hallucination"?**
**A:** We use Structured Output (JSON schemas) and Evidence Grounding. The AI is prompted to return a specific JSON structure where every "finding" must have a corresponding "evidence" field sourced directly from the text.
_Project Context:_ The `SCHEMAS.coreAnalysis` in `geminiApi.js` enforces this structure.

**Q7: What was the motivation behind the "Multi-Paper Synthesis" feature?**
**A:** Science doesn't happen in a vacuum. Researchers need to see how multiple studies compare. Synthesis identifies consensus (where papers agree) and conflicts (where they disagree), saving hours of manual cross-referencing.
_Real-time Example:_ Comparing three COVID-19 vaccine papers to find which one reported the highest efficacy vs. specific variants.

**Q8: Explain the value proposition of the "Expertise Quiz" for a research tool.**
**A:** It serves two purposes: First, it helps the user gauge their own understanding of the abstract. Second, it provides a "contextual anchor" for the AI, allowing it to know if it should explain concepts like "Stochastic Gradient Descent" or assume the user already knows it.

**Q9: How does PRISM contribute to "Open Science"?**
**A:** By making complex research more accessible through simplified summaries and automated glossaries, it lowers the barrier to entry for citizen scientists and students from non-prestigious institutions.

**Q10: What is the "Zero-Retention" privacy protocol mentioned in your roadmap?**
**A:** It means document chunks are processed in the AI's short-term context window and never stored in a database. Once the session ends or the window is closed, the data is gone.

**Q11: Why is "Evidence-Grounded" analysis more critical in research than in creative writing?**
**A:** In research, a single incorrect claim can lead to months of wasted experimental time. Accuracy is the primary metric; creativity is secondary.

**Q12: How do you handle the "Cold Start" problem for a researcher starting a new topic?**
**A:** PRISM provides "Related Papers" searches. It doesn't just list titles; it generates technical search queries for Google Scholar based on the current paper's methodology and findings.

**Q13: What is the ROI (Return on Investment) for a university adopting PRISM?**
**A:** Time is the primary ROI. If a researcher saves 70% of their literature review time, they can spend 70% more time on actual discovery and publication.

**Q14: Describe the "Multimodal" aspect of PRISM.**
**A:** It goes beyond text. PRISM can "look" at figures, charts, and diagrams when paired with vision-capable models (like Gemini Pro), allowing users to ask questions like "What does the blue line in Figure 3 represent?"

**Q15: How does PRISM ensure scientific rigor in its critiques?**
**A:** It uses a structured "Peer Review" prompt that looks for common scientific pitfalls: small sample sizes, lack of control groups, or over-generalized conclusions, always citing the text to avoid being overly critical without proof.

**Q16: Why did you choose a browser-based SPA over a desktop application?**
**A:** Portability and accessibility. Researchers work across devices (lab PCs, home laptops, tablets). An SPA ensures they have their tools anywhere without installation, while still keeping parsing local.

**Q17: How does PRISM assist in "Gap Identification"?**
**A:** It explicitly looks for "Future Work" and "Limitations" sections in papers and synthesizes them into actionable research gaps that the user could potentially fill.

**Q18: What is the role of the "Interaction History" in PRISM?**
**A:** It allows for iterative discovery. Users can jump back to previous analyses or compare a current paper against a previously read one from their "History" tab.

**Q19: How does the "Presentation Generator" add value?**
**A:** Turning a paper into a presentation is a tedious task. PRISM automates the structure—extracting key points into slides—letting the researcher focus on the delivery rather than the formatting.

**Q20: What is the long-term vision for the "Scientific Discovery" workflow in PRISM?**
**A:** To move from a "Research Assistant" to a "Co-Pilot" that can actively suggest experiments, draft paper sections, and alert the user when new, contradictory research is published.

---

## 🤖 Category 2: AI & LLM Architecture (30 Qs)

**Q21: Why did you implement a hybrid model approach (Gemini Flash & Gemini Pro)?**
**A:** Optimization of the "Speed-Quality-Cost" triangle. Gemini Flash is used for low-latency, high-frequency tasks (extracting terms, chat). Gemini Pro is reserved for high-reasoning tasks (Critique, Ideation, synthesis) where deep understanding is worth the extra latency.
_Project Context:_ Detailed in `AI_MODELS.md`.

**Q22: What is "Structured Output" and why is it vital for PRISM?**
**A:** It's a technique that forces the LLM to return data in a strictly typed JSON format instead of free-form text. This allows the frontend to programmatically render cards, tables, and lists without complex parsing or regex.
_Real-time Example:_ Ensuring that a "Reference" always has an `apa` and a `bibtex` field.

**Q23: How do you handle the token limit (context window) for very long research papers?**
**A:** We use "Intelligent Chunking" and section extraction. Instead of sending the whole 50-page PDF, we prioritize the Abstract, Introduction, Methodology, and Conclusion.
_Project Context:_ The `extractRelevantSections` function in `analysisService.js` targets these specific keywords.

**Q24: Explain the importance of "Chain-of-Thought" (CoT) prompting in the Ideation Lab.**
**A:** CoT forces the model to "think step-by-step." For a hypothesis, it first analyzes the paper's results, then identifies a missing variable, and finally constructs the hypothesis. This reduces "logical leaps" and errors.

**Q25: What are "System Instructions" in the context of your Gemini API calls?**
**A:** They set the global behavior of the AI. In PRISM, we set the persona (e.g., "You are a professional peer reviewer") and the rigid rules (e.g., "Always use direct quotes").

**Q26: How do you manage "Temperature" in different AI tasks?**
**A:** For "Analysis" and "References," we use a low temperature (e.g., 0.1) for deterministic, factual output. For "Ideation," we use a higher temperature (e.g., 0.7) to encourage creativity and novel suggestions.

**Q27: Describe your "Retry Logic" for API failures.**
**A:** We use exponential backoff and "Model Fallback." If Gemini Pro is overloaded (503 error), our service can fall back to Gemini Flash to ensure the user gets _some_ result rather than a blank page.
_Project Context:_ Implemented in the `generateStructuredContent` function.

**Q28: Why use JSON Schema validation on the client-side for AI responses?**
**A:** AI models occasionally fail to follow formatting rules perfectly. Validating on the client ensures that the UI doesn't crash if the model returns an extra field or misses a required one.

**Q29: What is "Prompt Injection" and how does PRISM defend against it?**
**A:** It's when a user tries to trick the AI through the chat box. PRISM uses separate, context-isolated prompts where the "document content" and "user query" are clearly demarcated using delimiters (like `####`).

**Q30: How does PRISM use "Few-Shot Prompting"?**
**A:** In the Reference Extractor, we provide the AI with 1-2 examples of how to format a messy citation into clean APA. This significantly improves formatting accuracy.

**Q31: Explain the concept of "Embedding" and why it's used in RAG (Retrieval-Augmented Generation).**
**A:** Embeddings convert text into numerical vectors. We use them to find which parts of a paper are most relevant to a user's question in the chat, allowing us to only "retrieve" necessary pieces.

**Q32: Why did you choose the Gemini 2.x/1.5 series over GPT-4?**
**A:** Primarily for the massive context window (up to 1M+ tokens) and the native support for Multimodalities (images/video/text in one prompt), which is crucial for analyzing scientific figures.

**Q33: How do you handle "Quota Exceeded" errors (429) from the AI provider?**
**A:** We implement a rotation strategy where the system can cycle through different API keys or notify the user to wait, preventing "service blackout" during peak usage.

**Q34: What is "Tokenization" and how does it effect cost?**
**A:** AI doesn't read words; it reads tokens (chunks of characters). Scientific papers have many complex terms ("polyhydroxyalkanoates"), which take more tokens, increasing the cost compared to simple English text.

**Q35: How does the "Persona-Aware Prompting" work technically?**
**A:** We inject a `personaInstructions` string into the main prompt. For "Student," we add "Explain like I'm 15." For "Expert," we add "Use graduate-level technical rigor."
_Project Context:_ This is dynamically selected in `generateCoreAnalysis`.

**Q36: Describe the "Evidence Forcing" prompt technique.**
**A:** It's a "Negative Constraint" where we tell the AI: "If you cannot find a direct quote for a claim, do not include the claim at all."

**Q37: Why use `responseMimeType: 'application/json'`?**
**A:** It's a native Gemini feature that guarantees the output will be valid JSON, removing the need for the AI to add "Here is the JSON:" preamble which wastes tokens.

**Q38: How do you ensure "Contextual Persistence" in the multi-turn chat?**
**A:** By maintaining a `messages` array that includes the paper's core analysis + previous user questions. This allows the AI to "remember" why the user asked the follow-up question.

**Q39: What is the benefit of "JSON Schema" over just telling the AI to "return JSON"?**
**A:** A schema defines types (string, number, array). This is critical for features like the "Expertise Quiz," where the `correctAnswer` MUST be a number (0-3) to correspond with our array index.

**Q40: How does "Streaming" improve user experience in the chat?**
**A:** Instead of waiting 10 seconds for a full answer, users see the text appear token-by-token. This "perceived performance" makes the app feel much faster and more interactive.

**Q41: Explain the role of "Top-K" and "Top-P" in your AI configuration.**
**A:** They control the diversity of the output. We keep them relatively high (Top-K: 40, Top-P: 0.95) for Ideation to get "out-of-the-box" ideas, but lower for summaries to keep them focused.

**Q42: How do you handle "Safety Settings" in an academic tool?**
**A:** We set the thresholds to `BLOCK_MEDIUM_AND_ABOVE`. While science is mostly safe, some papers (e.g., virology) might trigger "Dangerous Content" filters. We have to balance safety with the need to analyze legitimate scientific data.

**Q43: What is "Hallucination Rate" and how did you minimize it in PRISM?**
**A:** It's the frequency of AI-generated lies. We minimized it by using "Retrieval" (sending paper chunks) vs "Knowledge" (relying on what the AI learned during training).

**Q44: Why is it important to use different models for "Extraction" vs "Inference"?**
**A:** Extraction (e.g., finding the title) is a pattern-matching task (Flash-ready). Inference (e.g., identifying a flaw in the methodology) is a high-level cognitive task (Pro-ready).

**Q45: How does PRISM handle "Ambiguity" in paper titles?**
**A:** If a title isn't clearly found, the AI is prompted to "infer the most programmatic title based on the abstract and metadata."

**Q46: Explain "In-Context Learning" (ICL) in the glossary feature.**
**A:** We give the AI the specific text where the term was used, ensuring the definition is contextual to _that_ specific paper's usage, not just a dictionary definition.

**Q47: How do you optimize the prompt length?**
**A:** By using "System Instructions" for static rules and the "User Prompt" only for the dynamic document data, reducing the redundant tokens sent in every API call.

**Q48: What is "Latency" and how does "Model Orchestration" solve it?**
**A:** Latency is the delay in response. By routing "Quick Tasks" (Glossary) to Flash and "Deep Tasks" (Critique) to Pro, we ensure the UI updates quickly for 80% of tasks, only "slowing down" for the 20% that truly need it.

**Q49: How do you handle "Mathematical Notations" in LLMs?**
**A:** We explicitly prompt the AI to use LaTeX if mathematical formulas are required, ensuring they are rendered beautifully on the frontend.

**Q50: What is the most challenging part of using LLMs for scientific research?**
**A:** Identifying "Nuance." LLMs often miss the subtle "buts" and "howevers" in scientific papers. We combat this by prompting for "Contradictory Findings" specifically in our synthesis module.

---

## 📂 Category 3: Data Processing & RAG (20 Qs)

**Q51: Describe the "Frontend Parsing" workflow for PDFs.**
**A:** When a user drops a file, `pdfjs-dist` is triggered. It iterates through pages, extracts text layers, and concatenates them into a single string—all in the browser's worker thread to avoid freezing the UI.
_Real-time Example:_ A 10MB PDF being parsed in 2 seconds without ever hitting a backend server.

**Q52: What is "Mammoth.js" and why use it for DOCX?**
**A:** Mammoth converts `.docx` files into clean HTML/Text. It focuses on the semantic structure (headings, lists) rather than visual formatting, which is perfect for AI analysis.

**Q53: How do you handle "Non-OCR" (scanned) PDFs?**
**A:** Currently, we extract text layers. For scanned PDFs (images), we would need an OCR step. In our roadmap, we plan to use Gemini's native vision capabilities to "read" images of pages directly.

**Q54: What is "Chunking strategy" in RAG and which one does PRISM use?**
**A:** Chunking breaks long text into manageable pieces. We use "Keyword-Driven Extraction" for summaries (finding abstract/intro) and "Windowing" for chat, where we send relevant paragraphs surrounding a specific concept.

**Q55: How do you prevent "Memory Leaks" when processing large documents in React?**
**A:** We clear the document state when the user navigates away or uploads a new paper. We also use `Zustand` with selective state updates to ensure we aren't re-rendering large text strings unnecessarily.

**Q56: Why is "Client-Side Text Extraction" better for privacy than standard server-side processing?**
**A:** On a server, the file is temporarily stored in RAM or a `/tmp` folder. On the client, the OS-level sandbox of the browser ensures the data is isolated to that specific tab.

**Q57: Describe how you extract "Metadata" (Authors, Year) accurately.**
**A:** We don't just ask the AI "who are the authors." We send the first 2000 characters of the paper, which usually contains the header/title page, ensuring the AI sees the most likely metadata location.

**Q58: How do you handle "Tabular Data" in scientific papers?**
**A:** Table extraction from PDFs is notoriously hard. We prompt the AI to "identify and describe key data from tables found in the text," although our future plan is to use visual table recognition via vision models.

**Q59: What is "Context Stuffing" and how do you avoid it?**
**A:** It's sending too much irrelevant text to the AI, which "confuses" it and wastes money. We avoid it by stripping out "References," "Footnotes," and "Appendices" before the core analysis.

**Q60: Explain "Similarity Search" in the chat feature.**
**A:** When a user asks "Tell me about the methodology," we search our extracted chunks for keywords like "method," "procedure," or "experimental."

**Q61: How do you handle different "Document Encodings"?**
**A:** We use standard UTF-8. If a document has weird characters (like scientific symbols), `pdf.js` usually handles the mapping to standard text characters during extraction.

**Q62: Why is "Section Extraction" more efficient than simple "Character Chunking"?**
**A:** Character chunking might cut a sentence in half. Section extraction ensures that a "Method" remains a single coherent block of context for the AI.

**Q63: How do you handle "Image Extraction" for the Figures tab?**
**A:** We use `pdf.js` to find image objects in the PDF stream. We then render them to a `<canvas>` and convert that to a data URL/Blob for display and AI vision analysis.

**Q64: What is the benefit of using "Zustand" for state management in PRISM?**
**A:** It's lightweight and has a "Persistence" middle-ware that allows us to save the last 10 analyzed papers in `localStorage`, so users don't have to re-upload them if they refresh the page.

**Q65: How do you handle "Bibliography Parsing"?**
**A:** In `analysisService.js`, we look for markers like "References" or "Bibliography" and extract everything from that point to the end of the file.

**Q66: What is the "JSON Schema Explosion" problem?**
**A:** If a schema is too complex, the model might fail to generate any output. We keep our schemas "flat" and modular—separating Core Analysis, Critique, and Ideation into different API calls.

**Q67: Explain "Token Budgeting" for the synthesis feature.**
**A:** When synthesizing 5 papers, each paper's summary might be 500 tokens. That's 2500 tokens just for the input. We must ensure the remaining "Response Budget" (max output tokens) is high enough for a deep synthesis.

**Q68: How do you manage "Async State" for multiple concurrent analysis tasks?**
**A:** We use "Skeleton Loaders" and discrete loading states (e.g., `isAnalyzingCore`, `isGeneratingQuiz`). This keeps the UI reactive while background API calls complete one-by-one.

**Q69: What is "Post-Processing" in your data pipeline?**
**A:** After the AI returns JSON, we occasionally clean it up—like removing trailing commas, fixing BibTeX syntax, or truncating overly long summaries for the UI.

**Q70: How do you handle "Large File Uploads" (>50MB)?**
**A:** We set a technical limit. For research papers, 50MB is massive. Beyond that, the browser's memory management becomes unstable. We warn the user to split the PDF or use a smaller version.

---

## 🌟 Category 4: Advanced Features & Multimodality (15 Qs)

**Q71: How does the "Figure Explanation" feature technically work?**
**A:** It's a "Multimodal Prompt." We send the figure image (as a base64 string) _and_ the surrounding text context from the paper to the AI, asking it to explain the visual data in the context of the research.
_Real-time Example:_ "Based on this bar chart and the methodology section, what is the p-value for group B?"

**Q72: What is the "Knowledge Graph" feature on your roadmap?**
**A:** It's a 3D visualization of concepts. We prompt the AI to return "Nodes" (concepts) and "Edges" (relationships). We then use a library like `react-force-graph` to show how ideas in a paper are connected.

**Q73: How does the "Synthesis" module handle "Conflicting Findings"?**
**A:** It uses "Contradictory Reasoning." We specifically prompt the AI to "Find any result in Paper A that directly challenges or questions a result in Paper B."

**Q74: Explain the "PPTX Generation" logic.**
**A:** We use `PptxGenJS`. PRISM extracts a 6-slide outline (Title, Problem, Method, Results, Conclusion, Future). Each slide's content is then used to programmatically build and download a `.pptx` file.

**Q75: What is "APA to BibTeX" conversion and why is it automated?**
**A:** Researchers use Word (APA) or LaTeX (BibTeX). Automating the conversion ensures that no matter their writing platform, they have a ready-to-use citation without manual re-typing.

**Q76: How does the "Expertise Assessment" quiz dynamic difficulty work?**
**A:** The prompt asks for questions that progress from "L1: Remember" to "L5: Analyze." This allows us to map the user's score to a persona level (e.g., 5/5 = Expert, 1/5 = Student).

**Q77: Describe the "Figure Attachment" feature in chat.**
**A:** Users can click a "plus" button, select a figure already extracted from the paper, and ask a specific question. This combines text-chat with image-context.

**Q78: What is "Evidence-Grounded Critique"?**
**A:** Standard AI critiques are generic. Our critique prompt specifies: "If you say the methodology is weak, you must quote the specific part of the methodology you are criticizing."

**Q79: How do you handle "Comparison Across Multiple Papers" in the synthesis?**
**A:** We use a "Matrix Prompt." We send the summaries of all papers and ask the AI to "Build a mental table where rows are papers and columns are themes."

**Q80: What is the "Scientific Axiom Validation" mentioned in your technical details?**
**A:** It's an advanced prompt where we ask the AI to check if a paper's claims violate "Scientific Axioms" (established laws like Thermodynamics), used as a "Bullshit Detector" for low-quality research.

**Q81: How do you handle "Multilingual" research papers?**
**A:** Gemini is natively multilingual. If a user uploads a paper in German, we can still generate an English analysis or translate it, as the AI handles the translation in-context.

**Q82: Describe the "Concept Evolution" feature.**
**A:** In synthesis, we look at the publication years. We ask the AI how the theory evolved from the oldest paper to the newest one (e.g., "Paper A laid the foundation, Paper B refined the algorithm, Paper C applied it to a new field").

**Q83: Explain the "Hypothesis-Experimental Design" pair in Ideation.**
**A:** A hypothesis is useless without an experiment. PRISM ensures that every "Idea" has a "Step-by-step Protocol," making it actionable for a researcher in a lab.

**Q84: How do you handle "Citation Networks"?**
**A:** Our "Related Papers" feature creates Google Scholar queries. In the future, we aim to map these into a citation tree to show who cited who.

**Q85: What is the "Presentation Persona" in slide generation?**
**A:** We can ask the AI to generate slides for a "Keynote Speech" (visionary) or a "Technical Seminar" (detailed), adapting the bullet points accordingly.

---

## 🌍 Category 5: Real-world Impact & Ethics (15 Qs)

**Q86: How does PRISM impact "Research Productivity"?**
**A:** Studies show literature review takes 30-50% of a researcher's time. Reducing this by 70% effectively gives a laboratory 2-3 extra months of "discovery time" per year.

**Q87: What are the "Ethical Risks" of using AI in research?**
**A:** Over-reliance. Researchers might stop reading the full paper and only trust the AI's summary. We mitigate this by including "Evidence Quotes" and encouraging users to "Verify in Source."

**Q88: How do you handle "Bias" in AI analysis?**
**A:** LLMs can be biased toward mainstream views. We include a "Critique" tab that is specifically designed to find flaws, which acts as a "Devil's Advocate" to the AI's own summary.

**Q89: Is PRISM intended to "Replace" researchers?**
**A:** No. It's an "Augmentation" tool. It handles the "Drudge Work" (summarizing, formatting, searching) so the human can handle the "Creative Work" (interpreting, synthesizing, experimenting).

**Q90: How does PRISM help "Democratize Science"?**
**A:** High-level research papers are often paywalled behind jargon. PRISM's "Glossary" and "Student Mode" translate elite knowledge into accessible concepts for everyone.

**Q91: What is the "Environmental Impact" of running these AI models?**
**A:** LLMs consume significant energy. Our optimization (using Flash for 80% of tasks) reduces the "Compute Footprint" per user compared to using large reasoning models for everything.

**Q92: How do you address "AI Hallucinations" leading to false scientific claims?**
**A:** We use a "Double-Check" instruction where the AI is asked to verify its own JSON findings against the input text before returning the response.

**Q93: Support for "Low-Bandwidth" environments?**
**A:** Since PRISM is an SPA, the initial load is small. Subsequent data exchange is just JSON text, which is very efficient for researchers in developing countries with slow internet.

**Q94: What is the "Future Roadmap" for PRISM?**
**A:** Direct integration with ArXiv/PubMed, Voice-to-Text queries for lab use, and a "Discovery Alert" system that notifies you when news papers related to your research goals are published.

**Q95: How do you handle "Copyright" of the analyzed papers?**
**A:** PRISM is for "Fair Use" (personal study and research). Since we don't store or re-distribute the full text, we stay within standard educational technology guidelines.

**Q96: What is the "Scientific Integrity" protocol in PRISM?**
**A:** We avoid "Creative Filler." Responses are strictly limited to what is in the text + logical extensions, preventing the AI from telling "Scientific Stories."

**Q97: Impact on "Peer Review" wait times?**
**A:** While PRISM isn't a peer reviewer, it can help editors quickly identify if a paper meets basic methodology standards, potentially speeding up the initial screening process.

**Q98: How do you handle "Conflicting Human Inputs"?**
**A:** For mult-paper synthesis, if Paper A says "X is true" and Paper B says "X is false," PRISM reports the conflict rather than trying to pick a winner.

**Q99: Use of PRISM in "Education"?**
**A:** Professors can use PRISM to generate quizzes for their students based on a mandatory reading, ensuring students actually understood the methodology.

**Q100: If you had to summarize PRISM in one sentence for an investor?**
**A:** "PRISM is an AI research co-pilot that turns months of literature review into seconds of actionable scientific discovery, all while keeping your data private."

---

_Created for the PRISM Project Interview Preparation - 2025_
