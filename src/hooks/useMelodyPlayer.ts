import { useStateStore, useMQTTStore } from "../store/melodyStore";
import { playerInstance } from "../api/playRTTTL";
import { sendBuzzerCommand, publishMelody } from "../api/actions";
import { useEffect } from "react";

export const useMelodyPlayer = (melodyCode: string) => {
  const {
    currentStatus: status,
    currentOutputMode,
    isPlaying,
    setIsPlaying,
  } = useStateStore();
  const { deviceId } = useMQTTStore();

  const melodyName = melodyCode.slice(0, melodyCode.indexOf(":"));

  useEffect(() => {
    const handleEnd = () => setIsPlaying(false);
    playerInstance.onEnd = handleEnd;
    return () => {
      if (playerInstance.onEnd === handleEnd) playerInstance.onEnd = undefined;
    };
  }, [setIsPlaying]);

  const togglePlayback = async () => {
    if (currentOutputMode === "deviceOutput") {
      if (status.melody === melodyName && status.state !== "stopped") {
        sendBuzzerCommand(deviceId, "TOGGLE");
      } else if (deviceId) {
        await publishMelody(melodyCode, deviceId);
      }
    } else {
      if (!isPlaying) {
        playerInstance.play(melodyCode);
        setIsPlaying(true);
      } else {
        playerInstance.pause();
        setIsPlaying(false);
      }
    }
  };

  const isCurrentPlaying =
    currentOutputMode === "deviceOutput"
      ? status.melody === melodyName && status.state === "playing"
      : melodyCode === playerInstance.getCurrentCode() && isPlaying;

  return { togglePlayback, isCurrentPlaying };
};
