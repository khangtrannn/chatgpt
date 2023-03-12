import { Component, ElementRef, ViewChild } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

import { ChatgptService } from './services/chatgpt.service';
import { Conversation, Role, TransformedAnswer } from './services/Conversation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  conversations: Conversation[] = [];
  @ViewChild('conversation', {static: false}) conversationRef: ElementRef<HTMLElement> | undefined;

  lastQuestionId = '';

  constructor(private chatgptService: ChatgptService) {}

  getAnswer(message: string): void {
    const conversationId = uuidv4();
    this.lastQuestionId = conversationId;

    this.conversations.push({
      id: conversationId,
      role: Role.USER,
      content: message,
    });

    this.adjustViewToLastQuestion();

    this.chatgptService.chatCompletion(this.conversations).subscribe((response) => {
      const answer = response.choices[0].message?.content!;
      this.conversations.push({
        id: response.id,
        role: Role.ASSISTANT,
        content: answer,
        transformedAnswer: this.transformChatAnswer(answer),
      });

      this.adjustViewToLastQuestion();
    });
  }

  private adjustViewToLastQuestion(): void {
    setTimeout(() => {
      document.getElementById(this.lastQuestionId)!.scrollIntoView({ behavior: 'smooth' });
    });
  }

  private transformChatAnswer(answer: string): TransformedAnswer[] {
    const codeBlocks = answer.match(/```([\s\S]*?)```/g);
    return answer.split('```').map((content) => {
      const isCodeBlock = codeBlocks?.find((codeBlock) => codeBlock.includes(content));
      return isCodeBlock ? { type: 'code', content: content.split('\\n', 1)[0].replace(/^\n+/, '') } : { type: 'markdown', content };
    });
  }
}
