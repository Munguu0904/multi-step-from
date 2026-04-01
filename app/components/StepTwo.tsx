"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

const stepTwoSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    phoneNumber: z.string().min(8, "Phone number is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const StepTwo = ({ onNext, onBack }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(stepTwoSchema),
    mode: "onChange",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-[480px] bg-white rounded-[32px] p-10 shadow-sm border border-gray-50 flex flex-col gap-6"
    >
      <div className="flex flex-col gap-4">
        <div className="w-12 h-12 flex items-start justify-start">
          <svg
            width="40"
            height="40"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 16L6 24L16 32"
              stroke="black"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M32 16L42 24L32 32"
              stroke="black"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div>
          <h2 className="text-[26px] font-bold text-[#18181B]">Join Us! 😎</h2>
          <p className="text-gray-400 text-[15px] underline decoration-blue-100">
            Please provide all current information accurately.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onNext)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold uppercase text-[#18181B]">
            Email *
          </label>
          <input
            {...register("email")}
            placeholder="Placeholder"
            className={`w-full p-4 rounded-xl border outline-none transition-all ${errors.email ? "border-red-500 focus:ring-4 focus:ring-red-50" : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"}`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold uppercase text-[#18181B]">
            Phone number *
          </label>
          <input
            {...register("phoneNumber")}
            placeholder="Placeholder"
            className={`w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold uppercase text-[#18181B]">
            Password *
          </label>
          <input
            {...register("password")}
            type="password"
            placeholder="Placeholder"
            className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold uppercase text-[#18181B]">
            Confirm password *
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Placeholder"
            className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all"
          />
        </div>

        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-200 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all"
          >
            <ChevronLeft size={20} /> Back
          </button>
          <button
            type="submit"
            className="flex-[2.5] bg-[#18181B] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-md"
          >
            Continue 2/3 <ChevronRight size={20} />
          </button>
        </div>
      </form>
    </motion.div>
  );
};
