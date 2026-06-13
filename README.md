# DairifyGB 🥛

**"From GB Farms to Your Family."**

A frontend-only dairy delivery app MVP built with React Native + Expo + TypeScript.
All data is persisted locally on-device using AsyncStorage — no backend, no servers, no external APIs.

---

## Tech Stack

| Package | Version |
|---|---|
| expo | ~56.0.11 |
| react | 19.2.3 |
| react-native | 0.85.3 |
| @react-navigation/native | ^6.1.17 |
| @react-navigation/native-stack | ^6.9.26 |
| @react-navigation/bottom-tabs | ^6.5.20 |
| @react-native-async-storage/async-storage | 2.2.0 |
| expo-notifications | ~0.33.2 |
| expo-splash-screen | ~56.0.10 |
| react-native-safe-area-context | ~5.7.0 |
| react-native-screens | 4.25.2 |

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Start Expo
npx expo start

# 3. Scan QR code with Expo Go (iOS/Android)
#    or press 'i' for iOS simulator / 'a' for Android emulator
```

> **Note:** Since `@react-native-async-storage/async-storage` and `expo-notifications`
> were newly added, run `npm install` after pulling these changes so your
> `node_modules` and lockfile are up to date.

### EAS Build

```bash
eas build --profile preview --platform android
```

No additional configuration is needed — `expo-notifications` is registered as a
config plugin in `app.json` and works out of the box with EAS.

---

## App Flow

```
Splash Screen (2.5s auto-navigate)
  └─> Login Screen
        └─> Main (Bottom Tabs)
              ├─ 🏪 Shop      → Search, filter, browse, add to cart, favorite
              ├─ 📅 Subscribe → Choose delivery plan
              ├─ ❤️ Favorites → Saved/wishlisted products
              ├─ 🛒 Cart      → Review, address, payment, place order
              │                    └─> Order Success 🎉 (local notification)
              │                          └─> Order Tracking 🚚 (mark delivered)
              └─ 📦 Orders    → Order history (persisted)
```

---

## ✨ New Features (Frontend + Local Storage Only)

### 🛒 Persistent Cart
Cart contents are saved to AsyncStorage and restored automatically on app
restart. Add, remove, and update quantities — totals recalculate live.

### ❤️ Favorites / Wishlist
Tap the heart icon on any product card to save it. Favorites persist across
restarts and appear in the dedicated **Favorites** tab, with an empty state
when nothing is saved yet.

### 📦 Order History
Placing an order from the Cart screen creates a realistic `Order` record
(id, items, totals, address, payment method, timestamp, status) and saves it
to AsyncStorage. The **Orders** tab lists all past orders with status badges
(`Pending` / `Delivered`). Tapping an order opens Order Tracking, where you
can mark it as delivered.

### 🔍 Search + Filter
The Shop screen now has a search bar (matches product name & description) and
a price-range filter modal — both run entirely against the local
`products.json` data via `productService`.

### 📱 Offline Data Layer
Product data lives in `src/data/products.json`. `src/services/productService.ts`
exposes async functions (`getAllProducts`, `searchProducts`, `getProductsByCategory`,
etc.) that mimic an API service so the rest of the app is decoupled from the
data source.

### 🎯 UI/UX Improvements
- **Skeleton loaders** (`src/components/Skeleton.tsx`) while product/order data loads
- **Empty states** (`src/components/EmptyState.tsx`) for empty cart, favorites, orders, and search results
- **Pull-to-refresh** on Shop, Favorites, and Orders
- Cart and Order screens show a lightweight loading state while AsyncStorage hydrates

### 🔔 Local Notifications
Using `expo-notifications` (no backend required):
- **"Order Placed Successfully 🎉"** — fired when an order is placed
- **"Delivered 📦"** — fired when you tap "Mark as Delivered" on the tracking screen

---

## Project Structure

```
DairifyGB/
├── App.tsx                          # Root navigator + Cart/Favorites/Orders providers
├── src/
│   ├── components/
│   │   ├── Button.tsx               # Reusable button (primary/outline/ghost)
│   │   ├── CategoryTabs.tsx         # Horizontal category filter tabs
│   │   ├── EmptyState.tsx           # Reusable empty-state UI
│   │   ├── FilterPanel.tsx          # Price-range filter modal
│   │   ├── ProductCard.tsx          # Product grid card w/ qty + favorite toggle
│   │   ├── SearchBar.tsx            # Search input + filter trigger
│   │   └── Skeleton.tsx             # Shimmer loading placeholders
│   ├── constants/
│   │   ├── colors.ts                # Color palette
│   │   └── spacing.ts               # Spacing & font scale
│   ├── context/
│   │   ├── CartContext.tsx          # Cart state, persisted via AsyncStorage
│   │   ├── FavoritesContext.tsx     # Favorites state, persisted via AsyncStorage
│   │   └── OrdersContext.tsx        # Order history, persisted via AsyncStorage
│   ├── data/
│   │   ├── products.json            # ★ Offline product data (source of truth)
│   │   └── products.ts              # Re-exports PRODUCTS + SUBSCRIPTION_OPTIONS
│   ├── navigation/
│   │   └── TabNavigator.tsx          # Bottom tab navigator (5 tabs)
│   ├── screens/
│   │   ├── SplashScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── ShopScreen.tsx            # Search, filter, categories, product grid
│   │   ├── SubscriptionScreen.tsx
│   │   ├── FavoritesScreen.tsx       # ★ New
│   │   ├── CartScreen.tsx            # Now creates persisted Order records
│   │   ├── OrderHistoryScreen.tsx    # ★ New
│   │   ├── OrderSuccessScreen.tsx    # Shows real order id + payment
│   │   └── OrderTrackingScreen.tsx   # Shows real order + "Mark Delivered"
│   ├── services/
│   │   ├── storageService.ts        # ★ AsyncStorage get/set/remove helpers
│   │   ├── productService.ts        # ★ Local "API" layer for products
│   │   └── notificationService.ts   # ★ Local notification helpers
│   ├── types/
│   │   └── index.ts                 # TypeScript types (incl. Order, OrderStatus)
│   └── utils/
│       └── format.ts                # ★ Order id generation, date/price formatting
```

## Notes

- **No backend** – all data is local JSON + AsyncStorage
- **No authentication** – login navigates directly to Home
- **Images** – emoji placeholders; replace with `<Image>` components when ready
- **State** – Cart, Favorites, and Orders are each managed via their own Context
  provider and automatically synced to AsyncStorage
