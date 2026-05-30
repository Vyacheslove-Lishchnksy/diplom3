"use client";

import { useState } from "react";
import Storage from "../api/Storage";
import { ButtonUI } from "./UI/ButtonUI";
import InputUI from "./UI/InputUI/InputUI";
import { useMQTTStore } from "../store/melodyStore";
import { useLocalization } from "../hooks/useLocalization";

export const ConnectionForm = () => {
  const deviceId = Storage.getDeviceId();
  const [id, setId] = useState(deviceId);
  const [value, setValue] = useState(deviceId);
  const { setDeviceId } = useMQTTStore((store) => store);
  const lang = useLocalization();

  const handleSubmit = () => {
    const newId = value ?? "";
    setDeviceId(newId);
    Storage.setDeviceId(newId);
    setId(newId);
  };

  return (
    <form className="flex justify-center items-center p-4 flex-col gap-4 min-h-32">
      <div className="flex flex-col gap-2">
        {
          <>
            <h2>
              {id ? lang.ChangeDeviceMenuTitle : lang.ChangeDeviceMenuTitleNo}
            </h2>
            <InputUI
              tabIndex={11}
              type="text"
              className="px-2 border border-green-100 rounded"
              id="deviceId"
              placeholder="device id"
              value={value ?? ""}
              onChange={(e) => setValue(e.target.value)}
            />
            <ButtonUI onClick={handleSubmit} tabIndex={12}>
              {id ? lang.ChangeButtonTitle : lang.ConnectButtonTitle}
            </ButtonUI>
          </>
        }
      </div>
    </form>
  );
};
