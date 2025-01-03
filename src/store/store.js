import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: {
                // Disable the immutable state check in development
                warnAfter: 1000, // You can set a higher threshold or disable completely
            },
            serializableCheck: false, // Optional: Disable serializable check if needed
        }),
})