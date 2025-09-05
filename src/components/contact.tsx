import React, { useState } from "react";
import type { FormEvent } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    console.log("Form submitted:", { name, email, message });
    alert("Thank you! Your message has been sent.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">CONTACT US</h1>
      <p className="text-gray-700 mb-6 text-center">
        Feel free to reach out to us through the form below.
      </p>
      
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-80 bg-white shadow-md p-6 rounded"
      >
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          placeholder="Your Message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
