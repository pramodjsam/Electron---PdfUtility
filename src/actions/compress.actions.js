import {
  HIGH_QUALITY,
  LOW_QUALITY,
  MEDIUM_QUALITY,
} from "../constants/compress.constants";

export const compressAction = (selectedMode) => (dispatch) => {
  try {
    switch (selectedMode) {
      case 0:
        return dispatch({ type: LOW_QUALITY });
      case 1:
        return dispatch({ type: MEDIUM_QUALITY });
      case 2:
        return dispatch({ type: HIGH_QUALITY });
      default:
        return dispatch({ type: MEDIUM_QUALITY });
    }
  } catch (error) {
    console.log();
  }
};
