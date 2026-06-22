const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

function loadSchemaHelpers() {
  const sourcePath = path.join(__dirname, "schema.ts");
  const source = fs.readFileSync(sourcePath, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: sourcePath,
  });

  const module = { exports: {} };
  const sandbox = {
    exports: module.exports,
    module,
    require,
  };

  vm.runInNewContext(outputText, sandbox, { filename: sourcePath });

  return module.exports;
}

test("buildDentalClinicSchema derives clinic schema from Tina content without regressing current SEO fields", () => {
  const { buildDentalClinicSchema } = loadSchemaHelpers();

  const schema = buildDentalClinicSchema({
    siteTitle: "Specialistična zobozdravstvena ordinacija Božič",
    siteDescription: "Zobozdravstvo v Sežani in Portorožu.",
    logoPath: "/logo2_crn.png",
    locations: [
      {
        phone: ["041 823 515", "05 7686 001"],
        email: "szo.infos@gmail.com",
        addressStructured: {
          street: "Štorje 41A",
          postalCode: "6210",
          city: "Sežana",
          country: "SI",
        },
      },
      {
        phone: ["040 771 804", "05 6744 025"],
        email: "portoroz@example.com",
        addressStructured: {
          street: "Zatišje 5",
          postalCode: "6320",
          city: "Portorož",
          country: "SI",
        },
      },
      {
        phone: [],
        email: "",
        addressStructured: {
          street: "",
          postalCode: "1000",
          city: "Ljubljana",
          country: "SI",
        },
      },
    ],
    serviceCategoryTitles: ["Splošno zobozdravstvo", "Ortodontija", ""],
  });

  assert.equal(schema["@context"], "https://schema.org");
  assert.equal(schema["@type"], "DentalClinic");
  assert.equal(schema["@id"], "https://www.ordinacijabozic.si/#clinic");
  assert.equal(schema.logo, "https://www.ordinacijabozic.si/logo2_crn.png");
  assert.equal(schema.image, "https://www.ordinacijabozic.si/logo2_crn.png");
  assert.equal(schema.medicalSpecialty, "Dentistry");
  assert.equal(schema.priceRange, "€€");
  assert.equal(schema.email, "szo.infos@gmail.com");
  assert.deepEqual(schema.telephone, [
    "+386 41 823 515",
    "+386 5 7686 001",
    "+386 40 771 804",
    "+386 5 6744 025",
  ]);
  assert.deepEqual(JSON.parse(JSON.stringify(schema.address)), [
    {
      "@type": "PostalAddress",
      streetAddress: "Štorje 41A",
      addressLocality: "Sežana",
      postalCode: "6210",
      addressCountry: "SI",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "Zatišje 5",
      addressLocality: "Portorož",
      postalCode: "6320",
      addressCountry: "SI",
    },
  ]);
  assert.deepEqual(
    JSON.parse(JSON.stringify(schema.hasOfferCatalog.itemListElement)).map(
      (item) => item.itemOffered.name,
    ),
    ["Splošno zobozdravstvo", "Ortodontija"],
  );
});
