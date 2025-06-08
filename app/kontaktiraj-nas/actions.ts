"use server";

import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const formSchema = z
  .object({
    name: z.string().min(1, "Ime je obvezno"),
    email: z.string().email().nullish(),
    phone: z
      .string()
      .min(9, "Telefonska številka mora imeti vsaj 9 številk")
      .max(15, "Telefonska številka je predolga")
      .nullish(),
    location: z.string(),
    message: z.string().min(1, "Sporočilo je obvezno"),
    selectedMessages: z.string(),
    "cf-turnstile-response": z.string(),
  })
  .refine((data) => data.email || data.phone, {
    message: "Vpišite e-pošto ali telefonsko številko",
    path: ["email"],
  });

async function validateTurnstileToken(token: string) {
  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY,
          response: token,
        }),
      },
    );

    const data = await response.json();
    if (!response.ok) {
      console.error("Turnstile validation failed:", data);
      return false;
    }
    return data.success;
  } catch (error) {
    console.error("Error validating Turnstile token:", error);
    return false;
  }
}

type FormState = {
  success: boolean;
  errors?: {
    [key: string]: string[];
  };
  message?: string;
};

export async function submitContactForm(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = formSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email") || null,
    phone: formData.get("phone") || null,
    location: formData.get("location"),
    message: formData.get("message"),
    selectedMessages: formData.get("selectedMessages"),
    "cf-turnstile-response": formData.get("cf-turnstile-response"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Validate Turnstile token
  const turnstileToken = validatedFields.data["cf-turnstile-response"];
  const isValidToken = await validateTurnstileToken(turnstileToken);

  if (!isValidToken) {
    return {
      success: false,
      message: "Preverjanje ni uspelo. Prosimo, poskusite ponovno.",
    };
  }

  try {
    const { name, email, phone, location, message, selectedMessages } =
      validatedFields.data;
    const parsedSelectedMessages = JSON.parse(selectedMessages);

    // Send email using Resend
    await resend.emails.send({
      from: "Kontaktni obrazec <onboarding@resend.dev>",
      to: "szo.infos@gmail.com",
      subject: `Novo sporočilo od ${name}`,
      html: `
        <h2>Novo sporočilo iz kontaktnega obrazca</h2>
        <p><strong>Ime:</strong> ${name}</p>
        <p><strong>E-pošta:</strong> ${email || "Ni navedeno"}</p>
        <p><strong>Telefon:</strong> ${phone || "Ni navedeno"}</p>
        <p><strong>Želena lokacija:</strong> ${location}</p>
        <p><strong>Zanima se za:</strong></p>
        <ul>
          ${parsedSelectedMessages.map((msg: string) => `<li>${msg}</li>`).join("")}
        </ul>
        <p><strong>Sporočilo:</strong></p>
        <p>${message}</p>
      `,
    });

    return {
      success: true,
      message: "Hvala za vaše sporočilo. Kmalu vas bomo kontaktirali!",
    };
  } catch (error) {
    console.error("Napaka pri pošiljanju e-pošte:", error);
    return {
      success: false,
      message:
        "Prišlo je do napake pri pošiljanju sporočila. Prosimo, poskusite ponovno kasneje.",
    };
  }
}
