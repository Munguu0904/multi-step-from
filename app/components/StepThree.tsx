"use client";
import React, { useState } from "react";
import { ChevronLeft, X, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

export const StepThree = ({ onBack, onNext, initialData }: any) => {
  const [birthDate, setBirthDate] = useState(initialData?.dateOfBirth || "");
  const [profileImage, setProfileImage] = useState<string | null>(
    initialData?.profileImage || null,
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string); // Base64 болгож хадгална
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthDate && profileImage) {
      onNext({ dateOfBirth: birthDate, profileImage });
    }
  };

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-[480px] bg-white rounded-[32px] p-10 shadow-sm border border-gray-100 flex flex-col gap-8"
    >
      <h2 className="text-[26px] font-bold">Join Us! 😎</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold uppercase text-gray-500">
            Date of birth *
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-black"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold uppercase text-gray-500">
            Profile image *
          </label>
          <div className="h-[180px] border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center bg-gray-50 relative overflow-hidden">
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
                  className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-white"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <label className="flex flex-col items-center gap-2 cursor-pointer w-full h-full justify-center">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <ImageIcon size={20} className="text-gray-400" />
                </div>
                <span className="text-[14px] text-gray-400">Add image</span>
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
            className="flex-1 border py-3 rounded-xl font-bold flex items-center justify-center gap-1 hover:bg-gray-50"
          >
            <ChevronLeft size={20} /> Back
          </button>
          <button
            type="submit"
            disabled={!birthDate || !profileImage}
            className={`flex-[2.5] py-3 rounded-xl font-bold ${birthDate && profileImage ? "bg-black text-white" : "bg-gray-100 text-gray-400"}`}
          >
            Continue 3/3
          </button>
        </div>
      </form>
    </motion.div>
  );
};
