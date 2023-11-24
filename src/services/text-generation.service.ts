import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class TextGenerationService {
  private apiUrl = 'http://127.0.0.1:1234';
  private eventSource: EventSource | null = null;
  private messageSubject = new Subject<any>();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  getCompletions(prompt: string) {
    return this.http.post(`${this.apiUrl}/v1/completions`, {
      prompt: prompt,
      max_tokens: 200,
      temperature: 1,
      top_p: 0.9,
      seed: 10,
    });
  }

  setupSseConnection(): Observable<any> {
    return new Observable(observer => {
      this.eventSource = new EventSource(`${this.apiUrl}/v1/chat/completions`);

      this.eventSource.onmessage = event => {
        observer.next(event.data);
      };

      this.eventSource.onerror = error => {
        observer.error(error);
      };

      return () => {
        this?.eventSource?.close();
      };
    });
  }

  getChatCompletions(message: string) {
    return this.http.post(`${this.apiUrl}/v1/chat/completions`, {
      messages: [{ role: 'user', content: message }],
      mode: 'instruct',
      instruction_template: 'Alpaca',
      stream: false,
    });
  }

  getMessages(): Observable<any> | null {
    if (isPlatformBrowser(this.platformId)) {
      return this.messageSubject.asObservable();
    } else {
      return null;
    }
  }
}
