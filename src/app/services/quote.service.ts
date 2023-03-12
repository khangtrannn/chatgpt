import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  constructor(private http: HttpClient) {}

  getRandomQuote(): Observable<{ text: string; author: string }> {
    return this.http
      .get<{ text: string; author: string }[]>('https://type.fit/api/quotes')
      .pipe(map((data) => data[Math.floor(Math.random() * data.length)]));
  }
}
