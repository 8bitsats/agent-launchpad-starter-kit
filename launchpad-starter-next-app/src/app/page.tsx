"use client";

import { useState } from 'react';

import {
  ArrowRight,
  Bot,
  Rocket,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { AnimatedContainer } from '@/components/animated-container';
import { Button } from '@/components/button';
import {
  Card,
  CardContent,
} from '@/components/card';
import { DeployAgentButton } from '@/components/deploy-agent-button';
import { Fireworks } from '@/components/fireworks';
import { PoweredByCrossmint } from '@/components/powered-by-crossmint';
import { SignInAuthButton } from '@/components/signin-auth-button';
import { Typography } from '@/components/typography';
import WalletTypeSelector from '@/components/wallet-type-selector';

import { useWallet } from './providers/wallet-provider';
import type { Wallet } from './types/wallet';

function HomePrimaryAction({ wallet }: { wallet: Wallet | null }) {
    const [agentSuccessfullyDeployed, setAgentSuccessfullyDeployed] = useState(false);

    if (wallet == null) {
        return <SignInAuthButton />;
    }

    if (agentSuccessfullyDeployed) {
        return (
            <>
                <Fireworks />
                <div className="flex gap-2 items-center justify-center min-h-[52px]">
                    <Button 
                        variant="accent" 
                        className="group"
                        asChild
                    >
                        <Link href="/agents" className="flex items-center gap-2">
                            View Rufus
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>
            </>
        );
    } else {
        return <DeployAgentButton setAgentSuccessfullyDeployed={setAgentSuccessfullyDeployed} />;
    }
}

export default function Home() {
    const { wallet, walletType, setWalletType } = useWallet();

    return (
        <div className="flex min-h-[calc(100vh-80px)] w-full items-center md:p-4 justify-center bg-gradient-to-b from-background to-background/70">
            <div className="flex flex-col pb-12 items-center p-4 gap-6 max-w-2xl">
                <AnimatedContainer initialAnimation="fadeIn" delay={100} className="flex flex-col gap-4 text-center max-w-[600px] pb-4">
                    <div className="flex justify-center mb-2">
                        <AnimatedContainer 
                            initialAnimation="slideDown" 
                            delay={300}
                            hoverEffect="glow"
                            className="p-3 bg-accent/10 rounded-full"
                        >
                            <Rocket className="h-10 w-10 text-accent" />
                        </AnimatedContainer>
                    </div>
                    <Typography
                        style={{
                            background: "linear-gradient(to right, #9f7efa, #1a8cff)",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                        }}
                        variant={"h1"}
                        className="text-4xl md:text-5xl font-bold tracking-tight"
                    >
                        Agent Launchpad
                    </Typography>
                    <Typography className="text-muted-foreground text-center text-lg">
                        A secure, non-custodial Next.js application for deploying AI agents with integrated wallet
                        functionality
                    </Typography>
                </AnimatedContainer>

                <AnimatedContainer initialAnimation="slideUp" delay={400} hoverEffect="lift" className="w-full">
                    <Card className="w-full border-accent/20 overflow-hidden">
                        <CardContent className="p-6">
                            <div className="flex gap-4 items-center">
                                <div className="w-16 h-16 flex items-center justify-center bg-accent/10 rounded-xl relative group">
                                    <Sparkles className="h-5 w-5 text-accent absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <Image src="/ai-agent.png" alt="ai agent" width={48} height={48} className="rounded-md group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-lg font-semibold text-accent">Agent Rufus</h2>
                                    <h5 className="text-muted-foreground">by Crossmint</h5>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </AnimatedContainer>

                <AnimatedContainer initialAnimation="slideUp" delay={600} hoverEffect="lift" className="w-full">
                    <Card className="w-full border-accent/20 p-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <Bot className="h-5 w-5 text-accent" />
                                <Typography className="font-medium">Select Wallet Type</Typography>
                            </div>
                            <WalletTypeSelector value={walletType} onChange={setWalletType} />
                        </div>
                    </Card>
                </AnimatedContainer>

                <AnimatedContainer initialAnimation="slideUp" delay={800} className="w-full max-w-64 mt-2">
                    <HomePrimaryAction wallet={wallet} />
                </AnimatedContainer>

                <AnimatedContainer initialAnimation="fadeIn" delay={1000}>
                    <PoweredByCrossmint />
                </AnimatedContainer>
            </div>
        </div>
    );
}
