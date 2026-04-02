"use client";
import { useState, useEffect } from "react";
import { StepOne } from "./components/StepOne";
import { StepTwo } from "./components/StepTwo";
import { StepThree } from "./components/StepThree";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [isMounted, setIsMounted] = useState(false);

  // 1. Ачаалахад localStorage-оос дата унших
  useEffect(() => {
    const savedData = localStorage.getItem("multiStepFormData");
    const savedStep = localStorage.getItem("currentStep");
    if (savedData) setFormData(JSON.parse(savedData));
    if (savedStep) setCurrentStep(Number(savedStep));
    setIsMounted(true);
  }, []);

  // 2. Дата хадгалах болон цэвэрлэх логик
  useEffect(() => {
    if (!isMounted) return;

    if (currentStep === 4) {
      // Хэрэв 4-р алхам (Амжилттай) болсон бол шууд устгана
      localStorage.removeItem("multiStepFormData");
      localStorage.removeItem("currentStep");
    } else {
      // Бусад үед хадгалсаар байна
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
        </div>
      )}
    </main>
  );
}
