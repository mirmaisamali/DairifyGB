import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Show notifications even while the app is in the foreground.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * Request notification permissions. Safe to call multiple times.
 * Returns true if permission is granted.
 */
export async function requestNotificationPermissions(): Promise<boolean> {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'DairifyGB Notifications',
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }

    return finalStatus === 'granted';
  } catch (err) {
    console.warn('[notifications] Permission request failed:', err);
    return false;
  }
}

/**
 * Fire an immediate local notification.
 */
async function sendLocalNotification(title: string, body: string): Promise<void> {
  try {
    await Notifications.scheduleNotificationAsync({
      content: { title, body },
      trigger: null, // fire immediately
    });
  } catch (err) {
    console.warn('[notifications] Failed to schedule notification:', err);
  }
}

/** "Order placed successfully" notification. */
export function notifyOrderPlaced(orderId: string): Promise<void> {
  return sendLocalNotification(
    'Order Placed Successfully 🎉',
    `Your order #${orderId} has been received and is being prepared.`
  );
}

/** "Milk delivered today" style notification — used by Order Tracking demo. */
export function notifyOrderDelivered(): Promise<void> {
  return sendLocalNotification(
    'Delivered 📦',
    'Your fresh dairy order has been delivered. Enjoy!'
  );
}
