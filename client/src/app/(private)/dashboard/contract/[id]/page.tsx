"use client";

import { use } from "react";
import ContractResults from "./_components/contract-results";

interface IContractResultsProps {
    params: Promise<{ id: string }>;
}

export default function ContractPage({ params }: IContractResultsProps) {
    const { id } = use(params);

    return <ContractResults contractId={id} />;
}
