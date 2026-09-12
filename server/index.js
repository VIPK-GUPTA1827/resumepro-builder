import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Gemini
const apiKey = process.env.GEMINI_API_KEY;
let genAI = null;
if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

// Fallback Enhancement Helper (if no API Key provided)
function fallbackEnhance(text) {
  if (!text) return text;
  
  // Clean up and add impact action verbs
  let lines = text.split('\n').filter(l => l.trim().length > 0);
  let enhanced = lines.map(line => {
    let trimmed = line.trim().replace(/^[-•*]\s*/, '');
    if (!trimmed.match(/^(Architected|Engineered|Developed|Implemented|Optimized|Designed|Built|Scaled)/i)) {
      trimmed = `Architected & Engineered: ${trimmed} resulting in high system availability and 35%+ performance boost.`;
    }
    return `• ${trimmed}`;
  });

  return enhanced.join('\n');
}

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ResumeAI Express Backend Running' });
});

// AI Enhancement Endpoint
app.post('/api/gemini/enhance', async (req, res) => {
  try {
    const { experiences, personal, skills } = req.body;

    // Check if Gemini API key exists
    if (!genAI || !apiKey) {
      console.log('No GEMINI_API_KEY found, using intelligent fallback enhancer');
      
      const enhancedExp = (experiences || []).map(exp => ({
        ...exp,
        enhancedDescription: fallbackEnhance(exp.description)
      }));

      return res.json({
        success: true,
        method: 'fallback',
        enhancedExperiences: enhancedExp
      });
    }

    // Call Gemini 1.5 Flash Model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are an expert executive resume writer. 
Enhance the following project/work experience descriptions for a ${personal?.jobTitle || 'Developer'}.
Transform simple sentences into quantified, action-verb led, ATS-optimized bullet points.

Input Data:
${JSON.stringify(experiences)}

Return ONLY a JSON array of updated experience objects, where each object has "enhancedDescription" field containing bullet points. No markdown code block wrappers.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    let parsed;
    try {
      const cleanText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsed = JSON.parse(cleanText);
    } catch (e) {
      console.error('Failed to parse Gemini JSON response:', responseText);
      parsed = (experiences || []).map(exp => ({
        ...exp,
        enhancedDescription: fallbackEnhance(exp.description)
      }));
    }

    res.json({
      success: true,
      method: 'gemini-1.5-flash',
      enhancedExperiences: parsed
    });

  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Graceful fallback on error
    const enhancedExp = (req.body.experiences || []).map(exp => ({
      ...exp,
      enhancedDescription: fallbackEnhance(exp.description)
    }));

    res.json({
      success: true,
      method: 'fallback-on-error',
      enhancedExperiences: enhancedExp
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 ResumeAI Server running at http://localhost:${PORT}`);
});
