export default interface AuthState {
  accessToken: string | null;
  userId: string | null;
  nextRefreshTimestamp?: string | null;
  refreshTimeoutId?: string | null;
}
