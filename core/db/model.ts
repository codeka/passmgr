
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

/**
 * Details of a site with *unencrypted* password. This is meant to be stored in memory only for
 * the short duration of time it's actually needed.
 */
export class UnencryptedInMemorySite extends SiteInfo {
  /** The *unencrypted* password, to log into this site. */
  password: string;
};
