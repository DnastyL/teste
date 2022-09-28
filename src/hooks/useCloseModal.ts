import { MouseEvent } from "react";

type closeModalType = {
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>;
    //event: Event | undefined;
    ref:  React.MutableRefObject<null>
    isClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export function closeModal({event, ref, isClose}: closeModalType ) {
    if (ref.current === event!.target) {
     return isClose(false);
    }
  }
