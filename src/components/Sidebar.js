import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { processList } from "../config/processConfig";
import { IconGenerator } from "../utils/iconUtils";
import { useDispatch } from "react-redux";
import { addProcess } from "../actions/process.actions";
import "./Sidebar.css";
import ProcessModal from "./ProcessModal";

function Sidebar() {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const processHandler = (process) => {
    dispatch(addProcess(process));
    setOpenModal(true);
  };

  return (
    <>
      <div className="sidebar">
        {processList.map((item, index) => (
          <div
            className="sidebar__button"
            key={index}
            onClick={() => processHandler(item.name)}
          >
            <div className="sidebar__info">
              <div className="sidebar__icon">
                <IconGenerator
                  IconComponent={item.icon}
                  color={item.color}
                  size="2rem"
                />
              </div>
              <div className="sidebar__title">{item.name}</div>
            </div>
            <FiChevronDown />
          </div>
        ))}
        {/* Modal */}
        <ProcessModal openModal={openModal} setOpenModal={setOpenModal} />
        {/*End of  Modal */}
      </div>
    </>
  );
}

export default Sidebar;
