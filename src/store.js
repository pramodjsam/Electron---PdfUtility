import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { MEDIUM_QUALITY } from "./constants/compress.constants";
import { compressReducer } from "./reducers/compress.reducers";
import { documentReducer } from "./reducers/document.reducers";
import { processReducer } from "./reducers/process.reducers";

const middleware = [thunk];

const initialState = {
  process: { selected: "Merge PDF", started: false, pdfLoaded: false },
  compress: MEDIUM_QUALITY,
};

const reducers = combineReducers({
  document: documentReducer,
  process: processReducer,
  compress: compressReducer,
});

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
