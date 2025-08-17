interface HookCTAProps {
  text: string;
  type: 'hook' | 'cta';
  onCopy: (text: string) => void;
}

export default function HookCTA({ text, type, onCopy }: HookCTAProps) {
  const isHook = type === 'hook';
  const bgColor = isHook ? 'bg-blue-50' : 'bg-green-50';
  const hoverBgColor = isHook ? 'hover:bg-blue-100' : 'hover:bg-green-100';
  const buttonBgColor = isHook ? 'bg-blue-100' : 'bg-green-100';
  const buttonTextColor = isHook ? 'text-blue-700' : 'text-green-700';
  const buttonHoverBgColor = isHook ? 'hover:bg-blue-200' : 'hover:bg-green-200';

  return (
    <div className={`flex items-center justify-between p-3 ${bgColor} rounded-lg ${hoverBgColor} transition-colors`}>
      <p className="text-gray-700 flex-1 mr-3">"{text}"</p>
      <button
        onClick={() => onCopy(text)}
        className={`px-3 py-1 ${buttonBgColor} ${buttonTextColor} rounded-md ${buttonHoverBgColor} transition-colors text-sm font-medium`}
      >
        Copy
      </button>
    </div>
  );
}
