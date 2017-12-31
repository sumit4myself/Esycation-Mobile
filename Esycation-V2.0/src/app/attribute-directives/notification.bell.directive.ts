import { Directive, ElementRef } from '@angular/core';
import { NotificationService } from '../../providers/service/notification/notification.service';
import { Events } from 'ionic-angular';

@Directive({ 
     selector: '[notification-bell]' 
})
export class NotificationCountDirective {
    count : Number = 0;
    constructor(private elRef: ElementRef,
    private notificationService :NotificationService,
    private events :Events
    ) {

        console.log("NotificationCountDirective",elRef);
        this.elRef.nativeElement.innerHTML ='<h1>Hello World</h1>';
        this.events.subscribe("notification:count:update", (data)=>{
            this.notificationService.countAllByRemoteIdAndModule(data.module,data.remoteId).subscribe(response =>{
                this.count = response;
            })
        })
    }

    ngOnInit(){
        this.elRef.nativeElement.innerHTML ='<h1>Hello World</h1>';
        console.log("NotificationCountDirective",this.elRef);
        
    }
    	
} 