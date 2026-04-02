"use client";

import { useState } from "react";

import { StepOne } from "./components/StepOne";
import { StepTwo } from "./components/StepTwo";
import { StepThree } from "./components/StepThree";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    // Step 1 data
    firstName: "",
    lastName: "",
    username: "",
    // Step 2 data
    email: "",
    phoneNumber: "",
    password: "",
    // Step 3 data
    dateOfBirth: "",
    profileImage: null as File | string | null,
  });

  const handleNext = (newData: any) => {
    setFormData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F3F4F6] p-4 font-sans">
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <StepOne onNext={handleNext} initialData={formData} />
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <StepTwo
              onNext={handleNext}
              onBack={handleBack}
              initialData={formData}
            />
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <StepThree
              onNext={handleNext}
              onBack={handleBack}
              initialData={formData}
            />
          </motion.div>
        )}

        {currentStep === 4 && (
          <motion.div
            key="success"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-[480px] bg-white rounded-[32px] p-20 shadow-sm border border-gray-50 flex flex-col items-center text-center"
          >
            <div className="bg-white border border-gray-100 p-3 rounded-2xl mb-4 w-fit flex items-center justify-center shadow-sm">
              <span className="font-bold text-[22px] px-1 text-black">
                {"< >"}
              </span>
            </div>
            <h1 className="text-[26px] font-bold text-[#18181B] mb-2">
              You're All Set 🔥
            </h1>
            <p className="text-gray-400 text-[14px] font-medium leading-relaxed">
              We have received your submission. Thank you!
            </p>
            <button
              onClick={() => {
                setFormData({
                  firstName: "",
                  lastName: "",
                  username: "",
                  email: "",
                  phoneNumber: "",
                  password: "",
                  dateOfBirth: "",
                  profileImage: null,
                });
                setCurrentStep(1);
              }}
              className="mt-8 text-blue-600 font-bold hover:underline transition-all"
            >
              Start Over
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
