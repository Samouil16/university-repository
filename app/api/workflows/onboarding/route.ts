import { serve } from "@upstash/workflow/nextjs";
import { sendEmail } from "@/lib/workflow";

type InitialData = {
  email: string;
  fullName: string;
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  // Welcome email
  await context.run("new-signup", async () => {
    await sendEmail({
      email,
      subject: "Το Student BluePass σου είναι καθοδόν",
      message: `Γειά σου ${fullName}, \nΜόλις λάβαμε την αίτηση σου για δημιουργία Student BluePass.`,
    });
  });
});
