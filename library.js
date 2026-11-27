/* ═════════════════════════════════════════════════════════════════════
   مكتبة جسور الطلابية وقارئها التفاعلي المدمج — الخطوة الرابعة (الإصدار v20)
   التصنيفات السبعة • 4 كتب تراثية كاملة • قارئ PDF مدمج للكتب المعاصرة والشخصية
   حفظ محلي دائم (IndexedDB) • مارك بايج أزرق • ملاحظات • هايلايت ذكي
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
const LIB_PDF_DB_NAME = 'joussour_pdf_library_v1';
const LIB_PDF_STORE = 'pdf_files';

const LIBRARY_CATEGORIES = [
  { id: 'all', label: 'الكل', icon: '📚' },
  { id: 'quran', label: 'القرآن وتفسيره والتزكية', icon: '📖' },
  { id: 'seerah', label: 'السيرة وقصص الأنبياء', icon: '🕌' },
  { id: 'ilm', label: 'طلب العلم والفكر واليقين', icon: '🎓' },
  { id: 'history', label: 'التاريخ الإسلامي والأندلس', icon: '🏰' },
  { id: 'poetry', label: 'الدواوين الشعرية', icon: '🖋️' },
  { id: 'prison', label: 'أدب السجون', icon: '🕯️' },
  { id: 'afghan', label: 'الأدب الأفغاني', icon: '⛰️' }
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
    fullPagesCount: 1106,
    coverIcon: '📜',
    coverAccent: '#e0b35c',
    coverGradient: 'linear-gradient(155deg, #0f3a63 0%, #0f7b96 100%)',
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
    kind: 'modern',
    coverIcon: '🌿',
    coverAccent: '#a7f3d0',
    coverGradient: 'linear-gradient(155deg, #064e3b 0%, #137a5b 100%)',
    description: 'كتاب إيماني تربوي يوقظ في قلب الشاب تعظيم الوحي واستعادة الدهشة الأولى أمام آيات القرآن، ويعالج أسباب الفتور القرائي في زمن الانشغالات الرقمية.',
    pages: [
      {
        title: 'الدهشة الأولى واستقبال الوحي',
        paragraphs: [
          'يدعو الكتاب القارئ إلى أن يتعامل مع القرآن الكريم باعتباره رسائل ربانية حيّة تخاطب قلبه مباشرة، لا مجرد نصوص تُقرأ على عجل دون وقوف أو تساؤل.',
          'وينبه المؤلف إلى أن ضعف الأثر الإيماني عند التلاوة لا يعود إلى غموض النص القرآني، بل إلى انشغال القلب بصوارف الدنيا أو قراءة القرآن بعقلٍ غافل عن مقاصد الخطاب.'
        ]
      },
      {
        title: 'معالم المنهج العملي للصحبة القرآنية',
        paragraphs: [
          'من أبرز محاور الكتاب الجمع بين التلاوة المستمرة والوقوف عند الآيات المحرّكة للقلب، وربط القراءة بالسيرة والتاريخ لفهم سياق التنزيل وأثره في تربية الجيل الأول.',
          'كما يوصي طالب العلم بتخصيص ورد خلوة هادئ يتحرر فيه من تشتّت الهواتف ومن ضغط السرعة، لأن السكينة مفتاح الفهم والتذوق.'
        ]
      },
      {
        title: 'خريطة الفصول والتطبيق داخل نادي جسور',
        paragraphs: [
          'يدور الكتاب حول خمس ركائز مركزية: سطوة القرآن وهيبته، منازل الآخرة وموقف الأجيال الأولى أمام الوحي، آفات هجر القرآن في عصر الشاشات، صناعة ورد الخلوة التدبرية، ومشروعية التغيير الإيماني بالقرآن.',
          'توصية للتدارس: دوّن هنا في ملاحظة كل صفحة الآية التي أوقفتك أثناء وردك اليومي ثم انتقل إلى رفيقه «رقائق القرآن» لتعميق أثر الرقائق والرجاء والخوف.'
        ]
      },
      {
        title: 'قراءة الكتاب كاملاً بصيغة PDF داخل القارئ',
        paragraphs: [
          'حفاظاً على حقوق التأليف والنشر، يحتوي هذا العرض الأولي على الخريطة التعريفية للكتاب فقط، بينما قارئ PDF المدمج جاهز الآن لفتح الكتاب بجميع صفحاته داخل التطبيق.',
          'اضغط على زر «📂 إرفاق PDF وفتحه كاملاً» أعلى القارئ (أو من صفحة تفاصيل الكتاب) واختر نسخة PDF من جهازك مرة واحدة فقط، وسيحفظها التطبيق داخله دون إنترنت مع بقاء المارك بايج الأزرق والملاحظات والتظليل فعالة على كل صفحة.'
        ]
      }
    ]
  },
  {
    id: 'raqaiq_quran',
    categoryId: 'quran',
    categoryLabel: 'القرآن وتفسيره والتزكية',
    title: 'رقائق القرآن',
    author: 'إبراهيم بن عمر السكران',
    kind: 'modern',
    coverIcon: '💧',
    coverAccent: '#bae6fd',
    coverGradient: 'linear-gradient(155deg, #164e63 0%, #1d4ed8 100%)',
    description: 'تأملات وجدانية رفيعة في الآيات المرقّقة للقلوب؛ يتناول حقائق الآخرة والوقوف بين يدي الله وتقلّب الأيام وحياة الروح في ضوء النص القرآني.',
    pages: [
      {
        title: 'ترقيق القلوب أمام مشاهد الآخرة',
        paragraphs: [
          'يركّز الكتاب على استحضار مشاهد البعث والحساب كما رسمها القرآن الكريم بأسلوب يخترق قسوة العادة ويعيد ترتيب أولويات الإنسان في الدنيا.',
          'ويبيّن أن رقائق القرآن ليست حزناً سلبياً، بل يقظة روحية تبعث على الصدق والإخلاص وإصلاح السريرة وتخفيف التعلق بالزائل.'
        ]
      },
      {
        title: 'محطات التزكية اليومية لطالب العلم',
        paragraphs: [
          'يقف الشاب في هذا العمل أمام معاني القرب الإلهي ومناجاة الأسحار واستغفار الصالحين، ليدرك أن العلم الشرعي بلا حياة قلب يتحول إلى حجة أو جدل جاف.',
          'ويمكن للمداوم تدوين الآيات التي لامست قلبه أثناء ورد المداومة في دفتر الملاحظات الملازم لكل صفحة هنا.'
        ]
      },
      {
        title: 'أبواب الكتاب ومفاتيح التدارس الإيماني',
        paragraphs: [
          'يتنقل المصنف بين مشاهد الدار الآخرة وحقائق التزكية القلبية ومناجاة الله وتفاوت الهمم عند السلف، بأسلوب يربط القلب بمحاسبة النفس وتصفية النية في طلب العلم.',
          'تطبيق عملي لطالب جسور: خصّص عشر دقائق هادئة قبل ورد المداومة للمطالعة فيه، وظلّل المقاطع التي تستنهض قلبك باللون المناسب في الهايلايت.'
        ]
      },
      {
        title: 'قراءة الكتاب كاملاً بصيغة PDF داخل القارئ',
        paragraphs: [
          'هذا الدليل يقدّم المفاتيح الأساسية للكتاب احتراماً لحقوق المؤلف والناشر.',
          'لتصفح جميع صفحات كتاب «رقائق القرآن» هنا مباشرة، اختر ملف الـ PDF الخاص بك عبر زر «📂 إرفاق PDF وفتحه كاملاً» ليُخزَّن في جهازك للأبد داخل قارئ جسور.'
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
    fullPagesCount: 31,
    coverIcon: '✨',
    coverAccent: '#fde68a',
    coverGradient: 'linear-gradient(155deg, #1e3a5f 0%, #0f766e 100%)',
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
    id: 'raheeq_makhtum',
    categoryId: 'seerah',
    categoryLabel: 'السيرة وقصص الأنبياء',
    title: 'الرحيق المختوم',
    author: 'صفي الرحمن المباركفوري',
    kind: 'modern',
    coverIcon: '🕌',
    coverAccent: '#fde68a',
    coverGradient: 'linear-gradient(155deg, #78350f 0%, #b4532a 100%)',
    description: 'بحث شهير وموثّق في السيرة النبوية العطرة حاز الجائزة الأولى في مسابقة رابطة العالم الإسلامي، يروي سيرة النبي ﷺ بأسلوب متين ومتسلسل.',
    pages: [
      {
        title: 'البعثة والمرحلة المكية وبناء العقيدة',
        paragraphs: [
          'يستهل المؤلف الكتاب برسم لوحة تاريخية وجغرافية دقيقة لجزيرة العرب وأحوال العالم قبل البعثة، مما يبرز أثر الرسالة المحمدية في إنقاذ الإنسان.',
          'ثم يتتبّع نشأة النبي ﷺ وأخلاقه قبل النبوة، وبداية الوحي في غار حراء، وصبر الصحابة الأوائل في مكة وثباتهم على العقيدة أمام الأذى والحصار.'
        ]
      },
      {
        title: 'الهجرة وتأسيس دولة المدينة والغزوات',
        paragraphs: [
          'يحلل الكتاب الدروس التنظيمية والاجتماعية للهجرة النبوية وبناء المسجد والمؤاخاة ووثيقة المدينة، ثم يستعرض الغزوات والسرايا الكبرى بترتيب زمني منضبط.',
          'ويبرز كيف جمعت القيادة النبوية بين الشجاعة والرحمة والوفاء بالعهود حتى فتح مكة ودخول الناس في دين الله أفواجاً.'
        ]
      },
      {
        title: 'فهرس المراحل الزمنية لمتابعة السيرة النبوية',
        paragraphs: [
          'ينتظم الكتاب في ست مراحل كبرى: أحوال العرب قبل البعثة، مولد النبي ﷺ وشبابه وبداية الوحي، الدعوة السرية والجهرية في مكة والهجرتان، بناء دولة المدينة والغزوات الكبرى، ثم فتح مكة وحجة الوداع والوفاة.',
          'فائدة لطالب العلوم الإسلامية: قارن وقائع السيرة هنا بما ورد في سورة الأنفال وبراءة وآل عمران ومختصر تفسير الجلالين المدمج في هذه المكتبة.'
        ]
      },
      {
        title: 'قراءة الكتاب كاملاً بصيغة PDF داخل القارئ',
        paragraphs: [
          'يقدّم هذا العرض الموجز خارطة مراحل السيرة فقط احتراماً لحقوق الطبعات المحققة، ويمكنك فتح نسختك المأذون بها من «الرحيق المختوم» كاملة هنا في ثوانٍ.',
          'اضغط على «📂 إرفاق PDF وفتحه كاملاً» لاختيار ملف الكتاب من هاتفك فيُحفظ محلياً وتقرأه صفحة بصفحة بالمارك بايج الأزرق والملاحظات.'
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
    fullPagesCount: 864,
    coverIcon: '🏜️',
    coverAccent: '#fcd34d',
    coverGradient: 'linear-gradient(155deg, #7c2d12 0%, #c58f32 100%)',
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
    id: 'tadhkirat_sami',
    categoryId: 'ilm',
    categoryLabel: 'طلب العلم والفكر واليقين',
    title: 'تذكرة السامع والمتكلم في أدب العالم والمتعلم',
    author: 'الإمام بدر الدين ابن جماعة الكناني',
    kind: 'heritage',
    dataUrl: './books/tadhkirat_sami.json?v=19',
    fullPagesCount: 108,
    coverIcon: '🖋️',
    coverAccent: '#fef08a',
    coverGradient: 'linear-gradient(155deg, #0f3a63 0%, #1a548a 100%)',
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
    id: 'sabighat',
    categoryId: 'ilm',
    categoryLabel: 'طلب العلم والفكر واليقين',
    title: 'سابغات',
    author: 'أحمد بن يوسف السيد',
    kind: 'modern',
    coverIcon: '🛡️',
    coverAccent: '#67e8f9',
    coverGradient: 'linear-gradient(155deg, #0e7490 0%, #0f3a63 100%)',
    description: 'دليل فكري ومنهجي ميسّر للشباب الجامعي في كيفية التعامل مع الشبهات الفكرية المعاصرة، وبناء الدروع العلمية التي تحفظ اليقين وتضبط النقاش.',
    pages: [
      {
        title: 'الوقاية المعرفية قبل مواجهة الشبهات',
        paragraphs: [
          'يوضح الكتاب أن حصانة الشاب الفكرية تبدأ ببناء القواعد الكلية في الإيمان والنبوة والوحي قبل الغوص في تفاصيل الشبهات المتناثرة عبر منصات التواصل.',
          'فمن امتلك أساساً علمياً متيناً ونظر إلى الجزئيات في سياق الأصول الكبرى لم تهزّه الإثارة الإعلامية ولا الاقتطاعات السريعة.'
        ]
      },
      {
        title: 'منهجية التفكيك الهادئ للشبهة',
        paragraphs: [
          'يعرض المؤلف قواعد عملية لفحص الشبهة: تحرير موضع السؤال بدقة، التمييز بين الاعتراض العلمي الرصين والتلبيس البلاغي، والرجوع إلى المصادر المتخصصة بدل الجدل المتعجل.',
          'كما ينبه على أثر السلوك والعبادة في ثبات العقل والقلب عند تلقي الأفكار المضطربة.'
        ]
      },
      {
        title: 'أقسام الكتاب وقواعد التعامل مع الشبهات',
        paragraphs: [
          'يُعالج الكتاب محورين متكاملين: معالم الموجة التشكيكية المعاصرة وأسباب التأثر بها، ثم الدروع الثلاثة (القواعد الوقائية قبل الشبهات، القواعد المعرفية عند ورودها، وأصول المناقشة والجدل).',
          'وقد أتاح المؤلف نفسه نسخة رسمية مجانية للتحميل عبر موقعه الإلكتروني لطلبة العلم، ويمكنك فور حفظها على هاتفك فتحها بالكامل داخل هذا القارئ.'
        ]
      },
      {
        title: 'قراءة الكتاب كاملاً بصيغة PDF داخل القارئ',
        paragraphs: [
          'لقراءة صفحات كتاب «سابغات» الـ 176 كاملة ومطبوعة بأدوات المارك بايج الأزرق والملاحظات والتظليل اللمسي فوق الصفحة، اختر ملف الـ PDF من جهازك عبر زر «📂 إرفاق PDF وفتحه كاملاً» في الأعلى.',
          'بمجرد اختياره مرة واحدة سيُحفظ دائماً في ذاكرة التطبيق على هاتفك وتتمكن من الرجوع إليه في أي وقت حتى دون إنترنت.'
        ]
      }
    ]
  },
  {
    id: 'qissat_andalus',
    categoryId: 'history',
    categoryLabel: 'التاريخ الإسلامي والأندلس',
    title: 'قصة الأندلس من الفتح إلى السقوط',
    author: 'د. راغب السرجاني',
    kind: 'modern',
    coverIcon: '🏰',
    coverAccent: '#fed7aa',
    coverGradient: 'linear-gradient(155deg, #9a3412 0%, #1e3a8a 100%)',
    description: 'سرد تاريخي تحليلي ممتع يغطي ثمانية قرون من الحضور الإسلامي في الأندلس؛ يتأمل عوامل القوة والازدهار العلمي وأسباب التفرّق والانحدار.',
    pages: [
      {
        title: 'الفتح الأول وإقامة صرح الخلافة والعلوم',
        paragraphs: [
          'يروي الكتاب كيف عبر المسلمون بقيادة طارق بن زياد وموسى بن نصير ليفتحوا صفحة حضارية فريدة، أصبحت فيها قرطبة منارة للعلم والفقه والطب والفلك في أوروبا.',
          'ويبرز المؤلف دور الوحدة السياسية والعدل الاجتماعي والشجاعة القيادية في ذروة الدولة الأموية في الأندلس.'
        ]
      },
      {
        title: 'ملوك الطوائف والمرابطون ثم غرناطة',
        paragraphs: [
          'يحلل العمل ببصيرة تاريخية مرض التمزق في عصر ملوك الطوائف واستعانة البعض بالأعداء على إخوانهم، ثم هبّات النجدة المغاربية في معارك الزلاقة والأرك.',
          'ويختتم بعبر سقوط غرناطة التي تذكّر كل جيل أن سنن الله التاريخية لا تحابي أحداً.'
        ]
      },
      {
        title: 'عصور الأندلس الثمانية ومكمن العبرة السننية',
        paragraphs: [
          'تتبع خريطة الكتاب مسار الولاة فالإمارة فالأمويين (عصر الخلافة الزاهي)، ثم انهيار الطوائف، فالنجدة المرابطية في الزلاقة ثم الموحدية في الأرك، وصولاً إلى مملكة غرناطة وسقوطها.',
          'نقطة نقاش للمطالعة الجماعية: ما الفارق الحاسم بين أسباب التمكين في عهد عبد الرحمن الناصر وأسباب التشرذم في عهد ملوك الطوائف؟'
        ]
      },
      {
        title: 'قراءة الكتاب كاملاً بصيغة PDF داخل القارئ',
        paragraphs: [
          'لتقليب جميع صفحات «قصة الأندلس» باللمس وإضافة الملاحظات التاريخية والتظليل فوق الفقرات والخرائط، اختر ملف الـ PDF الخاص بالكتاب من جهازك عبر زر الإرفاق في الأعلى.',
          'يُحفظ الملف تلقائياً في جهازك دون رفع على أي خادم لتستكمل قراءته دائماً من نفس الصفحة.'
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
    fullPagesCount: 134,
    coverIcon: '✒️',
    coverAccent: '#e9d5ff',
    coverGradient: 'linear-gradient(155deg, #4c1d95 0%, #7c3aed 100%)',
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
    id: 'khams_daqaiq',
    categoryId: 'prison',
    categoryLabel: 'أدب السجون',
    title: 'خمس دقائق وحسب',
    author: 'هبة الدباغ',
    kind: 'modern',
    coverIcon: '🕯️',
    coverAccent: '#fbcfe8',
    coverGradient: 'linear-gradient(155deg, #4a044e 0%, #9d174d 100%)',
    description: 'شهادة واقعية مؤثرة عن تسع سنوات خلف القضبان في السجون السورية؛ تسجّل كيف ينتصر الإيمان والذكر والتكافل الإنساني على قسوة العزلة.',
    pages: [
      {
        title: 'الامتحان المفاجئ ومعنى خمس دقائق',
        paragraphs: [
          'تبدأ الحكاية باستدعاء بسيط ظنّت صاحبته أنه لن يستغرق سوى خمس دقائق، ليتحول إلى سنوات طويلة من الاعتقال والتجرد من كل أسباب الراحة المعهودة.',
          'ومن قلب الضيق تتعلّم الساردة كيف يعيد الإنسان اكتشاف صلته بالله وبمعاني الصبر والثبات على القيم.'
        ]
      },
      {
        title: 'الذكر والقرآن والمؤازرة داخل الزنزانة',
        paragraphs: [
          'يكشف الكتاب عن أثر حفظ القرآن وترديد الأذكار وتقاسم لقمة العيش والدواء بين السجينات في صيانة كرامة الروح وسط الظلمة.',
          'ويخرج القارئ الشاب من هذه التجربة بشعور أعمق بقيمة الحرية والوقت ونعمة الأمن التي قد يغفل عنها المعتادون.'
        ]
      },
      {
        title: 'منظومة الصبر والحوار الداخلي في أدب السجون',
        paragraphs: [
          'تقوم هذه الشهادة على مقابلة مؤثرة بين قسوة المكان وانطلاق الروح بالقرآن والذكر والمؤازرة اليومية بين السجينات رغم انقطاع الأخبار لسنوات.',
          'رسالة للقارئ الشاب: استثمار أوقات الحرية والعافية والفراغ الجامعي في الطاعة وطلب العلم قبل نزول العوارض.'
        ]
      },
      {
        title: 'قراءة الكتاب كاملاً بصيغة PDF داخل القارئ',
        paragraphs: [
          'احتراماً لحقوق النشر، يعرض هذا التمهيد مفاتيح الكتاب فقط بينما يتيح لك قارئ جسور المدمج فتح ملف PDF الكامل الذي بحوزتك على الهاتف.',
          'اضغط على «📂 إرفاق PDF وفتحه كاملاً» لاختيار ملف الكتاب وحفظه داخل التطبيق للقراءة المتواصلة وتدوين خواطرك.'
        ]
      }
    ]
  },
  {
    id: 'alf_shams_satea',
    categoryId: 'afghan',
    categoryLabel: 'الأدب الأفغاني',
    title: 'ألف شمس ساطعة',
    author: 'خالد حسيني',
    kind: 'modern',
    coverIcon: '⛰️',
    coverAccent: '#fde68a',
    coverGradient: 'linear-gradient(155deg, #334155 0%, #b4532a 100%)',
    description: 'رواية إنسانية عميقة من الأدب الأفغاني المعاصر؛ ترسم عبر جيلين حكاية الصمود والرحمة والوفاء وسط تحولات تاريخية قاسية في أفغانستان.',
    pages: [
      {
        title: 'الخلفية الإنسانية والمكانية في أفغانستان',
        paragraphs: [
          'تمتد أحداث الرواية عبر عقود من الاضطرابات والحروب في هرات وكابول، وتصوّر بعمق إنساني كيف تصمد الأسرة والروابط الصادقة حين تتصدّع المدن.',
          'وتجمع الحكاية بين مسارين متباينين يتحولان إلى صداقة وإيثار استثنائي في مواجهة القسوة والظروف المعقدة.'
        ]
      },
      {
        title: 'دلالات التضحية والأمل وقيمة التعليم',
        paragraphs: [
          'تحتفي الرواية بقيمة القراءة والكتابة بوصفهما نافذة للأمل وصناعة الغد، وتبرز كيف يبقى الإحسان والصدق أثراً ممتداً يتجاوز صاحبه إلى الأجيال القادمة.',
          'ويقرأها الشباب قراءة نقدية واعية تفتح أفق التأمل في أحوال الشعوب المسلمة ومآلات الصراعات المعاصرة.'
        ]
      },
      {
        title: 'رصد البنية السردية والشخصيات في الرواية',
        paragraphs: [
          'توازي الرواية بين مسارين حياتيين مختلفين في هرات وكابول يلتقيان وسط أهوال الحرب، لتؤكد مركزية العلم والكرامة والإحسان والتضامن الأسري في إعادة بناء الإنسان.',
          'زاوية تأمل لطالبة العلم: كيف تتحوّل القراءة وتعلّم الحرف في الرواية إلى طوق نجاة وإرادة حياة رغم القهر؟'
        ]
      },
      {
        title: 'قراءة الكتاب كاملاً بصيغة PDF داخل القارئ',
        paragraphs: [
          'الرواية محمية بحقوق النشر والتأليف الدولية؛ لذا نعرض هنا دليل المطالعة فقط مع جاهزية قارئ التطبيق لاستقبال نسختك الخاصة بصيغة PDF.',
          'اختر ملف الـ PDF من جهازك عبر زر الإرفاق في الأعلى ليُفتح كاملاً هنا مع المارك بايج الأزرق والملاحظات والهايلايت.'
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

let libProgress = {};
let libBookmarks = {};
let libNotes = {};
let libHighlights = {};
let libPdfHighlights = {};
let libCustomBooks = [];
let libPdfMeta = {};
let libPrefs = { fontSize: 1.04, pdfZoom: 1.0, nightMode: false };

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

const LIB_CUSTOM_COVER_GRADIENTS = [
  'linear-gradient(155deg, #0f3a63 0%, #0f7b96 100%)',
  'linear-gradient(155deg, #064e3b 0%, #137a5b 100%)',
  'linear-gradient(155deg, #78350f 0%, #c58f32 100%)',
  'linear-gradient(155deg, #4c1d95 0%, #7c3aed 100%)',
  'linear-gradient(155deg, #4a044e 0%, #9d174d 100%)'
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

function renderLibraryCategoryBar() {
  const bar = document.getElementById('libCategoryBar');
  if (!bar) return;
  bar.innerHTML = LIBRARY_CATEGORIES.map((cat) => `
    <button type="button"
      class="lib-cat-pill tap-glow ${cat.id === libActiveCategory ? 'active' : ''}"
      data-cat="${cat.id}"
      onclick="selectLibraryCategory('${cat.id}')">
      <span>${cat.icon}</span>
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
    const statusParts = [];
    if (lastPg > 0) statusParts.push(`ص ${lastPg}/${totalPg}`);
    else if (pdfAttached) statusParts.push(`${totalPg} صفحة PDF`);
    if (bmCount > 0) statusParts.push(`🔖 ${bmCount}`);
    if (noteCount > 0) statusParts.push(`📝 ${noteCount}`);

    let tagHtml = '<span class="lib-cover-tag">دليل + PDF 📄</span>';
    if (b.dataUrl) {
      tagHtml = '<span class="lib-cover-tag is-complete">نص كامل ✓</span>';
    } else if (pdfAttached) {
      tagHtml = '<span class="lib-cover-tag is-pdf">PDF مدمج ✓</span>';
    }

    return `
      <button type="button" class="lib-book-card tap-glow" onclick="openBookDetail('${b.id}')">
        <div class="lib-book-cover" style="background: ${b.coverGradient};">
          <span class="lib-book-spine"></span>
          ${tagHtml}
          <div class="lib-cover-icon">${b.coverIcon || '📄'}</div>
          <div class="lib-cover-title" style="color: ${b.coverAccent || '#fef3c7'};">${escapeLibHtml(b.title)}</div>
          <div class="lib-cover-author">${escapeLibHtml(b.author || 'كتاب PDF')}</div>
        </div>
        <div class="lib-book-card-body">
          <div class="lib-book-cat-chip">${escapeLibHtml(b.categoryLabel)}</div>
          <div class="lib-book-desc-mini">${escapeLibHtml(b.description)}</div>
          <div class="lib-book-card-foot">
            <span class="lib-book-read-cta">${pdfAttached || b.dataUrl ? 'افتح الكتاب 📖' : 'الدليل أو إرفاق PDF 📄'}</span>
            ${statusParts.length ? `<span class="lib-book-stats-mini">${statusParts.join(' • ')}</span>` : ''}
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
  const shelf = document.getElementById('libShelfView');
  const detail = document.getElementById('libDetailView');
  const reader = document.getElementById('libReaderView');
  if (shelf) shelf.style.display = viewName === 'shelf' ? 'block' : 'none';
  if (detail) detail.style.display = viewName === 'detail' ? 'block' : 'none';
  if (reader) reader.style.display = viewName === 'reader' ? 'block' : 'none';
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
  const bmCount = libBookmarks[b.id] ? Object.keys(libBookmarks[b.id]).length : 0;
  const noteCount = libNotes[b.id] ? Object.keys(libNotes[b.id]).length : 0;
  const textHlCount = libHighlights[b.id] ? Object.keys(libHighlights[b.id]).length : 0;
  const pdfHlCount = libPdfHighlights[b.id]
    ? Object.values(libPdfHighlights[b.id]).reduce((acc, arr) => acc + (Array.isArray(arr) ? arr.length : 0), 0)
    : 0;
  const hlCount = textHlCount + pdfHlCount;

  let pageLabelStat = `📑 ${totalPg} محطات دليلية`;
  if (b.dataUrl) {
    pageLabelStat = `📄 ${totalPg} صفحة كاملة`;
  } else if (pdfAttached) {
    pageLabelStat = `📄 ${totalPg} صفحة PDF`;
  }

  let pdfBoxHtml = '';
  let actionsHtml = '';

  if (b.kind === 'modern' || b.isCustomPdf) {
    if (pdfAttached) {
      const fileLabel = pdfMeta && pdfMeta.fileName ? pdfMeta.fileName : 'ملف PDF مدمج';
      pdfBoxHtml = `
        <div class="lib-pdf-attach-card is-ready">
          <div class="lib-pdf-attach-title">✓ النسخة الكاملة مدمجة ومحفوظة دون إنترنت</div>
          <div class="lib-pdf-attach-sub">
            الملف: <strong>${escapeLibHtml(fileLabel)}</strong> • ${totalPg} صفحة جاهزة بالمارك بايج الأزرق والملاحظات والتظليل.
          </div>
        </div>
      `;
      actionsHtml = `
        <div class="lib-detail-actions">
          <button type="button" class="start-duty-btn tap-glow" onclick="openBookReader('${b.id}', false, 'pdf')">
            ${hasProgress ? `📖 متابعة القراءة الكاملة (ص ${Math.min(savedPage, totalPg)} / ${totalPg})` : `📖 ابدأ القراءة الكاملة (${totalPg} صفحة)`}
          </button>
          <div class="lib-detail-sub-actions">
            ${!b.isCustomPdf ? `<button type="button" class="lib-detail-sec-btn tap-glow" onclick="openBookReader('${b.id}', false, 'guide')">📑 الدليل التعريفي</button>` : ''}
            <button type="button" class="lib-detail-sec-btn tap-glow" onclick="triggerAttachPdfForBook('${b.id}')">🔄 تبديل ملف PDF</button>
            <button type="button" class="lib-detail-sec-btn is-danger tap-glow" onclick="${b.isCustomPdf ? `deleteCustomPdfBook('${b.id}')` : `removeAttachedPdfFromBook('${b.id}')`}">
              🗑️ ${b.isCustomPdf ? 'حذف من الرف' : 'إزالة الملف'}
            </button>
          </div>
        </div>
      `;
    } else {
      pdfBoxHtml = `
        <div class="lib-pdf-attach-card">
          <div class="lib-pdf-attach-title">📄 لفتح الكتاب كاملاً بصيغة PDF داخل التطبيق</div>
          <div class="lib-pdf-attach-sub">
            حفاظاً على حقوق المؤلف والناشر، يوفّر التطبيق الآن محاور الكتاب التعريفية فقط؛ وبمجرد اختيار ملف الـ PDF من جهازك مرة واحدة سيُحفظ هنا للأبد وتقرأ جميع صفحاته بالمارك بايج الأزرق والملاحظات والتظليل.
          </div>
          <button type="button" class="start-duty-btn tap-glow" onclick="triggerAttachPdfForBook('${b.id}')">
            📂 اختر ملف PDF للكتاب من جهازك
          </button>
        </div>
      `;
      actionsHtml = `
        <div class="lib-detail-actions">
          <button type="button" class="lib-detail-sec-btn tap-glow" onclick="openBookReader('${b.id}', false, 'guide')">
            ${hasProgress ? `📑 متابعة قراءة الدليل التعريفي (محطة ${Math.min(savedPage, totalPg)} / ${totalPg})` : `📑 قراءة الدليل التعريفي وخريطة الكتاب (${totalPg} محطات)`}
          </button>
        </div>
      `;
    }
  } else {
    actionsHtml = `
      <button type="button" class="start-duty-btn tap-glow" onclick="openBookReader('${b.id}')">
        ${hasProgress ? `📖 متابعة القراءة (صفحة ${savedPage})` : '📖 ابدأ القراءة الآن'}
      </button>
    `;
  }

  container.innerHTML = `
    <div class="lib-detail-top">
      <div class="lib-book-cover lib-detail-cover" style="background: ${b.coverGradient};">
        <span class="lib-book-spine"></span>
        <div class="lib-cover-icon" style="font-size: 2rem;">${b.coverIcon || '📄'}</div>
        <div class="lib-cover-title" style="color: ${b.coverAccent || '#fef3c7'}; font-size: 0.96rem;">${escapeLibHtml(b.title)}</div>
      </div>
      <div class="lib-detail-info">
        <span class="lib-book-cat-chip">${escapeLibHtml(b.categoryLabel)}</span>
        <h3 class="lib-detail-title">${escapeLibHtml(b.title)}</h3>
        <div class="lib-detail-author">✍️ ${escapeLibHtml(b.author)}</div>
        <div class="lib-detail-stats">
          <span>${pageLabelStat}</span>
          <span>🔖 ${bmCount} علامة</span>
          <span>📝 ${noteCount} ملاحظة</span>
          <span>🖍️ ${hlCount} تظليل</span>
        </div>
      </div>
    </div>
    <p class="lib-detail-desc">${escapeLibHtml(b.description)}</p>
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
    showToast('⏳ جاري فحص ملف PDF وحفظه للقراءة الكاملة...');
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
      updatedAt: Date.now()
    };
    saveLibraryStorage(LIB_PDF_META_KEY, libPdfMeta);

    libProgress[book.id] = 1;
    saveLibraryStorage(LIB_PROGRESS_KEY, libProgress);

    if (typeof showToast === 'function') {
      showToast(`📄 تم إدراج «${book.title}» (${inspected.numPages} صفحة) وحفظه محلياً`);
    }
    await openBookReader(book.id, true, 'pdf');
  } catch (err) {
    console.error('PDF attach error:', err);
    if (typeof showToast === 'function') {
      showToast('⚠️ تعذّر قراءة هذا الملف كـ PDF صالح، تأكد من سلامة الملف.');
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
    showToast(`🗑️ أُزيل ملف PDF المرفق بكتاب «${b.title}»`);
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
      showToast('⚠️ تعذّر قراءة الملف من الجهاز.');
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
    showToast('⏳ جاري فحص الكتاب وحفظه على رفّك الخاص...');
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
      coverIcon: catObj.icon || '📄',
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
      updatedAt: Date.now()
    };
    saveLibraryStorage(LIB_PDF_META_KEY, libPdfMeta);

    libPendingCustomPdf = null;
    const drawer = document.getElementById('libCustomPdfDrawer');
    if (drawer) drawer.style.display = 'none';

    renderLibraryBooksGrid();
    if (typeof showToast === 'function') {
      showToast(`📚 أُضيف «${title}» (${inspected.numPages} صفحة) إلى رفّك`);
    }
    await openBookReader(bookId, true, 'pdf');
  } catch (err) {
    console.error('Custom PDF save error:', err);
    if (typeof showToast === 'function') {
      showToast('⚠️ الملف ليس ملف PDF مدعوماً أو تالف.');
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
    showToast(`🗑️ حُذف كتاب «${b.title}» من رفّك الخاص`);
  }
  backToLibraryShelf();
}

function backToLibraryShelf() {
  libActiveDrawer = null;
  libPdfState.searchAbortId += 1;
  setLibrarySubView('shelf');
  renderLibraryBooksGrid();
}

function closeBookReader() {
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
      const cached = await cache.match(book.dataUrl);
      if (cached && cached.ok) {
        data = await cached.json();
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
  try {
    await pdfDoc.destroy();
  } catch (e) {}
  return { numPages, chapters };
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
        const cached = await cache.match(book.pdfUrl);
        if (cached && cached.ok) {
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
  countEl.textContent = `⏳ جاري البحث في صفحات ملف PDF (${libPdfState.numPages} صفحة)...`;
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

  const titleEl = document.getElementById('libReaderTitle');
  const contentEl = document.getElementById('libReaderPageContent');
  const pdfStage = document.getElementById('libPdfStage');
  const attachBanner = document.getElementById('libPdfAttachBanner');
  if (titleEl) titleEl.textContent = `${b.coverIcon || '📄'} ${b.title}`;

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
      return;
    } catch (err) {
      console.error('Open PDF error:', err);
      libReaderMode = 'text';
      if (pdfStage) pdfStage.style.display = 'none';
      if (contentEl) contentEl.style.display = 'block';
      if (typeof showToast === 'function') {
        showToast('⚠️ تعذّر فتح ملف PDF، يمكنك إعادة إرفاقه من الجهاز.');
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
          <div style="font-size: 1.5rem; margin-bottom: 6px;">📖</div>
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
            <div style="font-size: 1.5rem; margin-bottom: 6px;">⚠️</div>
            <div style="margin-bottom: 10px;">تعذّر تحميل نص الكتاب الكامل الآن؛ تحقّق من الاتصال ثم أعد المحاولة.</div>
            <button type="button" class="focus-btn focus-btn-primary tap-glow" onclick="openBookReader('${b.id}', true)">
              🔄 إعادة التحميل
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
  if (nightBtn) {
    nightBtn.textContent = libPrefs.nightMode ? '☀️' : '🌙';
    nightBtn.classList.toggle('active', Boolean(libPrefs.nightMode));
  }
  if (hlHint) {
    hlHint.textContent = pdfActive
      ? 'اسحب فوق أي سطر أو انقر على الصفحة لتظليلها، أو انقر على تظليل موجود لمسحه'
      : 'اضغط على أي جملة أو فقرة لتظليلها أو إزالة تظليلها';
  }
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
      toggleBtn.textContent = `🔖 ${entries.length}`;
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
  const inputEl = document.getElementById('libPageNoteInput');
  const chipsEl = document.getElementById('libAllNotesList');
  const noteBox = document.getElementById('libInlineNoteBox');
  const bookNotes = libNotes[book.id] || {};
  const existing = bookNotes[String(libCurrentPage)];
  const isOpen = noteBox && noteBox.style.display === 'block';

  if (dotEl) {
    dotEl.style.display = existing ? 'block' : 'none';
  }
  if (noteBtn) {
    noteBtn.classList.toggle('active', Boolean(isOpen || existing));
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
        <button type="button" class="page-mini-chip tap-glow ${n.page === libCurrentPage ? 'active' : ''}" onclick="goToBookPage(${n.page})">📝 ص ${n.page}</button>
      `).join('');
    }
  }
}

function toggleBookPageNote(forceState) {
  const noteBox = document.getElementById('libInlineNoteBox');
  const popEl = document.getElementById('libSavedBmsPop');
  if (!noteBox) return;
  const isOpen = noteBox.style.display === 'block';
  const show = typeof forceState === 'boolean' ? forceState : !isOpen;
  if (show && popEl) popEl.style.display = 'none';
  noteBox.style.display = show ? 'block' : 'none';
  renderBookInlineNoteUi();
  if (show) {
    const inp = document.getElementById('libPageNoteInput');
    if (inp) setTimeout(() => inp.focus(), 50);
  }
  updateBookToolBadges();
}

function updateBookToolBadges() {
  const book = getBookById(libCurrentBookId);
  if (!book) return;
  const hlBtn = document.getElementById('libBtnHighlight');
  const bmsToggle = document.getElementById('libSavedBmsToggle');
  const popEl = document.getElementById('libSavedBmsPop');
  const noteBtn = document.getElementById('libPageNoteBtn');
  const noteBox = document.getElementById('libInlineNoteBox');
  const bookNotes = libNotes[book.id] || {};

  if (hlBtn) {
    hlBtn.classList.toggle('active', libHighlightMode);
  }
  if (bmsToggle && popEl) {
    bmsToggle.classList.toggle('active', popEl.style.display === 'flex');
  }
  if (noteBtn && noteBox) {
    noteBtn.classList.toggle('active', noteBox.style.display === 'block' || Boolean(bookNotes[String(libCurrentPage)]));
  }
}

/* ── التظليل التفاعلي (هايلايت) فوق صفحات الـ PDF ── */
function renderPdfHighlightsForPage(bookId, pageNum) {
  const layer = document.getElementById('libPdfHighlightLayer');
  if (!layer) return;
  const bookMap = libPdfHighlights[bookId] || {};
  const list = Array.isArray(bookMap[String(pageNum)]) ? bookMap[String(pageNum)] : [];

  layer.innerHTML = list.map((hl) => `
    <div class="lib-pdf-hl-rect"
      data-hlid="${escapeLibHtml(hl.id)}"
      style="left: ${hl.x}%; top: ${hl.y}%; width: ${hl.w}%; height: ${hl.h}%; background-color: ${escapeLibHtml(hl.color)};"
      title="تظليل محفوظ — انقر في وضع الهايلايت للمسح"></div>
  `).join('');
}

