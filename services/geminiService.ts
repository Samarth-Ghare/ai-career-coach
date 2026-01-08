import { GoogleGenAI, Chat, GenerateContentResponse, Type, Modality } from "@google/genai";
import { ParsedResume, InterviewQuestion, InterviewFeedback, InterviewField } from '../types';
import { fileToBase64 } from '../utils/helpers';
import { STATIC_INTERVIEW_QUESTIONS } from './mockInterviewData';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getInterviewPrepData = async (field: InterviewField): Promise<InterviewQuestion[]> => {
    const fieldQuestions = STATIC_INTERVIEW_QUESTIONS.filter(q => q.field === field);
    if (fieldQuestions.length < 10) {
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: `Generate 10 advanced interview questions for the field of ${field}.`,
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                id: { type: Type.STRING },
                                question: { type: Type.STRING },
                                category: { type: Type.STRING },
                                bestAnswerHint: { type: Type.STRING }
                            },
                            required: ['id', 'question', 'category', 'bestAnswerHint']
                        }
                    }
                }
            });
            const dynamicQuestions = JSON.parse(response.text || "[]").map((q: any) => ({ ...q, field }));
            return [...fieldQuestions, ...dynamicQuestions];
        } catch (e) {
            console.error("Failed to augment questions", e);
        }
    }
    return fieldQuestions;
};

export const getDeepAnalysisFeedback = async (transcript: string): Promise<InterviewFeedback> => {
    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Act as a brutal but fair technical interviewer. Analyze this transcript and provide critical feedback: \n\n${transcript}`,
        config: {
            // Fix: Set both maxOutputTokens and thinkingConfig.thinkingBudget at the same time to ensure response space
            maxOutputTokens: 10000,
            thinkingConfig: { thinkingBudget: 8000 },
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    score: { type: Type.NUMBER },
                    clarity: { type: Type.NUMBER },
                    relevance: { type: Type.NUMBER },
                    suggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ['score', 'clarity', 'relevance', 'suggestions']
            }
        }
    });
    return JSON.parse(response.text || "{}") as InterviewFeedback;
};

export const calculateResumeStrength = async (resume: ParsedResume): Promise<{ score: number; tips: string[] }> => {
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this resume and provide a strength score (0-100) and 3 actionable improvement tips. Resume: ${JSON.stringify(resume)}`,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    score: { type: Type.NUMBER },
                    tips: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ['score', 'tips']
            }
        }
    });
    return JSON.parse(response.text || '{"score":0, "tips": []}');
};

export const startLiveInterview = (callbacks: any) => {
    return ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks,
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } },
            },
            systemInstruction: 'You are a senior hiring manager. Challenge the candidate with follow-up questions. Be professional and high-stakes.'
        }
    });
};

export const getChatInstance = (): Chat => {
    return ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
            systemInstruction: `You are an AI Career Coach. You have access to Google Search to provide up-to-date industry trends, salary data, and company news. Be precise, encouraging, and Material 3 styled.`,
            tools: [{ googleSearch: {} }]
        }
    });
}

export const parseResumeWithGemini = async (file: File): Promise<ParsedResume> => {
  const model = 'gemini-3-flash-preview';
  const base64Data = await fileToBase64(file);
  const response = await ai.models.generateContent({
    model,
    contents: { parts: [{ inlineData: { mimeType: file.type, data: base64Data } }, { text: "Extract resume JSON. Include location and LinkedIn if present." }] },
    config: { 
        responseMimeType: 'application/json', 
        responseSchema: {
            type: Type.OBJECT,
            properties: {
              personalInfo: { 
                type: Type.OBJECT, 
                properties: { 
                    name: { type: Type.STRING }, 
                    email: { type: Type.STRING }, 
                    phone: { type: Type.STRING },
                    location: { type: Type.STRING },
                    linkedin: { type: Type.STRING }
                } 
              },
              summary: { type: Type.STRING },
              skills: { type: Type.ARRAY, items: { type: Type.STRING } },
              experience: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, company: { type: Type.STRING }, duration: { type: Type.STRING }, responsibilities: { type: Type.ARRAY, items: { type: Type.STRING } } } } },
              education: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { degree: { type: Type.STRING }, institution: { type: Type.STRING }, year: { type: Type.STRING } } } },
            }
        }
    }
  });
  return JSON.parse(response.text || "{}") as ParsedResume;
};