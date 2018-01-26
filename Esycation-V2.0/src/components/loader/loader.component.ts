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
        console.log(data);
        setTimeout(() => {
          this.showLoader = false;
        }, 500);
      });
    }
  }
}
