"use client"


import ContractAnalysisResults from "@/components/analysis/contract-analysis-results";
import EmptyState from "@/components/analysis/empty-state";
import { useSubscription } from "@/hooks/use-subscription";
import { api } from "@/lib/api";
import stripePromise from "@/lib/stripe";
import { useContractStore } from "@/store/zustand";
import { toast } from "sonner";

export default function ContractResultsPage() {
    const analysisResults = useContractStore((state) => state.analysisResults);

    const {subscriptionStatus,isSubscriptionLoading, isSubscriptionError, setLoading} = useSubscription()

    if(!subscriptionStatus){
        return <div>Loading...</div>
    }

    const isActive = subscriptionStatus.status === "active"

    const handleUpgrade = async () => {
        setLoading(true);
        if(!isActive){
            try {
                const response = await api.get("/payments/create-checkout-session")
                const stripe = await stripePromise;
                await stripe?.redirectToCheckout({
                    sessionId: response.data.sessionId
                })
            } catch (error) {
                toast.error("Lets login first or try again later")
            } finally {
                setLoading(false)
            }
        } else {
            toast.error("You are already a premium Member")
        }
    }

    if(!analysisResults){
        return <EmptyState title="No Analysis" description="Please Try Again"/>
    }

    return (
        <ContractAnalysisResults
            contractId={analysisResults._id}
            isActive={isActive}
            analysisResults={analysisResults}
            onUpgrade={handleUpgrade}

        />
    )
}