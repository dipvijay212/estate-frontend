export const websiteMockData = {
  agencyInfo: {
    name: "Royal Realty",
    tagline: "Find Your Dream Home with the Best in Town",
    description: "We are a premier real estate agency specializing in luxury homes, commercial spaces, and premium apartments. With over 15 years of experience, we make finding your perfect property effortless.",
    phone: "+1 (555) 123-4567",
    email: "contact@royalrealty.com",
    address: "123 Beverly Hills, CA 90210",
    experience: "15+ Years",
    completedProjects: "500+",
    happyClients: "1200+"
  },
  featuredProperties: [
    {
      id: "PROP-001",
      title: "Modern Oceanfront Villa",
      location: "Malibu, CA",
      price: "$4,500,000",
      type: "Villa",
      beds: 5,
      baths: 6,
      sqft: 4500,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      status: "For Sale"
    },
    {
      id: "PROP-002",
      title: "Luxury Downtown Penthouse",
      location: "Los Angeles, CA",
      price: "$2,850,000",
      type: "Apartment",
      beds: 3,
      baths: 3,
      sqft: 2800,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      status: "For Rent"
    },
    {
      id: "PROP-003",
      title: "Serene Lake House",
      location: "Lake Tahoe, NV",
      price: "$1,950,000",
      type: "House",
      beds: 4,
      baths: 3,
      sqft: 3200,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      status: "For Sale"
    }
  ],
  allProperties: [
    {
      id: "PROP-001", title: "Modern Oceanfront Villa", location: "Malibu, CA", price: "$4,500,000", type: "Villa", beds: 5, baths: 6, sqft: 4500, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", status: "For Sale"
    },
    {
      id: "PROP-002", title: "Luxury Downtown Penthouse", location: "Los Angeles, CA", price: "$2,850,000", type: "Apartment", beds: 3, baths: 3, sqft: 2800, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", status: "For Rent"
    },
    {
      id: "PROP-003", title: "Serene Lake House", location: "Lake Tahoe, NV", price: "$1,950,000", type: "House", beds: 4, baths: 3, sqft: 3200, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", status: "For Sale"
    },
    {
      id: "PROP-004", title: "Suburban Family Home", location: "Irvine, CA", price: "$1,200,000", type: "House", beds: 4, baths: 2, sqft: 2400, image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80", status: "For Sale"
    },
    {
      id: "PROP-005", title: "Minimalist Loft", location: "San Francisco, CA", price: "$1,450,000", type: "Apartment", beds: 2, baths: 2, sqft: 1800, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", status: "Sold"
    },
    {
      id: "PROP-006", title: "Country Estate", location: "Napa Valley, CA", price: "$5,200,000", type: "Villa", beds: 6, baths: 5, sqft: 6000, image: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=800&q=80", status: "For Sale"
    },
    {
      id: "PROP-007", title: "Urban Studio", location: "Seattle, WA", price: "$650,000", type: "Apartment", beds: 1, baths: 1, sqft: 850, image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80", status: "For Rent"
    },
    {
      id: "PROP-008", title: "Modern Farmhouse", location: "Austin, TX", price: "$1,750,000", type: "House", beds: 5, baths: 4, sqft: 3800, image: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=80", status: "For Sale"
    },
    {
      id: "PROP-009", title: "Beachside Condominium", location: "Miami, FL", price: "$980,000", type: "Apartment", beds: 2, baths: 2, sqft: 1400, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", status: "For Sale"
    }
  ],
  testimonials: [
    {
      id: "T1",
      name: "Sarah Jenkins",
      role: "Homeowner",
      content: "Royal Realty made our home buying process incredibly smooth. Their team is professional, attentive, and deeply knowledgeable about the local market.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      id: "T2",
      name: "Michael Chen",
      role: "Investor",
      content: "I've worked with many agencies, but none compare to the level of service provided here. They found the perfect commercial property for my business.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=michael"
    },
    {
      id: "T3",
      name: "Emily Rodriguez",
      role: "Seller",
      content: "They sold my house in just 2 weeks above the asking price! The marketing strategy was flawless and the agents were always available to answer questions.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=emily"
    }
  ]
};

// Helper for property details page
export const getPropertyDetails = (id: string) => {
  const base = websiteMockData.allProperties.find(p => p.id === id) || websiteMockData.allProperties[0];
  
  return {
    ...base,
    gallery: [
      base.image,
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
    ],
    description: "Welcome to this breathtaking property located in one of the most sought-after neighborhoods. This meticulously maintained home features an open-concept living space with floor-to-ceiling windows that flood the rooms with natural light. The gourmet kitchen is equipped with top-of-the-line stainless steel appliances, custom cabinetry, and a large center island perfect for entertaining.\n\nRetreat to the luxurious master suite which boasts a spa-like en-suite bathroom and a spacious walk-in closet. Step outside to your private backyard oasis, complete with a beautifully landscaped garden and a covered patio for year-round enjoyment. Don't miss this rare opportunity to own a piece of paradise.",
    amenities: [
      "Swimming Pool", "Air Conditioning", "Central Heating", "Laundry Room", 
      "Gym", "Alarm System", "Window Coverings", "Free WiFi", 
      "Car Parking", "Spa & Massage"
    ],
    details: {
      propertyId: base.id,
      builtYear: "2018",
      propertySize: `${base.sqft} SqFt`,
      parking: "2 Cars",
      propertyTax: "$4,500/yr",
      hoaDues: "$250/mo",
    },
    agent: {
      name: "Jessica Pearson",
      role: "Senior Partner / Broker",
      phone: "+1 (555) 987-6543",
      email: "jessica@royalrealty.com",
      avatar: "https://i.pravatar.cc/150?u=jessica",
      license: "DRE #01234567"
    },
    nearby: [
      { name: "Central Park", distance: "0.5 miles", type: "Park" },
      { name: "Westside High School", distance: "1.2 miles", type: "Education" },
      { name: "General Hospital", distance: "2.0 miles", type: "Health" },
      { name: "Downtown Mall", distance: "3.5 miles", type: "Shopping" }
    ]
  };
};
