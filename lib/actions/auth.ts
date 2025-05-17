"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import ratelimit from "@/lib/ratelimit";
import { redirect } from "next/navigation";
import { workflowClient } from "../workflow";
import config from "@/lib/config";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">,
) => {
  const { email, password } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      return { success: false, error: result.error };
    }
    return { success: true };
  } catch (error) {
    console.error(error, "Signin error");
    return { success: false, error: "Signin error" };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const {
    firstName,
    lastName,
    academicYear,
    university,
    department,
    email,
    phone,
  } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" };
  }

  try {
    await db.insert(users).values({
      firstName,
      lastName,
      academicYear,
      university,
      department,
      email,
      phone,
    });

    await workflowClient.trigger({
      url: `${config.env.prodApiEndpoint}/api/workflows/onboarding`,
      body: {
        email,
        firstName,
      },
    });

    redirect("/completed-registration");
  } catch (error) {
    console.log(error, "Signup error");
    return { success: false, error: "Signup error" };
  }
};
