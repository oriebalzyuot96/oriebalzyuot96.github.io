/* Bta3 Kolo · mock data. The 2020 seed (models/data.json) listed smiths, plumbers, car mechanics, carpenters,
   photographers and teachers across Amman, Aqaba, Zarqa, Jerash, Karak and Ma'an with an hourly cost. */

export const SERVICES = [
  { id: 'plumber', icon: '🚰', en: 'Plumber', ar: 'سبّاك', hint: { en: 'Leaks, heaters, blocked drains', ar: 'تسريبات، سخانات، انسدادات' } },
  { id: 'electrician', icon: '💡', en: 'Electrician', ar: 'كهربائي', hint: { en: 'Wiring, sockets, lighting', ar: 'تمديدات، أفياش، إنارة' } },
  { id: 'carpenter', icon: '🪚', en: 'Carpenter', ar: 'نجّار', hint: { en: 'Doors, kitchens, furniture fixes', ar: 'أبواب، مطابخ، تصليح أثاث' } },
  { id: 'smith', icon: '⚒️', en: 'Smith & welder', ar: 'حدّاد', hint: { en: 'Gates, railings, window guards', ar: 'بوابات، درابزين، حمايات' } },
  { id: 'mechanic', icon: '🔧', en: 'Car mechanic', ar: 'ميكانيكي', hint: { en: 'Diagnostics, brakes, oil', ar: 'فحص، فرامل، زيت' } },
  { id: 'ac', icon: '❄️', en: 'AC technician', ar: 'فني تكييف', hint: { en: 'Install, gas refill, service', ar: 'تركيب، تعبئة غاز، صيانة' } },
  { id: 'painter', icon: '🎨', en: 'Painter', ar: 'دهّان', hint: { en: 'Walls, damp proofing, decor', ar: 'جدران، عزل رطوبة، ديكور' } },
  { id: 'cleaner', icon: '🧽', en: 'Home cleaning', ar: 'تنظيف منازل', hint: { en: 'Deep clean, move-in, sofas', ar: 'تنظيف عميق، كنب، انتقال' } },
  { id: 'photographer', icon: '📷', en: 'Photographer', ar: 'مصوّر', hint: { en: 'Events, products, portraits', ar: 'مناسبات، منتجات، بورتريه' } },
  { id: 'teacher', icon: '📚', en: 'Private tutor', ar: 'مدرّس خصوصي', hint: { en: 'Maths, English, Tawjihi', ar: 'رياضيات، إنجليزي، توجيهي' } },
];

export const CITIES = [
  { id: 'amman', en: 'Amman', ar: 'عمّان' }, { id: 'zarqa', en: 'Zarqa', ar: 'الزرقاء' }, { id: 'irbid', en: 'Irbid', ar: 'إربد' },
  { id: 'aqaba', en: 'Aqaba', ar: 'العقبة' }, { id: 'jerash', en: 'Jerash', ar: 'جرش' }, { id: 'karak', en: 'Karak', ar: 'الكرك' }, { id: 'maan', en: 'Ma\'an', ar: 'معان' },
];

const P = (id, en, ar, service, city, rate, rating, jobs, years, langs, bio, skills, avail = true, verified = true) => ({ id, name: { en, ar }, service, city, rate, rating, jobs, years, langs, bio, skills, avail, verified });

