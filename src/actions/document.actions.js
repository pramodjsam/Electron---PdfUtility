import { ADD_DOCUMENT, REMOVE_DOCUMENT } from "../constants/document.constants";

export const addDocument = () => (dispatch) => {
  try {
    dispatch({
      type: ADD_DOCUMENT,
    });
  } catch (error) {
    console.log();
  }
};
