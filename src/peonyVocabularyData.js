const SET_ID = "peony-kitchen-core-prep";

export const PEONY_CATEGORY_ORDER = [
  "Sheet codes and instructions",
  "Meat and protein",
  "Vegetables and other ingredients",
];

const CARD_SPECS = [
  ["S - small", "phần nhỏ / khay nhỏ", "Sheet codes and instructions", "S means small."],
  ["M - medium", "phần vừa / khay vừa", "Sheet codes and instructions", "M means medium."],
  ["L - large", "phần lớn / khay lớn", "Sheet codes and instructions", "L means large."],
  ["bowl", "tô", "Sheet codes and instructions", "Put the broccoli in a bowl."],
  ["large bowl", "tô lớn", "Sheet codes and instructions", "Put the bean sprouts in a large bowl."],
  ["ready pan", "khay nguyên liệu đã chuẩn bị sẵn", "Sheet codes and instructions", "Use the ready pan."],
  ["blue plate", "đĩa màu xanh", "Sheet codes and instructions", "Put it on the blue plate."],
  ["inside", "ở bên trong", "Sheet codes and instructions", "The ingredients are inside."],
  ["last", "cho vào sau cùng", "Sheet codes and instructions", "Add the green onion last."],
  ["chopped", "đã cắt nhỏ", "Sheet codes and instructions", "Use chopped red onion."],
  ["sliced", "đã thái lát", "Sheet codes and instructions", "Use sliced red onion."],
  ["fry / fried", "chiên / đã chiên", "Sheet codes and instructions", "Use the fried chicken."],
  ["with shell", "còn vỏ", "Sheet codes and instructions", "Prepare ten shrimp with shell."],
  ["boil", "luộc", "Sheet codes and instructions", "Boil the ingredients for five minutes."],
  ["piece / pc", "miếng; với tôm có thể hiểu là con", "Sheet codes and instructions", "Prepare ten pieces."],
  ["chicken", "thịt gà", "Meat and protein", "Prepare a medium portion of chicken."],
  ["beef", "thịt bò", "Meat and protein", "Prepare the beef."],
  ["pork", "thịt heo", "Meat and protein", "Prepare the pork."],
  ["bacon", "thịt xông khói", "Meat and protein", "Prepare the bacon."],
  ["shrimp / prawn", "tôm", "Meat and protein", "Prepare ten shrimp with shell."],
  ["white fish", "cá thịt trắng", "Meat and protein", "Prepare the white fish."],
  ["tofu", "đậu hũ", "Meat and protein", "Prepare the tofu."],
  ["garlic", "tỏi", "Vegetables and other ingredients", "Prepare a small portion of garlic."],
  ["green onion", "hành lá", "Vegetables and other ingredients", "Add the green onion last."],
  ["red onion", "hành tây đỏ", "Vegetables and other ingredients", "Use chopped red onion."],
  ["bell pepper", "ớt chuông", "Vegetables and other ingredients", "Prepare the bell pepper."],
  ["jalapeño", "ớt jalapeño", "Vegetables and other ingredients", "Prepare the jalapeño."],
  ["broccoli", "bông cải xanh", "Vegetables and other ingredients", "Put the broccoli in a bowl."],
  ["green beans", "đậu que", "Vegetables and other ingredients", "Prepare a large portion of green beans."],
  ["carrot", "cà rốt", "Vegetables and other ingredients", "Prepare the carrot."],
  ["green onion root", "đầu hành lá", "Vegetables and other ingredients", "Prepare the green onion root."],
  ["mushroom", "nấm", "Vegetables and other ingredients", "Prepare the mushroom."],
  ["wood ear mushroom", "nấm mèo / mộc nhĩ", "Vegetables and other ingredients", "Prepare the wood ear mushroom."],
  ["zucchini", "bí ngòi", "Vegetables and other ingredients", "Prepare the zucchini."],
  ["bean sprouts", "giá đỗ", "Vegetables and other ingredients", "Put the bean sprouts in a large bowl."],
  ["cauliflower", "bông cải trắng", "Vegetables and other ingredients", "Prepare the cauliflower."],
  ["celery", "cần tây", "Vegetables and other ingredients", "Prepare the celery."],
  ["cabbage", "bắp cải", "Vegetables and other ingredients", "Prepare the cabbage."],
  ["bok choy", "cải thìa", "Vegetables and other ingredients", "Prepare the bok choy."],
  ["snow peas", "đậu tuyết / đậu Hà Lan non", "Vegetables and other ingredients", "Prepare the snow peas."],
  ["rice cakes", "bánh gạo", "Vegetables and other ingredients", "Prepare the rice cakes."],
  ["mixed vegetables", "rau củ thập cẩm", "Vegetables and other ingredients", "Prepare the mixed vegetables."],
];

