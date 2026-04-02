"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

const stepTwoSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    phoneNumber: z.string().min(8, "Phone number must be at least 8 digits"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type StepTwoData = z.infer<typeof stepTwoSchema>;

export const StepTwo = ({ onNext, onBack, initialData }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<StepTwoData>({
    resolver: zodResolver(stepTwoSchema),
    mode: "onChange",
    defaultValues: {
      email: initialData?.email || "",
      phoneNumber: initialData?.phoneNumber || "",
      password: initialData?.password || "",
      confirmPassword: initialData?.password || "",
    },
  });

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      className="w-[480px] bg-white rounded-[32px] p-10 shadow-sm border border-gray-100 flex flex-col gap-8"
    >
      <div className="flex flex-col gap-3 text-left">
        <div className="bg-white border border-gray-100 p-2 rounded-lg shadow-sm w-fit">
          <code className="font-bold text-lg text-black">{"<>"}</code>
        </div>
        <h2 className="text-[26px] font-bold text-[#18181B]">Join Us! 😎</h2>
        <p className="text-gray-400 text-[14px] font-medium">
          Please provide all current information accurately.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onNext)}
        className="flex flex-col gap-5 text-left"
      >
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold uppercase text-[#18181B]">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...register("email")}
            placeholder="Placeholder"
            className={`w-full p-3 rounded-xl border outline-none transition-all ${
              errors.email
                ? "border-red-500 bg-red-50"
                : "border-gray-200 focus:border-black"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-[11px] font-medium">
              {String(errors.email.message)}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold uppercase text-[#18181B]">
            Phone number <span className="text-red-500">*</span>
          </label>
          <input
            {...register("phoneNumber")}
            placeholder="Placeholder"
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const target = e.target as HTMLInputElement;
              target.value = target.value.replace(/[^0-9]/g, "");
            }}
            className={`w-full p-3 rounded-xl border outline-none transition-all ${
              errors.phoneNumber
                ? "border-red-500 bg-red-50"
                : "border-gray-200 focus:border-black"
            }`}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-[11px] font-medium">
              {String(errors.phoneNumber.message)}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold uppercase text-[#18181B]">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            {...register("password")}
            type="password"
            placeholder="Placeholder"
            className={`w-full p-3 rounded-xl border outline-none transition-all ${
              errors.password
                ? "border-red-500 bg-red-50"
                : "border-gray-200 focus:border-black"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-[11px] font-medium">
              {String(errors.password.message)}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold uppercase text-[#18181B]">
            Confirm password <span className="text-red-500">*</span>
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Placeholder"
            className={`w-full p-3 rounded-xl border outline-none transition-all ${
              errors.confirmPassword
                ? "border-red-500 bg-red-50"
                : "border-gray-200 focus:border-black"
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-[11px] font-medium">
              {String(errors.confirmPassword.message)}
            </p>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 active:scale-95 transition font-bold text-black"
          >
            <ChevronLeft size={20} /> Back
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className={`flex-[2.5] py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${
              isValid
                ? "bg-black text-white hover:bg-[#27272A]"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Continue 2/3 <ChevronRight size={20} />
          </button>
        </div>
      </form>
    </motion.div>
  );
};
