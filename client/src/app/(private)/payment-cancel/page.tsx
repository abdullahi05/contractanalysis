"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UploadModal } from "@/components/modals/upload-modal";
import { api } from "@/lib/api";
import stripePromise from "@/lib/stripe";

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

export default function PaymentSuccess() {
    const [isUploadModalOpen, setisUploadModalOpen] = useState(false)

    return (
        <>
            <div className="min-h-screen flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-500">
                            Payment Was Cancelled
                        </CardTitle>
                        <CardDescription>
                            Your payment didnt go through. Please try Again
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">

                            <div className="bg-blue-50 border-l-4 border-red-500 p-4">
                                <div className="flex items-center">
                                    <p className="text-sm text-red-700 text-left">
                                        <strong>Note:</strong>
                                        <br />
                                        You payment has been cancelled
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="flex flex-col w-full space-y-2">
                            <Button
                                onClick={handleUpgrade}
                                className="w-full"
                            >
                                Try Again
                            </Button>
                            <Button
                                className="w-full"
                                asChild
                                variant={"outline"}
                            >
                                <Link href="/dashboard">Go to Dashboard </Link>
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
            <UploadModal
                isOpen={isUploadModalOpen}
                onClose={() => setisUploadModalOpen(false)}
                onUploadComplete={() => setisUploadModalOpen(true)}
            />
        </>
    )
}