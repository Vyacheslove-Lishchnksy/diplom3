import { useEffect, RefObject } from "react";

function useOutsideClick(
  ref: RefObject<HTMLElement> | RefObject<null>,
  callback: () => void,
  context?: RefObject<HTMLElement>[] | RefObject<null>[],
): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        context?.every(
          (item) =>
            item &&
            item.current &&
            !item.current.contains(event.target as Node),
        )
      ) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, context]);
}

export default useOutsideClick;
