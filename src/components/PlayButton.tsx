import { JSX } from "react";
import { MdOutlinePause, MdPlayArrow } from "react-icons/md";
import { useMelodyPlayer } from "../hooks/useMelodyPlayer";
import { RTTTLMelody } from "../configs/default_melodies";
import styles from "./MelodyMenuItem.module.scss";

interface IPlayButtonProps {
  melody: RTTTLMelody;
}

const PlayButton = ({ melody }: IPlayButtonProps): JSX.Element => {
  const { togglePlayback, isCurrentPlaying } = useMelodyPlayer(melody.code);

  return (
    <div className="flex">
      <button
        className={`w-16 h-16 rounded-2xl flex items-center justify-center cursor-pointer bg-gray-900 ${styles.playButton}`}
        onClick={() => {
          console.log(`${new Date().getTime()}`);
          togglePlayback();
        }}
      >
        {isCurrentPlaying ? (
          <MdOutlinePause
            className="m-4 text-gray-600"
            style={{ fontSize: "3rem" }}
          />
        ) : (
          <MdPlayArrow
            className="m-2 text-gray-600"
            style={{ fontSize: "3rem" }}
          />
        )}
      </button>
    </div>
  );
};

export default PlayButton;
