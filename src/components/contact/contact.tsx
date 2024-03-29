"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { containerVariants } from "@/lib/framer-motion";

const ContactForm = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Process the form data, e.g., send it to a server or API
    console.log(formData);
    // Reset form after submission for demonstration
    setFormData({
      name: "",
      email: "",
      message: "",
    });

    try {
      const response = await fetch("https://formspree.io/f/xgeglwyj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form submitted successfully.");
        // Reset form fields or handle success state here
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        console.error("Form submission failed.");
        // Handle error state here
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle error state here
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="flex flex-col md:gap-16 gap-12 md:items-center md:text-center"
    >
      <div className="flex flex-col md:gap-8 gap-4">
        <h2 className="text-2xl font-bold">Send Me A Message</h2>
        <p>
          If you have any questions or just want to say hi please send me a
          message!
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full gap-4 max-w-lg"
      >
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border-2 rounded-lg px-4 py-4"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border-2 rounded-lg px-4 py-4"
          />
        </div>
        <div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter Your Message"
            rows={4}
            className="w-full border-2 rounded-lg px-4 py-4"
          ></textarea>
        </div>
        <button
          type="submit"
          className="py-6 px-4 rounded-lg btn-color"
          style={{
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
          }}
        >
          Send Message
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
