/* eslint no-param-reassign: ["error", { "props": false }] */
/* global chrome */

//
// This is the content javascript that is injected in every browser page.
//
// We use real javascript here, rather than transpiled-typescript just to ensure we keep the size of
// the injected code to a minimum and also to ensure there's as few dependencies as possible that
// gets injected.
//

const ENABLE_LOG = true;

/** Simple wrapper around console.log so we can easily enable/disable all logging. */
function log() {
  if (!ENABLE_LOG) {
    return;
  }

  let msg = '';
  for (let i = 0; i < arguments.length; i += 1) {
    msg += arguments[i];
  }

  // eslint-disable-next-line no-console
  console.log(`[passmgr] + ${msg}`);
}

/**
 * Queries the background script for credentials from the given DOM node.
 *
 * @param {*DOMNode} formNode The <form> DOM node that we need to query.
 */
function queryForCredentials(formNode) {
  if (formNode.dataset.codekaPassmgrChecked) {
    log('    this node has already been checked, not checking again.');
    return;
  }
  formNode.dataset.codekaPassmgrChecked = true;

  // gather all of the <input> fields so we can send them all across for matching
  const formFields = [];
  const inputNodeList = formNode.getElementsByTagName('input');
  for (let i = 0; i < inputNodeList.length; i += 1) {
    const inputNode = inputNodeList[i];
    formFields.push({
      fieldId: inputNode.getAttribute('id'),
      fieldName: inputNode.getAttribute('name'),
      fieldType: inputNode.getAttribute('type'),
    });
  }

  const msg = {
    id: 'checkForLoginForm',
    formFields
  };
  log('    sending: ', JSON.stringify(msg));
  // TODO: if browser.runtime is specified, use that instead (i.e. on firefox)
  chrome.runtime.sendMessage(msg, (resp) => {
    if (!resp) {
      log('    got empy response, assuming no fields to populate.');
      return;
    }
    for (let i = 0; i < resp.formFields.length; i += 1) {
      const formField = resp.formFields[i];
      let input = null;
      if (formField.fieldId) {
        input = document.getElementById(formField.fieldId);
      } else if (formField.fieldName) {
        input = formNode.querySelector(`input[name=${formField.fieldName}]`);
      } else if (formField.fieldType) {
        // This probably isn't the best there could be lots of fields of this type...
        input = formNode.querySelector(`input[type=${formField.fieldType}]`);
      }
      if (input != null) {
        input.value = formField.fieldValue;
      }
    }
  });
}

/**
  * This is the main entry-point for the content script. We check the DOM for any <form> elements,
  * do a quick check to see if it 'looks like' a login form (i.e. if it has a type="password" field)
  * and then notify the main extension about it if it does.
  *
  * If the extension gives us the login credentials, then we'll auto-populate them.
  */
function checkForLoginForm() {
  log('checking for login forms...');
  const formNodeList = document.getElementsByTagName('form');
  if (formNodeList.length === 0) {
    log('  no <form> nodes found.');
    return;
  }

  log('  found ', formNodeList.length, ' <form> nodes');
  for (let i = 0; i < formNodeList.length; i += 1) {
    const formNode = formNodeList[i];
    const passwordNodeList = formNode.querySelector('input[type=password]');
    if (passwordNodeList == null) {
      log('  [', i, '] no <input type="password"> fields found.');
    } else {
      log('  [', i, '] found 1 or more <input type="password"> fields. checking for credentials.');
      queryForCredentials(formNode);
    }
  }
}

// Call now and also whenever the DOM is modified.
(() => {
  let queuedScanTimer = 0;

  /**
   * To keep DOM scans to a minimum, we queue up this function at most once every second.
   */
  function queueCheckForLoginForm() {
    if (queuedScanTimer !== 0) {
      // Already got one queued up.
      return;
    }

    queuedScanTimer = setTimeout(() => {
      queuedScanTimer = 0;
      checkForLoginForm();
    }, 1000);
  }

  queueCheckForLoginForm();
  checkForLoginForm();
  new MutationObserver(() => {
    queueCheckForLoginForm();
  }).observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
