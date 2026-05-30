"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import MelodyMenuItem from "../components/MelodyMenuItem";
import { useMelodyStore } from "../store/melodyStore";
import { useStateStore } from "../store/stateStore";
import Link from "next/link";
import { BigButtonUI } from "../components/UI/BigButtonUI";
import HeaderUI from "../components/UI/HeaderUI";
import { FaPlusCircle } from "react-icons/fa";
import { useLocalization } from "../hooks/useLocalization";
import { useStatusCheck } from "../hooks/useStatusChack";

const NavigationBar = dynamic(() => import("../components/NavigationBar"), {
  ssr: false,
});
const TopBarButtons = dynamic(() => import("../components/TopBarButtons"), {
  ssr: false,
});

export default function Home() {
  const currentList = useMelodyStore((state) => state.currentList);
  const search = useStateStore((store) => store.search);

  useStatusCheck();  

  const text = useLocalization();

  const filteredList = useMemo(() => {
    const normalizedSearch = search.toLowerCase();

    return currentList.filter((item) => {
      return (
        item.title.toLowerCase().includes(normalizedSearch) ||
        normalizedSearch === ""
      );
    });
  }, [currentList, search]);

  return (
    <>
      <div className="flex mb-24 w-full items-center justify-between px-4">
        <HeaderUI>{text.HomeHeaderTitle}</HeaderUI>
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
