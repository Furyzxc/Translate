import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/shared/style/style.css'
import { appStore } from "./appStore.ts";
import { appRouter } from "@/app/appRouter.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { requestLanguages } from "@/slices/languages/languages-thunks.ts";
import { RouterProvider } from "react-router-dom";

const root = document.getElementById('root')!

const initApp = async () => {
    await appStore.dispatch(requestLanguages())
}

initApp().then(() =>
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <ReduxProvider store={appStore}>
                <RouterProvider router={appRouter}/>
            </ReduxProvider>
        </React.StrictMode>,
    ))
