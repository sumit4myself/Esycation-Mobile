import { Component } from '@angular/core';
import { IonicPage,NavController} from 'ionic-angular';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {UserSessionService} from '../../../providers/service/core/user.session.service';
import {BulkNotificationService} from '../../../providers/service/notification/bulk.notification.service';
import {CourceService} from '../../../providers/service/cource/cource.service'; 
import {BatchService} from '../../../providers/service/batch/batch.service';
import {StudentService} from '../../../providers/service/student/student.service';
import {DepartmentService} from '../../../providers/service/department/department.service';
import {StaffService} from '../../../providers/service/staff/staff.service';

import {Batch} from '../../../providers/model/batch/model.batch';
import {Cource} from '../../../providers/model/cources/model.cource';
import {Template} from '../../../providers/model/notification/template.model';
import {Student} from '../../../providers/model/student/model.student';
import {Department} from '../../../providers/model/department/model.department';
import {Staff} from '../../../providers/model/staff/model.staff';
import {BulkNotificationForm} from '../../../providers/model/notification/bulk.notification';
import {Notification} from '../../../providers/model/notification/notification.model';
import {Group} from '../../../providers/model/group/model.group';
import {BaseComponent} from '../../baseComponent/base.component';
import * as moment from 'moment';

import {CommonServices} from '../../../providers/service/common/common.service';

@IonicPage()
@Component({
  selector: 'bulk-notification-page',
  templateUrl: 'bulkNotification.html'
})
export class BulkNotificationComponent extends BaseComponent {
    
    bulkNotificationForm: FormGroup;
    batchs:Array<Batch>=new Array<Batch>();
    cources:Array<Cource>=new Array<Cource>();
    templates:Array<Template>=new Array<Template>();
    students:Array<Student>=new Array<Student>();
    departments:Array<Department>=new Array<Department>();
    staffs:Array<Staff>=new Array<Staff>();
    groups:Array<Group> = new Array<Group>();
    comMode:any;
    mode:string=null;
    selectOptionStyle : any={};  

     constructor(private session:UserSessionService,
                 private formBuilder:FormBuilder,
                 private bulkNotificationService:BulkNotificationService,
                 private courceService:CourceService,
                 private batchService:BatchService,
                 private studentService:StudentService,
                 private departmentService:DepartmentService, 
                 private staffService:StaffService,
                 protected navControl:NavController,
                 private commonServices:CommonServices    ) {

            super(session,navControl)
           // console.log(this.session);
         
           this.selectOptionStyle = {
            mode :'ios',
            cssClass: 'remove-ok'
          }        
        this.buildForm();  
    }

    
    buildForm(){
        
        let currentTime = moment(new Date()).format("HH:mm");
        let currentDate = moment(new Date()).format("DD/MM/YYYY");
        
        
        this.bulkNotificationForm = this.formBuilder.group({
        receiverType: ['', [<any>Validators.required]],
        mode: ['', [<any>Validators.required]],
        date:[currentDate, [<any>Validators.required]],
        time:[currentTime, [<any>Validators.required]],
        templateId:'',
        groups:'',
        courses:'',
        batches:'',
        guardians:'',
        students:'',
        departments:'',
        staffs:'',
        subject:'',
        htmlContent:'',
        content:'',
        });
        
    }

    onCommunication(mode:string){
        this.mode=mode;
        this.commonServices.onLoader();
       this.bulkNotificationService.findTemplateByMode(mode).subscribe(data=>{
           
            for(let template of data.contents){
                let obj = Object.assign({},template);
                this.templates.push(obj);
            }     
            this.commonServices.onDismissAll();
       },error=>{
            console.error(error);
            this.commonServices.onDismissAll();
       });     
    }

    onReceiverType(receiverType:string){
        
        this.comMode=receiverType;
        if(receiverType=='STAFF'){
            this.onDepartment(this.session.findBranchId());
        }
        else if (receiverType=='STUDENT'){
            this.findAllCources();
        }
        else if(receiverType=='GROUP'){
            this.onGroup();
        }
        console.log("receiverType==",receiverType);
    }

