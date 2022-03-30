import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { splitOptions } from "../../actions/process.actions";
import "./SplitOption.css";

const SplitOption = () => {
  const dispatch = useDispatch();
  const [selectedMode, setSelectedMode] = useState(0);
  const [extractPages, setExtractPages] = useState("");

  useEffect(() => {
    dispatch(splitOptions({ mode: selectedMode, pages: extractPages }));
  }, []);

  // Split Mode Handler
  const modeHandler = (mode) => {
    if (mode == 0) {
      setExtractPages("");
    }
    setSelectedMode(mode);
    dispatch(splitOptions({ mode, pages: extractPages }));
  };

  return (
    <div className="split">
      <h5 className="split__title">Extract Mode</h5>
      <div className="split__mode">
        <div
          className={
            selectedMode === 0
              ? `split__mode--extract split__mode--extract-active`
              : `split__mode--extract`
          }
          onClick={() => modeHandler(0)}
        >
          Extract all pages
        </div>

        <div
          className={
            selectedMode === 1
              ? `split__mode--select split__mode--select-active`
              : `split__mode--select`
          }
          onClick={() => modeHandler(1)}
        >
          Select pages
        </div>
      </div>

      {selectedMode === 1 && (
        <div className="extract__box">
          <label htmlFor="pageNumber">Pages to extract</label>
          <input
            type="text"
            id="pageNumber"
            value={extractPages}
            onChange={(e) => {
              setExtractPages(e.target.value);
              dispatch(
                splitOptions({
                  mode: selectedMode,
                  pages: e.target.value,
                })
              );
            }}
            placeholder="example: 6-8"
          />
        </div>
      )}
    </div>
  );
};

export default SplitOption;
