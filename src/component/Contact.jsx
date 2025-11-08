import React, { useState } from "react";
// You might use an icon library like lucide-react
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const apiKey = import.meta.env.VITE_X_API_KEY;

    if (!baseUrl || !apiKey) {
      setError("Configuration error: Missing base URL or API key.");
      setIsLoading(false);
      return;
    }

    const requestBody = {
      source: "website",
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    try {
      const response = await fetch(`${baseUrl}/contact/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setSuccess("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errorData = await response.json();
        setError(
          errorData.message || "Failed to send message. Please try again."
        );
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* --- Header Section --- */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're here to help you with any inquiries about our listings,
            features, or partnership opportunities.
          </p>
        </header>

        {/* --- Contact Form and Info Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 rounded-xl shadow-2xl">
          {/* --- Form Section --- */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-red-600 pl-3">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
                />
              </div>

              {/* Message Input */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="I have a question about the BMW 7 Series (G70)..."
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
                ></textarea>
              </div>

              {/* Feedback Messages */}
              {error && (
                <div className="text-red-600 text-sm mt-2">{error}</div>
              )}
              {success && (
                <div className="text-green-600 text-sm mt-2">{success}</div>
              )}

              {/* Buttons */}
              <div className="flex justify-start space-x-4 pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center px-6 py-2 border border-transparent text-base font-bold rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Submit Message"}
                </button>
                <button
                  type="reset"
                  onClick={() =>
                    setFormData({ name: "", email: "", message: "" })
                  }
                  className="flex items-center justify-center px-6 py-2 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition duration-150"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* --- Contact Details Section (Consistent with branding) --- */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-inner">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Our Details
            </h2>
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start space-x-4">
                <Mail className="shrink-0 text-red-600 mt-1" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Email Us
                  </h3>
                  <a
                    href="mailto:tksingh0201@gmail.com"
                    className="text-gray-600 hover:text-red-600 transition"
                  >
                    tksingh0201@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <Phone className="shrink-0 text-red-600 mt-1" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Call Us
                  </h3>
                  <a
                    href="tel:+911234567890"
                    className="text-gray-600 hover:text-red-600 transition"
                  >
                    +91 123 456 7890
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4">
                <MapPin className="shrink-0 text-red-600 mt-1" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Visit Our Office
                  </h3>
                  <p className="text-gray-600">
                    DreamWheel HQ, <br />
                    123 Automotive Lane, <br />
                    Bangalore, India 560001
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
