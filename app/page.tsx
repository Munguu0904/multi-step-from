"use client";
import { useState, useEffect } from "react";
import { StepOne } from "./components/StepOne";
import { StepTwo } from "./components/StepTwo";
import { StepThree } from "./components/StepThree";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("multiStepFormData");
    const savedStep = localStorage.getItem("currentStep");
    if (savedData) setFormData(JSON.parse(savedData));
    if (savedStep) setCurrentStep(Number(savedStep));
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("multiStepFormData", JSON.stringify(formData));
      localStorage.setItem("currentStep", currentStep.toString());
    }
  }, [formData, currentStep, isMounted]);

  const handleNext = (newData: any) => {
    setFormData((prev: any) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => setCurrentStep((prev) => prev - 1);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F4F4F5]">
      {currentStep === 1 && (
        <StepOne onNext={handleNext} initialData={formData} />
      )}
      {currentStep === 2 && (
        <StepTwo
          onNext={handleNext}
          onBack={handleBack}
          initialData={formData}
        />
      )}
      {currentStep === 3 && (
        <StepThree
          onNext={handleNext}
          onBack={handleBack}
          initialData={formData}
        />
      )}
      {currentStep === 4 && (
        <div className="bg-white p-10 rounded-[32px] shadow-sm text-center">
          <h2 className="text-2xl font-bold">You're All Set! 🔥</h2>
          <p className="text-gray-500 mt-2">Амжилттай бүртгэгдлээ.</p>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="mt-6 text-blue-500 underline"
          >
            Дахин эхлэх
          </button>
        </div>
      )}
    </main>
  );
}
