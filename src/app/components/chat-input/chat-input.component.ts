import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent {
  @Output() onEnter = new EventEmitter<string>();
  message = '';

  onEnterHandle(): void {
    this.onEnter.emit(this.message);
    this.message = '';
  }
}
