import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { IonicModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';
import { NewsComponent } from './news.component';
import { NewsAddModal } from './news-add/news-add.component';
import { NewsDetailComponent, NewsDetailOptionsPopover } from './news-detail/news-detail.component';
import { NewsClassicComponent } from './news-classic/news-classic.component';
import { NewsCommentsComponent } from './news-comments/news-comments.component';
import { NewsLikesComponent } from './news-likes/news-likes.component';
import { NewsShowcaseComponent,  } from './news-showcase/news-showcase.component';
import { NewsCardComponent } from './news-card/news-card.component';
import { NewsSquareComponent } from './news-square/news-square.component';
import { CustomPipesModule } from '../../shared/pipes/custom-pipes.module';
import { CustomDirectivesModule } from '../../shared/directives/custom-directives.module';

@NgModule({
    imports: [
        IonicModule, 
        MomentModule, 
        ReactiveFormsModule,
        CustomPipesModule,
        CustomDirectivesModule
        ],
    entryComponents: [
        NewsComponent,
        NewsAddModal,
        NewsDetailComponent,
        NewsDetailOptionsPopover,
        NewsClassicComponent,
        NewsCommentsComponent,
        NewsLikesComponent,
        NewsShowcaseComponent,
        NewsCardComponent,
        NewsSquareComponent
    ],
    declarations: [
        NewsComponent,
        NewsAddModal,
        NewsDetailComponent,
        NewsDetailOptionsPopover,
        NewsClassicComponent,
        NewsCommentsComponent,
        NewsLikesComponent,
        NewsShowcaseComponent,
        NewsCardComponent,
        NewsSquareComponent
    ],
    providers: [],
})
export class NewsModule { }
