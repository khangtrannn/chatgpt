import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { CreateChatCompletionResponse } from './../../types/openai.d';
import { Conversation } from './Conversation';

const API_PATH = '/api/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {
  private conversations$ = new ReplaySubject<Conversation[]>(1);

  constructor(private http: HttpClient) {}

  chatCompletion(message: string): Observable<CreateChatCompletionResponse> {
    return this.http.post<CreateChatCompletionResponse>(API_PATH, { message });
  }

  getConversations(): Observable<Conversation[]> {
    return this.conversations$.asObservable();
  }
}
