import { ADD_DOCUMENT, REMOVE_DOCUMENT } from "../constants/document.constants";

export const documentReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_DOCUMENT:
    case REMOVE_DOCUMENT:
    default:
      return state;
  }
};
