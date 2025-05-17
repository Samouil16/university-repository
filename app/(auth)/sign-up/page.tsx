"use client";

import React from "react";
import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validations";
import { signUp } from "@/lib/actions/auth";

const Page = () => (
  <AuthForm
    type="SIGN_UP"
    schema={signUpSchema}
    defaultValues={{
      firstName: "",
      lastName: "",
      academicYear: 0,
      university: "",
      department: "",
      email: "",
      phone: "",
    }}
    onSubmit={signUp}
  />
);
export default Page;
