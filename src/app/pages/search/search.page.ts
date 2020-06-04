import { ToastService } from './../../services/toast.service';
import { JokesService } from './../../services/jokes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage implements OnInit {
  isSearching = false;
  jokes = [];
  searchTerm = '';
  errorExists = false;

  constructor(
    private jokeService: JokesService,
    private toastService: ToastService
  ) {}

  ngOnInit() {}

  searchForJokes() {
    this.searchTerm = this.searchTerm.trim();
    console.log('Searching...');

    this.jokes = [];

    console.log(this.searchTerm.trim().length);

    if (this.searchTerm.trim().length > 0) {
      this.errorExists = false;
      this.isSearching = true;
      this.jokeService.getJokesByTerm(this.searchTerm).subscribe(
        (res: any) => {
          if (res.results.length > 0) {
            this.jokes = res.results;
          }
          this.isSearching = false;
        },
        (err: any) => {
          let message =
            'Something went wrong while fetching the jokes. Please try again later.';

          console.log('Error: ', err);
          if (err.status === 0) {
            message =
              'Error connecting to the server. Please check your connection and try again.';
          }

          this.errorExists = true;
          this.isSearching = false;
          this.toastService.showToast(message, 3000);
        }
      );
    }
  }
}
