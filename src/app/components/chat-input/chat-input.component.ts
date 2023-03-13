import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent {
  @Output() onEnter = new EventEmitter<string>();
  message = '';

  @ViewChild('messageRef') messageRef: ElementRef<HTMLTextAreaElement> | undefined;

  onEnterHandle(): void {
    this.onEnter.emit(this.message);
    this.message = '';
    setTimeout(() =>  this.resize());
  }

  resize(): void {
    this.messageRef!.nativeElement.style.height = 'auto';

    const height = this.messageRef!.nativeElement.scrollHeight - 8;
    this.messageRef!.nativeElement.style.height = height + 'px';
    this.messageRef!.nativeElement.style.overflow = height > 200 ? 'auto' : 'hidden';
  }

  onKeydownHandle(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      if (this.message.trim().length) {
        this.onEnterHandle();
      }
    }
  }
}
