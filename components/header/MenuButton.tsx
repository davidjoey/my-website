export default function MenuButton({onClick}: {onClick: () => void}) {
  return (
    <button onClick={onClick}>
      <svg className="group h-10 w-10" viewBox="0 0 56 56" fill="none">
        <circle
          cx="28"
          cy="28"
          r="27"
          className="stroke-gray-300 group-hover:stroke-gray-900 dark:stroke-gray-600 dark:group-hover:stroke-gray-100"
          strokeWidth="2"
        />
        <path
          d="M17.8182 35.6364H38.1818M17.8182 20.3636H38.1818H17.8182ZM17.8182 28H38.1818H17.8182Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
