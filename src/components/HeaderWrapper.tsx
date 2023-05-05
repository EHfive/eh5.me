import { JSXElement, createEffect, createSignal, onMount } from "solid-js";
import { useWindowScrollPosition } from "@solid-primitives/scroll";

enum State {
  TOP,
  HIDE,
  SHOW,
}


export default function HeaderWrapper(props: { children: JSXElement }) {
  const [state, setState] = createSignal(State.TOP);
  onMount(() => {
    const scroll = useWindowScrollPosition();
    let prevY = scroll.y;
    if (prevY > 0) {
      setState(State.SHOW);
    }

    createEffect(() => {
      const currY = scroll.y;
      if (currY === 0) {
        setState(State.TOP);
        // } else if (currY > prevY) {
        //   setState(State.HIDE);
        // } else if (currY < prevY) {
        //   setState(State.SHOW);
      } else {
        setState(State.SHOW);
      }

      prevY = currY;
    });
  });

  return (
    <header
      class="fixed top-0 z-10 w-screen border-b-2 transition duration-500 ease-in-out"
      classList={{
        "border-transparent": state() === State.TOP,
        "backdrop-blur": state() !== State.TOP,
        "border-base-content/10": state() !== State.TOP,
        "md:bg-base-200/30": state() !== State.TOP,
        "-translate-y-32": state() === State.HIDE,
      }}
    >
      {props.children}
    </header>
  );
}
