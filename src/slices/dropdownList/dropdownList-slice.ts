import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DropDown {
    showList: boolean
    side: 'left' | 'right'
}

const initialState: DropDown = {
    showList: false,
    side: "left"
}

export const dropdownListSlice = createSlice(({
    name: 'dropdownList',
    initialState,
    reducers: {
        toggleShowList(state) {
            state.showList = !state.showList
        },

        setDropdownSide(state, action: PayloadAction<'left' | 'right'>) {
            state.side = action.payload
        }
    }
}))

export const {
    toggleShowList,
    setDropdownSide
} = dropdownListSlice.actions