export enum Role {
  USER, ASSISTANT
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
  role: Role;
  content: string;
  transformedAnswer?: TransformedAnswer[];
}
