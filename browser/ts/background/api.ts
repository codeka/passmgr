// api.ts is a helpful wrapper around the background page that implements the logic for sending
// messages and waiting for responses. It also includes the definitions for the request/response
// objects that can be shared.

declare var chrome: any;

export class MasterPasswordTimeResponse {
  isCached: boolean;
  timeRemaining: number;
}

export class DeriveMasterKeyRequest {
  masterPassword: string;
  validForSeconds: number;
}

export class Background {

  public static getMasterPasswordTime(): Promise<MasterPasswordTimeResponse> {
    return this.sendMessage("getMasterPasswordTime", {});
  }

  public static deriveMasterKey(masterPassword: string, validForSeconds: number): Promise<CryptoKey> {
    return this.sendMessage("deriveMasterKey", {
      masterPassword, validForSeconds
    });
  }

  private static sendMessage(id: string, request: any): Promise<any> {
    request.id = id;
    return new Promise<any>((resolve, reject) => {
      chrome.runtime.sendMessage(request, (resp) => {
        if (!resp) {
          reject(browser.runtime.lastError);
        } else if (resp.error != null) {
          reject(resp.error);
        } else {
          resolve(resp);
        }
      });
    });
  }
}
