import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center pt-24">
      <div className="container-x text-center">
        <p className="eyebrow justify-center">404</p>
        <h1 className="mt-5 font-display text-5xl font-semibold">This page isn&rsquo;t here.</h1>
        <p className="mt-4 text-ink-soft">The page you were looking for may have moved.</p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/products" variant="ghost">Products</ButtonLink>
        </div>
      </div>
    </section>
  );
}
