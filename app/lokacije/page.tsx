import Location from "@/components/locations/location";

export default function BusinessLocations() {
  const locations = [
    {
      name: "Downtown Office",
      address: "123 Main St, Cityville, State 12345",
      phone: "(555) 123-4567",
      email: "downtown@example.com",
      hours: "Mon-Fri: 9:00 AM - 5:00 PM\nSat: 10:00 AM - 2:00 PM\nSun: Closed",
      mapUrl: "https://www.google.com/maps/embed?pb=YOUR_EMBED_URL_HERE_1"
    },
    {
      name: "Suburban Branch",
      address: "456 Oak Rd, Townsburg, State 67890",
      phone: "(555) 987-6543",
      email: "suburban@example.com",
      hours: "Mon-Fri: 8:30 AM - 6:00 PM\nSat-Sun: 10:00 AM - 4:00 PM",
      mapUrl: "https://www.google.com/maps/embed?pb=YOUR_EMBED_URL_HERE_2"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Our Locations</h1>
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
        {locations.map((location, index) => (
          <Location
            key={index}
            {...location}
          />
        ))}
      </div>
    </div>
  );
}
