import React from "react";

const Contact = () => {
  return (
    <div className="bg-[#f6f3ef] min-h-screen">
      
      {/* HEADER */}
      <div className="text-center pt-24 pb-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Contact Us
        </h1>
        <p className="text-gray-500">
          We'd love to hear from you.
        </p>
      </div>

      {/* FORM */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-10">
        <form className="flex flex-col gap-6">
          
          <input
            type="text"
            placeholder="Your Name"
            className="p-4 rounded-xl border outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="p-4 rounded-xl border outline-none focus:ring-2 focus:ring-green-500"
          />

          <textarea
            placeholder="Your Message"
            rows="5"
            className="p-4 rounded-xl border outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* CONTACT INFO */}
      <div className="text-center mt-12 text-gray-600">
        <p>Email: hello@humbl.com</p>
        <p>Phone: +91 999999999</p>
      </div>
    </div>
  );
};

export default Contact;
