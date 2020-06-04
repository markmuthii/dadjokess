import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JokesService {
  constructor(private http: HttpService) {}

  getRandomJoke() {
    return this.http.get();
  }

  getAllJokes() {
    return this.http.get('search');
  }

  getJokesByTerm(searchTerm: string) {
    return this.http.get(`search?term=${searchTerm}`);
  }
}
