"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const stepOneSchema = z.object({
  firstName: z.string().min(1, "Нэрээ оруулна уу"),
  lastName: z.string().min(1, "Овгоо оруулна уу"),
  username: z.string().min(3, "Хэрэглэгчийн нэр дор хаяж 3 тэмдэгт"),
});

export const StepOne = ({ onNext, initialData }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
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
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-[480px] bg-white rounded-[32px] p-10 shadow-sm border border-gray-100 flex flex-col gap-8"
    >
      <h2 className="text-[26px] font-bold text-[#18181B]">Join Us! 😎</h2>
      <form
        onSubmit={handleSubmit(onNext)}
        className="flex flex-col gap-5 text-left"
      >
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold uppercase text-gray-500">
            First name *
          </label>
          <input
            {...register("firstName")}
            className={`w-full p-3 rounded-xl border outline-none ${errors.firstName ? "border-red-500" : "border-gray-200 focus:border-black"}`}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold uppercase text-gray-500">
            Last name *
          </label>
          <input
            {...register("lastName")}
            className={`w-full p-3 rounded-xl border outline-none ${errors.lastName ? "border-red-500" : "border-gray-200 focus:border-black"}`}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold uppercase text-gray-500">
            Username *
          </label>
          <input
            {...register("username")}
            className={`w-full p-3 rounded-xl border outline-none ${errors.username ? "border-red-500" : "border-gray-200 focus:border-black"}`}
          />
        </div>
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 mt-4 ${isValid ? "bg-black text-white" : "bg-gray-100 text-gray-400"}`}
        >
          Continue 1/3 <ChevronRight size={20} />
        </button>
      </form>
    </motion.div>
  );
};
