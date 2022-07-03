import { createContext, useContext, useEffect, useState } from 'react';

const Crypto = createContext();
export const CryptoState = () => useContext(Crypto);

export const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState("KRW");
    const [symbol, setSymbol] = useState("₩");

    useEffect(()=>{
        if(currency === "KRW") setSymbol("₩");
        else if(currency === "USD") setSymbol("$");
    },[currency]);

    const value = { 
        currency, 
        setCurrency, 
        symbol
    }

    return <Crypto.Provider value={value}> {children} </Crypto.Provider>
};