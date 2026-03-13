interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="text"
      placeholder="Search by author..."
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-700 bg-black text-white rounded-lg mb-6 placeholder-gray-400"
    />
  );
}
