import { useMemo } from "react";
import { RTTTLMelody } from "../configs/default_melodies";
import { useStateStore } from "../store/stateStore";

export const useSearch = () => {
    const search = useStateStore((store) => store.search);
    return (list: RTTTLMelody[]) => {
        const filteredList = useMemo(() => {
            const normalizedSearch = normalize(search)
            const QueryScoreMap = new WeakMap(); 
            
            list.filter((i)=>{
                return i !== undefined
            }).forEach((item) => {
                QueryScoreMap.set(item, scoreMatch(item, normalizedSearch))
            })

            return list.filter(
                (item) => {
                    return QueryScoreMap.get(item) > 0; 
                }
            )
            .toSorted(( itemA, itemB ) => {
                return QueryScoreMap.get(itemB) - QueryScoreMap.get(itemA);
            });
        }, [list, search]);

        return filteredList;
    }
}


const scoreMatch = (melody: RTTTLMelody, query: string) => {
  const title = normalize(melody.title);
  const code = normalize(melody.code);

  let score = 0;

  if (title === query) {
    score += 100;
  }
  if (title.startsWith(query)) {
    score += 50;
  };
  if (title.includes(query)) {
    score += 20;
  }
  if (code.includes(query)) {
    score += 20;
  };
  return score;
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .trim();