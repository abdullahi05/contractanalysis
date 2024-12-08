import { api } from "@/lib/api";
import stripePromise from "@/lib/stripe";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Check } from "lucide-react";
import { Button } from "./ui/button";


export function PricingSection() {

    const handleUpgrade = async () => {
        try {
            const response = await api.get("/payments/create-checkout-session")
            const stripe = await stripePromise;
            await stripe?.redirectToCheckout({
                sessionId: response.data.sessionId
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-background to-background/80">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-center">
                Choose the Plan that&apos;s right for You
            </h2>
            <p className="text-lg text-muted-foreground mt-4 text-center max-w-3xl mx-auto">
                Select the perfect plan for you needs. Upgrade anytime to unlock premium
                features and support
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <PricingCard
                    title="Basic"
                    description="For Comprehensive Contract analysis"
                    price="Free"
                    period="/lifetime"
                    features={[
                        "Advanced contract analysis",
                        "Limited Projects",
                        "Chat with your Contract",
                        "5 Risks with severity levels",
                        "5 Opportunities with impact levels",
                        "Brief contract summary",
                        "Improvement Recommendations",

                    ]}
                    buttonText="Choose Plan"
                    onButtonClick={handleUpgrade}
                />
                <PricingCard
                    title="Premium"
                    description="For Comprehensive Contract analysis"
                    price="$9.99"
                    highlight
                    period="/lifetime"
                    features={[
                        "Advanced contract analysis",
                        "Unlimited Projects",
                        "Chat with your Contract",
                        "10+ Risks with severity levels",
                        "10+ Opportunities with impact levels",
                        "Comprehensive contract summary",
                        "Improvement Recommendations",
                        "Key Clauses identification",
                        "Legal Compliance Assessments",
                        "Negotiation Points",
                        "Contract duration analysis",
                        "Termination Conditions Summary",
                        "Compensation structure breakdown",
                        "Performance metrics identification",
                        "Intellectual property Clause Summary"

                    ]}
                    buttonText="Upgrade"
                    onButtonClick={handleUpgrade}
                />
            </div>
        </div>
    )
}

interface PricingCardProps {
    title: string,
    description: string,
    price: string;
    period: string;
    features: string[];
    buttonText: string;
    highlight?: boolean
    onButtonClick: () => void

}

function PricingCard({
    title,
    description,
    price,
    features,
    period,
    buttonText,
    highlight,
    onButtonClick,
}: PricingCardProps) {
    return (
        <Card className={`flex flex-col ${highlight ? "border-primary shadow-lg" :
            ""
            } relative overflow-hidden transition-all duration-300`}>
            <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                    {title}
                </CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow ">
                <p className="text-5xl font-extrabold mb-6">
                    {price}
                    <span className="text-base font-normal text-muted-foreground">
                        {period}
                    </span>
                </p>
                <ul className="space-y-2">
                    {features.map((feature, index) => (
                        <li className="flex items-center gap-2" key={index}><Check className="text-sky-500" />{feature}</li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button
                    className="w-full"
                    variant={highlight ? "default" : "outline"}
                    onClick={onButtonClick}
                >
                    {buttonText}
                </Button>
            </CardFooter>
        </Card>
    )
}