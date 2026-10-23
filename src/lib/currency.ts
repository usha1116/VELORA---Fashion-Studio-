/**
 * Format currency in Indian Rupees (INR)
 * Formats with proper Indian comma notation (e.g., ₹48,500)
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
