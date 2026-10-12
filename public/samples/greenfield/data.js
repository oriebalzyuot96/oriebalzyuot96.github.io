/* Book a Teacher (Team-Six-GreenField) · mock data. The 2020 ad schema: name, phone, price, email, description, place, subject. */

export const SUBJECTS = [
  { id: 'math', icon: '➗', en: 'Math', ar: 'رياضيات', c: '#5b6cff' },
  { id: 'english', icon: '🔤', en: 'English', ar: 'إنجليزي', c: '#e0565b' },
  { id: 'arabic', icon: '✍️', en: 'Arabic', ar: 'عربي', c: '#1d8a6c' },
  { id: 'science', icon: '🔬', en: 'Science', ar: 'علوم', c: '#2b9bd1' },
  { id: 'physics', icon: '⚛️', en: 'Physics', ar: 'فيزياء', c: '#7a4fd6' },
  { id: 'chemistry', icon: '🧪', en: 'Chemistry', ar: 'كيمياء', c: '#d97a1f' },
  { id: 'coding', icon: '💻', en: 'Programming', ar: 'برمجة', c: '#28323f' },
  { id: 'french', icon: '🥐', en: 'French', ar: 'فرنسي', c: '#3767c7' },
];
export const PLACES = [
  { id: 'amman', en: 'Amman', ar: 'عمّان' }, { id: 'irbid', en: 'Irbid', ar: 'إربد' }, { id: 'zarqa', en: 'Zarqa', ar: 'الزرقاء' },
  { id: 'karak', en: 'Karak', ar: 'الكرك' }, { id: 'online', en: 'Online', ar: 'أونلاين' },
];
export const LEVELS = { kids: { en: 'Grades 1 to 6', ar: 'الصفوف ١ إلى ٦' }, mid: { en: 'Grades 7 to 10', ar: 'الصفوف ٧ إلى ١٠' }, tawjihi: { en: 'Tawjihi', ar: 'توجيهي' }, uni: { en: 'University', ar: 'جامعة' }, adults: { en: 'Adults', ar: 'كبار' } };

