import { useStateStore, useMQTTStore } from "../store/melodyStore";
import { getPlayerInstance } from "../api/playRTTTL";
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

  if (status.state === "playing") {
    console.log(`playing ${new Date().getTime()}`);
  }

  useEffect(() => {
    const player = getPlayerInstance();
    if (!player) return;

    const handleEnd = () => setIsPlaying(false);
    player.onEnd = handleEnd;
    return () => {
      if (player.onEnd === handleEnd) player.onEnd = undefined;
    };
  }, [setIsPlaying]);

  const togglePlayback = async () => {
    if (currentOutputMode === "deviceOutput") {
      if (status.melody === melodyName && status.state !== "stopped") {
        sendBuzzerCommand(deviceId, "TOGGLE");
      } else if (deviceId) {
        await publishMelody(melodyCode, deviceId);
      }
      return;
    }

    const player = getPlayerInstance();
    if (!player) return;

    if (!isPlaying) {
      player.play(melodyCode);
      setIsPlaying(true);
    } else {
      player.pause();
      setIsPlaying(false);
    }
  };

  const player = getPlayerInstance();
  const isCurrentPlaying =
    currentOutputMode === "deviceOutput"
      ? status.melody === melodyName && status.state === "playing"
      : !!player && melodyCode === player.getCurrentCode() && isPlaying;

  return { togglePlayback, isCurrentPlaying };
};
