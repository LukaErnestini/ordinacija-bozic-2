const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

function loadActions({ resendSend }) {
  const sourcePath = path.join(__dirname, "actions.ts");
  const source = fs.readFileSync(sourcePath, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: sourcePath,
  });

  class ResendMock {
    emails = {
      send: resendSend,
    };
  }

  const module = { exports: {} };
  const sandbox = {
    console: {
      ...console,
      error: () => undefined,
    },
    exports: module.exports,
    fetch: async () => ({
      ok: true,
      json: async () => ({ success: true }),
    }),
    module,
    process: {
      env: {
        CLOUDFLARE_TURNSTILE_SECRET_KEY: "test-turnstile-secret",
        RESEND_API_KEY: "test-resend-key",
      },
    },
    require: (specifier) => {
      if (specifier === "resend") {
        return { Resend: ResendMock };
      }

      return require(specifier);
    },
  };

  vm.runInNewContext(outputText, sandbox, { filename: sourcePath });

  return module.exports;
}

function validFormData() {
  const formData = new FormData();
  formData.set("name", "Test Patient");
  formData.set("email", "patient@example.com");
  formData.set("location", "Štorje");
  formData.set("message", "Rad bi se naročil na pregled.");
  formData.set("selectedMessages", JSON.stringify(["pregled"]));
  formData.set("cf-turnstile-response", "valid-token");
  return formData;
}

test("submitContactForm returns failure when Resend returns an API error", async () => {
  const { submitContactForm } = loadActions({
    resendSend: async () => ({
      data: null,
      error: { message: "Invalid API key" },
    }),
  });

  const result = await submitContactForm({ success: false }, validFormData());

  assert.equal(result.success, false);
  assert.equal(
    result.message,
    "Prišlo je do napake pri pošiljanju sporočila. Prosimo, poskusite ponovno kasneje.",
  );
});
