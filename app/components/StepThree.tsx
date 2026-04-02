"use client";
import React, { useState, useMemo } from "react"; // useMemo нэмэв
import { ChevronLeft, X, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

export const StepThree = ({ onBack, onNext, initialData }: any) => {
  const [birthDate, setBirthDate] = useState(initialData?.dateOfBirth || "");
  const [profileImage, setProfileImage] = useState<string | null>(
    initialData?.profileImage || null,
  );
  const [isDragging, setIsDragging] = useState(false);

  // --- Насны хязгаар тогтоох (18 нас) ---
  const maxDate = useMemo(() => {
    const today = new Date();
    // Өнөөдрийн оноос 18-ыг хасаад YYYY-MM-DD хэлбэрт оруулна
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate(),
    );
    return eighteenYearsAgo.toISOString().split("T")[0];
  }, []);

  const processFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Давхар шалгалт: Хэрэв сонгосон огноо 18 наснаас их байвал утгыг явуулна
    if (birthDate && profileImage && birthDate <= maxDate) {
      onNext({ dateOfBirth: birthDate, profileImage });
    }
  };

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-[480px] bg-white rounded-[32px] p-10 shadow-sm border border-gray-100 flex flex-col gap-8"
    >
      <div className="flex flex-col gap-3 text-left">
        <div className="bg-white border border-gray-100 p-2 rounded-lg shadow-sm w-fit">
          <code className="font-bold text-lg text-black">{"<>"}</code>
        </div>
        <h2 className="text-[26px] font-bold text-[#18181B]">Join Us! 😎</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold uppercase text-gray-500">
            Date of birth *
          </label>
          <input
            type="date"
            value={birthDate}
            max={maxDate} // Энд 18 наснаас өмнөх өдрүүдийг хаана
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-black"
          />
          {birthDate > maxDate && (
            <p className="text-red-500 text-xs">Та 18 нас хүрсэн байх ёстой.</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold uppercase text-gray-500">
            Profile image *
          </label>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`h-[180px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all relative overflow-hidden ${
              isDragging
                ? "border-black bg-gray-100 scale-[1.02]"
                : "border-gray-100 bg-gray-50"
            }`}
          >
            {profileImage ? (
              <>
                <img
                  src={profileImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setProfileImage(null)}
                  className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-white hover:bg-black/70"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <label className="flex flex-col items-center gap-2 cursor-pointer w-full h-full justify-center">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <ImageIcon
                    size={20}
                    className={isDragging ? "text-black" : "text-gray-400"}
                  />
                </div>
                <span className="text-[14px] text-gray-400 font-medium">
                  {isDragging ? "Drop here" : "Add image"}
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 border border-gray-200 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <ChevronLeft size={20} /> Back
          </button>
          <button
            type="submit"
            disabled={!birthDate || !profileImage || birthDate > maxDate} // Нас хүрээгүй бол Continue идэвхгүй
            className={`flex-[2.5] py-3 rounded-xl font-bold transition-all ${
              birthDate && profileImage && birthDate <= maxDate
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            Continue 3/3
          </button>
        </div>
      </form>
    </motion.div>
  );
};
