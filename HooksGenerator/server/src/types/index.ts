export interface MVP {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'archived';
  technologies: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  service: string;
  version: string;
}

export interface HelloResponse {
  message: string;
  timestamp: string;
}

export interface MVPsResponse {
  mvps: MVP[];
}

export interface ErrorResponse {
  error: string;
  message?: string;
  path?: string;
}

// Content Generation Types
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

export interface GenerateContentErrorResponse {
  error: string;
  message: string;
}
