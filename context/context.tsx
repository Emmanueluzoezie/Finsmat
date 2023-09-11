import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";



interface ClickedItem {
    brand: string;
    category: string;
    description: string;
    discountPercentage: string;
    id: number;
    images: any[];
    price: string;
    rating: number;
    stock: string;
    thumbnail: string;
    title: string;
}
interface IstateContext {
    sidebar: boolean
    setSidebar: Dispatch<SetStateAction<boolean>>
    paymentType: boolean
    setPaymentType: Dispatch<SetStateAction<boolean>>
    showCode: boolean
    setShowCode: Dispatch<SetStateAction<boolean>>
    showCheckout: boolean,
    setShowCheckout: Dispatch<SetStateAction<boolean>>
    showProductDetails: boolean,
    setShowProductDetails: Dispatch<SetStateAction<boolean>>
    clickedItem: ClickedItem | null,
    setClickedItem: Dispatch<SetStateAction<ClickedItem | null>>
    addToCart: (product: ClickedItem) => void;
    removeFromCart: (product: ClickedItem) => void;
    cartItems: { [key: number]: ClickedItem & { quantity: number } };
    setCartItems: Dispatch<SetStateAction<{ [key: number]: ClickedItem & { quantity: number } }>>;
    cartProducts: ClickedItem[]
    setCartProducts: Dispatch<SetStateAction<ClickedItem[]>>;
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
    showProductDetails: false,
    setShowProductDetails: () => false,
    clickedItem: null,
    setClickedItem: () => null,
    addToCart: (product: ClickedItem) => { },  // Added this line
    removeFromCart: (product: ClickedItem) => {},
    cartItems: [],
    setCartItems: () => { },
    cartProducts: [],
    setCartProducts: () => [],

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
    const [showProductDetails, setShowProductDetails] = useState<boolean>(false)
    const [cartProducts, setCartProducts] = useState<ClickedItem[]>([])
    const [cartItems, setCartItems] = useState<{ [key: number]: ClickedItem & { quantity: number } }>({});

    const [clickedItem, setClickedItem] = useState<ClickedItem | null>(null)


    const addToCart = (product: ClickedItem) => {
        // if(!product) return
        const existingProduct = cartItems[product.id];
        if (existingProduct) {
            setCartItems({
                ...cartItems,
                [product.id]: { ...existingProduct, quantity: existingProduct.quantity + 1 },
            });
        } else {
            setCartItems({
                ...cartItems,
                [product.id]: { ...product, quantity: 1 },
            });
            setCartProducts([...cartProducts, product])
        }
    };

    const removeFromCart = (product: ClickedItem) => {
        if (!product) return
        const existingProduct = cartItems[product.id];
        if (existingProduct) {
            if (existingProduct.quantity > 1) {
                setCartItems({
                    ...cartItems,
                    [product.id]: { ...existingProduct, quantity: existingProduct.quantity - 1 },
                });
            } else {
                const newCart = { ...cartItems };
                delete newCart[product.id];
                setCartItems(newCart);
                setCartProducts([...cartProducts, product ])
            }
        }
    };


    return (
        <StateContext.Provider value={{
            sidebar,
            setSidebar, paymentType, setPaymentType, showCode, setShowCode, showCheckout, setShowCheckout, showProductDetails, setShowProductDetails, clickedItem, setClickedItem, addToCart, removeFromCart, cartItems, setCartItems, cartProducts, setCartProducts
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useContextState = () => useContext(StateContext)