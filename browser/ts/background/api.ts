// api.ts is a helpful wrapper around the background page that implements the logic for sending
// messages and waiting for responses. It also includes the definitions for the request/response
// objects that can be shared.

export class InitResponse {
  // If true, the database has been created before, and you just need to unlock it.
  isCreated: boolean;
}

export class DeriveMasterKeyRequest {
  masterPassword: string;
  validForSeconds: number;
}

export class Background {

  public static init(): Promise<InitResponse> {
    return this.sendMessage("init", {});
  }

  public static deriveMasterKey(
    masterPassword: string, validForSeconds: number): Promise<CryptoKey> {
    return this.sendMessage("deriveMasterKey", {
      masterPassword, validForSeconds
    });
  }

  private static sendMessage(id: string, request: any): Promise<any> {
    request.id = id;
    console.log("sendMessage(" + id + ")");
    return new Promise<any>((resolve, reject) => {
      chrome.runtime.sendMessage(request, (resp) => {
        console.log("got message: " + resp);
        if (!resp) {
          reject(chrome.runtime.lastError);
        } else if (resp.error != null) {
          reject(resp.error);
        } else {
          resolve(resp);
        }
      });
    });
  }
}
