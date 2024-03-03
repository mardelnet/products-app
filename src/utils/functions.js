/**
 * Checks if a string is a valid URL.
 * @param {string} str - The string to check.
 * @returns {boolean} True if the string is a valid URL, false otherwise.
 */
export function isURL(str) {
  // Regular expression for URL pattern
  var urlPattern = new RegExp('^(https?:\\/\\/)?' + // Protocol (optional)
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // Domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Port and path (optional)
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // Query string (optional)
    '(\\#[-a-z\\d_]*)?$', 'i'); // Fragment locator (optional)

  // Test if the string matches the URL pattern
  return urlPattern.test(str);
}
