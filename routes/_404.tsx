import { ErrorLayout } from "components/index.ts";

export default function NotFoundPage() {
  return (
    <ErrorLayout>
      <div class="flex flex-col">
        <h2>404</h2>
        <p>Oops! Looks like the page you're looking for no longer exists.</p>
      </div>
    </ErrorLayout>
  );
}
