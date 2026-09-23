"use client";

import { useState } from "react";
import Storage from "../api/Storage";
import { ButtonUI } from "./UI/ButtonUI";
import { useMQTTStore } from "../store/melodyStore";
import { useLocalization } from "../hooks/useLocalization";
import { DropDownInput } from "./UI/DropDownInput/DropDownInput";

export const ConnectionForm = () => {
  const lang = useLocalization();
  const { deviceIdList, removeDeviceId, setDeviceId, deviceId, addDeviceId } = useMQTTStore()
  const [id, setId] = useState(deviceId);
  const [value, setValue] = useState(deviceId);

  const handleSubmit = () => {
    const newId = value ?? "";
    setDeviceId(newId);
    if (!deviceIdList.includes(deviceId)) {
      addDeviceId(deviceId);
    }
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
            <DropDownInput list={deviceIdList}
             placeholder="device id"
             tabIndex={11}
              type="text"
              value={value ?? ""}
              onChange={(e) => {
                setValue(e.target.value)}
              }
              onDelete={removeDeviceId}
              className="px-2 border border-green-100 rounded"
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
