export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white py-16 md:rounded-2xl md:my-2 md:mx-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* Office Hours Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Urnik</h2>
          <div className="space-y-2">
            <p>Mon 9:00 am - 5:00 pm</p>
            <p>Tue 9:00 am - 5:00 pm</p>
            <p>Wed 9:00 am - 5:00 pm</p>
            <p>Thu 9:00 am - 5:00 pm</p>
            <p>Fri 9:00 am - 5:00 pm</p>
          </div>
        </div>

        {/* Contact Us Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Kontakt</h2>
          <div className="space-y-2">
            <p>lorem ipsum</p>
            <p>031 031 031</p>
            <p>email@lorem.ip</p>
          </div>
        </div>

        {/* Google Maps Section */}
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22365.37005432314!2d13.565012947964263!3d45.516695980910214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477b652f6b67a9bf%3A0xebdeaddd26419fce!2sSpecialisti%C4%8Dna%20zobozdravstvena%20ordinacija%20Bo%C5%BEi%C4%8D%20Helena%20Bo%C5%BEi%C4%8D!5e0!3m2!1ssl!2ssi!4v1734957379152!5m2!1ssl!2ssi"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="container mx-auto mt-8 pt-8 border-t border-neutral-700 px-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400">
          <p>© {new Date().getFullYear()} LOREM IPSUM. ALL RIGHT RESERVED</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="/accessibility"
              className="hover:text-white"
            >
              ACCESSIBILITY STATEMENT
            </a>
            <span>|</span>
            <a
              href="#"
              className="hover:text-white"
            >
              SITE DESIGN: 43SOFT
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