const T = (id, en, ar, subject, place, price, rating, students, years, levels, online, bio, slots, phone, email) => ({ id, name: { en, ar }, subject, place, price, rating, students, years, levels, online, bio, slots, phone, email });
// slots: day index (0 = Sat) -> list of hours
export const TEACHERS = [
  T('rania', 'Rania Haddad', 'رانيا حداد', 'math', 'amman', 15, 4.9, 312, 11, ['tawjihi', 'mid'], true, { en: 'Tawjihi maths specialist. Past papers every week and a WhatsApp group for quick questions.', ar: 'متخصصة رياضيات توجيهي. أوراق سابقة أسبوعياً ومجموعة واتساب للأسئلة السريعة.' }, { 0: [16, 18], 2: [17, 19], 4: [16] }, '0791112233', 'rania@example.com'),
  T('omar', 'Omar Khatib', 'عمر الخطيب', 'physics', 'irbid', 14, 4.8, 190, 9, ['tawjihi', 'uni'], true, { en: 'Physics made visual: simulations, experiments at home, and lots of drawings.', ar: 'فيزياء بالصور: محاكاة وتجارب منزلية ورسومات كثيرة.' }, { 1: [17, 19], 3: [18], 5: [11, 13] }, '0782223344', 'omar@example.com'),
  T('leen', 'Leen Saadeh', 'لين سعادة', 'english', 'amman', 13, 4.9, 260, 7, ['kids', 'mid', 'adults'], true, { en: 'CELTA-certified. Phonics for kids, IELTS for adults, conversation for everyone.', ar: 'حاصلة على CELTA. صوتيات للأطفال وIELTS للكبار ومحادثة للجميع.' }, { 0: [10, 12], 1: [16], 2: [16, 18], 4: [10] }, '0793334455', 'leen@example.com'),
  T('yazan', 'Yazan Odeh', 'يزن عودة', 'coding', 'online', 18, 4.9, 140, 6, ['mid', 'uni', 'adults'], true, { en: 'Scratch for kids, Python and JavaScript for teens and career changers. Project-based.', ar: 'سكراتش للأطفال وبايثون وجافاسكربت للشباب ومن يغيّر مساره. تعلم بالمشاريع.' }, { 2: [19, 20], 3: [19, 20], 5: [14, 16] }, '0774445566', 'yazan@example.com'),
  T('huda', 'Huda Mansour', 'هدى منصور', 'arabic', 'zarqa', 10, 4.7, 220, 15, ['kids', 'mid', 'tawjihi'], false, { en: 'Grammar, reading and handwriting with patient, play-based lessons.', ar: 'قواعد وقراءة وخط بدروس صبورة قائمة على اللعب.' }, { 0: [15, 17], 2: [15], 4: [15, 17] }, '0795556677', 'huda@example.com'),
  T('sameer', 'Sameer Twal', 'سمير الطوال', 'chemistry', 'amman', 15, 4.6, 130, 12, ['tawjihi', 'uni'], false, { en: 'Organic chemistry without memorising: understand the reactions.', ar: 'كيمياء عضوية بدون حفظ: افهم التفاعلات.' }, { 1: [18], 3: [17, 19] }, '0786667788', 'sameer@example.com'),
  T('noor', 'Noor Abbadi', 'نور العبادي', 'science', 'karak', 9, 4.8, 95, 5, ['kids', 'mid'], true, { en: 'Curious kids welcome. Hands-on science with kitchen experiments.', ar: 'أهلاً بالأطفال الفضوليين. علوم عملية بتجارب من المطبخ.' }, { 0: [16], 2: [16], 4: [16] }, '0797778899', 'noor@example.com'),
  T('ahmad', 'Ahmad Zoubi', 'أحمد الزعبي', 'math', 'irbid', 11, 4.7, 175, 8, ['kids', 'mid'], false, { en: 'Builds confidence in maths with short daily practice and games.', ar: 'يبني الثقة بالرياضيات بتمارين يومية قصيرة وألعاب.' }, { 1: [16, 17], 3: [16, 17] }, '0788889900', 'ahmad@example.com'),
  T('claire', 'Claire Nasser', 'كلير ناصر', 'french', 'online', 16, 4.9, 88, 10, ['mid', 'adults'], true, { en: 'Native speaker. DELF preparation and travel French.', ar: 'متحدثة أصلية. تحضير DELF وفرنسي للسفر.' }, { 2: [18], 4: [18], 5: [10] }, '0779990011', 'claire@example.com'),
  T('basel', 'Basel Hijazi', 'باسل حجازي', 'english', 'irbid', 10, 4.5, 150, 6, ['mid', 'tawjihi'], false, { en: 'Tawjihi English: writing, grammar and exam technique.', ar: 'إنجليزي توجيهي: كتابة وقواعد وطريقة امتحان.' }, { 0: [17], 3: [17] }, '0791010101', 'basel@example.com'),
  T('maysa', 'Maysa Qudah', 'ميساء القضاة', 'physics', 'amman', 17, 4.9, 205, 14, ['tawjihi', 'uni'], true, { en: 'Former lab instructor at the University of Jordan.', ar: 'معيدة مختبرات سابقة في الجامعة الأردنية.' }, { 1: [19], 3: [19], 5: [12] }, '0782020202', 'maysa@example.com'),
  T('khalid', 'Khalid Shami', 'خالد الشامي', 'coding', 'amman', 20, 4.8, 64, 9, ['uni', 'adults'], false, { en: 'Data structures, algorithms and interview prep.', ar: 'هياكل بيانات وخوارزميات وتحضير مقابلات.' }, { 4: [19, 20], 5: [15] }, '0773030303', 'khalid@example.com'),
];
export const DAYS = [{ en: 'Sat', ar: 'السبت' }, { en: 'Sun', ar: 'الأحد' }, { en: 'Mon', ar: 'الاثنين' }, { en: 'Tue', ar: 'الثلاثاء' }, { en: 'Wed', ar: 'الأربعاء' }, { en: 'Thu', ar: 'الخميس' }];
