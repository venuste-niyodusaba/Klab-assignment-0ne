import { useState } from 'react';

function RegisterForm() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null; // hide when closed

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative flex flex-col items-center justify-center h-[32rem] w-[28rem] bg-white shadow-lg rounded-lg p-6">
        
        {/* Close X button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl font-bold"
        >
          ×
        </button>

        <h1 className="text-2xl font-bold mb-4">REGISTER</h1>

        <form className="flex flex-col gap-4 w-full">
          <input 
            type="text"
            placeholder="User name"
            className="border border-gray-300 rounded px-5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded px-5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Your Password"
            className="border border-gray-300 rounded px-5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="border border-gray-300 rounded px-5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button 
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 w-32 self-center"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
