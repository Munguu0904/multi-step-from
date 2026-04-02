"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StepThreeProps {
  onBack: () => void;
  onNext: (data: any) => void;
  initialData: any;
}

export const StepThree = ({ onBack, onNext, initialData }: StepThreeProps) => {
  const [birthDate, setBirthDate] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ date?: string; image?: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData?.dateOfBirth) setBirthDate(initialData.dateOfBirth);
    if (initialData?.profileImage) {
      const img = initialData.profileImage;
      setProfileImage(typeof img === "string" ? img : URL.createObjectURL(img));
    }
  }, [initialData]);

  const todayStr = new Date().toISOString().split("T")[0];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleSubmit = () => {
    const newErrors: { date?: string; image?: string } = {};

    if (!birthDate) {
      newErrors.date = "Төрсөн огноогоо сонгоно уу.";
    } else {
      const selectedDate = new Date(birthDate);
      const today = new Date();

      if (selectedDate > today) {
        newErrors.date = "Төрсөн огноо ирээдүйд байх боломжгүй.";
      } else {
        let age = today.getFullYear() - selectedDate.getFullYear();
        const m = today.getMonth() - selectedDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < selectedDate.getDate())) {
          age--;
        }

        if (age < 18) {
          newErrors.date = "Уучлаарай, та 18 нас хүрсэн байх ёстой.";
        }
      }
    }

    if (!profileImage) {
      newErrors.image = "Профайл зураг заавал оруулна уу.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      onNext({ dateOfBirth: birthDate, profileImage });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-[440px] bg-white rounded-[32px] p-8 shadow-sm flex flex-col gap-6"
    >
      <div className="text-left">
        <div className="flex mb-4">
          <div className="bg-white border border-gray-100 p-2 rounded-lg shadow-sm">
            <code className="font-bold text-lg text-black">{"<>"}</code>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-black">Join Us! 😎</h2>
        <p className="text-gray-500 text-sm">
          Please provide all current information accurately.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-bold uppercase text-gray-700 text-left">
          Date of birth <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          max={todayStr}
          className={`w-full p-3 border rounded-xl outline-none transition duration-200 ${
            errors.date
              ? "border-red-500 bg-red-50"
              : "border-gray-200 focus:border-black"
          }`}
          value={birthDate}
          onChange={(e) => {
            setBirthDate(e.target.value);
            setErrors((prev) => ({ ...prev, date: "" }));
          }}
        />
        {errors.date && (
          <p className="text-red-500 text-[11px] font-medium text-left">
            {errors.date}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-bold uppercase text-gray-700 text-left">
          Profile image <span className="text-red-500">*</span>
        </label>

        <div
          onClick={() => fileInputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 h-44 overflow-hidden ${
            errors.image
              ? "border-red-500 bg-red-50"
              : "border-gray-100 bg-gray-50 hover:bg-gray-100"
          }`}
        >
          <AnimatePresence mode="wait">
            {profileImage ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full relative"
              >
                <img
                  src={profileImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileImage(null);
                  }}
                  className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full text-white hover:bg-black transition"
                >
                  <X size={16} />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center"
              >
                <div className="bg-white p-2.5 rounded-xl shadow-sm mb-2 text-black">
                  <ImageIcon size={24} />
                </div>
                <span className="text-[14px] font-bold text-black">
                  Add image
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <input
          type="file"
          hidden
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageChange}
        />
        {errors.image && (
          <p className="text-red-500 text-[11px] font-medium text-center">
            {errors.image}
          </p>
        )}
      </div>

      <div className="flex gap-2 mt-2">
        <button
          onClick={onBack}
          className="flex-1 flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 active:scale-95 transition font-bold text-black"
        >
          <ChevronLeft size={20} /> Back
        </button>
        <button
          onClick={handleSubmit}
          className="flex-[2.5] bg-black text-white py-3 rounded-xl hover:bg-gray-800 active:scale-95 transition font-bold flex items-center justify-center gap-2"
        >
          Continue 3/3 <ChevronRight size={20} />
        </button>
      </div>
    </motion.div>
  );
};
