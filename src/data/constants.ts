/**
 * The current version of the plugin.
 * This should match the version found in the manifest.json file
 */
export const CURRENT_PLUGIN_VERSION = "0.1.1";

/**
 * The name of the view that will be registered with Obsidian
 */
export const DASHBOARDS_VIEW = "dashboards";

/**
 * The default name for a new dashboard file
 */
export const DEFAULT_DASHBOARD_FILE_NAME = "Untitled";

/**
 * The file extension that will be used for dashboard files
 */
export const DASHBOARD_FILE_EXTENSION = "dashboard";

/**
 * The ID of the plugin
 * This should match the ID found in the manifest.json file
 */
export const DASHBOARD_PLUGIN_ID = "dashboards";

/**
 * Matches an extension with a leading period.
 * @example
 * .dashboard
 */
export const EXTENSION_REGEX = new RegExp(/\.[a-z]*$/);
