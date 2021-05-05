import { computed, reactive } from 'vue';
import { Storage } from '@capacitor/core';

import AuthState from '@/types/AuthState';

const state = reactive<AuthState>({
  accessToken: null,
  userId: null,
  nextRefreshTimestamp: null,
  refreshTimeoutId: null
});

export default function useAuthState() {
  const accessToken = computed<string | null>(() => state.accessToken);
  const userId = computed<string | null>(() => state.userId);

  const nextRefreshTimestamp = computed<number | null>(() =>
    state.nextRefreshTimestamp ? +state.nextRefreshTimestamp : null
  );
  const refreshTimeoutId = computed<number | null>(() =>
    state.refreshTimeoutId ? +state.refreshTimeoutId : null
  );
  const isLoggedIn = computed<boolean>(
    () => !!state.accessToken && !!state.userId
  );

  const saveState = async () => {
    const entries = (Object.entries(state) as [
      keyof AuthState,
      string | null
    ][]).filter(([, value]) => value !== null) as [string, string][];

    await Promise.all(
      entries.map(([key, value]) => Storage.set({ key, value }))
    );
  };

  const setState = async (newState: AuthState) => {
    const entries = Object.entries(newState) as [
      keyof AuthState,
      string | null
    ][];

    for (const [key, value] of entries) {
      state[key] = value;
    }
  };

  const loadState = async () => {
    const keys = Object.keys(state) as (keyof AuthState)[];
    const values = (
      await Promise.all(keys.map((key) => Storage.get({ key })))
    ).map((result) => result.value);

    const loadedStateObj: AuthState = values.reduce((obj, value, index) => {
      const key: keyof AuthState = keys[index];
      obj[key] = value;

      return obj;
    }, {} as { [k in keyof AuthState]: string | null });

    setState(loadedStateObj);
  };

  const clearState = async () => {
    await Storage.clear();

    setState({
      accessToken: null,
      userId: null,
      nextRefreshTimestamp: null,
      refreshTimeoutId: null
    });
  };

  return {
    loadState,
    setState,
    saveState,
    clearState,
    accessToken,
    userId,
    nextRefreshTimestamp,
    refreshTimeoutId,
    isLoggedIn
  };
}
