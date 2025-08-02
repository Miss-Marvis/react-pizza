/**
 
 * @param {number} value 
 * @returns {string} 
 */
export function formatCurrency(value) {
  if (value === undefined || value === null || isNaN(value)) {
    console.warn('formatCurrency received invalid value:', value)
    value = 0
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

/**
 * Calculates date difference in days
 * @param {string} dateStr - Date string to compare with current date
 * @returns {number} - Number of days difference
 */
export function calcMinutesLeft(dateStr) {
  const d1 = new Date().getTime()
  const d2 = new Date(dateStr).getTime()
  return Math.round((d2 - d1) / 60000)
}

/**
 * Formats a date as a relative time string
 * @param {string} dateStr - Date string to format
 * @returns {string} - Formatted date string
 */
export function formatDate(dateStr) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr))
}

// You can add more helper functions as needed for your application
