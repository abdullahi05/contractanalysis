import { cn } from "@/lib/utils";
import { ArrowRight, FileSearch, Globe, Hourglass, PiggyBank, Scale, ShieldCheck, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useModalStore } from "@/store/zustand";
import { useCurrentUser } from "@/hooks/use-current-user";

const features = [
    {
        title: "AI-powered Analysis",
        description: "Leverage advace AI to Analyze contracts Quickly and Accurately",
        icon: FileSearch
    },
    {
        title: "Risk Identification",
        description: "Spot potential risks and opportunities in your contracts",
        icon: ShieldCheck
    },
    {
        title: "Streamlined Negotiations",
        description: "Accelerat the negotiation process with AI-driven insights",
        icon: Hourglass
    },
    {
        title: "Cost Reduction",
        description: "Significnatly reduce legal costs through automation",
        icon: PiggyBank
    },
    {
        title: "Improved Compliance",
        description: "Significnatly reduce legal costs through automation",
        icon: Scale
    },
    {
        title: "Faster Turnaround",
        description: "Complete contract reviews in minutes instead of hours",
        icon: Zap
    },
]

export function HeroSection() {
    const { user } = useCurrentUser();
    const { openModal } = useModalStore()
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b 
        from-background to-background/80">
            <div className="container px-4 md:px-6 flex flex-col items-center max-w-6xl mx-auto">
                <Link href={"/dashboard"}
                    className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "px-4 py-2 mb-4 rounded-full hidden md:flex"
                    )}
                >
                    <span className="mr-3 hidden md:block">
                        <Sparkles className="size-3.5" />
                    </span>
                    Analyze your Contracts with AI
                </Link>
                <div className="text-center mb-12 w-full">
                    <h1 className="text-4xl font-extrabold tracking-tight 
                    sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary
                    to-secondary mb-4">
                        AnalzeContracts Helps you analyze your Contracts just like
                        a Lawyer would,
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                        its just Cheaper, faster and Anytime Anywhere
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        {user ? (
                            <>
                                <Link href={"/dashboard"} className={buttonVariants({ variant: "outline" })}>Continue to Dashboard</Link>
                            </>
                        ) : (
                            <>
                                <Button onClick={() => openModal("connectAccountModal")} className="inline-flex items-center justify-center txt-lg"
                                    size={"lg"}>
                                    Get Started
                                    <ArrowRight className="ml-2 size-5" />
                                </Button>
                                <Button className="inline-flex items-center justify-center txt-lg"
                                    size={"lg"} variant={"outline"}>
                                    Learn More
                                    <Globe className="ml-2 size-5" />
                                </Button>
                            </>
                        )}

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-12">
                        {
                            features.map((feature, index) => (
                                <Card key={index} className="h-full">
                                    <CardContent className="p-6 flex flex-col items-center
                                    text-center">
                                        <div className="size-12 rounded-full bg-primary/10
                                        flex items-center justify-center mb-4">
                                            <feature.icon className="text-primary" />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}