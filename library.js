/* ═════════════════════════════════════════════════════════════════════
   مكتبة جسور الطلابية وقارئها التفاعلي المدمج — الإصدار v26
   أغلفة حقيقية وكلاسيكية • أيقونات تحريرية رصينة • وضع ملء الشاشة • قراءة دون إنترنت
   ═════════════════════════════════════════════════════════════════════ */

const LIB_BOOKMARK_BLUE = '#0f7b96';
const LIB_BOOKS_CACHE_NAME = 'joussour-books-v1';
const LIB_PROGRESS_KEY = 'joussour_lib_progress_v1';
const LIB_BOOKMARKS_KEY = 'joussour_lib_bookmarks_v1';
const LIB_NOTES_KEY = 'joussour_lib_notes_v1';
const LIB_HIGHLIGHTS_KEY = 'joussour_lib_highlights_v1';
const LIB_PDF_HIGHLIGHTS_KEY = 'joussour_lib_pdf_highlights_v1';
const LIB_CUSTOM_BOOKS_KEY = 'joussour_lib_custom_books_v1';
const LIB_PDF_META_KEY = 'joussour_lib_pdf_meta_v1';
const LIB_PREFS_KEY = 'joussour_lib_prefs_v1';
const LIB_READING_LOG_KEY = 'joussour_lib_reading_log_v1';
const LIB_FAWAID_LOCAL_KEY = 'joussour_lib_fawaid_v1';
const LIB_FAWAID_VOTES_KEY = 'joussour_lib_fawaid_votes_v1';
const LIB_READER_UID_KEY = 'joussour_lib_reader_uid_v1';
const LIB_PDF_DB_NAME = 'joussour_pdf_library_v1';
const LIB_PDF_STORE = 'pdf_files';

const LIB_SVG_ICONS = {
  all: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 7h8"/><path d="M8 11h6"/>',
  quran: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  scroll: '<path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11a3 3 0 0 1 3 3v11a2 2 0 0 0 2 2z"/><path d="M8 8h7"/><path d="M8 12h7"/><path d="M8 16h4"/>',
  seerah: '<path d="M12 2v3"/><path d="M7 9a5 5 0 0 1 10 0v6a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V9z"/><path d="M6 21h12"/><circle cx="12" cy="12" r="1.5"/>',
  lantern: '<path d="M12 2v3"/><path d="M7 9a5 5 0 0 1 10 0v6a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V9z"/><path d="M6 21h12"/><circle cx="12" cy="12" r="1.5"/>',
  ilm: '<circle cx="12" cy="12" r="9"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  history: '<path d="M4 21V11a8 8 0 0 1 16 0v10"/><path d="M2 21h20"/><path d="M8 21v-7a4 4 0 0 1 8 0v7"/>',
  arch: '<path d="M4 21V11a8 8 0 0 1 16 0v10"/><path d="M2 21h20"/><path d="M8 21v-7a4 4 0 0 1 8 0v7"/>',
  poetry: '<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/>',
  quill: '<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/>',
  prison: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>',
  candle: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>',
  afghan: '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/><path d="m11 13 3-3"/>',
  mountain: '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/><path d="m11 13 3-3"/>',
  ship: '<path d="M2 18c2 .5 4-.5 6 0s4 .5 6 0 4-.5 6 0"/><path d="M4 14h16l-2 4H6z"/><path d="M12 3v11"/><path d="M12 4l6 7h-6"/>',
  window: '<path d="M5 21V10a7 7 0 0 1 14 0v11z"/><line x1="12" y1="3" x2="12" y2="21"/><line x1="5" y1="13" x2="19" y2="13"/>',
  bookmark: '<path d="M6 3.5A1.5 1.5 0 0 1 7.5 2h9A1.5 1.5 0 0 1 18 3.5V21l-6-3.8L6 21V3.5z"/>',
  note: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  highlight: '<path d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/>',
  pdf: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h5"/>',
  folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  trash: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>',
  refresh: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  author: '<path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
  offline: '<path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10z"/><polyline points="8.5 12.5 11 15 15.5 9.5"/>',
  alert: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
  globe: '<circle cx="12" cy="12" r="9"/><line x1="3.6" y1="9" x2="20.4" y2="9"/><line x1="3.6" y1="15" x2="20.4" y2="15"/><path d="M12 3a14.5 14.5 0 0 0 0 18"/><path d="M12 3a14.5 14.5 0 0 1 0 18"/>',
  psych: '<path d="M12 21c-4.5-3.2-8-6.4-8-10.5A4.5 4.5 0 0 1 12 7.4a4.5 4.5 0 0 1 8 3.1c0 4.1-3.5 7.3-8 10.5z"/><path d="M8.5 11.5h2l1.2-2.2 1.6 4 1-1.8h1.5"/>',
  quote: '<path d="M10 11H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 2.5-1.5 4.2-4 5"/><path d="M19 11h-4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 2.5-1.5 4.2-4 5"/>',
  share: '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  award: '<circle cx="12" cy="8" r="5"/><path d="M8.5 12.5 7 21l5-2.6L17 21l-1.5-8.5"/>',
  spark: '<path d="m12 3 1.9 5.2L19 10l-5.1 1.8L12 17l-1.9-5.2L5 10l5.1-1.8Z"/><path d="M5 3v4M3 5h4M19 17v4M17 19h4"/>'
};

function libIcon(name, cls = 'lib-ico') {
  const paths = LIB_SVG_ICONS[name] || LIB_SVG_ICONS.book;
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
}

const LIBRARY_CATEGORIES = [
  { id: 'all', label: 'الكل', iconName: 'all' },
  { id: 'quran', label: 'القرآن وتفسيره والتزكية', iconName: 'quran' },
  { id: 'seerah', label: 'السيرة وقصص الأنبياء', iconName: 'seerah' },
  { id: 'ilm', label: 'طلب العلم والفكر واليقين', iconName: 'ilm' },
  { id: 'poetry', label: 'الدواوين الشعرية', iconName: 'poetry' },
  { id: 'afghan', label: 'الأدب الأفغاني', iconName: 'afghan' },
  { id: 'world', label: 'الأدب العالمي', iconName: 'globe' },
  { id: 'psych', label: 'علم النفس والتعافي', iconName: 'psych' }
];

const LIBRARY_BOOKS = [
  {
    id: 'jalalayn',
    categoryId: 'quran',
    categoryLabel: 'القرآن وتفسيره والتزكية',
    title: 'تفسير الجلالين',
    author: 'جلال الدين المحلي وجلال الدين السيوطي',
    kind: 'heritage',
    dataUrl: './books/jalalayn.json?v=19',
    coverImage: './books/covers/jalalayn.jpg?v=29',
    fullPagesCount: 1106,
    iconName: 'scroll',
    coverAccent: '#e0b35c',
    coverGradient: 'linear-gradient(155deg, #0f2942 0%, #164e63 100%)',
    description: 'من أشهر التفاسير المختصرة في التراث الإسلامي؛ يجمع بين إيجاز العبارة ودقة البيان القرآني، أتمّه الإمام جلال الدين السيوطي على منهج شيخه جلال الدين المحلي.',
    pages: [
      {
        title: 'منهج الكتاب وتفسير الفاتحة',
        paragraphs: [
          'يتميّز تفسير الجلالين بإيجازه البديع ووضوح عبارته في بيان معاني مفردات القرآن الكريم ومواضع الإعراب الميسّرة التي يحتاجها طالب العلوم الإسلامية عند تلاوته ومراجعته اليومية.',
          'ففي فاتحة الكتاب يبيّن المؤلفان معنى الحمد بوصفه ثناءً بالجميل على الله سبحانه، وربّ العالمين أي مالك جميع المخلوقات ومربّيها، مع بيان معنى الصراط المستقيم الذي يطلب العبد الهداية إليه في كل ركعة.',
          'ويمثّل هذا التفسير رفيقاً عملياً لقراءة المصحف برواية ورش داخل التطبيق لضبط المعاني القريبة قبل الانتقال إلى المطوّلات.'
        ]
      },
      {
        title: 'نموذج تطبيقي من قصار السور',
        paragraphs: [
          'في سورة الإخلاص يقرّر التفسير تنزيه الله تعالى عن الشريك والنظير، ومعنى الصمد أي المقصود في الحوائج على الدوام، وأنه لم يلد ولم يولد لانتفاء المثل والمجانسة عن ذاته سبحانه.',
          'وفي سورة العصر يربط المفسران نجاة الإنسان من الخسران بأربعة أركان متلازمة: الإيمان بالله، والعمل الصالح، والتواصي بالحق، والتواصي بالصبر على الطاعات والابتلاءات.',
          'جرّب في هذه الصفحة وضع علامة زرقاء أو تدوين فائدة تدبرية أو تظليل العبارة التي استوقفتك عبر شريط الأدوات في الأعلى.'
        ]
      },
      {
        title: 'خطة استكمال النص التراثي الكامل',
        paragraphs: [
          'تشتمل هذه النسخة في الخطوة الثانية على مدخل تعريفي ونماذج تطبيقية مبوبة لاختبار القارئ المدمج وكافة أدوات الحفظ والملاحظات والتظليل.',
          'وفي الخطوة الثالثة سيتم إدراج النص الكامل المفتوح لتفسير الجلالين مقسماً ومربوطاً بسور القرآن الكريم ليُقرأ ويُبحث فيه بالكامل داخل القارئ دون مغادرة التطبيق.'
        ]
      }
    ]
  },
  {
    id: 'tariq_quran',
    categoryId: 'quran',
    categoryLabel: 'القرآن وتفسيره والتزكية',
    title: 'الطريق إلى القرآن',
    author: 'إبراهيم بن عمر السكران',
    kind: 'heritage',
    pdfUrl: './books/tariq_quran.pdf?v=30',
    coverImage: './books/covers/tariq_quran.jpg?v=30',
    coverIsLight: true,
    fullPagesCount: 117,
    iconName: 'quran',
    coverAccent: '#a7f3d0',
    coverGradient: 'linear-gradient(155deg, #0a3b2e 0%, #125644 100%)',
    description: 'كتاب إيماني تربوي يوقظ في القلب تعظيم الوحي واستعادة الدهشة الأولى أمام آيات القرآن، ويعالج أسباب قسوة القلب والفتور القرائي (117 صفحة كاملة مفهرسة بالفصول العشرة والخاتمة، مهيأة للقراءة بملء الشاشة والتظليل والحفظ دون إنترنت).',
    pages: [
      {
        title: 'الطريق إلى القرآن',
        paragraphs: [
          'النسخة الكاملة مدمجة بصيغة PDF (117 صفحة كاملة مفهرسة بالفصول العشرة والخاتمة) وجاهزة للقراءة المباشرة داخل قارئ المكتبة بالشاشة الكاملة والمارك بايج الأزرق والملاحظات والتظليل والحفظ دون إنترنت.'
        ]
      }
    ]
  },
  {
    id: 'hikam_ataiyya',
    categoryId: 'quran',
    categoryLabel: 'القرآن وتفسيره والتزكية',
    title: 'متن الحكم العطائية',
    author: 'الإمام تاج الدين ابن عطاء الله السكندري',
    kind: 'heritage',
    pdfUrl: './books/hikam_ataiyya.pdf?v=23',
    coverImage: './books/covers/hikam_ataiyya.jpg?v=26',
    coverIsLight: true,
    fullPagesCount: 31,
    iconName: 'lantern',
    coverAccent: '#fde68a',
    coverGradient: 'linear-gradient(155deg, #16304b 0%, #14534f 100%)',
    description: 'متن الحكم العطائية الكامل (264 حكمة مضبوطة بالشكل) للإمام ابن عطاء الله السكندري في التزكية والسلوك ومعاني الإخلاص والعبودية وحسن الظن بالله.',
    pages: [
      {
        title: 'متن الحكم العطائية',
        paragraphs: [
          'النسخة الكاملة مدمجة بصيغة PDF (31 صفحة • 264 حكمة مضبوطة بالشكل) وجاهزة للقراءة المباشرة داخل قارئ المكتبة مع المارك بايج الأزرق والملاحظات والتظليل.'
        ]
      }
    ]
  },
  {
    id: 'tawba_ghazali',
    categoryId: 'quran',
    categoryLabel: 'القرآن وتفسيره والتزكية',
    title: 'التوبة إلى الله ومكفرات الذنوب',
    author: 'حجة الإسلام أبو حامد الغزالي (تحقيق: عبد اللطيف عاشور)',
    kind: 'heritage',
    pdfUrl: './books/tawba_ghazali.pdf?v=33',
    coverImage: './books/covers/tawba_ghazali.jpg?v=33',
    fullPagesCount: 151,
    iconName: 'lantern',
    coverAccent: '#e2c07a',
    coverGradient: 'linear-gradient(155deg, #102a24 0%, #1c4d3e 100%)',
    description: 'كتاب التوبة من «إحياء علوم الدين» لحجة الإسلام الإمام أبي حامد الغزالي، بدراسة وتحقيق عبد اللطيف عاشور؛ يفصّل حقيقة التوبة وأركانها الأربعة ووجوبها على الفور، وأقسام الذنوب صغائرها وكبائرها، وطريق رد المظالم ودواء حلّ عقدة الإصرار (151 صفحة كاملة مفهرسة بـ 41 عنواناً، مهيأة للقراءة بملء الشاشة والتظليل والحفظ دون إنترنت).',
    pages: [
      {
        title: 'التوبة إلى الله ومكفرات الذنوب',
        paragraphs: [
          'النسخة الكاملة مدمجة بصيغة PDF (151 صفحة كاملة مفهرسة بالأركان الأربعة وفصولها في 41 عنواناً) وجاهزة للقراءة المباشرة داخل قارئ المكتبة بالشاشة الكاملة والمارك بايج الأزرق والملاحظات والتظليل والحفظ دون إنترنت.'
        ]
      }
    ]
  },
  {
    id: 'qisas_anbiya',
    categoryId: 'seerah',
    categoryLabel: 'السيرة وقصص الأنبياء',
    title: 'قصص الأنبياء',
    author: 'الإمام الحافظ ابن كثير الدمشقي',
    kind: 'heritage',
    dataUrl: './books/qisas_anbiya.json?v=19',
    coverImage: './books/covers/qisas_anbiya.jpg?v=29',
    fullPagesCount: 864,
    iconName: 'scroll',
    coverAccent: '#fcd34d',
    coverGradient: 'linear-gradient(155deg, #432818 0%, #6f4518 100%)',
    description: 'مصنف تراثي عمدة يستخلص قصص الأنبياء عليهم السلام من القرآن الكريم وصحيح السنة النبوية مع التنبيه على الإسرائيليات وبيان العبر الدعوية.',
    pages: [
      {
        title: 'الحكمة القرآنية في قصص الأنبياء',
        paragraphs: [
          'انطلقت منهجية الإمام ابن كثير رحمه الله في كتاب قصص الأنبياء من الاعتماد الأول على الآيات القرآنية الصريحة وما صحّ من أحاديث النبي ﷺ في بيانها وتفصيلها.',
          'فالقصص القرآني لم يُسق للتسلية العابرة، بل لتثبيت الفؤاد وتقرير سنن الله الثابتة في نصر أوليائه وعاقبة المكذبين على مرّ القرون.'
        ]
      },
      {
        title: 'من نوح وإبراهيم إلى موسى وعيسى عليهم السلام',
        paragraphs: [
          'يرى القارئ في صبر نوح عليه السلام طوال ألف سنة إلا خمسين عاماً نموذجاً للداعية الذي لا ييأس ولا يساوم على أصل التوحيد مهما قلّ المستجيبون.',
          'كما تتجلى في سيرة الخليل إبراهيم عليه السلام شجاعة الحجة وصدق التوكل، وفي سيرة موسى عليه السلام الجمع بين مجابهة الطغيان ورعاية المستضعفين.'
        ]
      },
      {
        title: 'خطة استكمال النص التراثي الكامل',
        paragraphs: [
          'هذا العمل التراثي الجليل مفتوح المصدر، مما يسمح بإدراج أبوابه التاريخية كاملة ومفهرسة داخل التطبيق.',
          'في الخطوة الثالثة سيتم إدماج فصوله وصفحاته كاملة للقراءة والمطالعة والبحث المباشر مع بقاء المارك بايج الأزرق والملاحظات والتظليل فعالة بالكامل.'
        ]
      }
    ]
  },
  {
    id: 'alwah_wa_dusur',
    categoryId: 'seerah',
    categoryLabel: 'السيرة وقصص الأنبياء',
    title: 'ألواح ودسر',
    author: 'د. أحمد خيري العمري',
    kind: 'heritage',
    pdfUrl: './books/alwah_wa_dusur.pdf?v=24',
    coverImage: './books/covers/alwah_wa_dusur.jpg?v=26',
    fullPagesCount: 392,
    iconName: 'ship',
    coverAccent: '#bae6fd',
    coverGradient: 'linear-gradient(155deg, #0f2942 0%, #1b4965 100%)',
    description: 'رواية فكرية معاصرة تستلهم قصة نبي الله نوح عليه السلام وسفينته في قراءة أدبية عميقة لوعي الإنسان المعاصر ومعاني الإيمان والإصلاح (392 صفحة مفهرسة بالفصول).',
    pages: [
      {
        title: 'ألواح ودسر',
        paragraphs: [
          'النسخة الكاملة مدمجة بصيغة PDF (392 صفحة مع فهرس الفصول الكامل) وجاهزة للقراءة المباشرة داخل قارئ المكتبة بالمارك بايج الأزرق والملاحظات والتظليل.'
        ]
      }
    ]
  },
  {
    id: 'tadhkirat_sami',
    categoryId: 'ilm',
    categoryLabel: 'طلب العلم والفكر واليقين',
    title: 'تذكرة السامع والمتكلم في أدب العالم والمتعلم',
    author: 'الإمام بدر الدين ابن جماعة الكناني',
    kind: 'heritage',
    dataUrl: './books/tadhkirat_sami.json?v=19',
    coverImage: './books/covers/tadhkirat_sami.jpg?v=29',
    fullPagesCount: 108,
    iconName: 'quill',
    coverAccent: '#fef08a',
    coverGradient: 'linear-gradient(155deg, #0f2942 0%, #1b436e 100%)',
    description: 'دستور تربوي رصين في آداب طالب العلم والأستاذ وصحبة الكتب؛ يضع قواعد الإخلاص والحفظ وحضور المجالس واحترام المعلم والمقر العلمي.',
    pages: [
      {
        title: 'آداب المتعلم في نفسه وطهارة النية',
        paragraphs: [
          'يبدأ الإمام ابن جماعة بتأكيد أن أول ما يجب على طالب العلم هو تطهير قلبه من الرياء والمباهاة، وقصد وجه الله ونفع نفسه والناس بهذا العلم الشريف.',
          'ويحثّ الطالب على المبادرة باستغلال زمن الشباب والفراغ قبل تكاثر الشواغل، والجمع بين التواضع لأهل الفضل والجدية في المذاكرة والمداومة.'
        ]
      },
      {
        title: 'أدب الصحبة مع الكتب وآداب الإعارة',
        paragraphs: [
          'يفرد المؤلف باباً نفيساً لصيانة الكتب والانتفاع بها، ومن أبرزه العناية بالكتاب عند مطالعته وإعارته، وردّه في أجله المحدد سليماً غير مشوّه ولا منقوص.',
          'وهذا المعنى التراثي يتكامل مباشرة مع بروتوكول الإعارة والانضباط الذي يلتزم به نشطاء نادي جسور في المقر.'
        ]
      },
      {
        title: 'خطة استكمال النص التراثي الكامل',
        paragraphs: [
          'يضم الكتاب خمسة أبواب مرتبة في فضل العلم، وآداب العالم في نفسه وفي درسه، وآداب المتعلم في نفسه ومع شيخه ورفقته، وآداب معاشرة الكتب، وأدب سكنى المدارس.',
          'في الخطوة الثالثة سيُدرج متن الكتاب كاملاً مقسّماً على أبوابه داخل هذا القارئ.'
        ]
      }
    ]
  },
  {
    id: 'diwan_mutanabbi',
    categoryId: 'poetry',
    categoryLabel: 'الدواوين الشعرية',
    title: 'ديوان أبي الطيب المتنبي',
    author: 'أبو الطيب أحمد بن الحسين المتنبي',
    kind: 'heritage',
    dataUrl: './books/diwan_mutanabbi.json?v=19',
    coverImage: './books/covers/diwan_mutanabbi.jpg?v=29',
    fullPagesCount: 134,
    iconName: 'poetry',
    coverAccent: '#e9d5ff',
    coverGradient: 'linear-gradient(155deg, #2d1b3d 0%, #4a2a5e 100%)',
    description: 'قمة الشعر العربي في الحكمة وعزة النفس وعلوّ الهمة؛ قصائد محكمة تجري أمثالها على الألسنة وتصقل ذوق طالب العلم وبلاغته العربية.',
    pages: [
      {
        title: 'مختارات في علوّ الهمة وصناعة المجد',
        paragraphs: [
          'من أشهر أبيات المتنبي السائرة في استنهاض العزائم قوله: «عَلى قَدرِ أَهلِ العَزمِ تَأتي العَزائِمُ • وَتَأتي عَلى قَدرِ الكِرامِ المَكارِمُ».',
          'وقوله في السعي والمكابدة للارتقاء في المراتب: «تُريدينَ لُقيانَ المَعالي رَخيصَةً • وَلا بُدَّ دونَ الشَهدِ مِن إِبَرِ النَحلِ».'
        ]
      },
      {
        title: 'أبيات الحكمة وعزّة النفس والبيان',
        paragraphs: [
          'وفي الفخر الأدبي البليغ قال أبو الطيب: «الخَيلُ وَاللَيلُ وَالبَيداءُ تَعرِفُني • وَالسَيفُ وَالرُمحُ وَالقِرطاسُ وَالقَلَمُ».',
          'كما خلّد في حكمته قاعدة التدرج مع الدهر بقوله: «ما كُلُّ ما يَتَمَنّى المَرءُ يُدرِكُهُ • تَجري الرِياحُ بِما لا تَشتَهي السُفُنُ».'
        ]
      },
      {
        title: 'خطة استكمال المختارات والقصائد (الخطوة الثالثة)',
        paragraphs: [
          'الشعر التراثي الرصين ركن أصيل في تذوق اللغة العربية وفهم أساليب العرب التي نزل بها القرآن الكريم.',
          'في الخطوة الثالثة سيتم توسيع الديوان بأهم قصائده المشروحة والمضبوطة بالشكل ليحفظ منها الطالب ويظلّل الأبيات الجامعة.'
        ]
      }
    ]
  },
  {
    id: 'bayt_bila_nawafidh',
    categoryId: 'afghan',
    categoryLabel: 'الأدب الأفغاني',
    title: 'بيت بلا نوافذ',
    author: 'نادية هاشمي (ترجمة: إيمان حرز الله)',
    kind: 'heritage',
    pdfUrl: './books/bayt_bila_nawafidh.pdf?v=25',
    coverImage: './books/covers/bayt_bila_nawafidh.jpg?v=26',
    fullPagesCount: 500,
    iconName: 'window',
    coverAccent: '#fed7aa',
    coverGradient: 'linear-gradient(155deg, #3c1810 0%, #6b2d1b 100%)',
    description: 'رواية إنسانية مؤثرة من الأدب الأفغاني المعاصر؛ تروي حكاية «زيبا» ورحلتها بين جدران السجن والبحث عن العدالة والكرامة في أفغانستان (500 صفحة مفهرسة بالفصول).',
    pages: [
      {
        title: 'بيت بلا نوافذ',
        paragraphs: [
          'النسخة الكاملة مدمجة بصيغة PDF (500 صفحة مع فهرس الفصول الكامل من الفصل 1 إلى الفصل 54) وجاهزة للقراءة المباشرة داخل قارئ المكتبة بالمارك بايج الأزرق والملاحظات والتظليل.'
        ]
      }
    ]
  },
  {
    id: 'mazraat_al_hayawanat',
    categoryId: 'world',
    categoryLabel: 'الأدب العالمي',
    title: 'مزرعة الحيوانات',
    author: 'جورج أورويل (ترجمة: شامل أباظة)',
    kind: 'heritage',
    pdfUrl: './books/mazraat_al_hayawanat.pdf?v=28',
    coverImage: './books/covers/mazraat_al_hayawanat.jpg?v=28',
    fullPagesCount: 122,
    iconName: 'globe',
    coverAccent: '#fef08a',
    coverGradient: 'linear-gradient(155deg, #4a1912 0%, #8c321b 100%)',
    description: 'الرواية الرمزية الشهيرة لجورج أورويل في نقد الاستبداد وتحوّلات الشعارات الثورية (122 صفحة كاملة مفهرسة بالفصول العشرة، مهيأة للقراءة بملء الشاشة والتظليل والحفظ دون إنترنت).',
    pages: [
      {
        title: 'مزرعة الحيوانات',
        paragraphs: [
          'النسخة الكاملة مدمجة بصيغة PDF (122 صفحة مع فهرس الفصول العشرة الكامل) وجاهزة للقراءة المباشرة داخل قارئ المكتبة بالشاشة الكاملة والمارك بايج الأزرق والملاحظات والتظليل والحفظ دون إنترنت.'
        ]
      }
    ]
  },
  {
    id: 'heidi',
    categoryId: 'world',
    categoryLabel: 'الأدب العالمي',
    title: 'هايدي (Heidi)',
    author: 'يوهانا شبيري — Johanna Spyri',
    kind: 'heritage',
    pdfUrl: './books/heidi.pdf?v=31',
    pdfCanvasOnly: true,
    coverImage: './books/covers/heidi.jpg?v=31',
    fullPagesCount: 222,
    iconName: 'globe',
    coverAccent: '#fde68a',
    coverGradient: 'linear-gradient(155deg, #2d3a24 0%, #4b5c3b 100%)',
    description: 'الرواية السويسرية الكلاسيكية الخالدة للكاتبة يوهانا شبيري بنسختها الإنجليزية الكاملة «طبعة الهدايا المصوّرة» (ترجمة إليزابيث ب. ستورك، مع 14 لوحة ملونة للفنانة ماريا ل. كيرك؛ 222 صفحة مفهرسة بالكامل في جزأين و23 فصلاً، مهيأة للقراءة بملء الشاشة والبحث النصي والتظليل والحفظ دون إنترنت).',
    pages: [
      {
        title: 'هايدي (Heidi)',
        paragraphs: [
          'النسخة الإنجليزية الكاملة مدمجة بصيغة PDF (222 صفحة مع 14 لوحة ملونة وفهرس الفصول الكامل في جزأين و23 فصلاً) وجاهزة للقراءة المباشرة داخل قارئ المكتبة بالشاشة الكاملة والبحث النصي والمارك بايج الأزرق والملاحظات والتظليل والحفظ دون إنترنت.'
        ]
      }
    ]
  },
  {
    id: 'mumtali_bil_faragh',
    categoryId: 'psych',
    categoryLabel: 'علم النفس والتعافي',
    title: 'ممتلئ بالفراغ',
    author: 'د. عماد رشاد عثمان',
    kind: 'heritage',
    pdfUrl: './books/mumtali_bil_faragh.pdf?v=32',
    coverImage: './books/covers/mumtali_bil_faragh.jpg?v=32',
    coverIsLight: true,
    fullPagesCount: 462,
    iconName: 'psych',
    coverAccent: '#fecaca',
    coverGradient: 'linear-gradient(155deg, #450a0a 0%, #991b1b 100%)',
    description: 'تأملات نفسية وإنسانية عميقة حول فهم البنية النفسية للإدمانات والسلوكيات القهرية وخارطة التعافي الروحية والعملية (462 صفحة كاملة بالمخططات التوضيحية وجداول التقييم والهوامش، مفهرسة في 47 قسماً، مهيأة للقراءة بملء الشاشة والتظليل والحفظ دون إنترنت).',
    pages: [
      {
        title: 'ممتلئ بالفراغ',
        paragraphs: [
          'النسخة الكاملة مدمجة بصيغة PDF (462 صفحة مع المخططات الملونة وجداول التدريبات العملية وفهرس تفصيلي من 47 بنداً) وجاهزة للقراءة المباشرة داخل قارئ المكتبة بالشاشة الكاملة والمارك بايج الأزرق والملاحظات والتظليل والحفظ دون إنترنت.'
        ]
      }
    ]
  }
];

