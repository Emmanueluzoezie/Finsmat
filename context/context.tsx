import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";


interface IstateContext {
    sidebar: boolean
    setSidebar: Dispatch<SetStateAction<boolean>>
    paymentType: boolean
    setPaymentType: Dispatch<SetStateAction<boolean>>
    showCode: boolean
    setShowCode: Dispatch<SetStateAction<boolean>>
    showCheckout: boolean,
    setShowCheckout: Dispatch<SetStateAction<boolean>>
}

const initialState = {
    sidebar: false,
    setSidebar: () => false,
    paymentType: false,
    setPaymentType: () => false,
    showCode: false,
    setShowCode: () => false,
    showCheckout: false,
    setShowCheckout: () => false,

}

const StateContext = createContext<IstateContext>(initialState)

interface Childern {
    children: React.ReactNode
}

export const ContextProvider: React.FC<Childern> = ({ children }) => {
    const [sidebar, setSidebar] = useState<boolean>(false)
    const [paymentType, setPaymentType] = useState<boolean>(false)
    const [showCode, setShowCode] = useState<boolean>(false)
    const [showCheckout, setShowCheckout] = useState<boolean>(false)


    return (
        <StateContext.Provider value={{
            sidebar,
            setSidebar, paymentType, setPaymentType, showCode, setShowCode, showCheckout, setShowCheckout
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useContextState = () => useContext(StateContext)