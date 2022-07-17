import React, { createContext, useState } from "react";

export const userContext = createContext({
    page: 1,
    setPage: () => { },
    userId: "",
    setUserId: () => { }
})

const ContextStore = ({ children }) => {
    const [page, setPage] = useState(1);
    const [userId, setUserId] = useState("");

    return (
        <userContext.Provider value={{
            page,
            setPage,
            userId,
            setUserId
        }}>{children}</userContext.Provider>
    )
}

export default ContextStore;
