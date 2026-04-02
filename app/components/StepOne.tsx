"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const stepOneSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .regex(
      /^[a-zA-Z\u0400-\u04FF]+$/,
      "Special characters or numbers not allowed.",
    ),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .regex(
      /^[a-zA-Z\u0400-\u04FF]+$/,
      "Special characters or numbers not allowed.",
    ),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .refine((val) => val !== "Amgaa", {
      message: "This username is already taken.",
    }),
});

type StepOneData = z.infer<typeof stepOneSchema>;

interface StepOneProps {
  onNext: (data: StepOneData) => void;
  initialData: any;
}

export const StepOne = ({ onNext, initialData }: StepOneProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<StepOneData>({
    resolver: zodResolver(stepOneSchema),
    mode: "onChange",

    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      username: initialData?.username || "",
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-[480px] bg-white rounded-[32px] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex flex-col gap-8"
    >
      <div className="flex flex-col items-start gap-4 text-left">
        <div className="bg-[#18181B] p-3 rounded-2xl shadow-sm">
          <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
            <path
              d="M16 14L4 24L16 34"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M32 14L44 24L32 34"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-[28px] font-bold text-[#18181B] tracking-tight">
            Join Us! 😎
          </h2>
          <p className="text-[15px] text-gray-500">
            Please provide all current information accurately.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onNext)}
        className="flex flex-col gap-5 text-left"
      >
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold uppercase tracking-wider text-[#18181B]">
            First name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("firstName")}
            type="text"
            placeholder="Your first name"
            className={`w-full p-4 rounded-xl border-[1.5px] outline-none transition-all h-[56px] ${
              errors.firstName
                ? "border-red-500 bg-red-50 focus:ring-4 focus:ring-red-100"
                : "border-[#E4E4E7] focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50"
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs font-medium">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold uppercase tracking-wider text-[#18181B]">
            Last name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("lastName")}
            type="text"
            placeholder="Your last name"
            className={`w-full p-4 rounded-xl border-[1.5px] outline-none transition-all h-[56px] ${
              errors.lastName
                ? "border-red-500 bg-red-50 focus:ring-4 focus:ring-red-100"
                : "border-[#E4E4E7] focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50"
            }`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs font-medium">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold uppercase tracking-wider text-[#18181B]">
            Username <span className="text-red-500">*</span>
          </label>
          <input
            {...register("username")}
            type="text"
            placeholder="Choose a username"
            className={`w-full p-4 rounded-xl border-[1.5px] outline-none transition-all h-[56px] ${
              errors.username
                ? "border-red-500 bg-red-50 focus:ring-4 focus:ring-red-100"
                : "border-[#E4E4E7] focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50"
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-xs font-medium">
              {errors.username.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-4 shadow-md ${
            isValid
              ? "bg-[#18181B] text-white hover:bg-black"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Continue 1/3 <ChevronRight size={20} />
        </button>
      </form>
    </motion.div>
  );
};
