import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserSessionService } from '../../../../providers/service/core/user.session.service';
import { BulkNotificationService } from '../../../../providers/service/notification/bulk.notification.service';
import { CourceService } from '../../../../providers/service/cource/cource.service';
import { BatchService } from '../../../../providers/service/batch/batch.service';
import { StudentService } from '../../../../providers/service/student/student.service';
import { DepartmentService } from '../../../../providers/service/department/department.service';
import { StaffService } from '../../../../providers/service/staff/staff.service';

import { Batch } from '../../../../providers/model/batch/model.batch';
import { Cource } from '../../../../providers/model/cources/model.cource';
import { Template } from '../../../../providers/model/notification/template.model';
import { Student } from '../../../../providers/model/student/model.student';
import { Department } from '../../../../providers/model/department/model.department';
import { Staff } from '../../../../providers/model/staff/model.staff';
import { BulkNotificationForm } from '../../../../providers/model/notification/bulk.notification';
import { Notification } from '../../../../providers/model/notification/notification.model';
import { Group } from '../../../../providers/model/group/model.group';
import { BaseComponent } from '../../../baseComponent/base.component';
import * as moment from 'moment';
import { BulkNotificationView } from '../../../../providers/model/notification/bulk.notification.view.model'
import { CommonServices } from '../../../../providers/service/common/common.service';

@IonicPage()
@Component({
    selector: 'edit-bulk-notification',
    templateUrl: 'editBulkNotification.html'
})
export class EditBulkNotificationComponent extends BaseComponent {

    bulkNotificationForm: FormGroup;
    batchs: Array<Batch> = new Array<Batch>();
    cources: Array<Cource> = new Array<Cource>();
    templates: Array<Template> = new Array<Template>();
    students: Array<Student> = new Array<Student>();
    departments: Array<Department> = new Array<Department>();
    staffs: Array<Staff> = new Array<Staff>();
    groups: Array<Group> = new Array<Group>();
    comMode: any;
    notification: BulkNotificationView = new BulkNotificationView();
    selectOptionStyle: any = {};
    mode: string = null;
    constructor(private session: UserSessionService,
        private formBuilder: FormBuilder,
        private bulkNotificationService: BulkNotificationService,
        private courceService: CourceService,
        private batchService: BatchService,
        private studentService: StudentService,
        private departmentService: DepartmentService,
        private staffService: StaffService,
        protected navControl: NavController,
        private navParams: NavParams,
        private commonServices: CommonServices) {

        super(session, navControl)
        console.log(this.session);
        this.selectOptionStyle = {
            mode: 'ios',
            cssClass: 'remove-ok'
        }

        this.buildForm();
    }

    ionViewDidLoad() {

        let id = this.navParams.get("id");
        this.bulkNotificationService.withSelections(id).subscribe(data => {
            this.bulkNotificationForm.setValue(this.prepareSelectionData(data));
        }, error => {
            console.error(error);
        })
    }


    buildForm() {

        let currentTime = moment(new Date()).format("HH:mm");
        let currentDate = moment(new Date()).format("DD/MM/YYYY");


        this.bulkNotificationForm = this.formBuilder.group({
            id: '',
            receiverType: ['', [<any>Validators.required]],
            mode: ['', [<any>Validators.required]],
            date: [currentDate, [<any>Validators.required]],
            time: [currentTime, [<any>Validators.required]],
            templateId: '',
            groups: '',
            courses: '',
            batches: '',
            guardians: '',
            students: '',
            departments: '',
            staffs: '',
            subject: '',
            htmlContent: '',
            content: '',
            type: ['INFORMATIVE', [<any>Validators.required]]
        });

    }

    onCommunication(mode: string) {

        this.commonServices.onLoader();
        this.bulkNotificationService.findTemplateByMode(mode).subscribe(data => {

            for (let template of data.contents) {
                let obj = Object.assign({}, template);
                this.templates.push(obj);
            }
            this.commonServices.onDismissAll();
        }, error => {
            console.error(error);
        });
    }

    onReceiverType(receiverType: string) {

        this.comMode = receiverType;
        if (receiverType == 'STAFF') {
            this.onDepartment(this.session.findBranchId());
        }
        else if (receiverType == 'STUDENT') {
            this.findAllCources();
        }
        else if (receiverType == 'GROUP') {
            this.onGroup();
        }
    }

    findAllCources() {

        this.commonServices.onLoader();
        this.cources = [];
        this.courceService.findAllcourses("Course.NameId").subscribe(data => {
            for (let cource of data.contents) {
                let obj = Object.assign({}, cource);
                this.cources.push(obj);
            }
            this.commonServices.onDismissAll();
        }, error => {
            console.error(error);
            this.commonServices.onDismissAll();
        });
    }

    findBatchByCourseIds(id: number) {

        this.commonServices.onLoader();
        this.batchService.findBatchByCourseIds(id, "Batch.NameId").subscribe(data => {
            for (let batch of data.contents) {
                let obj = Object.assign({}, batch);
                this.batchs.push(obj);
            }
            this.commonServices.onDismissAll();
        }, error => {
            console.error(error);
            this.commonServices.onDismissAll()
        });
    }
    findStudentByBatchId(batchId: number) {
        this.commonServices.onLoader();
        this.studentService.findByBatchIds(batchId, "Student.MinDetails").subscribe(data => {
            for (let student of data.contents) {
                let obj = Object.assign({}, student);
                this.students.push(obj);
            }
            this.commonServices.onDismissAll();
        }, error => {
            console.log(error);
            this.commonServices.onDismissAll();
        });
    }

