import {
  ADD_PROCESS,
  CLEAR_PROCESS,
  PDF_RENDERED,
  PROCESS_END,
  PROCESS_START,
  REMOVE_OPTIONS,
  SPLIT_OPTIONS,
} from "../constants/process.constants";

export const processReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PROCESS:
      return { ...state, selected: action.payload };
    case PROCESS_START:
      return { ...state, started: action.payload };
    case PROCESS_END:
      return { ...state, started: action.payload };
    case PDF_RENDERED:
      return { ...state, pdfLoaded: action.payload };
    case SPLIT_OPTIONS:
      return { ...state, processOptions: action.payload };
    case REMOVE_OPTIONS:
      return { ...state, processOptions: action.payload };
    case CLEAR_PROCESS:
      return {
        ...state,
        selected: null,
        started: false,
        pdfLoaded: false,
        processOptions: null,
      };
    default:
      return state;
  }
};
