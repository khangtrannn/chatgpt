import { Component, Input } from '@angular/core';
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
}
