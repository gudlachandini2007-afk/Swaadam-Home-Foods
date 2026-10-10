import { useState } from "react";
import { User as FirebaseUser } from "firebase/auth";
import { LogIn, LogOut, User as UserIcon, CheckCircle2, ChevronDown } from "lucide-react";
import { signInWithGoogle, logoutUser } from "../services/firebaseService";

interface UserAuthButtonProps {
  user: FirebaseUser | null;
  onViewMyOrders?: () => void;
}

export function UserAuthButton({ user, onViewMyOrders }: UserAuthButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
    } catch (err) {
      console.error("Google sign in failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logoutUser();
      setIsOpen(false);
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  if (!user) {
    return (
      <button
        onClick={handleSignIn}
        disabled={loading}
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-white/90 hover:bg-white text-gray-800 border border-[#FAD7A0] hover:border-[#E67E22] shadow-xs transition-all cursor-pointer disabled:opacity-50"
        title="Sign in with Google for cloud-backed orders"
      >
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span className="hidden sm:inline">Google Sign In</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl border border-[#FAD7A0] bg-white/95 hover:bg-white text-gray-800 shadow-xs transition-all cursor-pointer"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || "User"}
            className="w-7 h-7 rounded-full object-cover border border-amber-300"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center">
            {user.displayName?.charAt(0) || "U"}
          </div>
        )}
        <span className="hidden sm:inline text-xs font-semibold text-gray-700 max-w-[100px] truncate">
          {user.displayName?.split(" ")[0] || "Account"}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-gray-500 hidden sm:inline" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#FAD7A0] py-3 px-3 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="pb-3 border-b border-gray-100 flex items-center gap-3">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-10 h-10 rounded-full border border-amber-300"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center">
                {user.displayName?.charAt(0) || "U"}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-gray-900 truncate">
                {user.displayName || "Customer"}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>

          <div className="my-2.5 px-2 py-1.5 bg-emerald-50 rounded-xl border border-emerald-200/80 flex items-center gap-2 text-[11px] text-emerald-800 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Orders synced to Firebase Cloud</span>
          </div>

          <div className="space-y-1">
            {onViewMyOrders && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onViewMyOrders();
                }}
                className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#E67E22] rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>My Orders History</span>
              </button>
            )}

            <button
              onClick={handleSignOut}
              className="w-full text-left px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
