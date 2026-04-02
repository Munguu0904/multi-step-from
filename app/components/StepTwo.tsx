"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

const stepTwoSchema = z
  .object({
    email: z.string().email("Буруу имэйл хаяг"),
    phoneNumber: z.string().min(8, "Утас дор хаяж 8 оронтой"),
    password: z.string().min(8, "Нууц үг дор хаяж 8 тэмдэгт"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Нууц үг зөрүүтэй байна",
    path: ["confirmPassword"],
  });

export const StepTwo = ({ onNext, onBack, initialData }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
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
      className="w-[480px] bg-white rounded-[32px] p-10 shadow-sm border border-gray-100 flex flex-col gap-8"
    >
      <h2 className="text-[26px] font-bold">Join Us! 😎</h2>
      <form
        onSubmit={handleSubmit(onNext)}
        className="flex flex-col gap-5 text-left"
      >
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold uppercase text-gray-500">
            Email *
          </label>
          <input
            {...register("email")}
            className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-black"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold uppercase text-gray-500">
            Phone number *
          </label>
          <input
            {...register("phoneNumber")}
            className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-black"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold uppercase text-gray-500">
            Password *
          </label>
          <input
            {...register("password")}
            type="password"
            className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-black"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold uppercase text-gray-500">
            Confirm password *
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-black"
          />
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
            disabled={!isValid}
            className={`flex-[2.5] py-3 rounded-xl font-bold flex items-center justify-center gap-2 ${isValid ? "bg-black text-white" : "bg-gray-100 text-gray-400"}`}
          >
            Continue 2/3 <ChevronRight size={20} />
          </button>
        </div>
      </form>
    </motion.div>
  );
};
