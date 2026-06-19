import { OrderStatus } from "@/types";

const STATUS_ORDER: OrderStatus[] = [
  "Confirmed",
  "Packed",
  "OutForDelivery",
  "Delivered",
];

/** Maps legacy "Pending" to the first step in the lifecycle. */
export function normalizeOrderStatus(status: OrderStatus): OrderStatus {
  return status === "Pending" ? "Confirmed" : status;
}

export function orderStatusToStep(status: OrderStatus): 1 | 2 | 3 | 4 {
  const normalized = normalizeOrderStatus(status);
  const idx = STATUS_ORDER.indexOf(normalized);
  return (Math.max(idx, 0) + 1) as 1 | 2 | 3 | 4;
}

export function getNextOrderStatus(
  status: OrderStatus,
): OrderStatus | null {
  const normalized = normalizeOrderStatus(status);
  const idx = STATUS_ORDER.indexOf(normalized);
  if (idx < 0 || idx >= STATUS_ORDER.length - 1) return null;
  return STATUS_ORDER[idx + 1];
}

export function getOrderStatusLabel(status: OrderStatus): string {
  const normalized = normalizeOrderStatus(status);
  switch (normalized) {
    case "Confirmed":
      return "✅ Confirmed";
    case "Packed":
      return "📦 Packed";
    case "OutForDelivery":
      return "🚚 Out for Delivery";
    case "Delivered":
      return "📦 Delivered";
    default:
      return "⏳ Pending";
  }
}

export function getAdvanceStatusLabel(status: OrderStatus): string | null {
  const next = getNextOrderStatus(status);
  if (!next) return null;
  switch (next) {
    case "Packed":
      return "Mark as Packed 📦";
    case "OutForDelivery":
      return "Mark Out for Delivery 🚚";
    case "Delivered":
      return "Mark as Delivered 📦";
    default:
      return null;
  }
}
