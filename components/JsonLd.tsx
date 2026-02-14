import Script from 'next/script';

export default function JsonLd({
  data,
  id
}: {
  data: Record<string, unknown>;
  id: string;
}) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
