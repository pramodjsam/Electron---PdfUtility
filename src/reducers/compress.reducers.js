import {
  HIGH_QUALITY,
  LOW_QUALITY,
  MEDIUM_QUALITY,
} from "../constants/compress.constants";

export const compressReducer = (state = null, action) => {
  switch (action.type) {
    case LOW_QUALITY:
      return LOW_QUALITY;
    case MEDIUM_QUALITY:
      return MEDIUM_QUALITY;
    case HIGH_QUALITY:
      return HIGH_QUALITY;
    default:
      return state;
  }
};
