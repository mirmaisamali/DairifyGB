/**
 * Generates a readable mock order id, e.g. "DGB-4821".
 */
export function generateOrderId(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `DGB-${num}`;
}

/**
 * Formats an ISO date string into something human-friendly,
 * e.g. "12 Jun 2026, 7:45 AM".
 */
export function formatOrderDate(iso: string): string {
  const date = new Date(iso);
  const datePart = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${datePart}, ${timePart}`;
}

/**
 * Formats a number as PKR currency string, e.g. "Rs 1,250".
 */
export function formatPrice(value: number): string {
  return `Rs ${value.toLocaleString()}`;
}
