import { Product, Review, PushNotification } from "../types";

export const INITIAL_PRODUCTS: Product[] = [
  // GARELU
  {
    id: "g1",
    name: "Pappu Garelu",
    category: "GARELU",
    price: 300,
    description: "Classic traditional crispy lentil donuts made with premium chana dal, onions, ginger, and green chillies.",
    isAvailable: true
  },
  {
    id: "g2",
    name: "Palli Garelu",
    category: "GARELU",
    price: 300,
    description: "Deliciously crunchy peanut-infused savory donuts roasted to a gorgeous golden hue.",
    isAvailable: true
  },
  {
    id: "g3",
    name: "Shanaga Pappu Garelu",
    category: "GARELU",
    price: 300,
    description: "Crispy-fried traditional chana dal garelu, a deeply aromatic festive specialty.",
    isAvailable: true
  },
  {
    id: "g4",
    name: "Pachi Mirchi Garelu",
    category: "GARELU",
    price: 320,
    description: "Traditional spicy lentil donuts flavored with fresh minced green chillies (pachi mirchi) and aromatic spices.",
    isAvailable: true
  },

  // SAKINALU
  {
    id: "s1",
    name: "White Sakinalu",
    category: "SAKINALU",
    price: 300,
    description: "Legendary Telangana spiral sesame and rice flour loops, hand-shaped with extreme precision.",
    isAvailable: true
  },
  {
    id: "s2",
    name: "Karam Sakinalu",
    category: "SAKINALU",
    price: 300,
    description: "Spicy variant of the traditional spiral rice-flour snack, infused with fresh red chili powder.",
    isAvailable: true
  },

  // MURUKULU
  {
    id: "m1",
    name: "Salted Murukulu",
    category: "MURUKULU",
    price: 300,
    description: "Crispy savory golden coils with subtle hints of carom (ajwain) and sesame seeds.",
    isAvailable: true
  },
  {
    id: "m2",
    name: "Karam Murukulu",
    category: "MURUKULU",
    price: 300,
    description: "Crunchy spiral rice flour savories, perfectly fried and seasoned with hand-ground red chilies.",
    isAvailable: true
  },
  {
    id: "m3",
    name: "Karapusa",
    category: "MURUKULU",
    price: 300,
    description: "Fine, crispy golden chickpea flour sev strings, highly addictive and perfect afternoon tea companion.",
    isAvailable: true
  },

  // SWEETS
  {
    id: "sw1",
    name: "Boondi Laddu",
    category: "SWEETS",
    price: 300,
    description: "Juicy golden boondi spheres sweet, delicately flavored with cardamom, cashews, and pure ghee.",
    isAvailable: true
  },
  {
    id: "sw2",
    name: "Badusha",
    category: "SWEETS",
    price: 300,
    description: "Flaky, layered traditional sweet donuts glazed with cardamom syrup, melt-in-your-mouth texture.",
    isAvailable: true
  },
  {
    id: "sw3",
    name: "Burelu",
    category: "SWEETS",
    price: 300,
    description: "Deep-fried sweet rice flour dumplings stuffed with cooked sweet chana dal and coconut jaggery.",
    isAvailable: true
  },
  {
    id: "sw4",
    name: "Kobbari Laddu",
    category: "SWEETS",
    price: 300,
    description: "Rich and moist sweet coconut laddoos crafted with organic jaggery and fresh cardamom.",
    isAvailable: true
  },
  {
    id: "sw5",
    name: "Ravva Laddu",
    category: "SWEETS",
    price: 300,
    description: "Fragrant roasted semolina (suji) laddoos studded with ghee-fried cashews, raisins, and grated coconut.",
    isAvailable: true
  },
  {
    id: "sw6",
    name: "Chekkari Karijelu",
    category: "SWEETS",
    price: 300,
    description: "Crispy crescent pastry pockets stuffed with a rich, sweet mixture of roasted semolina, sugar, and poppy seeds.",
    isAvailable: true
  },
  {
    id: "sw7",
    name: "Bellam Karijelu",
    category: "SWEETS",
    price: 320,
    description: "Traditional crispy pastry pockets filled with organic sweet jaggery, coconut, and cardamom.",
    isAvailable: true
  },
  {
    id: "sw8",
    name: "Chekkari Gavvalu",
    category: "SWEETS",
    price: 300,
    description: "Charming shell-shaped sweet flour cookies deeply soaked in crystal clear sugar syrup.",
    isAvailable: true
  },
  {
    id: "sw9",
    name: "Bellam Gavvalu",
    category: "SWEETS",
    price: 320,
    description: "Authentic shell-shaped sweet cookies heavily coated to perfection in melted organic jaggery syrup.",
    isAvailable: true
  },
  {
    id: "sw10",
    name: "Nuvvula Laddu",
    category: "SWEETS",
    price: 300,
    description: "Extremely nutritious sweet balls made of slow-roasted sesame seeds and rich iron-source jaggery.",
    isAvailable: true
  },
  {
    id: "sw11",
    name: "Palli Laddu",
    category: "SWEETS",
    price: 300,
    description: "Crunchy, hand-bound sweet roasted peanuts bars made with hot, spun caramel-like jaggery.",
    isAvailable: true
  },
  {
    id: "sw12",
    name: "Nuvvulu & Pallilu Laddu",
    category: "SWEETS",
    price: 300,
    description: "Perfect double benefit sweet ball combining rich peanuts, roasted sesame seeds, and molasses.",
    isAvailable: true
  },

  // SUNNUNDALU
  {
    id: "sn1",
    name: "Ragi Bellam Sunnundalu",
    category: "SUNNUNDALU",
    price: 500,
    description: "Pristine roasted finger millet sweet laddoos, sweetened with pure organic jaggery and bound with pure cow ghee.",
    isAvailable: true
  },
  {
    id: "sn2",
    name: "Minapa Bellam Sunnundalu",
    category: "SUNNUNDALU",
    price: 500,
    description: "Traditional roasted black gram (urad dal) sweet balls, slow-bound using hot jaggery and supreme desi ghee.",
    isAvailable: true
  },
  {
    id: "sn3",
    name: "Pesara Bellam Sunnundalu",
    category: "SUNNUNDALU",
    price: 500,
    description: "Nutritious roasted green gram (moong dal) sweet balls formulated with cardamom, organic jaggery, and premium ghee.",
    isAvailable: true
  },

  // MIXTURES
  {
    id: "mx1",
    name: "Sabudhana Fry Mixture",
    category: "MIXTURES",
    price: 300,
    description: "Light and crunchy tapioca pearls mixture tossed with roasted dry fruits, peanuts, green chillies, and curry leaves.",
    isAvailable: true
  },
  {
    id: "mx2",
    name: "Spicy Boondi",
    category: "MIXTURES",
    price: 300,
    description: "Crispy chickpea flour tiny droplets tossed with hot red chili powder, roasted cashews, garlic cloves, and fresh curry leaves.",
    isAvailable: true
  },
  {
    id: "mx3",
    name: "Spicy Palli",
    category: "MIXTURES",
    price: 300,
    description: "Deep-fried skinless peanuts coated with a spicy chickpea flour crust and signature blend of dry masalas.",
    isAvailable: true
  },
  {
    id: "mx4",
    name: "Makka Pottu Mixture",
    category: "MIXTURES",
    price: 300,
    description: "Crunchy fried corn flakes savory mixture seasoned with split groundnuts, curry leaves, and spices of Jagtial.",
    isAvailable: true
  },
  {
    id: "mx5",
    name: "Salted Mungdhal",
    category: "MIXTURES",
    price: 300,
    description: "De-skinned yellow split moong dal soaked, fried to crunchy perfection, and lightly seasoned with pink salt.",
    isAvailable: true
  },
  {
    id: "mx6",
    name: "Paper Chuda Atukulu",
    category: "MIXTURES",
    price: 300,
    description: "Extremely light paper-thin beaten rice flakes roasted with turmeric, mustard seeds, fried green chillies, and cashews.",
    isAvailable: true
  },
  {
    id: "mx7",
    name: "Pappu Chegodilu",
    category: "MIXTURES",
    price: 300,
    description: "Classic golden-fried ring-shaped spicy rice flour snacks, highly crunchy with roasted moong lentils in every bite.",
    isAvailable: true
  },
  {
    id: "mx8",
    name: "Spicy Shanaga Pappu Fry",
    category: "MIXTURES",
    price: 300,
    description: "Delectable fried crisp split Bengal gram seasoned with hot red pepper flakes and crushed garlic spices.",
    isAvailable: true
  },

  // PICKLES
  {
    id: "pk1",
    name: "Tomato Pickle",
    category: "PICKLES",
    price: 400,
    description: "Spicy and tangy traditional Andhra style tomato pickle, infused with mustard seeds, garlic, and cold-pressed oil.",
    isAvailable: true
  },
  {
    id: "pk2",
    name: "Kakarakaya Pickle",
    category: "PICKLES",
    price: 400,
    description: "Exquisite bitter gourd pickle prepared with roasted sesame, cumin seeds, tamarind extract, and local Telangana spices.",
    isAvailable: true
  },
  {
    id: "pk3",
    name: "Mango Pickle",
    category: "PICKLES",
    price: 400,
    description: "Legendary Andhra Avakaya pickle made with fresh green mangoes, mustard powder, red chillies, and sesame oil.",
    isAvailable: true
  },
  {
    id: "pk4",
    name: "Mango Allam Pickle",
    category: "PICKLES",
    price: 500,
    description: "Tangy pickle made of fresh green ginger-mango cubes and a robust spice mixture of Jagtial.",
    isAvailable: true
  },
  {
    id: "pk5",
    name: "Pulihora Pickle",
    category: "PICKLES",
    price: 400,
    description: "Tangy specialty tamarind pickle with roasted lentils, green chillies, and curry leaves – perfect companion for hot rice.",
    isAvailable: true
  },
  {
    id: "pk6",
    name: "Chicken Boneless Pickle",
    category: "PICKLES",
    price: 1200,
    description: "Succulent boneless chicken pieces fried crisp and marinated in ginger-garlic paste and traditional rich pickle spices.",
    isAvailable: true
  },
  {
    id: "pk7",
    name: "Chicken With Bone Pickle",
    category: "PICKLES",
    price: 1000,
    description: "Homestyle bone-in chicken pickle slow-cooked with fresh roasted spices and traditional sesame oil.",
    isAvailable: true
  },
  {
    id: "pk8",
    name: "Mutton Boneless Pickle",
    category: "PICKLES",
    price: 1800,
    description: "Premium boneless tender mutton chunks roasted and seasoned with highly aromatic spices for high shelf life.",
    isAvailable: true
  },
  {
    id: "pk9",
    name: "Mutton With Bone Pickle",
    category: "PICKLES",
    price: 1600,
    description: "Delicious tender mutton pieces prepared in bone-in style with traditional Telangana red chili and garlic masala.",
    isAvailable: true
  },
  {
    id: "pk10",
    name: "Fish Pickle (Koramenu)",
    category: "PICKLES",
    price: 1800,
    description: "Highly prized Koramenu (Murrel fish) fillets fried to a crisp and marinated in a signature blend of local spices.",
    isAvailable: true
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rv1",
    customerName: "Ramesh Kumar (Jagtial)",
    rating: 5,
    text: "The Sakinalu here tastes exactly like what my grandmother used to make! Excellent crunch and perfect salt balance. Heartily recommended!",
    date: "June 12, 2026"
  },
  {
    id: "rv2",
    customerName: "M. Anuradha (Ganesh Nagar)",
    rating: 5,
    text: "Pappu Garelu is our family standard for Sunday snacks now. Freshly prepared, delivered crisp and non-greasy. Desi Ghee Minapa Sunnundalu are supreme!",
    date: "June 14, 2026"
  },
  {
    id: "rv3",
    customerName: "Sandeep Reddy",
    rating: 4,
    text: "Highly reliable home foods outlet. The ordering process is very quick and they coordinate beautifully via WhatsApp. Very hygienic packaging too.",
    date: "June 15, 2026"
  }
];

export const INITIAL_NOTIFICATIONS: PushNotification[] = [];
