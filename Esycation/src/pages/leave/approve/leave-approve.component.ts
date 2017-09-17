import { Component } from '@angular/core';
import { NavController,Events} from 'ionic-angular';

@Component({
  selector: 'leave-approve-page',
  templateUrl: 'leave-approve.html'
})
export class LeaveApproveComponent {

 constructor(
    private navCtrl: NavController,
    private events:Events,
    ) {}
 
}
