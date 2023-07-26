import { SelectLanguage } from "@/entities/selectLanguage";
import { SwapLanguages } from "@/entities/swapLanguages/swapLanguages.tsx";
import React from "react";

export const Select = React.memo(() => {
    return (
        <div className='select'>
            {/* Language selection component for the source language */}
            <SelectLanguage side='left'/>
            {/* Component to swap the source and target languages */}
            <SwapLanguages/>
            {/* Language selection component for the target language */}
            <SelectLanguage side='right'/>
        </div>
    );
})