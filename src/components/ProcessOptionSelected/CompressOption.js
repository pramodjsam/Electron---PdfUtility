import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import { compressAction } from "../../actions/compress.actions";
import { useDispatch } from "react-redux";
import "./CompressOption.css";

const CompressOption = () => {
  const dispatch = useDispatch();
  const [compressMode, setCompressMode] = useState(1);

  const compressModeHandler = (mode) => {
    setCompressMode(mode);
    dispatch(compressAction(mode));
  };

  return (
    <div className="compress">
      {/* <h5 className="compress__title">Compression Level</h5> */}
      <div className="compress__mode" onClick={() => compressModeHandler(0)}>
        <div>
          <p className="compress__mode--title">Extreme Compression</p>
          <p className="compress__mode--desc">Less quality, high compression</p>
        </div>
        <div
          className={`compress__tick--icon ${
            compressMode === 0 && "compress__tick--icon-active"
          }`}
        >
          {compressMode === 0 && <TiTick size={20} />}
        </div>
      </div>

      <div className="divider"></div>

      <div className="compress__mode" onClick={() => compressModeHandler(1)}>
        <div>
          <p className="compress__mode--title">Recommended Compression</p>
          <p className="compress__mode--desc">good quality, good compression</p>
        </div>

        <div
          className={`compress__tick--icon ${
            compressMode === 1 && "compress__tick--icon-active"
          }`}
        >
          {compressMode === 1 && <TiTick size={20} />}
        </div>
      </div>

      <div className="divider"></div>

      <div className="compress__mode" onClick={() => compressModeHandler(2)}>
        <div>
          <p className="compress__mode--title">Less Compression</p>
          <p className="compress__mode--desc">High quality, less compression</p>
        </div>
        <div
          className={`compress__tick--icon ${
            compressMode === 2 && "compress__tick--icon-active"
          }`}
        >
          {compressMode === 2 && <TiTick size={20} />}
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default CompressOption;
