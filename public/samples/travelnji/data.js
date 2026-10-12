/* Travelnji · destinations, eco activities and the eco shop. Based on the 2020 places.js (Aqaba, Ajloun, Amman,
   Madaba, Irbid, Petra and Wadi Rum) and the Bags / Bottles shop pages. Text rewritten and translated. */

export const PLACES = [
  { id: 'irbid', x: 150, y: 92, emoji: '🏛️', grad: ['#a7c98a', '#4f7d4a'], season: { en: 'Mar to May', ar: 'آذار إلى أيار' },
    name: { en: 'Irbid & Umm Qais', ar: 'إربد وأم قيس' }, tag: { en: 'Ruins with a view of three countries', ar: 'آثار تطلّ على ثلاث دول' },
    info: { en: 'Jordan\'s green north. Umm Qais (ancient Gadara) sits on a ridge over the Yarmouk valley, the Golan Heights and Lake Tiberias. Basalt theatres, olive groves and village guesthouses make it an easy, low-impact escape from Amman.', ar: 'شمال الأردن الأخضر. تقع أم قيس (جدارا القديمة) على تلة تطل على وادي اليرموك والجولان وبحيرة طبريا. مسارح بازلتية وكروم زيتون وبيوت ضيافة قروية تجعلها رحلة سهلة وقليلة الأثر من عمّان.' },
    acts: [
      { id: 'umm-qais', en: 'Umm Qais archaeological site', ar: 'موقع أم قيس الأثري', icon: '🏛️', hrs: 3, eco: 2 },
      { id: 'yarmouk-hike', en: 'Yarmouk forest hike', ar: 'مسار غابات اليرموك', icon: '🥾', hrs: 4, eco: 3 },
      { id: 'olive-harvest', en: 'Olive harvest with a local family (Oct)', ar: 'قطاف الزيتون مع عائلة محلية (تشرين الأول)', icon: '🫒', hrs: 5, eco: 3 },
    ] },
  { id: 'ajloun', x: 140, y: 125, emoji: '🌲', grad: ['#9ccf9a', '#2f6b45'], season: { en: 'Apr to Jun, Sep to Nov', ar: 'نيسان إلى حزيران، أيلول إلى تشرين الثاني' },
    name: { en: 'Ajloun', ar: 'عجلون' }, tag: { en: 'Oak forests and a Crusader-era castle', ar: 'غابات بلوط وقلعة أيوبية' },
    info: { en: 'Rolling hills of evergreen oak, pistachio and strawberry trees. The Ajloun Forest Reserve runs community trails where guides, cabins and food come from the surrounding villages, so every visit keeps money in the valley.', ar: 'تلال من البلوط دائم الخضرة والبطم والقيقب. تدير محمية غابات عجلون مسارات مجتمعية يأتي فيها الأدلاء والأكواخ والطعام من القرى المحيطة، فتبقى كل زيارة في خير الوادي.' },
    acts: [
      { id: 'ajloun-castle', en: 'Ajloun Castle (Qal\'at ar-Rabad)', ar: 'قلعة عجلون (قلعة الربض)', icon: '🏰', hrs: 2, eco: 2 },
      { id: 'forest-reserve', en: 'Ajloun Forest Reserve trails', ar: 'مسارات محمية غابات عجلون', icon: '🌳', hrs: 4, eco: 3 },
      { id: 'ranger-camp', en: 'Night at a ranger camp', ar: 'ليلة في مخيم الحرّاس', icon: '⛺', hrs: 12, eco: 3 },
    ] },
  { id: 'amman', x: 168, y: 172, emoji: '🕌', grad: ['#f2c48a', '#b5653a'], season: { en: 'All year', ar: 'طوال السنة' },
    name: { en: 'Amman', ar: 'عمّان' }, tag: { en: 'Seven hills, one Citadel, endless cafes', ar: 'سبعة جبال وقلعة ومقاهٍ لا تنتهي' },
    info: { en: 'Jordan\'s capital mixes Roman ruins, the Citadel and a lively downtown with galleries in Jabal Al-Weibdeh. Walk the stairs, take shared taxis, and eat at family-run places to keep your footprint light.', ar: 'تجمع العاصمة بين الآثار الرومانية والقلعة ووسط البلد النابض والمعارض في جبل اللويبدة. امشِ على الأدراج واستخدم السرفيس وكُل في مطاعم عائلية لتخفّف أثرك.' },
    acts: [
      { id: 'citadel', en: 'The Citadel (Jabal Al-Qal\'a)', ar: 'جبل القلعة', icon: '🏛️', hrs: 2, eco: 2 },
      { id: 'souq-jara', en: 'Souq Jara street market (summer Fridays)', ar: 'سوق جارا (جمعة الصيف)', icon: '🛍️', hrs: 2, eco: 2 },
      { id: 'jordan-museum', en: 'The Jordan Museum', ar: 'متحف الأردن', icon: '🏺', hrs: 2, eco: 2 },
      { id: 'dukes-diwan', en: 'Duke\'s Diwan heritage house', ar: 'ديوان الدوق', icon: '🏠', hrs: 1, eco: 2 },
    ] },
  { id: 'madaba', x: 146, y: 210, emoji: '🧩', grad: ['#e8b98f', '#9a5b3c'], season: { en: 'Oct to Apr', ar: 'تشرين الأول إلى نيسان' },
    name: { en: 'Madaba & the Dead Sea', ar: 'مادبا والبحر الميت' }, tag: { en: 'Mosaics, Mount Nebo and the lowest point on Earth', ar: 'فسيفساء وجبل نيبو وأخفض نقطة على الأرض' },
    info: { en: 'The City of Mosaics holds the 6th-century map of the Holy Land. From Mount Nebo the road drops to the Dead Sea, which is shrinking about a metre a year: choose eco-certified resorts and save water.', ar: 'مدينة الفسيفساء تضم خريطة الأرض المقدسة من القرن السادس. من جبل نيبو ينحدر الطريق إلى البحر الميت الذي ينخفض نحو متر سنوياً: اختر منتجعات صديقة للبيئة ووفّر الماء.' },
    acts: [
      { id: 'mosaic-map', en: 'St George\'s mosaic map', ar: 'خريطة الفسيفساء في كنيسة القديس جاورجيوس', icon: '🧩', hrs: 1, eco: 2 },
      { id: 'nebo', en: 'Sunset at Mount Nebo', ar: 'الغروب على جبل نيبو', icon: '🌅', hrs: 2, eco: 2 },
      { id: 'mujib', en: 'Wadi Mujib Siq trail (Apr to Oct)', ar: 'مسار سيق وادي الموجب (نيسان إلى تشرين الأول)', icon: '💦', hrs: 3, eco: 3 },
    ] },
  { id: 'petra', x: 140, y: 345, emoji: '🏜️', grad: ['#f0a98a', '#a3462f'], season: { en: 'Mar to May, Sep to Nov', ar: 'آذار إلى أيار، أيلول إلى تشرين الثاني' },
    name: { en: 'Petra', ar: 'البترا' }, tag: { en: 'The rose-red city of the Nabataeans', ar: 'المدينة الوردية للأنباط' },
    info: { en: 'A wonder of the world carved into sandstone. Walk instead of riding animals, stay on marked trails, and buy crafts directly from the Bdoul community who have lived among the tombs for generations.', ar: 'إحدى عجائب الدنيا منحوتة في الصخر الرملي. امشِ بدلاً من ركوب الحيوانات، والتزم المسارات المحددة، واشترِ الحِرف من مجتمع البدول الذين عاشوا بين المدافن لأجيال.' },
    acts: [
      { id: 'siq', en: 'Al-Siq to the Treasury (main trail)', ar: 'من السيق إلى الخزنة (المسار الرئيسي)', icon: '🏛️', hrs: 3, eco: 2 },
      { id: 'ad-deir', en: 'Ad-Deir monastery climb', ar: 'صعود الدير', icon: '🥾', hrs: 4, eco: 3 },
      { id: 'petra-night', en: 'Petra by Night', ar: 'البترا ليلاً', icon: '🕯️', hrs: 2, eco: 2 },
      { id: 'ammarin', en: 'Ammarin Bedouin camp, Little Petra', ar: 'مخيم عمارين البدوي في البيضا', icon: '⛺', hrs: 12, eco: 3 },
    ] },
  { id: 'rum', x: 160, y: 420, emoji: '🐪', grad: ['#f6b77a', '#b44a24'], season: { en: 'Oct to Apr', ar: 'تشرين الأول إلى نيسان' },
    name: { en: 'Wadi Rum', ar: 'وادي رم' }, tag: { en: 'The Valley of the Moon', ar: 'وادي القمر' },
    info: { en: 'Granite and sandstone mountains rising from red sand. Book with Zalabia Bedouin-run camps, choose solar-powered tents, and leave the desert exactly as you found it.', ar: 'جبال من الغرانيت والحجر الرملي ترتفع من الرمال الحمراء. احجز في مخيمات يديرها بدو الزلابية، واختر خياماً تعمل بالطاقة الشمسية، واترك الصحراء كما وجدتها.' },
    acts: [
      { id: 'balloon', en: 'Hot-air balloon at sunrise', ar: 'منطاد عند الشروق', icon: '🎈', hrs: 3, eco: 1 },
      { id: 'stargazing', en: 'Rum star gazing', ar: 'مراقبة النجوم في رم', icon: '✨', hrs: 2, eco: 3 },
      { id: 'horse', en: 'Horseback riding', ar: 'ركوب الخيل', icon: '🐎', hrs: 3, eco: 2 },
      { id: 'bubble', en: 'Night in a solar bubble camp', ar: 'ليلة في مخيم الفقاعات الشمسي', icon: '🫧', hrs: 12, eco: 2 },
    ] },
  { id: 'aqaba', x: 125, y: 462, emoji: '🐠', grad: ['#7fd3d6', '#1d6f8f'], season: { en: 'Oct to May', ar: 'تشرين الأول إلى أيار' },
    name: { en: 'Aqaba', ar: 'العقبة' }, tag: { en: 'Coral reefs on the Red Sea', ar: 'شعاب مرجانية على البحر الأحمر' },
    info: { en: 'Jordan\'s only coastline, with warm water all year and reefs a few metres from the beach. Use reef-safe sunscreen, never touch coral, and pick dive centres that support the Aqaba Marine Park.', ar: 'الساحل الوحيد للأردن، بمياه دافئة طوال العام وشعاب على بعد أمتار من الشاطئ. استخدم واقي شمس آمناً للشعاب، ولا تلمس المرجان، واختر مراكز غوص تدعم محمية العقبة البحرية.' },
    acts: [
      { id: 'dive', en: 'Diving in the Red Sea paradise', ar: 'الغوص في جنة البحر الأحمر', icon: '🤿', hrs: 3, eco: 2 },
      { id: 'birds', en: 'Bird migration at the Aqaba Bird Observatory', ar: 'هجرة الطيور في مرصد العقبة', icon: '🦩', hrs: 2, eco: 3 },
      { id: 'ayla', en: 'Islamic city of Ayla', ar: 'مدينة أيلة الإسلامية', icon: '🧱', hrs: 1, eco: 2 },
      { id: 'cycling', en: 'Coastal cycling', ar: 'ركوب الدراجات على الساحل', icon: '🚲', hrs: 2, eco: 3 },
    ] },
];

