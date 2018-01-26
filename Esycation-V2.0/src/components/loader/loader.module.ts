import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { LoaderComponent } from "../loader/loader.component";


@NgModule({
  imports: [IonicPageModule.forChild(LoaderComponent)],
  exports: [LoaderComponent],
  declarations: [LoaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: []
})
export class LoaderModule {}
