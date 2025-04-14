"use client";

import type React from 'react';

import {
  Copy,
  Image as ImageIcon,
  Menu,
  User,
  WalletMinimal,
} from 'lucide-react';
import Link from 'next/link';

import { useWallet } from '@/app/providers/wallet-provider';
import { LogoutIcon } from '@/icons/logout';
import { useAuth } from '@crossmint/client-sdk-react-ui';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from './avatar';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Typography } from './typography';
import { useToast } from './use-toast';

function formatWalletAddress(address: string, startLength: number, endLength: number): string {
    return `${address.substring(0, startLength)}...${address.substring(address.length - endLength)}`;
}

export const Header: React.FC = () => {
    const { logout } = useAuth();
    const { wallet, isLoading } = useWallet();
    const { toast } = useToast();

    const handleLogout = () => {
        window.location.reload();
        logout();
    };

    const handleCopyAddress = async () => {
        if (wallet?.address) {
            await navigator.clipboard.writeText(wallet.address);
            toast({ 
                title: "Address copied to clipboard", 
                duration: 5000,
                className: "bg-card border-accent/20"
            });
        }
    };

    return (
        <header className="border-b border-border/30 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="flex justify-between px-6 py-4 items-center max-w-7xl mx-auto">
                <HeaderLogo />
                {wallet != null && wallet.address != null && wallet.address !== "" ? (
                    <UserMenu
                        wallet={wallet?.address as any}
                        walletStatus={isLoading ? "in-progress" : "loaded"}
                        onLogout={handleLogout}
                        onCopyAddress={handleCopyAddress}
                    />
                ) : (
                    <MobileMenu />
                )}
            </div>
        </header>
    );
};

const HeaderLogo: React.FC = () => (
    <Link href="/" className="justify-center items-center flex group">
        <div className="bg-accent/10 p-2 rounded-full transition-all duration-300 group-hover:bg-accent/20">
            <img src="/agents.png" alt="Agent Launchpad" className="h-8 w-8" />
        </div>
        <Typography className="ml-3 font-semibold text-lg hidden sm:block bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Agent Launchpad
        </Typography>
    </Link>
);

const MobileMenu: React.FC = () => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
            <div className="flex flex-col gap-2 p-2">
                <Link href="/agents" prefetch={false} className="text-foreground flex gap-3 py-2 px-2 rounded-md hover:bg-accent/10">
                    <ImageIcon className="h-5 w-5 text-accent" />
                    <Typography>Agents</Typography>
                </Link>
            </div>
        </DropdownMenuContent>
    </DropdownMenu>
);

const UserMenu: React.FC<{
    wallet: string | undefined;
    walletStatus: string;
    onLogout: () => void;
    onCopyAddress: () => void;
}> = ({ wallet, walletStatus, onLogout, onCopyAddress }) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={walletStatus !== "loaded"}>
            <div className="flex items-center gap-3 cursor-pointer">
                <WalletDisplay address={wallet} isLoading={walletStatus !== "loaded"} />
                <Avatar className="h-9 w-9 border-2 border-accent/20">
                    <AvatarImage alt="User Avatar" src="" />
                    <AvatarFallback className="bg-accent/10 text-accent">
                        <User className="h-5 w-5" />
                    </AvatarFallback>
                </Avatar>
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 overflow-y-auto max-h-[80vh]">
            <div className="flex flex-col gap-1 p-1">
                <div 
                    className="flex gap-3 items-center cursor-pointer p-2 rounded-md hover:bg-accent/10 transition-colors" 
                    onClick={onCopyAddress}
                >
                    <Typography className="text-foreground">{wallet ? formatWalletAddress(wallet, 10, 6) : ""}</Typography>
                    <Copy className="h-4 w-4 text-accent" />
                </div>
                <Link 
                    href="/agents" 
                    prefetch={false} 
                    className="flex gap-3 p-2 rounded-md hover:bg-accent/10 transition-colors"
                >
                    <ImageIcon className="h-4 w-4 text-accent" />
                    <Typography className="text-foreground">Agents</Typography>
                </Link>
                <div 
                    className="flex gap-3 p-2 cursor-pointer rounded-md hover:bg-accent/10 transition-colors" 
                    onClick={onLogout}
                >
                    <LogoutIcon className="h-4 w-4 text-accent" />
                    <Typography className="text-foreground">Logout</Typography>
                </div>
            </div>
        </DropdownMenuContent>
    </DropdownMenu>
);

const WalletDisplay: React.FC<{
    address: string | undefined;
    isLoading: boolean;
}> = ({ address, isLoading }) => (
    <div className="hidden md:flex items-center min-w-[150px] bg-secondary rounded-full px-4 py-2 gap-2 text-foreground border border-accent/10">
        <WalletMinimal className="h-4 w-4 text-accent" />
        <Typography>{isLoading ? "Loading..." : address ? formatWalletAddress(address, 6, 3) : ""}</Typography>
    </div>
);
