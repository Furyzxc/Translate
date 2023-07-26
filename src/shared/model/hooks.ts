import { AppDispatch, RootState } from "@/app/appStore.ts";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createRef, RefObject } from "react";


export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector



/**
 * Custom hook to copy the text content of a DOM element to the clipboard.
 *
 * @returns {Object} An object containing the following properties and methods:
 *  - textRef: A mutable ref to hold the reference to the DOM element whose text content needs to be copied.
 *  - copyText: A function to trigger the copy action, which copies the text content of the referenced DOM element to the clipboard.
 */
export const useCopyText = (): { copyText: () => void; textRef: RefObject<HTMLDivElement> } => {
    /**
     * A mutable ref to hold the reference to the DOM element whose text content needs to be copied.
     * Usage: Attach this ref to the desired DOM element like <div ref={textRef}>Text to be copied</div>
     * The text content of the element with this ref will be copied when calling `copyText`.
     */
    const textRef = createRef<HTMLDivElement>();

    /**
     * Copy the text content of the DOM element with the ref `textRef` to the clipboard.
     * The function uses the Clipboard API to perform the copy operation.
     * If the text content is empty or the DOM element with the ref is not found, no action will be taken.
     */
    const copyText = () => {
        if (textRef.current) {
            const text = textRef.current.textContent;
            navigator.clipboard.writeText(text || '').then()
        }
    };

    return { textRef, copyText };
}