function bindPdfHighlightPointerEvents() {
  const layer = document.getElementById('libPdfHighlightLayer');
  if (!layer || libPdfHlBound) return;
  libPdfHlBound = true;

  let dragging = false;
  let startX = 0;
  let startY = 0;
  let rectCache = null;
  let targetHlId = null;

  const toPct = (clientX, clientY) => {
    const r = rectCache || layer.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((clientX - r.left) / Math.max(1, r.width)) * 100));
    const y = Math.min(100, Math.max(0, ((clientY - r.top) / Math.max(1, r.height)) * 100));
    return { x, y };
  };

  layer.addEventListener('pointerdown', (e) => {
    if (!libHighlightMode || !libCurrentBookId) return;
    const hitRect = e.target && e.target.closest('.lib-pdf-hl-rect');
    targetHlId = hitRect ? hitRect.getAttribute('data-hlid') : null;
    rectCache = layer.getBoundingClientRect();
    const pt = toPct(e.clientX, e.clientY);
    startX = pt.x;
    startY = pt.y;
    dragging = true;
    try {
      if (layer.setPointerCapture) layer.setPointerCapture(e.pointerId);
    } catch (err) {}

    const selBox = document.getElementById('libPdfSelectionBox');
    if (selBox && !targetHlId) {
      selBox.style.display = 'none';
      selBox.style.backgroundColor = libSelectedHighlightColor;
    }
  });

  layer.addEventListener('pointermove', (e) => {
    if (!dragging || !libHighlightMode || targetHlId) return;
    const pt = toPct(e.clientX, e.clientY);
    const dx = Math.abs(pt.x - startX);
    const dy = Math.abs(pt.y - startY);
    const selBox = document.getElementById('libPdfSelectionBox');
    if (!selBox) return;
    if (dx < 2 && dy < 1.5) return;

    const left = Math.min(startX, pt.x);
    const top = Math.min(startY, pt.y);
    const width = Math.max(2, Math.abs(pt.x - startX));
    const height = Math.max(2.6, Math.abs(pt.y - startY));
    selBox.style.display = 'block';
    selBox.style.left = `${left.toFixed(2)}%`;
    selBox.style.top = `${top.toFixed(2)}%`;
    selBox.style.width = `${width.toFixed(2)}%`;
    selBox.style.height = `${height.toFixed(2)}%`;
  });

  const endHighlightStroke = (e) => {
    if (!dragging) return;
    dragging = false;
    const selBox = document.getElementById('libPdfSelectionBox');
    if (selBox) selBox.style.display = 'none';
    if (!libHighlightMode || !libCurrentBookId) return;

    const pt = toPct(e.clientX, e.clientY);
    const dx = Math.abs(pt.x - startX);
    const dy = Math.abs(pt.y - startY);

    if (!libPdfHighlights[libCurrentBookId]) libPdfHighlights[libCurrentBookId] = {};
    const pgKey = String(libCurrentPage);
    if (!Array.isArray(libPdfHighlights[libCurrentBookId][pgKey])) {
      libPdfHighlights[libCurrentBookId][pgKey] = [];
    }
    const list = libPdfHighlights[libCurrentBookId][pgKey];

    if (targetHlId && dx < 2.2 && dy < 2.2) {
      libPdfHighlights[libCurrentBookId][pgKey] = list.filter((item) => item.id !== targetHlId);
      if (!libPdfHighlights[libCurrentBookId][pgKey].length) {
        delete libPdfHighlights[libCurrentBookId][pgKey];
      }
      saveLibraryStorage(LIB_PDF_HIGHLIGHTS_KEY, libPdfHighlights);
      renderPdfHighlightsForPage(libCurrentBookId, libCurrentPage);
      targetHlId = null;
      return;
    }

    targetHlId = null;
    let rectObj;
    if (dx < 3 && dy < 2) {
      const w = 36;
      const h = 3.8;
      rectObj = {
        id: `hl_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        x: Number(Math.min(100 - w - 1, Math.max(1, startX - w / 2)).toFixed(2)),
        y: Number(Math.min(100 - h - 1, Math.max(1, startY - h / 2)).toFixed(2)),
        w: w,
        h: h,
        color: libSelectedHighlightColor
      };
    } else {
      const hVal = Math.max(3.2, dy);
      const wVal = Math.max(5, dx);
      rectObj = {
        id: `hl_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        x: Number(Math.min(startX, pt.x).toFixed(2)),
        y: Number(Math.min(startY, pt.y).toFixed(2)),
        w: Number(wVal.toFixed(2)),
        h: Number(hVal.toFixed(2)),
        color: libSelectedHighlightColor
      };
    }

    list.push(rectObj);
    saveLibraryStorage(LIB_PDF_HIGHLIGHTS_KEY, libPdfHighlights);
    renderPdfHighlightsForPage(libCurrentBookId, libCurrentPage);
  };

  layer.addEventListener('pointerup', endHighlightStroke);
  layer.addEventListener('pointercancel', endHighlightStroke);
}

