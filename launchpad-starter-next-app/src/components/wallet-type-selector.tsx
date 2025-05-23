"use client";

import Image from "next/image";
import { type WalletSelectorProps, WalletType } from "@/app/types/wallet";
import { useWallet } from "@/app/providers/wallet-provider";
import { cn } from "@/lib/utils";

export default function WalletTypeSelector({ value, onChange }: WalletSelectorProps) {
    const { wallet, isLoading } = useWallet();

    const hintText =
        wallet != null ? `Wallet ${wallet.type} connected` : "Select your preferred wallet type to continue";

    const disabled = wallet != null || isLoading;

    return (
        <div className="w-full bg-card rounded-3xl p-6 shadow-light">
            <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-6 h-6 border border-gray-200 rounded-full bg-card text-gray-700 font-medium text-sm">
                    1
                </div>
                <h2 className="text-gray-700 font-medium">Select your preferred wallet type</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                    className={cn(
                        `bg-card rounded-xl p-4 flex items-center gap-3 transition-all duration-200 border border-border`,
                        value === WalletType.EVM ? "border-foreground shadow-sm" : "",
                        wallet != null ? "opacity-50 cursor-not-allowed" : ""
                    )}
                    onClick={() => onChange(WalletType.EVM)}
                    disabled={disabled}
                >
                    <div className="w-6 h-6 flex items-center justify-center">
                        <Image src="/icons/eth.png" alt="Ethereum logo" width={24} height={24} className="rounded-md" />
                    </div>
                    <span className="text-gray-700 font-medium">Ethereum</span>
                </button>

                <button
                    className={cn(
                        `bg-card rounded-xl p-4 flex items-center gap-3 transition-all duration-200 border border-border`,
                        value === WalletType.Solana ? "border-foreground shadow-sm" : "",
                        wallet != null ? "opacity-50 cursor-not-allowed" : ""
                    )}
                    onClick={() => onChange(WalletType.Solana)}
                    disabled={disabled}
                >
                    <div className="w-6 h-6 flex items-center justify-center ">
                        <Image src="/icons/sol.png" alt="Solana logo" width={24} height={24} className="rounded-md" />
                    </div>
                    <span className="text-gray-700 font-medium">Solana</span>
                </button>
            </div>

            {hintText != null ? <div className="text-muted text-sm mt-2">{hintText}</div> : null}
        </div>
    );
}
