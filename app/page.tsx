"use client";
import { useState } from "react";
import { StepOne } from "./components/StepOne";
import { StepTwo } from "./components/StepTwo";
import { StepThree } from "./components/StepThree";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleNext = (stepData: any) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F3F4F6] p-4 font-sans">
      <div className="transition-all duration-300 ease-in-out">
        {currentStep === 1 && <StepOne onNext={handleNext} />}

        {currentStep === 2 && (
          <StepTwo onNext={handleNext} onBack={handleBack} />
        )}

        {currentStep === 3 && (
          <StepThree onNext={handleNext} onBack={handleBack} />
        )}

        {currentStep === 4 && (
          <div className="w-[440px] bg-white rounded-[32px] p-12 text-center shadow-sm">
            <h1 className="text-2xl font-bold italic">You're All Set 🔥</h1>
            <p className="text-gray-500 mt-2">
              We have received your submission. Thank you!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