export const PROS = [
  P('ali-h', 'Ali Haddad', 'علي حدّاد', 'smith', 'amman', 10, 4.9, 214, 12, ['ar', 'en'], { en: 'Wrought-iron gates, balcony railings and window guards. Welding on site, clean finish.', ar: 'بوابات حديد مشغول ودرابزين وحمايات شبابيك. لحام في الموقع وتشطيب نظيف.' }, { en: ['Gates', 'Railings', 'On-site welding'], ar: ['بوابات', 'درابزين', 'لحام بالموقع'] }),
  P('mohammad-s', 'Mohammad Saleh', 'محمد صالح', 'smith', 'aqaba', 12, 4.6, 98, 8, ['ar'], { en: 'Marine-grade steel work for Aqaba homes and boats. Rust treatment included.', ar: 'أعمال فولاذ مقاوم للبحر لبيوت وقوارب العقبة. معالجة الصدأ مشمولة.' }, { en: ['Stainless steel', 'Rust treatment'], ar: ['ستانلس ستيل', 'معالجة صدأ'] }),
  P('ahmed-z', 'Ahmed Zoubi', 'أحمد الزعبي', 'smith', 'zarqa', 13, 4.7, 156, 15, ['ar'], { en: 'Heavy steel doors, shades and storage sheds.', ar: 'أبواب فولاذية ثقيلة ومظلات ومخازن.' }, { en: ['Steel doors', 'Shades'], ar: ['أبواب فولاذ', 'مظلات'] }, false),
  P('nasser-k', 'Nasser Khalil', 'ناصر خليل', 'plumber', 'amman', 11, 4.9, 342, 14, ['ar', 'en'], { en: 'Fast leak detection with a thermal camera, water heaters and solar systems.', ar: 'كشف تسريبات سريع بكاميرا حرارية، سخانات وأنظمة شمسية.' }, { en: ['Leak detection', 'Water heaters', 'Solar'], ar: ['كشف تسريب', 'سخانات', 'طاقة شمسية'] }),
  P('khaled-a', 'Khaled Amro', 'خالد عمرو', 'plumber', 'zarqa', 10, 4.5, 121, 9, ['ar'], { en: 'Blocked drains, bathroom refits and tank cleaning.', ar: 'فتح مجاري، تجديد حمامات وتنظيف خزانات.' }, { en: ['Drains', 'Bathrooms', 'Tanks'], ar: ['مجاري', 'حمامات', 'خزانات'] }),
  P('rana-m', 'Rana Masri', 'رنا المصري', 'plumber', 'irbid', 12, 4.8, 87, 6, ['ar', 'en'], { en: 'Certified plumber. Happy to work where families prefer a woman technician.', ar: 'سبّاكة معتمدة. أعمل حيث تفضّل العائلات فنّية.' }, { en: ['Kitchens', 'Heaters', 'Filters'], ar: ['مطابخ', 'سخانات', 'فلاتر'] }),
  P('mahmoud-t', 'Mahmoud Tarawneh', 'محمود الطراونة', 'mechanic', 'jerash', 9, 4.6, 190, 11, ['ar'], { en: 'Mobile mechanic: diagnostics, brakes and oil service at your door.', ar: 'ميكانيكي متنقل: فحص كمبيوتر وفرامل وتغيير زيت عند بابك.' }, { en: ['OBD diagnostics', 'Brakes', 'Oil'], ar: ['فحص كمبيوتر', 'فرامل', 'زيت'] }),
  P('osama-r', 'Osama Rawashdeh', 'أسامة الرواشدة', 'mechanic', 'amman', 8, 4.4, 260, 18, ['ar', 'en'], { en: 'Hybrid and EV specialist. Battery health checks.', ar: 'متخصص هايبرد وكهربائي. فحص صحة البطارية.' }, { en: ['Hybrid', 'EV', 'Battery'], ar: ['هايبرد', 'كهربائي', 'بطاريات'] }),
  P('mohammad-q', 'Mohammad Qudah', 'محمد القضاة', 'carpenter', 'amman', 10, 4.8, 175, 13, ['ar'], { en: 'Kitchen cabinets, wardrobes and door repairs. Measured visits free in Amman.', ar: 'خزائن مطابخ وغرف ملابس وتصليح أبواب. الزيارة للقياس مجانية في عمّان.' }, { en: ['Kitchens', 'Wardrobes', 'Doors'], ar: ['مطابخ', 'خزائن', 'أبواب'] }),
  P('alaa-m', 'Alaa Majali', 'علاء المجالي', 'carpenter', 'karak', 11, 4.7, 66, 7, ['ar'], { en: 'Traditional woodwork and furniture restoration.', ar: 'أعمال خشب تقليدية وترميم أثاث.' }, { en: ['Restoration', 'Furniture'], ar: ['ترميم', 'أثاث'] }),
  P('ali-n', 'Ali Nsour', 'علي النسور', 'photographer', 'amman', 20, 4.9, 132, 6, ['ar', 'en'], { en: 'Weddings, engagements and product shoots. Edited gallery in 7 days.', ar: 'أعراس وخطوبات وتصوير منتجات. ألبوم معدّل خلال ٧ أيام.' }, { en: ['Weddings', 'Products', 'Drone'], ar: ['أعراس', 'منتجات', 'درون'] }),
  P('lina-h', 'Lina Hijazi', 'لينا حجازي', 'photographer', 'irbid', 18, 4.8, 74, 5, ['ar', 'en'], { en: 'Newborn and family sessions at home, natural light.', ar: 'جلسات مواليد وعائلات في البيت بإضاءة طبيعية.' }, { en: ['Newborn', 'Family'], ar: ['مواليد', 'عائلات'] }),
  P('sami-d', 'Sami Daoud', 'سامي داود', 'teacher', 'amman', 15, 4.9, 410, 10, ['ar', 'en'], { en: 'Tawjihi and IGCSE maths. Online or at home.', ar: 'رياضيات توجيهي و IGCSE. أونلاين أو في البيت.' }, { en: ['Tawjihi', 'IGCSE', 'Online'], ar: ['توجيهي', 'IGCSE', 'أونلاين'] }),
  P('huda-b', 'Huda Bataineh', 'هدى بطاينة', 'teacher', 'zarqa', 12, 4.8, 220, 8, ['ar', 'en'], { en: 'English for kids and IELTS preparation.', ar: 'إنجليزي للأطفال وتحضير IELTS.' }, { en: ['IELTS', 'Kids English'], ar: ['IELTS', 'إنجليزي للأطفال'] }),
  P('yousef-a', 'Yousef Abbadi', 'يوسف العبادي', 'electrician', 'amman', 12, 4.9, 298, 16, ['ar', 'en'], { en: 'Full rewiring, smart switches and EV chargers. Licensed.', ar: 'تمديدات كاملة ومفاتيح ذكية وشواحن سيارات. مرخّص.' }, { en: ['Rewiring', 'Smart home', 'EV chargers'], ar: ['تمديدات', 'منزل ذكي', 'شواحن'] }),
  P('fadi-s', 'Fadi Shdeifat', 'فادي الشديفات', 'electrician', 'maan', 9, 4.5, 64, 6, ['ar'], { en: 'Generator hook-ups and farm electrics around Ma\'an.', ar: 'توصيل مولدات وكهرباء مزارع حول معان.' }, { en: ['Generators', 'Farms'], ar: ['مولدات', 'مزارع'] }),
  P('omar-j', 'Omar Jaber', 'عمر جابر', 'ac', 'amman', 14, 4.7, 188, 9, ['ar'], { en: 'Split and central AC install, gas refill and yearly service.', ar: 'تركيب مكيفات سبليت ومركزي، تعبئة غاز وصيانة سنوية.' }, { en: ['Install', 'Gas refill', 'Service'], ar: ['تركيب', 'تعبئة غاز', 'صيانة'] }),
  P('tareq-f', 'Tareq Freihat', 'طارق فريحات', 'ac', 'aqaba', 15, 4.8, 140, 10, ['ar', 'en'], { en: 'Summer-proof cooling for Aqaba. Same-day emergency calls.', ar: 'تبريد يتحمّل صيف العقبة. طوارئ في نفس اليوم.' }, { en: ['Emergency', 'Central AC'], ar: ['طوارئ', 'تكييف مركزي'] }),
  P('bilal-o', 'Bilal Obeidat', 'بلال عبيدات', 'painter', 'irbid', 9, 4.6, 112, 12, ['ar'], { en: 'Interior painting, damp proofing and decorative finishes.', ar: 'دهان داخلي وعزل رطوبة وديكورات.' }, { en: ['Interior', 'Damp proofing', 'Decor'], ar: ['داخلي', 'عزل رطوبة', 'ديكور'] }),
  P('maha-k', 'Maha Kawar', 'مها قعوار', 'painter', 'amman', 11, 4.9, 58, 4, ['ar', 'en'], { en: 'Murals and kids\' room art, low-VOC paints.', ar: 'جداريات ورسومات غرف أطفال بدهانات صديقة للبيئة.' }, { en: ['Murals', 'Kids rooms'], ar: ['جداريات', 'غرف أطفال'] }),
  P('salma-r', 'Salma Rifai', 'سلمى الرفاعي', 'cleaner', 'amman', 7, 4.8, 520, 7, ['ar', 'en'], { en: 'Team of three for deep cleans, move-ins and sofa shampoo.', ar: 'فريق من ثلاثة للتنظيف العميق والانتقال وغسيل الكنب.' }, { en: ['Deep clean', 'Sofas', 'Move-in'], ar: ['تنظيف عميق', 'كنب', 'انتقال'] }),
  P('ibrahim-z', 'Ibrahim Zawahreh', 'إبراهيم الزواهرة', 'cleaner', 'zarqa', 7, 4.5, 133, 5, ['ar'], { en: 'Office and building cleaning, weekly contracts.', ar: 'تنظيف مكاتب وعمارات بعقود أسبوعية.' }, { en: ['Offices', 'Buildings'], ar: ['مكاتب', 'عمارات'] }, false),
  P('hamza-k', 'Hamza Kilani', 'حمزة الكيلاني', 'mechanic', 'irbid', 10, 4.7, 97, 9, ['ar'], { en: 'Suspension, alignment and pre-purchase car inspection.', ar: 'تعليق وميزان وفحص قبل الشراء.' }, { en: ['Inspection', 'Suspension'], ar: ['فحص قبل الشراء', 'تعليق'] }),
  P('reem-a', 'Reem Awad', 'ريم عوض', 'teacher', 'irbid', 10, 4.7, 150, 6, ['ar', 'en'], { en: 'Arabic and science for grades 1 to 9.', ar: 'عربي وعلوم للصفوف ١ إلى ٩.' }, { en: ['Arabic', 'Science'], ar: ['عربي', 'علوم'] }),
];

export const REVIEWS = [
  { by: { en: 'Dana K.', ar: 'دانا ك.' }, stars: 5, text: { en: 'Came within the hour and fixed everything. Saved me money and a lot of time.', ar: 'وصل خلال ساعة وأصلح كل شيء. وفّر عليّ المال والوقت.' } },
  { by: { en: 'Hani S.', ar: 'هاني س.' }, stars: 5, text: { en: 'Clear price before starting, tidy work, would book again.', ar: 'سعر واضح قبل البدء وعمل نظيف، سأحجز مجدداً.' } },
  { by: { en: 'Noor A.', ar: 'نور أ.' }, stars: 4, text: { en: 'Great job. Arrived 15 minutes late but called ahead.', ar: 'عمل ممتاز. تأخر ١٥ دقيقة لكنه اتصل مسبقاً.' } },
];
