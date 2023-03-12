import { Component } from '@angular/core';
import { ChatgptService } from './services/chatgpt.service';
import { Conversation, Role, TransformedAnswer } from './services/Conversation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'KTChat';
  conversations: Conversation[] = [];

  constructor(private chatgptService: ChatgptService) {}

  getAnswer(message: string): void {
    this.conversations.push({
      role: Role.USER,
      content: message,
    });

    this.chatgptService.chatCompletion(this.conversations).subscribe((response) => {
      const answer = response.choices[0].message?.content!;
      console.log(response);
      this.conversations.push({
        role: Role.ASSISTANT,
        content: answer,
        transformedAnswer: this.transformChatAnswer(answer),
      });
    });
  }

  transformChatAnswer(answer: string): TransformedAnswer[] {
    const codeBlocks = answer.match(/```([\s\S]*?)```/g);
    return answer.split('```').map((content) => {
      const isCodeBlock = codeBlocks?.find((codeBlock) => codeBlock.includes(content));
      return isCodeBlock ? { type: 'code', content: content.replace(/^\n+/, '') } : { type: 'markdown', content };
    });
  }
}