export const PRODUCTS = [
  { id: 'tote', cat: 'bags', icon: '👜', price: 9, grad: ['#e9dcc4', '#b79a6b'], name: { en: 'Woven palm tote', ar: 'حقيبة سعف منسوجة' }, desc: { en: 'Hand-woven by women\'s cooperatives in the Jordan Valley.', ar: 'منسوجة يدوياً من تعاونيات نسائية في الأغوار.' } },
  { id: 'produce', cat: 'bags', icon: '🧺', price: 6, grad: ['#dcebd2', '#7ea36a'], name: { en: 'Reusable produce bags (5)', ar: 'أكياس خضار قابلة لإعادة الاستخدام (٥)' }, desc: { en: 'Organic cotton mesh for souqs and markets.', ar: 'شبك قطن عضوي للأسواق.' } },
  { id: 'magic', cat: 'bags', icon: '🎒', price: 18, grad: ['#d7e3f5', '#5b7fb8'], name: { en: 'Recycled daypack', ar: 'حقيبة ظهر معاد تدويرها' }, desc: { en: 'Made from 22 recycled plastic bottles. Fits a 1 litre bottle.', ar: 'مصنوعة من ٢٢ عبوة بلاستيك معاد تدويرها.' } },
  { id: 'shopping', cat: 'bags', icon: '🛍️', price: 4, grad: ['#f4d6c6', '#c26a4a'], name: { en: 'Fold-away shopping bag', ar: 'كيس تسوق قابل للطي' }, desc: { en: 'Folds into its own pocket. Say no to plastic bags.', ar: 'يُطوى في جيبه. قل لا للأكياس البلاستيكية.' } },
  { id: 'steel', cat: 'bottles', icon: '🧴', price: 12, grad: ['#d2e7ea', '#4c8f99'], name: { en: 'Insulated steel bottle', ar: 'مطارة ستانلس معزولة' }, desc: { en: 'Keeps water cold for 24 hours in Wadi Rum heat.', ar: 'تحافظ على برودة الماء ٢٤ ساعة في حر وادي رم.' } },
  { id: 'filter', cat: 'bottles', icon: '💧', price: 16, grad: ['#cfe3f7', '#3d7bc2'], name: { en: 'Filter bottle', ar: 'مطارة بفلتر' }, desc: { en: 'Refill from any tap. Filters 99.9% of bacteria.', ar: 'املأها من أي حنفية. تفلتر ٩٩٫٩٪ من البكتيريا.' } },
  { id: 'silicone', cat: 'bottles', icon: '🥤', price: 8, grad: ['#f3d9e4', '#b8668a'], name: { en: 'Collapsible silicone bottle', ar: 'مطارة سيليكون قابلة للطي' }, desc: { en: 'Squashes flat when empty, perfect for hiking.', ar: 'تنطوي عند الفراغ، مثالية للمشي.' } },
  { id: 'sport', cat: 'bottles', icon: '🍶', price: 7, grad: ['#e6e1f5', '#7a6bc2'], name: { en: 'Sport bottle (BPA-free)', ar: 'مطارة رياضية خالية من BPA' }, desc: { en: 'Light, tough and dishwasher-safe.', ar: 'خفيفة ومتينة وتُغسل في الجلاية.' } },
];

export const TIPS = [
  { icon: '💧', en: 'Carry a refillable bottle', ar: 'احمل مطارة قابلة لإعادة التعبئة', p: { en: 'Jordan is one of the most water-scarce countries on Earth. Refill, don\'t buy plastic.', ar: 'الأردن من أفقر دول العالم مائياً. أعد التعبئة ولا تشترِ البلاستيك.' } },
  { icon: '🏘️', en: 'Stay local', ar: 'أقِم محلياً', p: { en: 'Guesthouses and Bedouin camps keep tourism income in the community.', ar: 'بيوت الضيافة ومخيمات البدو تُبقي دخل السياحة في المجتمع.' } },
  { icon: '🥾', en: 'Stick to the trail', ar: 'التزم المسار', p: { en: 'Fragile desert crusts and wildflowers take decades to recover.', ar: 'قشرة الصحراء الهشة والأزهار البرية تحتاج عقوداً لتتعافى.' } },
  { icon: '🚌', en: 'Share the ride', ar: 'شارك الرحلة', p: { en: 'JETT buses and shared taxis connect most destinations.', ar: 'حافلات جت والسرفيس تربط معظم الوجهات.' } },
];
