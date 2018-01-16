import { Store } from "core/db/store";
import { FormField, SiteInfo, UnencryptedInMemorySite } from "core/db/model";
import { MasterPasswordManager } from "./master_password_manager";

import { MasterPasswordTimeResponse, DeriveMasterKeyRequest } from "./api";

const masterPasswordManager = new MasterPasswordManager();

/**
 * This is the main entry-point for the background script.
 */

/**
 * Main entry point for processing messages from the content script.
 */
function onMessage(
    request: any,
    sender: browser.runtime.MessageSender,
    sendResponse: (response: object) => void): Promise<any> {
  console.log("got message: " + JSON.stringify(request));
  if (sender.tab && request.id == "checkForLoginForm") {
    return checkForLoginForm(sender, request);
  } else if (request.id == "getMasterPasswordTime") {
    return getMasterPasswordTime(sender);
  } else if (request.id == "deriveMasterKey") {
    return deriveMasterKey(sender, request);
  } else {
    console.log("Unknown request: " + JSON.stringify(request));
  }
  return null;
}

/** The request from a 'checkForLoginForm' message. Must match the object defined in content.js. */
class CheckForLoginFormRequest {
  formFields: FormField[];
}

/** The response to a 'checkForLoginForm' message. Must match the object defined in content.js. */
class CheckForLoginFormResponse {
  formFields: FormField[];
}

function checkForLoginForm(
    sender: browser.runtime.MessageSender,
    request: CheckForLoginFormRequest): Promise<CheckForLoginFormResponse> {
  // TODO: this is a bit inefficient...
  const store = new Store();
  return store.listSites()
      .then((sites) => {
        for (const site of sites) {
          if (sender.tab.url.indexOf(site.url) >= 0) {
            console.log("site '" + sender.tab.url + "' matches site '" + site.name + "' (" + site.url + ")");
            return populateFormFields(sender, request, site);
          }
        }
      });
}

function getMasterPasswordTime(
  sender: browser.runtime.MessageSender) : Promise<MasterPasswordTimeResponse> {
  // TODO: implement this!
  return Promise.resolve({
      isCached: false,
      timeRemaining: 0
    });
}

function deriveMasterKey(
    sender: browser.runtime.MessageSender, request: DeriveMasterKeyRequest): Promise<CryptoKey> {
  console.log("deriving master key...");
  return masterPasswordManager.deriveKey(request.masterPassword, request.validForSeconds);
}


/**
 * Returns true if the given form on the actual pages matches the field we've saved for this site.
 */
function isFieldMatch(formField: FormField, siteField: FormField): boolean {
  console.log("    checking:\n      " + JSON.stringify(formField) + "\n      " + JSON.stringify(siteField));
  if (siteField.fieldId === formField.fieldId) {
    return true;
  }
  if (siteField.fieldName === formField.fieldName) {
    return true;
  }

  if (siteField.isUsername) {
    // Special handing of 'username' field.
    const USERNAME_FIELDS = ["login", "user", "username", "email", "id"];
    if (USERNAME_FIELDS.indexOf(formField.fieldName.toLowerCase()) >= 0) {
      return true;
    }
  }

  if (siteField.isPassword) {
    if (formField.fieldType === "password") {
      return true;
    }

    const PASSWORD_FIELDS = ["password", "pwd"];
    if (PASSWORD_FIELDS.indexOf(formField.fieldName.toLowerCase()) >= 0) {
      return true;
    }
  }

  return false;
}

function populateFormFields(
    sender: browser.runtime.MessageSender,
    request: CheckForLoginFormRequest,
    site: SiteInfo): Promise<CheckForLoginFormResponse> {
  // TODO: decrypt fields
  const unencryptedSite = site as UnencryptedInMemorySite;

  const resp: CheckForLoginFormResponse = {
    formFields: [],
  }
  console.log("    request fields: " + JSON.stringify(request.formFields));
  console.log("    site fields: " + JSON.stringify(unencryptedSite.formFields));
  for (const respFormField of request.formFields) {
    for (const formField of unencryptedSite.formFields) {
      if (isFieldMatch(respFormField, formField)) {
        respFormField.fieldValue = formField.fieldValue;
        resp.formFields.push(respFormField);
      }
    }
  }
  return Promise.resolve(resp);
}

export class Background {
  static init(): void {
    console.log("init");
    browser.runtime.onMessage.addListener(onMessage);
  }
}