import { Inject, Injectable } from "@angular/core";
import { UserPrefernce } from "../../model/common/UserPrefernce";
import { AuthService } from "../core/auth.service";

@Injectable()
export class UserSessionService {
  protected userPrefernce: UserPrefernce;
  protected notificationCount: number = 0;

  constructor(@Inject(AuthService) protected authService: AuthService) {
    this.userPrefernce = authService.findCurrentUserDetails();
  }

  public switchAccount(userId: number): void {
    this.authService.switchAccount(userId);
  }

  public findUserDetails(): UserPrefernce {
    return this.userPrefernce;
  }

  public findUserId(): number {
    return this.userPrefernce.userId;
  }

  public findModule(): string {
    return this.userPrefernce.module;
  }

  public findRemote(): number {
    return this.userPrefernce.remoteId;
  }

  public findLevel(): string {
    return this.userPrefernce.level;
  }

  public findBranchId(): number {
    return this.userPrefernce.branchId;
  }

  public findUsers(): Array<any> {
    return this.userPrefernce.loginUsers;
  }

  public static findDashBoardByModule(module: string): string {
    if (module == "STAFF") return "StaffDashboardComponent";
    else if (module == "GUARDIAN") {
      return "GuardianDashboardComponent";
    } else if (module == "STUDENT") {
      return "StudentDashboardComponent";
    } else {
      return "HomeComponent";
    }
  }

  public setNotificationCount(count: number) {
    this.notificationCount = count;
  }
  public findNotificationCount(): number {
    return this.notificationCount;
  }
}
