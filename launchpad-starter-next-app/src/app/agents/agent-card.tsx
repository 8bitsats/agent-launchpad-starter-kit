import {
  Activity,
  Cpu,
  Database,
  Server,
} from 'lucide-react';

import { Button } from '@/components/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/card';
import { Typography } from '@/components/typography';

import type { Cvm } from '../types/phala';

export default function AgentCard({ agent }: { agent: Cvm }) {
    return (
        <Card 
            className="w-full transition-all duration-300 hover:translate-y-[-4px] hover:shadow-heavy" 
            key={agent.hosted.id}
        >
            <CardHeader className="pb-2">
                <div className="flex justify-between flex-wrap items-start">
                    <div className="flex flex-col">
                        <Typography className="text-lg font-semibold text-accent">
                            {agent.hosted.name}
                        </Typography>
                        <div className="flex flex-col space-y-1 mt-1">
                            <Typography className="text-xs text-muted-foreground">ID: {agent.hosted.id}</Typography>
                            <Typography className="text-xs text-muted-foreground">Instance: {agent.hosted.instance_id}</Typography>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-full">
                        <div
                            className={`w-2 h-2 rounded-full ${
                                agent.status === "running" ? "bg-green-500" : "bg-yellow-500"
                            }`}
                        />
                        <Typography className="text-xs font-medium capitalize">{agent.status}</Typography>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-2 gap-6 mt-2">
                    <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-accent" />
                        <div>
                            <Typography className="text-xs text-muted-foreground">Uptime</Typography>
                            <Typography className="text-sm font-medium">{agent.hosted.uptime}</Typography>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Server className="h-4 w-4 text-accent" />
                        <div>
                            <Typography className="text-xs text-muted-foreground">Node</Typography>
                            <Typography className="text-sm font-medium">{agent.node.name}</Typography>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-accent" />
                        <div>
                            <Typography className="text-xs text-muted-foreground">Memory</Typography>
                            <Typography className="text-sm font-medium">{agent.hosted.configuration.memory}MB</Typography>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-accent" />
                        <div>
                            <Typography className="text-xs text-muted-foreground">vCPU</Typography>
                            <Typography className="text-sm font-medium">{agent.hosted.configuration.vcpu}</Typography>
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex gap-3 pt-2">
                <Button
                    variant="accent"
                    size="sm"
                    className="text-sm flex-1"
                    onClick={() => window.open(agent.dapp_dashboard_url, "_blank")}
                >
                    Dashboard
                </Button>
                <Button
                    variant="secondary"
                    size="sm"
                    className="text-sm flex-1"
                    onClick={() => window.open(agent.syslog_endpoint, "_blank")}
                >
                    Logs
                </Button>
            </CardFooter>
        </Card>
    );
}
