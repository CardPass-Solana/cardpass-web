import { Show, onMount } from "solid-js";
import {
  walletState,
  initializeWallet,
  disconnectWallet,
  openWalletModal,
  closeWalletModal,
  connectWallet,
} from "~/store/wallet";
import WalletModal from "~/components/ui/WalletModal";
import { formatSolanaAddress } from "~/utils/solana";
import type { WalletConfig } from "~/lib/wallet-manager";

export default function SolanaWalletButton() {
  onMount(() => {
    initializeWallet();
  });

  const handleConnect = () => {
    openWalletModal();
  };

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  };

  const handleWalletSelect = async (wallet: WalletConfig) => {
    try {
      await connectWallet(wallet);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      // Close the modal if there was an error
      closeWalletModal();
    }
  };

  return (
    <>
      <Show
        when={walletState.isConnected && walletState.publicKey}
        fallback={
          <button
            onClick={handleConnect}
            disabled={!walletState.isInitialized}
            class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>Connect Wallet</span>
          </button>
        }
      >
        <div class="flex items-center gap-2">
          <button
            onClick={handleConnect}
            class="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div class="flex flex-col items-start">
              <span class="text-sm text-gray-300">
                {formatSolanaAddress(walletState.publicKey || "", 4)}
              </span>
              <span class="text-xs text-gray-500">
                {walletState.walletName}
              </span>
            </div>
          </button>
          <button
            onClick={handleDisconnect}
            class="p-2 text-gray-400 hover:text-white transition-colors"
            title="Disconnect wallet"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </Show>

      <WalletModal
        isOpen={walletState.isModalOpen}
        wallets={walletState.wallets}
        onClose={closeWalletModal}
        onSelect={handleWalletSelect}
      />
    </>
  );
}