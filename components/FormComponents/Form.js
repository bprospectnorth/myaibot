export default function Form({ children, onSubmit }) {
  return (
    <div className=" flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}
