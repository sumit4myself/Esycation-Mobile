/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import {RoleModel} from '../../models/baseModel/role.model';
import {HomeComponent} from '../../../pages/default/home/home.componet';
import {AttendanceComponent} from '../../../pages/attendances/attendance/attendance.componet';
import {LoginComponent} from '../../../pages/user/login/login.component';
import {LogoutComponent} from '../../../pages/user/logout/logout.component';
import {AccountListComponent} from '../../../pages/user/addaccount/accountlist.component';
import {ViewAllNotificationComponent} from '../../../pages/notification/view-all/view-all-notification.component';
import {SettingComponent} from '../../../pages/setting/setting.component';
import {ProfileComponent} from '../../../pages/profile/profile.component';
import {ManageAttendanceComponent} from '../../../pages/attendances/manage-attendance/manage.attendance.componet';
import {LeaveComponent} from '../../../pages/leave/apply/leave.component';


@Injectable()
export class RoleService  {

  
  profile:RoleModel = new RoleModel('Profile',ProfileComponent,'assets/img/default.png',true,false);
  home:RoleModel = new RoleModel('Home',HomeComponent,'ios-home-outline',false,false);
  addAcount:RoleModel = new RoleModel('Add Acount',AccountListComponent,'people-outline',false,false);
  attendance:RoleModel = new RoleModel('Attendance',ManageAttendanceComponent,'clipboard-outline',false,false);
  notification:RoleModel = new RoleModel('Notification',ViewAllNotificationComponent,'chatboxes-outline',false,false);
  leave:RoleModel = new RoleModel('Leave',LeaveComponent,'calendar',false,false);
  settings:RoleModel = new RoleModel('Settings',SettingComponent,'settings-outline',false,false);
  logout:RoleModel = new RoleModel('Logout',LogoutComponent,'ios-log-in-outline',false,false);

  constructor() {}
  
  findRole(module:string):Array<any>{
    
    if(module=='STAFF')
      return this.staff();
    else if(module=='PARENT'){
      return this.Parent();
    }
    else if(module=='BRANCH'){
      return this.branchAdmin();
    }
    else if(module='STUDENT'){
      return this.student();
    }
  }

private staff():Array<any>{


  let roles = new Array<RoleModel>();

  roles.push(this.profile);
  roles.push(this.home);
  roles.push(this.addAcount);
  roles.push(this.attendance);
  roles.push(this.notification);
  roles.push(this.leave);
  roles.push(this.settings);
  roles.push(this.logout);
  
  return roles;
 
}

private Parent():Array<any>{
  
  
  let roles = new Array<RoleModel>();
  
  roles.push(this.profile);
  roles.push(this.home);
  roles.push(this.addAcount);
  roles.push(this.attendance);
  roles.push(this.notification);
  roles.push(this.leave);
  roles.push(this.settings);
  roles.push(this.logout);
    
     return roles;
   
  }

  private branchAdmin():Array<any>{
    
    
      let roles = new Array<RoleModel>();
      
      roles.push(this.profile);
      roles.push(this.home);
      roles.push(this.addAcount);
      roles.push(this.attendance);
      roles.push(this.notification);
      roles.push(this.leave);
      roles.push(this.settings);
      roles.push(this.logout);

       return roles;
     
    }

    private student():Array<any>{

      let roles = new Array<RoleModel>();

      roles.push(this.profile);
      roles.push(this.home);
      roles.push(this.addAcount);
      roles.push(this.attendance);
      roles.push(this.notification);
      roles.push(this.leave);
      roles.push(this.settings);
      roles.push(this.logout);

      return roles;
    }

}
