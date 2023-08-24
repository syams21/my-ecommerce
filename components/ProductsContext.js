import { createContext, useState } from "react";

export const ProductsContext = createContext({});

export function ProductsContextProvider({children}) {
    const [selectedProducts, setSelectedProducts] = useState([]);
    return (
        <ProductsContext.Provider value={{selectedProducts, setSelectedProducts}}>{children}</ProductsContext.Provider>
    );
}