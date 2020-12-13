import React, { useReducer, createContext, useEffect } from 'react';
import { authFn } from "../firebase";

// reducer
const firebaseReducer = (state, action) => {
    switch (action.type) {
        case "LOGGED_IN_USER":
            return { ...state, user: action.payload }
            break;
        default:
            return state
            break;
    }
}

// state
const initialState = {
    user: null
}


//create context

const AuthContext = createContext()

// context Provider

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(firebaseReducer, initialState);

    useEffect(() => {
        console.log('useEffect');
        const unsubscribe = authFn.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();
                dispatch({ type: 'LOGGED_IN_USER', payload: { email: user.email, token: idTokenResult.token } })
            } else {
                dispatch({ type: 'LOGGED_IN_USER', payload: null })
            }
        })
        return () => unsubscribe()
    }, [])

    const value = { state, dispatch };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

}


export { AuthContext, AuthProvider }