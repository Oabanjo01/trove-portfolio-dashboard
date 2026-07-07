type FilterPillsProps = {
  label: string;
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
};

export function FilterPills({
  label,
  options,
  selected,
  onSelect,
}: FilterPillsProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex gap-2 overflow-x-auto pb-1"
    >
      {options.map((option) => {
        const active = option === selected;

        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(option)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              active
                ? "bg-primary text-white"
                : "bg-fill text-muted hover:bg-primary-light hover:text-primary"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