const slugify = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

const IMAGE_KEYWORDS = {
  "S - small": "small food prep portion marked S",
  "M - medium": "medium food prep portion marked M",
  "L - large": "large food prep portion marked L",
  "ready pan": "restaurant prep pan with organized ingredients",
  inside: "ingredients inside a kitchen container",
  last: "green onion garnish added last",
  chopped: "chopped red onion on a cutting board",
  sliced: "sliced red onion on a cutting board",
  "fry / fried": "fried chicken in a prep tray",
  "with shell": "raw shell-on shrimp",
  "boil five minutes": "kitchen timer beside a boiling pot",
  "piece / pc": "counted food pieces on a prep tray",
  "shrimp / prawn": "raw shrimp",
};

const IMAGE_URLS = {
  // Sheet codes and instructions
  "S - small":
    "https://akreoyhzgzrzn45e.public.blob.vercel-storage.com/quiz/cup-size-s.jpg",
  "M - medium":
    "https://akreoyhzgzrzn45e.public.blob.vercel-storage.com/quiz/cup-size-m.jpg",
  "L - large":
    "https://akreoyhzgzrzn45e.public.blob.vercel-storage.com/quiz/cup-size-l.jpg",
  bowl: "https://sp.yimg.com/ib/th?id=OPHS.tIX5wPIFCtL9JA474C474&o=5&pid=21.1&w=174&h=174",
  "large bowl": "https://tse3.mm.bing.net/th/id/OIP.mrWbhmnuigHMNUoqyPhGRQHaGw?r=0&pid=Api&h=220&P=0",
  "ready pan": "https://tse4.mm.bing.net/th/id/OIP.iQnSpdo8ZzfwVmDRNSPZlwHaE_?r=0&pid=Api&h=220&P=0",
  "blue plate":
    "https://tse1.mm.bing.net/th/id/OIP.yoxgmzOvKJAV-7N6Ca5QhgHaFu?r=0&pid=Api&h=220&P=0",
  inside: "https://akreoyhzgzrzn45e.public.blob.vercel-storage.com/quiz/inside.jpg",
  last: "https://akreoyhzgzrzn45e.public.blob.vercel-storage.com/quiz/last.jpg",
  chopped: "https://images2.alphacoders.com/134/thumb-1920-1343967.png",
  sliced: "https://tse4.mm.bing.net/th/id/OIP.8Q-4PXux69o1_JIPmok1vQHaE8?r=0&pid=Api&h=220&P=0",
  "fry / fried": "https://tse1.mm.bing.net/th/id/OIP.RWxvrGb-EqDLsgGsuU_boQHaE8?r=0&pid=Api&h=220&P=0",
  "with shell": "https://tse2.mm.bing.net/th/id/OIP.wa44eCyOEcJHaKuTyZBWvQHaE7?r=0&pid=Api&h=220&P=0",
  "boil": "https://tse3.mm.bing.net/th/id/OIP.R7XwniEk0nj99o1TJi9RWwHaEK?r=0&pid=Api&h=220&P=0",
  "piece / pc": "https://tse3.mm.bing.net/th/id/OIP.z1RbOSyR-Nv9kCfw33UwAwHaFj?r=0&pid=Api&h=220&P=0",

  // Meat and protein
  chicken: "https://tse3.mm.bing.net/th/id/OIP.fKo3TAfgm1bjP57ugU-ZCgHaEc?r=0&pid=Api&h=220&P=0",
  beef: "https://tse2.mm.bing.net/th/id/OIP.4YJIgMM5K8rZCMb2QBErGwHaEn?r=0&pid=Api&h=220&P=0",
  pork: "https://tse1.mm.bing.net/th/id/OIP.Hc1O3Zxc3qYoYn9YbyP0BwHaE8?r=0&pid=Api&h=220&P=0",
  bacon: "https://tse1.mm.bing.net/th/id/OIP.AYjyTY_imlOxZWWIO39KngHaHa?r=0&pid=Api&h=220&P=0",
  "shrimp / prawn": "https://tse3.mm.bing.net/th/id/OIP.lNvwBoWcsWy-6K-_fc4IOwHaLH?r=0&pid=Api&h=220&P=0",
  "white fish": "https://tse2.mm.bing.net/th/id/OIP.LGBdK8_G6bjWX2rRvuW25AHaHa?r=0&pid=Api&h=220&P=0",
  tofu: "https://tse2.mm.bing.net/th/id/OIP.Le4lFPiq2z_sMNCqkl2_0wHaE8?r=0&pid=Api&h=220&P=0",

  // Vegetables and other ingredients
  garlic: "https://tse4.mm.bing.net/th/id/OIP.r1Xc0GzwkaJNvivw31zdmAHaFj?r=0&pid=Api&h=220&P=0",
  "green onion": "https://tse1.mm.bing.net/th/id/OIP.64MMLZUC_SEXwQszjFAaOQHaE8?r=0&pid=Api&h=220&P=0",
  "red onion": "https://tse4.mm.bing.net/th/id/OIP.VX-fRronTA0KV1puV3fvkAHaE8?r=0&pid=Api&h=220&P=0",
  "bell pepper": "https://tse1.mm.bing.net/th/id/OIP.PWBhssC0B9DPcLMpJxGYywHaLH?r=0&pid=Api&h=220&P=0",
  "jalapeño": "https://tse3.mm.bing.net/th/id/OIP.ASq9vhYuoLl9UWelG7iO6AHaFM?r=0&pid=Api&h=220&P=0",
  broccoli: "https://tse2.mm.bing.net/th/id/OIP.TVpwSVpCntYf29GJoIIs6gHaHa?r=0&pid=Api&h=220&P=0",
  "green beans": "https://tse2.mm.bing.net/th/id/OIP.ayjhsXM80N___cl-3y8qvQHaHa?r=0&pid=Api&h=220&P=0",
  carrot: "https://tse2.mm.bing.net/th/id/OIP.st7gZfr2SgZ9e_qTjiBoLAHaEE?r=0&pid=Api&h=220&P=0",
  "green onion root": "https://tse3.mm.bing.net/th/id/OIP._OJf90E7PlXnaahT8D76ZwHaEK?r=0&pid=Api&h=220&P=0",
  mushroom: "https://tse1.mm.bing.net/th/id/OIP.hnILlMm9SMHth3G-Y_vyZQHaEK?r=0&pid=Api&h=220&P=0",
  "wood ear mushroom": "https://tse4.mm.bing.net/th/id/OIP.z3u3uvTK-2F9V4Q1ezsZ-gHaDA?r=0&pid=Api&h=220&P=0",
  zucchini: "https://tse1.mm.bing.net/th/id/OIP.WWzDnC9aErssrwp5Hms6OwHaHa?r=0&pid=Api&h=220&P=0",
  "bean sprouts": "https://tse1.mm.bing.net/th/id/OIP.1RB5WBtqznJexaGDt7C9swHaE8?r=0&pid=Api&h=220&P=0",
  cauliflower: "https://tse2.mm.bing.net/th/id/OIP.C44zAPlGmXCQnzkyLKPNegHaF_?r=0&pid=Api&h=220&P=0",
  celery: "https://tse3.mm.bing.net/th/id/OIP.M9j6T3f3y0t-T04r9x8g3AHaE8?r=0&pid=Api&h=220&P=0",
  cabbage: "https://sp.yimg.com/ib/th?id=OPHS.dhf21BYP6LP21g474C474&o=5&pid=21.1&w=174&h=174",
  "bok choy": "https://tse1.mm.bing.net/th/id/OIP.dvMU2sGG6DpwNHq53SQnrAHaE8?r=0&pid=Api&h=220&P=0",
  "snow peas": "https://sp.yimg.com/ib/th?id=OPHS.NEbLwLU%2f9a%2b2gw474C474&o=5&pid=21.1&w=174&h=174",
  "rice cakes": "https://www.thecookingtwins.com/wp-content/uploads/2025/07/south-asian-rice-cake-featured.webp",
  "mixed vegetables": "https://tse4.mm.bing.net/th/id/OIP.4R_5E1U4-hgQ05eanDtkFQHaHa?r=0&pid=Api&h=220&P=0",
};

