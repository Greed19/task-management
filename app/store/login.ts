import {create} from 'zustand';

export interface Login{
    isAuthenticated : boolean,
    login : () => void,
    logout: () => void
}

export const useLoginStore = create<Login>()((set) => ({
    isAuthenticated: false,
    login : () => {
        set((state) => ({isAuthenticated: true}))
    },logout: () => {
        set((state) => ({isAuthenticated: false}))
    }
}))
