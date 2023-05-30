import { IS_BROWSER } from "$fresh/runtime.ts";
import { ComponentChildren } from "preact";
import { animation, css } from "twind/css";
import { useEffect, useRef } from "preact/hooks";
import { tw } from "twind";

const slideBottom = animation("0.4s ease normal", {
  from: { transform: "translateY(100%)" },
  to: { transform: "translateY(0)" },
});

const backdrop = css({
  "&::backdrop": {
    background: "rgba(0, 0, 0, 0.5)",
  },
});

type Props = {
  children: ComponentChildren;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export function Dialog(props: Props) {
  const { open, setOpen } = props;
  const ref = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
      document.body.classList.add("modal-open"); // prevent bg scroll
    } else {
      ref.current?.close();
      document.body.classList.remove("modal-open");
    }
  }, [open]);

  return (
    <dialog
      disabled={!IS_BROWSER}
      ref={ref}
      class={tw` px-4 py-2 max-w-lg rounded ${backdrop}${slideBottom}`}
    >
      <div>
        <button class="absolute right-0 p-2" onClick={() => setOpen(false)}>
          <svg
            class="w-6 h-6 fill-current text-gray-600"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
        {props.children}
      </div>
    </dialog>
  );
}
