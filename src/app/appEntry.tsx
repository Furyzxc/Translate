import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/shared/style/style.css'
import { App } from './app.tsx'
import { appStore } from "./appStore.ts";
import { Provider as ReduxProvider } from "react-redux";
import { requestLanguages } from "@/features/languages/languages-thunks.ts";

const root = document.getElementById('root')!

const initApp = async () => {
    await appStore.dispatch(requestLanguages())
}

initApp().then(() =>
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <ReduxProvider store={appStore}>
                <App/>
            </ReduxProvider>
        </React.StrictMode>,
    ))
