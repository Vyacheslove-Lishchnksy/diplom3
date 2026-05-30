"use client";

import { useEffect } from "react";
import { useMQTTStore, useStateStore } from "../store/melodyStore";
import { subscribeToStatus } from "../api/actions";

export const useStatusCheck = () => {
  const setStatus = useStateStore((store) => store.setStatus);
  const deviceId = useMQTTStore((store) => store.deviceId);
  useEffect(() => {
    let unsubscribe = () => {};

    unsubscribe = subscribeToStatus(deviceId, (newStatus) => {
      setStatus(newStatus);
    });

    return () => unsubscribe();
  }, [deviceId, setStatus]);
};
