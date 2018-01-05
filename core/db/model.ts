
/** Details of a site that we don't need to encrypt. */
export class SiteInfo {
  /** The unique ID of this site. Set to null to save a new site to the store. */
  id: number;

  /** The name of this site. */
  name: string;

  /** The URL used to match this site. */
  url: string;

  /** The username associated with the site. */
  username: string;

  /** A user-defined string for saving additional notes about the site. */
  notes?: string;
}

/** When filling in a login form, we actually fill in all the fields named in this structure. */
export class FormField {
  /**
   * The ID of this {@link FormField}.
   */
  fieldId?: string;

  /**
   * The name of the field this {@link FormField} corresponds to. If not specified, then
   * {@link #fieldType} is used to identify the field instead.
   */
  fieldName?: string;

  /**
   * The type="" attribute value of this field this {@link FormField} corresponds to. This is mostly
   * used to identify the "password" field type.
   */
  fieldType?: string;

  /**
   * The value to include in the form for this field.
   */
  fieldValue: string;
}

/**
 * Details of a site with *unencrypted* password. This is meant to be stored in memory only for
 * the short duration of time it's actually needed.
 */
export class UnencryptedInMemorySite extends SiteInfo {
  /**
   * The *unencrypted* form fields (including password!), to fill in, in order to log into this
   * site.
   */
  formFields: FormField[];
};