let libActiveCategory = 'all';
let libSearchQuery = '';
let libCurrentBookId = null;
let libCurrentPage = 1;
let libActiveDrawer = null;
let libHighlightMode = false;
let libSelectedHighlightColor = '#fef08a';
let libInitialized = false;
let libLoadedBooks = {};
let libSearchOpen = false;
let libReaderMode = 'text'; // 'text' | 'pdf'
let libPdfViewMode = 'canvas'; // 'canvas' | 'text'
let libOfflineSavedMap = {};
let libFullscreenActive = false;
let libFsChromeHidden = false;
let libFsResizeTimer = null;
let libFsListenersBound = false;
let libNativeFsWasEntered = false;

let libProgress = {};
let libBookmarks = {};
let libNotes = {};
let libHighlights = {};
let libPdfHighlights = {};
let libCustomBooks = [];
let libPdfMeta = {};
let libPrefs = { fontSize: 1.04, pdfZoom: 1.0, nightMode: false };
let libReadingLog = { months: {}, completedBooks: {} };
let libFawaidItems = [];
let libFawaidLocalVotes = {};
let libFawaidFilter = 'top_month';
let libFawaidUnsub = null;
let libFawaidCloudState = 'local';
let libFawaidSubmitting = false;
let libHarvestLogoImg = null;

let libPdfState = {
  bookId: null,
  doc: null,
  numPages: 0,
  chapters: [],
  renderTask: null,
  rendering: false,
  pageTexts: {},
  cleanTexts: {},
  searchAbortId: 0
};
let libPendingCustomPdf = null;
let libPdfHlBound = false;
let libSelectedHlId = null;
let libZoomDebounceTimer = null;
let libPinchBound = false;

const LIB_CUSTOM_COVER_GRADIENTS = [
  'linear-gradient(155deg, #0f2942 0%, #164e63 100%)',
  'linear-gradient(155deg, #0a3b2e 0%, #125644 100%)',
  'linear-gradient(155deg, #432818 0%, #6f4518 100%)',
  'linear-gradient(155deg, #5c1926 0%, #1e3a5f 100%)',
  'linear-gradient(155deg, #1e293b 0%, #334155 100%)'
];

function escapeLibHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function loadLibraryStateFromStorage() {
  const safeParse = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : fallback;
    } catch (e) {
      return fallback;
    }
  };

  libProgress = safeParse(LIB_PROGRESS_KEY, {});
  libBookmarks = safeParse(LIB_BOOKMARKS_KEY, {});
  libNotes = safeParse(LIB_NOTES_KEY, {});
  libHighlights = safeParse(LIB_HIGHLIGHTS_KEY, {});
  libPdfHighlights = safeParse(LIB_PDF_HIGHLIGHTS_KEY, {});
  libPdfMeta = safeParse(LIB_PDF_META_KEY, {});

  const rawCustom = safeParse(LIB_CUSTOM_BOOKS_KEY, []);
  libCustomBooks = Array.isArray(rawCustom) ? rawCustom : [];

  const prefs = safeParse(LIB_PREFS_KEY, null);
  if (prefs) {
    if (typeof prefs.fontSize === 'number') {
      libPrefs.fontSize = Math.min(1.5, Math.max(0.88, prefs.fontSize));
    }
    if (typeof prefs.pdfZoom === 'number') {
      libPrefs.pdfZoom = Math.min(1.8, Math.max(0.85, prefs.pdfZoom));
    }
    libPrefs.nightMode = Boolean(prefs.nightMode);
  }

  const rawLog = safeParse(LIB_READING_LOG_KEY, null);
  if (rawLog && typeof rawLog === 'object') {
    libReadingLog = {
      months: rawLog.months && typeof rawLog.months === 'object' ? rawLog.months : {},
      completedBooks: rawLog.completedBooks && typeof rawLog.completedBooks === 'object' ? rawLog.completedBooks : {}
    };
  } else {
    libReadingLog = { months: {}, completedBooks: {} };
    const mKey = getLibMonthKey();
    const progIds = Object.keys(libProgress || {});
    if (progIds.length) {
      libReadingLog.months[mKey] = {};
      progIds.forEach((bid) => {
        const pg = parseInt(libProgress[bid], 10) || 0;
        const bk = getBookById(bid);
        const tot = bk ? getBookTotalPages(bk) : pg;
        if (pg > 1 && bk && tot > 1) {
          libReadingLog.months[mKey][bid] = { visited: [], baseline: Math.min(pg, tot) };
          if ((tot >= 5 && pg >= tot) || (tot > 10 && pg >= tot - 1)) {
            libReadingLog.completedBooks[bid] = { title: bk.title, completedAt: Date.now() };
          }
        }
      });
    }
  }

  libFawaidLocalVotes = safeParse(LIB_FAWAID_VOTES_KEY, {});
}

function saveLibraryStorage(key, obj) {
  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch (e) {}
}

/* ── قاعدة بيانات IndexedDB الدائمة لحفظ ملفات PDF على جهاز المستخدم ── */
function openLibPdfDb() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('IndexedDB is not supported'));
      return;
    }
    const req = indexedDB.open(LIB_PDF_DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(LIB_PDF_STORE)) {
        db.createObjectStore(LIB_PDF_STORE, { keyPath: 'bookId' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error('IndexedDB open error'));
  });
}

async function savePdfBufferToIdb(bookId, fileName, buffer) {
  const db = await openLibPdfDb();
  if (navigator.storage && typeof navigator.storage.persist === 'function') {
    navigator.storage.persist().catch(() => {});
  }
  return new Promise((resolve, reject) => {
    const tx = db.transaction(LIB_PDF_STORE, 'readwrite');
    tx.objectStore(LIB_PDF_STORE).put({
      bookId: String(bookId),
      fileName: String(fileName || 'book.pdf'),
      buffer: buffer,
      savedAt: Date.now()
    });
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error || new Error('IndexedDB save failed'));
  });
}

async function getPdfRecordFromIdb(bookId) {
  const db = await openLibPdfDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(LIB_PDF_STORE, 'readonly');
    const req = tx.objectStore(LIB_PDF_STORE).get(String(bookId));
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error || new Error('IndexedDB read failed'));
  });
}

async function deletePdfFromIdb(bookId) {
  try {
    const db = await openLibPdfDb();
    return await new Promise((resolve) => {
      const tx = db.transaction(LIB_PDF_STORE, 'readwrite');
      tx.objectStore(LIB_PDF_STORE).delete(String(bookId));
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  } catch (e) {
    return false;
  }
}

async function ensurePdfJsReady() {
  if (window.pdfjsLib && typeof window.pdfjsLib.getDocument === 'function') {
    if (window.pdfjsLib.GlobalWorkerOptions) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = './vendor/pdf.worker.min.js?v=20';
    }
    return window.pdfjsLib;
  }

  await new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src*="vendor/pdf.min.js"]');
    if (existing && window.pdfjsLib) {
      resolve();
      return;
    }
    const s = existing || document.createElement('script');
    if (!existing) {
      s.src = './vendor/pdf.min.js?v=20';
      document.head.appendChild(s);
    }
    const timer = setTimeout(() => reject(new Error('PDF.js load timeout')), 15000);
    s.addEventListener('load', () => {
      clearTimeout(timer);
      resolve();
    }, { once: true });
    s.addEventListener('error', () => {
      clearTimeout(timer);
      reject(new Error('PDF.js script load failed'));
    }, { once: true });
  });

  if (!window.pdfjsLib) {
    throw new Error('pdfjsLib unavailable');
  }
  if (window.pdfjsLib.GlobalWorkerOptions) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = './vendor/pdf.worker.min.js?v=20';
  }
  return window.pdfjsLib;
}

function getAllLibraryBooks() {
  return LIBRARY_BOOKS.concat(libCustomBooks);
}

function getBookById(bookId) {
  return getAllLibraryBooks().find((b) => b.id === bookId) || null;
}

function hasAttachedPdf(book) {
  if (!book) return false;
  return Boolean((libPdfMeta[book.id] && libPdfMeta[book.id].pageCount > 0) || book.pdfUrl);
}

function isBookUsingPdfReader(book) {
  return Boolean(book && libReaderMode === 'pdf' && libPdfState.bookId === book.id && libPdfState.doc);
}

function getBookTotalPages(book) {
  if (!book) return 1;
  if (libPdfState.bookId === book.id && libPdfState.numPages > 0) {
    return libPdfState.numPages;
  }
  if (libPdfMeta[book.id] && libPdfMeta[book.id].pageCount > 0) {
    return libPdfMeta[book.id].pageCount;
  }
  return book.fullPagesCount || (Array.isArray(book.pages) ? book.pages.length : 1);
}

function renderBookCoverHtml(book, extraCls = '', tagHtml = '', offlineBadgeHtml = '') {
  const meta = libPdfMeta[book.id];
  const coverSrc = book.coverImage || (meta && meta.coverDataUrl) || '';
  if (coverSrc) {
    const lightCls = book.coverIsLight ? 'is-light-cover' : '';
    return `
      <div class="lib-book-cover has-cover-img ${lightCls} ${extraCls}">
        <span class="lib-book-spine"></span>
        ${tagHtml}
        ${offlineBadgeHtml}
        <img class="lib-cover-img" src="${escapeLibHtml(coverSrc)}" alt="${escapeLibHtml(book.title)}" decoding="async">
      </div>
    `;
  }
  const grad = book.coverGradient || 'linear-gradient(155deg, #0f2942 0%, #164e63 100%)';
  const emblem = libIcon(book.iconName || 'book');
  return `
    <div class="lib-book-cover is-editorial ${extraCls}" style="background: ${escapeLibHtml(grad)};">
      <span class="lib-book-spine"></span>
      ${tagHtml}
      ${offlineBadgeHtml}
      <div class="lib-editorial-frame">
        <div class="lib-editorial-emblem">${emblem}</div>
        <span class="lib-editorial-rule"></span>
        <div class="lib-editorial-title">${escapeLibHtml(book.title)}</div>
        <div class="lib-editorial-author">${escapeLibHtml(book.author || '')}</div>
      </div>
    </div>
  `;
}

function isBookStoredOffline(book) {
  if (!book) return false;
  if (book.pdfUrl || book.dataUrl) {
    return Boolean(libOfflineSavedMap[book.id]);
  }
  return Boolean(libPdfMeta[book.id] && libPdfMeta[book.id].pageCount > 0);
}

async function refreshOfflineBookStatuses() {
  const all = getAllLibraryBooks();
  if ('caches' in window) {
    try {
      const cache = await caches.open(LIB_BOOKS_CACHE_NAME);
      await Promise.all(all.map(async (b) => {
        const assetUrl = b.pdfUrl || b.dataUrl;
        if (!assetUrl) return;
        try {
          const match = (await cache.match(assetUrl)) || (await caches.match(assetUrl));
          libOfflineSavedMap[b.id] = Boolean(match);
        } catch (e) {}
      }));
    } catch (e) {}
  }
  return libOfflineSavedMap;
}

async function downloadBookForOffline(bookId) {
  const b = getBookById(bookId);
  if (!b) return;
  const targetUrl = b.pdfUrl || b.dataUrl;
  if (!targetUrl) {
    if (typeof showToast === 'function') {
      showToast('أرفق ملف PDF للكتاب أولاً ليُحفظ على جهازك دون إنترنت.');
    }
    return;
  }
  if (!('caches' in window)) {
    if (typeof showToast === 'function') {
      showToast('متصفحك الحالي لا يدعم الحفظ المحلي للكتب.');
    }
    return;
  }
  const dlBtn = document.getElementById('libOfflineDownloadBtn');
  if (dlBtn) {
    dlBtn.disabled = true;
    dlBtn.innerHTML = `${libIcon('download')}<span>جاري الحفظ في ذاكرة الهاتف...</span>`;
  }
  if (typeof showToast === 'function') {
    showToast(`جاري تنزيل «${b.title}» للقراءة دون إنترنت...`);
  }
  try {
    if (navigator.storage && navigator.storage.persist) {
      navigator.storage.persist().catch(() => {});
    }
    const cache = await caches.open(LIB_BOOKS_CACHE_NAME);
    const res = await fetch(targetUrl);
    if (!res || !res.ok) {
      throw new Error(`HTTP ${res ? res.status : 'error'}`);
    }
    await cache.put(targetUrl, res.clone());
    if (b.coverImage) {
      try {
        const cRes = await fetch(b.coverImage);
        if (cRes && cRes.ok) {
          await cache.put(b.coverImage, cRes.clone());
        }
      } catch (e) {}
    }
    libOfflineSavedMap[b.id] = true;
    if (typeof showToast === 'function') {
      showToast(`تم حفظ «${b.title}» بنجاح للقراءة دون إنترنت`);
    }
    renderLibraryBooksGrid();
    const detailEl = document.getElementById('libDetailView');
    if (libCurrentBookId === b.id && detailEl && detailEl.style.display !== 'none') {
      openBookDetail(b.id);
    }
  } catch (err) {
    console.error('Offline book cache error:', err);
    if (dlBtn) {
      dlBtn.disabled = false;
      dlBtn.innerHTML = `${libIcon('download')}<span>حفظ الكتاب للقراءة دون إنترنت</span>`;
    }
    if (typeof showToast === 'function') {
      showToast('تعذّر تحميل الكتاب حالياً؛ تحقّق من الاتصال بالإنترنت ثم أعد المحاولة.');
    }
  }
}

async function removeOfflineBookCopy(bookId) {
  const b = getBookById(bookId);
  if (!b) return;
  const targetUrl = b.pdfUrl || b.dataUrl;
  if ('caches' in window && targetUrl) {
    try {
      const cache = await caches.open(LIB_BOOKS_CACHE_NAME);
      await cache.delete(targetUrl);
    } catch (e) {}
  }
  libOfflineSavedMap[b.id] = false;
  if (typeof showToast === 'function') {
    showToast(`أُزيلت النسخة المحفوظة لـ «${b.title}» من الذاكرة المحلية`);
  }
  renderLibraryBooksGrid();
  const detailEl = document.getElementById('libDetailView');
  if (libCurrentBookId === b.id && detailEl && detailEl.style.display !== 'none') {
    openBookDetail(b.id);
  }
}

function renderLibraryCategoryBar() {
  const bar = document.getElementById('libCategoryBar');
  if (!bar) return;
  bar.innerHTML = LIBRARY_CATEGORIES.map((cat) => `
    <button type="button"
      class="lib-cat-pill tap-glow ${cat.id === libActiveCategory ? 'active' : ''}"
      data-cat="${cat.id}"
      onclick="selectLibraryCategory('${cat.id}')">
      ${libIcon(cat.iconName)}
      <span>${escapeLibHtml(cat.label)}</span>
    </button>
  `).join('');
}

function getFilteredLibraryBooks() {
  const q = String(libSearchQuery || '').trim().toLowerCase();
  return getAllLibraryBooks().filter((b) => {
    const matchesCat = libActiveCategory === 'all' || b.categoryId === libActiveCategory;
    if (!matchesCat) return false;
    if (!q) return true;
    const hay = `${b.title} ${b.author} ${b.categoryLabel} ${b.description}`.toLowerCase();
    return hay.includes(q);
  });
}

function renderLibraryBooksGrid() {
  const grid = document.getElementById('libBooksGrid');
  const countBadge = document.getElementById('libCountBadge');
  if (!grid) return;

  const list = getFilteredLibraryBooks();
  if (countBadge) {
    countBadge.textContent = `${list.length} ${list.length === 1 ? 'كتاب' : (list.length <= 10 ? 'كتب' : 'كتاباً')}`;
  }

  if (!list.length) {
    grid.innerHTML = `
      <div class="andalus-card" style="grid-column: 1 / -1; text-align: center; padding: 24px 12px; color: var(--ink-muted);">
        لم يُعثر على كتاب مطابق لبحثك في هذا التصنيف.
      </div>
    `;
    return;
  }

  grid.innerHTML = list.map((b) => {
    const lastPg = libProgress[b.id] || 0;
    const totalPg = getBookTotalPages(b);
    const bmCount = libBookmarks[b.id] ? Object.keys(libBookmarks[b.id]).length : 0;
    const noteCount = libNotes[b.id] ? Object.keys(libNotes[b.id]).length : 0;
    const pdfAttached = hasAttachedPdf(b);
    const isOffline = isBookStoredOffline(b);

    const statusParts = [];
    if (lastPg > 0) statusParts.push(`<span class="lib-stat-inline">ص ${lastPg}/${totalPg}</span>`);
    else if (pdfAttached) statusParts.push(`<span class="lib-stat-inline">${totalPg} ص</span>`);
    if (bmCount > 0) statusParts.push(`<span class="lib-stat-inline">${libIcon('bookmark')} ${bmCount}</span>`);
    if (noteCount > 0) statusParts.push(`<span class="lib-stat-inline">${libIcon('note')} ${noteCount}</span>`);

    let tagHtml = '<span class="lib-cover-tag">دليل وإرفاق</span>';
    if (b.dataUrl) {
      tagHtml = '<span class="lib-cover-tag is-complete">نص كامل</span>';
    } else if (pdfAttached) {
      tagHtml = '<span class="lib-cover-tag is-pdf">PDF مدمج</span>';
    }

    const offlineBadgeHtml = isOffline
      ? `<span class="lib-offline-pill">${libIcon('offline')}<span>دون إنترنت</span></span>`
      : '';
    const catObj = LIBRARY_CATEGORIES.find((c) => c.id === b.categoryId);
    const catIconName = (catObj && catObj.iconName) || b.iconName || 'book';

    return `
      <button type="button" class="lib-book-card tap-glow" onclick="openBookDetail('${b.id}')">
        ${renderBookCoverHtml(b, '', tagHtml, offlineBadgeHtml)}
        <div class="lib-book-card-body">
          <div class="lib-card-title">${escapeLibHtml(b.title)}</div>
          <div class="lib-card-author">${escapeLibHtml(b.author || 'كتاب PDF')}</div>
          <div class="lib-book-cat-chip">${libIcon(catIconName)}<span>${escapeLibHtml(b.categoryLabel)}</span></div>
          <div class="lib-book-card-foot">
            <span class="lib-book-read-cta">${libIcon('book')}<span>${pdfAttached || b.dataUrl ? 'افتح الكتاب' : 'الدليل أو إرفاق PDF'}</span></span>
            ${statusParts.length ? `<span class="lib-book-stats-mini">${statusParts.join('')}</span>` : ''}
          </div>
        </div>
      </button>
    `;
  }).join('');
}

function selectLibraryCategory(catId) {
  libActiveCategory = catId;
  renderLibraryCategoryBar();
  renderLibraryBooksGrid();
}

function filterLibraryBooks() {
  const inp = document.getElementById('libBookSearchInput');
  libSearchQuery = inp ? inp.value : '';
  renderLibraryBooksGrid();
}

