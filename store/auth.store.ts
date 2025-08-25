import { checkActiveSession, getCurrentUser } from '@/lib/appwrite'
import { User } from '@/type'
import { create } from 'zustand'

type UserAuth = {
    isAuthenticated: Boolean,
    user: User | null,
    isLoading: Boolean,

    setIsAuthenticated: (value: boolean) => void,
    setIsLoading: (value: boolean) => void,
    setUser: (user: User | null) => void,
    fetchAuthenticatedUser: () => Promise<void> 
}

const useAuthStore = create<UserAuth>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: true,

    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    setIsLoading: (value) => set({isLoading: value}),
    setUser: (user) => set({ user }),
    fetchAuthenticatedUser: async () => {
        set({ isLoading: true });

        try
        {
            // First check if there's an active session
            const hasSession = await checkActiveSession();
            
            if (!hasSession) {
                set({ isAuthenticated: false, user: null });
                return;
            }

            const user = await getCurrentUser();
            
            if (user) {
                set({ user: {name: user.name, email: user.email, avatar: user.avatar, ...user}, isAuthenticated: true });
            } else {
                set({ isAuthenticated: false, user: null });
            }
        }
        catch(e)
        {
            console.log('Error getting the current user', e);
            set({ isAuthenticated: false, user: null });
        }
        finally
        {
            set({ isLoading: false });
        }
    }
}))

export default useAuthStore;