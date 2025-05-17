import { serve } from "@upstash/workflow/nextjs";
import { sendEmail } from "@/lib/workflow";

type InitialData = {
  email: string;
  firstName: string;
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, firstName } = context.requestPayload;

  // Welcome email
  await context.run("new-signup", async () => {
    await sendEmail({
      email,
      subject: "Το Student BluePass σου είναι καθοδόν",
      message: `Γειά σου ${firstName}, \nΜόλις λάβαμε την αίτηση σου για δημιουργία Student BluePass.`,
    });
  });
});
