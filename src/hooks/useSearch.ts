import { useMemo } from "react";
import { RTTTLMelody } from "../configs/default_melodies";
import { useStateStore } from "../store/stateStore";

export const useSearch = () => {
    return (list: RTTTLMelody[]) => {
        const search = useStateStore((store) => store.search);
            
        const filteredList = useMemo(() => {
        const normalizedSearch = search.toLowerCase();

        return list.filter((item: RTTTLMelody) => {
        if (!item) {
            return
        }
        return (
            item.title.toLowerCase().includes(normalizedSearch) ||
            normalizedSearch === ""
        );
        });
        }, [list, search]);

        return filteredList;
    }
}