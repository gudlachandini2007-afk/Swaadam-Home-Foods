export interface Product {
  id: string;
  name: string;
  category: "GARELU" | "SAKINALU" | "MURUKULU" | "SWEETS" | "SUNNUNDALU" | "MIXTURES" | "PICKLES";
  price: number; // per kg
  description: string;
  isAvailable: boolean;
  estimatedDays?: number; // Estimated preparation time to dispatch if out of stock
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number; // in kg (can be fractional like 0.5)
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: "Pending" | "Preparing" | "Dispatched" | "Completed" | "Cancelled";
  notes?: string;
  cancelReason?: string;
  createdAt: string;
  notificationSent?: boolean;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number; // 1 to 5
  text: string;
  date: string;
}

export interface ChatMessage {
  id: string;
  sender: "customer" | "representative";
  text: string;
  timestamp: string;
}

export interface PushNotification {
  id: string;
  title: string;
  message: string;
  type: "discount" | "new_item" | "info";
  createdAt: string;
}