function setPdfViewMode(mode) {
  const nextMode = mode === 'text' ? 'text' : 'canvas';
  libPdfViewMode = nextMode;
  renderBookPage(libCurrentPage);
}

async function renderPdfBookPage(pageNum) {
  const book = getBookById(libCurrentBookId);
  const pdfDoc = libPdfState.doc;
  const stage = document.getElementById('libPdfStage');
  const contentEl = document.getElementById('libReaderPageContent');
  const canvasWrap = document.getElementById('libPdfCanvasWrap');
  const canvas = document.getElementById('libPdfCanvas');
  const loadingEl = document.getElementById('libPdfLoading');
  const viewBar = document.getElementById('libPdfViewBar');
  const canvasBtn = document.getElementById('libPdfModeCanvasBtn');
  const textBtn = document.getElementById('libPdfModeTextBtn');

  if (!book || !pdfDoc || !canvas || !stage) return;

  if (libPdfState.renderTask && typeof libPdfState.renderTask.cancel === 'function') {
    try {
      libPdfState.renderTask.cancel();
    } catch (e) {}
    libPdfState.renderTask = null;
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

    const canShowText = Boolean(cachedText && cachedText.clean && Array.isArray(libPdfState.cleanTexts[pageNum]));
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
      return;
    }

    if (contentEl) contentEl.style.display = 'none';
    stage.style.display = 'block';
    if (loadingEl) loadingEl.style.display = 'block';

    const unscaledViewport = page.getViewport({ scale: 1 });
    const stageWidth = Math.max(240, (stage.clientWidth || (window.innerWidth - 48) || 340) - 2);
    const cssWidth = stageWidth * (libPrefs.pdfZoom || 1.0);
    const scale = cssWidth / unscaledViewport.width;
    const viewport = page.getViewport({ scale });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.max(1, Math.floor(viewport.width * dpr));
    canvas.height = Math.max(1, Math.floor(viewport.height * dpr));
    canvas.style.width = `${Math.floor(viewport.width)}px`;
    canvas.style.height = `${Math.floor(viewport.height)}px`;

    if (canvasWrap) {
      canvasWrap.style.width = `${Math.floor(viewport.width)}px`;
      canvasWrap.style.height = `${Math.floor(viewport.height)}px`;
    }

    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const task = page.render({ canvasContext: ctx, viewport });
    libPdfState.renderTask = task;
    await task.promise;
    if (libPdfState.renderTask === task) {
      libPdfState.renderTask = null;
    }
    if (loadingEl) loadingEl.style.display = 'none';

    renderPdfHighlightsForPage(book.id, pageNum);
    applyBookReaderVisualPrefs();
  } catch (err) {
    if (err && err.name === 'RenderingCancelledException') return;
    console.error('PDF page render error:', err);
    if (loadingEl) loadingEl.style.display = 'none';
  }
}

