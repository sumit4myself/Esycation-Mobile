import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { LoginComponent } from "../login/login";

import { AuthService } from "../../../providers/service/core/auth.service";
import { CostumErrorHandler } from "../../../providers/service/core/error.service";
import { BranchService } from "../../../providers/service/schools/branch/branch.service";
import { UserSessionService } from "../../../providers/service/core/user.session.service";
@NgModule({
  imports: [IonicPageModule.forChild(LoginComponent)],
  exports: [LoginComponent],
  declarations: [LoginComponent],
  providers: [
    AuthService,
    CostumErrorHandler,
    BranchService,
    UserSessionService
  ]
})
export class LoginModule {}
