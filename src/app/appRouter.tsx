import { createBrowserRouter } from "react-router-dom";
import { App } from "@/app/app.tsx";

export const appRouter = createBrowserRouter([
    {
        path: '*',
        element: <App />
    }
])
