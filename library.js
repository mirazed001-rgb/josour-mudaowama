/* ═════════════════════════════════════════════════════════════════════
   مكتبة جسور الطلابية وقارئها التفاعلي المدمج — الخطوة الثانية (الإصدار v16)
   التصنيفات السبعة • 11 كتاباً منتقى • أغلفة فنية • مارك بايج أزرق موحّد
   ملاحظات مستقلة لكل صفحة • هايلايت ملون للجمل والفقرات • تتبع التقدم
   ═════════════════════════════════════════════════════════════════════ */

const LIB_BOOKMARK_BLUE = '#0f7b96';
const LIB_PROGRESS_KEY = 'joussour_lib_progress_v1';
const LIB_BOOKMARKS_KEY = 'joussour_lib_bookmarks_v1';
const LIB_NOTES_KEY = 'joussour_lib_notes_v1';
const LIB_HIGHLIGHTS_KEY = 'joussour_lib_highlights_v1';
const LIB_PREFS_KEY = 'joussour_lib_prefs_v1';

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
        title: 'بطاقة الإدراج الكامل (الخطوة الرابعة)',
        paragraphs: [
          'هذه الصفحات ملخص تعريفي وتوجيهي من إعداد مكتبة جسور احتراماً لحقوق التأليف والنشر.',
          'في الخطوة الرابعة سيتم ربط هذا الكتاب بقارئ الملفات المدمج داخل التطبيق لقراءة النسخة الرسمية المأذون بها مع الاحتفاظ بالمارك بايج الأزرق والملاحظات والتظليل.'
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
        title: 'بطاقة الإدراج الكامل (الخطوة الرابعة)',
        paragraphs: [
          'يتضمن هذا العرض محاور الكتاب الأساسية لتكوين خريطة ذهنية واضحة قبل الشروع في القراءة الكاملة.',
          'سيُتاح فتح نسخة القراءة المأذون بها لكتاب رقائق القرآن مباشرة داخل القارئ المدمج في الخطوة الرابعة.'
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
        title: 'بطاقة الإدراج الكامل (الخطوة الرابعة)',
        paragraphs: [
          'يعدّ الرحيق المختوم مرجعاً تأسيسياً متكاملاً لكل طالب في كلية العلوم الإسلامية لضبط وقائع السيرة النبوية وأنساقها الزمنية.',
          'في الخطوة الرابعة سيُدمج مع القارئ التفاعلي لملفات الكتب للوصول إلى النص الكامل داخل التطبيق دون روابط خارجية.'
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
        title: 'بطاقة الإدراج الكامل (الخطوة الرابعة)',
        paragraphs: [
          'يمثّل هذا العرض خريطة لأبرز مضامين كتاب سابغات ليكون عوناً لطلبة العلوم الإسلامية في الحوار الواعي.',
          'في الخطوة الرابعة سيتاح فتح نسخة الكتاب المعتمدة داخل قارئ التطبيق بكل خصائص المارك بايج والملاحظات والهايلايت.'
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
        title: 'بطاقة الإدراج الكامل (الخطوة الرابعة)',
        paragraphs: [
          'تساعد هذه النقاط الموجزة القارئ على تتبّع المراحل الزمنية الكبرى لتاريخ الأندلس قبل مطالعة الكتاب كاملاً.',
          'سيتم تفعيل قراءة ملف الكتاب الرسمي داخل القارئ المدمج في الخطوة الرابعة.'
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
        title: 'بطاقة الإدراج الكامل (الخطوة الرابعة)',
        paragraphs: [
          'تُبرز هذه الورقة المحاور التربوية والإنسانية في أدب السجون كما تمثّلها هذه المذكرات الصادقة.',
          'سيتم تجهيز قراءة النسخة الرسمية المأذون بها داخل قارئ التطبيق عند تنفيذ الخطوة الرابعة.'
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
        title: 'بطاقة الإدراج الكامل (الخطوة الرابعة)',
        paragraphs: [
          'يقدّم هذا الموجز مدخلاً تحليلياً محترماً لحقوق المؤلف والنشر قبل إتاحة القراءة المباشرة.',
          'في الخطوة الرابعة سيعمل القارئ المدمج على فتح نسخة العمل المأذون بها مع حفظ العلامات الزرقاء والملاحظات والتظليل.'
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

let libProgress = {};
let libBookmarks = {};
let libNotes = {};
let libHighlights = {};
let libPrefs = { fontSize: 1.04, nightMode: false };

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

  const prefs = safeParse(LIB_PREFS_KEY, null);
  if (prefs) {
    if (typeof prefs.fontSize === 'number') {
      libPrefs.fontSize = Math.min(1.5, Math.max(0.88, prefs.fontSize));
    }
    libPrefs.nightMode = Boolean(prefs.nightMode);
  }
}

function saveLibraryStorage(key, obj) {
  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch (e) {}
}

function getBookById(bookId) {
  return LIBRARY_BOOKS.find((b) => b.id === bookId) || null;
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
  return LIBRARY_BOOKS.filter((b) => {
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
    const bmCount = libBookmarks[b.id] ? Object.keys(libBookmarks[b.id]).length : 0;
    const noteCount = libNotes[b.id] ? Object.keys(libNotes[b.id]).length : 0;
    const statusParts = [];
    if (lastPg > 0) statusParts.push(`ص ${lastPg}/${b.pages.length}`);
    if (bmCount > 0) statusParts.push(`🔖 ${bmCount}`);
    if (noteCount > 0) statusParts.push(`📝 ${noteCount}`);

    return `
      <button type="button" class="lib-book-card tap-glow" onclick="openBookDetail('${b.id}')">
        <div class="lib-book-cover" style="background: ${b.coverGradient};">
          <span class="lib-book-spine"></span>
          <span class="lib-cover-tag">${b.kind === 'heritage' ? 'تراثي كامل قريباً' : 'معاصر'}</span>
          <div class="lib-cover-icon">${b.coverIcon}</div>
          <div class="lib-cover-title" style="color: ${b.coverAccent};">${escapeLibHtml(b.title)}</div>
          <div class="lib-cover-author">${escapeLibHtml(b.author)}</div>
        </div>
        <div class="lib-book-card-body">
          <div class="lib-book-cat-chip">${escapeLibHtml(b.categoryLabel)}</div>
          <div class="lib-book-desc-mini">${escapeLibHtml(b.description)}</div>
          <div class="lib-book-card-foot">
            <span class="lib-book-read-cta">افتح الكتاب 📖</span>
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

  const savedPage = libProgress[b.id] || 1;
  const hasProgress = Boolean(libProgress[b.id]);
  const bmCount = libBookmarks[b.id] ? Object.keys(libBookmarks[b.id]).length : 0;
  const noteCount = libNotes[b.id] ? Object.keys(libNotes[b.id]).length : 0;
  const hlCount = libHighlights[b.id] ? Object.keys(libHighlights[b.id]).length : 0;

  container.innerHTML = `
    <div class="lib-detail-top">
      <div class="lib-book-cover lib-detail-cover" style="background: ${b.coverGradient};">
        <span class="lib-book-spine"></span>
        <div class="lib-cover-icon" style="font-size: 2rem;">${b.coverIcon}</div>
        <div class="lib-cover-title" style="color: ${b.coverAccent}; font-size: 0.96rem;">${escapeLibHtml(b.title)}</div>
      </div>
      <div class="lib-detail-info">
        <span class="lib-book-cat-chip">${escapeLibHtml(b.categoryLabel)}</span>
        <h3 class="lib-detail-title">${escapeLibHtml(b.title)}</h3>
        <div class="lib-detail-author">✍️ ${escapeLibHtml(b.author)}</div>
        <div class="lib-detail-stats">
          <span>📄 ${b.pages.length} صفحات مفعّلة</span>
          <span>🔖 ${bmCount} علامة</span>
          <span>📝 ${noteCount} ملاحظة</span>
          <span>🖍️ ${hlCount} تظليل</span>
        </div>
      </div>
    </div>
    <p class="lib-detail-desc">${escapeLibHtml(b.description)}</p>
    <button type="button" class="start-duty-btn tap-glow" onclick="openBookReader('${b.id}')">
      ${hasProgress ? `📖 متابعة القراءة (صفحة ${savedPage})` : '📖 ابدأ القراءة الآن'}
    </button>
  `;
}

function backToLibraryShelf() {
  libActiveDrawer = null;
  setLibrarySubView('shelf');
  renderLibraryBooksGrid();
}

function closeBookReader() {
  libActiveDrawer = null;
  if (libCurrentBookId) {
    openBookDetail(libCurrentBookId);
  } else {
    backToLibraryShelf();
  }
}

function openBookReader(bookId) {
  const b = getBookById(bookId);
  if (!b) return;
  libCurrentBookId = bookId;
  const savedPage = libProgress[bookId] || 1;
  libCurrentPage = Math.min(b.pages.length, Math.max(1, savedPage));
  libActiveDrawer = null;
  ['libSavedBmsPop', 'libInlineNoteBox'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  setLibrarySubView('reader');
  renderBookPage(libCurrentPage);
}

function splitBookParagraphIntoSegments(paraText) {
  const parts = String(paraText || '')
    .split(/(?<=[.!؟])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length ? parts : [String(paraText || '')];
}

function applyBookReaderVisualPrefs() {
  const frame = document.getElementById('libReaderPageFrame');
  const content = document.getElementById('libReaderPageContent');
  const nightBtn = document.getElementById('libBtnNight');
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

function renderBookPage(pageNum) {
  const book = getBookById(libCurrentBookId);
  if (!book) return;
  const total = book.pages.length;
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

  if (titleEl) titleEl.textContent = `${book.coverIcon} ${book.title}`;
  if (metaEl) metaEl.textContent = `ص ${target} / ${total} • ${pct}%`;
  if (progressFill) progressFill.style.width = `${pct}%`;
  if (footerLabel) footerLabel.textContent = `صفحة ${target} من ${total}`;
  if (prevBtn) prevBtn.disabled = target <= 1;
  if (nextBtn) nextBtn.disabled = target >= total;

  const pageObj = book.pages[target - 1];
  const bookHls = libHighlights[book.id] || {};

  if (contentEl && pageObj) {
    const paragraphsHtml = pageObj.paragraphs.map((para, pIdx) => {
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
  renderBookPage(pageNum);
}

function prevBookPage() {
  if (libCurrentPage > 1) {
    renderBookPage(libCurrentPage - 1);
    const frame = document.getElementById('libReaderPageFrame');
    if (frame) frame.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function nextBookPage() {
  const book = getBookById(libCurrentBookId);
  if (book && libCurrentPage < book.pages.length) {
    renderBookPage(libCurrentPage + 1);
    const frame = document.getElementById('libReaderPageFrame');
    if (frame) frame.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  const pageObj = book.pages[libCurrentPage - 1];
  libBookmarks[book.id][key] = {
    page: libCurrentPage,
    color: LIB_BOOKMARK_BLUE,
    chapterTitle: pageObj ? pageObj.title : book.title,
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

  const pageObj = book.pages[libCurrentPage - 1];
  libNotes[book.id][key] = {
    page: libCurrentPage,
    text: text,
    chapterTitle: pageObj ? pageObj.title : '',
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
  renderLibraryCategoryBar();
  renderLibraryBooksGrid();
}
