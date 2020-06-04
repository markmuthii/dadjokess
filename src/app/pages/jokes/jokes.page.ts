import { ThemeService } from './../../services/theme.service';
import { ToastService } from './../../services/toast.service';
import { JokesService } from './../../services/jokes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.page.html',
  styleUrls: ['./jokes.page.scss']
})
export class JokesPage implements OnInit {
  jokes = [];
  categories: any;
  isSearching = true;
  isFav = false;
  errorExists = false;
  isDark = false;

  constructor(
    private jokeService: JokesService,
    private toastService: ToastService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.getAllJokes();

    document.querySelectorAll('.joke-cat').forEach(cat => {
      cat.addEventListener('click', this.searchByCategory.bind(this), false);
    });
  }

  getAllJokes() {
    this.isSearching = true;
    this.errorExists = false;
    this.jokeService.getAllJokes().subscribe(
      (res: any) => {
        this.jokes = res.results;
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

  showAboutInfo() {}

  searchByCategory(e: any) {
    // console.log('This is: ', this);
    this.errorExists = false;
    this.isSearching = true;
    const clickedCat = e.toElement;

    document.querySelectorAll('.joke-cat').forEach((cat: any) => {
      if (cat.classList.contains('active')) {
        cat.classList.remove('active');
      }
    });

    clickedCat.classList.add('active');

    if (clickedCat.id === 'all') {
      this.getAllJokes();
    } else if (clickedCat.id === 'fav') {
      this.isFav = true;
    } else {
      this.jokeService.getJokesByTerm(clickedCat.id).subscribe(
        (res: any) => {
          this.jokes = res.results;
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

  toogleTheme() {
    console.log('Theme toggle...');
    this.themeService.toggleTheme();
    this.isDark = !this.isDark;
  }
}
