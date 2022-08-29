import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ContactService {

  private url: string = 'https://mailthis.to/benito@zefferino.ca';

  constructor(
    private http: HttpClient
  ) { }

  emailMessage(input: any) {
    return this.http.post(this.url, input, { responseType: 'text' }).pipe(
      map(
        (response: string) => {
          return response;
        },
        (error: any) => {
          return error;
        }
      )
    )
  }

}
