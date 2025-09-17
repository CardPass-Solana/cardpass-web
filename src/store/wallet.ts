import { createStore } from "solid-js/store";
import { createSignal, onCleanup } from "solid-js";
import type { Adapter } from "@solana/wallet-adapter-base";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import {
  getAvailableWallets,
  sortWalletsByReadyState,
  type WalletConfig,
} from "~/lib/wallet-manager";

export interface WalletState {
  isInitialized: boolean;
  isConnected: boolean;
  isConnecting: boolean;
  isModalOpen: boolean;
  adapter: Adapter | null;
  wallets: WalletConfig[];
  publicKey: string | null;
  walletName: string | null;
}

const [walletState, setWalletState] = createStore<WalletState>({
  isInitialized: false,
  isConnected: false,
  isConnecting: false,
  isModalOpen: false,
  adapter: null,
  wallets: [],
  publicKey: null,
  walletName: null,
});

// Initialize wallet system
export function initializeWallet() {
  if (walletState.isInitialized) return;

  // Skip initialization on server side
  if (typeof window === "undefined") {
    return;
  }

  // Get available wallets
  const availableWallets = getAvailableWallets();
  const sortedWallets = sortWalletsByReadyState(availableWallets);

  setWalletState({
    wallets: sortedWallets,
    isInitialized: true,
  });
}

// Connect to a wallet
export async function connectWallet(walletConfig: WalletConfig) {
  const { adapter, readyState } = walletConfig;

  // Check if wallet is not installed and handle accordingly
  if (readyState === "NotDetected") {
    setWalletState({ isConnecting: false });

    // Open installation page for the wallet
    if (walletConfig.name === "Phantom") {
      window.open("https://phantom.app/download", "_blank");
    } else if (walletConfig.name === "Solflare") {
      window.open("https://solflare.com/download", "_blank");
    }

    return;
  }

  try {
    setWalletState({ isConnecting: true });

    // Set up event listeners
    const handleConnect = () => {
      setWalletState({
        isConnected: true,
        publicKey: adapter.publicKey?.toString() || null,
        walletName: adapter.name,
      });
    };

    const handleDisconnect = () => {
      setWalletState({
        isConnected: false,
        adapter: null,
        publicKey: null,
        walletName: null,
      });
    };

    const handleError = (error: any) => {
      console.error(`Wallet error (${adapter.name}):`, error);
      // Reset connecting state on error
      setWalletState({ isConnecting: false });
    };

    adapter.on("connect", handleConnect);
    adapter.on("disconnect", handleDisconnect);
    adapter.on("error", handleError);

    // Connect to the wallet
    await adapter.connect();

    setWalletState({
      adapter,
      isConnecting: false,
      isModalOpen: false,
    });

    // Cleanup function for when adapter changes
    onCleanup(() => {
      adapter.off("connect", handleConnect);
      adapter.off("disconnect", handleDisconnect);
      adapter.off("error", handleError);
    });
  } catch (error) {
    console.error("Failed to connect wallet:", error);
    setWalletState({
      isConnecting: false,
      adapter: null,
    });
    throw error;
  }
}

// Disconnect wallet
export async function disconnectWallet() {
  const adapter = walletState.adapter;
  if (!adapter) return;

  try {
    await adapter.disconnect();
    setWalletState({
      isConnected: false,
      adapter: null,
      publicKey: null,
      walletName: null,
    });
  } catch (error) {
    console.error("Failed to disconnect wallet:", error);
    // Still clear state even if disconnect fails
    setWalletState({
      isConnected: false,
      adapter: null,
      publicKey: null,
      walletName: null,
    });
    throw error;
  }
}

// Modal controls
export function openWalletModal() {
  setWalletState({ isModalOpen: true });
}

export function closeWalletModal() {
  setWalletState({ isModalOpen: false });
}

// Export state
export { walletState };