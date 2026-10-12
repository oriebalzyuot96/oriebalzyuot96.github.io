/* GoodDay Bakery · catalogue. Product names, categories and prices follow the 2020 team menu (data.json), rewritten and translated. */

export const CATS = [
  { id: 'bread', icon: '🍞', en: 'Bread', ar: 'الخبز', blurb: { en: 'Sourdough, saj and everyday loaves, baked before sunrise.', ar: 'عجين مخمّر وخبز صاج ورغيف كل يوم، يُخبز قبل الفجر.' } },
  { id: 'dessert', icon: '🍰', en: 'Desserts', ar: 'الحلويات', blurb: { en: 'Loaf cakes, rolls and little sweet things.', ar: 'كيك وقوالب ولفائف وحلويات صغيرة.' } },
  { id: 'cookies', icon: '🥨', en: 'Ka\'ek & crackers', ar: 'كعك ومقرمشات', blurb: { en: 'Sesame ka\'ek, bagels, straws and crackers.', ar: 'كعك بالسمسم وبيغل وأصابع ومقرمشات.' } },
];

/* tone = tile gradient pair */
const T = {
  wheat: ['#f6d8a8', '#e7a85b'], crust: ['#f3c58f', '#c47a3a'], cream: ['#fbe9cf', '#f0c48a'], rye: ['#e6cfb0', '#9b6b43'],
  berry: ['#f8c9d4', '#d9577a'], citrus: ['#ffe2a6', '#f39a2b'], apple: ['#f9d5c4', '#d8573c'], cocoa: ['#e7c6a8', '#7b4a2c'],
  pistachio: ['#dfeec9', '#86a85a'], sesame: ['#f6e3b9', '#c99a4c'], blue: ['#d9dcf7', '#6a6fc9'], herb: ['#dcebd2', '#5f8f4e'],
};

