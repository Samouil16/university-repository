"use client";

import React from "react";
import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validations";
import { signInWithCredentials } from "@/lib/actions/auth";

const Page = () => (
  <>
    <h2>Η εγγραφή σου ήταν επιτυχής!</h2>
    <p>Θα γίνει έλεγχος της αίτησης σου και αμέσως</p>
    <p>μετά θα λάβεις το Students BluePass</p>
  </>
);
export default Page;
