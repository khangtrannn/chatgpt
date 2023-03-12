import { Component, OnInit } from '@angular/core';
import { CreateChatCompletionResponse } from './../types/openai.d';
import { ChatgptService } from './services/chatgpt.service';
import { QuoteService } from './services/quote.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'KTChat';
  message = '';
  answer: CreateChatCompletionResponse | undefined;

  response = "\n\nHere's an example code for an Express server:\n\n```\nconst express = require('express');\nconst app = express();\nconst port = 3000;\n\napp.get('/', (req, res) => {\n res.send('Hello World!');\n});\n\napp.listen(port, () => {\n console.log(`Example app listening at http://localhost:${port}`);\n});\n```\n\nIn this example, we're creating an instance of the `express` module and assigning it to the `app` variable. We're also setting the server listening port to be `3000`.\n\nWe're defining a route for the root URL `'/'` using the `.get()` method of the `app` object. When a user accesses the root URL, the callback function will be executed, and the message `'Hello World!'` will be sent as the response.\n\nFinally, we call the `.listen()` method on the `app` object, passing in the `port` and a callback function that logs a message to the console once the server is up and running.\n\nWith this code, we've created a basic Express server that responds with a simple message when accessed at the root URL."

  transformedAnswer: { type: string; content: string }[] = [];

  quote$ = this.quoteService.getRandomQuote();

  constructor(private chatgptService: ChatgptService, private quoteService: QuoteService) {}

  ngOnInit(): void {
    this.transformChatAnswer();
  }

  getAnswer(): void {
    this.chatgptService.chatCompletion(this.message).subscribe((response) => {
      this.answer = response;
    })
  }

  transformChatAnswer(): { type: string; content: string }[] {
    const codeBlocks = this.response.match(/```([\s\S]*?)```/g);
    this.transformedAnswer = this.response.split('```').map((content) => {
      const isCodeBlock = codeBlocks?.find((codeBlock) => codeBlock.includes(content));
      return isCodeBlock ? { type: 'code', content: content.replace(/^\n+/, '') } : { type: 'markdown', content };
    })
    return this.transformedAnswer;
  }
}