function setLibrarySubView(viewName) {
  if (viewName !== 'reader' && libFullscreenActive && typeof exitBookFullscreen === 'function') {
    exitBookFullscreen();
  }
  const shelf = document.getElementById('libShelfView');
  const detail = document.getElementById('libDetailView');
  const reader = document.getElementById('libReaderView');
  const fawaid = document.getElementById('libFawaidView');
  if (shelf) shelf.style.display = viewName === 'shelf' ? 'block' : 'none';
  if (detail) detail.style.display = viewName === 'detail' ? 'block' : 'none';
  if (reader) reader.style.display = viewName === 'reader' ? 'block' : 'none';
  if (fawaid) fawaid.style.display = viewName === 'fawaid' ? 'block' : 'none';
}

function openBookDetail(bookId) {
  const b = getBookById(bookId);
  if (!b) return;
  libCurrentBookId = bookId;
  setLibrarySubView('detail');

  const container = document.getElementById('libDetailContent');
  if (!container) return;

  const pdfAttached = hasAttachedPdf(b);
  const pdfMeta = libPdfMeta[b.id] || null;
  const savedPage = libProgress[b.id] || 1;
  const totalPg = getBookTotalPages(b);
  const hasProgress = Boolean(libProgress[b.id]);
  const isOffline = isBookStoredOffline(b);
  const bmCount = libBookmarks[b.id] ? Object.keys(libBookmarks[b.id]).length : 0;
  const noteCount = libNotes[b.id] ? Object.keys(libNotes[b.id]).length : 0;
  const textHlCount = libHighlights[b.id] ? Object.keys(libHighlights[b.id]).length : 0;
  const pdfHlCount = libPdfHighlights[b.id]
    ? Object.values(libPdfHighlights[b.id]).reduce((acc, arr) => acc + (Array.isArray(arr) ? arr.length : 0), 0)
    : 0;
  const hlCount = textHlCount + pdfHlCount;

  let pageLabelStat = `${libIcon('book')}<span>${totalPg} محطات دليلية</span>`;
  if (b.dataUrl) {
    pageLabelStat = `${libIcon('scroll')}<span>${totalPg} صفحة كاملة</span>`;
  } else if (pdfAttached) {
    pageLabelStat = `${libIcon('pdf')}<span>${totalPg} صفحة PDF</span>`;
  }

  let offlineBoxHtml = '';
  if (b.pdfUrl || b.dataUrl) {
    if (isOffline) {
      offlineBoxHtml = `
        <div class="lib-offline-box is-saved">
          <div class="lib-offline-row">
            <span class="lib-offline-status">${libIcon('offline')}<span>متاح للقراءة دون إنترنت</span></span>
            <button type="button" class="lib-offline-btn is-remove tap-glow" onclick="removeOfflineBookCopy('${b.id}')">
              ${libIcon('trash')}<span>إزالة النسخة المحفوظة</span>
            </button>
          </div>
          <div class="lib-offline-sub">الكتاب محفوظ الآن في ذاكرة التطبيق على جهازك ويمكنك فتحه ومطالعته كاملةً في أي وقت ولو دون شبكة.</div>
        </div>
      `;
    } else {
      offlineBoxHtml = `
        <div class="lib-offline-box">
          <div class="lib-offline-row">
            <span class="lib-offline-status">${libIcon('download')}<span>الحفظ للقراءة دون إنترنت</span></span>
          </div>
          <div class="lib-offline-sub">تستطيع حفظ هذا الكتاب كاملاً في ذاكرة الهاتف الآن لقراءته في أي وقت ولو انقطعت الشبكة، كما يُحفظ تلقائياً عند أول فتح.</div>
          <div class="lib-offline-actions">
            <button type="button" id="libOfflineDownloadBtn" class="lib-offline-btn tap-glow" onclick="downloadBookForOffline('${b.id}')">
              ${libIcon('download')}<span>حفظ الكتاب للقراءة دون إنترنت</span>
            </button>
          </div>
        </div>
      `;
    }
  }

  let pdfBoxHtml = '';
  let actionsHtml = '';

  if (b.kind === 'modern' || b.isCustomPdf) {
    if (pdfAttached) {
      const fileLabel = pdfMeta && pdfMeta.fileName ? pdfMeta.fileName : 'ملف PDF مدمج';
      pdfBoxHtml = `
        <div class="lib-pdf-attach-card is-ready">
          <div class="lib-pdf-attach-title lib-inline-heading">${libIcon('offline')}<span>النسخة الكاملة مدمجة ومحفوظة دون إنترنت</span></div>
          <div class="lib-pdf-attach-sub">
            الملف: <strong>${escapeLibHtml(fileLabel)}</strong> • ${totalPg} صفحة جاهزة بالمارك بايج الأزرق والملاحظات والتظليل.
          </div>
        </div>
      `;
      actionsHtml = `
        <div class="lib-detail-actions">
          <button type="button" class="start-duty-btn tap-glow" onclick="openBookReader('${b.id}', false, 'pdf')">
            <span class="lib-inline-heading">${libIcon('book')}<span>${hasProgress ? `متابعة القراءة الكاملة (ص ${Math.min(savedPage, totalPg)} / ${totalPg})` : `ابدأ القراءة الكاملة (${totalPg} صفحة)`}</span></span>
          </button>
          <div class="lib-detail-sub-actions">
            ${!b.isCustomPdf ? `<button type="button" class="lib-detail-sec-btn tap-glow" onclick="openBookReader('${b.id}', false, 'guide')">${libIcon('scroll')}<span>الدليل التعريفي</span></button>` : ''}
            <button type="button" class="lib-detail-sec-btn tap-glow" onclick="triggerAttachPdfForBook('${b.id}')">${libIcon('refresh')}<span>تبديل ملف PDF</span></button>
            <button type="button" class="lib-detail-sec-btn is-danger tap-glow" onclick="${b.isCustomPdf ? `deleteCustomPdfBook('${b.id}')` : `removeAttachedPdfFromBook('${b.id}')`}">
              ${libIcon('trash')}<span>${b.isCustomPdf ? 'حذف من الرف' : 'إزالة الملف'}</span>
            </button>
          </div>
        </div>
      `;
    } else {
      pdfBoxHtml = `
        <div class="lib-pdf-attach-card">
          <div class="lib-pdf-attach-title lib-inline-heading">${libIcon('pdf')}<span>لفتح الكتاب كاملاً بصيغة PDF داخل التطبيق</span></div>
          <div class="lib-pdf-attach-sub">
            حفاظاً على حقوق المؤلف والناشر، يوفّر التطبيق الآن محاور الكتاب التعريفية فقط؛ وبمجرد اختيار ملف الـ PDF من جهازك مرة واحدة سيُحفظ هنا للأبد وتقرأ جميع صفحاته بالمارك بايج الأزرق والملاحظات والتظليل.
          </div>
          <button type="button" class="start-duty-btn tap-glow" onclick="triggerAttachPdfForBook('${b.id}')">
            <span class="lib-inline-heading">${libIcon('folder')}<span>اختر ملف PDF للكتاب من جهازك</span></span>
          </button>
        </div>
      `;
      actionsHtml = `
        <div class="lib-detail-actions">
          <button type="button" class="lib-detail-sec-btn tap-glow" onclick="openBookReader('${b.id}', false, 'guide')">
            ${libIcon('scroll')}<span>${hasProgress ? `متابعة قراءة الدليل التعريفي (محطة ${Math.min(savedPage, totalPg)} / ${totalPg})` : `قراءة الدليل التعريفي وخريطة الكتاب (${totalPg} محطات)`}</span>
          </button>
        </div>
      `;
    }
  } else {
    actionsHtml = `
      <button type="button" class="start-duty-btn tap-glow" onclick="openBookReader('${b.id}')">
        <span class="lib-inline-heading">${libIcon('book')}<span>${hasProgress ? `متابعة القراءة (صفحة ${savedPage})` : 'ابدأ القراءة الآن'}</span></span>
      </button>
    `;
  }

  const catObj = LIBRARY_CATEGORIES.find((c) => c.id === b.categoryId);
  const catIconName = (catObj && catObj.iconName) || b.iconName || 'book';

  container.innerHTML = `
    <div class="lib-detail-top">
      ${renderBookCoverHtml(b, 'lib-detail-cover', '', isOffline ? `<span class="lib-offline-pill">${libIcon('offline')}<span>محفوظ</span></span>` : '')}
      <div class="lib-detail-info">
        <span class="lib-book-cat-chip">${libIcon(catIconName)}<span>${escapeLibHtml(b.categoryLabel)}</span></span>
        <h3 class="lib-detail-title">${escapeLibHtml(b.title)}</h3>
        <div class="lib-detail-author">${libIcon('author')}<span>${escapeLibHtml(b.author)}</span></div>
        <div class="lib-detail-stats">
          <span>${pageLabelStat}</span>
          <span>${libIcon('bookmark')}<span>${bmCount} علامة</span></span>
          <span>${libIcon('note')}<span>${noteCount} ملاحظة</span></span>
          <span>${libIcon('highlight')}<span>${hlCount} تظليل</span></span>
        </div>
      </div>
    </div>
    <p class="lib-detail-desc">${escapeLibHtml(b.description)}</p>
    ${offlineBoxHtml}
    ${pdfBoxHtml}
    ${actionsHtml}
  `;
}

function triggerAttachPdfForBook(bookId) {
  libCurrentBookId = bookId || libCurrentBookId;
  const inp = document.getElementById('libAttachPdfInput');
  if (inp) {
    inp.value = '';
    inp.click();
  }
}

function triggerAttachPdfForCurrentBook() {
  if (!libCurrentBookId) return;
  triggerAttachPdfForBook(libCurrentBookId);
}

async function onBookPdfFilePicked(inputEl) {
  const file = inputEl && inputEl.files && inputEl.files[0];
  if (!file || !libCurrentBookId) return;
  const book = getBookById(libCurrentBookId);
  if (!book) return;

  if (typeof showToast === 'function') {
    showToast('جاري فحص ملف PDF وحفظه للقراءة الكاملة...');
  }

  try {
    const rawBuffer = await file.arrayBuffer();
    const inspected = await inspectPdfBuffer(rawBuffer);
    await savePdfBufferToIdb(book.id, file.name, rawBuffer);

    libPdfMeta[book.id] = {
      pageCount: inspected.numPages,
      fileName: file.name,
      byteLength: rawBuffer.byteLength,
      chapters: inspected.chapters,
      coverDataUrl: inspected.coverDataUrl || null,
      updatedAt: Date.now()
    };
    saveLibraryStorage(LIB_PDF_META_KEY, libPdfMeta);

    libProgress[book.id] = 1;
    saveLibraryStorage(LIB_PROGRESS_KEY, libProgress);

    if (typeof showToast === 'function') {
      showToast(`تم إدراج «${book.title}» (${inspected.numPages} صفحة) وحفظه محلياً`);
    }
    await openBookReader(book.id, true, 'pdf');
  } catch (err) {
    console.error('PDF attach error:', err);
    if (typeof showToast === 'function') {
      showToast('تعذّر قراءة هذا الملف كـ PDF صالح، تأكد من سلامة الملف.');
    }
  }
}

async function removeAttachedPdfFromBook(bookId) {
  const b = getBookById(bookId);
  if (!b) return;
  await deletePdfFromIdb(bookId);
  delete libPdfMeta[bookId];
  saveLibraryStorage(LIB_PDF_META_KEY, libPdfMeta);
  if (libPdfState.bookId === bookId) {
    libPdfState.bookId = null;
    libPdfState.doc = null;
  }
  if (libProgress[bookId] && libProgress[bookId] > b.pages.length) {
    libProgress[bookId] = 1;
    saveLibraryStorage(LIB_PROGRESS_KEY, libProgress);
  }
  if (typeof showToast === 'function') {
    showToast(`أُزيل ملف PDF المرفق بكتاب «${b.title}»`);
  }
  openBookDetail(bookId);
}

function triggerAddCustomPdfPicker() {
  const inp = document.getElementById('libAddCustomPdfInput');
  if (inp) {
    inp.value = '';
    inp.click();
  }
}

async function onCustomPdfFilePicked(inputEl) {
  const file = inputEl && inputEl.files && inputEl.files[0];
  if (!file) return;

  try {
    const buffer = await file.arrayBuffer();
    libPendingCustomPdf = { file, buffer };

    const drawer = document.getElementById('libCustomPdfDrawer');
    const metaEl = document.getElementById('libCustomPdfFileMeta');
    const titleInp = document.getElementById('libCustomPdfTitleInput');
    const authorInp = document.getElementById('libCustomPdfAuthorInput');
    const catSel = document.getElementById('libCustomPdfCatSelect');

    const cleanTitle = file.name.replace(/\.pdf$/i, '').replace(/[_-]+/g, ' ').trim();
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    if (metaEl) {
      metaEl.textContent = `الملف المختار: ${file.name} (${sizeMb} م.ب) • يُحفظ في جهازك فقط`;
    }
    if (titleInp) titleInp.value = cleanTitle || 'كتاب PDF جديد';
    if (authorInp) authorInp.value = '';
    if (catSel) {
      catSel.innerHTML = LIBRARY_CATEGORIES
        .filter((c) => c.id !== 'all')
        .map((c) => `<option value="${c.id}">${escapeLibHtml(c.label)}</option>`)
        .join('');
    }
    if (drawer) {
      drawer.style.display = 'block';
      drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  } catch (err) {
    console.error('Custom PDF read error:', err);
    if (typeof showToast === 'function') {
      showToast('تعذّر قراءة الملف من الجهاز.');
    }
  }
}

function cancelCustomPdfDrawer() {
  libPendingCustomPdf = null;
  const drawer = document.getElementById('libCustomPdfDrawer');
  if (drawer) drawer.style.display = 'none';
}

async function confirmAddCustomPdfBook() {
  if (!libPendingCustomPdf) return;
  const titleInp = document.getElementById('libCustomPdfTitleInput');
  const authorInp = document.getElementById('libCustomPdfAuthorInput');
  const catSel = document.getElementById('libCustomPdfCatSelect');

  const title = (titleInp && titleInp.value.trim()) || libPendingCustomPdf.file.name.replace(/\.pdf$/i, '') || 'كتاب PDF';
  const author = (authorInp && authorInp.value.trim()) || 'مكتبتي الخاصة';
  const categoryId = (catSel && catSel.value) || 'ilm';
  const catObj = LIBRARY_CATEGORIES.find((c) => c.id === categoryId) || LIBRARY_CATEGORIES[3];

  if (typeof showToast === 'function') {
    showToast('جاري فحص الكتاب وحفظه على رفّك الخاص...');
  }

  try {
    const { file, buffer } = libPendingCustomPdf;
    const inspected = await inspectPdfBuffer(buffer);
    const bookId = `custom_pdf_${Date.now()}`;
    await savePdfBufferToIdb(bookId, file.name, buffer);

    const gradIdx = libCustomBooks.length % LIB_CUSTOM_COVER_GRADIENTS.length;
    const customBook = {
      id: bookId,
      isCustomPdf: true,
      categoryId: catObj.id,
      categoryLabel: catObj.label,
      title: title,
      author: author,
      kind: 'modern',
      iconName: catObj.iconName || 'book',
      coverAccent: '#fef3c7',
      coverGradient: LIB_CUSTOM_COVER_GRADIENTS[gradIdx],
      description: `كتاب PDF مضاف من جهازك (${inspected.numPages} صفحة) لقراءته بالمارك بايج الأزرق والملاحظات والتظليل دون مغادرة التطبيق.`,
      pages: [{ title: title, paragraphs: ['ملف PDF محفوظ محلياً في جهازك.'] }]
    };

    libCustomBooks.push(customBook);
    saveLibraryStorage(LIB_CUSTOM_BOOKS_KEY, libCustomBooks);

    libPdfMeta[bookId] = {
      pageCount: inspected.numPages,
      fileName: file.name,
      byteLength: buffer.byteLength,
      chapters: inspected.chapters,
      coverDataUrl: inspected.coverDataUrl || null,
      updatedAt: Date.now()
    };
    saveLibraryStorage(LIB_PDF_META_KEY, libPdfMeta);

    libPendingCustomPdf = null;
    const drawer = document.getElementById('libCustomPdfDrawer');
    if (drawer) drawer.style.display = 'none';

    renderLibraryBooksGrid();
    if (typeof showToast === 'function') {
      showToast(`أُضيف «${title}» (${inspected.numPages} صفحة) إلى رفّك الخاص`);
    }
    await openBookReader(bookId, true, 'pdf');
  } catch (err) {
    console.error('Custom PDF save error:', err);
    if (typeof showToast === 'function') {
      showToast('الملف ليس ملف PDF مدعوماً أو تالف.');
    }
  }
}

async function deleteCustomPdfBook(bookId) {
  const b = getBookById(bookId);
  if (!b || !b.isCustomPdf) return;
  await deletePdfFromIdb(bookId);
  delete libPdfMeta[bookId];
  delete libProgress[bookId];
  delete libBookmarks[bookId];
  delete libNotes[bookId];
  delete libHighlights[bookId];
  delete libPdfHighlights[bookId];

  libCustomBooks = libCustomBooks.filter((item) => item.id !== bookId);
  saveLibraryStorage(LIB_CUSTOM_BOOKS_KEY, libCustomBooks);
  saveLibraryStorage(LIB_PDF_META_KEY, libPdfMeta);
  saveLibraryStorage(LIB_PROGRESS_KEY, libProgress);
  saveLibraryStorage(LIB_BOOKMARKS_KEY, libBookmarks);
  saveLibraryStorage(LIB_NOTES_KEY, libNotes);
  saveLibraryStorage(LIB_HIGHLIGHTS_KEY, libHighlights);
  saveLibraryStorage(LIB_PDF_HIGHLIGHTS_KEY, libPdfHighlights);

  if (libPdfState.bookId === bookId) {
    libPdfState.bookId = null;
    libPdfState.doc = null;
  }
  if (typeof showToast === 'function') {
    showToast(`حُذف كتاب «${b.title}» من رفّك الخاص`);
  }
  backToLibraryShelf();
}

function backToLibraryShelf() {
  if (libFullscreenActive && typeof exitBookFullscreen === 'function') {
    exitBookFullscreen();
  }
  libActiveDrawer = null;
  libPdfState.searchAbortId += 1;
  setLibrarySubView('shelf');
  renderLibraryBooksGrid();
}

function closeBookReader() {
  if (libFullscreenActive && typeof exitBookFullscreen === 'function') {
    exitBookFullscreen();
  }
  libActiveDrawer = null;
  libPdfState.searchAbortId += 1;
  if (libCurrentBookId) {
    openBookDetail(libCurrentBookId);
  } else {
    backToLibraryShelf();
  }
}

function normalizeLibArabic(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[\u064b-\u065f\u0670\u06d6-\u06ed\u0640]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/[ىی]/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/\|\|\|/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function loadFullBookIfNeeded(book) {
  if (!book || !book.dataUrl || libLoadedBooks[book.id]) return true;

  let data = null;
  if ('caches' in window) {
    try {
      const cache = await caches.open(LIB_BOOKS_CACHE_NAME);
      const cached = (await cache.match(book.dataUrl)) || (await caches.match(book.dataUrl));
      if (cached && cached.ok) {
        data = await cached.json();
        libOfflineSavedMap[book.id] = true;
      }
    } catch (e) {}
  }

  if (!data) {
    const res = await fetch(book.dataUrl);
    if (!res || !res.ok) {
      throw new Error(`HTTP ${res ? res.status : 'error'} loading ${book.dataUrl}`);
    }
    if ('caches' in window) {
      try {
        const cache = await caches.open(LIB_BOOKS_CACHE_NAME);
        await cache.put(book.dataUrl, res.clone());
        libOfflineSavedMap[book.id] = true;
      } catch (e) {}
    }
    data = await res.json();
  }

  if (!data || !Array.isArray(data.pages) || !data.pages.length) {
    throw new Error('Invalid book JSON payload');
  }

  book.pages = data.pages;
  book.chapters = Array.isArray(data.chapters) ? data.chapters : [];
  book.isPoetry = Boolean(data.isPoetry);
  book.fullPagesCount = data.pages.length;
  book._searchPages = data.pages.map((p, idx) => ({
    page: idx + 1,
    title: p.title || '',
    norm: normalizeLibArabic(`${p.title || ''} ${(p.paragraphs || []).join(' ')}`)
  }));
  libLoadedBooks[book.id] = true;
  return true;
}

/* ── محرك PDF.js: الفحص، الفهرس، العرض، واستخلاص النصوص ── */
async function extractPdfOutlineChapters(pdfDoc) {
  const chapters = [];
  try {
    const outline = await pdfDoc.getOutline();
    if (Array.isArray(outline) && outline.length) {
      const walk = async (items, depth) => {
        for (const item of items) {
          if (chapters.length >= 120) break;
          let pageNum = null;
          try {
            let dest = item.dest;
            if (typeof dest === 'string') {
              dest = await pdfDoc.getDestination(dest);
            }
            if (Array.isArray(dest) && dest[0]) {
              const pageIdx = await pdfDoc.getPageIndex(dest[0]);
              if (Number.isInteger(pageIdx) && pageIdx >= 0) {
                pageNum = pageIdx + 1;
              }
            }
          } catch (e) {}

          if (pageNum && item.title) {
            const prefix = depth > 0 ? '— '.repeat(Math.min(depth, 2)) : '';
            chapters.push({
              title: `${prefix}${String(item.title).trim()}`,
              page: pageNum
            });
          }
          if (Array.isArray(item.items) && item.items.length && depth < 1) {
            await walk(item.items, depth + 1);
          }
        }
      };
      await walk(outline, 0);
    }
  } catch (e) {}

  if (!chapters.length && pdfDoc && pdfDoc.numPages > 0) {
    const step = pdfDoc.numPages > 80 ? 20 : 10;
    for (let p = 1; p <= pdfDoc.numPages; p += step) {
      const end = Math.min(pdfDoc.numPages, p + step - 1);
      chapters.push({
        title: `الصفحات ${p} – ${end}`,
        page: p
      });
    }
  }
  return chapters;
}

async function inspectPdfBuffer(buffer) {
  const pdfjs = await ensurePdfJsReady();
  const dataCopy = new Uint8Array(buffer.slice(0));
  const loadingTask = pdfjs.getDocument({ data: dataCopy });
  const pdfDoc = await loadingTask.promise;
  const chapters = await extractPdfOutlineChapters(pdfDoc);
  const numPages = pdfDoc.numPages || 1;
  let coverDataUrl = null;
  try {
    const firstPage = await pdfDoc.getPage(1);
    const baseVp = firstPage.getViewport({ scale: 1 });
    const thumbScale = 260 / Math.max(1, baseVp.width);
    const vp = firstPage.getViewport({ scale: thumbScale });
    const offCanvas = document.createElement('canvas');
    offCanvas.width = Math.max(1, Math.round(vp.width));
    offCanvas.height = Math.max(1, Math.round(vp.height));
    const ctx = offCanvas.getContext('2d', { alpha: false });
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, offCanvas.width, offCanvas.height);
      await firstPage.render({ canvasContext: ctx, viewport: vp }).promise;
      let encoded = offCanvas.toDataURL('image/jpeg', 0.8);
      if (encoded.length > 130000) {
        encoded = offCanvas.toDataURL('image/jpeg', 0.62);
      }
      coverDataUrl = encoded;
    }
  } catch (e) {}
  try {
    await pdfDoc.destroy();
  } catch (e) {}
  return { numPages, chapters, coverDataUrl };
}

