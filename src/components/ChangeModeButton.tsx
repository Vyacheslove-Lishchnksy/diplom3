import { JSX } from "react";
import SimpleSmallButtonUI from "./UI/SimpleSmallButtonUI/SimpleSmallButtonUI";
import { BsBrowserChrome } from "react-icons/bs";
import { TbDeviceIpadFilled } from "react-icons/tb";
import { useStateStore } from "../store/stateStore";

const ChangeModeButton = (): JSX.Element => {
  const { currentOutputMode, setOutputMode } = useStateStore((state) => state);

  return (
    <SimpleSmallButtonUI
      onClick={() => {
        setOutputMode(
          currentOutputMode === "browserOutput"
            ? "deviceOutput"
            : "browserOutput",
        );
      }}
    >
      {currentOutputMode === "browserOutput" ? (
        <BsBrowserChrome title="Browser mode" />
      ) : (
        <TbDeviceIpadFilled
          style={{ width: "1.2rem", height: "1.2rem" }}
          title="Device mode"
        />
      )}
    </SimpleSmallButtonUI>
  );
};

export default ChangeModeButton;
