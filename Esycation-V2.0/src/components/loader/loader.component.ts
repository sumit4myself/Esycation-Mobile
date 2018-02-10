import { Component, Input } from "@angular/core";
import { Observable } from "rxjs/Rx";

@Component({
  selector: "observable-loader",
  templateUrl: "../loader/loader.html"
})
export class LoaderComponent {
  public showLoader: boolean = false;

  constructor() {}

  @Input()
  set observable(observable: Observable<any>) {
    if (observable) {
      this.showLoader = true;
      observable.subscribe(data => {
        if(data==null){
          this.showLoader = false;
        }
        setTimeout(() => {
          this.showLoader = false;
        }, 500);
      },error=>{
        console.error("error==",error);
        this.showLoader = false;
      });
    }
  }
}
