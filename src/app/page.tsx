"use client";

import { MelodyMenuItem } from "../components/MelodyMenuItem";
import {
  useMelodyStore,
  useMQTTStore,
  useStateStore,
} from "../store/melodyStore";
import Link from "next/link";
import { BigButtonUI } from "../components/UI/BigButtonUI";
import HeaderUI from "../components/UI/HeaderUI";
import { subscribeToStatus } from "../api/actions";
import { useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import NavigationBar from "../components/NavigationBar";
import TopBarButtons from "../components/TopBarButtons";

export default function Home() {
  const { currentList } = useMelodyStore((state) => state);
  const { setStatus, search } = useStateStore((store) => store);
  const { deviceId } = useMQTTStore((store) => store);

  useEffect(() => {
    let unsubscribe = () => {};

    unsubscribe = subscribeToStatus(deviceId, (newStatus) => {
      setStatus(newStatus);
    });

    return () => unsubscribe();
  }, [deviceId, setStatus]);

  const filteredList = currentList.filter((item) => {
    return item.title.toLowerCase().includes(search) || search === "";
  });

  return (
    <>
      <div className="flex mb-24 w-full items-center justify-between px-4">
        <HeaderUI>All melodies</HeaderUI>
        <TopBarButtons />
      </div>
      <NavigationBar />
      <section className="flex w-full flex-col gap-4 overflow-y-auto pb-8">
        {filteredList.map((melody) => (
          <MelodyMenuItem key={melody.title} melody={melody} />
        ))}
        <Link href={`/redactor/`}>
          <BigButtonUI>
            <FaPlusCircle className="text-2xl" />
          </BigButtonUI>
        </Link>
      </section>
    </>
  );
}
