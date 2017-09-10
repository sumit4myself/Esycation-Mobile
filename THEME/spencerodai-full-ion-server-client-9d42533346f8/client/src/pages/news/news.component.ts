import { Component } from '@angular/core';
import { NewsClassicComponent } from './news-classic/news-classic.component';
import { NewsShowcaseComponent } from './news-showcase/news-showcase.component';
import { NewsCardComponent } from './news-card/news-card.component';
import { NewsSquareComponent } from './news-square/news-square.component';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsComponent {

  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  tab4Root: any;

  constructor() {
    this.tab1Root = NewsClassicComponent;
    this.tab2Root = NewsShowcaseComponent;
    this.tab3Root = NewsCardComponent;
    this.tab4Root = NewsSquareComponent
  }
}