export const PRODUCTS = [
  // bread
  { id: 'goodday-sourdough', cat: 'bread', emoji: '🍞', tone: T.crust, price: 2.5, rating: 4.9, reviews: 312, tags: ['best', 'vegan'], allergens: ['gluten'],
    name: { en: 'GoodDay sourdough', ar: 'خبز جود داي المخمّر' },
    desc: { en: 'Our house sourdough: 36-hour cold ferment, blistered crust and an open, tangy crumb. It will take you to another world.', ar: 'عجيننا المخمّر الخاص: تخمير بارد ٣٦ ساعة، قشرة مقرمشة ولبّ هشّ بطعم حامض لطيف.' } },
  { id: 'garlic-herb-cheese', cat: 'bread', emoji: '🥖', tone: T.wheat, price: 3.5, rating: 4.8, reviews: 201, tags: ['best'], allergens: ['gluten', 'dairy'],
    name: { en: 'Garlic, herb & cheese bread', ar: 'خبز الثوم والأعشاب والجبنة' },
    desc: { en: 'Pull-apart loaf with roasted garlic, za\'atar butter and melted mozzarella. Made for a fresh breakfast.', ar: 'رغيف يُقطّع باليد مع ثوم محمّص وزبدة بالزعتر وموزاريلا ذائبة. لفطور طازج.' } },
  { id: 'brown-toast', cat: 'bread', emoji: '🍞', tone: T.rye, price: 2.5, rating: 4.6, reviews: 98, tags: ['gf', 'vegan'], allergens: ['seeds'],
    name: { en: 'Seeded pumpernickel toast', ar: 'توست أسمر بالبذور' },
    desc: { en: 'Gluten-free sourdough pumpernickel with sunflower, flax and pumpkin seeds.', ar: 'توست أسمر مخمّر خالٍ من الغلوتين ببذور دوّار الشمس والكتان واليقطين.' } },
  { id: 'white-toast', cat: 'bread', emoji: '🍞', tone: T.cream, price: 2.0, rating: 4.5, reviews: 140, tags: [], allergens: ['gluten', 'dairy'],
    name: { en: 'Pain de mie', ar: 'توست أبيض طري' },
    desc: { en: 'A soft, milky toast loaf with a thin golden crust. Perfect for sandwiches.', ar: 'رغيف توست طري بالحليب وقشرة ذهبية رقيقة. مثالي للسندويشات.' } },
  { id: 'pita', cat: 'bread', emoji: '🫓', tone: T.wheat, price: 1.0, rating: 4.7, reviews: 420, tags: ['vegan'], allergens: ['gluten'],
    name: { en: 'Whole-wheat pita (6)', ar: 'خبز عربي قمح كامل (٦)' },
    desc: { en: 'Six puffed whole-wheat pitas, straight from the stone oven.', ar: 'ستة أرغفة عربية من القمح الكامل، من فرن الحجر مباشرة.' } },
  { id: 'bran', cat: 'bread', emoji: '🌾', tone: T.rye, price: 1.5, rating: 4.4, reviews: 76, tags: ['vegan', 'light'], allergens: ['gluten'],
    name: { en: 'Bran loaf', ar: 'خبز النخالة' },
    desc: { en: 'High-fibre bran bread with a low glycaemic load, suitable for diabetics.', ar: 'خبز نخالة غني بالألياف ومنخفض المؤشر السكري، مناسب لمرضى السكري.' } },
  { id: 'shrak', cat: 'bread', emoji: '🫓', tone: T.crust, price: 1.5, rating: 4.9, reviews: 265, tags: ['vegan', 'local'], allergens: ['gluten'],
    name: { en: 'Shrak (saj bread)', ar: 'خبز شراك' },
    desc: { en: 'Paper-thin Bedouin bread stretched by hand and baked on the domed saj.', ar: 'خبز بدوي رقيق يُفرد باليد ويُخبز على الصاج.' } },
  { id: 'baguette', cat: 'bread', emoji: '🥖', tone: T.wheat, price: 3.0, rating: 4.6, reviews: 118, tags: ['vegan'], allergens: ['gluten'],
    name: { en: 'French baguette', ar: 'باغيت فرنسي' },
    desc: { en: 'Crackly crust, creamy crumb. Shaped and scored by hand every morning.', ar: 'قشرة مقرمشة ولبّ كريمي. يُشكّل ويُشقّ باليد كل صباح.' } },
  { id: 'tortilla', cat: 'bread', emoji: '🌯', tone: T.cream, price: 3.5, rating: 4.3, reviews: 54, tags: ['vegan'], allergens: ['gluten'],
    name: { en: 'Flour tortillas (10)', ar: 'خبز تورتيلا (١٠)' },
    desc: { en: 'Ten soft flour tortillas for wraps and shawarma at home.', ar: 'عشرة أرغفة تورتيلا طرية للّفائف والشاورما في البيت.' } },
  { id: 'hamam', cat: 'bread', emoji: '🥯', tone: T.sesame, price: 1.5, rating: 4.5, reviews: 88, tags: ['local'], allergens: ['gluten', 'sesame'],
    name: { en: 'Hammam bread', ar: 'خبز حمّام' },
    desc: { en: 'A soft, slightly sweet Levantine roll dusted with nigella and sesame.', ar: 'خبز شامي طري وحلو قليلاً مرشوش بحبة البركة والسمسم.' } },
  { id: 'burger-buns', cat: 'bread', emoji: '🍔', tone: T.citrus, price: 2.0, rating: 4.4, reviews: 61, tags: [], allergens: ['gluten', 'egg', 'sesame'],
    name: { en: 'Brioche burger buns (4)', ar: 'خبز برغر بريوش (٤)' },
    desc: { en: 'Four glossy brioche buns that hold up to a juicy smash burger.', ar: 'أربعة أرغفة بريوش لامعة تتحمّل البرغر الغني.' } },
  // desserts
  { id: 'petits-fours', cat: 'dessert', emoji: '🍪', tone: T.berry, price: 6.0, rating: 4.8, reviews: 190, tags: ['best', 'gift'], allergens: ['gluten', 'dairy', 'nuts'],
    name: { en: 'Petits fours box', ar: 'علبة بيتي فور' },
    desc: { en: 'A box of tiny butter cookies, jam-filled and chocolate-dipped. You have to try them.', ar: 'علبة بسكويت زبدة صغير، محشو بالمربى ومغطّس بالشوكولاتة.' } },
  { id: 'puff-berry', cat: 'dessert', emoji: '🥐', tone: T.berry, price: 1.0, rating: 4.5, reviews: 72, tags: [], allergens: ['gluten', 'dairy'],
    name: { en: 'Raspberry puff', ar: 'معجنات التوت' },
    desc: { en: 'Flaky puff pastry stuffed with raspberry compote.', ar: 'عجينة هشّة محشوة بمربى التوت.' } },
  { id: 'sugar-donut', cat: 'dessert', emoji: '🍩', tone: T.citrus, price: 1.0, rating: 4.6, reviews: 233, tags: ['kids'], allergens: ['gluten', 'egg', 'dairy'],
    name: { en: 'Sugar ring donut', ar: 'دونات بالسكر' },
    desc: { en: 'Pillowy yeasted ring rolled in vanilla sugar while still warm.', ar: 'دونات خميرة طرية مغلّفة بسكر الفانيلا وهي دافئة.' } },
  { id: 'pineapple-cake', cat: 'dessert', emoji: '🍍', tone: T.citrus, price: 2.5, rating: 4.4, reviews: 47, tags: [], allergens: ['gluten', 'egg', 'dairy'],
    name: { en: 'Pineapple upside-down slice', ar: 'كيك الأناناس' },
    desc: { en: 'Soft sponge with caramelised pineapple rings.', ar: 'كيك إسفنجي طري مع حلقات أناناس مكرملة.' } },
  { id: 'orange-cake', cat: 'dessert', emoji: '🍊', tone: T.citrus, price: 2.0, rating: 4.5, reviews: 66, tags: ['vegan'], allergens: ['gluten'],
    name: { en: 'Orange loaf', ar: 'كيك البرتقال' },
    desc: { en: 'Fresh orange zest and juice in a light, moist loaf.', ar: 'قشر وعصير برتقال طازج في كيك خفيف ورطب.' } },
  { id: 'apple-cake', cat: 'dessert', emoji: '🍎', tone: T.apple, price: 2.0, rating: 4.7, reviews: 109, tags: [], allergens: ['gluten', 'egg', 'nuts'],
    name: { en: 'Apple & walnut cake', ar: 'كيك التفاح والجوز' },
    desc: { en: 'The best apple cake ever, studded with toasted walnuts.', ar: 'أطيب كيك تفاح، مع جوز محمّص.' } },
  { id: 'cinnamon-loaf', cat: 'dessert', emoji: '🍰', tone: T.cocoa, price: 5.0, rating: 4.8, reviews: 152, tags: ['gift'], allergens: ['gluten', 'egg', 'dairy'],
    name: { en: 'Cinnamon swirl loaf', ar: 'كيك القرفة الملفوف' },
    desc: { en: 'A moist loaf swirled with cinnamon sugar and finished with a white glaze.', ar: 'كيك رطب ملفوف بسكر القرفة ومغطّى بطبقة سكر بيضاء.' } },
  { id: 'choc-cookies', cat: 'dessert', emoji: '🍪', tone: T.cocoa, price: 5.0, rating: 4.9, reviews: 288, tags: ['best'], allergens: ['gluten', 'egg', 'dairy'],
    name: { en: 'Brown-butter chocolate cookies (6)', ar: 'كوكيز الشوكولاتة بالزبدة البنية (٦)' },
    desc: { en: 'Six chunky cookies with brown butter and dark chocolate. Fancy, with only a little more effort.', ar: 'ست قطع كوكيز بالزبدة البنية وقطع الشوكولاتة الداكنة.' } },
  { id: 'goodday-cake', cat: 'dessert', emoji: '🎂', tone: T.pistachio, price: 5.0, rating: 5.0, reviews: 97, tags: ['best', 'secret'], allergens: ['gluten', 'egg', 'dairy', 'nuts'],
    name: { en: 'GoodDay secret cake', ar: 'كيكة جود داي السرّية' },
    desc: { en: 'Our secret cake. If you want to know the secret, try it.', ar: 'كيكتنا السرّية. إن أردت معرفة السر، جرّبها.' } },
  { id: 'cinnamon-rolls', cat: 'dessert', emoji: '🥐', tone: T.sesame, price: 2.0, rating: 4.8, reviews: 174, tags: [], allergens: ['gluten', 'dairy'],
    name: { en: 'Cinnamon roll', ar: 'سينابون' },
    desc: { en: 'Soft, gooey and best with your morning coffee.', ar: 'طري ولزج، وأطيب مع قهوة الصباح.' } },
  // ka'ek & crackers
  { id: 'jerusalem-kaek', cat: 'cookies', emoji: '🥯', tone: T.sesame, price: 2.5, rating: 4.9, reviews: 341, tags: ['best', 'local'], allergens: ['gluten', 'sesame'],
    name: { en: 'Jerusalem sesame ka\'ek', ar: 'كعك القدس بالسمسم' },
    desc: { en: 'Ka\'ek bel semsem: crisp outside, soft and chewy inside. Comes with za\'atar.', ar: 'كعك بالسمسم: مقرمش من الخارج وطري من الداخل. يأتي مع الزعتر.' } },
  { id: 'qarshala', cat: 'cookies', emoji: '🥖', tone: T.wheat, price: 2.0, rating: 4.6, reviews: 120, tags: ['local'], allergens: ['gluten', 'sesame'],
    name: { en: 'Qarshala ka\'ek', ar: 'قرشلة' },
    desc: { en: 'Five ingredients become long crisp sticks with anise and sesame. Tea-time essential.', ar: 'خمسة مكوّنات تتحول إلى أصابع مقرمشة باليانسون والسمسم. رفيقة الشاي.' } },
  { id: 'pretzels', cat: 'cookies', emoji: '🥨', tone: T.crust, price: 2.0, rating: 4.4, reviews: 58, tags: ['vegan'], allergens: ['gluten'],
    name: { en: 'Hard pretzels & grissini', ar: 'بريتزل وغريسيني' },
    desc: { en: 'Crispy, salty and great with breakfast.', ar: 'مقرمشة ومالحة ورائعة مع الفطور.' } },
  { id: 'rye-crispbread', cat: 'cookies', emoji: '🌾', tone: T.rye, price: 3.0, rating: 4.3, reviews: 39, tags: ['vegan', 'light'], allergens: ['gluten'],
    name: { en: 'Rye crispbread', ar: 'رقائق الجاودار' },
    desc: { en: 'Big, traditional crispbread rounds to start your day.', ar: 'رقائق جاودار تقليدية كبيرة لبداية يومك.' } },
  { id: 'olive-straws', cat: 'cookies', emoji: '🫒', tone: T.herb, price: 3.0, rating: 4.6, reviews: 82, tags: [], allergens: ['gluten', 'dairy'],
    name: { en: 'Olive & cheese straws', ar: 'أصابع الزيتون والجبنة' },
    desc: { en: 'Twisted puff straws with Kalamata olives and aged cheese.', ar: 'أصابع عجينة ملفوفة بالزيتون والجبنة المعتّقة.' } },
  { id: 'rosemary-crackers', cat: 'cookies', emoji: '🌿', tone: T.herb, price: 2.5, rating: 4.5, reviews: 45, tags: ['vegan'], allergens: ['gluten'],
    name: { en: 'Rosemary sea-salt crackers', ar: 'مقرمشات إكليل الجبل والملح' },
    desc: { en: 'The perfect partner for your cheese board.', ar: 'الرفيق المثالي لطبق الأجبان.' } },
  { id: 'cranberry-bagel', cat: 'cookies', emoji: '🥯', tone: T.apple, price: 2.5, rating: 4.4, reviews: 51, tags: [], allergens: ['gluten'],
    name: { en: 'Cranberry-orange bagel', ar: 'بيغل التوت البري والبرتقال' },
    desc: { en: 'Switch up the taste: tart cranberries and orange zest.', ar: 'غيّر الطعم: توت بري حامض وقشر برتقال.' } },
  { id: 'blueberry-bagel', cat: 'cookies', emoji: '🫐', tone: T.blue, price: 2.0, rating: 4.5, reviews: 63, tags: ['new'], allergens: ['gluten'],
    name: { en: 'Blueberry bagel', ar: 'بيغل التوت الأزرق' },
    desc: { en: 'Our newest flavour, with a little Paris in every bite.', ar: 'أحدث نكهاتنا، مع لمسة باريسية في كل قضمة.' } },
  { id: 'herb-bagel', cat: 'cookies', emoji: '🥯', tone: T.herb, price: 3.0, rating: 4.6, reviews: 70, tags: [], allergens: ['gluten', 'sesame'],
    name: { en: 'Za\'atar herb bagel', ar: 'بيغل بالزعتر' },
    desc: { en: 'Bagels have come a long way. Taste real za\'atar and herbs.', ar: 'تذوّق الزعتر والأعشاب الحقيقية في البيغل.' } },
];

