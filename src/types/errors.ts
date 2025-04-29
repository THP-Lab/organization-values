export interface WalletError extends Error {
  code?: number;
}

export enum WalletErrorCodes {
  USER_REJECTED = 4001,
  INSUFFICIENT_FUNDS = 4100,
  TRANSACTION_FAILED = -32603,
}

export function isWalletError(error: unknown): error is WalletError {
  return error instanceof Error && 'code' in error;
}
