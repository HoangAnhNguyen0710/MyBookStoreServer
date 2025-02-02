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
