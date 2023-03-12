import { Conversation, Role } from './Conversation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, tap } from 'rxjs';

import { CreateChatCompletionResponse } from './../../types/openai.d';

const API_PATH = '/api/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {
  private isGettingAnswer$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  chatCompletion(conversations: Conversation[]): Observable<CreateChatCompletionResponse> {
    this.isGettingAnswer$.next(true);

    return this.http.post<CreateChatCompletionResponse>(API_PATH, { conversations: conversations.map(conversation => ({ role: conversation.role, content: conversation.content })) }).pipe(tap(() => {
      this.isGettingAnswer$.next(false);
    }));
  }

  isGettingAnswer(): Observable<boolean> {
    return this.isGettingAnswer$.asObservable();
  }
}
