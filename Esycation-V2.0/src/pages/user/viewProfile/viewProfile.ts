import { Component } from "@angular/core";
import { IonicPage, Nav, NavController } from "ionic-angular";
import { UserSessionService } from "../../../providers/service/core/user.session.service";
import { ProfileService } from "../../../providers/service/profile/profile.service";
import { Profile } from "../../../providers/model/profile/model.profile";
import { BaseComponent } from "../../baseComponent/base.component";
import { CommonServices } from "../../../providers/service/common/common.service";
import { ServerConfig } from "../../../providers/config";
declare var Object: any;
@IonicPage()
@Component({
  selector: "page-viewProfile",
  templateUrl: "viewProfile.html"
})
export class ViewProfileComponent extends BaseComponent {
  profile: Profile = Profile.getInstance();
  imagePath: String;
  constructor(
    protected session: UserSessionService,
    protected navControl: NavController,
    private nav: Nav,
    private ProfileService: ProfileService,
    private commonServices: CommonServices
  ) {
    super(session, navControl);
    this.imagePath = ServerConfig.browseFilePath();
  }

  ionViewDidLoad() {
    this.commonServices.onLoader();
    this.ProfileService.findProfileDetails(
      this.session.findRemote(),
      this.session.findModule()
    ).subscribe(
      data => {
        this.commonServices.onDismissAll();
        this.profile = Object.assign(this.profile, data);
      },
      error => {
        console.log("Error: ", error);
        this.commonServices.onDismissAll();
      }
    );
  }

  onEdit() {
    this.nav.push("EditProfileComponent");
  }
}