async function loadPdfBufferForBook(book) {
  const idbRec = await getPdfRecordFromIdb(book.id);
  if (idbRec && idbRec.buffer) {
    return idbRec.buffer;
  }
  if (book.pdfUrl) {
    if ('caches' in window) {
      try {
        const cache = await caches.open(LIB_BOOKS_CACHE_NAME);
        const cached = (await cache.match(book.pdfUrl)) || (await caches.match(book.pdfUrl));
        if (cached && cached.ok) {
          libOfflineSavedMap[book.id] = true;
          return await cached.arrayBuffer();
        }
      } catch (e) {}
    }
    const res = await fetch(book.pdfUrl);
    if (!res || !res.ok) {
      throw new Error(`HTTP ${res ? res.status : 'error'} loading PDF`);
    }
    if ('caches' in window) {
      try {
        const cache = await caches.open(LIB_BOOKS_CACHE_NAME);
        await cache.put(book.pdfUrl, res.clone());
        libOfflineSavedMap[book.id] = true;
      } catch (e) {}
    }
    return await res.arrayBuffer();
  }
  throw new Error('No PDF buffer found for book');
}

async function openPdfForBook(book, forceReload = false) {
  if (!forceReload && libPdfState.bookId === book.id && libPdfState.doc) {
    return libPdfState;
  }
  if (libPdfState.doc) {
    try {
      await libPdfState.doc.destroy();
    } catch (e) {}
  }
  const pdfjs = await ensurePdfJsReady();
  const rawBuffer = await loadPdfBufferForBook(book);
  const dataCopy = new Uint8Array(rawBuffer.slice(0));
  const pdfDoc = await pdfjs.getDocument({ data: dataCopy }).promise;
  const cachedMeta = libPdfMeta[book.id];
  const chapters = (cachedMeta && Array.isArray(cachedMeta.chapters) && cachedMeta.chapters.length)
    ? cachedMeta.chapters
    : await extractPdfOutlineChapters(pdfDoc);

  libPdfState = {
    bookId: book.id,
    doc: pdfDoc,
    numPages: pdfDoc.numPages || 1,
    chapters: chapters,
    renderTask: null,
    rendering: false,
    pageTexts: {},
    cleanTexts: {},
    searchAbortId: libPdfState.searchAbortId + 1
  };
  return libPdfState;
}

function populateLibraryChapterSelect(book) {
  const sel = document.getElementById('libChapterSelect');
  const navRow = document.getElementById('libReaderNavRow');
  const jumpInput = document.getElementById('libPageJumpInput');
  const searchBtn = document.getElementById('libBtnSearch');
  const usingPdf = isBookUsingPdfReader(book);
  const totalPages = usingPdf ? libPdfState.numPages : (book && book.pages ? book.pages.length : 1);
  const chaptersList = usingPdf ? libPdfState.chapters : (book && Array.isArray(book.chapters) ? book.chapters : []);
  const hasRichNav = Boolean(book && (usingPdf || totalPages > 5));

  if (navRow) {
    navRow.style.display = hasRichNav ? 'flex' : 'none';
  }
  if (searchBtn) {
    searchBtn.style.display = hasRichNav ? 'inline-flex' : 'none';
  }
  if (jumpInput) {
    jumpInput.max = String(totalPages);
  }
  if (sel) {
    if (chaptersList.length) {
      sel.style.display = '';
      sel.innerHTML = chaptersList
        .map((c) => `<option value="${c.page}">${escapeLibHtml(c.title)} (ص ${c.page})</option>`)
        .join('');
    } else {
      sel.style.display = 'none';
      sel.innerHTML = '';
    }
  }
}

function assessAndBuildPdfText(textContent) {
  const items = (textContent && Array.isArray(textContent.items)) ? textContent.items : [];
  if (!items.length) return { clean: false, paragraphs: [] };

  const lines = [];
  let currentLine = [];
  let lastY = null;
  for (const it of items) {
    const s = String(it.str || '');
    if (!s.trim()) continue;
    const y = (it.transform && it.transform.length >= 6) ? it.transform[5] : null;
    if (lastY !== null && y !== null && Math.abs(y - lastY) > 6 && currentLine.length) {
      lines.push(currentLine.join(' ').replace(/\s+/g, ' ').trim());
      currentLine = [s.trim()];
    } else {
      currentLine.push(s.trim());
    }
    if (y !== null) lastY = y;
  }
  if (currentLine.length) {
    lines.push(currentLine.join(' ').replace(/\s+/g, ' ').trim());
  }

  const joined = lines.join('\n');
  const nonSpace = joined.replace(/\s+/g, '');
  if (nonSpace.length < 25) return { clean: false, paragraphs: [] };

  const arabicCount = (nonSpace.match(/[\u0600-\u06FF]/g) || []).length;
  const latinCount = (nonSpace.match(/[A-Za-z]/g) || []).length;
  const hasLegacyGlyphArtifacts = /vvv|Gy[A-Za-z0-9]|QKX|d=Z/.test(joined);
  const ratio = (arabicCount + latinCount) / nonSpace.length;

  const looksCleanArabic = arabicCount >= 20 && ratio >= 0.52 && !hasLegacyGlyphArtifacts;
  const looksCleanLatin = latinCount >= 40 && arabicCount < 5 && ratio >= 0.65 && !hasLegacyGlyphArtifacts;

  if (!looksCleanArabic && !looksCleanLatin) {
    return { clean: false, paragraphs: [] };
  }

  return {
    clean: true,
    paragraphs: lines.filter((l) => l.length > 0),
    joined: joined
  };
}

function toggleBookSearchDrawer(forceState) {
  const drawer = document.getElementById('libSearchDrawer');
  const btn = document.getElementById('libBtnSearch');
  if (!drawer) return;
  libSearchOpen = typeof forceState === 'boolean' ? forceState : !libSearchOpen;
  drawer.style.display = libSearchOpen ? 'block' : 'none';
  if (btn) btn.classList.toggle('active', libSearchOpen);
  if (libSearchOpen) {
    const inp = document.getElementById('libSearchInput');
    if (inp) setTimeout(() => inp.focus(), 60);
  }
}

async function runPdfBookSearch(query, book) {
  const countEl = document.getElementById('libSearchCount');
  const resultsEl = document.getElementById('libSearchResults');
  if (!countEl || !resultsEl || !libPdfState.doc) return;

  const qNorm = normalizeLibArabic(query);
  if (qNorm.length < 2) {
    countEl.textContent = `اكتب حرفين فأكثر للبحث في صفحات «${book.title}» (${libPdfState.numPages} صفحة)`;
    resultsEl.innerHTML = '';
    return;
  }

  const runId = ++libPdfState.searchAbortId;
  countEl.textContent = `جاري البحث في صفحات ملف PDF (${libPdfState.numPages} صفحة)...`;
  resultsEl.innerHTML = '';

  const pdfDoc = libPdfState.doc;
  const total = libPdfState.numPages;
  const matches = [];
  let cleanPagesFound = 0;

  for (let p = 1; p <= total; p++) {
    if (libPdfState.searchAbortId !== runId || libCurrentBookId !== book.id) return;
    let cached = libPdfState.pageTexts[p];
    if (!cached) {
      try {
        const page = await pdfDoc.getPage(p);
        const tc = await page.getTextContent();
        const assessed = assessAndBuildPdfText(tc);
        const rawNorm = normalizeLibArabic((tc.items || []).map((it) => it.str || '').join(' '));
        cached = {
          clean: assessed.clean,
          raw: assessed.clean ? assessed.joined : '',
          norm: assessed.clean ? normalizeLibArabic(assessed.joined) : rawNorm
        };
        libPdfState.pageTexts[p] = cached;
        if (assessed.clean) {
          libPdfState.cleanTexts[p] = assessed.paragraphs;
        }
      } catch (e) {
        cached = { clean: false, raw: '', norm: '' };
        libPdfState.pageTexts[p] = cached;
      }
    }
    if (cached.clean) cleanPagesFound += 1;
    if (cached.norm && cached.norm.includes(qNorm)) {
      let snippet = cached.raw || '';
      if (snippet.length > 130) snippet = `${snippet.slice(0, 128)}...`;
      matches.push({ page: p, snippet });
      if (matches.length >= 40) break;
    }
    if (p % 15 === 0) {
      await new Promise((r) => setTimeout(r, 0));
    }
  }

  if (libPdfState.searchAbortId !== runId) return;

  if (!matches.length) {
    if (cleanPagesFound === 0) {
      countEl.textContent = 'يبدو أن هذا الـ PDF مصور أو ذو ترميز خط غير نصي؛ استخدم قائمة الفصول أو رقم الصفحة للانتقال السريع.';
    } else {
      countEl.textContent = 'لم يتم العثور على نتائج مطابقة في صفحات الكتاب.';
    }
    resultsEl.innerHTML = '';
    return;
  }

  countEl.textContent = matches.length >= 40
    ? 'تُعرض أول 40 نتيجة مطابقة:'
    : `تم العثور على ${matches.length} نتيجة:`;

  resultsEl.innerHTML = matches.map((m) => `
    <button type="button" class="mushaf-search-hit-btn tap-glow" onclick="jumpToBookSearchHit(${m.page})">
      <div class="mushaf-search-hit-meta">صفحة ${m.page} من ${total}</div>
      ${m.snippet ? `<div class="lib-search-snippet">${escapeLibHtml(m.snippet)}</div>` : ''}
    </button>
  `).join('');
}

function runBookSearch(query) {
  const countEl = document.getElementById('libSearchCount');
  const resultsEl = document.getElementById('libSearchResults');
  const book = getBookById(libCurrentBookId);
  if (!countEl || !resultsEl || !book) return;

  if (isBookUsingPdfReader(book)) {
    runPdfBookSearch(query, book);
    return;
  }

  const qNorm = normalizeLibArabic(query);
  if (qNorm.length < 2) {
    countEl.textContent = 'اكتب حرفين فأكثر للبحث في جميع صفحات الكتاب';
    resultsEl.innerHTML = '';
    return;
  }

  const indexList = book._searchPages || book.pages.map((p, idx) => ({
    page: idx + 1,
    title: p.title || '',
    norm: normalizeLibArabic(`${p.title || ''} ${(p.paragraphs || []).join(' ')}`)
  }));

  const matches = [];
  for (let i = 0; i < indexList.length; i++) {
    if (indexList[i].norm.includes(qNorm)) {
      matches.push(indexList[i]);
    }
  }

  if (!matches.length) {
    countEl.textContent = 'لم يتم العثور على نتائج مطابقة.';
    resultsEl.innerHTML = '';
    return;
  }

  const shown = matches.slice(0, 40);
  countEl.textContent = matches.length > 40
    ? `تم العثور على ${matches.length} صفحة (تُعرض أول 40 نتيجة):`
    : `تم العثور على ${matches.length} نتيجة:`;

  resultsEl.innerHTML = shown.map((m) => {
    const pageObj = book.pages[m.page - 1];
    let snippet = (pageObj && pageObj.paragraphs && pageObj.paragraphs[0]) || '';
    if (pageObj && Array.isArray(pageObj.paragraphs)) {
      const hitPara = pageObj.paragraphs.find((p) => normalizeLibArabic(p).includes(qNorm));
      if (hitPara) snippet = hitPara;
    }
    snippet = snippet.replace(/\|\|\|/g, ' • ');
    if (snippet.length > 130) snippet = `${snippet.slice(0, 128)}...`;
    return `
      <button type="button" class="mushaf-search-hit-btn tap-glow" onclick="jumpToBookSearchHit(${m.page})">
        <div class="mushaf-search-hit-meta">ص ${m.page} — ${escapeLibHtml(m.title)}</div>
        <div class="lib-search-snippet">${escapeLibHtml(snippet)}</div>
      </button>
    `;
  }).join('');
}

