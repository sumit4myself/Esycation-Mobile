import { Component } from '@angular/core';
import { NavController,Events} from 'ionic-angular';
@Component({
  selector: 'leave-page',
  templateUrl: 'leave.html'
})
export class LeaveComponent {

 constructor(
    private navCtrl: NavController,
    private events:Events) {}
 
}
