"use client";

import { useState, useTransition } from "react";
import { useActionState } from "react";
import { submitContactForm } from "./actions";
import Turnstile from "react-turnstile";

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

interface ContactFormProps {
  locations: string[];
  presetMessages: {
    label: string;
    value: string;
    enabled: boolean;
  }[];
  headerTitle: string;
  headerSubtitle: string;
}

export default function ContactForm(props: ContactFormProps) {
  const [state, formAction] = useActionState<FormState, FormData>(submitContactForm, {
    success: false,
    errors: {}
  });
  const [contactMethod, setContactMethod] = useState<"email" | "phone">("email");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [gdprConsent, setGdprConsent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!turnstileToken) {
      return;
    }
    const formData = new FormData(e.currentTarget);
    formData.append("cf-turnstile-response", turnstileToken);
    formData.append("selectedMessages", JSON.stringify(selectedMessages));

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{props.headerTitle}</h1>
        <p className="text-lg text-gray-600">{props.headerSubtitle}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-md mx-auto p-6"
      >
        {/* Name Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Ime in priimek</span>
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
            <span className="label-text">Kako naj vas kontaktiramo?</span>
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
            {props.locations.map((location) => (
              <option
                key={location}
                value={location}
              >
                {location}
              </option>
            ))}
            <option value="No Preference">Lokacija ni pomembna</option>
          </select>
          {state.errors?.location && (
            <label className="label">
              <span className="label-text-alt text-error">{state.errors.location[0]}</span>
            </label>
          )}
        </div>

        {/* Preset Messages Checkboxes */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Zanimam se za:</span>
          </label>
          <div className="space-y-2">
            {props.presetMessages
              .filter((msg) => msg.enabled)
              .map((msg) => (
                <label
                  key={msg.value}
                  className="flex items-start gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary mt-1"
                    value={msg.value}
                    checked={selectedMessages.includes(msg.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedMessages([...selectedMessages, msg.value]);
                      } else {
                        setSelectedMessages(selectedMessages.filter((m) => m !== msg.value));
                      }
                    }}
                  />
                  <span className="label-text">{msg.label}</span>
                </label>
              ))}
          </div>
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

        {/* GDPR Consent Checkbox */}
        <div className="form-control">
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              className="checkbox checkbox-primary mt-1"
              checked={gdprConsent}
              onChange={(e) => setGdprConsent(e.target.checked)}
              required
            />
            <span className="label-text ml-2 flex-1">
              Strinjam se, da se podatki uporabijo za povratno komunikacijo. Hranijo se v skladu z GDPR.
            </span>
          </label>
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

        {/* Turnstile */}
        <div className="flex flex-col items-center gap-2">
          <Turnstile
            sitekey="0x4AAAAAAA4nzao-OjNdyws5"
            onVerify={(token) => setTurnstileToken(token)}
            onError={() => {
              setTurnstileToken(null);
              console.error("Turnstile validation failed");
            }}
            onExpire={() => {
              setTurnstileToken(null);
              console.log("Turnstile token expired");
            }}
          />
          {!turnstileToken && state.message && (
            <span className="text-sm text-error">Prosimo, potrdite, da niste robot.</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={!turnstileToken || !gdprConsent || isPending}
        >
          {isPending ? "Pošiljanje..." : "Pošlji"}
        </button>
      </form>
    </div>
  );
}