export const CITIES = [
  { id: 'amman', en: 'Amman', ar: 'عمّان', fee: 1.0, eta: { en: '35 to 50 min', ar: '٣٥ إلى ٥٠ دقيقة' } },
  { id: 'zarqa', en: 'Zarqa', ar: 'الزرقاء', fee: 1.5, eta: { en: '50 to 70 min', ar: '٥٠ إلى ٧٠ دقيقة' } },
  { id: 'salt', en: 'Salt', ar: 'السلط', fee: 2.0, eta: { en: '60 to 80 min', ar: '٦٠ إلى ٨٠ دقيقة' } },
];

export const TAX = 0.16;         // the 2020 cart applied a tax rate; Jordan GST is 16%
export const FREE_DELIVERY = 15; // JOD
export const PROMOS = { GOODDAY10: 0.1, RBK2020: 0.2 };

/* custom cake builder */
export const CAKE = {
  sizes: [
    { id: 's6', en: '6" · serves 6', ar: '٦ إنش · ٦ أشخاص', price: 12, layers: 2 },
    { id: 's8', en: '8" · serves 12', ar: '٨ إنش · ١٢ شخصاً', price: 18, layers: 3 },
    { id: 's10', en: '10" · serves 20', ar: '١٠ إنش · ٢٠ شخصاً', price: 26, layers: 4 },
  ],
  sponges: [
    { id: 'vanilla', en: 'Vanilla bean', ar: 'فانيلا', color: '#f3d9a4', price: 0 },
    { id: 'chocolate', en: 'Dark chocolate', ar: 'شوكولاتة داكنة', color: '#6b3d25', price: 1.5 },
    { id: 'redvelvet', en: 'Red velvet', ar: 'ريد فيلفيت', color: '#a8323e', price: 2 },
    { id: 'carrot', en: 'Carrot & walnut', ar: 'جزر وجوز', color: '#d48a3c', price: 1.5 },
  ],
  frostings: [
    { id: 'cream', en: 'Cream cheese', ar: 'جبنة كريمية', color: '#fff6ea', price: 0 },
    { id: 'ganache', en: 'Chocolate ganache', ar: 'غاناش شوكولاتة', color: '#4a2717', price: 2 },
    { id: 'strawberry', en: 'Strawberry', ar: 'فراولة', color: '#f4a3b8', price: 1.5 },
    { id: 'pistachio', en: 'Pistachio', ar: 'فستق حلبي', color: '#b9d48f', price: 3 },
  ],
  toppings: [
    { id: 'berries', en: 'Fresh berries', ar: 'توت طازج', price: 2.5 },
    { id: 'sprinkles', en: 'Sprinkles', ar: 'حبيبات ملوّنة', price: 0.5 },
    { id: 'candles', en: 'Candles', ar: 'شموع', price: 1 },
    { id: 'gold', en: 'Gold leaf', ar: 'ورق ذهب', price: 4 },
  ],
};
