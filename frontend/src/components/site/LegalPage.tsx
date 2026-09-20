import { LEGAL_DOCS } from "./legalDocs";

export default function LegalPage({ slug }: { slug: string }) {
  const doc = LEGAL_DOCS[slug];
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-neutral-200">
      {doc.blocks.map((b, i) => {
        if (b.kind === "h1")
          return (
            <h1 key={i} className="mb-8 text-3xl font-bold text-white">
              {b.text}
            </h1>
          );
        if (b.kind === "h2")
          return (
            <h2 key={i} className="mb-3 mt-10 text-xl font-semibold text-white">
              {b.text}
            </h2>
          );
        return (
          <p key={i} className="mb-4 leading-relaxed">
            {b.text}
          </p>
        );
      })}
    </main>
  );
}
