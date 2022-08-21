import { types } from "../types/types";

export const uiOpenModal = () => ({
    type: types.uiOpenModal
})
export const uiCloseModal = () => ({
    type: types.uiCloseModal
})
export const uiOpenBranchModal = () => ({
    type: types.uiOpenBranchModal
})
export const uiCloseBranchModal = () => ({
    type: types.uiCloseBranchModal
})
export const uiOpenProjectModal = () => ({
    type: types.uiOpenProjectModal
})
export const uiCloseProjectModal = () => ({
    type: types.uiCloseProjectModal
})
export const uiOpenAlert = (type,sms) => ({
    type: types.uiOpenAlert,
    payload : {
        type : type,
        sms: sms
    }
})
export const uiCloseAlert = () => ({
    type: types.uiCloseAlert
})