import { types } from "../types/types";

const initialState = {
  modalOpen: false,
  modalBranchOpen: false,
  modalProjectOpen: false,
  activeAlert: false,
  activeModalTags: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.uiOpenModal:
      return {
        ...state,
        modalOpen: true,
      };
    case types.uiCloseModal:
      return {
        ...state,
        modalOpen: false,
      };
    case types.uiOpenModalTags:
      return {
        ...state,
        activeModalTags: true,
      };
    case types.uiCloseModalTags:
      return {
        ...state,
        activeModalTags: false,
      };
    case types.uiOpenBranchModal:
      return {
        ...state,
        modalBranchOpen: true,
      };
    case types.uiCloseBranchModal:
      return {
        ...state,
        modalBranchOpen: false,
      };
    case types.uiOpenProjectModal:
      return {
        ...state,
        modalProjectOpen: true,
      };
    case types.uiCloseProjectModal:
      return {
        ...state,
        modalProjectOpen: false,
      };
    case types.uiOpenAlert: {
      return {
        ...state,
        activeAlert: payload,
      };
    }
    case types.uiCloseAlert: {
      return {
        ...state,
        activeAlert: false,
      };
    }
    default:
      return state;
  }
};
