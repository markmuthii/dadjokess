import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: '',
        redirectTo: 'home/jokes',
        pathMatch: 'full'
      },
      {
        path: 'jokes',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../jokes/jokes.module').then(m => m.JokesPageModule)
          }
        ]
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../search/search.module').then(m => m.SearchPageModule)
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'home/jokes',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
