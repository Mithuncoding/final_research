import fs from 'fs';
import path from 'path';

// 1. Read .env manually
const envPath = path.resolve(process.cwd(), '.env');
let apiKey = '';
try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/VITE_GEMINI_API_KEY=(.*)/);
  if (match) {
    apiKey = match[1].trim();
  }
} catch (e) {
  console.error("Could not read .env file:", e.message);
  process.exit(1);
}

if (!apiKey) {
    console.error("No API key found in .env!");
    process.exit(1);
}

// 2. Define Schema
const ADVANCED_SCHEMA = {
    type: "object",
    properties: {
      strengths: {
        type: "array",
        items: {
          type: "object",
          properties: {
            point: { type: "string" },
            evidence: { type: "string" },
          },
          required: ["point", "evidence"],
        },
      },
      weaknesses: {
        type: "array",
        items: {
          type: "object",
          properties: {
            point: { type: "string" },
            evidence: { type: "string" },
          },
          required: ["point", "evidence"],
        },
      },
      hypotheses: {
        type: "array",
        items: {
          type: "object",
          properties: {
            hypothesis: { type: "string" },
            experimentalDesign: { type: "string" },
            expectedOutcome: { type: "string" },
          },
          required: ["hypothesis", "experimentalDesign"],
        },
      },
    },
    required: ["strengths", "weaknesses", "hypotheses"],
  };

// 3. Test Logic
const MODELS = ['gemini-exp-1206', 'gemini-exp-1121', 'gemini-2.0-flash-exp'];
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

async function testAdvancedAnalysis() {
    for (const model of MODELS) {
        console.log(`\n----------------------------------------`);
        console.log(`Testing with model: ${model}...`);
        
        const url = `${BASE_URL}/${model}:generateContent?key=${apiKey}`;

        const mockCoreAnalysis = {
            title: "Test Paper: Quantum Computing Advances",
            summary: "This paper discusses new error correction methods in qubits."
        };
        
        const mockText = "In this study, we demonstrate a new surface code that improves coherence times by 20%. however, scaling remains difficult due to wiring constraints. Future work should investigate multiplexing.";

        const prompt = `You are conducting an advanced analysis of a scientific research paper.

Paper title: ${mockCoreAnalysis.title}
Paper summary: ${mockCoreAnalysis.summary}

Full paper text:
${mockText}

Provide:
1. STRENGTHS: 3-5 key strengths with direct quotes as evidence
2. WEAKNESSES: 3-5 limitations or areas for improvement with direct quotes as evidence
3. NOVEL HYPOTHESES: 3-4 testable hypotheses that extend from this work.

Be critical but fair. Ground everything in evidence from the paper.`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        responseMimeType: "application/json",
                        responseSchema: ADVANCED_SCHEMA
                    }
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                // console.error(`[FAILED] Status: ${response.status}`);
                console.error(`[FAIL] ${model} failed with ${response.status}`);
                if (response.status === 404) console.log("Model not found.");
                else if (response.status === 429) console.log("Quota exceeded.");
                else console.log(errorText.substring(0, 200));
            } else {
                const data = await response.json();
                const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
                console.log(`[SUCCESS] ${model} PASSED!`);
                console.log("Snippet:", text?.substring(0, 100));
                
                // Found a working model, we can stop? 
                // Let's run all to see which is best, or stopping is fine.
                // Let's stop to save time.
                return;
            }

        } catch (e) {
            console.error(`[ERROR] Network/Fetch failed:`, e.message);
        }
    }
}

testAdvancedAnalysis();
