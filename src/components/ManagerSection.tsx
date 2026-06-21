import { useState, useEffect, FormEvent } from "react";
import { Lock, FileSpreadsheet, UtensilsCrossed, Send, ShieldCheck, ToggleLeft, ToggleRight, Trash, Edit, RefreshCw, CheckCircle2, ChevronRight, DollarSign, Calendar } from "lucide-react";
import { Product, Order } from "../types";

interface ManagerSectionProps {
  products: Product[];
  orders: Order[];
  onRefreshOrders: () => void;
  onRefreshProducts: () => void;
}

export function ManagerSection({
  products,
  orders,
  onRefreshOrders,
  onRefreshProducts,
}: ManagerSectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  
  // Workspace tabs (Dashboard/Operations-overview has been removed per instructions)
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<"ORDERS" | "MENU" | "NOTIFICATIONS">("ORDERS");

  // Menu editor fields
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editEstDays, setEditEstDays] = useState<number | "">("");
  const [newProductName, setNewProductName] = useState("");
  const [newProductCategory, setNewProductCategory] = useState<any>("GARELU");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductDesc, setNewProductDesc] = useState("");

  // Broadcast Notification fields
  const [notifTitle, setNotifTitle] = useState("");
  const [notifMsg, setNotifMsg] = useState("");
  const [notifType, setNotifType] = useState<"discount" | "new_item" | "info">("discount");
  const [notifSuccess, setNotifSuccess] = useState(false);

  // Filter orders
  const [orderFilter, setOrderFilter] = useState<"ALL" | "Pending" | "Preparing" | "Dispatched" | "Completed" | "Cancelled">("ALL");
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);
  const [cancelReasonText, setCancelReasonText] = useState("");

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        setIsAuthenticated(true);
        localStorage.setItem("swaadam_admin_token", "secure_cookie_mock_123");
      } else {
        const data = await response.json();
        setLoginError(data.error || "Invalid username or passkey");
      }
    } catch (err) {
      setLoginError("Connection error during credential verification");
    }
  };

  useEffect(() => {
    const cachedToken = localStorage.getItem("swaadam_admin_token");
    if (cachedToken === "secure_cookie_mock_123") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("swaadam_admin_token");
    setIsAuthenticated(false);
  };

  const handleUpdateOrderStatus = async (orderId: string, nextStatus: "Pending" | "Preparing" | "Dispatched" | "Completed" | "Cancelled") => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (response.ok) {
        onRefreshOrders();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelOrderManager = async (orderId: string, reason: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Cancelled", cancelReason: reason }),
      });
      if (response.ok) {
        setCancellingOrderId(null);
        setCancelReasonText("");
        onRefreshOrders();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleProductAvailability = async (product: Product) => {
    try {
      const nextVal = !product.isAvailable;
      const response = await fetch(`/api/menu/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: nextVal }),
      });
      if (response.ok) {
        onRefreshProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProductPrice = async (productId: string) => {
    try {
      const payload: Partial<Product> = { price: Number(editPrice) };
      if (editEstDays !== "") {
        payload.estimatedDays = Number(editEstDays);
      }
      const response = await fetch(`/api/menu/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setEditProductId(null);
        onRefreshProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateProduct = async (e: FormEvent) => {
    e.preventDefault();
    if (!newProductName || !newProductPrice) return;

    try {
      const response = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newProductName,
          category: newProductCategory,
          price: Number(newProductPrice),
          description: newProductDesc,
          isAvailable: true
        }),
      });

      if (response.ok) {
        setNewProductName("");
        setNewProductPrice("");
        setNewProductDesc("");
        onRefreshProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendBroadcast = async (e: FormEvent) => {
    e.preventDefault();
    if (!notifTitle || !notifMsg) return;

    try {
      const response = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: notifTitle,
          message: notifMsg,
          type: notifType
        }),
      });

      if (response.ok) {
        setNotifTitle("");
        setNotifMsg("");
        setNotifSuccess(true);
        setTimeout(() => setNotifSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === "ALL") return true;
    return o.status === orderFilter;
  });

  const pendingCount = orders.filter((o) => o.status === "Pending").length;

  // Not logged in view (styled with premium Saffron-gold matching theme)
  if (!isAuthenticated) {
    return (
      <div id="manager-authentication-pane" className="max-w-md mx-auto py-16 px-4">
        <div className="bg-white border border-[#FAD7A0] rounded-2xl p-6 shadow-xl shadow-orange-100 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[#E67E22]/10 text-[#E67E22] rounded-full flex items-center justify-center border border-[#FAD7A0] mx-auto">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-extrabold text-[#5D4037] font-sans">Swaadam Manager Console</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Only authorized personnel should enter here to manage prices, declare out-of-stock items, and organize order fulfillment.
            </p>
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-xl text-red-600 text-xs font-bold text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 block">Username</label>
              <input
                type="text"
                required
                placeholder="Manager Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-orange-50/25 border border-[#FAD7A0] focus:border-[#E67E22] focus:bg-white rounded-xl px-4 py-3 text-xs text-neutral-800 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 block">Secret Passkey</label>
              <input
                type="password"
                required
                placeholder="Manager Passkey"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-orange-50/25 border border-[#FAD7A0] focus:border-[#E67E22] focus:bg-white rounded-xl px-4 py-3 text-xs text-neutral-800 focus:outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#E67E22] hover:bg-[#D35400] font-bold text-white text-xs py-3.5 rounded-xl transition-all uppercase tracking-wider cursor-pointer shadow-md shadow-orange-100"
            >
              Verify & Access Portal
            </button>
          </form>
          
          <div className="text-center">
            <span className="text-[10px] text-gray-400 font-mono">Swaadam Authorized Personnel Only</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="manager-workspace-container" className="space-y-8 min-h-[600px] text-neutral-800 scroll-mt-20">
      
      {/* Header bar in Royal Saffron theme */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#FAD7A0]/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider font-mono p-1 px-3 bg-emerald-50 border border-emerald-100 rounded-full">
              Manager Workspace Authenticated
            </span>
          </div>
          <h2 className="text-2xl font-black text-[#5D4037] font-sans mt-2">Swaadam Administrative Desk</h2>
          <p className="text-xs text-gray-600 mt-1">Configure real-time product prices, declare out-of-stock, and monitor customer orders in Jagtial.</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              onRefreshOrders();
              onRefreshProducts();
            }}
            className="bg-white border border-[#FAD7A0] hover:border-[#E67E22] text-[#5D4037] p-2.5 rounded-xl cursor-pointer transition-all flex items-center gap-1.5 text-xs font-bold"
            title="Refresh Server Data"
          >
            <RefreshCw className="w-4 h-4 text-[#E67E22]" /> Refresh Data
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-50 border border-red-200 hover:bg-red-600 hover:text-white text-red-600 text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-all"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Navigation tabs for workspace */}
      <div className="flex border-b border-[#FAD7A0]/60 overflow-x-auto scrollbar-none pb-1">
        <button
          onClick={() => setActiveWorkspaceTab("ORDERS")}
          className={`px-4 py-3 text-xs font-extrabold border-b-2 whitespace-nowrap cursor-pointer transition-all flex items-center gap-2 ${
            activeWorkspaceTab === "ORDERS"
              ? "border-[#E67E22] text-[#E67E22] font-black"
              : "border-transparent text-gray-500 hover:text-[#E67E22]"
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" /> Customer Orders
          {pendingCount > 0 && (
            <span className="bg-red-500 text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded-full animate-pulse ml-1">
              {pendingCount} NEW
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveWorkspaceTab("MENU")}
          className={`px-4 py-3 text-xs font-extrabold border-b-2 whitespace-nowrap cursor-pointer transition-all flex items-center gap-2 ${
            activeWorkspaceTab === "MENU"
              ? "border-[#E67E22] text-[#E67E22] font-black"
              : "border-transparent text-gray-500 hover:text-[#E67E22]"
          }`}
        >
          <UtensilsCrossed className="w-4 h-4" /> Traditional Menu Catalog
        </button>

        <button
          onClick={() => setActiveWorkspaceTab("NOTIFICATIONS")}
          className={`px-4 py-3 text-xs font-extrabold border-b-2 whitespace-nowrap cursor-pointer transition-all flex items-center gap-2 ${
            activeWorkspaceTab === "NOTIFICATIONS"
              ? "border-[#E67E22] text-[#E67E22] font-black"
              : "border-transparent text-gray-500 hover:text-[#E67E22]"
          }`}
        >
          <Send className="w-4 h-4" /> Broadcast push alerts
        </button>
      </div>

      {/* WORKSPACE SUBVIEWS */}
      {activeWorkspaceTab === "ORDERS" && (
        <div id="orders-editor-subview" className="space-y-6 animate-fade-in">
          
          {/* Order Count Summary Stats Board */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 bg-orange-50/45 p-4 rounded-2xl border border-[#FAD7A0]/50 shadow-xs">
            <div className="bg-white p-3.5 rounded-xl border border-[#FAD7A0]/45 text-center space-y-1">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#5D4037]/60 block">Total Orders</span>
              <span className="text-xl font-black text-[#5D4037]">{orders.length}</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-[#FAD7A0]/45 text-center space-y-1">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-600 block">⏳ Pending</span>
              <span className="text-xl font-black text-amber-600">{orders.filter(o => o.status === "Pending").length}</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-[#FAD7A0]/45 text-center space-y-1">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-cyan-600 block">🔥 Preparing</span>
              <span className="text-xl font-black text-cyan-600">{orders.filter(o => o.status === "Preparing").length}</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-[#FAD7A0]/45 text-center space-y-1">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-orange-650 block">🚚 Dispatched</span>
              <span className="text-xl font-black text-orange-650">{orders.filter(o => o.status === "Dispatched").length}</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-[#FAD7A0]/45 text-center space-y-1">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-650 block">✅ Completed</span>
              <span className="text-xl font-black text-emerald-650">{orders.filter(o => o.status === "Completed").length}</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-[#FAD7A0]/45 text-center space-y-1">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-red-500 block">❌ Cancelled</span>
              <span className="text-xl font-black text-red-650">{orders.filter(o => o.status === "Cancelled").length}</span>
            </div>
          </div>

          {/* Order filters bar */}
          <div className="flex flex-wrap gap-2 pb-1 border-b border-[#FAD7A0]/20">
            {["ALL", "Pending", "Preparing", "Dispatched", "Completed", "Cancelled"].map((state) => (
              <button
                key={state}
                onClick={() => setOrderFilter(state as any)}
                className={`text-[11px] px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer font-extrabold ${
                  orderFilter === state
                    ? "bg-[#E67E22] border-[#E67E22] text-white"
                    : "bg-white hover:bg-orange-50 border-[#FAD7A0]/70 text-[#5D4037]"
                }`}
              >
                {state === "ALL" ? "All Orders" : state}
                {state === "Pending" && pendingCount > 0 && (
                  <span className="bg-red-500 text-white font-extrabold px-1.5 py-0.5 rounded-full ml-1.5 text-[9px]">
                    {pendingCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredOrders.length === 0 ? (
              <div className="bg-white border border-[#FAD7A0]/60 p-12 text-center rounded-2xl text-gray-600">
                <p className="text-sm font-bold">No customer orders matching status: <span className="text-[#E67E22]">{orderFilter}</span></p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-[#FAD7A0] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-stretch gap-6 relative overflow-hidden"
                >
                  {/* Subtle status left stripe */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                      order.status === "Pending"
                        ? "bg-amber-500"
                        : order.status === "Preparing"
                        ? "bg-cyan-500"
                        : order.status === "Dispatched"
                        ? "bg-[#E67E22]"
                        : order.status === "Cancelled"
                        ? "bg-red-650"
                        : "bg-emerald-500"
                    }`}
                  />
                  
                  {/* Left block: details */}
                  <div className="space-y-4 flex-1 pl-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs font-black bg-orange-50 text-[#E67E22] px-2.5 py-1 rounded border border-[#FAD7A0]/50 shadow-xs">
                        {order.id}
                      </span>
                      <span className="text-gray-400 font-mono text-[10px]">
                        {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      
                      <span
                        className={`text-[9px] font-extrabold p-1 px-3.5 rounded-full uppercase tracking-wider ${
                          order.status === "Pending"
                            ? "bg-amber-50 text-amber-700 border border-amber-300"
                            : order.status === "Preparing"
                            ? "bg-cyan-50 text-cyan-700 border border-cyan-300"
                            : order.status === "Dispatched"
                            ? "bg-orange-50 text-orange-700 border border-[#FAD7A0]"
                            : order.status === "Cancelled"
                            ? "bg-red-50 text-red-700 border border-red-300"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-300"
                        }`}
                      >
                        ● {order.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Customer contact info */}
                      <div className="space-y-1">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Customer Details</p>
                        <p className="text-sm font-black text-[#5D4037]">{order.customerName}</p>
                        <p className="text-xs font-bold text-gray-600">{order.phone}</p>
                        <p className="text-xs text-gray-600 whitespace-pre-wrap leading-tight pt-1">{order.address}</p>
                      </div>

                      {/* Food itemization */}
                      <div className="space-y-2">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Culinary Basket items</p>
                        <div className="space-y-1 bg-orange-50/25 p-3 rounded-xl border border-[#FAD7A0]/40">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-xs font-semibold">
                              <span className="text-gray-700">{item.name}</span>
                              <span className="text-[#5D4037] font-bold font-mono">{item.quantity} kg</span>
                            </div>
                          ))}
                          <div className="pt-2 border-t border-[#FAD7A0]/30 flex justify-between font-black text-xs text-[#E67E22]">
                            <span>Gross Bill</span>
                            <span className="font-mono">₹{order.total}/-</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {order.notes && (
                      <div className="p-3 bg-amber-50 border border-amber-200/50 rounded-xl text-xs text-amber-800 leading-relaxed font-medium">
                        <strong>Chef Notes / Customizations:</strong> {order.notes}
                      </div>
                    )}

                    {order.cancelReason && (
                      <div className="p-3.5 bg-red-50/70 border border-red-200 rounded-xl text-xs text-red-700 leading-relaxed font-bold shadow-xs">
                        ⚠️ <strong>Cancellation Reason:</strong> {order.cancelReason}
                      </div>
                    )}
                  </div>

                  {/* Right block: Action control desk */}
                  <div className="flex md:flex-col justify-end items-end md:justify-center gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-[#FAD7A0]/30 md:pl-6 w-full md:w-auto">
                    {order.status === "Pending" && (
                      <button
                        onClick={() => handleUpdateOrderStatus(order.id, "Preparing")}
                        className="bg-[#E67E22] hover:bg-[#D35400] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl cursor-pointer shadow-md shadow-orange-100 transition-all w-full md:w-44 text-center"
                      >
                        Accept & Start Preparing
                      </button>
                    )}

                    {order.status === "Preparing" && (
                      <button
                        onClick={() => handleUpdateOrderStatus(order.id, "Dispatched")}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl cursor-pointer shadow-md transition-all w-full md:w-44 text-center animate-pulse"
                      >
                        Mark as Out for Delivery
                      </button>
                    )}

                    {order.status === "Dispatched" && (
                      <button
                        onClick={() => handleUpdateOrderStatus(order.id, "Completed")}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl cursor-pointer shadow-md transition-all w-full md:w-44 text-center"
                      >
                        Confirm Successful Dropoff
                      </button>
                    )}

                    {order.status === "Completed" && (
                      <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs p-2 px-4 bg-emerald-50 rounded-xl border border-emerald-100">
                        <CheckCircle2 className="w-4 h-4" /> Order Complete
                      </div>
                    )}

                    {/* Inline Cancel Reason Drawer for Chef */}
                    {order.status !== "Completed" && order.status !== "Cancelled" && (
                      <div className="w-full md:w-44 border-t border-[#FAD7A0]/30 mt-2 pt-2">
                        {cancellingOrderId === order.id ? (
                          <div className="space-y-2 text-left">
                            <textarea
                              required
                              value={cancelReasonText}
                              onChange={(e) => setCancelReasonText(e.target.value)}
                              placeholder="Write reason (e.g. Out of stock Ghee / Distance limit)"
                              className="w-full text-[11px] p-2 bg-orange-50/15 border border-red-300 rounded-lg text-neutral-800 placeholder-neutral-400 focus:outline-none transition-all focus:bg-white"
                              rows={2}
                            />
                            <div className="flex gap-1.5 justify-between">
                              <button
                                onClick={() => {
                                  setCancellingOrderId(null);
                                  setCancelReasonText("");
                                }}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-[10px] font-black px-2.5 py-1 rounded-md transition-all"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleCancelOrderManager(order.id, cancelReasonText || "Kitchen ingredients out of stock")}
                                className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow-xs transition-all"
                              >
                                Submit Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setCancellingOrderId(order.id);
                              setCancelReasonText("");
                            }}
                            className="bg-white border hover:bg-red-50 text-red-650 border-red-200 font-extrabold text-xs px-5 py-2 rounded-xl cursor-pointer transition-all w-full md:w-44 text-center"
                          >
                            Cancel Order
                          </button>
                        )}
                      </div>
                    )}

                    {/* WhatsApp cancellation link when order is Cancelled */}
                    {order.status === "Cancelled" && (
                      <div className="w-full md:w-44 space-y-2 mt-1">
                        <div className="bg-red-50 text-red-700 font-bold text-center text-[10px] py-1 border border-red-100 rounded-lg">
                          🛑 Cancelled
                        </div>
                        {(() => {
                          const cleanPhone = order.phone.replace(/\D/g, "");
                          const waPhone = cleanPhone.startsWith("91") && cleanPhone.length > 10 ? cleanPhone : "91" + cleanPhone;
                          const cancelMsg = `Namāste ${order.customerName}! 🙏\n\nYour order *${order.id}* from Swaadam Home Foods has been cancelled by the kitchen supervisor.\n\n*REASON FOR CANCELLATION:*\n"${order.cancelReason || "Kitchen overhead / ingredients out of stock"}"\n\nWe deeply apologize for the inconvenience as we preserve fresh quality daily. We hope to prepare your Telangana favorites next time! ధన్యవాదాలు!`;
                          const encodedCancel = encodeURIComponent(cancelMsg);
                          const waUrl = `https://wa.me/${waPhone}?text=${encodedCancel}`;
                          return (
                            <a
                              href={waUrl}
                              target="_blank"
                              referrerPolicy="no-referrer"
                              className="bg-[#25D366] hover:bg-[#128C7E] text-white font-extrabold text-[11px] py-2 px-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 w-full text-center"
                            >
                              💬 Tell Customer
                            </a>
                          );
                        })()}
                      </div>
                    )}

                    {order.status !== "Completed" && order.status !== "Cancelled" && (
                      <p className="text-[9px] text-gray-400 font-mono text-center w-full">Updates notification logs instantly</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeWorkspaceTab === "MENU" && (
        <div id="catalog-control-subview" className="space-y-8 animate-fade-in">
          
          {/* Create new product recipe card */}
          <div className="bg-white border border-[#FAD7A0] p-6 rounded-2xl relative shadow-md shadow-orange-100/35">
            <h3 className="text-base font-extrabold text-[#5D4037] mb-4 flex items-center gap-2">
              <span className="w-2.5 h-6 bg-[#E67E22] rounded-full inline-block" /> Introduce New Swaadam Product
            </h3>
            
            <form onSubmit={handleCreateProduct} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="text-xs text-gray-600 font-bold mb-1 block">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Ghee Ariselu"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="w-full bg-orange-50/25 border border-[#FAD7A0] focus:border-[#E67E22] focus:bg-white rounded-xl px-4.5 py-2.5 text-xs text-neutral-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600 font-bold mb-1 block">Category *</label>
                <select
                  value={newProductCategory}
                  onChange={(e) => setNewProductCategory(e.target.value as any)}
                  className="w-full bg-orange-50/25 border border-[#FAD7A0] focus:border-[#E67E22] focus:bg-white rounded-xl px-4.5 py-2.5 text-xs text-neutral-800 focus:outline-none"
                >
                  <option value="GARELU">GARELU</option>
                  <option value="SAKINALU">SAKINALU</option>
                  <option value="SWEETS">SWEETS</option>
                  <option value="MURUKULU">MURUKULU</option>
                  <option value="SUNNUNDALU">SUNNUNDALU</option>
                  <option value="MIXTURES">MIXTURES</option>
                  <option value="PICKLES">PICKLES</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-600 font-bold mb-1 block">Price per Kg (₹) *</label>
                <input
                  type="number"
                  required
                  placeholder="e.g., 340"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  className="w-full bg-orange-50/25 border border-[#FAD7A0] focus:border-[#E67E22] focus:bg-white rounded-xl px-4.5 py-2.5 text-xs text-neutral-800 focus:outline-none"
                />
              </div>

              <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div className="md:col-span-4">
                  <label className="text-xs text-gray-600 font-bold mb-1 block">Product Recipe Description (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g., Classic syrup soaked traditional sesame cake baked under local fire"
                    value={newProductDesc}
                    onChange={(e) => setNewProductDesc(e.target.value)}
                    className="w-full bg-orange-50/25 border border-[#FAD7A0] focus:border-[#E67E22] focus:bg-white rounded-xl px-4.5 py-2.5 text-xs text-neutral-800 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#E67E22] hover:bg-[#D35400] text-white font-bold text-xs py-3 px-4 rounded-xl cursor-pointer transition-all shadow-md w-full"
                >
                  Publish Recipe
                </button>
              </div>
            </form>
          </div>

          {/* List of recipe items and operational toggles */}
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-[#5D4037] flex items-center gap-2">
              <span className="w-2.5 h-6 bg-[#E67E22] rounded-full inline-block" /> Active Menu Toggles & Price Manager
            </h3>

            <div className="bg-white border border-[#FAD7A0] rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs bg-white">
                  <thead className="bg-orange-50/60 text-[#5D4037] font-bold border-b border-[#FAD7A0]/50">
                    <tr>
                      <th className="p-4 uppercase tracking-wider font-bold">Image</th>
                      <th className="p-4 uppercase tracking-wider font-bold">Product Name</th>
                      <th className="p-4 uppercase tracking-wider font-bold">Category</th>
                      <th className="p-4 uppercase tracking-wider font-bold">Price (₹/Kg)</th>
                      <th className="p-4 uppercase tracking-wider font-bold">Dispatch Estimate</th>
                      <th className="p-4 uppercase tracking-wider font-bold">Available Stock</th>
                      <th className="p-4 uppercase tracking-wider font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#FAD7A0]/25">
                    {products.map((p) => {
                      const isEditing = editProductId === p.id;
                      return (
                        <tr key={p.id} className="hover:bg-orange-50/10">
                          <td className="p-4 font-mono font-bold text-sm text-[#E67E22]">🍳</td>
                          <td className="p-4">
                            <p className="font-extrabold text-[#5D4037] text-sm">{p.name}</p>
                            <p className="text-[10px] text-gray-600 line-clamp-1">{p.description}</p>
                          </td>
                          <td className="p-4">
                            <span className="bg-orange-100/30 border border-[#FAD7A0]/40 text-[#E67E22] font-black text-[9px] px-2 py-0.5 rounded uppercase">
                              {p.category}
                            </span>
                          </td>
                          <td className="p-4">
                            {isEditing ? (
                              <div className="flex items-center gap-1 bg-white border border-[#FAD7A0] rounded px-1.5 py-0.5 w-24">
                                <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                                <input
                                  type="number"
                                  value={editPrice}
                                  onChange={(e) => setEditPrice(Number(e.target.value))}
                                  className="w-full text-xs font-bold text-[#5D4037] focus:outline-none"
                                />
                              </div>
                            ) : (
                              <span className="font-mono font-extrabold text-sm">₹{p.price}/-</span>
                            )}
                          </td>
                          <td className="p-4">
                            {isEditing ? (
                              <div className="flex items-center gap-1 bg-white border border-[#FAD7A0] rounded px-1.5 py-0.5 w-24">
                                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                <input
                                  type="number"
                                  placeholder="Days"
                                  value={editEstDays}
                                  onChange={(e) => setEditEstDays(e.target.value === "" ? "" : Number(e.target.value))}
                                  className="w-full text-xs font-bold text-[#5D4037] focus:outline-none"
                                />
                              </div>
                            ) : (
                              <span className="text-gray-600 font-mono text-[11px]">
                                {p.isAvailable ? "Ready Direct" : `${p.estimatedDays || 2} Days prep`}
                              </span>
                            )}
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => handleToggleProductAvailability(p)}
                              className="focus:outline-none cursor-pointer"
                              title={p.isAvailable ? "Set Out Of Stock" : "Set In Stock"}
                            >
                              {p.isAvailable ? (
                                <span className="flex items-center gap-1.5 text-emerald-600 font-extrabold text-[11px] bg-emerald-50 border border-emerald-100 p-1 px-2.5 rounded-full">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> IN STOCK
                                </span>
                              ) : (
                                <span className="flex items-center gap-1.5 text-amber-600 font-extrabold text-[11px] bg-amber-55/65 border border-amber-200/90 p-1 px-2.5 rounded-full">
                                  ⚠️ OUT OF STOCK
                                </span>
                              )}
                            </button>
                          </td>
                          <td className="p-4 text-right">
                            {isEditing ? (
                              <div className="flex justify-end gap-1.5">
                                <button
                                  onClick={() => handleUpdateProductPrice(p.id)}
                                  className="bg-emerald-600 text-white font-bold p-1 px-2 rounded hover:bg-emerald-700 text-[10px] cursor-pointer"
                                >
                                  Save Change
                                </button>
                                <button
                                  onClick={() => setEditProductId(null)}
                                  className="bg-gray-100 text-[#5D4037] font-bold p-1 px-2 rounded hover:bg-gray-200 text-[10px] cursor-pointer"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setEditProductId(p.id);
                                  setEditPrice(p.price);
                                  setEditEstDays(p.estimatedDays || "");
                                }}
                                className="border border-[#FAD7A0]/70 text-[#E67E22] bg-white p-1.5 px-3.5 rounded-lg hover:bg-orange-50 font-bold tracking-tight text-[10px] cursor-pointer transition-colors"
                              >
                                Edit Item
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      )}

      {activeWorkspaceTab === "NOTIFICATIONS" && (
        <div id="broadcasts-subview" className="space-y-6 animate-fade-in max-w-xl">
          <div className="bg-white border border-[#FAD7A0] p-6 rounded-2xl relative shadow-md shadow-orange-100/35">
            <h3 className="text-base font-extrabold text-[#5D4037] mb-2 flex items-center gap-2">
              <Send className="w-4 h-4 text-[#E67E22]" /> Broadcasting Push Notification Bulletins
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              When you post a bulletin here, it triggers a live floating gold toast message to all active users on the website, notifying them of fresh specials, kitchen offerings, and price specials!
            </p>
            
            {notifSuccess && (
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 font-extrabold p-3 rounded-xl text-center text-xs mb-4">
                🚀 Message broadcasted successfully! All visitors notified in real-time.
              </div>
            )}

            <form onSubmit={handleSendBroadcast} className="space-y-4">
              <div>
                <label className="text-xs text-gray-600 font-bold mb-1 block">Notification Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., ✨ Fresh Ghee Sakinalu Out of Hearth!"
                  value={notifTitle}
                  onChange={(e) => setNotifTitle(e.target.value)}
                  className="w-full bg-orange-50/25 border border-[#FAD7A0] focus:border-[#E67E22] focus:bg-white rounded-xl px-4 py-3 text-xs text-neutral-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600 font-bold mb-1 block font-sans">Notification Body Message *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Get a taste of Swaadam specials. Prepared with high nutrition and double-filtered peanut oils. Check the Daily Menu now!"
                  value={notifMsg}
                  onChange={(e) => setNotifMsg(e.target.value)}
                  className="w-full bg-orange-50/25 border border-[#FAD7A0] focus:border-[#E67E22] focus:bg-white rounded-xl px-4 py-3 text-xs text-neutral-800 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600 font-bold mb-1 block">Branding Type</label>
                <div className="flex gap-4">
                  {(["discount", "new_item", "info"] as const).map((t) => (
                    <label key={t} className="flex items-center gap-1.5 text-xs text-gray-700 font-bold cursor-pointer">
                      <input
                        type="radio"
                        name="notifType"
                        value={t}
                        checked={notifType === t}
                        onChange={() => setNotifType(t)}
                        className="text-[#E67E22] focus:ring-[#E67E22]"
                      />
                      {t === "discount" ? "Deal/Offer %" : t === "new_item" ? "New Recipe Spec 🍽️" : "General Info 📢"}
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#E67E22] hover:bg-[#D35400] text-white font-bold text-xs py-3 px-6 rounded-xl cursor-pointer transition-all shadow-md flex items-center gap-2"
              >
                Launch Live Broadcast <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
