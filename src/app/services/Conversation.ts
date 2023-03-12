export enum Role {
  USER = 'user', ASSISTANT = 'assistant'
}

export interface Content {
  type: string;
  content: string;
}

export interface TransformedAnswer {
  type: string;
  content: string;
}

export interface Conversation {
  id: string;
  role: Role;
  content: string;
  transformedAnswer?: TransformedAnswer[];
}