    findAllCources(){

        this.commonServices.onLoader();
        this.cources=[];
        this.courceService.findAllcourses("Course.NameId").subscribe(data=>{
           for(let cource of data.contents){
                let obj = Object.assign({},cource);
                this.cources.push(obj);
           }
           this.commonServices.onDismissAll();
        },error=>{
            console.error(error);
            this.commonServices.onDismissAll();
        });
    }

    findBatchByCourseIds(id:number){
       
        this.commonServices.onLoader();
        this.batchService.findBatchByCourseIds(id,"Batch.NameId").subscribe(data=>{
            for(let batch of data.contents){
                let obj = Object.assign({},batch);
                this.batchs.push(obj);
            }
            this.commonServices.onDismissAll();
        },error=>{
            console.error(error);
            this.commonServices.onDismissAll();
       });
    }
    findStudentByBatchId(batchId:number){

        this.commonServices.onLoader();
        this.studentService.findByBatchIds(batchId,"Student.MinDetails").subscribe(data=>{
            for(let student of data.contents){
                let obj = Object.assign({},student);
                this.students.push(obj);
            }
            this.commonServices.onDismissAll();
        },error=>{
            console.error(error);
            this.commonServices.onDismissAll();
       });
    }

    onDepartment(branchId:number){

        this.commonServices.onLoader();
        this.departments=[];
        this.departmentService.findByBranchIds(branchId,"Department.NameId").subscribe(
            data=>{
            for(let department of data.contents){
                let obj = Object.assign({},department);
                this.departments.push(obj);
            } 
            this.commonServices.onDismissAll();
        },error=>{
            console.error(error);
            this.commonServices.onDismissAll();
       });
    }

    onStaff(departmentId:number){

        this.commonServices.onLoader();
        this.staffs=[];
        this.staffService.findByDepartmentIds(departmentId,"Staff.MinDetails").subscribe(
            data=>{
                for(let staff of data.contents){
                   let obj = Object.assign({},staff);
                   this.staffs.push(obj); 
                }
                this.commonServices.onDismissAll();
            },error=>{
                console.error(error);
                this.commonServices.onDismissAll();
           });
    }

    onSave({value,valid}:{value:BulkNotificationForm,valid:boolean}){

        this.commonServices.onLoader("saving..");
        let data = this.prepareData(value);
        console.log(JSON.stringify(data));
        if(valid){
           
            this.bulkNotificationService.saveBulkNotification(data).subscribe(data=>{
                console.log("data==",data);
                this.commonServices.onDismissAll();
                this.commonServices.presentToast("Data saved successfully",null,"success");
                this.navControl.push("ViewAllBulkNotificationComponent");
            },error=>{
                this.commonServices.onDismissAll();
                console.error("ERROR :",error);
            });
            
        }else{
            this.commonServices.onDismissAll();
        }
    }

    onGroup(){

        this.commonServices.onLoader();
        this.groups=[];
        this.bulkNotificationService.findGroup(this.session.findUserId(),"Group.Details").subscribe(
            data=>{
             for(let group of data.contents) {
                 let obj = Object.assign({},group);
                 this.groups.push(obj);
             }
             this.commonServices.onDismissAll();
        },error=>{
            console.error(error);
            this.commonServices.onDismissAll();
       });
    }


    private prepareData(form:BulkNotificationForm):Notification{

        let notification = new Notification();
        let template = new Template();
        template.id=form.templateId;
        //template.content = form.content;
        template.mode = form.mode;
        template.subject = form.subject;
        if(form.mode=='SMS'){
            template.content=form.content;
        }else{
            template.htmlContent = form.content;
        }
        form.staffs=form.staffs.toString();
        form.courses=form.courses.toString();
        form.batches=form.batches.toString();
        form.students=form.students.toString();
        form.departments=form.departments.toString();
        form.groups=form.groups.toString();
        notification.selections = this.selectionValue(form);
        notification.pushTime=  moment(form.date +" " + form.time + ":00").format("DD/MM/YYYY HH:mm:ss");
        notification.bulk=true;
        notification.approved=true;
        notification.receivers=null;
        notification.template=template;

        
        return notification;

    }
    
    selectionValue(form):any{

        let data ={
            groups:form.groups ,
            receiverType:form.receiverType,
            courses:form.courses,
            batches:form.batches,
            guardians:form.guardians,
            students:form.students,
            departments:form.departments,
            staffs:form.staffs
        }
       return data;
    }

}
