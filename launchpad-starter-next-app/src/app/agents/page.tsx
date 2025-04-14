"use client";

import {
  Bot,
  Loader2,
  ServerCrash,
} from 'lucide-react';

import { AnimatedContainer } from '@/components/animated-container';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/card';
import { PoweredByCrossmint } from '@/components/powered-by-crossmint';
import { Typography } from '@/components/typography';
import { useQuery } from '@tanstack/react-query';

import { getMyDeployedAgents } from '../_actions/get-agents';
import { useWallet } from '../providers/wallet-provider';
import AgentCard from './agent-card';

export default function Index() {
    const { isLoading } = useWallet();

    const { data, isLoading: isLoadingAgents } = useQuery({
        queryKey: ["agents"],
        queryFn: getMyDeployedAgents,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    if (isLoading || isLoadingAgents) {
        return (
            <div className="p-6 flex h-full w-full items-center gap-6 justify-center flex-col">
                <AnimatedContainer initialAnimation="fadeIn" className="w-full sm:max-w-3xl">
                    <Card className="w-full shadow-heavy min-h-[560px] p-6 border-accent/20">
                        <div className="flex flex-col items-center justify-center h-full w-full gap-4">
                            <Loader2 className="h-10 w-10 text-accent animate-spin" />
                            <Typography className="text-muted-foreground">Loading agents...</Typography>
                        </div>
                    </Card>
                </AnimatedContainer>
                <PoweredByCrossmint className="pt-6" />
            </div>
        );
    }

    const hasAgents = data && data.length > 0;

    return (
        <div className="p-6 flex h-full w-full items-center pt-6 gap-6 justify-center flex-col">
            <AnimatedContainer initialAnimation="slideDown" className="w-full sm:max-w-3xl">
                <Card className="w-full shadow-heavy min-h-[664px] border-accent/20">
                    <CardHeader className="border-b border-border/30">
                        <div className="flex items-center gap-3">
                            <AnimatedContainer 
                                initialAnimation="fadeIn" 
                                delay={300}
                                hoverEffect="scale"
                                className="p-1"
                            >
                                <Bot className="h-6 w-6 text-accent" />
                            </AnimatedContainer>
                            <Typography className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                                Deployed Agents
                            </Typography>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        {hasAgents ? (
                            <div className="flex flex-col w-full gap-6">
                                {data.map((agent, index) => (
                                    <AnimatedContainer 
                                        key={agent.hosted.id} 
                                        initialAnimation="slideUp" 
                                        delay={200 + (index * 100)}
                                    >
                                        <AgentCard agent={agent} />
                                    </AnimatedContainer>
                                ))}
                            </div>
                        ) : (
                            <AnimatedContainer initialAnimation="fadeIn" delay={300} className="flex flex-col items-center justify-center h-[400px] w-full gap-4">
                                <div className="relative">
                                    <ServerCrash className="h-16 w-16 text-muted opacity-30" />
                                    <AnimatedContainer 
                                        initialAnimation="fadeIn" 
                                        delay={1000}
                                        className="absolute -top-2 -right-2 bg-accent/10 rounded-full p-1"
                                    >
                                        <Bot className="h-6 w-6 text-accent" />
                                    </AnimatedContainer>
                                </div>
                                <Typography className="text-muted-foreground text-center">
                                    No agents deployed yet
                                </Typography>
                            </AnimatedContainer>
                        )}
                    </CardContent>
                </Card>
            </AnimatedContainer>
            <AnimatedContainer initialAnimation="fadeIn" delay={500}>
                <PoweredByCrossmint className="pt-6" />
            </AnimatedContainer>
        </div>
    );
}
