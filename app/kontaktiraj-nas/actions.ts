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
    location: z.enum(["Ljubljana", "Maribor", "Vseeno"]),
    message: z.string().min(1, "Sporočilo je obvezno")
  })
  .refine((data) => data.email || data.phone, {
    message: "Vpišite e-pošto ali telefonsko številko",
    path: ["email"]
  });

type FormState = {
  success: boolean;
  errors?: {
    [key: string]: string[];
  };
  message?: string;
};

export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = formSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email") || null,
    phone: formData.get("phone") || null,
    location: formData.get("location"),
    message: formData.get("message")
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors
    };
  }

  try {
    const { name, email, phone, location, message } = validatedFields.data;

    // Send email using Resend
    await resend.emails.send({
      from: "Kontaktni obrazec <onboarding@resend.dev>",
      to: "luka.ernestini@gmail.com",
      subject: `Novo sporočilo od ${name}`,
      html: `
        <h2>Novo sporočilo iz kontaktnega obrazca</h2>
        <p><strong>Ime:</strong> ${name}</p>
        <p><strong>E-pošta:</strong> ${email || "Ni navedeno"}</p>
        <p><strong>Telefon:</strong> ${phone || "Ni navedeno"}</p>
        <p><strong>Želena lokacija:</strong> ${location}</p>
        <p><strong>Sporočilo:</strong></p>
        <p>${message}</p>
      `
    });

    return {
      success: true,
      message: "Hvala za vaše sporočilo. Kmalu vas bomo kontaktirali!"
    };
  } catch (error) {
    console.error("Napaka pri pošiljanju e-pošte:", error);
    return {
      success: false,
      message: "Prišlo je do napake pri pošiljanju sporočila. Prosimo, poskusite ponovno kasneje."
    };
  }
}
