import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ViewStudentComponent } from "../viewStudent/viewStudent";
import { PushCounterModule } from "../../notifications/pushcounter/pushcounter.module";

import { BatchService } from "../../../providers/service/schools/batch/batch.service";
import { CourseService } from "../../../providers/service/schools/course/course.service";
import { StudentService } from "../../../providers/service/students/student/student.service";

@NgModule({
  imports: [IonicPageModule.forChild(ViewStudentComponent), PushCounterModule],
  exports: [ViewStudentComponent],
  declarations: [ViewStudentComponent],
  providers: [CourseService, BatchService, StudentService]
})
export class ViewStudentModule {}
