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

console.log("Testing API Key:", apiKey ? "Found key ending in " + apiKey.slice(-4) : "NOT FOUND");

if (!apiKey) {
    console.error("No API key found in .env!");
    process.exit(1);
}

// 2. Test Logic
const MODEL = 'gemini-2.5-flash';
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

async function testModel(modelName) {
    const url = `${BASE_URL}/${modelName}:generateContent?key=${apiKey}`;
    console.log(`\nTesting connection to model: ${modelName}...`);
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Hello, say 'working' if you receive this." }] }]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[FAILED] Status: ${response.status}`);
            console.error(`Error Body: ${errorText}`);
            return false;
        } else {
            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            console.log(`[SUCCESS] API responded: "${text?.trim()}"`);
            return true;
        }

    } catch (e) {
        console.error(`[ERROR] Network/Fetch failed:`, e.message);
        return false;
    }
}

async function runTests() {
    // Test user's requested model
    const success = await testModel(MODEL);

    if (!success) {
        console.log("\n--- Primary model failed. Testing fallbacks ---");
        await testModel('gemini-1.5-flash');
        await testModel('gemini-2.0-flash-exp');
    }
}

runTests();