function jumpToBookSearchHit(pageNum) {
  toggleBookSearchDrawer(false);
  renderBookPage(pageNum);
  const frame = document.getElementById('libReaderPageFrame');
  if (frame) frame.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function openBookReader(bookId, forceReload = false, modeOverride = null) {
  const b = getBookById(bookId);
  if (!b) return;
  libCurrentBookId = bookId;
  libActiveDrawer = null;
  libSearchOpen = false;
  libPdfViewMode = 'canvas';

  ['libSavedBmsPop', 'libInlineNoteBox', 'libSearchDrawer'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  const searchInp = document.getElementById('libSearchInput');
  if (searchInp) searchInp.value = '';
  const searchRes = document.getElementById('libSearchResults');
  if (searchRes) searchRes.innerHTML = '';

  setLibrarySubView('reader');
  bindLibraryReaderSwipe();
  bindPdfHighlightPointerEvents();
  if (typeof bindPdfPinchZoom === 'function') bindPdfPinchZoom();
  if (typeof bindFullscreenListeners === 'function') bindFullscreenListeners();

  const titleEl = document.getElementById('libReaderTitle');
  const contentEl = document.getElementById('libReaderPageContent');
  const pdfStage = document.getElementById('libPdfStage');
  const attachBanner = document.getElementById('libPdfAttachBanner');
  if (titleEl) titleEl.textContent = b.title;

  const pdfAvailable = hasAttachedPdf(b);
  const wantPdf = (modeOverride === 'pdf') || (modeOverride !== 'guide' && pdfAvailable);

  if (wantPdf && pdfAvailable) {
    libReaderMode = 'pdf';
    if (attachBanner) attachBanner.style.display = 'none';
    if (contentEl) contentEl.style.display = 'none';
    if (pdfStage) pdfStage.style.display = 'block';
    const pdfLoading = document.getElementById('libPdfLoading');
    if (pdfLoading) {
      pdfLoading.style.display = 'block';
      pdfLoading.textContent = `جاري فتح ملف «${b.title}»...`;
    }

    try {
      await openPdfForBook(b, forceReload);
      if (pdfLoading) pdfLoading.style.display = 'none';
      populateLibraryChapterSelect(b);
      const savedPage = libProgress[bookId] || 1;
      libCurrentPage = Math.min(libPdfState.numPages, Math.max(1, savedPage));
      await renderBookPage(libCurrentPage);
      if (typeof syncFullscreenUi === 'function') syncFullscreenUi();
      return;
    } catch (err) {
      console.error('Open PDF error:', err);
      libReaderMode = 'text';
      if (pdfStage) pdfStage.style.display = 'none';
      if (contentEl) contentEl.style.display = 'block';
      if (typeof showToast === 'function') {
        showToast('تعذّر فتح ملف PDF، يمكنك إعادة إرفاقه من الجهاز.');
      }
    }
  } else {
    libReaderMode = 'text';
    if (pdfStage) pdfStage.style.display = 'none';
    if (contentEl) contentEl.style.display = 'block';
    const pdfViewBar = document.getElementById('libPdfViewBar');
    if (pdfViewBar) pdfViewBar.style.display = 'none';
    if (attachBanner) {
      attachBanner.style.display = (b.kind === 'modern' && !b.isCustomPdf) ? 'flex' : 'none';
    }
  }

  if (b.dataUrl && (!libLoadedBooks[b.id] || forceReload)) {
    const navRow = document.getElementById('libReaderNavRow');
    const searchBtn = document.getElementById('libBtnSearch');
    if (navRow) navRow.style.display = 'none';
    if (searchBtn) searchBtn.style.display = 'none';
    if (contentEl) {
      contentEl.innerHTML = `
        <div class="mushaf-loading-state">
          <div style="margin-bottom: 8px; color: var(--lapis-deep);">${libIcon('book', 'lib-ico lib-ico-lg')}</div>
          <div>جاري تحميل النص الكامل لكتاب «${escapeLibHtml(b.title)}»...</div>
        </div>
      `;
    }
    try {
      await loadFullBookIfNeeded(b);
    } catch (err) {
      console.error('Full book load error:', err);
      if (contentEl) {
        contentEl.innerHTML = `
          <div class="mushaf-loading-state">
            <div style="margin-bottom: 8px; color: #b45309;">${libIcon('alert', 'lib-ico lib-ico-lg')}</div>
            <div style="margin-bottom: 10px;">تعذّر تحميل نص الكتاب الكامل الآن؛ تحقّق من الاتصال ثم أعد المحاولة.</div>
            <button type="button" class="focus-btn focus-btn-primary tap-glow" onclick="openBookReader('${b.id}', true)">
              <span class="lib-inline-heading">${libIcon('refresh')}<span>إعادة التحميل</span></span>
            </button>
          </div>
        `;
      }
      return;
    }
  }

  populateLibraryChapterSelect(b);
  const savedPage = libProgress[bookId] || 1;
  libCurrentPage = Math.min(b.pages.length, Math.max(1, savedPage));
  renderBookPage(libCurrentPage);
}

function splitBookParagraphIntoSegments(paraText) {
  const parts = String(paraText || '')
    .split(/(?<=[.!؟])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length ? parts : [String(paraText || '')];
}

function getBookChapterTitleForPage(book, pageNum) {
  if (!book) return '';
  const list = isBookUsingPdfReader(book)
    ? libPdfState.chapters
    : (Array.isArray(book.chapters) ? book.chapters : []);
  if (list.length) {
    let found = list[0].title;
    for (let i = 0; i < list.length; i++) {
      if (list[i].page <= pageNum) {
        found = list[i].title;
      } else {
        break;
      }
    }
    return found || book.title;
  }
  const pgObj = book.pages && book.pages[pageNum - 1];
  return (pgObj && pgObj.title) ? pgObj.title : book.title;
}

function applyBookReaderVisualPrefs() {
  const frame = document.getElementById('libReaderPageFrame');
  const content = document.getElementById('libReaderPageContent');
  const nightBtn = document.getElementById('libBtnNight');
  const fsNightBtn = document.getElementById('libFsNightBtn');
  const hlHint = document.getElementById('libHighlightHint');
  const book = getBookById(libCurrentBookId);
  const pdfActive = isBookUsingPdfReader(book) && libPdfViewMode === 'canvas';

  if (frame) {
    frame.classList.toggle('is-night', Boolean(libPrefs.nightMode));
    frame.classList.toggle('is-highlight-mode', Boolean(libHighlightMode));
  }
  if (content) {
    content.style.fontSize = `${libPrefs.fontSize.toFixed(2)}rem`;
  }
  const nightIconHtml = libIcon(libPrefs.nightMode ? 'sun' : 'moon');
  if (nightBtn) {
    nightBtn.innerHTML = nightIconHtml;
    nightBtn.classList.toggle('active', Boolean(libPrefs.nightMode));
  }
  if (fsNightBtn) {
    fsNightBtn.innerHTML = nightIconHtml;
    fsNightBtn.classList.toggle('active', Boolean(libPrefs.nightMode));
  }
  if (hlHint) {
    hlHint.textContent = pdfActive
      ? 'اسحب أفقياً فوق السطر لتظليله • مرّر عمودياً للتصفح • انقر أي تظليل لحذفه'
      : 'اضغط على أي جملة لتظليلها، وإذا كانت مظلّلة اضغط عليها لحذف تظليلها';
  }
  if (typeof updateZoomButtonsUi === 'function') updateZoomButtonsUi();
  if (typeof syncFullscreenUi === 'function') syncFullscreenUi();
}

function renderBookInlineBookmarkUi(book) {
  const targetBook = book || getBookById(libCurrentBookId);
  if (!targetBook) return;
  const bmBtn = document.getElementById('libPageBmBtn');
  const toggleBtn = document.getElementById('libSavedBmsToggle');
  const popEl = document.getElementById('libSavedBmsPop');
  const bookBms = libBookmarks[targetBook.id] || {};
  const existing = Boolean(bookBms[String(libCurrentPage)]);

  if (bmBtn) {
    bmBtn.classList.toggle('is-bookmarked', existing);
  }

  const entries = Object.values(bookBms).sort((a, b) => a.page - b.page);
  if (toggleBtn) {
    if (entries.length > 0) {
      toggleBtn.style.display = 'inline-flex';
      toggleBtn.innerHTML = `${libIcon('bookmark')}<span>${entries.length}</span>`;
    } else {
      toggleBtn.style.display = 'none';
      if (popEl) popEl.style.display = 'none';
    }
  }

  if (popEl) {
    popEl.innerHTML = entries.map((bm) => `
      <span class="page-bm-chip ${bm.page === libCurrentPage ? 'active' : ''}">
        <button type="button" class="page-bm-chip-go tap-glow" onclick="goToBookPage(${bm.page}); toggleBookSavedBmsPop(false);">ص ${bm.page}</button>
        <button type="button" class="page-bm-chip-del" onclick="removeBookBookmark(${bm.page})" title="حذف">×</button>
      </span>
    `).join('');
  }
  if (typeof syncFullscreenUi === 'function') syncFullscreenUi();
}

function toggleBookSavedBmsPop(forceState) {
  const book = getBookById(libCurrentBookId);
  const popEl = document.getElementById('libSavedBmsPop');
  const noteBox = document.getElementById('libInlineNoteBox');
  if (!popEl || !book) return;
  const bookBms = libBookmarks[book.id] || {};
  const isOpen = popEl.style.display === 'flex' || popEl.style.display === 'block';
  const show = typeof forceState === 'boolean' ? forceState : !isOpen;
  if (show && noteBox) noteBox.style.display = 'none';
  popEl.style.display = show && Object.keys(bookBms).length > 0 ? 'flex' : 'none';
  updateBookToolBadges();
}

function renderBookInlineNoteUi() {
  const book = getBookById(libCurrentBookId);
  if (!book) return;
  const noteBtn = document.getElementById('libPageNoteBtn');
  const dotEl = document.getElementById('libPageNoteDot');
  const fsNoteBtn = document.getElementById('libFsNoteBtn');
  const fsDotEl = document.getElementById('libFsNoteDot');
  const inputEl = document.getElementById('libPageNoteInput');
  const chipsEl = document.getElementById('libAllNotesList');
  const noteBox = document.getElementById('libInlineNoteBox');
  const bookNotes = libNotes[book.id] || {};
  const existing = bookNotes[String(libCurrentPage)];
  const isOpen = noteBox && noteBox.style.display === 'block';

  if (dotEl) {
    dotEl.style.display = existing ? 'block' : 'none';
  }
  if (fsDotEl) {
    fsDotEl.style.display = existing ? 'block' : 'none';
  }
  if (noteBtn) {
    noteBtn.classList.toggle('active', Boolean(isOpen || existing));
  }
  if (fsNoteBtn) {
    fsNoteBtn.classList.toggle('active', Boolean(isOpen || existing));
  }
  if (inputEl) {
    inputEl.value = existing ? existing.text : '';
  }

  if (chipsEl) {
    const entries = Object.values(bookNotes).sort((a, b) => a.page - b.page);
    if (!entries.length) {
      chipsEl.style.display = 'none';
      chipsEl.innerHTML = '';
    } else {
      chipsEl.style.display = 'flex';
      chipsEl.innerHTML = entries.map((n) => `
        <button type="button" class="page-mini-chip tap-glow ${n.page === libCurrentPage ? 'active' : ''}" onclick="goToBookPage(${n.page})">${libIcon('note')}<span>ص ${n.page}</span></button>
      `).join('');
    }
  }
}

function toggleBookPageNote(forceState) {
  const noteBox = document.getElementById('libInlineNoteBox');
  const popEl = document.getElementById('libSavedBmsPop');
  const frameEl = document.getElementById('libReaderPageFrame');
  if (!noteBox) return;
  const isOpen = noteBox.style.display === 'block';
  const show = typeof forceState === 'boolean' ? forceState : !isOpen;
  if (show && popEl) popEl.style.display = 'none';
  noteBox.style.display = show ? 'block' : 'none';
  renderBookInlineNoteUi();
  if (show) {
    if (libFullscreenActive && frameEl) {
      frameEl.scrollTop = 0;
    }
    const inp = document.getElementById('libPageNoteInput');
    if (inp) setTimeout(() => inp.focus(), 50);
  }
  updateBookToolBadges();
}

function updateClearPageHlBtn() {
  const clearBtn = document.getElementById('libClearPageHlBtn');
  if (!clearBtn) return;
  const book = getBookById(libCurrentBookId);
  if (!book) {
    clearBtn.style.display = 'none';
    return;
  }
  const pgKey = String(libCurrentPage);
  const pdfList = (libPdfHighlights[book.id] && libPdfHighlights[book.id][pgKey]) || [];
  const segPrefix = `p${libCurrentPage}_`;
  const textMap = libHighlights[book.id] || {};
  const hasTextHls = Object.keys(textMap).some((k) => k.startsWith(segPrefix));
  const hasAny = (Array.isArray(pdfList) && pdfList.length > 0) || hasTextHls;
  clearBtn.style.display = hasAny ? 'inline-flex' : 'none';
}

function updateBookToolBadges() {
  const book = getBookById(libCurrentBookId);
  if (!book) return;
  const hlBtn = document.getElementById('libBtnHighlight');
  const pageHlBtn = document.getElementById('libPageHlBtn');
  const fsHlBtn = document.getElementById('libFsHlBtn');
  const bmsToggle = document.getElementById('libSavedBmsToggle');
  const popEl = document.getElementById('libSavedBmsPop');
  const noteBtn = document.getElementById('libPageNoteBtn');
  const fsNoteBtn = document.getElementById('libFsNoteBtn');
  const noteBox = document.getElementById('libInlineNoteBox');
  const bookNotes = libNotes[book.id] || {};

  if (hlBtn) hlBtn.classList.toggle('active', libHighlightMode);
  if (pageHlBtn) pageHlBtn.classList.toggle('active', libHighlightMode);
  if (fsHlBtn) fsHlBtn.classList.toggle('active', libHighlightMode);
  if (bmsToggle && popEl) {
    bmsToggle.classList.toggle('active', popEl.style.display === 'flex');
  }
  const noteActive = Boolean((noteBox && noteBox.style.display === 'block') || bookNotes[String(libCurrentPage)]);
  if (noteBtn) noteBtn.classList.toggle('active', noteActive);
  if (fsNoteBtn) fsNoteBtn.classList.toggle('active', noteActive);
  updateClearPageHlBtn();
  if (typeof syncFullscreenUi === 'function') syncFullscreenUi();
}

/* ── التظليل التفاعلي (هايلايت) فوق صفحات الـ PDF ── */
function renderPdfHighlightsForPage(bookId, pageNum) {
  const layer = document.getElementById('libPdfHighlightLayer');
  if (!layer) return;
  const bookMap = libPdfHighlights[bookId] || {};
  const list = Array.isArray(bookMap[String(pageNum)]) ? bookMap[String(pageNum)] : [];

  layer.innerHTML = list.map((hl) => `
    <div class="lib-pdf-hl-rect ${hl.id === libSelectedHlId ? 'is-selected' : ''}"
      data-hlid="${escapeLibHtml(hl.id)}"
      style="left: ${hl.x}%; top: ${hl.y}%; width: ${hl.w}%; height: ${hl.h}%; background-color: ${escapeLibHtml(hl.color)};"
      title="تظليل محفوظ — انقر للحذف أو تغيير اللون"></div>
  `).join('');
  updateClearPageHlBtn();
}

function hideHighlightActionPop() {
  libSelectedHlId = null;
  const pop = document.getElementById('libHlActionPop');
  if (pop) pop.style.display = 'none';
  document.querySelectorAll('#libPdfHighlightLayer .lib-pdf-hl-rect.is-selected').forEach((el) => {
    el.classList.remove('is-selected');
  });
}

function selectPdfHighlight(hlId) {
  const book = getBookById(libCurrentBookId);
  const pop = document.getElementById('libHlActionPop');
  if (!book || !pop) return;
  const list = (libPdfHighlights[book.id] && libPdfHighlights[book.id][String(libCurrentPage)]) || [];
  const hl = list.find((item) => item.id === hlId);
  if (!hl) {
    hideHighlightActionPop();
    return;
  }
  libSelectedHlId = hlId;
  document.querySelectorAll('#libPdfHighlightLayer .lib-pdf-hl-rect').forEach((el) => {
    el.classList.toggle('is-selected', el.getAttribute('data-hlid') === hlId);
  });

  const palette = ['#fef08a', '#bbf7d0', '#bae6fd', '#fbcfe8'];
  const swatchesHtml = palette.map((c) => `
    <button type="button"
      class="lib-hl-pop-color ${hl.color === c ? 'is-active' : ''}"
      style="background: ${c};"
      onclick="recolorSelectedPdfHighlight('${c}')"
      title="تغيير اللون"
      aria-label="تغيير لون التظليل"></button>
  `).join('');

  pop.innerHTML = `
    ${swatchesHtml}
    <span class="lib-hl-pop-sep"></span>
    <button type="button" class="lib-hl-pop-share tap-glow" onclick="openShareFawaidFromCurrentPage('highlight')" title="شارك في مجلس القراء" aria-label="شارك في مجلس القراء">
      ${libIcon('share')}<span>شارك</span>
    </button>
    <button type="button" class="lib-hl-pop-del tap-glow" onclick="deleteSelectedPdfHighlight()" title="حذف التظليل" aria-label="حذف التظليل">
      ${libIcon('trash')}<span>حذف</span>
    </button>
    <button type="button" class="lib-hl-pop-close" onclick="hideHighlightActionPop()" title="إغلاق" aria-label="إغلاق">✕</button>
  `;

  const cx = Math.min(76, Math.max(24, Number(hl.x || 0) + Number(hl.w || 0) / 2));
  const nearTop = Number(hl.y || 0) < 15;
  const topPct = nearTop ? Number(hl.y || 0) + Number(hl.h || 0) : Number(hl.y || 0);
  pop.classList.toggle('is-below', nearTop);
  pop.style.left = `${cx.toFixed(2)}%`;
  pop.style.top = `${Math.min(95, Math.max(4, topPct)).toFixed(2)}%`;
  pop.style.display = 'flex';
}

function deleteSelectedPdfHighlight() {
  if (!libCurrentBookId || !libSelectedHlId) return;
  const pgKey = String(libCurrentPage);
  const bookMap = libPdfHighlights[libCurrentBookId];
  if (bookMap && Array.isArray(bookMap[pgKey])) {
    bookMap[pgKey] = bookMap[pgKey].filter((item) => item.id !== libSelectedHlId);
    if (!bookMap[pgKey].length) {
      delete bookMap[pgKey];
    }
    saveLibraryStorage(LIB_PDF_HIGHLIGHTS_KEY, libPdfHighlights);
  }
  hideHighlightActionPop();
  renderPdfHighlightsForPage(libCurrentBookId, libCurrentPage);
  if (typeof showToast === 'function') showToast('تم حذف التظليل');
}

function recolorSelectedPdfHighlight(colorHex) {
  if (!libCurrentBookId || !libSelectedHlId) return;
  const pgKey = String(libCurrentPage);
  const list = (libPdfHighlights[libCurrentBookId] && libPdfHighlights[libCurrentBookId][pgKey]) || [];
  const hl = list.find((item) => item.id === libSelectedHlId);
  if (!hl) return;
  hl.color = colorHex;
  saveLibraryStorage(LIB_PDF_HIGHLIGHTS_KEY, libPdfHighlights);
  selectBookHighlightColor(colorHex);
  renderPdfHighlightsForPage(libCurrentBookId, libCurrentPage);
  selectPdfHighlight(libSelectedHlId);
}

function clearCurrentPageHighlights() {
  const book = getBookById(libCurrentBookId);
  if (!book) return;
  const pgKey = String(libCurrentPage);
  let removed = false;

  if (libPdfHighlights[book.id] && Array.isArray(libPdfHighlights[book.id][pgKey]) && libPdfHighlights[book.id][pgKey].length) {
    delete libPdfHighlights[book.id][pgKey];
    saveLibraryStorage(LIB_PDF_HIGHLIGHTS_KEY, libPdfHighlights);
    removed = true;
  }

  const segPrefix = `p${libCurrentPage}_`;
  if (libHighlights[book.id]) {
    Object.keys(libHighlights[book.id]).forEach((k) => {
      if (k.startsWith(segPrefix)) {
        delete libHighlights[book.id][k];
        removed = true;
      }
    });
    saveLibraryStorage(LIB_HIGHLIGHTS_KEY, libHighlights);
  }

  hideHighlightActionPop();
  if (isBookUsingPdfReader(book) && libPdfViewMode === 'canvas') {
    renderPdfHighlightsForPage(book.id, libCurrentPage);
  } else {
    renderBookPage(libCurrentPage);
  }
  updateClearPageHlBtn();
  if (removed && typeof showToast === 'function') {
    showToast(`تم مسح تظليلات صفحة ${libCurrentPage}`);
  }
}

function bindPdfHighlightPointerEvents() {
  const layer = document.getElementById('libPdfHighlightLayer');
  if (!layer || libPdfHlBound) return;
  libPdfHlBound = true;

  const pop = document.getElementById('libHlActionPop');
  if (pop && !pop.dataset.bound) {
    pop.dataset.bound = '1';
    ['pointerdown', 'touchstart', 'click'].forEach((evtName) => {
      pop.addEventListener(evtName, (ev) => ev.stopPropagation());
    });
  }

  let mode = 'idle'; // 'idle' | 'pending' | 'drawing' | 'cancelled'
  let activePointerId = null;
  const activePointers = new Set();
  let startClientX = 0;
  let startClientY = 0;
  let startWinY = 0;
  let startFrameY = 0;
  let startPct = null;
  let rectCache = null;

  const getFrameScrollTop = () => {
    const f = document.getElementById('libReaderPageFrame');
    return f ? f.scrollTop : 0;
  };

  const toPct = (clientX, clientY) => {
    const r = rectCache || layer.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((clientX - r.left) / Math.max(1, r.width)) * 100));
    const y = Math.min(100, Math.max(0, ((clientY - r.top) / Math.max(1, r.height)) * 100));
    return { x, y };
  };

  const cancelStroke = () => {
    mode = 'cancelled';
    activePointerId = null;
    const selBox = document.getElementById('libPdfSelectionBox');
    if (selBox) selBox.style.display = 'none';
  };

  layer.addEventListener('pointerdown', (e) => {
    activePointers.add(e.pointerId);
    if (!libHighlightMode || !libCurrentBookId) return;
    if (e.target && e.target.closest('.lib-pdf-hl-rect, #libHlActionPop')) return;
    if (activePointers.size > 1 || (e.button !== undefined && e.button !== 0 && e.pointerType === 'mouse')) {
      cancelStroke();
      return;
    }

    rectCache = layer.getBoundingClientRect();
    startClientX = e.clientX;
    startClientY = e.clientY;
    startWinY = window.scrollY;
    startFrameY = getFrameScrollTop();
    startPct = toPct(e.clientX, e.clientY);
    activePointerId = e.pointerId;
    mode = 'pending';

    const selBox = document.getElementById('libPdfSelectionBox');
    if (selBox) {
      selBox.style.display = 'none';
      selBox.style.backgroundColor = libSelectedHighlightColor;
    }
  });

  layer.addEventListener('pointermove', (e) => {
    if (e.pointerId !== activePointerId) return;
    if (mode !== 'pending' && mode !== 'drawing') return;
    if (!libHighlightMode || !libCurrentBookId || activePointers.size > 1) {
      cancelStroke();
      return;
    }
    const scrollMoved = Math.abs(window.scrollY - startWinY) > 4 || Math.abs(getFrameScrollTop() - startFrameY) > 4;
    if (scrollMoved) {
      cancelStroke();
      return;
    }

    const dxPx = Math.abs(e.clientX - startClientX);
    const dyPx = Math.abs(e.clientY - startClientY);

    if (mode === 'pending') {
      if (dyPx > 10 && dyPx >= dxPx * 0.85) {
        cancelStroke();
        return;
      }
      if (dxPx >= 14 && dxPx > dyPx * 1.45) {
        mode = 'drawing';
        try {
          if (layer.setPointerCapture) layer.setPointerCapture(e.pointerId);
        } catch (err) {}
      } else {
        return;
      }
    }

    const pt = toPct(e.clientX, e.clientY);
    const selBox = document.getElementById('libPdfSelectionBox');
    if (!selBox) return;
    const left = Math.min(startPct.x, pt.x);
    const width = Math.max(3, Math.abs(pt.x - startPct.x));
    const dyPct = Math.abs(pt.y - startPct.y);
    const height = dyPct < 3.5 ? 3.1 : Math.min(18, Math.max(3.1, dyPct + 2.2));
    const top = dyPct < 3.5
      ? Math.min(100 - height, Math.max(0, ((startPct.y + pt.y) / 2) - height / 2))
      : Math.min(startPct.y, pt.y);

    selBox.style.display = 'block';
    selBox.style.left = `${left.toFixed(2)}%`;
    selBox.style.top = `${top.toFixed(2)}%`;
    selBox.style.width = `${width.toFixed(2)}%`;
    selBox.style.height = `${height.toFixed(2)}%`;
  });

  layer.addEventListener('touchmove', (te) => {
    if (mode === 'drawing' && te.touches && te.touches.length === 1) {
      te.preventDefault();
    }
  }, { passive: false });

  const endHighlightStroke = (e) => {
    activePointers.delete(e.pointerId);
    const wasDrawing = mode === 'drawing' && e.pointerId === activePointerId;
    const selBox = document.getElementById('libPdfSelectionBox');
    if (selBox) selBox.style.display = 'none';
    if (e.pointerId !== activePointerId) {
      if (activePointers.size === 0) mode = 'idle';
      return;
    }
    mode = 'idle';
    activePointerId = null;

    if (!wasDrawing || !libHighlightMode || !libCurrentBookId || !startPct) return;
    const scrollMoved = Math.abs(window.scrollY - startWinY) > 4 || Math.abs(getFrameScrollTop() - startFrameY) > 4;
    if (scrollMoved) return;

    const dxPx = Math.abs(e.clientX - startClientX);
    const dyPx = Math.abs(e.clientY - startClientY);
    const pt = toPct(e.clientX, e.clientY);
    const dxPct = Math.abs(pt.x - startPct.x);
    const dyPct = Math.abs(pt.y - startPct.y);
    if (dxPx < 18 || dxPct < 3.5 || dxPx <= dyPx * 1.1) return;

    if (!libPdfHighlights[libCurrentBookId]) libPdfHighlights[libCurrentBookId] = {};
    const pgKey = String(libCurrentPage);
    if (!Array.isArray(libPdfHighlights[libCurrentBookId][pgKey])) {
      libPdfHighlights[libCurrentBookId][pgKey] = [];
    }

    const hVal = dyPct < 3.5 ? 3.1 : Math.min(18, Math.max(3.1, dyPct + 2.2));
    const topVal = dyPct < 3.5
      ? Math.min(100 - hVal, Math.max(0, ((startPct.y + pt.y) / 2) - hVal / 2))
      : Math.min(startPct.y, pt.y);
    const rectObj = {
      id: `hl_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      x: Number(Math.min(startPct.x, pt.x).toFixed(2)),
      y: Number(topVal.toFixed(2)),
      w: Number(Math.max(4, dxPct).toFixed(2)),
      h: Number(hVal.toFixed(2)),
      color: libSelectedHighlightColor
    };

    libPdfHighlights[libCurrentBookId][pgKey].push(rectObj);
    saveLibraryStorage(LIB_PDF_HIGHLIGHTS_KEY, libPdfHighlights);
    hideHighlightActionPop();
    renderPdfHighlightsForPage(libCurrentBookId, libCurrentPage);
  };

  layer.addEventListener('pointerup', endHighlightStroke);
  layer.addEventListener('pointercancel', (e) => {
    activePointers.delete(e.pointerId);
    if (e.pointerId === activePointerId) cancelStroke();
    if (activePointers.size === 0) mode = 'idle';
  });

  layer.addEventListener('click', (ev) => {
    const rectEl = ev.target && ev.target.closest('.lib-pdf-hl-rect');
    if (!rectEl) return;
    ev.stopPropagation();
    const hid = rectEl.getAttribute('data-hlid');
    if (hid) selectPdfHighlight(hid);
  });

  document.addEventListener('click', (ev) => {
    if (!libSelectedHlId) return;
    if (ev.target && ev.target.closest('.lib-pdf-hl-rect, #libHlActionPop')) return;
    hideHighlightActionPop();
  });
}

function bindPdfPinchZoom() {
  const scrollWrap = document.getElementById('libPdfScrollWrap');
  const canvasWrap = document.getElementById('libPdfCanvasWrap');
  if (!scrollWrap || !canvasWrap || libPinchBound) return;
  libPinchBound = true;

  let isPinching = false;
  let pinchStartDist = 0;
  let pinchStartZoom = 1.0;
  let pinchTargetZoom = 1.0;

  scrollWrap.addEventListener('touchstart', (e) => {
    const book = getBookById(libCurrentBookId);
    if (!book || !isBookUsingPdfReader(book) || libPdfViewMode !== 'canvas') return;
    if (e.touches && e.touches.length === 2) {
      isPinching = true;
      pinchStartDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      ) || 1;
      pinchStartZoom = libPrefs.pdfZoom || 1.0;
      pinchTargetZoom = pinchStartZoom;
      hideHighlightActionPop();
      canvasWrap.classList.add('is-zoom-preview');
    }
  }, { passive: true });

  scrollWrap.addEventListener('touchmove', (e) => {
    if (!isPinching || !e.touches || e.touches.length !== 2) return;
    e.preventDefault();
    const dist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    const ratio = dist / Math.max(10, pinchStartDist);
    pinchTargetZoom = Math.min(2.5, Math.max(0.85, Number((pinchStartZoom * ratio).toFixed(2))));
    const previewScale = pinchTargetZoom / Math.max(0.5, pinchStartZoom);
    canvasWrap.style.transform = `scale(${previewScale.toFixed(3)})`;
    const pctText = `${Math.round(pinchTargetZoom * 100)}%`;
    ['libZoomResetBtn', 'libFsZoomResetBtn'].forEach((id) => {
      const btn = document.getElementById(id);
      if (btn) btn.textContent = pctText;
    });
  }, { passive: false });

  const endPinch = (e) => {
    if (!isPinching) return;
    if (e.touches && e.touches.length >= 2) return;
    isPinching = false;
    canvasWrap.classList.remove('is-zoom-preview');
    canvasWrap.style.transform = '';
    if (Math.abs(pinchTargetZoom - pinchStartZoom) >= 0.03) {
      setBookZoom(pinchTargetZoom, true);
    } else if (typeof updateZoomButtonsUi === 'function') {
      updateZoomButtonsUi();
    }
  };

  scrollWrap.addEventListener('touchend', endPinch);
  scrollWrap.addEventListener('touchcancel', endPinch);
}

function setPdfViewMode(mode) {
  const nextMode = mode === 'text' ? 'text' : 'canvas';
  libPdfViewMode = nextMode;
  hideHighlightActionPop();
  renderBookPage(libCurrentPage);
}

async function renderPdfBookPage(pageNum, opts = {}) {
  const book = getBookById(libCurrentBookId);
  const pdfDoc = libPdfState.doc;
  const stage = document.getElementById('libPdfStage');
  const contentEl = document.getElementById('libReaderPageContent');
  const scrollWrap = document.getElementById('libPdfScrollWrap');
  const frameEl = document.getElementById('libReaderPageFrame');
  const canvasWrap = document.getElementById('libPdfCanvasWrap');
  const canvas = document.getElementById('libPdfCanvas');
  const loadingEl = document.getElementById('libPdfLoading');
  const viewBar = document.getElementById('libPdfViewBar');
  const canvasBtn = document.getElementById('libPdfModeCanvasBtn');
  const textBtn = document.getElementById('libPdfModeTextBtn');

  if (!book || !pdfDoc || !canvas || !stage) return;

  stage.dataset.renderState = 'rendering';
  if (loadingEl && !(opts && opts.isZoomRerender)) {
    loadingEl.textContent = 'جاري عرض الصفحة...';
  }

  if (libPdfState.renderTask && typeof libPdfState.renderTask.cancel === 'function') {
    try {
      libPdfState.renderTask.cancel();
    } catch (e) {}
    libPdfState.renderTask = null;
  }

  let prevRatioX = 0;
  let anchorRatioY = 0;
  const preserveScroll = Boolean(opts && opts.isZoomRerender && canvasWrap && canvasWrap.offsetHeight > 0);
  if (preserveScroll) {
    if (scrollWrap && scrollWrap.scrollWidth > scrollWrap.clientWidth) {
      prevRatioX = scrollWrap.scrollLeft / Math.max(1, scrollWrap.scrollWidth - scrollWrap.clientWidth);
    }
    const prevRect = canvasWrap.getBoundingClientRect();
    anchorRatioY = Math.max(0, Math.min(1, ((window.innerHeight * 0.4) - prevRect.top) / Math.max(1, prevRect.height)));
  }

  try {
    const page = await pdfDoc.getPage(pageNum);
    if (libCurrentBookId !== book.id || libCurrentPage !== pageNum) return;

    let cachedText = libPdfState.pageTexts[pageNum];
    if (!cachedText) {
      try {
        const tc = await page.getTextContent();
        const assessed = assessAndBuildPdfText(tc);
        const rawNorm = normalizeLibArabic((tc.items || []).map((it) => it.str || '').join(' '));
        cachedText = {
          clean: assessed.clean,
          raw: assessed.clean ? assessed.joined : '',
          norm: assessed.clean ? normalizeLibArabic(assessed.joined) : rawNorm
        };
        libPdfState.pageTexts[pageNum] = cachedText;
        if (assessed.clean) {
          libPdfState.cleanTexts[pageNum] = assessed.paragraphs;
        }
      } catch (e) {
        cachedText = { clean: false, raw: '', norm: '' };
        libPdfState.pageTexts[pageNum] = cachedText;
      }
    }

    const canShowText = !book.pdfCanvasOnly && Boolean(cachedText && cachedText.clean && Array.isArray(libPdfState.cleanTexts[pageNum]));
    if (!canShowText && libPdfViewMode === 'text') {
      libPdfViewMode = 'canvas';
    }

    if (viewBar) {
      viewBar.style.display = canShowText ? 'inline-flex' : 'none';
    }
    if (canvasBtn) canvasBtn.classList.toggle('active', libPdfViewMode === 'canvas');
    if (textBtn) textBtn.classList.toggle('active', libPdfViewMode === 'text');

    if (libPdfViewMode === 'text' && canShowText && contentEl) {
      stage.style.display = 'none';
      contentEl.style.display = 'block';
      const paragraphs = libPdfState.cleanTexts[pageNum];
      const bookHls = libHighlights[book.id] || {};
      const chTitle = getBookChapterTitleForPage(book, pageNum);
      const paragraphsHtml = paragraphs.map((para, pIdx) => {
        const segments = splitBookParagraphIntoSegments(para);
        const spans = segments.map((segText, sIdx) => {
          const segKey = `p${pageNum}_${pIdx}_${sIdx}`;
          const hlColor = bookHls[segKey];
          const styleAttr = hlColor ? ` style="background-color: ${escapeLibHtml(hlColor)};"` : '';
          return `<span class="lib-sentence" data-seg="${segKey}"${styleAttr} onclick="onBookSegmentClick('${segKey}')">${escapeLibHtml(segText)}</span>`;
        }).join(' ');
        return `<p class="lib-paragraph">${spans}</p>`;
      }).join('');
      contentEl.innerHTML = `
        <h3 class="lib-chapter-heading">${escapeLibHtml(chTitle)} • ص ${pageNum}</h3>
        ${paragraphsHtml}
      `;
      applyBookReaderVisualPrefs();
      updateClearPageHlBtn();
      if (loadingEl) loadingEl.style.display = 'none';
      stage.dataset.renderState = 'done';
      return;
    }

    if (contentEl) contentEl.style.display = 'none';
    stage.style.display = 'block';
    if (loadingEl && !(opts && opts.isZoomRerender)) {
      loadingEl.textContent = 'جاري عرض الصفحة...';
      loadingEl.style.display = 'block';
    }

    const unscaledViewport = page.getViewport({ scale: 1 });
    const stageWidth = Math.max(240, (stage.clientWidth || (window.innerWidth - 48) || 340) - 2);
    const cssWidth = stageWidth * (libPrefs.pdfZoom || 1.0);
    const scale = cssWidth / unscaledViewport.width;
    const viewport = page.getViewport({ scale });
    const rawDpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const maxPixels = 12000000;
    const cssArea = Math.max(1, viewport.width * viewport.height);
    const safeDpr = Math.min(rawDpr, Math.sqrt(maxPixels / cssArea));
    const targetW = Math.max(1, Math.floor(viewport.width * safeDpr));
    const targetH = Math.max(1, Math.floor(viewport.height * safeDpr));
    const cssW = Math.floor(viewport.width);
    const cssH = Math.floor(viewport.height);

    if (opts && opts.isZoomRerender && canvasWrap && canvas.width > 0) {
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvasWrap.classList.remove('is-zoom-preview');
      canvasWrap.style.transform = '';
      canvasWrap.style.width = `${cssW}px`;
      canvasWrap.style.height = `${cssH}px`;
      if (preserveScroll) {
        if (scrollWrap && scrollWrap.scrollWidth > scrollWrap.clientWidth) {
          scrollWrap.scrollLeft = Math.round(prevRatioX * Math.max(0, scrollWrap.scrollWidth - scrollWrap.clientWidth));
        }
        const newRect = canvasWrap.getBoundingClientRect();
        const desiredFocus = anchorRatioY * Math.max(1, newRect.height);
        const currentFocus = (window.innerHeight * 0.4) - newRect.top;
        const deltaY = desiredFocus - currentFocus;
        if (Math.abs(deltaY) > 2) {
          if (libFullscreenActive && frameEl) {
            frameEl.scrollTop += deltaY;
          } else {
            window.scrollBy(0, deltaY);
          }
        }
      }
    }

    const backCanvas = document.createElement('canvas');
    backCanvas.width = targetW;
    backCanvas.height = targetH;
    const backCtx = backCanvas.getContext('2d', { alpha: false });
    if (backCtx) {
      backCtx.fillStyle = '#ffffff';
      backCtx.fillRect(0, 0, targetW, targetH);
      backCtx.setTransform(safeDpr, 0, 0, safeDpr, 0, 0);
    }

    const task = page.render({ canvasContext: backCtx, viewport });
    libPdfState.renderTask = task;
    await task.promise;
    if (libCurrentBookId !== book.id || libCurrentPage !== pageNum) return;
    if (libPdfState.renderTask === task) {
      libPdfState.renderTask = null;
    }

    canvas.width = targetW;
    canvas.height = targetH;
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    const frontCtx = canvas.getContext('2d');
    if (frontCtx) {
      frontCtx.setTransform(1, 0, 0, 1, 0, 0);
      frontCtx.drawImage(backCanvas, 0, 0);
    }

    if (canvasWrap) {
      canvasWrap.classList.remove('is-zoom-preview');
      canvasWrap.style.transform = '';
      canvasWrap.style.width = `${cssW}px`;
      canvasWrap.style.height = `${cssH}px`;
    }
    if (loadingEl) loadingEl.style.display = 'none';
    stage.dataset.renderState = 'done';

    if (preserveScroll && canvas.width === 0) {
      if (scrollWrap && scrollWrap.scrollWidth > scrollWrap.clientWidth) {
        scrollWrap.scrollLeft = Math.round(prevRatioX * Math.max(0, scrollWrap.scrollWidth - scrollWrap.clientWidth));
      }
    }

    renderPdfHighlightsForPage(book.id, pageNum);
    applyBookReaderVisualPrefs();
  } catch (err) {
    if (err && err.name === 'RenderingCancelledException') return;
    console.error('PDF page render error:', err);
    if (loadingEl) loadingEl.style.display = 'none';
    stage.dataset.renderState = 'error';
  }
}

function renderBookPage(pageNum) {
  const book = getBookById(libCurrentBookId);
  if (!book) return;
  const usingPdf = isBookUsingPdfReader(book);
  const total = usingPdf ? libPdfState.numPages : book.pages.length;
  const target = Math.min(total, Math.max(1, parseInt(pageNum, 10) || 1));
  libCurrentPage = target;
  if (typeof hideHighlightActionPop === 'function') hideHighlightActionPop();

  libProgress[book.id] = target;
  saveLibraryStorage(LIB_PROGRESS_KEY, libProgress);
  if (typeof recordLibraryReadingActivity === 'function') {
    recordLibraryReadingActivity(book, target, total);
  }

  const pct = Math.round((target / total) * 100);
  const titleEl = document.getElementById('libReaderTitle');
  const metaEl = document.getElementById('libReaderMeta');
  const progressFill = document.getElementById('libProgressFill');
  const footerLabel = document.getElementById('libReaderFooterLabel');
  const prevBtn = document.getElementById('libPrevPageBtn');
  const nextBtn = document.getElementById('libNextPageBtn');
  const contentEl = document.getElementById('libReaderPageContent');
  const pdfStage = document.getElementById('libPdfStage');

  if (contentEl) {
    contentEl.style.transition = '';
    contentEl.style.transform = '';
    contentEl.style.opacity = '';
  }
  if (pdfStage) {
    pdfStage.style.transition = '';
    pdfStage.style.transform = '';
    pdfStage.style.opacity = '';
  }

  if (titleEl) titleEl.textContent = book.title;
  if (metaEl) metaEl.textContent = `ص ${target} / ${total} • ${pct}%`;
  if (progressFill) progressFill.style.width = `${pct}%`;
  if (footerLabel) footerLabel.textContent = `صفحة ${target} من ${total}`;
  if (prevBtn) prevBtn.disabled = target <= 1;
  if (nextBtn) nextBtn.disabled = target >= total;

  const jumpInput = document.getElementById('libPageJumpInput');
  if (jumpInput) jumpInput.value = String(target);
  const chSel = document.getElementById('libChapterSelect');
  const activeChList = usingPdf ? libPdfState.chapters : (Array.isArray(book.chapters) ? book.chapters : []);
  if (chSel && activeChList.length) {
    let activePage = activeChList[0].page;
    for (let i = 0; i < activeChList.length; i++) {
      if (activeChList[i].page <= target) {
        activePage = activeChList[i].page;
      } else {
        break;
      }
    }
    chSel.value = String(activePage);
  }
  const searchBtn = document.getElementById('libBtnSearch');
  if (searchBtn) searchBtn.classList.toggle('active', libSearchOpen);

  if (usingPdf) {
    renderBookInlineBookmarkUi(book);
    renderBookInlineNoteUi();
    updateBookToolBadges();
    if (typeof syncFullscreenUi === 'function') syncFullscreenUi();
    renderPdfBookPage(target);
    return;
  }

  if (pdfStage) pdfStage.style.display = 'none';
  if (contentEl) contentEl.style.display = 'block';
  const pdfViewBar = document.getElementById('libPdfViewBar');
  if (pdfViewBar) pdfViewBar.style.display = 'none';

  const pageObj = book.pages[target - 1];
  const bookHls = libHighlights[book.id] || {};

  if (contentEl && pageObj) {
    const paragraphsHtml = pageObj.paragraphs.map((para, pIdx) => {
      if (book.isPoetry || para.includes(' ||| ')) {
        const parts = para.split(' ||| ');
        const sadr = (parts[0] || '').trim();
        const ajuz = (parts[1] || '').trim();
        const segKey = `p${target}_${pIdx}_0`;
        const hlColor = bookHls[segKey];
        const styleAttr = hlColor ? ` style="background-color: ${escapeLibHtml(hlColor)};"` : '';
        return `<div class="lib-verse-line lib-sentence" data-seg="${segKey}"${styleAttr} onclick="onBookSegmentClick('${segKey}')"><span class="lib-hemistich-1">${escapeLibHtml(sadr)}</span>${ajuz ? `<span class="lib-hemistich-2">${escapeLibHtml(ajuz)}</span>` : ''}</div>`;
      }

      const segments = splitBookParagraphIntoSegments(para);
      const spans = segments.map((segText, sIdx) => {
        const segKey = `p${target}_${pIdx}_${sIdx}`;
        const hlColor = bookHls[segKey];
        const styleAttr = hlColor ? ` style="background-color: ${escapeLibHtml(hlColor)};"` : '';
        return `<span class="lib-sentence" data-seg="${segKey}"${styleAttr} onclick="onBookSegmentClick('${segKey}')">${escapeLibHtml(segText)}</span>`;
      }).join(' ');
      return `<p class="lib-paragraph">${spans}</p>`;
    }).join('');

    contentEl.innerHTML = `
      <h3 class="lib-chapter-heading">${escapeLibHtml(pageObj.title)}</h3>
      ${paragraphsHtml}
    `;
  }

  applyBookReaderVisualPrefs();
  renderBookInlineBookmarkUi(book);
  renderBookInlineNoteUi();
  updateBookToolBadges();
  if (typeof syncFullscreenUi === 'function') syncFullscreenUi();
}

function goToBookPage(pageNum) {
  const book = getBookById(libCurrentBookId);
  const total = isBookUsingPdfReader(book) ? libPdfState.numPages : (book ? book.pages.length : 0);
  const num = parseInt(pageNum, 10);
  if (!book || Number.isNaN(num) || num < 1 || num > total) {
    if (typeof showToast === 'function' && book) {
      showToast(`أدخل رقم صفحة بين 1 و ${total}`);
    }
    return;
  }
  renderBookPage(num);
}

function getActiveReaderAnimTarget() {
  const book = getBookById(libCurrentBookId);
  if (isBookUsingPdfReader(book) && libPdfViewMode === 'canvas') {
    return document.getElementById('libPdfStage');
  }
  return document.getElementById('libReaderPageContent');
}

function bindLibraryReaderSwipe() {
  if (typeof attachSmoothPageSwipe !== 'function') return;
  attachSmoothPageSwipe({
    frameEl: document.getElementById('libReaderPageFrame'),
    contentEl: document.getElementById('libReaderPageContent'),
    getTargetEl: () => getActiveReaderAnimTarget(),
    canTrack: (e) => {
      const book = getBookById(libCurrentBookId);
      const pdfCanvasActive = isBookUsingPdfReader(book) && libPdfViewMode === 'canvas';
      if (pdfCanvasActive && libHighlightMode) return false;
      if (pdfCanvasActive && (libPrefs.pdfZoom || 1.0) > 1.06) return false;
      if (e && e.target && e.target.closest('.lib-pdf-hl-layer') && libHighlightMode) return false;
      return true;
    },
    canNext: () => {
      const book = getBookById(libCurrentBookId);
      if (!book) return false;
      const total = isBookUsingPdfReader(book) ? libPdfState.numPages : book.pages.length;
      return libCurrentPage < total;
    },
    canPrev: () => libCurrentPage > 1,
    onNext: () => nextBookPage(),
    onPrev: () => prevBookPage()
  });
}

function prevBookPage() {
  if (libCurrentPage > 1) {
    const targetEl = getActiveReaderAnimTarget();
    if (typeof animatePageSwap === 'function') {
      animatePageSwap(targetEl, 'prev', () => {
        renderBookPage(libCurrentPage - 1);
      });
    } else {
      renderBookPage(libCurrentPage - 1);
    }
  }
}

function nextBookPage() {
  const book = getBookById(libCurrentBookId);
  const total = isBookUsingPdfReader(book) ? libPdfState.numPages : (book ? book.pages.length : 0);
  if (book && libCurrentPage < total) {
    const targetEl = getActiveReaderAnimTarget();
    if (typeof animatePageSwap === 'function') {
      animatePageSwap(targetEl, 'next', () => {
        renderBookPage(libCurrentPage + 1);
      });
    } else {
      renderBookPage(libCurrentPage + 1);
    }
  }
}

function toggleBookPageBookmark() {
  const book = getBookById(libCurrentBookId);
  if (!book) return;
  if (!libBookmarks[book.id]) libBookmarks[book.id] = {};
  const key = String(libCurrentPage);

  if (libBookmarks[book.id][key]) {
    delete libBookmarks[book.id][key];
    saveLibraryStorage(LIB_BOOKMARKS_KEY, libBookmarks);
    renderBookInlineBookmarkUi(book);
    updateBookToolBadges();
    if (typeof showToast === 'function') {
      showToast(`أُزيلت علامة صفحة ${libCurrentPage}`);
    }
    return;
  }

  libBookmarks[book.id][key] = {
    page: libCurrentPage,
    color: LIB_BOOKMARK_BLUE,
    chapterTitle: getBookChapterTitleForPage(book, libCurrentPage),
    savedAt: Date.now()
  };
  saveLibraryStorage(LIB_BOOKMARKS_KEY, libBookmarks);
  renderBookInlineBookmarkUi(book);
  updateBookToolBadges();
  if (typeof showToast === 'function') {
    showToast(`حُفظت علامة صفحة ${libCurrentPage}`);
  }
}

function removeBookBookmark(pageNum) {
  const book = getBookById(libCurrentBookId);
  if (!book || !libBookmarks[book.id]) return;
  delete libBookmarks[book.id][String(pageNum)];
  saveLibraryStorage(LIB_BOOKMARKS_KEY, libBookmarks);
  renderBookInlineBookmarkUi(book);
  updateBookToolBadges();
}

function saveBookPageNote() {
  const book = getBookById(libCurrentBookId);
  const inputEl = document.getElementById('libPageNoteInput');
  if (!book || !inputEl) return;
  const text = inputEl.value.trim();
  if (!libNotes[book.id]) libNotes[book.id] = {};
  const key = String(libCurrentPage);

  if (!text) {
    if (libNotes[book.id][key]) {
      delete libNotes[book.id][key];
      saveLibraryStorage(LIB_NOTES_KEY, libNotes);
      renderBookInlineNoteUi();
      updateBookToolBadges();
      if (typeof showToast === 'function') showToast('تم مسح ملاحظة الصفحة');
    } else if (typeof showToast === 'function') {
      showToast('اكتب ملاحظة قبل الحفظ');
    }
    return;
  }

  libNotes[book.id][key] = {
    page: libCurrentPage,
    text: text,
    chapterTitle: getBookChapterTitleForPage(book, libCurrentPage),
    updatedAt: Date.now()
  };
  saveLibraryStorage(LIB_NOTES_KEY, libNotes);
  renderBookInlineNoteUi();
  updateBookToolBadges();
  if (typeof showToast === 'function') {
    showToast(`تم حفظ ملاحظة صفحة ${libCurrentPage}`);
  }
}

function deleteBookPageNote() {
  const book = getBookById(libCurrentBookId);
  const inputEl = document.getElementById('libPageNoteInput');
  if (inputEl) inputEl.value = '';
  if (!book || !libNotes[book.id]) return;
  const key = String(libCurrentPage);
  if (libNotes[book.id][key]) {
    delete libNotes[book.id][key];
    saveLibraryStorage(LIB_NOTES_KEY, libNotes);
    renderBookInlineNoteUi();
    updateBookToolBadges();
    if (typeof showToast === 'function') showToast(`مُسحت ملاحظة صفحة ${libCurrentPage}`);
  }
}

function toggleBookHighlightMode() {
  libHighlightMode = !libHighlightMode;
  const bar = document.getElementById('libHighlightBar');
  if (bar) bar.style.display = libHighlightMode ? 'block' : 'none';
  if (!libHighlightMode && typeof hideHighlightActionPop === 'function') {
    hideHighlightActionPop();
  }
  applyBookReaderVisualPrefs();
  updateBookToolBadges();
}

function selectBookHighlightColor(colorHex) {
  libSelectedHighlightColor = colorHex;
  document.querySelectorAll('#libHighlightSwatches .mushaf-swatch').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-libhl') === colorHex);
  });
  const selBox = document.getElementById('libPdfSelectionBox');
  if (selBox) selBox.style.backgroundColor = colorHex;
}

function onBookSegmentClick(segKey) {
  if (!libCurrentBookId) return;
  if (!libHighlights[libCurrentBookId]) libHighlights[libCurrentBookId] = {};
  const bookHls = libHighlights[libCurrentBookId];
  const hadColor = Boolean(bookHls[segKey]);

  if (!libHighlightMode && !hadColor) return;

  if (hadColor) {
    delete bookHls[segKey];
    if (typeof showToast === 'function') showToast('تم حذف التظليل');
  } else {
    bookHls[segKey] = libSelectedHighlightColor;
  }
  saveLibraryStorage(LIB_HIGHLIGHTS_KEY, libHighlights);

  const el = document.querySelector(`.lib-sentence[data-seg="${segKey}"]`);
  if (el) {
    el.style.backgroundColor = bookHls[segKey] || '';
  }
  updateClearPageHlBtn();
}

function updateZoomButtonsUi() {
  const book = getBookById(libCurrentBookId);
  const isPdfCanvas = isBookUsingPdfReader(book) && libPdfViewMode === 'canvas';
  let pctText = '100%';
  let atMin = false;
  let atMax = false;

  if (isPdfCanvas) {
    const zoom = Number((libPrefs.pdfZoom || 1.0).toFixed(2));
    pctText = `${Math.round(zoom * 100)}%`;
    atMin = zoom <= 0.85;
    atMax = zoom >= 2.5;
  } else {
    const fs = Number((libPrefs.fontSize || 1.04).toFixed(2));
    pctText = `${Math.round((fs / 1.04) * 100)}%`;
    atMin = fs <= 0.88;
    atMax = fs >= 1.5;
  }

  ['libZoomResetBtn', 'libFsZoomResetBtn'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = pctText;
  });
  ['libZoomOutBtn', 'libFsZoomOutBtn'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.disabled = atMin;
  });
  ['libZoomInBtn', 'libFsZoomInBtn'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.disabled = atMax;
  });
}

function setBookZoom(newZoom, immediate = false) {
  const clamped = Math.min(2.5, Math.max(0.85, Number(Number(newZoom || 1.0).toFixed(2))));
  libPrefs.pdfZoom = clamped;
  saveLibraryStorage(LIB_PREFS_KEY, libPrefs);
  updateZoomButtonsUi();
  if (typeof hideHighlightActionPop === 'function') hideHighlightActionPop();

  const runRender = () => {
    renderPdfBookPage(libCurrentPage, { isZoomRerender: true });
  };
  if (libZoomDebounceTimer) {
    clearTimeout(libZoomDebounceTimer);
    libZoomDebounceTimer = null;
  }
  if (immediate) {
    runRender();
  } else {
    libZoomDebounceTimer = setTimeout(runRender, 60);
  }
}

function resetBookZoom() {
  const book = getBookById(libCurrentBookId);
  if (isBookUsingPdfReader(book) && libPdfViewMode === 'canvas') {
    setBookZoom(1.0, true);
    if (typeof showToast === 'function') showToast('مقاس الصفحة: 100%');
    return;
  }
  libPrefs.fontSize = 1.04;
  saveLibraryStorage(LIB_PREFS_KEY, libPrefs);
  applyBookReaderVisualPrefs();
  if (typeof showToast === 'function') showToast('حجم الخط: 100%');
}

function changeBookFontSize(delta) {
  const book = getBookById(libCurrentBookId);
  if (isBookUsingPdfReader(book) && libPdfViewMode === 'canvas') {
    const zStep = delta > 0 ? 0.15 : -0.15;
    const nextZoom = Number(((libPrefs.pdfZoom || 1.0) + zStep).toFixed(2));
    setBookZoom(nextZoom, true);
    return;
  }
  const step = delta > 0 ? 0.08 : -0.08;
  libPrefs.fontSize = Math.min(1.5, Math.max(0.88, Number((libPrefs.fontSize + step).toFixed(2))));
  saveLibraryStorage(LIB_PREFS_KEY, libPrefs);
  applyBookReaderVisualPrefs();
}

function toggleBookNightMode() {
  libPrefs.nightMode = !libPrefs.nightMode;
  saveLibraryStorage(LIB_PREFS_KEY, libPrefs);
  applyBookReaderVisualPrefs();
}

function syncFullscreenUi() {
  const readerView = document.getElementById('libReaderView');
  const isNight = Boolean(libPrefs && libPrefs.nightMode);
  document.body.classList.toggle('lib-fullscreen-active', libFullscreenActive);
  document.body.classList.toggle('lib-fs-night', libFullscreenActive && isNight);

  if (readerView) {
    readerView.classList.toggle('is-fullscreen', libFullscreenActive);
    readerView.classList.toggle('is-night-fs', isNight);
    readerView.classList.toggle('fs-chrome-hidden', libFullscreenActive && libFsChromeHidden);
    readerView.classList.toggle('has-hl-bar', libFullscreenActive && Boolean(libHighlightMode));
  }

  const fsTriggerBtn = document.getElementById('libBtnFullscreen');
  if (fsTriggerBtn) {
    fsTriggerBtn.classList.toggle('active', libFullscreenActive);
  }

  const book = getBookById(libCurrentBookId);
  if (!book) return;
  const total = getBookTotalPages(book);
  const target = Math.min(total, Math.max(1, libCurrentPage || 1));
  const pct = Math.round((target / total) * 100);

  const fsTitle = document.getElementById('libFsTitle');
  const fsMeta = document.getElementById('libFsPageMeta');
  const fsLabel = document.getElementById('libFsPageLabel');
  const fsPrev = document.getElementById('libFsPrevBtn');
  const fsNext = document.getElementById('libFsNextBtn');
  const fsBm = document.getElementById('libFsBmBtn');
  const fsHl = document.getElementById('libFsHlBtn');
  const fsNote = document.getElementById('libFsNoteBtn');
  const fsNoteDot = document.getElementById('libFsNoteDot');
  const fsNight = document.getElementById('libFsNightBtn');

  if (fsTitle) fsTitle.textContent = book.title;
  if (fsMeta) fsMeta.textContent = `ص ${target} / ${total} • ${pct}%`;
  if (fsLabel) fsLabel.textContent = `${target} / ${total}`;
  if (fsPrev) fsPrev.disabled = target <= 1;
  if (fsNext) fsNext.disabled = target >= total;

  const bookBms = libBookmarks[book.id] || {};
  const bookNotes = libNotes[book.id] || {};
  const noteBox = document.getElementById('libInlineNoteBox');
  const hasPageNote = Boolean(bookNotes[String(target)]);
  const noteOpen = Boolean(noteBox && noteBox.style.display === 'block');

  if (fsBm) fsBm.classList.toggle('active', Boolean(bookBms[String(target)]));
  if (fsHl) fsHl.classList.toggle('active', Boolean(libHighlightMode));
  if (fsNote) fsNote.classList.toggle('active', hasPageNote || noteOpen);
  if (fsNoteDot) fsNoteDot.style.display = hasPageNote ? 'block' : 'none';
  if (fsNight) {
    fsNight.innerHTML = libIcon(isNight ? 'sun' : 'moon');
    fsNight.classList.toggle('active', isNight);
  }
  updateZoomButtonsUi();
}

function toggleFullscreenChrome(forceHidden) {
  if (!libFullscreenActive) return;
  libFsChromeHidden = typeof forceHidden === 'boolean' ? forceHidden : !libFsChromeHidden;
  syncFullscreenUi();
}

function rerenderPdfForFullscreenChange() {
  const book = getBookById(libCurrentBookId);
  const readerView = document.getElementById('libReaderView');
  if (!book || !readerView || readerView.style.display === 'none') return;
  if (isBookUsingPdfReader(book) && libPdfViewMode === 'canvas') {
    renderPdfBookPage(libCurrentPage, { isZoomRerender: true });
  }
}

function enterBookFullscreen() {
  const readerView = document.getElementById('libReaderView');
  if (!readerView || readerView.style.display === 'none') return;
  libFullscreenActive = true;
  libFsChromeHidden = false;
  bindFullscreenListeners();
  syncFullscreenUi();

  const fsRoot = document.documentElement;
  if (fsRoot && fsRoot.requestFullscreen && !document.fullscreenElement) {
    fsRoot.requestFullscreen().then(() => {
      libNativeFsWasEntered = true;
    }).catch(() => {});
  }

  requestAnimationFrame(() => {
    setTimeout(rerenderPdfForFullscreenChange, 70);
  });
}

function exitBookFullscreen(skipNativeExit = false) {
  const wasActive = libFullscreenActive;
  libFullscreenActive = false;
  libFsChromeHidden = false;
  libNativeFsWasEntered = false;
  syncFullscreenUi();

  if (!skipNativeExit && document.fullscreenElement && document.exitFullscreen) {
    document.exitFullscreen().catch(() => {});
  }

  if (wasActive) {
    requestAnimationFrame(() => {
      setTimeout(rerenderPdfForFullscreenChange, 70);
    });
  }
}

function toggleBookFullscreen(forceState) {
  const target = typeof forceState === 'boolean' ? forceState : !libFullscreenActive;
  if (target) {
    enterBookFullscreen();
  } else {
    exitBookFullscreen(false);
  }
}

function bindFullscreenListeners() {
  if (libFsListenersBound) return;
  libFsListenersBound = true;

  document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
      libNativeFsWasEntered = true;
    } else if (libNativeFsWasEntered && libFullscreenActive) {
      exitBookFullscreen(true);
    }
  });

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && libFullscreenActive) {
      exitBookFullscreen(false);
    }
  });

  const scheduleFsResize = () => {
    if (!libFullscreenActive) return;
    if (libFsResizeTimer) clearTimeout(libFsResizeTimer);
    libFsResizeTimer = setTimeout(() => {
      rerenderPdfForFullscreenChange();
    }, 140);
  };
  window.addEventListener('resize', scheduleFsResize);
  window.addEventListener('orientationchange', scheduleFsResize);

  const frame = document.getElementById('libReaderPageFrame');
  if (frame) {
    let fsTapX = 0;
    let fsTapY = 0;
    let fsTapTs = 0;
    frame.addEventListener('pointerdown', (ev) => {
      fsTapX = ev.clientX || 0;
      fsTapY = ev.clientY || 0;
      fsTapTs = Date.now();
    });
    frame.addEventListener('click', (ev) => {
      if (!libFullscreenActive || libHighlightMode) return;
      if (ev.target && ev.target.closest('button, a, input, textarea, select, .lib-sentence, .lib-pdf-hl-rect, #libHlActionPop, .page-inline-tools, .page-inline-note, .page-bms-pop')) {
        return;
      }
      const dx = Math.abs((ev.clientX || 0) - fsTapX);
      const dy = Math.abs((ev.clientY || 0) - fsTapY);
      if (dx > 12 || dy > 12 || (Date.now() - fsTapTs) > 450) return;
      const sel = window.getSelection ? String(window.getSelection()).trim() : '';
      if (sel) return;
      toggleFullscreenChrome();
    });
  }
}

/* ═════════════════════════════════════════════════════════════════════
   ديوان فوائد القراء (مسابقة أجمل فائدة أو اقتباس) + حصادك القرائي (PNG)
   ═════════════════════════════════════════════════════════════════════ */

function getLibMonthKey(ts) {
  const d = ts ? new Date(ts) : new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

function getLibArabicMonthLabel(monthKey) {
  const parts = String(monthKey || getLibMonthKey()).split('-');
  const y = parseInt(parts[0], 10) || new Date().getFullYear();
  const m = (parseInt(parts[1], 10) || 1) - 1;
  const names = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'ماي', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];
  return `${names[Math.max(0, Math.min(11, m))]} ${y}`;
}

function getLibReaderUid() {
  try {
    let uid = localStorage.getItem(LIB_READER_UID_KEY);
    if (!uid) {
      uid = `jr_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
      localStorage.setItem(LIB_READER_UID_KEY, uid);
    }
    return uid;
  } catch (e) {
    return 'jr_local_reader';
  }
}

function getLibDefaultReaderName() {
  try {
    if (typeof DutyState !== 'undefined' && DutyState.userProfile && DutyState.userProfile.fullName) {
      const n = String(DutyState.userProfile.fullName).trim();
      if (n) return n;
    }
    const raw = localStorage.getItem('joussour_duty_user_profile_v2');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.fullName && String(parsed.fullName).trim()) {
        return String(parsed.fullName).trim();
      }
    }
  } catch (e) {}
  return '';
}

