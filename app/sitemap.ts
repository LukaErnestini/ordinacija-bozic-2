export default function sitemap() {
  return [
    {
      url: 'https://www.ordinacijabozic.si',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    {
      url: 'https://www.ordinacijabozic.si/predstavitev',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://www.ordinacijabozic.si/ordinacija-storje',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://www.ordinacijabozic.si/ordinacija-portoroz',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://www.ordinacijabozic.si/kontaktiraj-nas',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://www.ordinacijabozic.si/obvestila',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: 'https://www.ordinacijabozic.si/splosno-zobozdravstvo',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: 'https://www.ordinacijabozic.si/ortodontija',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: 'https://www.ordinacijabozic.si/protetika',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }
  ]
} 