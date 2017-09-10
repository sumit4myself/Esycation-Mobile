import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OrderBy } from './order-by.pipe';
import { SanitizePipe } from './sanitizer.pipe';
@NgModule({
    declarations: [
        OrderBy,
        SanitizePipe
    ],
    exports: [
        OrderBy,
        SanitizePipe
    ],
    imports: [BrowserModule],
    providers: []
})
export class CustomPipesModule { }