function recordLibraryReadingActivity(book, pageNum, totalPages) {
  if (!book || !book.id) return;
  const tot = Math.max(1, parseInt(totalPages, 10) || getBookTotalPages(book));
  const pg = Math.min(tot, Math.max(1, parseInt(pageNum, 10) || 1));
  const mKey = getLibMonthKey();

  if (!libReadingLog || typeof libReadingLog !== 'object') {
    libReadingLog = { months: {}, completedBooks: {} };
  }
  if (!libReadingLog.months || typeof libReadingLog.months !== 'object') {
    libReadingLog.months = {};
  }
  if (!libReadingLog.completedBooks || typeof libReadingLog.completedBooks !== 'object') {
    libReadingLog.completedBooks = {};
  }
  if (!libReadingLog.months[mKey]) libReadingLog.months[mKey] = {};

  let entry = libReadingLog.months[mKey][book.id];
  if (!entry || typeof entry !== 'object') {
    entry = { visited: [], baseline: 0 };
    libReadingLog.months[mKey][book.id] = entry;
  }
  if (!Array.isArray(entry.visited)) entry.visited = [];
  if (!entry.visited.includes(pg)) {
    entry.visited.push(pg);
  }

  if ((tot >= 5 && pg >= tot) || (tot > 10 && pg >= tot - 1)) {
    if (!libReadingLog.completedBooks[book.id]) {
      libReadingLog.completedBooks[book.id] = {
        title: book.title,
        completedAt: Date.now()
      };
    }
  }
  saveLibraryStorage(LIB_READING_LOG_KEY, libReadingLog);
}

