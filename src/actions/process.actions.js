import {
  ADD_PROCESS,
  CLEAR_PROCESS,
  PDF_RENDERED,
  PROCESS_END,
  PROCESS_START,
  REMOVE_OPTIONS,
  SPLIT_OPTIONS,
} from "../constants/process.constants";

export const addProcess = (process) => (dispatch) => {
  try {
    dispatch({ type: ADD_PROCESS, payload: process });
  } catch (error) {
    console.log(error);
  }
};

export const clearProcess = () => (dispatch) => {
  try {
    dispatch({ type: CLEAR_PROCESS });
  } catch (error) {
    console.log(error);
  }
};

export const startProcess = () => (dispatch) => {
  try {
    dispatch({ type: PROCESS_START, payload: true });
  } catch (error) {
    console.log(error);
  }
};

export const endProcess = () => (dispatch) => {
  try {
    dispatch({ type: PROCESS_END, payload: false });
  } catch (error) {
    console.log(error);
  }
};

export const pdfLoaded = (data) => (dispatch) => {
  try {
    dispatch({ type: PDF_RENDERED, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const splitOptions = (data) => (dispatch) => {
  try {
    dispatch({ type: SPLIT_OPTIONS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const removeOptions = (data) => (dispatch) => {
  try {
    dispatch({ type: REMOVE_OPTIONS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
