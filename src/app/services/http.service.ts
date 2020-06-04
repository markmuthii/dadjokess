import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url: string;
  options: any;

  constructor(private http: HttpClient) {
    this.url = environment.API_URL;
  }

  post() {}

  get(path = '') {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'User-Agent': 'Dad Jokerr (hey@mark.software)'
      })
    };

    console.log('Get Path: ' + this.url + path);

    return this.http.get(this.url + path, options);
  }
}
