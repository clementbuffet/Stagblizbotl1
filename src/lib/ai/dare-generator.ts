import MistralClient from '@mistralai/mistralai';
import { DARE_TEMPLATES } from './prompt-templates';
import { z } from 'zod';

const mistral = new MistralClient(process.env.MISTRAL_API_KEY || 'dj2G8v7rpICX5lPZ0p90Jn2Hg8QUmjyo');

export const DarePromptSchema = z.object({
  type: z.enum(['SOLO', 'TEAM', 'BATTLE']),
  theme: z.string().optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).default('MEDIUM'),
  duration: z.number().min(1).max(30).default(7),
});

export type DarePrompt = z.infer<typeof DarePromptSchema>;

export interface GeneratedDare {
  title: string;
  description: string;
  rules: string[];
  successCriteria: string[];
}

export class DareGenerationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DareGenerationError';
  }
}

export async function generateDare(prompt: DarePrompt): Promise<GeneratedDare> {
  try {
    const validatedPrompt = DarePromptSchema.parse(prompt);
    const template = DARE_TEMPLATES[validatedPrompt.type];
    const promptText = template(validatedPrompt.theme || '', validatedPrompt.difficulty);

    const response = await mistral.chat({
      model: "mistral-tiny",
      messages: [
        {
          role: "system",
          content: "You are a creative dare generator for a community engagement platform. Generate structured challenges in JSON format with title, description, rules array, and successCriteria array."
        },
        {
          role: "user",
          content: promptText
        }
      ]
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new DareGenerationError('No content generated');
    }

    try {
      const parsedContent = JSON.parse(content);
      return {
        title: parsedContent.title || 'Community Challenge',
        description: parsedContent.description || 'Participate in this exciting community challenge!',
        rules: parsedContent.rules || [],
        successCriteria: parsedContent.successCriteria || [],
      };
    } catch (parseError) {
      // If JSON parsing fails, try to extract content in a more forgiving way
      const titleMatch = content.match(/title["\s:]+([^\n"]+)/i);
      const descriptionMatch = content.match(/description["\s:]+([^\n"]+)/i);
      
      return {
        title: titleMatch?.[1] || 'Community Challenge',
        description: descriptionMatch?.[1] || 'Participate in this exciting community challenge!',
        rules: [],
        successCriteria: [],
      };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new DareGenerationError('Invalid dare prompt: ' + error.message);
    }
    if (error instanceof Error) {
      throw new DareGenerationError('Failed to generate dare: ' + error.message);
    }
    throw new DareGenerationError('Unknown error occurred');
  }
}