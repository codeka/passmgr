import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { ApiService } from "./api.service";

// A CanActivate that decides whether we can proceed to a normal URL, or whether we need to redirect
// to the setup or login pages.
@Injectable()
export class SetupCanActivateService implements CanActivate {
  constructor(@Inject(ApiService) private api: ApiService, @Inject(Router) private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.api.needSetup) {
      this.router.navigate(["setup"])
      return false
    } else if (this.api.needLogin) {
      this.router.navigate(["login"])
      return false
    }
    return true
  }
}
