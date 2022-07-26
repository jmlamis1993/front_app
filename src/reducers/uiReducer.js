import { types } from "../types/types"

const initialState = {
    modalOpen: false,
    modalBranchOpen: false,
    modalProjectOpen: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case types.uiOpenModal:
    return { 
        ...state,
        modalOpen: true
    }
    case types.uiCloseModal:
        return { 
            ...state,
            modalOpen: false
        }
    case types.uiOpenBranchModal:
      return { 
        ...state,
        modalBranchOpen: true
    }
    case types.uiCloseBranchModal:
      return { 
        ...state,
        modalBranchOpen: false
    }
    case types.uiOpenProjectModal:
      return { 
        ...state,
        modalProjectOpen: true
    }
    case types.uiCloseProjectModal:
      return { 
        ...state,
        modalProjectOpen: false
    }

  default:
    return state;
  }
}
