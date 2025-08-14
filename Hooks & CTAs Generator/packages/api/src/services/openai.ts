import 'dotenv/config';
import OpenAI from 'openai';

export interface GenerateContentRequest {
  topic: string;
}

export interface GeneratedContent {
  hooks: string[];
  ctas: string[];
}

export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is required');
    }

    this.openai = new OpenAI({
      apiKey: apiKey,
    });
  }

  async generateHooksAndCTAs(topic: string): Promise<GeneratedContent> {
    try {
      const prompt = `Generate 5 compelling hooks and 5 call-to-actions for a social media post about "${topic}". 

      Hooks should be attention-grabbing and make people want to read more. They should use proven copywriting techniques like:
      - Curiosity gaps
      - Pain points
      - Social proof
      - Specific numbers/statistics
      - Controversial statements
      
      Call-to-actions should be clear, action-oriented, and create urgency. They should:
      - Use action verbs
      - Create FOMO (fear of missing out)
      - Be specific about the benefit
      - Include urgency when appropriate
      
      Return the response in this exact JSON format:
      {
        "hooks": ["hook1", "hook2", "hook3", "hook4", "hook5"],
        "ctas": ["cta1", "cta2", "cta3", "cta4", "cta5"]
      }
      
      Make sure each hook and CTA is unique and compelling. Don't include quotes around the text.`;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert copywriter specializing in creating compelling social media hooks and call-to-actions. You understand human psychology and what drives engagement.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 1000,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from OpenAI');
      }

      // Try to parse the JSON response
      try {
        const parsed = JSON.parse(response);
        return {
          hooks: parsed.hooks || [],
          ctas: parsed.ctas || []
        };
      } catch (parseError) {
        // If JSON parsing fails, fall back to a structured response
        console.warn('Failed to parse OpenAI response as JSON, using fallback');
        return this.generateFallbackContent(topic);
      }
    } catch (error) {
      console.error('OpenAI API error:', error);
      // Return fallback content if OpenAI fails
      return this.generateFallbackContent(topic);
    }
  }

  private generateFallbackContent(topic: string): GeneratedContent {
    // Fallback content when OpenAI is unavailable
    const hooks = [
      `Discover the ${topic} secret that 95% of people don't know about`,
      `How I used ${topic} to increase my results by 300% in just 30 days`,
      `The ${topic} method that changed everything for me`,
      `Why traditional ${topic} approaches are failing you`,
      `The ${topic} breakthrough that experts don't want you to know`
    ];

    const ctas = [
      `Get your free ${topic} guide now`,
      `Start your ${topic} journey today`,
      `Unlock the power of ${topic} in minutes`,
      `Join thousands mastering ${topic}`,
      `Transform your ${topic} results instantly`
    ];

    return { hooks, ctas };
  }
}
