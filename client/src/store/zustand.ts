import {create} from "zustand"

interface ContractStore {
    analysisResults : any;
    setAnalysisResults: (results: any) => void
}

const useContractStore = create<ContractStore>((set) => ({
    analysisResults: undefined,
    setAnalysisResults: (results) => set ({analysisResults:results})
}));

type ModalStore = {
    modals: Record<string, boolean>;
    openModal: (key: string) => void;
    closeModal: (key: string) => void;
    isOpen: (key: string) => boolean;
};

const useModalStore = create<ModalStore>((set, get) => ({
    modals:{},
    openModal: (key:string) => 
        set((state) => ({modals:{...state.modals, [key]:true }})),
    closeModal: (key:string) => 
        set((state) => ({modals:{...state.modals, [key]:false }})),
    isOpen: (key:string) => Boolean(get().modals[key])

}))

export {useContractStore, useModalStore}