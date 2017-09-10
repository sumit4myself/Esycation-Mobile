import { NgModule } from '@angular/core';
import { ElasticTextareaDirective } from './elastic.directive';
import { KeyboardAttachDirective } from './keyboard-attach.directive';

@NgModule({
    declarations: [
        ElasticTextareaDirective,
        KeyboardAttachDirective
    ],
    exports: [
        ElasticTextareaDirective,
        KeyboardAttachDirective
    ],
    imports: [],
    providers: []
})
export class CustomDirectivesModule { }