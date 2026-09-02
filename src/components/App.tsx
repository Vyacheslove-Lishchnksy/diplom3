import { JSX, useMemo } from "react"
import HeaderUI from "./UI/HeaderUI"
import { useQuery } from "@tanstack/react-query";
import { useStateStore } from "../store/stateStore";
import { useLocalization } from "../hooks/useLocalization";
import { RTTTLMelody } from "../configs/default_melodies";
import TopBarButtons from "./TopBarButtons";
import NavigationBar from "./NavigationBar";
import MelodyMenuItem from "./MelodyMenuItem";
import { BigButtonUI } from "./UI/BigButtonUI";
import { FaPlusCircle } from "react-icons/fa";
import Link from "next/link";

export const App = (): JSX.Element => {

  const query = useQuery({
    queryKey: ["currentList"],
    queryFn: async () => {
      console.log("do")
      const response = await fetch('https://pg-melody-server-2.onrender.com//melodies', {method: "GET"});
      if (!response.ok) throw new Error('current list is not access');
      console.log(response)
      return response.json();
    }
  }) 

  console.log("a " + query.data)
  const currentList: RTTTLMelody[]= query.data ?? []
  
  const search = useStateStore((store) => store.search);
  const text = useLocalization();

  const filteredList = useMemo(() => {
    const normalizedSearch = search.toLowerCase();


    return currentList.filter((item: RTTTLMelody) => {
      return (
        item.title.toLowerCase().includes(normalizedSearch) ||
        normalizedSearch === ""
      );
    });
  }, [currentList, search]);
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
    
    </>)
}