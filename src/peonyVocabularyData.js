const SET_ID = "peony-kitchen-core-prep";

export const PEONY_CATEGORY_ORDER = [
  "Sheet codes and instructions",
  "Meat and protein",
  "Vegetables and other ingredients",
];

export const PEONY_CARDS_PER_DAY = 3;

// Add vocabulary as: [English, Vietnamese, category, example, image URL, optional image keyword].
const CARD_SPECS = [

  ["chicken", "thịt gà", "Meat and protein", "Prepare a medium portion of chicken.", "https://tse3.mm.bing.net/th/id/OIP.fKo3TAfgm1bjP57ugU-ZCgHaEc?r=0&pid=Api&h=220&P=0"],
  ["duck", "thịt vịt", "Meat and protein", "Prepare a small portion of duck.", "https://tse4.mm.bing.net/th/id/OIP.cn9s6tSh6QvE0dH3osECIgHaHa?r=0&pid=Api&h=220&P=0"],
  ["beef", "thịt bò", "Meat and protein", "Prepare the beef.", "https://tse2.mm.bing.net/th/id/OIP.4YJIgMM5K8rZCMb2QBErGwHaEn?r=0&pid=Api&h=220&P=0"],
  ["short rib", "sườn bò", "Meat and protein", "Prepare the short rib.", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuN2PI3h0rQ6h-b51M0Q1Wlr_oeNmpI4Irfv1VzRzrdA&s=10"],
  ["steak", "Bít tết bò", "Meat and protein", "Prepare the steak.",
    "https://sp.yimg.com/ib/th?id=OPHS.%2bRMSZqJV8oRAKg474C474&o=5&pid=21.1&w=174&h=174"],
  ["pork", "thịt heo", "Meat and protein", "Prepare the pork.", "https://tse1.mm.bing.net/th/id/OIP.Hc1O3Zxc3qYoYn9YbyP0BwHaE8?r=0&pid=Api&h=220&P=0"],
  ["pork rib", "sườn heo", "Meat and protein", "Prepare the pork rib.",
    "https://tse1.mm.bing.net/th/id/OIP.XqgKdTWxcb4fDfNvfOAgzgHaFz?r=0&pid=Api&h=220&P=0"],
  ["bacon", "thịt xông khói", "Meat and protein", "Prepare the bacon.", "https://tse1.mm.bing.net/th/id/OIP.AYjyTY_imlOxZWWIO39KngHaHa?r=0&pid=Api&h=220&P=0"],
  ["shrimp / prawn", "tôm", "Meat and protein", "Prepare ten shrimp with shell.", "https://tse3.mm.bing.net/th/id/OIP.lNvwBoWcsWy-6K-_fc4IOwHaLH?r=0&pid=Api&h=220&P=0", "raw shrimp"],
  ["white fish", "cá thịt trắng", "Meat and protein", "Prepare the white fish.", "https://tse1.mm.bing.net/th/id/OIP.xPCcq-ODWzTspHSV1aokKgHaHa?r=0&pid=Api&h=220&P=0"],
  ["tofu", "đậu hũ", "Meat and protein", "Prepare the tofu.", "https://tse2.mm.bing.net/th/id/OIP.Le4lFPiq2z_sMNCqkl2_0wHaE8?r=0&pid=Api&h=220&P=0"],
  [
    "scallops",
    "sò điệp",
    "Meat and protein",
    "Prepare the scallops.",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXjby26T_k9ALY61z2XffueKpF5Rv6zsQ5v1wccg3umw&s=10",
  ],
  [
    "squid",
    "mực",
    "Meat and protein",
    "Prepare the scallops.",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt9lqpmB4X8DS5MV6BpS5zi-R_ZFMZ26B34FyiVJCC4Q&s=10",
  ],
  [
    "seafood",
    "hải sản",
    "Meat and protein",
    "Prepare the scallops.",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD5Q7WollWfPDWBcsnAS6Z6YpAFypPFCkHtVlZqXgrZA&s=10",
  ],
  [
    "mussels",
    "con vẹm",
    "Meat and protein",
    "Prepare the mussels.",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST5OqLSc-62VuNJ1ZwmRzH_WOmdd9yum4u98s0PLqtUA&s=10",
  ],
  [
    "BBQ pork",
    "thịt heo BBQ / xá xíu",
    "Meat and protein",
    "Prepare the BBQ pork.",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTwl47UAFhT1MXVWIAK3CwVc_GHuN2qcx-yE01vW-7tQ&s=10",
  ],

  ["garlic", "tỏi", "Vegetables and other ingredients", "Prepare a small portion of garlic.", "https://tse4.mm.bing.net/th/id/OIP.r1Xc0GzwkaJNvivw31zdmAHaFj?r=0&pid=Api&h=220&P=0"],
  ["green onion", "hành lá", "Vegetables and other ingredients", "Add the green onion last.", "https://tse1.mm.bing.net/th/id/OIP.64MMLZUC_SEXwQszjFAaOQHaE8?r=0&pid=Api&h=220&P=0"],
  ["red onion", "hành tây đỏ", "Vegetables and other ingredients", "Use chopped red onion.", "https://tse4.mm.bing.net/th/id/OIP.VX-fRronTA0KV1puV3fvkAHaE8?r=0&pid=Api&h=220&P=0"],
  ["bell pepper", "ớt chuông", "Vegetables and other ingredients", "Prepare the bell pepper.", "https://tse1.mm.bing.net/th/id/OIP.PWBhssC0B9DPcLMpJxGYywHaLH?r=0&pid=Api&h=220&P=0"],
  ["jalapeño", "ớt jalapeño", "Vegetables and other ingredients", "Prepare the jalapeño.", "https://tse3.mm.bing.net/th/id/OIP.ASq9vhYuoLl9UWelG7iO6AHaFM?r=0&pid=Api&h=220&P=0"],
  ["broccoli", "bông cải xanh", "Vegetables and other ingredients", "Put the broccoli in a bowl.", "https://tse2.mm.bing.net/th/id/OIP.TVpwSVpCntYf29GJoIIs6gHaHa?r=0&pid=Api&h=220&P=0"],
  ["green beans", "đậu que", "Vegetables and other ingredients", "Prepare a large portion of green beans.", "https://tse2.mm.bing.net/th/id/OIP.ayjhsXM80N___cl-3y8qvQHaHa?r=0&pid=Api&h=220&P=0"],
  ["carrot", "cà rốt", "Vegetables and other ingredients", "Prepare the carrot.", "https://tse2.mm.bing.net/th/id/OIP.st7gZfr2SgZ9e_qTjiBoLAHaEE?r=0&pid=Api&h=220&P=0"],
  ["green onion root", "đầu hành lá", "Vegetables and other ingredients", "Prepare the green onion root.", "https://tse3.mm.bing.net/th/id/OIP._OJf90E7PlXnaahT8D76ZwHaEK?r=0&pid=Api&h=220&P=0"],
  ["mushroom", "nấm", "Vegetables and other ingredients", "Prepare the mushroom.", "https://tse1.mm.bing.net/th/id/OIP.hnILlMm9SMHth3G-Y_vyZQHaEK?r=0&pid=Api&h=220&P=0"],
  ["wood ear mushroom", "nấm mèo / mộc nhĩ", "Vegetables and other ingredients", "Prepare the wood ear mushroom.", "https://tse4.mm.bing.net/th/id/OIP.z3u3uvTK-2F9V4Q1ezsZ-gHaDA?r=0&pid=Api&h=220&P=0"],
  ["zucchini", "bí ngòi", "Vegetables and other ingredients", "Prepare the zucchini.", "https://tse1.mm.bing.net/th/id/OIP.WWzDnC9aErssrwp5Hms6OwHaHa?r=0&pid=Api&h=220&P=0"],
  ["bean sprouts", "giá đỗ", "Vegetables and other ingredients", "Put the bean sprouts in a large bowl.", "https://tse1.mm.bing.net/th/id/OIP.1RB5WBtqznJexaGDt7C9swHaE8?r=0&pid=Api&h=220&P=0"],
  ["cauliflower", "bông cải trắng", "Vegetables and other ingredients", "Prepare the cauliflower.", "https://tse2.mm.bing.net/th/id/OIP.C44zAPlGmXCQnzkyLKPNegHaF_?r=0&pid=Api&h=220&P=0"],
  ["celery", "cần tây", "Vegetables and other ingredients", "Prepare the celery.", "https://tse3.mm.bing.net/th/id/OIP.M9j6T3f3y0t-T04r9x8g3AHaE8?r=0&pid=Api&h=220&P=0"],
  ["cabbage", "bắp cải", "Vegetables and other ingredients", "Prepare the cabbage.", "https://sp.yimg.com/ib/th?id=OPHS.dhf21BYP6LP21g474C474&o=5&pid=21.1&w=174&h=174"],
  ["bok choy", "cải thìa", "Vegetables and other ingredients", "Prepare the bok choy.", "https://tse1.mm.bing.net/th/id/OIP.dvMU2sGG6DpwNHq53SQnrAHaE8?r=0&pid=Api&h=220&P=0"],
  ["snow peas", "đậu tuyết / đậu Hà Lan non", "Vegetables and other ingredients", "Prepare the snow peas.", "https://sp.yimg.com/ib/th?id=OPHS.NEbLwLU%2f9a%2b2gw474C474&o=5&pid=21.1&w=174&h=174"],
  ["pineapple", "thơm / dứa", "Vegetables and other ingredients", "Prepare the pineapple.", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUvNzF943PyOWe34WGpEgiKyamCsIMGXv_q4SbblpJzw&s=10"],
  ["rice cakes", "bánh gạo", "Vegetables and other ingredients", "Prepare the rice cakes.", "https://www.thecookingtwins.com/wp-content/uploads/2025/07/south-asian-rice-cake-featured.webp"],
  ["mixed vegetables", "rau củ thập cẩm", "Vegetables and other ingredients", "Prepare the mixed vegetables.", "https://tse4.mm.bing.net/th/id/OIP.4R_5E1U4-hgQ05eanDtkFQHaHa?r=0&pid=Api&h=220&P=0"],
  [
    "cucumber",
    "dưa leo",
    "Vegetables and other ingredients",
    "Prepare the cucumber.",
    "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRXx0aGBzOvvPoSpMQ1RofhpaMepXqOWKlFP9PREMd0MjVk_e9XokwBbfgvHr1xX1w6m2f0I524vTFrOOg7IhbUWbuDQMZoKU4lzm7shjJnvGp3Sp_HC8mIvphe8fb0KzSj1s48xspn9Q&usqp=CAc",
  ],
  [
    "Sichuan peppercorn",
    "hoa / bột tiêu Sichuan",
    "Vegetables and other ingredients",
    "Prepare the Sichuan peppercorn.",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj5_0nnvoTuUyrLQ9YBcmgGFFjunYwsHprGOwGPObTeA&s=10",
  ],
  [
    "steamed bun",
    "bánh hấp",
    "Vegetables and other ingredients",
    "Prepare the steamed bun.",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1PAKfjRlHMrGLj4pTNc7pXVjpTL40Pzco5DZw4SyMxg&s=10",
  ],
  [
    "eggplant",
    "cà tím",
    "Vegetables and other ingredients",
    "Prepare the eggplant.",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz-Ul_dWaHfcAKJxpxvH7g5YK-yj2OM05npFjDCw6H5g&s=10",
  ],
  [
    "zha cai",
    "cải bẹ muối Tứ Xuyên",
    "Vegetables and other ingredients",
    "Prepare the zha cai.",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj8aM01DL4RR0Z2C6OW_6e_W8A-kVE7bRt4bV1Qh1pdg&s=10",
  ],
  [
    "cornstarch",
    "bột bắp",
    "Vegetables and other ingredients",
    "Prepare the cornstarch.",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJeLnzK1OOnOwAyZvf5Erh_638gWrSZK54vg2phH96GA&s=10",
  ],
  [
    "honey sauce",
    "sốt mật ong",
    "Vegetables and other ingredients",
    "Prepare the honey sauce.",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSukEPei530lfpxV6tjLQ_WyOFCR1Flq2OjjN8wSYKwmA&s=10",
  ],
  [
    "stone rice",
    "cơm trong thố đá",
    "Vegetables and other ingredients",
    "Prepare the stone rice.",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFLZjt4xcniNCTIi5VTcmilfHUvgd7dAtAS2l_UhsiNw&s=10",
  ],
  [
    "brown rice",
    "cơm nâu",
    "Vegetables and other ingredients",
    "Prepare the brown rice.",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlVYPNtujgPENpfjzcacUIN8H7UxHCYp9q0IyPU9ZadQ&s=10",
  ],
  [
    "Lianzi bean",
    "Hạt sen / đậu lianzi",
    "Vegetables and other ingredients",
    "Prepare the Lianzi bean.",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTMUoImvQNzk7CvDxNCQlu1IUe6DqDtc_obLbTyKnq1A&s=10",
  ],
  [
    "radish", "củ cải trắng", "Vegetables and other ingredients", "Prepare the radish.", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6g1k5r7J8X3x2j4Z0z1G9Fq5K6Y5s5f5f5f5f5f5f&s=10",
  ],

  ["S - small", "phần nhỏ / khay nhỏ", "Sheet codes and instructions", "S means small.", "https://akreoyhzgzrzn45e.public.blob.vercel-storage.com/quiz/cup-size-s.jpg", "small food prep portion marked S"],
  ["M - medium", "phần vừa / khay vừa", "Sheet codes and instructions", "M means medium.", "https://akreoyhzgzrzn45e.public.blob.vercel-storage.com/quiz/cup-size-m.jpg", "medium food prep portion marked M"],
  ["L - large", "phần lớn / khay lớn", "Sheet codes and instructions", "L means large.", "https://akreoyhzgzrzn45e.public.blob.vercel-storage.com/quiz/cup-size-l.jpg", "large food prep portion marked L"],
  ["bowl", "tô", "Sheet codes and instructions", "Put the broccoli in a bowl.", "https://sp.yimg.com/ib/th?id=OPHS.tIX5wPIFCtL9JA474C474&o=5&pid=21.1&w=174&h=174"],
  ["large bowl", "tô lớn", "Sheet codes and instructions", "Put the bean sprouts in a large bowl.", "https://tse3.mm.bing.net/th/id/OIP.mrWbhmnuigHMNUoqyPhGRQHaGw?r=0&pid=Api&h=220&P=0"],
  ["ready pan", "khay nguyên liệu đã chuẩn bị sẵn", "Sheet codes and instructions", "Use the ready pan.", "https://tse4.mm.bing.net/th/id/OIP.iQnSpdo8ZzfwVmDRNSPZlwHaE_?r=0&pid=Api&h=220&P=0", "restaurant prep pan with organized ingredients"],
  ["blue plate", "đĩa màu xanh", "Sheet codes and instructions", "Put it on the blue plate.", "https://tse1.mm.bing.net/th/id/OIP.yoxgmzOvKJAV-7N6Ca5QhgHaFu?r=0&pid=Api&h=220&P=0"],
  ["inside", "ở bên trong", "Sheet codes and instructions", "The ingredients are inside.", "https://akreoyhzgzrzn45e.public.blob.vercel-storage.com/quiz/inside.jpg", "ingredients inside a kitchen container"],
  ["last", "cho vào sau cùng", "Sheet codes and instructions", "Add the green onion last.", "https://akreoyhzgzrzn45e.public.blob.vercel-storage.com/quiz/last.jpg", "green onion garnish added last"],
  ["chopped", "đã cắt nhỏ", "Sheet codes and instructions", "Use chopped red onion.", "https://images2.alphacoders.com/134/thumb-1920-1343967.png", "chopped red onion on a cutting board"],
  ["sliced", "đã thái lát", "Sheet codes and instructions", "Use sliced red onion.", "https://tse4.mm.bing.net/th/id/OIP.8Q-4PXux69o1_JIPmok1vQHaE8?r=0&pid=Api&h=220&P=0", "sliced red onion on a cutting board"],
  ["fry / fried", "chiên / đã chiên", "Sheet codes and instructions", "Use the fried chicken.", "https://tse1.mm.bing.net/th/id/OIP.RWxvrGb-EqDLsgGsuU_boQHaE8?r=0&pid=Api&h=220&P=0", "fried chicken in a prep tray"],
  ["with shell", "còn vỏ", "Sheet codes and instructions", "Prepare ten shrimp with shell.", "https://tse2.mm.bing.net/th/id/OIP.wa44eCyOEcJHaKuTyZBWvQHaE7?r=0&pid=Api&h=220&P=0", "raw shell-on shrimp"],
  ["boil", "luộc", "Sheet codes and instructions", "Boil the ingredients for five minutes.", "https://tse3.mm.bing.net/th/id/OIP.R7XwniEk0nj99o1TJi9RWwHaEK?r=0&pid=Api&h=220&P=0", "pot of boiling water"],
  ["piece / pc", "miếng; với tôm có thể hiểu là con", "Sheet codes and instructions", "Prepare ten pieces.", "https://tse3.mm.bing.net/th/id/OIP.z1RbOSyR-Nv9kCfw33UwAwHaFj?r=0&pid=Api&h=220&P=0", "counted food pieces on a prep tray"],
  [
    "square-cut",
    "cắt hình vuông",
    "Sheet codes and instructions",
    "Square-cut red and green peppers.",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbqihw9vk9oBaPXm3dN7qlBfjeJoJlupdvaIwpsXArSQ&s=10",
  ],
];

const slugify = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

export const PEONY_CARDS = CARD_SPECS.map(
  ([english, vietnamese, category, exampleEnglish, imageUrl, imageKeyword], index) => {
    const slug = slugify(english);
    const localImagePath = `/images/vocabulary/peony/${slug}.webp`;

    return {
      id: `${SET_ID}-${slug}`,
      english,
      vietnamese,
      category,
      day: Math.floor(index / PEONY_CARDS_PER_DAY) + 1,
      order: index + 1,
      exampleEnglish,
      audioText: english.replace(" / pc", " or P C"),
      imagePath: imageUrl || localImagePath,
      localImagePath,
      imageAlt: `Kitchen study image for ${english}`,
      imageKeyword: imageKeyword || english,
    };
  }
);

export const PEONY_TOTAL_CARDS = PEONY_CARDS.length;
export const PEONY_TOTAL_DAYS = Math.max(
  1,
  Math.ceil(PEONY_TOTAL_CARDS / PEONY_CARDS_PER_DAY)
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
  { id: "boil-five", english: "Boil 5 min", vietnamese: "luộc năm phút", cardIds: ["boil"] },
  { id: "ready-pan", english: "Ready pan", vietnamese: "lấy khay nguyên liệu đã chuẩn bị", cardIds: ["ready-pan"] },
  { id: "inside", english: "Inside", vietnamese: "nguyên liệu ở bên trong", cardIds: ["inside"] },
];

export const PEONY_VOCABULARY_SET = {
  id: SET_ID,
  title: "Peony Kitchen Core Prep",
  subtitle: "English for the ingredient-preparation columns",
  learnerProfile: "Vietnamese kitchen prep assistant",
  schedule: {
    days: PEONY_TOTAL_DAYS,
    newCardsPerDay: PEONY_CARDS_PER_DAY,
    totalCards: PEONY_TOTAL_CARDS,
  },
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
