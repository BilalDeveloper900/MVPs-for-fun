import { Request, Response } from 'express';
import { OpenAIService, GenerateContentRequest } from '../services/openai';

export class ContentController {
  private openaiService: OpenAIService;

  constructor() {
    this.openaiService = new OpenAIService();
  }

  async generateContent(req: Request, res: Response): Promise<void> {
    try {
      const { topic }: GenerateContentRequest = req.body;

      // Validate input
      if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
        res.status(400).json({
          error: 'Invalid input',
          message: 'Topic is required and must be a non-empty string'
        });
        return;
      }

      // Trim and validate topic length
      const trimmedTopic = topic.trim();
      if (trimmedTopic.length > 200) {
        res.status(400).json({
          error: 'Invalid input',
          message: 'Topic must be 200 characters or less'
        });
        return;
      }

      console.log(`Generating content for topic: "${trimmedTopic}"`);

      // Generate content using OpenAI
      const generatedContent = await this.openaiService.generateHooksAndCTAs(trimmedTopic);

      // Log successful generation
      console.log(`Successfully generated ${generatedContent.hooks.length} hooks and ${generatedContent.ctas.length} CTAs`);

      res.status(200).json({
        success: true,
        data: generatedContent,
        topic: trimmedTopic,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error in generateContent:', error);

      // Handle specific OpenAI errors
      if (error instanceof Error && error.message.includes('OPENAI_API_KEY')) {
        res.status(500).json({
          error: 'Configuration error',
          message: 'OpenAI API key not configured. Please check your environment variables.'
        });
        return;
      }

      // Handle other errors
      res.status(500).json({
        error: 'Internal server error',
        message: 'Failed to generate content. Please try again later.'
      });
    }
  }
}
