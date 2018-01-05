import { Store } from "core/db/store";
import { FormField, SiteInfo, UnencryptedInMemorySite } from "core/db/model";

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
  if (sender.tab && request.id == "checkForLoginForm") {
    return checkForLoginForm(sender, request);
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
          if (sender.tab.url.indexOf(site.url)) {
            console.log("site '" + sender.tab.url + "' matches site '" + site.name + "'");
            return populateFormFields(sender, request, site);
          }
        }
      });
}

function populateFormFields(
    sender: browser.runtime.MessageSender,
    request: CheckForLoginFormRequest,
    site: SiteInfo): Promise<CheckForLoginFormResponse> {
  // TODO: decript fields
  const unencryptedSite = site as UnencryptedInMemorySite;

  const resp = new CheckForLoginFormResponse();
  for (const respFormField of request.formFields) {
    for (const formField of unencryptedSite.formFields) {
      if (formField.fieldId === respFormField.fieldId ||
          formField.fieldName === respFormField.fieldName ||
          formField.fieldType === respFormField.fieldType) {
        respFormField.fieldValue = formField.fieldValue;
        resp.formFields.push(respFormField);
      }
    }
  }
  return Promise.resolve(resp);
}

export class Background {
  static init(): void {
    browser.runtime.onMessage.addListener(onMessage);
  }
}