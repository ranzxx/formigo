interface SectionHeaderProps {
  title: string;
  description: string;
}

export default function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <>
      <p className="text-xs text-emerald-600 uppercase tracking-wider font-medium mb-2">
        {title}
        {/* pricing */}
      </p>
      <h2 className="text-2xl font-medium mb-8">
        {description}
      </h2>
    </>
  );
}