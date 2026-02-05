import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { sendFormData } from "../../api";
import { Toast } from "../ui/Toast";

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const INITIAL_DATA = {
    name: "",
    email: "",
    message: "",
  };
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [formErrors, setFormErrors] = useState(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setIsError(null);
      setIsLoading(true);
      const response = await sendFormData(formData);
      if (response.status === 201) {
        setFormData(INITIAL_DATA);
        setShowToast(true);
      }
    } catch (error) {
      console.log(error);
      setIsError("Error sending form data!");
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };
    const { name, email, message } = formData;
    if (!name.trim()) {
      valid = false;
      newErrors.name = "Name is required";
    }
    if (!email.trim()) {
      valid = false;
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      valid = false;
      newErrors.email = "Invalid Email";
    }
    if (!message.trim()) {
      valid = false;
      newErrors.message = "Message is required";
    }
    setFormErrors(newErrors);
    return valid;
  };

  return (
    <section ref={ref} className="py-20 dark:bg-gray-900" id="contact">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-12">Get in Touch</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-900 rounded-full">
                    <Mail className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:islamhafez806@gmail.com"
                      className="text-gray-300 hover:text-indigo-400"
                    >
                      islamhafez806@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-900 rounded-full">
                    <Phone className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <a
                      href="tel:+201097423297"
                      className="text-gray-300 hover:text-indigo-400"
                    >
                      +20 1097423297
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-900 rounded-full">
                    <MapPin className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-300">Egypt, Cairo, Elmaadi</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className={`flex items-center justify-between text-sm font-medium mb-2 ${formErrors.name ? "text-red-500" : ""
                      }`}
                  >
                    Name
                    {formErrors.name && (
                      <p id="name-error" className="text-red-500 ml-3">
                        {formErrors.name}
                      </p>
                    )}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`w-full px-4 py-2 rounded-lg bg-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none ${formErrors.name
                        ? "ring-2 ring-red-500 focus:ring-red-500"
                        : ""
                      }`}
                    value={formData["name"]}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!formErrors["name"]}
                    aria-describedby="name-error"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className={`flex items-center justify-between text-sm font-medium mb-2 ${formErrors.email ? "text-red-500" : ""
                      }`}
                  >
                    Email
                    {formErrors.email && (
                      <p id="name-error" className="text-red-500 ml-3">
                        {formErrors.email}
                      </p>
                    )}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`w-full px-4 py-2 rounded-lg bg-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none ${formErrors.email
                        ? "ring-2 ring-red-500 focus:ring-red-500"
                        : ""
                      }`}
                    value={formData["email"]}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!formErrors["email"]}
                    aria-describedby="email-error"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className={`flex items-center justify-between text-sm font-medium mb-2 ${formErrors.message ? "text-red-500" : ""
                      }`}
                  >
                    Message
                    {formErrors.message && (
                      <p id="name-error" className="text-red-500 ml-3">
                        {formErrors.message}
                      </p>
                    )}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className={`resize-none w-full px-4 py-2 rounded-lg bg-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none
                      ${formErrors.message
                        ? "ring-2 ring-red-500 focus:ring-red-500"
                        : ""
                      }
                      `}
                    value={formData["message"]}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!formErrors["message"]}
                    aria-describedby="message-error"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:bg-indigo-900 disabled:hover:bg-indigo-900 disabled:text-gray-400"
                  aria-label="Send your message"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-1">
                      Loading
                      <div className="dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
      {showToast && (
        <Toast
          message="Message Sent Successfully"
          setShow={setShowToast}
          show={showToast}
          isError={!!error}
        />
      )}
      {showToast && error && (
        <Toast
          message="Something went wrong please try again"
          setShow={setShowToast}
          show={showToast}
          isError={!!error}
        />
      )}
    </section>
  );
};
export default Contact;