    onDepartment(branchId: number) {

        this.commonServices.onLoader();
        this.departments = [];
        this.departmentService.findByBranchIds(branchId, "Department.NameId").subscribe(
            data => {
                for (let department of data.contents) {
                    let obj = Object.assign({}, department);
                    this.departments.push(obj);
                }
                this.commonServices.onDismissAll();
            }, error => {
                console.error(error);
                this.commonServices.onDismissAll();
            });
    }

    onStaff(departmentId: number) {

        this.commonServices.onLoader();
        this.staffs = [];
        this.staffService.findByDepartmentIds(departmentId, "Staff.MinDetails").subscribe(
            data => {
                for (let staff of data.contents) {
                    let obj = Object.assign({}, staff);
                    this.staffs.push(obj);
                }
                this.commonServices.onDismissAll();
            });
    }

    onGroup() {

        this.commonServices.onLoader();
        this.groups = [];
        this.bulkNotificationService.findGroup(this.session.findUserId(), "Group.Details").subscribe(
            data => {
                for (let group of data.contents) {
                    let obj = Object.assign({}, group);
                    this.groups.push(obj);
                }
                this.commonServices.onDismissAll();
            });
    }

    onUpdate({ value, valid }: { value: BulkNotificationForm, valid: boolean }) {

        let data = this.prepareData(value);
        console.log("data==", JSON.stringify(data));
        if (valid) {
            this.bulkNotificationService.updateBulkNotification(data).subscribe(d => {
                console.log(d);
                this.commonServices.presentToast("Data update successfully", null, "success");
                this.navControl.setRoot("ManageBulkNotificationComponent");
            }, error => {
                console.error("ERROR :", error);
            });
        } else {

        }

    }

    private prepareData(form: BulkNotificationForm): Notification {

        let notification = new Notification();
        let template = new Template();
        notification.id = form.id;
        template.id = form.templateId;
        template.mode = form.mode;
        template.subject = form.subject;
        if (form.mode == 'SMS') {
            template.content = form.content;
        } else {
            template.htmlContent = form.content;
        }
        form.staffs = form.staffs.toString();
        form.courses = form.courses.toString();
        form.batches = form.batches.toString();
        form.students = form.students.toString();
        form.departments = form.departments.toString();
        form.groups = form.groups.toString();
        notification.selections = this.selectionValue(form);
        notification.pushTime = moment(form.date + " " + form.time + ":00").format("DD/MM/YYYY HH:mm:ss");
        notification.bulk = true;
        notification.approved = true;
        notification.receivers = null;
        notification.template = template;
        notification.type = form.type;

        return notification;

    }

    selectionValue(form): any {

        let data = {
            groups: form.groups,
            receiverType: form.receiverType,
            courses: form.courses,
            batches: form.batches,
            guardians: form.guardians,
            students: form.students,
            departments: form.departments,
            staffs: form.staffs
        }
        return data;
    }

    prepareSelectionData(data: any): any {

        this.notification = Object.assign({}, data);
        this.mode = this.notification.template.mode;
        if (this.notification.selectionValues.departments) {
            for (let department of this.notification.selectionValues.departments) {
                let dp = Object.assign({}, department);
                this.departments.push(dp);
            }
        }
        if (this.notification.selectionValues.students) {
            for (let student of this.notification.selectionValues.students) {
                let stu = Object.assign({}, student);
                this.students.push(stu);
            }
            
        }
        if (this.notification.selectionValues.batches) {
            for (let batche of this.notification.selectionValues.batches) {
                let batch = Object.assign({}, batche);
                this.batchs.push(batch);
            }
        }
        if (this.notification.selectionValues.groups) {
            for (let group of this.notification.selectionValues.groups) {
                let gp = Object.assign({}, group);
                this.groups.push(gp);
            }
        }
        if (this.notification.selectionValues.staffs) {
            for (let staff of this.notification.selectionValues.staffs) {
                let stf = Object.assign({}, staff);
                this.staffs.push(stf);
            }
        }
        if (this.notification.selectionValues.courses) {
            for (let course of this.notification.selectionValues.courses) {
                let cours = Object.assign({}, course);
                this.cources.push(cours);
            }
        }

        let model = {
            id: this.notification.id,
            receiverType: this.notification.selections.receiverType,
            mode: this.notification.template.mode,
            date: moment(this.notification.pushTime, "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DD"),
            time: moment(this.notification.pushTime, "DD/MM/YYYY HH:mm:ss").format("HH:mm"),
            templateId: this.notification.template.id,
            groups: '',
            courses: '',
            batches: '',
            guardians: '',
            students: '',
            departments: '',
            staffs: '',
            subject: this.notification.template.subject,
            htmlContent: '',
            content: '',
            type: this.notification.type
        };
        if (this.notification.selections.groups) {
            model.groups = this.notification.selections.groups.split(",");
        }
        if (this.notification.selections.courses) {
            model.courses = this.notification.selections.courses.split(",");
        }
        if (this.notification.selections.batches) {
            model.batches = this.notification.selections.batches.split(",");
        }
        if (this.notification.selections.guardians) {
            model.guardians = this.notification.selections.guardians.split(",");
        }
        if (this.notification.selections.students) {
            model.students = this.notification.selections.students.split(",");
        }
        if (this.notification.selections.departments) {
            model.departments = this.notification.selections.departments.split(",");
        }
        if (this.notification.selections.staffs) {
            model.staffs = this.notification.selections.staffs.split(",");
        }
        if (this.notification.template.mode == 'SMS') {
            model.content = this.notification.template.content;
        } else {
            model.content = this.notification.template.htmlContent;
        }
        return model;
    }

}
