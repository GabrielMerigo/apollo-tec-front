import { useState } from "react";
import clsx from "clsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { TbLayoutKanban, TbList } from "react-icons/tb";

interface ToogleSwitchProps {
  onClick: () => void;
}

const ToggleSwitch = ({ onClick }: ToogleSwitchProps) => {
  const [isLeft, setIsLeft] = useState(true);

  const handleClick = () => {
    onClick();
    setIsLeft(!isLeft);
  };

  return (
    <div className="toggle-switch-container" onClick={handleClick}>
      <div
        className={clsx("toggle-switch-background", {
          "left-active": isLeft,
          "right-active": !isLeft,
        })}
      ></div>

      <div className="toggle-icon-container">
        <div
          className={clsx("toggle-icon", {
            active: isLeft,
          })}
        >
          <TbList />
        </div>
      </div>

      <div className="toggle-icon-container">
        <div
          className={clsx("toggle-icon", {
            active: !isLeft,
          })}
        >
          <TbLayoutKanban />
        </div>
      </div>
    </div>
  );
};

export default ToggleSwitch;
