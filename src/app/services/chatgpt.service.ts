import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateChatCompletionResponse } from './../../types/openai.d';

const API_PATH = '/api/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {
  constructor(private http: HttpClient) {}

  chatCompletion(message: string): Observable<CreateChatCompletionResponse> {
    return this.http.post<CreateChatCompletionResponse>(API_PATH, { message });
  }
}
