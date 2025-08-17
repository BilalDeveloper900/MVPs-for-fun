const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface GenerateContentRequest {
  topic: string;
}

export interface GeneratedContent {
  hooks: string[];
  ctas: string[];
}

export interface GenerateContentResponse {
  success: boolean;
  data: GeneratedContent;
  topic: string;
  timestamp: string;
}

export interface ApiError {
  error: string;
  message: string;
}

export class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async generateContent(topic: string): Promise<GeneratedContent> {
    try {
      const response = await fetch(`${this.baseUrl}/api/generateContent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.message || 'Failed to generate content');
      }

      const data: GenerateContentResponse = await response.json();
      return data.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

export const apiService = new ApiService();
