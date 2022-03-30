import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeOptions } from "../../actions/process.actions";

const RemoveOption = () => {
  const dispatch = useDispatch();
  const [removePages, setRemovePages] = useState("");

  return (
    <div className="remove">
      <label>Remove pages:</label>
      <input
        type="text"
        placeholder="example: 6-8"
        value={removePages}
        onChange={(e) => {
          setRemovePages(e.target.value);
          dispatch(removeOptions(e.target.value));
        }}
      />
    </div>
  );
};

export default RemoveOption;
