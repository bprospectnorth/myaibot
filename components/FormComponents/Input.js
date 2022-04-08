export default function Input({ customClasses, name, id, type, placeHolder, onChange }) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      className={`appearance-none rounded-none relative inline-block w-9/12 px-8 py-3 border-transparent text-sm font-medium text-black bg-while-600 hover:border-gray-400 transition-all border-2 border-gray-900 ${customClasses}`}
      placeholder={placeHolder}
      onChange={onChange}
    />
  );
}
