import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { UploadModal } from "../modals/upload-modal";

interface IEmptyStateProps {
    title: string;
    description: string;
}


export default function EmptyState({ title, description }: IEmptyStateProps) {
    const [isUploadModalOpen, setisUploadModalOpen] = useState(false)

    return (
        <>
            <div className="flex items-center justify-center p-4 mt-10">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-500">
                            {title}
                        </CardTitle>
                        <CardDescription>
                            {description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p>
                                Please Upload a Document (PDF) to start Analysing
                            </p>
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                                <div className="flex items-center">
                                    <p className="text-sm text-blue-700 text-left">
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