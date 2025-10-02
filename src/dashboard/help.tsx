import { useState } from "react";
import {
  Mail,
  Phone,
  MessageCircle,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

export default function Help() {
  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        "Go to your profile settings, click 'Change Password', and follow the instructions.",
    },
    {
      question: "Where can I track my orders?",
      answer:
        "Navigate to the 'Orders' page in your dashboard to view the status of all your orders.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can reach our support team via email, phone, or live chat (see below).",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <HelpCircle className="text-yellow-500" /> Help & Support
      </h1>

      {/* Quick Contact Options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* Email */}
        <a
          href="mailto:support@kappee.com"
          className="p-4 border rounded-lg shadow-sm hover:shadow-md transition block"
        >
          <Mail className="text-yellow-500 mb-2" />
          <h2 className="font-semibold">Email Us</h2>
          <p className="text-sm text-gray-600">support@kappee.com</p>
        </a>

        {/* Phone */}
        <a
          href="tel:+250788123456"
          className="p-4 border rounded-lg shadow-sm hover:shadow-md transition block"
        >
          <Phone className="text-yellow-500 mb-2" />
          <h2 className="font-semibold">Call Us</h2>
          <p className="text-sm text-gray-600">+250 786 362 567</p>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/250786362567"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 border rounded-lg shadow-sm hover:shadow-md transition block"
        >
          <MessageCircle className="text-yellow-500 mb-2" />
          <h2 className="font-semibold">WhatsApp</h2>
          <p className="text-sm text-gray-600">Chat with us on WhatsApp</p>
        </a>
      </div>

      {/* FAQ Section */}
      <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(idx)}
              className="w-full flex items-center justify-between px-4 py-3 text-left font-medium bg-gray-100 hover:bg-gray-200 transition"
            >
              {faq.question}
              <ChevronDown
                className={`w-5 h-5 transform transition-transform ${
                  openIndex === idx ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === idx && (
              <div className="px-4 py-3 bg-white text-sm text-gray-600 border-t">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
