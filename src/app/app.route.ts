import { Routes }   from '@angular/router';

import { AppComponent } from './app.component';
import { ArticleListComponent } from './article-list/article-list.component';

export const routes: Routes = [
  { path: 'articles/:sourceKey', component: ArticleListComponent },
  { path: '',   redirectTo: 'articles/bbc-news', pathMatch: 'full' }
];