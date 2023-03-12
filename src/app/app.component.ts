import { Component } from '@angular/core';
import { CreateChatCompletionResponse } from './../types/openai.d';
import { ChatgptService } from './services/chatgpt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chatgpt';
  message = '';
  answer: CreateChatCompletionResponse | undefined;

  constructor(private chatgptService: ChatgptService) {}

  getAnswer(): void {
    this.chatgptService.chatCompletion(this.message).subscribe((response) => {
      this.answer = response;
    })
  }
}