export const PEONY_CARDS = CARD_SPECS.map(
  ([english, vietnamese, category, exampleEnglish], index) => {
    const slug = slugify(english);
    const localImagePath = `/images/vocabulary/peony/${slug}.webp`;

    return {
      id: `${SET_ID}-${slug}`,
      english,
      vietnamese,
      category,
      day: Math.floor(index / 3) + 1,
      order: index + 1,
      exampleEnglish,
      audioText: english.replace(" / pc", " or P C"),
      imagePath: IMAGE_URLS[english] || localImagePath,
      localImagePath,
      imageAlt: `Kitchen study image for ${english}`,
      imageKeyword: IMAGE_KEYWORDS[english] || english,
    };
  }
);

export const PEONY_INSTRUCTION_PRACTICE = [
  { id: "medium-chicken", english: "(M) chicken", vietnamese: "phần vừa thịt gà", cardIds: ["m-medium", "chicken"] },
  { id: "large-green-beans", english: "(L) green beans", vietnamese: "phần lớn đậu que", cardIds: ["l-large", "green-beans"] },
  { id: "small-garlic", english: "(S) garlic", vietnamese: "phần nhỏ tỏi", cardIds: ["s-small", "garlic"] },
  { id: "bowl-broccoli", english: "(Bowl) broccoli", vietnamese: "một tô bông cải xanh", cardIds: ["bowl", "broccoli"] },
  { id: "large-bowl-bean-sprouts", english: "(Large bowl) bean sprouts", vietnamese: "một tô lớn giá đỗ", cardIds: ["large-bowl", "bean-sprouts"] },
  { id: "small-chopped-red-onion", english: "(S) chopped red onion", vietnamese: "phần nhỏ hành tây đỏ cắt nhỏ", cardIds: ["s-small", "chopped", "red-onion"] },
  { id: "large-sliced-red-onion", english: "(L) sliced red onion", vietnamese: "phần lớn hành tây đỏ thái lát", cardIds: ["l-large", "sliced", "red-onion"] },
  { id: "shrimp-shell", english: "10 shrimp with shell", vietnamese: "10 con tôm còn vỏ", cardIds: ["shrimp-prawn", "with-shell", "piece-pc"] },
  { id: "last-green-onion", english: "Last: green onion", vietnamese: "cho hành lá vào sau cùng", cardIds: ["last", "green-onion"] },
  { id: "boil-five", english: "Boil 5 min", vietnamese: "luộc năm phút", cardIds: ["boil-five-minutes"] },
  { id: "ready-pan", english: "Ready pan", vietnamese: "lấy khay nguyên liệu đã chuẩn bị", cardIds: ["ready-pan"] },
  { id: "inside", english: "Inside", vietnamese: "nguyên liệu ở bên trong", cardIds: ["inside"] },
];

export const PEONY_VOCABULARY_SET = {
  id: SET_ID,
  title: "Peony Kitchen Core Prep",
  subtitle: "English for the ingredient-preparation columns",
  learnerProfile: "Vietnamese kitchen prep assistant",
  schedule: { days: 14, newCardsPerDay: 3, totalCards: 42 },
  cards: PEONY_CARDS,
  instructionPractice: PEONY_INSTRUCTION_PRACTICE,
};

export const PEONY_IMAGE_MANIFEST = PEONY_CARDS.map((card) => ({
  vocabularyId: card.id,
  expectedFilename: card.localImagePath.split("/").pop(),
  imageUrl: card.imagePath.startsWith("http") ? card.imagePath : null,
  imageKeyword: card.imageKeyword,
  imageDescription: `Clear kitchen training photo of ${card.imageKeyword}, plain background, no text`,
}));

export const PEONY_STORAGE_KEY = `quiz-app:${SET_ID}:progress-v1`;
