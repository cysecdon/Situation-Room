import { GoogleGenAI } from "@google/genai";
import { DashboardMetrics, Incident } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeSituation = async (metrics: DashboardMetrics, recentIncidents: Incident[]) => {
  try {
    const prompt = `
      You are a senior election security analyst for an international observer mission in Nigeria.
      Analyze the following real-time election dashboard data and provide a concise, 
      authoritative risk assessment (max 3 sentences) and 3 bullet points of recommended actions.
      
      Focus on patterns like BVAS bypass, regional violence, or logistics delays common in Nigerian elections.
      Pay specific attention to clusters of incidents in specific Polling Units (PU).

      Metrics:
      - Polling Units Reporting: ${metrics.pollingUnitsReporting}%
      - Anomaly Score: ${metrics.anomalyScore} (Scale 0-100, >80 is critical)
      - OCR Mismatch Rate: ${metrics.ocrMismatchRate}%
      - Votes Received: ${metrics.votesReceived}
      
      Recent Incidents:
      ${recentIncidents.slice(0, 10).map(i => `- ${i.type} at ${i.pollingUnit} (${i.locationName}) - Status: ${i.status}`).join('\n')}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a specialized election monitoring AI. Be brief, professional, and focus on data integrity and security.",
        temperature: 0.3, // Low temperature for more deterministic/factual output
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return "AI Analysis currently unavailable due to network connectivity.";
  }
};