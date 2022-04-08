export default function Button1({ text, type }) {
  return (
    <button
      type={type}
      className=" ml-3 justify-center mx-auto px-8 py-3 border border-transparent text-sm font-medium rounded-sm text-black bg-while-600 hover:border-gray-400 transition-all border-2 border-gray-900"
    >
      <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
      {text}
    </button>
  );
}
