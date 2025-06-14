
/**
 * @typedef {Object} CallbacksTypes
 * @property {function({ record: any }): string} createValue 
 */

/**
 * @typedef {Object} ColumnTypes
 * @property {string} header
 * @property {string} field
 * @property {boolean} sortable // default true
 * @property {function({ record: any, value: any }): import("react").JSX.Element} component
 * @property {CallbacksTypes} callbacks
 */

/**
 * @typedef {Object} TableOptionTypes
 * @property {string} stringUrl
 */
