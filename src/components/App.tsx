import { JSX } from "react"
import HeaderUI from "./UI/HeaderUI"
import { useQuery } from "@tanstack/react-query";
import { useStateStore } from "../store/stateStore";
import { useLocalization } from "../hooks/Localization/useLocalization";
import { RTTTLMelody } from "../configs/default_melodies";
import TopBarButtons from "./TopBarButtons";
import NavigationBar from "./NavigationBar";
import MelodyMenuItem from "./MelodyMenuItem";
import { BigButtonUI } from "./UI/BigButtonUI";
import { FaPlusCircle } from "react-icons/fa";
import Link from "next/link";
import { useMelodyStore } from "../store/melodyStore";
import { DeviceStatus } from "../api/actions";
import { useModal } from "../hooks/useModal";
import { useLoadMelodyList } from "../hooks/Melody/useLoadMelodyList";
import { useSearch } from "../hooks/useSearch";
import { EnglishSet } from "../configs/lang/en";

export const App = (): JSX.Element => {

  const currentList = useMelodyStore((state) => state.currentList)
  const status: DeviceStatus = useStateStore(store => store.currentStatus)
  const { MelodyIsEnded } = useLocalization();

  const ModalWindow = useModal({text: MelodyIsEnded(status.melody ?? ""), isVisible: () => {
    return (status.state === "stopped")
  }})

  useLoadMelodyList()
  
  const search = useSearch()
  const text = useLocalization();
  const filteredList = search(currentList)

    return (<>
     <div className="flex mb-24 w-full items-center justify-between px-4">
        <HeaderUI>{text.HomeHeaderTitle}</HeaderUI>
        <TopBarButtons />
      </div>
      <NavigationBar />
      <section className="flex w-full flex-col gap-4 overflow-y-auto pb-8">
        {filteredList.map((melody: RTTTLMelody) => (
          <MelodyMenuItem key={melody.title} melody={melody} />
        ))}
        <Link href={`/redactor/`}>
          <BigButtonUI>
            <FaPlusCircle className="text-2xl" />
          </BigButtonUI>
        </Link>
      </section>
      <ModalWindow />
    </>)
}