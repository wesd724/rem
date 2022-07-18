import React, { createContext, useState } from "react";

export const userContext = createContext({
    page: 1,
    setPage: () => { }
})

const ContextStore = ({ children }) => {
    const [page, setPage] = useState(1);

    return (
        <userContext.Provider value={{
            page,
            setPage
        }}>{children}</userContext.Provider>
    )
}

export default ContextStore;
