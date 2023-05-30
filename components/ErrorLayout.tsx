import { Head } from "$fresh/runtime.ts";
import { ComponentChildren } from "preact";

type Props = {
  children: ComponentChildren;
};

export function ErrorLayout(props: Props) {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>

      <div class="bg-primary">
        <nav class="flex items-center justify-between flex-wrap min-h-[70px] max-w-screen-md mx-auto px-4 py-2">
          <a href="/">
            <div class="flex flex-shrink-0 border-white">
              <h1 class="ml-2 text-white font-medium">
                copy<span class="font-extrabold">fuse</span>
              </h1>
            </div>
          </a>
        </nav>
      </div>

      <div class="mx-auto max-w-screen-md p-4">{props.children}</div>
    </>
  );
}
