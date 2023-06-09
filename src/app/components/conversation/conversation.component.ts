import { Component, Input } from '@angular/core';
import { ChatgptService } from 'src/app/services/chatgpt.service';
import { Conversation } from 'src/app/services/Conversation';
import { Role } from './../../services/Conversation';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent {
  Role = Role;
  @Input() conversations: Conversation[] = [];

  isGettingAnswer$ = this.chatgptService.isGettingAnswer();

  constructor(private chatgptService: ChatgptService) {}

  trackByConversation(index: number, conversation: Conversation): string {
    return conversation.id;
  }
}
