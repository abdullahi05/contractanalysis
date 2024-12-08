"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UploadModal } from "@/components/modals/upload-modal";



export default function PaymentSuccess() {
    const [isUploadModalOpen, setisUploadModalOpen] = useState(false)

    return (
        <>
            <div className="min-h-screen flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-500">
                            Payment Successful
                        </CardTitle>
                        <CardDescription>
                            Thank you for using Analyze Contract Services
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p>
                                Go Ahead and Enjoy our Services
                            </p>
                            <div className="bg-blue-50 border-l-4 border-green-500 p-4">
                                <div className="flex items-center">
                                    <p className="text-sm text-green-700 text-left">
                                        <strong>Note:</strong>
                                        <br />
                                        Please Upload your contract in PDF or Docx Format.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="flex flex-col w-full space-y-2">
                            <Button
                                onClick={() => setisUploadModalOpen(true)}
                                className="w-full"
                            >
                                Upload a Document
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