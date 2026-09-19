import { useQuery } from "@tanstack/react-query"
import { instanceMelodiesDatabase } from "../api/Database"
import { useEffect } from "react"
import { useMelodyStore } from "../store/melodyStore"

export const useLoadMelodyList = () => {
    const setCurrentStore = useMelodyStore((state) => state.setCurrentList)
    const query = useQuery({
        queryKey: ["currentList"],
        queryFn: () => {
          return instanceMelodiesDatabase.getAllMelodies()}
    }) 
    

    useEffect(() => {
        setCurrentStore([...[].concat(query.data)])
          
    }, [query.data])
}