import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { auth, googleProvider, db } from "../firebase";
import { Order, Review, Product } from "../types";

// User authentication helpers
export const signInWithGoogle = async (): Promise<FirebaseUser | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    if (user) {
      // Save user profile to Firestore
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          uid: user.uid,
          email: user.email || "",
          displayName: user.displayName || "Customer",
          photoURL: user.photoURL || "",
          lastLogin: new Date().toISOString(),
        },
        { merge: true }
      );
    }
    return user;
  } catch (error) {
    console.error("Firebase Google Sign-In error:", error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

export const subscribeToAuth = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Cloud Backup for Orders
export const saveOrderToFirestore = async (order: Order, userId?: string) => {
  try {
    const orderRef = doc(db, "orders", order.id);
    await setDoc(orderRef, {
      ...order,
      userId: userId || null,
      syncedAt: new Date().toISOString(),
      timestamp: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Failed to backup order to Firestore:", error);
    return false;
  }
};

// Real-time Firestore Orders Subscription
export const subscribeToFirestoreOrders = (callback: (orders: Order[]) => void) => {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, orderBy("createdAt", "desc"));
    return onSnapshot(
      q,
      (snapshot) => {
        const cloudOrders: Order[] = [];
        snapshot.forEach((docSnap) => {
          cloudOrders.push(docSnap.data() as Order);
        });
        callback(cloudOrders);
      },
      (err) => {
        console.warn("Firestore orders subscription fallback to REST:", err);
      }
    );
  } catch (error) {
    console.warn("Error setting up Firestore orders subscription:", error);
    return () => {};
  }
};

// Cloud Backup for Reviews
export const saveReviewToFirestore = async (review: Review) => {
  try {
    const reviewRef = doc(db, "reviews", review.id);
    await setDoc(reviewRef, {
      ...review,
      syncedAt: new Date().toISOString(),
      timestamp: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Failed to backup review to Firestore:", error);
    return false;
  }
};

// Real-time Firestore Reviews Subscription
export const subscribeToFirestoreReviews = (callback: (reviews: Review[]) => void) => {
  try {
    const reviewsRef = collection(db, "reviews");
    return onSnapshot(
      reviewsRef,
      (snapshot) => {
        const cloudReviews: Review[] = [];
        snapshot.forEach((docSnap) => {
          cloudReviews.push(docSnap.data() as Review);
        });
        if (cloudReviews.length > 0) {
          callback(cloudReviews);
        }
      },
      (err) => {
        console.warn("Firestore reviews subscription fallback to REST:", err);
      }
    );
  } catch (error) {
    console.warn("Error setting up Firestore reviews subscription:", error);
    return () => {};
  }
};

// Sync Products Catalog to Firestore for persistent backup
export const syncProductsToFirestore = async (products: Product[]) => {
  try {
    for (const prod of products) {
      const prodRef = doc(db, "products", prod.id);
      await setDoc(prodRef, prod, { merge: true });
    }
    return true;
  } catch (error) {
    console.error("Failed to sync products to Firestore:", error);
    return false;
  }
};

// Mirror individual product updates directly to Firestore
export const updateProductInFirestore = async (productId: string, updates: Partial<Product>) => {
  try {
    const prodRef = doc(db, "products", productId);
    await setDoc(prodRef, updates, { merge: true });
    return true;
  } catch (error) {
    console.warn("Could not sync product update directly to Firestore:", error);
    return false;
  }
};
