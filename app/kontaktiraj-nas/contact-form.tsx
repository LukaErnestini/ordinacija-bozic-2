"use client";

import { useState } from "react";
import { useActionState } from "react";
import { submitContactForm } from "./actions";

interface FormState {
  success: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    location?: string[];
    message?: string[];
  };
  message?: string;
}

export default function ContactForm() {
  const [state, formAction] = useActionState<FormState, FormData>(submitContactForm, {
    success: false,
    errors: {}
  });
  const [contactMethod, setContactMethod] = useState<"email" | "phone">("email");

  return (
    <form
      action={formAction}
      className="space-y-6 max-w-md mx-auto p-6"
    >
      {/* Name Field */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Ime</span>
        </label>
        <input
          type="text"
          name="name"
          className="input input-bordered w-full"
          required
        />
        {state.errors?.name && (
          <label className="label">
            <span className="label-text-alt text-error">{state.errors.name[0]}</span>
          </label>
        )}
      </div>

      {/* Contact Method Selection */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Želeni način kontakta</span>
        </label>
        <div className="flex gap-4">
          <label className="label cursor-pointer">
            <input
              type="radio"
              name="contactMethod"
              className="radio radio-primary"
              value="email"
              checked={contactMethod === "email"}
              onChange={() => setContactMethod("email")}
            />
            <span className="label-text ml-2">E-pošta</span>
          </label>
          <label className="label cursor-pointer">
            <input
              type="radio"
              name="contactMethod"
              className="radio radio-primary"
              value="phone"
              checked={contactMethod === "phone"}
              onChange={() => setContactMethod("phone")}
            />
            <span className="label-text ml-2">Telefon</span>
          </label>
        </div>
      </div>

      {/* Conditional Contact Fields */}
      {contactMethod === "email" && (
        <div className="form-control">
          <label className="label">
            <span className="label-text">E-pošta</span>
          </label>
          <input
            type="email"
            name="email"
            className="input input-bordered w-full"
            required
          />
          {state.errors?.email && (
            <label className="label">
              <span className="label-text-alt text-error">{state.errors.email[0]}</span>
            </label>
          )}
        </div>
      )}

      {contactMethod === "phone" && (
        <div className="form-control">
          <label className="label">
            <span className="label-text">Telefonska številka</span>
          </label>
          <input
            type="tel"
            name="phone"
            className="input input-bordered w-full"
            required
          />
          {state.errors?.phone && (
            <label className="label">
              <span className="label-text-alt text-error">{state.errors.phone[0]}</span>
            </label>
          )}
        </div>
      )}

      {/* Location Field */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Lokacija</span>
        </label>
        <select
          name="location"
          className="select select-bordered w-full"
        >
          <option value="Ljubljana">Ljubljana</option>
          <option value="Maribor">Maribor</option>
          <option value="No Preference">Lokacija ni pomembna</option>
        </select>
        {state.errors?.location && (
          <label className="label">
            <span className="label-text-alt text-error">{state.errors.location[0]}</span>
          </label>
        )}
      </div>

      {/* Message Field */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Sporočilo</span>
        </label>
        <textarea
          name="message"
          className="textarea textarea-bordered h-24"
          required
        />
        {state.errors?.message && (
          <label className="label">
            <span className="label-text-alt text-error">{state.errors.message[0]}</span>
          </label>
        )}
      </div>

      {/* Status Messages */}
      {state.message && (
        <div className={`alert ${state.success ? "alert-success" : "alert-error"}`}>
          <span>{state.message}</span>
          {!state.success && (
            <div className="mt-2 text-sm">
              <p>Kontaktirajte nas neposredno:</p>
              <ul className="list-disc list-inside mt-1">
                <li>Telefon: 041 823 515</li>
                <li>E-pošta: some@email.com</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary w-full"
      >
        Pošlji
      </button>
    </form>
  );
}
