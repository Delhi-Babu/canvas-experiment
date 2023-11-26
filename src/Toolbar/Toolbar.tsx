import React from "react";
import { FaRegCircle } from "react-icons/fa6";
import { FaRegSquare } from "react-icons/fa";
import classNames from "classnames";
import { ETools } from "../constants";

interface IOwnProps {
  activeTool: ETools;
  setActiveTool: React.Dispatch<React.SetStateAction<ETools>>;
}

const Toolbar = (props: IOwnProps) => {
  const { activeTool, setActiveTool } = props;
  return (
    <div className="toolbar-wrapper">
      <div
        className={classNames("tool", { active: activeTool === ETools.SQUARE })}
        onClick={() => setActiveTool(ETools.SQUARE)}
      >
        <FaRegSquare size={30} />
      </div>
      <div
        className={classNames("tool", { active: activeTool === ETools.CIRCLE })}
        onClick={() => setActiveTool(ETools.CIRCLE)}
      >
        <FaRegCircle size={30} />
      </div>
    </div>
  );
};

export default Toolbar;
