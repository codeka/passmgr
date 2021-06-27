import { Injectable } from "@angular/core";

import { Background, InitResponse } from "../../background/api";

// Service that provides the API we use to talk to the background page for fetching sites, etc.
@Injectable()
export class ApiService {

  // Called at app startup before we show any UI. We need to decide if you're already logged in,
  // need to set up and so on.
  init(): Promise<boolean> {
    console.log("ApiService.init()");
    return Background.init()
      .then((initResponse: InitResponse) => {
        console.log("init response: " + initResponse);
        if (!initResponse.isCreated) {
          
        }

        return true
      })
  }

  // Returns true if we haven't been set up yet. SetupCanActivate will use this to decide whether
  // to redirect you to the setup page.
  needSetup(): boolean {
    console.log("needSetup - true")
    return true;
  }

  // Returns true if we haven't logged in yet. SetupCanActivate will use this to decide whether to
  // redirect you to the login page.
  needLogin(): boolean {
    console.log("needSetup - false")
    return false
  }
}