function formatFawaidTime(ts) {
  if (!ts) return 'حديثاً';
  const diff = Math.max(0, Date.now() - ts);
  const mins = Math.floor(diff / 60000);
  if (mins < 2) return 'الآن';
  if (mins < 60) return `منذ ${mins} د`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `منذ ${hrs} س`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `منذ ${days} ي`;
  return getLibArabicMonthLabel(getLibMonthKey(ts));
}

function getFawaidVotesCount(item) {
  if (!item) return 0;
  if (Array.isArray(item.voterIds)) return item.voterIds.length;
  return Number(item.votesCount) || 0;
}

function isFawaidVotedByMe(item) {
  if (!item) return false;
  const uid = getLibReaderUid();
  if (Array.isArray(item.voterIds)) return item.voterIds.includes(uid);
  return Boolean(libFawaidLocalVotes && libFawaidLocalVotes[item.id]);
}

function loadLocalFawaidItems() {
  try {
    const raw = localStorage.getItem(LIB_FAWAID_LOCAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function saveLocalFawaidItems(list) {
  try {
    localStorage.setItem(LIB_FAWAID_LOCAL_KEY, JSON.stringify(Array.isArray(list) ? list : []));
  } catch (e) {}
}

function updateFawaidSyncUi(state) {
  libFawaidCloudState = state || 'local';
  const badge = document.getElementById('libFawaidSyncBadge');
  if (badge) {
    badge.classList.remove('synced', 'offline');
    if (libFawaidCloudState === 'synced') {
      badge.classList.add('synced');
      badge.textContent = 'متزامن مع القرّاء';
    } else if (libFawaidCloudState === 'syncing') {
      badge.textContent = 'جاري الاتصال...';
    } else {
      badge.classList.add('offline');
      badge.textContent = 'حفظ محلي';
    }
  }
  const pill = document.getElementById('libFawaidCountPill');
  if (pill) {
    const cnt = Array.isArray(libFawaidItems) ? libFawaidItems.length : 0;
    pill.textContent = String(cnt);
    pill.style.display = cnt > 0 ? 'inline-flex' : 'none';
  }
}

function initLibraryFawaidSync() {
  libFawaidItems = loadLocalFawaidItems();
  updateFawaidSyncUi('local');

  const db = typeof getSharedFirestoreDb === 'function' ? getSharedFirestoreDb() : null;
  if (!db) {
    return;
  }

  updateFawaidSyncUi('syncing');
  if (typeof libFawaidUnsub === 'function') {
    try { libFawaidUnsub(); } catch (e) {}
    libFawaidUnsub = null;
  }

  try {
    libFawaidUnsub = db
      .collection('library_fawaid')
      .orderBy('createdAtMs', 'desc')
      .limit(80)
      .onSnapshot((snapshot) => {
        const cloudList = [];
        snapshot.forEach((doc) => {
          const d = doc.data() || {};
          const voters = Array.isArray(d.voterIds) ? d.voterIds : [];
          cloudList.push({
            id: doc.id,
            bookId: d.bookId || '',
            bookTitle: d.bookTitle || 'كتاب من المكتبة',
            page: parseInt(d.page, 10) || 0,
            chapterTitle: d.chapterTitle || '',
            text: d.text || '',
            authorName: d.authorName || 'قارئ في جسور',
            authorUid: d.authorUid || '',
            monthKey: d.monthKey || getLibMonthKey(Number(d.createdAtMs) || Date.now()),
            createdAtMs: Number(d.createdAtMs) || 0,
            voterIds: voters,
            votesCount: voters.length || Number(d.votesCount) || 0
          });
        });

        libFawaidItems = cloudList;
        saveLocalFawaidItems(cloudList);
        updateFawaidSyncUi('synced');
        const fv = document.getElementById('libFawaidView');
        if (fv && fv.style.display !== 'none') {
          renderLibraryFawaidView();
        }
      }, (err) => {
        console.warn('Firestore library_fawaid snapshot warning:', err);
        libFawaidItems = loadLocalFawaidItems();
        updateFawaidSyncUi('local');
      });
  } catch (err) {
    console.warn('Firestore library_fawaid setup warning:', err);
    updateFawaidSyncUi('local');
  }
}

function openLibraryFawaidView() {
  setLibrarySubView('fawaid');
  renderLibraryFawaidView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setFawaidFilter(filterKey) {
  libFawaidFilter = filterKey || 'top_month';
  document.querySelectorAll('.lib-fawaid-tab').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-ftab') === libFawaidFilter);
  });
  renderLibraryFawaidView();
}

function renderFawaidMonthlyPodium() {
  const container = document.getElementById('libFawaidLeaders');
  if (!container) return;
  const curMonth = getLibMonthKey();
  const monthLabel = getLibArabicMonthLabel(curMonth);
  const monthEntries = (libFawaidItems || []).filter((it) => (it.monthKey || getLibMonthKey(it.createdAtMs)) === curMonth);

  if (!monthEntries.length) {
    container.innerHTML = `
      <div class="lib-fawaid-podium-empty">
        ${libIcon('award')}
        <span>صدارة شهر <strong>${escapeLibHtml(monthLabel)}</strong> مفتوحة الآن؛ كن أوّل من يشارك فائدة نفيسة من قراءاته ليتصدر الديوان.</span>
      </div>
    `;
    return;
  }

  const byAuthor = {};
  monthEntries.forEach((it) => {
    const key = it.authorUid || `name_${it.authorName || 'anon'}`;
    if (!byAuthor[key]) {
      byAuthor[key] = {
        name: it.authorName || 'قارئ في جسور',
        votes: 0,
        entries: 0,
        firstTs: it.createdAtMs || Date.now()
      };
    }
    byAuthor[key].votes += getFawaidVotesCount(it);
    byAuthor[key].entries += 1;
    if ((it.createdAtMs || 0) < byAuthor[key].firstTs) {
      byAuthor[key].firstTs = it.createdAtMs || byAuthor[key].firstTs;
    }
  });

  const ranked = Object.values(byAuthor)
    .sort((a, b) => (b.votes - a.votes) || (b.entries - a.entries) || (a.firstTs - b.firstTs))
    .slice(0, 3);

  const rankLabels = ['المرتبة الأولى', 'المرتبة الثانية', 'المرتبة الثالثة'];
  container.innerHTML = `
    <div class="lib-fawaid-podium-head">
      <span class="lib-inline-heading">${libIcon('award')}<span>فرسان الفوائد • ${escapeLibHtml(monthLabel)}</span></span>
    </div>
    <div class="lib-fawaid-podium-grid">
      ${ranked.map((r, idx) => `
        <div class="lib-podium-card is-rank-${idx + 1}">
          <span class="lib-podium-rank">${rankLabels[idx]}</span>
          <strong class="lib-podium-name">${escapeLibHtml(r.name)}</strong>
          <span class="lib-podium-meta">${r.votes} تقدير • ${r.entries} ${r.entries === 1 ? 'فائدة' : 'فوائد'}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderLibraryFawaidView() {
  renderFawaidMonthlyPodium();
  updateFawaidSyncUi(libFawaidCloudState);
  document.querySelectorAll('.lib-fawaid-tab').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-ftab') === libFawaidFilter);
  });

  const listEl = document.getElementById('libFawaidList');
  if (!listEl) return;
  const uid = getLibReaderUid();
  const curMonth = getLibMonthKey();

  let filtered = Array.isArray(libFawaidItems) ? libFawaidItems.slice() : [];
  if (libFawaidFilter === 'top_month') {
    const monthly = filtered.filter((it) => (it.monthKey || getLibMonthKey(it.createdAtMs)) === curMonth);
    filtered = (monthly.length ? monthly : filtered).sort((a, b) => {
      const diffV = getFawaidVotesCount(b) - getFawaidVotesCount(a);
      return diffV !== 0 ? diffV : (b.createdAtMs || 0) - (a.createdAtMs || 0);
    });
  } else if (libFawaidFilter === 'mine') {
    filtered = filtered
      .filter((it) => it.authorUid === uid)
      .sort((a, b) => (b.createdAtMs || 0) - (a.createdAtMs || 0));
  } else {
    filtered.sort((a, b) => (b.createdAtMs || 0) - (a.createdAtMs || 0));
  }

  if (!filtered.length) {
    listEl.innerHTML = `
      <div class="andalus-card lib-fawaid-empty">
        <div class="lib-fawaid-empty-ico">${libIcon('quote', 'lib-ico lib-ico-lg')}</div>
        <div class="lib-fawaid-empty-title">${libFawaidFilter === 'mine' ? 'لم تشارك فائدة بعد في المجلس' : 'الديوان ينتظر باكورة الفوائد'}</div>
        <div class="lib-fawaid-empty-sub">أثناء قراءتك لأي كتاب، دوّن ملاحظة واضغط «شارك في المجلس» أو استخدم زر المشاركة أدناه لتسجيل أجمل ما استوقفك.</div>
        <button type="button" class="lib-fawaid-compose-btn tap-glow" onclick="openShareFawaidModal()">
          ${libIcon('spark')}<span>أضف أوّل فائدة الآن</span>
        </button>
      </div>
    `;
    return;
  }

  listEl.innerHTML = filtered.map((it) => {
    const votes = getFawaidVotesCount(it);
    const voted = isFawaidVotedByMe(it);
    const isOwner = Boolean(it.authorUid && it.authorUid === uid);
    const canOpenBook = Boolean(it.bookId && getBookById(it.bookId));
    const pageMeta = it.page > 0 ? ` • ص ${it.page}` : '';
    const chapterMeta = it.chapterTitle ? ` • ${it.chapterTitle}` : '';

    return `
      <article class="andalus-card lib-fawaid-card ${voted ? 'is-voted' : ''}" data-fawaid-id="${escapeLibHtml(it.id)}">
        <div class="lib-fawaid-card-top">
          <span class="lib-fawaid-book-badge">
            ${libIcon('book')}
            <span>${escapeLibHtml(it.bookTitle || 'كتاب')}${escapeLibHtml(pageMeta)}</span>
          </span>
          <span class="lib-fawaid-time">${escapeLibHtml(formatFawaidTime(it.createdAtMs))}</span>
        </div>
        ${chapterMeta ? `<div class="lib-fawaid-chapter">${escapeLibHtml(it.chapterTitle)}</div>` : ''}
        <blockquote class="lib-fawaid-quote">«${escapeLibHtml(it.text)}»</blockquote>
        <div class="lib-fawaid-card-foot">
          <div class="lib-fawaid-author-box">
            ${libIcon('author')}
            <span>بقلم: <strong>${escapeLibHtml(it.authorName || 'قارئ في جسور')}</strong></span>
          </div>
          <div class="lib-fawaid-card-actions">
            ${canOpenBook && it.page > 0 ? `<button type="button" class="lib-fawaid-goto-btn tap-glow" onclick="openFawaidBookLocation('${escapeLibHtml(it.bookId)}', ${it.page})" title="الانتقال إلى الموضع في الكتاب">${libIcon('scroll')}<span>الموضع</span></button>` : ''}
            ${isOwner ? `<button type="button" class="lib-fawaid-del-btn tap-glow" onclick="deleteOwnFawaid('${escapeLibHtml(it.id)}')" title="حذف مشاركتي" aria-label="حذف مشاركتي">${libIcon('trash')}</button>` : ''}
            <button type="button" class="lib-fawaid-vote-btn tap-glow ${voted ? 'is-active' : ''}" onclick="toggleFawaidVote('${escapeLibHtml(it.id)}')" aria-pressed="${voted ? 'true' : 'false'}">
              ${libIcon('star')}
              <span>فائدة نفيسة</span>
              <span class="lib-fawaid-vote-num">${votes}</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

async function openFawaidBookLocation(bookId, pageNum) {
  const b = getBookById(bookId);
  if (!b) return;
  libProgress[b.id] = Math.max(1, parseInt(pageNum, 10) || 1);
  saveLibraryStorage(LIB_PROGRESS_KEY, libProgress);
  await openBookReader(b.id);
}

function populateShareFawaidBooksSelect(selectedBookId) {
  const sel = document.getElementById('libShareFawaidBookSelect');
  if (!sel) return;
  const allBooks = getAllLibraryBooks();
  sel.innerHTML = allBooks.map((b) => `
    <option value="${escapeLibHtml(b.id)}">${escapeLibHtml(b.title)}</option>
  `).join('');
  if (selectedBookId && allBooks.some((b) => b.id === selectedBookId)) {
    sel.value = selectedBookId;
  } else if (libCurrentBookId && allBooks.some((b) => b.id === libCurrentBookId)) {
    sel.value = libCurrentBookId;
  }
}

function openShareFawaidModal(opts = {}) {
  if (typeof hideHighlightActionPop === 'function') hideHighlightActionPop();
  const modal = document.getElementById('libShareFawaidModal');
  if (!modal) return;
  if (modal.parentElement !== document.body) {
    document.body.appendChild(modal);
  }
  const book = getBookById(opts.bookId || libCurrentBookId);
  populateShareFawaidBooksSelect(book ? book.id : '');

  const pageInp = document.getElementById('libShareFawaidPageInput');
  const textInp = document.getElementById('libShareFawaidTextInput');
  const authorInp = document.getElementById('libShareFawaidAuthorInput');

  if (pageInp) {
    const pVal = parseInt(opts.page, 10) || (book && libCurrentPage ? libCurrentPage : 0);
    pageInp.value = pVal > 0 ? String(pVal) : '';
  }
  if (textInp) {
    textInp.value = typeof opts.text === 'string' ? opts.text : '';
  }
  if (authorInp) {
    authorInp.value = getLibDefaultReaderName();
  }

  modal.style.display = 'flex';
  if (textInp) setTimeout(() => textInp.focus(), 60);
}

function closeShareFawaidModal() {
  const modal = document.getElementById('libShareFawaidModal');
  if (modal) modal.style.display = 'none';
}

function shareCurrentNoteToFawaid() {
  const book = getBookById(libCurrentBookId);
  if (!book) return;
  const noteInput = document.getElementById('libPageNoteInput');
  let noteText = noteInput ? noteInput.value.trim() : '';
  const saved = libNotes[book.id] && libNotes[book.id][String(libCurrentPage)];

  if (noteText && (!saved || saved.text !== noteText)) {
    saveBookPageNote();
  } else if (!noteText && saved && saved.text) {
    noteText = saved.text;
  }

  openShareFawaidModal({
    bookId: book.id,
    page: libCurrentPage,
    text: noteText
  });
}

function openShareFawaidFromCurrentPage(source) {
  const book = getBookById(libCurrentBookId);
  if (!book) return;
  let prefill = '';
  const pageNote = libNotes[book.id] && libNotes[book.id][String(libCurrentPage)];

  if (source === 'highlight') {
    const highlightedSpans = Array.from(document.querySelectorAll('#libReaderPageContent .lib-sentence'))
      .filter((el) => el.style && el.style.backgroundColor)
      .map((el) => el.textContent.trim())
      .filter(Boolean);
    if (highlightedSpans.length) {
      prefill = highlightedSpans.join(' ').slice(0, 500);
    } else if (pageNote && pageNote.text) {
      prefill = pageNote.text;
    }
  } else if (pageNote && pageNote.text) {
    prefill = pageNote.text;
  }

  openShareFawaidModal({
    bookId: book.id,
    page: libCurrentPage,
    text: prefill
  });
}

async function submitFawaidEntry() {
  if (libFawaidSubmitting) return;
  const bookSel = document.getElementById('libShareFawaidBookSelect');
  const pageInp = document.getElementById('libShareFawaidPageInput');
  const textInp = document.getElementById('libShareFawaidTextInput');
  const authorInp = document.getElementById('libShareFawaidAuthorInput');
  const submitBtn = document.getElementById('libSubmitFawaidBtn');

  const text = textInp ? textInp.value.trim() : '';
  if (text.length < 8) {
    if (typeof showToast === 'function') showToast('يرجى كتابة الفائدة أو الاقتباس (8 أحرف على الأقل)');
    return;
  }

  const bookId = bookSel ? bookSel.value : '';
  const book = getBookById(bookId);
  const pageNum = Math.max(0, parseInt(pageInp ? pageInp.value : '0', 10) || 0);
  const authorName = (authorInp ? authorInp.value.trim() : '') || getLibDefaultReaderName() || 'قارئ في جسور';
  const uid = getLibReaderUid();
  const createdAtMs = Date.now();
  const monthKey = getLibMonthKey(createdAtMs);
  const chapterTitle = book && pageNum > 0 ? getBookChapterTitleForPage(book, pageNum) : '';

  const entryPayload = {
    bookId: book ? book.id : bookId,
    bookTitle: book ? book.title : 'كتاب من المكتبة',
    page: pageNum,
    chapterTitle: chapterTitle || '',
    text: text.slice(0, 550),
    authorName: authorName.slice(0, 48),
    authorUid: uid,
    monthKey: monthKey,
    createdAtMs: createdAtMs,
    voterIds: [],
    votesCount: 0
  };

  libFawaidSubmitting = true;
  if (submitBtn) submitBtn.disabled = true;

  try {
    const db = typeof getSharedFirestoreDb === 'function' ? getSharedFirestoreDb() : null;
    let savedToCloud = false;
    if (db) {
      try {
        await db.collection('library_fawaid').add({
          ...entryPayload,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        savedToCloud = true;
      } catch (err) {
        console.warn('Firestore library_fawaid add error:', err);
      }
    }

    if (!savedToCloud) {
      const localItem = {
        ...entryPayload,
        id: `local_${createdAtMs}_${Math.random().toString(36).slice(2, 6)}`,
        isLocal: true
      };
      libFawaidItems.unshift(localItem);
      saveLocalFawaidItems(libFawaidItems);
      updateFawaidSyncUi('local');
    }

    closeShareFawaidModal();
    const fv = document.getElementById('libFawaidView');
    if (fv && fv.style.display !== 'none') {
      renderLibraryFawaidView();
    }
    if (typeof audio !== 'undefined' && audio && typeof audio.playSuccessChime === 'function') {
      audio.playSuccessChime();
    }
    if (typeof showToast === 'function') {
      showToast(savedToCloud ? 'نُشرت الفائدة في ديوان فوائد القراء بنجاح' : 'حُفظت الفائدة في ديوانك المحلي وستتزامن لاحقاً');
    }
  } finally {
    libFawaidSubmitting = false;
    if (submitBtn) submitBtn.disabled = false;
  }
}

async function toggleFawaidVote(docId) {
  const item = (libFawaidItems || []).find((x) => x.id === docId);
  if (!item) return;
  const uid = getLibReaderUid();
  if (!Array.isArray(item.voterIds)) item.voterIds = [];
  const wasVoted = isFawaidVotedByMe(item);

  if (wasVoted) {
    item.voterIds = item.voterIds.filter((v) => v !== uid);
    delete libFawaidLocalVotes[docId];
  } else {
    if (!item.voterIds.includes(uid)) item.voterIds.push(uid);
    libFawaidLocalVotes[docId] = true;
  }
  item.votesCount = item.voterIds.length;
  saveLibraryStorage(LIB_FAWAID_VOTES_KEY, libFawaidLocalVotes);
  saveLocalFawaidItems(libFawaidItems);
  renderLibraryFawaidView();

  const db = typeof getSharedFirestoreDb === 'function' ? getSharedFirestoreDb() : null;
  if (db && !item.isLocal) {
    try {
      const op = wasVoted
        ? firebase.firestore.FieldValue.arrayRemove(uid)
        : firebase.firestore.FieldValue.arrayUnion(uid);
      await db.collection('library_fawaid').doc(docId).update({
        voterIds: op,
        votesCount: item.voterIds.length
      });
    } catch (err) {
      console.warn('Firestore fawaid vote update warning:', err);
    }
  }
}

async function deleteOwnFawaid(docId) {
  const item = (libFawaidItems || []).find((x) => x.id === docId);
  if (!item) return;
  const uid = getLibReaderUid();
  if (item.authorUid !== uid && !item.isLocal) return;

  libFawaidItems = libFawaidItems.filter((x) => x.id !== docId);
  saveLocalFawaidItems(libFawaidItems);
  updateFawaidSyncUi(libFawaidCloudState);
  renderLibraryFawaidView();

  const db = typeof getSharedFirestoreDb === 'function' ? getSharedFirestoreDb() : null;
  if (db && !item.isLocal) {
    try {
      await db.collection('library_fawaid').doc(docId).delete();
    } catch (err) {
      console.warn('Firestore fawaid delete warning:', err);
    }
  }
  if (typeof showToast === 'function') showToast('حُذفت الفائدة من الديوان');
}

function computeReadingHarvestStats(monthKey) {
  const targetMonth = monthKey || getLibMonthKey();
  const monthMap = (libReadingLog && libReadingLog.months && libReadingLog.months[targetMonth]) || {};
  let monthlyPages = 0;

  Object.keys(monthMap).forEach((bid) => {
    const rec = monthMap[bid] || {};
    const visitedLen = Array.isArray(rec.visited) ? rec.visited.length : 0;
    const baseLen = parseInt(rec.baseline, 10) || 0;
    monthlyPages += Math.max(visitedLen, baseLen);
  });

  if (monthlyPages === 0 && Object.keys(libProgress || {}).length) {
    Object.keys(libProgress).forEach((bid) => {
      const pg = parseInt(libProgress[bid], 10) || 0;
      if (pg > 1) monthlyPages += pg;
    });
  }

  const allBooks = getAllLibraryBooks();
  const completedMap = {};
  const savedCompleted = (libReadingLog && libReadingLog.completedBooks) || {};
  Object.keys(savedCompleted).forEach((bid) => {
    const b = getBookById(bid);
    completedMap[bid] = (b && b.title) || (savedCompleted[bid] && savedCompleted[bid].title) || bid;
  });
  allBooks.forEach((b) => {
    const pg = parseInt(libProgress[b.id], 10) || 0;
    const tot = getBookTotalPages(b);
    if ((tot >= 5 && pg >= tot) || (tot > 10 && pg >= tot - 1)) {
      completedMap[b.id] = b.title;
    }
  });
  const completedTitles = Object.values(completedMap);

  let inProgressTop = null;
  let bestPct = 0;
  allBooks.forEach((b) => {
    if (completedMap[b.id]) return;
    const pg = parseInt(libProgress[b.id], 10) || 0;
    const tot = getBookTotalPages(b);
    if (pg > 0 && tot > 1) {
      const pct = Math.min(99, Math.round((pg / tot) * 100));
      if (pct >= bestPct) {
        bestPct = pct;
        inProgressTop = { title: b.title, page: pg, total: tot, pct: pct };
      }
    }
  });

  let notesCount = 0;
  Object.values(libNotes || {}).forEach((bm) => {
    if (bm && typeof bm === 'object') notesCount += Object.keys(bm).length;
  });

  let highlightsCount = 0;
  Object.values(libHighlights || {}).forEach((hm) => {
    if (hm && typeof hm === 'object') highlightsCount += Object.keys(hm).length;
  });
  Object.values(libPdfHighlights || {}).forEach((pm) => {
    if (pm && typeof pm === 'object') {
      Object.values(pm).forEach((arr) => {
        if (Array.isArray(arr)) highlightsCount += arr.length;
      });
    }
  });

  const uid = getLibReaderUid();
  const myFawaid = (libFawaidItems || []).filter((it) => it.authorUid === uid);
  const sharedFawaidCount = myFawaid.length;
  const totalBenefitsAndHighlights = notesCount + highlightsCount + sharedFawaidCount;

  let bestQuote = null;
  if (myFawaid.length) {
    const sortedMine = myFawaid.slice().sort((a, b) => (getFawaidVotesCount(b) - getFawaidVotesCount(a)) || (b.createdAtMs || 0) - (a.createdAtMs || 0));
    bestQuote = { text: sortedMine[0].text, bookTitle: sortedMine[0].bookTitle };
  } else {
    let latestNote = null;
    Object.keys(libNotes || {}).forEach((bid) => {
      const bObj = getBookById(bid);
      const bookTitle = bObj ? bObj.title : '';
      const map = libNotes[bid] || {};
      Object.values(map).forEach((n) => {
        if (n && n.text && (!latestNote || (n.updatedAt || 0) > latestNote.updatedAt)) {
          latestNote = { text: n.text, bookTitle: bookTitle, updatedAt: n.updatedAt || 0 };
        }
      });
    });
    if (latestNote) bestQuote = { text: latestNote.text, bookTitle: latestNote.bookTitle };
  }

  return {
    monthKey: targetMonth,
    monthLabel: getLibArabicMonthLabel(targetMonth),
    monthlyPages: monthlyPages,
    completedCount: completedTitles.length,
    completedTitles: completedTitles,
    inProgressTop: inProgressTop,
    notesCount: notesCount,
    highlightsCount: highlightsCount,
    sharedFawaidCount: sharedFawaidCount,
    totalBenefitsAndHighlights: totalBenefitsAndHighlights,
    bestQuote: bestQuote
  };
}

function drawRoundRectPath(ctx, x, y, w, h, r) {
  const rad = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.lineTo(x + w - rad, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
  ctx.lineTo(x + w, y + h - rad);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
  ctx.lineTo(x + rad, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
  ctx.lineTo(x, y + rad);
  ctx.quadraticCurveTo(x, y, x + rad, y);
  ctx.closePath();
}

function drawEightPointStar(ctx, cx, cy, outerR, innerR) {
  ctx.beginPath();
  for (let i = 0; i < 16; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const a = (Math.PI / 8) * i;
    const px = cx + Math.cos(a) * r;
    const py = cy + Math.sin(a) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

function wrapArabicCanvasLines(ctx, text, maxWidth, maxLines) {
  const words = String(text || '').trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const lines = [];
  let cur = '';
  for (let i = 0; i < words.length; i++) {
    const test = cur ? `${cur} ${words[i]}` : words[i];
    if (ctx.measureText(test).width <= maxWidth) {
      cur = test;
    } else {
      if (cur) lines.push(cur);
      cur = words[i];
      if (maxLines && lines.length >= maxLines) {
        cur = '';
        break;
      }
    }
  }
  if (cur && (!maxLines || lines.length < maxLines)) {
    lines.push(cur);
  }
  if (maxLines && lines.length === maxLines && words.join(' ').length > lines.join(' ').length) {
    lines[maxLines - 1] = `${lines[maxLines - 1]}...`;
  }
  return lines;
}

function loadHarvestLogo() {
  if (libHarvestLogoImg && libHarvestLogoImg.complete && libHarvestLogoImg.naturalWidth > 0) {
    return Promise.resolve(libHarvestLogoImg);
  }
  return new Promise((resolve) => {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        libHarvestLogoImg = img;
        resolve(img);
      };
      img.onerror = () => resolve(null);
      img.src = './logo.png';
      setTimeout(() => resolve(img.complete && img.naturalWidth > 0 ? img : null), 900);
    } catch (e) {
      resolve(null);
    }
  });
}

async function openReadingHarvestModal() {
  const modal = document.getElementById('libHarvestModal');
  if (!modal) return;
  if (modal.parentElement !== document.body) {
    document.body.appendChild(modal);
  }
  const nameInp = document.getElementById('libHarvestNameInput');
  if (nameInp && !nameInp.value.trim()) {
    nameInp.value = getLibDefaultReaderName();
  }
  modal.style.display = 'flex';
  await renderReadingHarvestCanvas();
}

function closeReadingHarvestModal() {
  const modal = document.getElementById('libHarvestModal');
  if (modal) modal.style.display = 'none';
}

async function renderReadingHarvestCanvas() {
  const canvas = document.getElementById('libHarvestCanvas');
  if (!canvas) return;
  const stats = computeReadingHarvestStats();
  const quickEl = document.getElementById('libHarvestQuickStats');
  if (quickEl) {
    quickEl.innerHTML = `
      <span>${libIcon('scroll')} <strong>${stats.monthlyPages}</strong> صفحة هذا الشهر</span>
      <span>${libIcon('book')} <strong>${stats.completedCount}</strong> كتب مختومة</span>
      <span>${libIcon('highlight')} <strong>${stats.totalBenefitsAndHighlights}</strong> فائدة وتظليل</span>
    `;
  }

  try {
    if (document.fonts && document.fonts.ready) {
      await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 400))]);
    }
  } catch (e) {}
  const logoImg = await loadHarvestLogo();

  const W = 1080;
  const H = 1350;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.direction = 'rtl';
  ctx.textBaseline = 'middle';

  // 1. خلفية أندلسية ملكية متدرجة وإشعاع ذهبي علوي هادئ
  const bgGrad = ctx.createLinearGradient(0, 0, W, H);
  bgGrad.addColorStop(0, '#091f36');
  bgGrad.addColorStop(0.45, '#0f3a63');
  bgGrad.addColorStop(1, '#0c4e66');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  const glow = ctx.createRadialGradient(W / 2, 230, 30, W / 2, 230, 560);
  glow.addColorStop(0, 'rgba(224, 179, 92, 0.22)');
  glow.addColorStop(0.55, 'rgba(28, 163, 190, 0.12)');
  glow.addColorStop(1, 'rgba(9, 31, 54, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // 2. زخارف نجمية هندسية خفيفة في الأركان وإطار مزدوج ذهبي
  ctx.save();
  ctx.strokeStyle = 'rgba(224, 179, 92, 0.12)';
  ctx.lineWidth = 2;
  [[135, 135], [W - 135, 135], [135, H - 135], [W - 135, H - 135]].forEach(([sx, sy]) => {
    drawEightPointStar(ctx, sx, sy, 86, 54);
    ctx.stroke();
    drawEightPointStar(ctx, sx, sy, 52, 32);
    ctx.stroke();
  });
  ctx.restore();

  drawRoundRectPath(ctx, 44, 44, W - 88, H - 88, 34);
  ctx.strokeStyle = 'rgba(224, 179, 92, 0.72)';
  ctx.lineWidth = 3;
  ctx.stroke();

  drawRoundRectPath(ctx, 60, 60, W - 120, H - 120, 26);
  ctx.strokeStyle = 'rgba(255, 248, 232, 0.26)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 3. الشعار العلوي وهالة النادي
  const logoCx = W / 2;
  const logoCy = 152;
  ctx.save();
  ctx.beginPath();
  ctx.arc(logoCx, logoCy, 64, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 250, 240, 0.96)';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#e0b35c';
  ctx.stroke();
  if (logoImg) {
    try {
      ctx.beginPath();
      ctx.arc(logoCx, logoCy, 56, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(logoImg, logoCx - 56, logoCy - 56, 112, 112);
    } catch (e) {}
  } else {
    ctx.fillStyle = '#0f3a63';
    ctx.font = 'bold 34px Amiri, serif';
    ctx.textAlign = 'center';
    ctx.fillText('جسور', logoCx, logoCy + 2);
  }
  ctx.restore();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#e9c779';
  ctx.font = '700 26px Cairo, sans-serif';
  ctx.fillText('مكتبة مداومة جسور • كلية العلوم الإسلامية', W / 2, 248);

  // 4. عنوان البطاقة وشارة الشهر
  ctx.fillStyle = '#fff9ee';
  ctx.font = 'bold 74px Amiri, Cairo, serif';
  ctx.fillText('حصادي القرائي', W / 2, 328);

  drawRoundRectPath(ctx, W / 2 - 155, 384, 310, 48, 24);
  ctx.fillStyle = 'rgba(224, 179, 92, 0.16)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(224, 179, 92, 0.65)';
  ctx.lineWidth = 1.6;
  ctx.stroke();
  ctx.fillStyle = '#fce7b2';
  ctx.font = '700 25px Cairo, sans-serif';
  ctx.fillText(`حصاد شهر ${stats.monthLabel}`, W / 2, 409);

  // 5. لوحة اسم القارئ الكريم
  const nameInput = document.getElementById('libHarvestNameInput');
  const readerName = (nameInput ? nameInput.value.trim() : '') || getLibDefaultReaderName() || 'قارئ(ة) في نادي جسور';
  drawRoundRectPath(ctx, 110, 464, W - 220, 96, 22);
  ctx.fillStyle = 'rgba(255, 252, 245, 0.96)';
  ctx.fill();
  ctx.strokeStyle = '#d4a23c';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#0f3a63';
  ctx.font = '800 40px Cairo, sans-serif';
  const fittedName = wrapArabicCanvasLines(ctx, readerName, W - 280, 1)[0] || readerName;
  ctx.fillText(fittedName, W / 2, 513);

  // 6. البطاقات الإحصائية الثلاث (RTL: يمين -> وسط -> يسار)
  const cardW = 276;
  const cardH = 228;
  const gap = 26;
  const startXRight = W - 100 - cardW;
  const cardY = 598;

  const metrics = [
    {
      num: String(stats.monthlyPages),
      title: 'صفحة مقروءة',
      sub: 'خلال هذا الشهر'
    },
    {
      num: String(stats.completedCount),
      title: stats.completedCount === 1 ? 'كتاب مختوم' : 'كتب مختومة',
      sub: 'إتمام مطالعة'
    },
    {
      num: String(stats.totalBenefitsAndHighlights),
      title: 'فائدة وتظليل',
      sub: `${stats.notesCount} ملاحظة • ${stats.highlightsCount} تظليل`
    }
  ];

  metrics.forEach((m, idx) => {
    const cxBox = startXRight - idx * (cardW + gap);
    drawRoundRectPath(ctx, cxBox, cardY, cardW, cardH, 22);
    ctx.fillStyle = 'rgba(255, 252, 245, 0.10)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(224, 179, 92, 0.55)';
    ctx.lineWidth = 2;
    ctx.stroke();

    const centerX = cxBox + cardW / 2;
    ctx.fillStyle = '#f5cf76';
    ctx.font = '900 72px Cairo, sans-serif';
    ctx.fillText(m.num, centerX, cardY + 76);

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 25px Cairo, sans-serif';
    ctx.fillText(m.title, centerX, cardY + 146);

    ctx.fillStyle = 'rgba(226, 240, 248, 0.85)';
    ctx.font = '600 19px Cairo, sans-serif';
    ctx.fillText(m.sub, centerX, cardY + 188);
  });

  // 7. قسم الكتب المختومة أو قيد المطالعة + الاقتباس الاختياري
  const includeQuoteEl = document.getElementById('libHarvestIncludeQuote');
  const includeQuote = !includeQuoteEl || includeQuoteEl.checked;
  const hasQuote = includeQuote && stats.bestQuote && stats.bestQuote.text;

  const panelTop = 860;
  const panelH = hasQuote ? 168 : 260;
  drawRoundRectPath(ctx, 100, panelTop, W - 200, panelH, 22);
  ctx.fillStyle = 'rgba(255, 252, 245, 0.08)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(224, 179, 92, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  if (stats.completedTitles.length > 0) {
    ctx.fillStyle = '#f5cf76';
    ctx.font = '800 26px Cairo, sans-serif';
    ctx.fillText('الكتب التي أتممتَ مطالعتها', W / 2, panelTop + 38);

    const shownBooks = stats.completedTitles.slice(0, hasQuote ? 2 : 4).join('  •  ');
    ctx.fillStyle = '#fff9ee';
    ctx.font = '700 27px Cairo, sans-serif';
    const bLines = wrapArabicCanvasLines(ctx, shownBooks, W - 270, hasQuote ? 2 : 3);
    bLines.forEach((ln, i) => {
      ctx.fillText(ln, W / 2, panelTop + 92 + i * 42);
    });
  } else if (stats.inProgressTop) {
    ctx.fillStyle = '#f5cf76';
    ctx.font = '800 26px Cairo, sans-serif';
    ctx.fillText('قيد المطالعة الحالية', W / 2, panelTop + 42);

    ctx.fillStyle = '#fff9ee';
    ctx.font = '700 29px Cairo, sans-serif';
    const titleLine = wrapArabicCanvasLines(ctx, `«${stats.inProgressTop.title}»`, W - 260, 1)[0];
    ctx.fillText(titleLine, W / 2, panelTop + 94);

    ctx.fillStyle = '#bfe7f0';
    ctx.font = '700 23px Cairo, sans-serif';
    ctx.fillText(`وصلتَ إلى صفحة ${stats.inProgressTop.page} من ${stats.inProgressTop.total} (${stats.inProgressTop.pct}%)`, W / 2, panelTop + 136);
  } else {
    ctx.fillStyle = '#f5cf76';
    ctx.font = '800 27px Cairo, sans-serif';
    ctx.fillText('بداية مباركة في رحاب المطالعة', W / 2, panelTop + 72);
    ctx.fillStyle = '#dceef5';
    ctx.font = '600 24px Cairo, sans-serif';
    ctx.fillText('افتح أحد كتب المكتبة لتسجيل صفحاتك وفوائدك تلقائياً على بطاقتك', W / 2, panelTop + 132);
  }

  if (hasQuote) {
    const qTop = 1046;
    drawRoundRectPath(ctx, 100, qTop, W - 200, 152, 20);
    ctx.fillStyle = 'rgba(255, 250, 240, 0.94)';
    ctx.fill();
    ctx.strokeStyle = '#d4a23c';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#142c42';
    ctx.font = '700 25px Amiri, Cairo, serif';
    const qLines = wrapArabicCanvasLines(ctx, `«${stats.bestQuote.text}»`, W - 280, 2);
    qLines.forEach((ln, i) => {
      ctx.fillText(ln, W / 2, qTop + 46 + i * 38);
    });

    if (stats.bestQuote.bookTitle) {
      ctx.fillStyle = '#0f7b96';
      ctx.font = '800 20px Cairo, sans-serif';
      ctx.fillText(`— من كتاب: ${stats.bestQuote.bookTitle}`, W / 2, qTop + 124);
    }
  }

  // 8. تذييل البطاقة
  ctx.beginPath();
  ctx.moveTo(190, 1212);
  ctx.lineTo(W - 190, 1212);
  ctx.strokeStyle = 'rgba(224, 179, 92, 0.45)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#f5cf76';
  ctx.font = '700 27px Amiri, Cairo, serif';
  ctx.fillText('«وخيرُ جليسٍ في الزمانِ كتابُ»', W / 2, 1242);

  ctx.fillStyle = 'rgba(216, 232, 242, 0.80)';
  ctx.font = '600 19px Cairo, sans-serif';
  ctx.fillText('ديوان ومكتبة مداومة جسور • شارك حصادك لتحفيز الرفاق', W / 2, 1270);
}

function canvasToPngBlob(canvas) {
  return new Promise((resolve) => {
    try {
      if (typeof canvas.toBlob === 'function') {
        canvas.toBlob((blob) => resolve(blob), 'image/png');
        return;
      }
      const dataUrl = canvas.toDataURL('image/png');
      const bin = atob(dataUrl.split(',')[1] || '');
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      resolve(new Blob([bytes], { type: 'image/png' }));
    } catch (e) {
      resolve(null);
    }
  });
}

async function downloadReadingHarvestCard() {
  await renderReadingHarvestCanvas();
  const canvas = document.getElementById('libHarvestCanvas');
  if (!canvas) return;
  const stats = computeReadingHarvestStats();
  const fileName = `hisad_qiraai_${stats.monthKey}.png`;

  const blob = await canvasToPngBlob(canvas);
  if (blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  } else {
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
  if (typeof showToast === 'function') {
    showToast('تم تحميل بطاقة حصادك القرائي بنجاح');
  }
}

async function shareReadingHarvestCard() {
  await renderReadingHarvestCanvas();
  const canvas = document.getElementById('libHarvestCanvas');
  if (!canvas) return;
  const stats = computeReadingHarvestStats();
  const nameInput = document.getElementById('libHarvestNameInput');
  const readerName = (nameInput ? nameInput.value.trim() : '') || getLibDefaultReaderName() || 'قارئ في نادي جسور';
  const summaryText = `حصادي القرائي لشهر ${stats.monthLabel} في مكتبة جسور (${readerName}):\n` +
    `- الصفحات المقروءة: ${stats.monthlyPages} صفحة\n` +
    `- الكتب المختومة: ${stats.completedCount}\n` +
    `- الفوائد والتظليلات: ${stats.totalBenefitsAndHighlights}`;

  const blob = await canvasToPngBlob(canvas);
  if (blob && typeof File === 'function' && navigator.share) {
    try {
      const file = new File([blob], `hisad_qiraai_${stats.monthKey}.png`, { type: 'image/png' });
      if (!navigator.canShare || navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'حصادي القرائي — مكتبة جسور',
          text: summaryText
        });
        return;
      }
    } catch (err) {
      if (err && err.name === 'AbortError') return;
    }
  }

  await downloadReadingHarvestCard();
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    navigator.clipboard.writeText(summaryText).catch(() => {});
  }
  if (typeof showToast === 'function') {
    showToast('حُفظت الصورة ونُسخ الملخص؛ أرفق البطاقة الآن في مجموعة نشطاء جسور');
  }
}

function initJosourLibrary() {
  loadLibraryStateFromStorage();
  if (!libInitialized) {
    libInitialized = true;
    setLibrarySubView('shelf');
  }
  bindLibraryReaderSwipe();
  bindPdfHighlightPointerEvents();
  bindPdfPinchZoom();
  bindFullscreenListeners();
  renderLibraryCategoryBar();
  renderLibraryBooksGrid();
  initLibraryFawaidSync();
  refreshOfflineBookStatuses().then(() => {
    renderLibraryBooksGrid();
  });
}
