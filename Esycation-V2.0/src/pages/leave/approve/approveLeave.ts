import { Component } from '@angular/core';
import { NavController,Events} from 'ionic-angular';

@Component({
  selector: 'leave-approve-page',
  templateUrl: 'approveLeave.html'
})
export class LeaveApproveComponent {

 constructor(
    private navCtrl: NavController,
    private events:Events,
    ) {}
 
}
