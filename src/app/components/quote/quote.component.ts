import { QuoteService } from './../../services/quote.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent {
  quote$ = this.quoteService.getRandomQuote();
  constructor(private quoteService: QuoteService) { }
}