function renderBookPage(pageNum) {
  const book = getBookById(libCurrentBookId);
  if (!book) return;
  const usingPdf = isBookUsingPdfReader(book);
  const total = usingPdf ? libPdfState.numPages : book.pages.length;
  const target = Math.min(total, Math.max(1, parseInt(pageNum, 10) || 1));
  libCurrentPage = target;

  libProgress[book.id] = target;
  saveLibraryStorage(LIB_PROGRESS_KEY, libProgress);

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

  if (titleEl) titleEl.textContent = `${book.coverIcon || '📄'} ${book.title}`;
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
}

function goToBookPage(pageNum) {
  const book = getBookById(libCurrentBookId);
  const total = isBookUsingPdfReader(book) ? libPdfState.numPages : (book ? book.pages.length : 0);
  const num = parseInt(pageNum, 10);
  if (!book || Number.isNaN(num) || num < 1 || num > total) {
    if (typeof showToast === 'function' && book) {
      showToast(`⚠️ أدخل رقم صفحة بين 1 و ${total}`);
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
      showToast(`🔖 أزيلت علامة صفحة ${libCurrentPage}`);
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
    showToast(`🔖 حُفظت علامة صفحة ${libCurrentPage}`);
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
      if (typeof showToast === 'function') showToast('🗑️ تم مسح ملاحظة الصفحة');
    } else if (typeof showToast === 'function') {
      showToast('⚠️ اكتب ملاحظة قبل الحفظ');
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
    showToast(`📝 تم حفظ ملاحظة صفحة ${libCurrentPage}`);
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
    if (typeof showToast === 'function') showToast(`🗑️ مُسحت ملاحظة صفحة ${libCurrentPage}`);
  }
}

function toggleBookHighlightMode() {
  libHighlightMode = !libHighlightMode;
  const bar = document.getElementById('libHighlightBar');
  if (bar) bar.style.display = libHighlightMode ? 'block' : 'none';
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
  if (!libHighlightMode || !libCurrentBookId) return;
  if (!libHighlights[libCurrentBookId]) libHighlights[libCurrentBookId] = {};
  const bookHls = libHighlights[libCurrentBookId];

  if (bookHls[segKey] === libSelectedHighlightColor) {
    delete bookHls[segKey];
  } else {
    bookHls[segKey] = libSelectedHighlightColor;
  }
  saveLibraryStorage(LIB_HIGHLIGHTS_KEY, libHighlights);

  const el = document.querySelector(`.lib-sentence[data-seg="${segKey}"]`);
  if (el) {
    el.style.backgroundColor = bookHls[segKey] || '';
  }
}

function changeBookFontSize(delta) {
  const book = getBookById(libCurrentBookId);
  if (isBookUsingPdfReader(book) && libPdfViewMode === 'canvas') {
    const zStep = delta > 0 ? 0.15 : -0.15;
    libPrefs.pdfZoom = Math.min(1.8, Math.max(0.85, Number(((libPrefs.pdfZoom || 1.0) + zStep).toFixed(2))));
    saveLibraryStorage(LIB_PREFS_KEY, libPrefs);
    renderPdfBookPage(libCurrentPage);
    if (typeof showToast === 'function') {
      showToast(`🔍 مقاس الصفحة: ${Math.round(libPrefs.pdfZoom * 100)}%`);
    }
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

function initJosourLibrary() {
  loadLibraryStateFromStorage();
  if (!libInitialized) {
    libInitialized = true;
    setLibrarySubView('shelf');
  }
  bindLibraryReaderSwipe();
  bindPdfHighlightPointerEvents();
  renderLibraryCategoryBar();
  renderLibraryBooksGrid();
}
