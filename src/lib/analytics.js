
/**
 * Track page view events
 * @param {string} path - Current page path
 */
export function trackPageView(path) {
  console.debug('[Analytics] pageview', path);
  // In a real implementation, this would send data to an analytics service
}

/**
 * Track custom events
 * @param {string} name - Event name
 * @param {Object} data - Event data
 */
export function trackEvent(name, data) {
  console.debug('[Analytics] event', name, data);
  // In a real implementation, this would send data to an analytics service
}
