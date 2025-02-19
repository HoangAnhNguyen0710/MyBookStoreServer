export enum UserRole {
  SELLER = 'SELLER',
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum ErrorMessages {
  UNAUTHORIZED = 'You are not authorized to perform this action.',
  FORBIDDEN = 'You do not have permission to access this resource.',
  NOT_FOUND = 'The requested resource does not exist.',
  BOOK_NOT_FOUND = 'The book does not exist or has been removed.',
  USER_NOT_FOUND = 'User not found.',
  INVALID_CREDENTIALS = 'Invalid email or password.',
  ACCOUNT_DISABLED = 'Your account has been disabled.',
  DUPLICATE_BOOK = 'This book already exists in the system.',
  INVALID_PAYMENT = 'Invalid payment details.',
  OUT_OF_STOCK = 'This product is currently out of stock.',
  CART_EMPTY = 'Your cart is empty.',
  ORDER_NOT_FOUND = 'Order not found.',
  ORDER_CANNOT_BE_MODIFIED = 'The order cannot be modified after confirmation.',
  PAYMENT_FAILED = 'Payment failed, please try again.',
  INTERNAL_SERVER_ERROR = 'An unexpected error occurred. Please try again later.',
}

export enum Language {
  ENGLISH = 'English',
  SPANISH = 'Spanish',
  FRENCH = 'French',
  GERMAN = 'German',
  CHINESE = 'Chinese',
  JAPANESE = 'Japanese',
  KOREAN = 'Korean',
  ITALIAN = 'Italian',
  RUSSIAN = 'Russian',
  HINDI = 'Hindi',
  ARABIC = 'Arabic',
  // Add more languages as needed
}

export enum BookStatus {
  AVAILABLE = 'AVAILABLE', // Còn hàng
  OUT_OF_STOCK = 'OUT_OF_STOCK', // Hết hàng
  PRE_ORDER = 'PRE_ORDER', // Sắp bán (đặt trước)
  SOLD_OUT = 'SOLD_OUT', // Đã bán hết
  COMING_SOON = 'COMING_SOON', // Sắp có hàng
  DISCONTINUED = 'DISCONTINUED', // Ngừng kinh doanh
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  PAYPAL = 'PAYPAL',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
  BANK_TRANSFER = 'BANK_TRANSFER',
}
