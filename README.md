# DairifyGB 🥛

**"From GB Farms to Your Family."**

A dairy delivery app UI prototype built with React Native + Expo + TypeScript.

---

## Tech Stack

| Package | Version |
|---|---|
| expo | ^56.0.9 |
| react | 19.2.3 |
| react-native | 0.85.3 |
| @react-navigation/native | ^6.1.17 |
| @react-navigation/native-stack | ^6.9.26 |
| @react-navigation/bottom-tabs | ^6.5.20 |
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

---

## App Flow

```
Splash Screen (2.5s auto-navigate)
  └─> Login Screen
        └─> Main (Bottom Tabs)
              ├─ 🏪 Shop      → Browse products, add to cart
              ├─ 📅 Subscribe → Choose delivery plan
              └─ 🛒 Cart      → Review, enter address, place order
                                    └─> Order Success 🎉
                                          └─> Order Tracking 🚚
```

## Project Structure

```
DairifyGB/
├── App.tsx                         # Root navigator + CartProvider
├── src/
│   ├── components/
│   │   ├── Button.tsx              # Reusable button (primary/outline/ghost)
│   │   ├── CategoryTabs.tsx        # Horizontal category filter tabs
│   │   └── ProductCard.tsx         # Product grid card with qty selector
│   ├── constants/
│   │   ├── colors.ts               # Color palette
│   │   └── spacing.ts              # Spacing & font scale
│   ├── context/
│   │   └── CartContext.tsx         # Global cart state (Context API)
│   ├── data/
│   │   └── products.ts             # Hardcoded mock product data
│   ├── navigation/
│   │   └── TabNavigator.tsx        # Bottom tab navigator
│   ├── screens/
│   │   ├── SplashScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── ShopScreen.tsx
│   │   ├── SubscriptionScreen.tsx
│   │   ├── CartScreen.tsx
│   │   ├── OrderSuccessScreen.tsx
│   │   └── OrderTrackingScreen.tsx
│   └── types/
│       └── index.ts                # TypeScript types
```

## Notes

- **No backend** – all data is hardcoded locally
- **No authentication** – login navigates directly to Home
- **Images** – emoji placeholders; replace with `<Image>` components when ready
- **Cart state** – managed via React Context API (in-memory only)
