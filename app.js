/* ═════════════════════════════════════════════════════════════════════
   محرك تطبيق مداومة جسور — الخلية والمحراب الأندلسي
   ملف المداوم المرن، الأذكار التفاعلية بالنقرات، البومودورو، والتكافل
   ═════════════════════════════════════════════════════════════════════ */

// ── 1. محرك المؤثرات الصوتية الأندلسية (Web Audio API Synthesizer) ──
class AndalusAudioEngine {
  constructor() {
    this.ctx = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playCeramicClick() {
    try {
      this.initContext();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(820, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1450, this.ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.045);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  }

  playWaterDrop() {
    try {
      this.initContext();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(450, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {}
  }

  playSuccessChime() {
    try {
      this.initContext();
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.25, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.4);
      });
    } catch (e) {}
  }
}

const audio = new AndalusAudioEngine();

// ── 2. أذكار الصباح والمساء الصحيحة مع عدد التكرار الدقيق ──
const AuthenticAdhkar = {
  morning: [
    {
      title: 'آية الكرسي',
      text: '﴿اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ﴾',
      countLabel: 'مرة واحدة',
      targetCount: 1,
      virtue: 'من قالها حين يصبح أُجير من الجن حتى يمسي.'
    },
    {
      title: 'الإخلاص والمعوذتان',
      text: 'سورة الإخلاص، وسورة الفلق، وسورة الناس (قراءة السور الثلاث كاملة).',
      countLabel: '3 مرات',
      targetCount: 3,
      virtue: 'تكفيك من كل شيء.'
    },
    {
      title: 'سيد الاستغفار',
      text: '«اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ».',
      countLabel: 'مرة واحدة',
      targetCount: 1,
      virtue: 'من قالها موقناً بها حين يصبح فمات من يومه دخل الجنة.'
    },
    {
      title: 'استفتاح الصباح والحمد لله',
      text: '«أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ».',
      countLabel: 'مرة واحدة',
      targetCount: 1,
      virtue: 'دعاء جامع ببركة اليوم وحفظه.'
    },
    {
      title: 'إقرار التوحيد والشهادة',
      text: '«اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلاَئِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لاَ إِلَهَ إِلاَّ أَنْتَ وَحْدَكَ لاَ شَرِيكَ لَكَ، وَأَنَّ مُحَمَّداً عَبْدُكَ وَرَسُولُكَ».',
      countLabel: '4 مرات',
      targetCount: 4,
      virtue: 'من قالها حين يصبح أعتقه الله من النار.'
    },
    {
      title: 'شكر نعمة اليوم',
      text: '«اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لاَ شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ».',
      countLabel: 'مرة واحدة',
      targetCount: 1,
      virtue: 'من قالها حين يصبح فقد أدى شكر يومه.'
    },
    {
      title: 'العافية في الدين والدنيا والأهل',
      text: '«اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي، وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي».',
      countLabel: 'مرة واحدة',
      targetCount: 1,
      virtue: 'لم يكن النبي ﷺ يدعهن حين يصبح وحين يمسي.'
    },
    {
      title: 'العافية في السمع والبصر',
      text: '«اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لاَ إِلَهَ إِلاَّ أَنْتَ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ، وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لاَ إِلَهَ إِلاَّ أَنْتَ».',
      countLabel: '3 مرات',
      targetCount: 3,
      virtue: 'حفظ الحواس والبدن من المكاره.'
    },
    {
      title: 'الحفظ التام باسم الله',
      text: '«بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ».',
      countLabel: '3 مرات',
      targetCount: 3,
      virtue: 'لم يضره شيء حتى يمسي.'
    },
    {
      title: 'الرضا بالله والإسلام والرسول',
      text: '«رَضِيتُ بِاللَّهِ رَبّاً، وَبِالإِسْلاَمِ دِيناً، وَبِمُحَمَّدٍ ﷺ نَبِيّاً».',
      countLabel: '3 مرات',
      targetCount: 3,
      virtue: 'كان حقاً على الله أن يرضيه يوم القيامة.'
    },
    {
      title: 'الاستغاثة بالله وإصلاح الشأن',
      text: '«يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلاَ تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ».',
      countLabel: 'مرة واحدة',
      targetCount: 1,
      virtue: 'تفويض الأمر كله للحي القيوم.'
    },
    {
      title: 'الفطرة وكلمة الإخلاص',
      text: '«أَصْبَحْنَا عَلَى فِطْرَةِ الإِسْلاَمِ، وَعَلَى كَلِمَةِ الإِخْلاَصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ ﷺ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفاً مُسْلِماً وَمَا كَانَ مِنَ الْمُشْرِكِينَ».',
      countLabel: 'مرة واحدة',
      targetCount: 1,
      virtue: 'تجديد عهد التوحيد والاستقامة.'
    },
    {
      title: 'التسبيح العظيم المضاعف',
      text: '«سُبْحَانَ اللَّهِ وَبِحَمْدِهِ: عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ».',
      countLabel: '3 مرات',
      targetCount: 3,
      virtue: 'تزن ساعات طويلة من الذكر والعبادة.'
    },
    {
      title: 'كفاية الهموم',
      text: '«حَسْبِيَ اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ».',
      countLabel: '7 مرات',
      targetCount: 7,
      virtue: 'كفاه الله ما أهمه من أمر الدنيا والآخرة.'
    },
    {
      title: 'التسبيح والتهليل والتوبة',
      text: '«سُبْحَانَ اللَّهِ وَبِحَمْدِهِ» (100 مرة) • «لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ» (100 مرة أو 10 مرات) • «أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ» (100 مرة).',
      countLabel: '100 مرة',
      targetCount: 100,
      virtue: 'حطت خطاياه وإن كانت مثل زبد البحر.'
    },
    {
      title: 'الصلاة على النبي ﷺ',
      text: '«اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ».',
      countLabel: '10 مرات',
      targetCount: 10,
      virtue: 'أدركته شفاعة النبي ﷺ يوم القيامة.'
    }
  ],
  evening: [
    {
      title: 'آية الكرسي',
      text: '﴿اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ﴾',
      countLabel: 'مرة واحدة',
      targetCount: 1,
      virtue: 'من قالها حين يمسي أُجير من الجن حتى يصبح.'
    },
    {
      title: 'الإخلاص والمعوذتان',
      text: 'سورة الإخلاص، وسورة الفلق، وسورة الناس (قراءة السور الثلاث كاملة).',
      countLabel: '3 مرات',
      targetCount: 3,
      virtue: 'تكفيك من كل شيء.'
    },
    {
      title: 'سيد الاستغفار',
      text: '«اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ».',
      countLabel: 'مرة واحدة',
      targetCount: 1,
      virtue: 'من قالها موقناً بها حين يمسي فمات من ليلته دخل الجنة.'
    },
    {
      title: 'استفتاح المساء والحمد لله',
      text: '«أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ».',
      countLabel: 'مرة واحدة',
      targetCount: 1,
      virtue: 'دعاء جامع ببركة الليلة وحفظها.'
    },
    {
      title: 'العياذ بكلمات الله التامات',
      text: '«أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ».',
      countLabel: '3 مرات',
      targetCount: 3,
      virtue: 'لم تضره حمة (سم أو لدغة) في تلك الليلة.'
    },
    {
      title: 'إقرار التوحيد والشهادة',
      text: '«اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلاَئِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لاَ إِلَهَ إِلاَّ أَنْتَ وَحْدَكَ لاَ شَرِيكَ لَكَ، وَأَنَّ مُحَمَّداً عَبْدُكَ وَرَسُولُكَ».',
      countLabel: '4 مرات',
      targetCount: 4,
      virtue: 'من قالها حين يمسي أعتقه الله من النار.'
    },
    {
      title: 'شكر نعمة المساء',
      text: '«اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لاَ شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ».',
      countLabel: 'مرة واحدة',
      targetCount: 1,
      virtue: 'من قالها حين يمسي فقد أدى شكر ليلته.'
    },
    {
      title: 'العافية في الدين والدنيا والأهل',
      text: '«اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي، وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي».',
      countLabel: 'مرة واحدة',
      targetCount: 1,
      virtue: 'حفظ شامل وستر من كل الجهات.'
    },
    {
      title: 'الحفظ التام باسم الله',
      text: '«بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ».',
      countLabel: '3 مرات',
      targetCount: 3,
      virtue: 'لم يضره شيء حتى يصبح.'
    },
    {
      title: 'الرضا بالله والإسلام والرسول',
      text: '«رَضِيتُ بِاللَّهِ رَبّاً، وَبِالإِسْلاَمِ دِيناً، وَبِمُحَمَّدٍ ﷺ نَبِيّاً».',
      countLabel: '3 مرات',
      targetCount: 3,
      virtue: 'كان حقاً على الله أن يرضيه يوم القيامة.'
    },
    {
      title: 'الاستغاثة بالله وإصلاح الشأن',
      text: '«يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلاَ تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ».',
      countLabel: 'مرة واحدة',
      targetCount: 1,
      virtue: 'دعاء النبي ﷺ لابنته فاطمة رضي الله عنها.'
    },
    {
      title: 'الفطرة وكلمة الإخلاص',
      text: '«أَمْسَيْنَا عَلَى فِطْرَةِ الإِسْلاَمِ، وَعَلَى كَلِمَةِ الإِخْلاَصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ ﷺ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفاً مُسْلِماً وَمَا كَانَ مِنَ الْمُشْرِكِينَ».',
      countLabel: 'مرة واحدة',
      targetCount: 1,
      virtue: 'الثبات على ملة الإسلام الخالصة.'
    },
    {
      title: 'كفاية الهموم',
      text: '«حَسْبِيَ اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ».',
      countLabel: '7 مرات',
      targetCount: 7,
      virtue: 'كفاه الله ما أهمه من أمر الدنيا والآخرة.'
    },
    {
      title: 'التسبيح والتهليل والتوبة',
      text: '«سُبْحَانَ اللَّهِ وَبِحَمْدِهِ» (100 مرة) • «لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ» (100 مرة أو 10 مرات) • «أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ» (100 مرة).',
      countLabel: '100 مرة',
      targetCount: 100,
      virtue: 'أعظم الأعمال أجراً يوم القيامة.'
    },
    {
      title: 'الصلاة على النبي ﷺ',
      text: '«اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ».',
      countLabel: '10 مرات',
      targetCount: 10,
      virtue: 'أدركته شفاعة النبي ﷺ يوم القيامة.'
    }
  ]
};

// ── 3. إدارة حالة التطبيق وملف المداوم الشخصي ──
const DutyState = {
  activeScreen: 'screen-cockpit',
  dutyActive: false,
  dutyStartTime: null,
  dutyTimerInterval: null,
  dutyElapsedSeconds: 0,
  
  // الملف الشخصي المبسط للمداوم
  userProfile: {
    fullName: ''
  },

  // تقدم الأذكار التفاعلية بالنقر
  dhikrCounts: {},

  // البومودورو
  pomodoroMinutes: 25,
  pomodoroSeconds: 0,
  pomodoroRunning: false,
  pomodoroInterval: null,
  currentBook: '',

  // المسبحة العامة
  tasbihCount: 0,

  // قائمة التكافل (متزامنة سحابياً عبر Firestore)
  takafulRequests: [],

  // كبسولات المداومة (تتزامن سحابياً عبر Firestore)
  capsules: [],

  // سجل الملاحظات والمواقف السريعة
  quickNotes: []
};

// ── 3. إدارة تثبيت التطبيق المستقل (PWA Installation) ──
let deferredPwaPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPwaPrompt = e;
  const banner = document.getElementById('pwaInstallBanner');
  if (banner) banner.style.display = 'flex';
});

window.addEventListener('appinstalled', () => {
  deferredPwaPrompt = null;
  const banner = document.getElementById('pwaInstallBanner');
  if (banner) banner.style.display = 'none';
  showToast('🎉 مبروك! تم تثبيت تطبيق مداومة جسور بنجاح');
});

function triggerPwaInstall() {
  if (deferredPwaPrompt) {
    deferredPwaPrompt.prompt();
    deferredPwaPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        showToast('🎉 تم قبول التثبيت بنجاح!');
      }
      deferredPwaPrompt = null;
      const banner = document.getElementById('pwaInstallBanner');
      if (banner) banner.style.display = 'none';
    });
  } else {
    openModal();
    const title = document.getElementById('modalShiftTitle');
    const body = document.getElementById('modalShiftBody');
    if (title) title.textContent = '📲 طريقة تثبيت التطبيق على هاتفك';
    if (body) {
      body.innerHTML = `
        <div style="text-align: right; font-size: 0.88rem; color: var(--ink-primary); line-height: 1.6;">
          <p style="margin-bottom: 10px; color: var(--lapis-deep); font-weight: bold;">
            لتثبيت التطبيق على شاشة هاتفك الرئيسية:
          </p>
          <div style="background: var(--surface-soft); border: 1px solid rgba(15, 123, 150, 0.3); padding: 10px 12px; border-radius: 10px; margin-bottom: 8px;">
            <strong style="color: var(--lapis-deep);">🤖 لهواتف أندرويد (Chrome):</strong><br>
            1. اضغط على زر القائمة (النقاط الثلاث <strong>⋮</strong>) في أعلى يمين المتصفح.<br>
            2. اختر <strong style="color: var(--gold-deep);">«تثبيت التطبيق» (Install app)</strong> أو <strong style="color: var(--gold-deep);">«إضافة إلى الشاشة الرئيسية»</strong>.<br>
            3. <em>ملاحظة لهواتف شاومي/ريدمي/أوبو:</em> تأكد من أن إذن "اختصارات الشاشة الرئيسية" مفعّل لمتصفح Chrome في إعدادات التطبيقات بالهاتف.
          </div>
          <div style="background: var(--surface-soft); border: 1px solid rgba(19, 122, 91, 0.3); padding: 10px 12px; border-radius: 10px; margin-bottom: 12px;">
            <strong style="color: var(--emerald-deep);">🍏 لهواتف آيفون (Safari):</strong><br>
            1. اضغط على زر المشاركة <strong>⎋</strong> أسفل الشاشة.<br>
            2. اختر <strong style="color: var(--gold-deep);">«إضافة إلى الصفحة الرئيسية» (Sur l'écran d'accueil)</strong>.
          </div>
          <button onclick="closeModal()" class="focus-btn focus-btn-primary" style="width: 100%;">
            حسناً، فهمت ذلك 👍
          </button>
        </div>
      `;
    }
  }
}

// ── 4. تهيئة التطبيق عند اكتمال التحميل ──
document.addEventListener('DOMContentLoaded', () => {
  loadCapsules();
  loadDutyScheduleCache();
  loadDutyConfirmations();
  loadTakafulRequests();
  loadQuickNotes();
  loadUserProfile();
  setupNavigation();
  setupClickGlowAndSounds();
  renderFullAdhkar();
  renderDutyHomeHub();
  renderTakafulList();
  renderCapsules();
  initDutyScheduleSync();
  initDutyConfirmationsSync();
  initCapsulesCloudSync();
  initTakafulCloudSync();
  renderQuickNotes();
  initProtocolChecklists();

  setInterval(() => {
    if (!dutyScheduleEditMode) {
      renderDutyHomeHub();
    }
  }, 60000);

  if ('serviceWorker' in navigator) {
    let swRefreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!swRefreshing) {
        swRefreshing = true;
        window.location.reload();
      }
    });
    navigator.serviceWorker.register('./sw.js?v=35').then((reg) => {
      if (reg && reg.update) reg.update().catch(() => {});
    }).catch(() => {});
  }
});

function setupNavigation() {
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetScreen = btn.getAttribute('data-screen');
      switchScreen(targetScreen);
    });
  });
}

function switchScreen(screenId) {
  audio.playCeramicClick();
  const normalizedScreen = screenId === 'screen-takaful' ? 'screen-cockpit' : screenId;
  DutyState.activeScreen = normalizedScreen;

  document.querySelectorAll('.view-screen').forEach(scr => {
    scr.classList.remove('active');
  });
  const activeScr = document.getElementById(normalizedScreen);
  if (activeScr) {
    activeScr.classList.add('active');
  }

  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-screen') === normalizedScreen) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (normalizedScreen === 'screen-library' && typeof initMushafWarsh === 'function') {
    initMushafWarsh();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupClickGlowAndSounds() {
  document.addEventListener('click', (e) => {
    const clickable = e.target.closest('.tap-glow, button, .sound-pill, .quick-portal-link');
    if (clickable) {
      audio.playCeramicClick();
      clickable.classList.add('glow-active');
      setTimeout(() => {
        clickable.classList.remove('glow-active');
      }, 250);
    }
  });
}

// ── 5. الملف الشخصي للمداوم وحفظ الاسم الكريم ──
function loadUserProfile() {
  const saved = localStorage.getItem('joussour_duty_user_profile_v2');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed.fullName === 'string') {
        DutyState.userProfile.fullName = parsed.fullName;
      }
    } catch (e) {}
  }

  const nameInput = document.getElementById('profileFullNameInput');
  if (nameInput && DutyState.userProfile.fullName) {
    nameInput.value = DutyState.userProfile.fullName;
  }

  updateProfileBadgeUI();
}

function saveUserProfile() {
  const nameInput = document.getElementById('profileFullNameInput');
  const fullName = nameInput ? nameInput.value.trim() : '';
  if (!fullName) {
    showToast('⚠️ يرجى كتابة اسمك الكريم لتثبيت ملفك');
    return;
  }

  DutyState.userProfile = { fullName: fullName };
  localStorage.setItem('joussour_duty_user_profile_v2', JSON.stringify(DutyState.userProfile));

  updateProfileBadgeUI();
  if (typeof renderDutyHomeHub === 'function') renderDutyHomeHub();
  audio.playSuccessChime();
  showToast(`✨ مرحباً بك يا ${fullName}! تم حفظ اسمك بنجاح.`);
  switchScreen('screen-cockpit');
}

function updateProfileBadgeUI() {
  const badgeNameEl = document.getElementById('topProfileNameDisplay');
  const badgeShiftEl = document.getElementById('topProfileShiftDisplay');

  const name = DutyState.userProfile.fullName || 'أخي المداوم، أختي المداومة';
  if (badgeNameEl) badgeNameEl.textContent = name;
  if (badgeShiftEl) badgeShiftEl.textContent = 'مقر نادي جسور • كلية العلوم الإسلامية 🕌';
}

// ── 7. قمرة المداومة الحية والمؤقت ──
function toggleDutyState() {
  const btn = document.getElementById('startDutyToggleBtn');
  const btnText = document.getElementById('startDutyBtnText');
  const statusVal = document.getElementById('dutyStatusVal');

  if (!DutyState.dutyActive) {
    DutyState.dutyActive = true;
    DutyState.dutyStartTime = new Date();
    btn.classList.add('duty-running');
    btnText.textContent = 'المداومة جارية • إنهاء المناوبة';
    if (statusVal) {
      statusVal.textContent = 'قيد المداومة 🟢';
      statusVal.style.color = 'var(--foliage-mint)';
    }

    DutyState.dutyTimerInterval = setInterval(updateDutyTimer, 1000);
    audio.playSuccessChime();
    showToast('🟢 بدأت المداومة على بركة الله، نسأل الله لك التوفيق والأجر');
  } else {
    DutyState.dutyActive = false;
    clearInterval(DutyState.dutyTimerInterval);
    btn.classList.remove('duty-running');
    btnText.textContent = 'ابدأ المداومة ✨';
    if (statusVal) {
      statusVal.textContent = 'غير نشطة ⚪';
      statusVal.style.color = 'var(--sun-gold-bright)';
    }
    audio.playCeramicClick();
    openReportReminderModal();
  }
}

function updateDutyTimer() {
  DutyState.dutyElapsedSeconds++;
  const hours = Math.floor(DutyState.dutyElapsedSeconds / 3600);
  const minutes = Math.floor((DutyState.dutyElapsedSeconds % 3600) / 60);
  const seconds = DutyState.dutyElapsedSeconds % 60;
  const timeStr = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  const timerEl = document.getElementById('dutyLiveTimeEl');
  if (timerEl) timerEl.textContent = timeStr;
}

function pad(num) {
  return num < 10 ? '0' + num : num;
}

// ── 8. مؤقت بومودورو الأندلسي وإشعار الخلوة المعرفية ──
function togglePomodoro() {
  const toggleBtn = document.getElementById('pomodoroToggleBtn');
  if (!DutyState.pomodoroRunning) {
    DutyState.pomodoroRunning = true;
    toggleBtn.textContent = 'إيقاف مؤقت ⏸️';
    DutyState.pomodoroInterval = setInterval(runPomodoroTick, 1000);
    audio.playCeramicClick();
  } else {
    DutyState.pomodoroRunning = false;
    toggleBtn.textContent = 'استئناف 📖';
    clearInterval(DutyState.pomodoroInterval);
  }
}

function resetPomodoro() {
  DutyState.pomodoroRunning = false;
  clearInterval(DutyState.pomodoroInterval);
  DutyState.pomodoroMinutes = 25;
  DutyState.pomodoroSeconds = 0;
  updatePomodoroDisplay();
  const toggleBtn = document.getElementById('pomodoroToggleBtn');
  if (toggleBtn) toggleBtn.textContent = 'ابدأ الجلسة ⏱️';
}

function runPomodoroTick() {
  if (DutyState.pomodoroSeconds === 0) {
    if (DutyState.pomodoroMinutes === 0) {
      clearInterval(DutyState.pomodoroInterval);
      DutyState.pomodoroRunning = false;
      audio.playSuccessChime();
      showToast('🎉 ما شاء الله! أتممت جلسة مدارسة مباركة بنجاح، خذ استراحة قصيرة.');
      resetPomodoro();
      return;
    }
    DutyState.pomodoroMinutes--;
    DutyState.pomodoroSeconds = 59;
  } else {
    DutyState.pomodoroSeconds--;
  }
  updatePomodoroDisplay();
}

function updatePomodoroDisplay() {
  const digitsEl = document.getElementById('pomodoroDigits');
  if (digitsEl) {
    digitsEl.textContent = `${pad(DutyState.pomodoroMinutes)}:${pad(DutyState.pomodoroSeconds)}`;
  }
}

function broadcastFocusNotification() {
  // دالة موحدة تُستدعى بواسطة broadcastFocusNotificationAsync
  broadcastFocusNotificationAsync();
}

// ── ربط البث المباشر بمجموعة تيليجرام (نُشَطَاء جُسُور |7|) ──
const JOSSOUR_TELEGRAM = {
  botToken: '8631448157:AAGLQf8tMqltXPdCmRw3fTY6m5NBELlwLqE',
  groupId: '-1002534160494',
  appUrl: 'https://mirazed001-rgb.github.io/josour-mudaowama/'
};

async function sendTelegramGroupNotification(messageHtml) {
  try {
    const url = `https://api.telegram.org/bot${JOSSOUR_TELEGRAM.botToken}/sendMessage`;
    const payload = {
      chat_id: JOSSOUR_TELEGRAM.groupId,
      text: messageHtml,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '📲 فتح تطبيق المداومة',
              url: JOSSOUR_TELEGRAM.appUrl
            }
          ]
        ]
      }
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    return data && data.ok === true;
  } catch (err) {
    console.error('Error sending Telegram notification:', err);
    return false;
  }
}

async function broadcastFocusNotificationAsync() {
  const bookInput = document.getElementById('bookTitleInput');
  const rawBook = bookInput ? bookInput.value.trim() : '';
  if (!rawBook) {
    showToast('📖 يرجى كتابة اسم الكتاب الذي تدرسه أولاً');
    if (bookInput) bookInput.focus();
    return;
  }

  const bookName = rawBook;
  const userName = (DutyState.userProfile && DutyState.userProfile.fullName && DutyState.userProfile.fullName.trim())
    ? DutyState.userProfile.fullName.trim()
    : 'أحد الرفاق المداومين';

  const notifyBtn = document.getElementById('focusNotifyBtn');
  if (notifyBtn) {
    notifyBtn.disabled = true;
    notifyBtn.style.opacity = '0.7';
    notifyBtn.textContent = 'جاري الإرسال... ⏳';
  }

  audio.playSuccessChime();
  showToast('📖 جاري إرسال إشعار الخلوة المعرفية إلى نشطاء جسور 8...');

  const tgMessage = `📖 <b>إشعار الخلوة المعرفية</b> 🤫\n\n` +
    `👤 <b>المداوم(ة):</b> ${escapeHtml(userName)}\n` +
    `📚 أدرس الآن كتاب: <b>«${escapeHtml(bookName)}»</b>، فالرجاء الالتزام بالهدوء.\n\n` +
    `🌿 <i>«من سلك طريقاً يلتمس فيه علماً سهّل الله له به طريقاً إلى الجنة»</i>`;

  const success = await sendTelegramGroupNotification(tgMessage);

  if (notifyBtn) {
    setTimeout(() => {
      notifyBtn.disabled = false;
      notifyBtn.style.opacity = '1';
      notifyBtn.textContent = 'إشعار الخلوة المعرفية 📢';
    }, 3500);
  }

  if (success) {
    showToast(`✨ تم إرسال إشعار الخلوة المعرفية لمجموعة «نُشَطَاء جُسُور |8|» بنجاح 📢`);
  } else {
    showToast(`📖 تعذر الإرسال لتيليجرام، يرجى التحقق من اتصال الإنترنت`);
  }
}

// ── 9. أصوات الهدوء للقراءة والتركيز (ملفات صوتية مباشرة بدون مرئيات) ──
const ASMR_AUDIO_TRACKS = {
  fire: {
    src: './asmr_fire.mp3?v=6',
    title: '🔥 صوت نار الحطب الدافئ',
    toast: '🔥 تشغيل صوت نار الحطب للقراءة والتركيز'
  },
  trees: {
    src: './asmr_trees.mp3?v=6',
    title: '🌳 صوت الشجر والنسيم العليل',
    toast: '🌳 تشغيل صوت الشجر والنسيم للقراءة والتركيز'
  }
};
let currentAsmrSound = null;

function setAsmrVolume(val) {
  const audioEl = document.getElementById('asmrAudioEl');
  const slider = document.getElementById('asmrVolumeSlider');
  const numeric = Math.max(0, Math.min(100, Number(val)));
  if (audioEl) {
    audioEl.volume = numeric / 100;
  }
  if (slider && String(slider.value) !== String(numeric)) {
    slider.value = numeric;
  }
}

function toggleAmbientSound(soundType) {
  const track = ASMR_AUDIO_TRACKS[soundType];
  if (!track) return;

  if (currentAsmrSound === soundType) {
    stopAmbientSound();
    return;
  }

  currentAsmrSound = soundType;
  document.querySelectorAll('.asmr-pill').forEach(p => {
    if (p.getAttribute('data-sound') === soundType) {
      p.classList.add('active');
    } else {
      p.classList.remove('active');
    }
  });

  const audioBar = document.getElementById('asmrAudioBar');
  const audioEl = document.getElementById('asmrAudioEl');
  const nowPlaying = document.getElementById('asmrNowPlaying');
  const slider = document.getElementById('asmrVolumeSlider');

  if (nowPlaying) {
    nowPlaying.textContent = track.title;
  }
  if (audioBar) {
    audioBar.style.display = 'block';
  }
  if (audioEl) {
    audioEl.pause();
    audioEl.src = track.src;
    audioEl.loop = true;
    const vol = slider ? Number(slider.value) : 75;
    audioEl.volume = Math.max(0, Math.min(1, vol / 100));
    audioEl.load();
    const playPromise = audioEl.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch((err) => {
        console.warn('ASMR audio play blocked:', err);
      });
    }
  }

  showToast(track.toast);
}

function stopAmbientSound() {
  currentAsmrSound = null;
  document.querySelectorAll('.asmr-pill').forEach(p => p.classList.remove('active'));
  const audioBar = document.getElementById('asmrAudioBar');
  const audioEl = document.getElementById('asmrAudioEl');
  if (audioEl) {
    audioEl.pause();
    audioEl.currentTime = 0;
  }
  if (audioBar) {
    audioBar.style.display = 'none';
  }
  showToast('🔇 تم إيقاف صوت السكينة');
}

// ── 10. لوحة الملاحظات والمواقف السريعة ──
function loadQuickNotes() {
  const saved = localStorage.getItem('joussour_duty_quick_notes_v1');
  if (saved) {
    try {
      DutyState.quickNotes = JSON.parse(saved);
    } catch (e) {
      DutyState.quickNotes = [];
    }
  }
}

function saveQuickNotesToStorage() {
  localStorage.setItem('joussour_duty_quick_notes_v1', JSON.stringify(DutyState.quickNotes));
}

function renderQuickNotes() {
  const section = document.getElementById('savedQuickNotesSection');
  const container = document.getElementById('savedQuickNotesContainer');
  if (!section || !container) return;

  if (!DutyState.quickNotes || DutyState.quickNotes.length === 0) {
    section.style.display = 'none';
    container.innerHTML = '';
    return;
  }

  section.style.display = 'block';
  container.innerHTML = '';

  DutyState.quickNotes.forEach(note => {
    const item = document.createElement('div');
    item.className = 'quick-note-item tap-glow';
    item.innerHTML = `
      <div class="quick-note-text">
        <span class="quick-note-time">[${note.time}]</span>
        ${escapeHtml(note.text)}
      </div>
      <div style="display: flex; gap: 4px; align-items: center; flex-shrink: 0;">
        <button onclick="copyQuickNote('${escapeHtml(note.text).replace(/'/g, "\\'")}')" class="quick-note-btn" title="نسخ الملاحظة">
          نسخ 📋
        </button>
        <button onclick="deleteQuickNote(${note.id})" class="capsule-delete-btn" title="حذف الملاحظة">
          🗑️
        </button>
      </div>
    `;
    container.appendChild(item);
  });
}

function saveQuickNote() {
  const noteInput = document.getElementById('dutyQuickNoteInput');
  const text = noteInput.value.trim();
  if (!text) {
    showToast('⚠️ يرجى كتابة ملاحظتك أولاً');
    return;
  }

  const now = new Date();
  const timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');

  DutyState.quickNotes.unshift({
    id: Date.now(),
    text: text,
    time: timeStr
  });

  saveQuickNotesToStorage();
  renderQuickNotes();
  noteInput.value = '';
  audio.playSuccessChime();
  showToast('📝 حُفظت الملاحظة في سجلك اليومي بنجاح، وتظهر أدناه!');
}

function deleteQuickNote(id) {
  DutyState.quickNotes = DutyState.quickNotes.filter(n => n.id !== id);
  saveQuickNotesToStorage();
  renderQuickNotes();
  audio.playCeramicClick();
  showToast('🗑️ تم حذف الملاحظة من السجل.');
}

function copyQuickNote(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      audio.playCeramicClick();
      showToast('📋 تم نسخ الملاحظة بنجاح، يمكنك لصقها في التقرير');
    }).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function copyAllQuickNotes() {
  if (!DutyState.quickNotes || DutyState.quickNotes.length === 0) return;
  const fullText = DutyState.quickNotes.map((n, i) => `${i + 1}. [${n.time}] ${n.text}`).join('\n');
  copyQuickNote(fullText);
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  audio.playCeramicClick();
  showToast('📋 تم نسخ الملاحظة للحافظة');
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function startVoiceRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showToast('⚠️ خاصية تحويل الصوت إلى نص غير مدعومة في متصفحك الحالي، يمكنك الكتابة يدوياً');
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'ar-SA';
  recognition.continuous = false;
  recognition.interimResults = false;

  showToast('🎙️ استمع إليك الآن... تفضل بالحديث');

  recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript;
    const noteInput = document.getElementById('dutyQuickNoteInput');
    if (noteInput) {
      noteInput.value = (noteInput.value ? noteInput.value + ' ' : '') + speechResult;
    }
    audio.playSuccessChime();
    showToast('✅ تم تحويل صوتك إلى نص عربي بنجاح');
  };

  recognition.onerror = () => {
    showToast('⚠️ تعذر التقاط الصوت بدقة، يرجى المحاولة ثانية');
  };

  recognition.start();
}

// ── تهيئة Firebase المشتركة (مشروع josour-moidat) ──
const CAPSULES_FIREBASE_CONFIG = {
  apiKey: "AIzaSyCWdABh8Ho-J5hjF-1AqnAY2gU37vj3HX4",
  authDomain: "josour-moidat.firebaseapp.com",
  projectId: "josour-moidat",
  storageBucket: "josour-moidat.firebasestorage.app",
  messagingSenderId: "197055937924",
  appId: "1:197055937924:web:1521af748b33b8d99531d1"
};
let sharedFirestoreDb = null;

function getSharedFirestoreDb() {
  if (sharedFirestoreDb) return sharedFirestoreDb;
  if (typeof firebase === 'undefined' || !firebase.firestore) return null;
  try {
    if (!firebase.apps || firebase.apps.length === 0) {
      firebase.initializeApp(CAPSULES_FIREBASE_CONFIG);
    }
    sharedFirestoreDb = firebase.firestore();
    return sharedFirestoreDb;
  } catch (err) {
    console.error('Firebase init error:', err);
    return null;
  }
}

// ── 11. جدول المداومة الحي + تأكيد المداوم التالي + طلبات البدائل المرتبطة بالجدول وتيليجرام ──
const DUTY_SCHEDULE_FIREBASE_CONFIG = {
  apiKey: "AIzaSyAYdprBxSxDf_2mUve4EY7t5jDgo_2_Lb4",
  authDomain: "josour-djard.firebaseapp.com",
  projectId: "josour-djard",
  storageBucket: "josour-djard.firebasestorage.app",
  messagingSenderId: "830517852419",
  appId: "1:830517852419:web:80eb5c821346aedc63d136"
};

const DEFAULT_WEEKLY_SCHEDULE = [
  { day: 'السبت', morning: { primary: 'أكرم رزقي', username: 'A_rezgui', assistant: 'هديل' }, evening: { primary: 'إسراء جزيري', username: 'Israadjeziri', assistant: 'أكرم' } },
  { day: 'الأحد', morning: { primary: 'آية', username: 'Ayazaidi', assistant: '---' }, evening: { primary: 'عضو مداوم', username: '', assistant: '---' } },
  { day: 'الإثنين', morning: { primary: 'أكرم', username: 'A_rezgui', assistant: 'سلسبيل' }, evening: { primary: 'إكرام', username: 'ikramezerigui', assistant: '---' } },
  { day: 'الثلاثاء', morning: { primary: 'عضو مداوم', username: '', assistant: '---' }, evening: { primary: 'عضو مداوم', username: '', assistant: '---' } },
  { day: 'الأربعاء', morning: { primary: '', username: '', assistant: '---' }, evening: { primary: 'هديل جباري', username: 'Djbhdl', assistant: '---' } },
  { day: 'الخميس', morning: { primary: 'مريم راشدي', username: 'Mrq6020', assistant: '---' }, evening: { primary: 'مريم راشدي', username: 'Mrq6020', assistant: '---' } }
];

const DUTY_ARABIC_DAYS = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const DUTY_SCHEDULE_CACHE_KEY = 'joussour_weekly_schedule_cache_v1';
const DUTY_CONFIRMATIONS_LOCAL_KEY = 'joussour_duty_confirmations_v1';
const TAKAFUL_LOCAL_KEY = 'joussour_takaful_requests_v2';

let scheduleFirestoreDb = null;
let dutyScheduleUnsub = null;
let dutyConfirmationsUnsub = null;
let takafulUnsub = null;
let isSubmittingTakaful = false;
let isConfirmingDutyShift = false;

let weeklyDutySchedule = JSON.parse(JSON.stringify(DEFAULT_WEEKLY_SCHEDULE));
let dutyConfirmationsMap = {};
let dutySelectedDayIndex = Math.max(0, DEFAULT_WEEKLY_SCHEDULE.findIndex(d => d.day === DUTY_ARABIC_DAYS[new Date().getDay()]));
let dutyShowAllDays = false;
let dutyScheduleEditMode = false;
let pendingExcuseShiftContext = null;

function getScheduleFirestoreDb() {
  if (scheduleFirestoreDb) return scheduleFirestoreDb;
  if (typeof firebase === 'undefined' || !firebase.firestore) return null;
  try {
    let secApp = Array.isArray(firebase.apps)
      ? firebase.apps.find((a) => a && a.name === 'josourScheduleApp')
      : null;
    if (!secApp) {
      secApp = firebase.initializeApp(DUTY_SCHEDULE_FIREBASE_CONFIG, 'josourScheduleApp');
    }
    scheduleFirestoreDb = secApp.firestore();
    return scheduleFirestoreDb;
  } catch (err) {
    console.warn('Schedule Firebase init warning:', err);
    return null;
  }
}

function formatDateKey(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDisplayDateShort(dateObj) {
  const d = String(dateObj.getDate()).padStart(2, '0');
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const y = dateObj.getFullYear();
  return `${d}/${m}/${y}`;
}

function buildShiftDocId(dateObj, shiftKey) {
  return `${formatDateKey(dateObj)}_${shiftKey}`;
}

function getNextDateForShift(dayName, shiftKey, now = new Date()) {
  const base = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDayNum = DUTY_ARABIC_DAYS.indexOf(dayName);
  if (targetDayNum < 0) return base;
  let diff = targetDayNum - base.getDay();
  if (diff < 0) diff += 7;
  const endMins = shiftKey === 'morning' ? (12 * 60 + 45) : (15 * 60 + 30);
  const nowMins = now.getHours() * 60 + now.getMinutes();
  if (diff === 0 && nowMins >= endMins) {
    diff = 7;
  }
  base.setDate(base.getDate() + diff);
  return base;
}

function getDutyShiftSlotInfo(dayName, shiftKey) {
  const dayEntry = (weeklyDutySchedule || []).find((d) => d.day === dayName);
  const raw = dayEntry && dayEntry[shiftKey] ? dayEntry[shiftKey] : {};
  const primary = String(raw.primary || '').trim();
  const username = String(raw.username || '').trim().replace(/^@/, '');
  const assistant = String(raw.assistant || '---').trim() || '---';
  return {
    primary: primary || 'غير معيّن بعد',
    hasNamedMember: Boolean(primary && primary !== '---'),
    username,
    assistant,
    timeRange: shiftKey === 'morning' ? '08:30 – 12:45' : '12:30 – 15:30',
    shiftArabic: shiftKey === 'morning' ? 'الفترة الصباحية' : 'الفترة المسائية'
  };
}

function resolveEffectiveShiftState(slotObj) {
  if (!slotObj) return null;
  const conf = dutyConfirmationsMap[slotObj.shiftDocId] || null;
  let activeMember = slotObj.primary;
  if (conf && conf.status === 'covered' && conf.coveredBy) {
    activeMember = conf.coveredBy;
  }
  return {
    ...slotObj,
    confirmation: conf,
    effectiveMember: activeMember
  };
}

function computeCurrentAndNextShift(now = new Date()) {
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const todayName = DUTY_ARABIC_DAYS[now.getDay()];
  const todayHasSchedule = (weeklyDutySchedule || []).some((d) => d.day === todayName);

  let currentSlot = null;
  if (todayHasSchedule) {
    if (nowMins >= (8 * 60 + 30) && nowMins < (12 * 60 + 45)) {
      const dateObj = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const info = getDutyShiftSlotInfo(todayName, 'morning');
      currentSlot = {
        shiftDocId: buildShiftDocId(dateObj, 'morning'),
        dateObj,
        dayName: todayName,
        shiftKey: 'morning',
        isToday: true,
        ...info
      };
    } else if (nowMins >= (12 * 60 + 45) && nowMins < (15 * 60 + 30)) {
      const dateObj = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const info = getDutyShiftSlotInfo(todayName, 'evening');
      currentSlot = {
        shiftDocId: buildShiftDocId(dateObj, 'evening'),
        dateObj,
        dayName: todayName,
        shiftKey: 'evening',
        isToday: true,
        ...info
      };
    }
  }

  let nextSlot = null;
  for (let offset = 0; offset <= 7 && !nextSlot; offset++) {
    const candidateDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);
    const dName = DUTY_ARABIC_DAYS[candidateDate.getDay()];
    const hasDay = (weeklyDutySchedule || []).some((d) => d.day === dName);
    if (!hasDay) continue;

    for (const shiftKey of ['morning', 'evening']) {
      const startActiveMins = shiftKey === 'morning' ? (8 * 60 + 30) : (12 * 60 + 45);
      if (offset === 0 && nowMins >= startActiveMins) continue;
      const info = getDutyShiftSlotInfo(dName, shiftKey);
      nextSlot = {
        shiftDocId: buildShiftDocId(candidateDate, shiftKey),
        dateObj: candidateDate,
        dayName: dName,
        shiftKey,
        isToday: offset === 0,
        isTomorrow: offset === 1,
        ...info
      };
      break;
    }
  }

  return {
    now,
    todayName,
    nowMins,
    current: resolveEffectiveShiftState(currentSlot),
    next: resolveEffectiveShiftState(nextSlot)
  };
}

function loadDutyScheduleCache() {
  try {
    const raw = localStorage.getItem(DUTY_SCHEDULE_CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) {
        weeklyDutySchedule = parsed;
      }
    }
  } catch (e) {}
}

function saveDutyScheduleCache() {
  try {
    localStorage.setItem(DUTY_SCHEDULE_CACHE_KEY, JSON.stringify(weeklyDutySchedule));
  } catch (e) {}
}

function loadDutyConfirmations() {
  try {
    const raw = localStorage.getItem(DUTY_CONFIRMATIONS_LOCAL_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        dutyConfirmationsMap = parsed;
      }
    }
  } catch (e) {}
}

function saveDutyConfirmations() {
  try {
    localStorage.setItem(DUTY_CONFIRMATIONS_LOCAL_KEY, JSON.stringify(dutyConfirmationsMap || {}));
  } catch (e) {}
}

function updateDutyScheduleSyncBadge(state) {
  const badge = document.getElementById('dutyScheduleSyncBadge');
  if (!badge) return;
  badge.classList.remove('synced', 'offline');
  if (state === 'synced') {
    badge.classList.add('synced');
    badge.textContent = '☁️ جدول حي متزامن';
  } else if (state === 'offline') {
    badge.classList.add('offline');
    badge.textContent = '📴 جدول محلي';
  } else {
    badge.textContent = '☁️ جاري المزامنة...';
  }
}

function initDutyScheduleSync() {
  const sdb = getScheduleFirestoreDb();
  if (!sdb) {
    updateDutyScheduleSyncBadge('offline');
    renderDutyHomeHub();
    return;
  }
  updateDutyScheduleSyncBadge('syncing');
  if (dutyScheduleUnsub) dutyScheduleUnsub();
  try {
    dutyScheduleUnsub = sdb
      .collection('duty_schedules')
      .doc('current_schedule')
      .onSnapshot((doc) => {
        if (doc.exists && doc.data() && Array.isArray(doc.data().schedule) && doc.data().schedule.length) {
          weeklyDutySchedule = doc.data().schedule;
          saveDutyScheduleCache();
        }
        updateDutyScheduleSyncBadge('synced');
        if (!dutyScheduleEditMode) {
          renderDutyHomeHub();
        }
      }, (err) => {
        console.warn('Schedule Firestore snapshot warning:', err);
        updateDutyScheduleSyncBadge('offline');
        renderDutyHomeHub();
      });
  } catch (err) {
    console.warn('Schedule Firestore listener setup warning:', err);
    updateDutyScheduleSyncBadge('offline');
  }
}

function initDutyConfirmationsSync() {
  const db = getSharedFirestoreDb();
  if (!db) {
    renderDutyHomeHub();
    return;
  }
  if (dutyConfirmationsUnsub) dutyConfirmationsUnsub();
  try {
    dutyConfirmationsUnsub = db
      .collection('duty_confirmations')
      .onSnapshot((snapshot) => {
        const nextMap = {};
        snapshot.forEach((doc) => {
          nextMap[doc.id] = { id: doc.id, ...(doc.data() || {}) };
        });
        dutyConfirmationsMap = nextMap;
        saveDutyConfirmations();
        renderDutyHomeHub();
      }, (err) => {
        console.warn('Duty confirmations snapshot warning:', err);
      });
  } catch (err) {
    console.warn('Duty confirmations listener warning:', err);
  }
}

function getShiftStatusBadgeHtml(conf) {
  if (!conf || !conf.status) {
    return '<span class="duty-status-pill is-pending">لم يُؤكّد بعد</span>';
  }
  if (conf.status === 'confirmed') {
    return '<span class="duty-status-pill is-confirmed">تم تأكيد المداومة ✅</span>';
  }
  if (conf.status === 'covered') {
    return `<span class="duty-status-pill is-covered">بديل: ${escapeHtml(conf.coveredBy || 'تم التغطية')}</span>`;
  }
  if (conf.status === 'excused') {
    return '<span class="duty-status-pill is-excused">يعتذر • يطلب بديلاً</span>';
  }
  return '<span class="duty-status-pill is-pending">لم يُؤكّد بعد</span>';
}

function renderDutyHomeHub() {
  const state = computeCurrentAndNextShift(new Date());
  const clockMetaEl = document.getElementById('dutyTodayClockMeta');
  if (clockMetaEl) {
    const timeStr = `${String(state.now.getHours()).padStart(2, '0')}:${String(state.now.getMinutes()).padStart(2, '0')}`;
    clockMetaEl.innerHTML = `
      <span>اليوم: <strong>${escapeHtml(state.todayName)} ${formatDisplayDateShort(state.now)}</strong></span>
      <span>الساعة الآن: <strong>${timeStr}</strong></span>
    `;
  }

  // 1. بطاقة المداوم الآن
  const nowPill = document.getElementById('dutyNowStatusPill');
  const nowName = document.getElementById('dutyNowMemberName');
  const nowTime = document.getElementById('dutyNowShiftTime');
  if (nowPill && nowName && nowTime) {
    if (state.current) {
      const c = state.current;
      const isCovered = c.confirmation && c.confirmation.status === 'covered' && c.confirmation.coveredBy;
      const isExcused = c.confirmation && c.confirmation.status === 'excused';
      if (isExcused) {
        nowPill.className = 'duty-status-pill is-excused';
        nowPill.textContent = 'يحتاج بديلاً الآن';
      } else {
        nowPill.className = 'duty-status-pill is-live';
        nowPill.textContent = 'مداوم في المقر الآن';
      }
      nowName.textContent = c.effectiveMember;
      let metaLine = `${c.shiftArabic} (${c.timeRange})`;
      if (isCovered) {
        metaLine += ` • بدلاً عن ${c.primary}`;
      } else if (c.assistant && c.assistant !== '---') {
        metaLine += ` • المساعد: ${c.assistant}`;
      }
      nowTime.textContent = metaLine;
    } else {
      nowPill.className = 'duty-status-pill is-off';
      nowPill.textContent = state.todayName === 'الجمعة' ? 'عطلة الجمعة' : 'خارج وقت المداومة';
      nowName.textContent = 'لا توجد مناوبة جارية حالياً';
      nowTime.textContent = state.todayName === 'الجمعة'
        ? 'تُستأنف المداومة يوم السبت 08:30 صباحاً'
        : (state.nowMins < (8 * 60 + 30) ? 'تبدأ الفترة الصباحية عند 08:30' : 'أوقات المداومة الرسمية: 08:30 – 15:30');
    }
  }

  // 2. بطاقة المداوم التالي + خيار التأكيد وطلب البديل
  const nextPill = document.getElementById('dutyNextStatusPill');
  const nextName = document.getElementById('dutyNextMemberName');
  const nextTime = document.getElementById('dutyNextShiftTime');
  const nextStatusText = document.getElementById('dutyNextConfirmStatusText');
  const confirmBtn = document.getElementById('dutyConfirmNextBtn');
  const excuseBtn = document.getElementById('dutyExcuseNextBtn');
  const subActionEl = document.getElementById('dutyNextConfirmSubAction');

  if (state.next && nextPill && nextName && nextTime) {
    const n = state.next;
    const conf = n.confirmation;
    const relDay = n.isToday ? 'اليوم' : (n.isTomorrow ? 'غداً' : n.dayName);
    const shortDate = formatDisplayDateShort(n.dateObj);
    nextName.textContent = n.effectiveMember;
    nextTime.textContent = `${relDay} (${shortDate}) • ${n.shiftArabic} (${n.timeRange})`;

    if (conf && conf.status === 'confirmed') {
      nextPill.className = 'duty-status-pill is-confirmed';
      nextPill.textContent = 'مؤكّد الحضور ✅';
      if (nextStatusText) nextStatusText.textContent = `أكّد (${conf.confirmedBy || n.primary}) مداومته وأُرسل لتيليجرام ✅`;
      if (confirmBtn) {
        confirmBtn.classList.add('is-done');
        confirmBtn.textContent = '✅ تم التأكيد وإرسال الإشعار';
      }
      if (excuseBtn) excuseBtn.textContent = '📝 طرأ عذر؟ طلب بديل';
      if (subActionEl) {
        subActionEl.style.display = 'flex';
        subActionEl.innerHTML = `
          <span>هل أرسلت التأكيد بالخطأ؟</span>
          <button type="button" class="duty-unconfirm-link tap-glow" onclick="unconfirmDutyShift('${escapeHtml(n.shiftDocId)}')">إلغاء التأكيد</button>
        `;
      }
    } else if (conf && conf.status === 'covered') {
      nextPill.className = 'duty-status-pill is-covered';
      nextPill.textContent = 'تم تأمين البديل 🤝';
      if (nextStatusText) nextStatusText.textContent = `يتولى ${conf.coveredBy} تغطية الموعد بدلاً عن ${n.primary}`;
      if (confirmBtn) {
        confirmBtn.classList.remove('is-done');
        confirmBtn.textContent = '✅ تأكيد حضور البديل';
      }
      if (excuseBtn) excuseBtn.textContent = '📝 طلب بديل آخر';
      if (subActionEl) subActionEl.style.display = 'none';
    } else if (conf && conf.status === 'excused') {
      nextPill.className = 'duty-status-pill is-excused';
      nextPill.textContent = 'معتذر • بانتظار بديل';
      if (nextStatusText) nextStatusText.textContent = `اعتذر ${n.primary} (${conf.excuseReason || 'ظرف طارئ'}) — بانتظار بديل`;
      if (confirmBtn) {
        confirmBtn.classList.remove('is-done');
        confirmBtn.textContent = '✅ تأكيد المداومة (تيليجرام)';
      }
      if (excuseBtn) excuseBtn.textContent = '📢 أُرسل طلب البديل لتيليجرام';
      if (subActionEl) subActionEl.style.display = 'none';
    } else {
      nextPill.className = 'duty-status-pill is-pending';
      nextPill.textContent = 'ليس بعد ⏳';
      if (nextStatusText) nextStatusText.textContent = 'ليس بعد — بانتظار تأكيد المداوم التالي ⏳';
      if (confirmBtn) {
        confirmBtn.classList.remove('is-done');
        confirmBtn.textContent = '✅ تأكيد المداومة (تيليجرام)';
      }
      if (excuseBtn) excuseBtn.textContent = '📝 لديّ عذر — طلب بديل';
      if (subActionEl) subActionEl.style.display = 'none';
    }
  }

  // 3. عرض تبويبات الأيام وجدول المداومة الأسبوعي
  renderDutyScheduleSection(state);
}

function selectDutyDayTab(idx) {
  dutySelectedDayIndex = Math.max(0, Math.min((weeklyDutySchedule || []).length - 1, idx));
  dutyShowAllDays = false;
  const toggleBtn = document.getElementById('dutyToggleAllDaysBtn');
  if (toggleBtn) {
    toggleBtn.classList.remove('active');
    toggleBtn.textContent = 'عرض كل الأسبوع';
  }
  renderDutyHomeHub();
}

function toggleDutyShowAllDays() {
  dutyShowAllDays = !dutyShowAllDays;
  const toggleBtn = document.getElementById('dutyToggleAllDaysBtn');
  if (toggleBtn) {
    toggleBtn.classList.toggle('active', dutyShowAllDays);
    toggleBtn.textContent = dutyShowAllDays ? 'عرض يوم واحد' : 'عرض كل الأسبوع';
  }
  renderDutyHomeHub();
}

function toggleDutyScheduleEditMode() {
  dutyScheduleEditMode = !dutyScheduleEditMode;
  const editBtn = document.getElementById('dutyEditScheduleBtn');
  const saveBtn = document.getElementById('dutySaveScheduleBtn');
  if (editBtn) {
    editBtn.classList.toggle('active', dutyScheduleEditMode);
    editBtn.textContent = dutyScheduleEditMode ? '✕ إلغاء' : '✏️ تعديل';
  }
  if (saveBtn) {
    saveBtn.style.display = dutyScheduleEditMode ? 'block' : 'none';
  }
  renderDutyHomeHub();
}

function renderDutyScheduleSection(liveState) {
  const tabsEl = document.getElementById('dutyDayTabs');
  const contentEl = document.getElementById('dutyScheduleContent');
  if (!tabsEl || !contentEl) return;

  const list = weeklyDutySchedule || [];
  if (dutySelectedDayIndex < 0 || dutySelectedDayIndex >= list.length) {
    dutySelectedDayIndex = 0;
  }

  tabsEl.style.display = dutyShowAllDays || dutyScheduleEditMode ? 'none' : 'flex';
  tabsEl.innerHTML = list.map((item, idx) => {
    const isToday = item.day === liveState.todayName;
    const isActive = idx === dutySelectedDayIndex;
    return `
      <button type="button"
        class="duty-day-pill tap-glow ${isToday ? 'is-today' : ''} ${isActive ? 'active' : ''}"
        onclick="selectDutyDayTab(${idx})">
        <span>${escapeHtml(item.day)}</span>
        ${isToday ? '<span class="duty-day-dot">اليوم</span>' : ''}
      </button>
    `;
  }).join('');

  const itemsToRender = (dutyShowAllDays || dutyScheduleEditMode)
    ? list.map((item, idx) => ({ item, idx }))
    : [{ item: list[dutySelectedDayIndex], idx: dutySelectedDayIndex }];

  contentEl.innerHTML = itemsToRender.map(({ item, idx }) => {
    if (!item) return '';
    const isToday = item.day === liveState.todayName;

    const shiftRowsHtml = ['morning', 'evening'].map((shiftKey) => {
      const slotInfo = getDutyShiftSlotInfo(item.day, shiftKey);
      const targetDate = getNextDateForShift(item.day, shiftKey, liveState.now);
      const shiftDocId = buildShiftDocId(targetDate, shiftKey);
      const dateShort = formatDisplayDateShort(targetDate);
      const shiftFullLabel = `${item.day} (${dateShort}) — ${slotInfo.shiftArabic} (${slotInfo.timeRange})`;
      const conf = dutyConfirmationsMap[shiftDocId] || null;
      const isLiveNow = Boolean(liveState.current && liveState.current.shiftDocId === shiftDocId);
      const rawSlot = item[shiftKey] || {};

      if (dutyScheduleEditMode) {
        return `
          <div class="duty-shift-row">
            <div class="duty-shift-row-top">
              <span class="duty-shift-title">${shiftKey === 'morning' ? '☀️ الفترة الصباحية' : '🌙 الفترة المسائية'}</span>
              <span class="duty-shift-time">${slotInfo.timeRange}</span>
            </div>
            <div class="duty-edit-grid">
              <input type="text" class="duty-edit-primary" data-day="${idx}" data-shift="${shiftKey}" value="${escapeHtml(rawSlot.primary || '')}" placeholder="المداوم الرئيسي">
              <input type="text" class="duty-edit-username" data-day="${idx}" data-shift="${shiftKey}" value="${escapeHtml(rawSlot.username || '')}" placeholder="تيليجرام بدون @">
              <input type="text" class="duty-edit-assistant" data-day="${idx}" data-shift="${shiftKey}" value="${escapeHtml(rawSlot.assistant || '---')}" placeholder="المساعد">
            </div>
          </div>
        `;
      }

      const tgHandle = slotInfo.username;
      const activeDisplayName = (conf && conf.status === 'covered' && conf.coveredBy)
        ? `${conf.coveredBy} (بديل عن ${slotInfo.primary})`
        : slotInfo.primary;

      return `
        <div class="duty-shift-row ${isLiveNow ? 'is-current-live' : ''}">
          <div class="duty-shift-row-top">
            <span class="duty-shift-title">${shiftKey === 'morning' ? '☀️ الفترة الصباحية' : '🌙 الفترة المسائية'}${isLiveNow ? ' • الآن' : ''}</span>
            <span class="duty-shift-time">${slotInfo.timeRange} • ${dateShort}</span>
          </div>
          <div class="duty-shift-members">
            <span>👤 ${escapeHtml(activeDisplayName)}</span>
            ${tgHandle ? `<a href="https://t.me/${encodeURIComponent(tgHandle)}" target="_blank" class="duty-tg-chip">@${escapeHtml(tgHandle)}</a>` : ''}
          </div>
          ${slotInfo.assistant && slotInfo.assistant !== '---' ? `<div class="duty-shift-assistant">👥 المساعد: ${escapeHtml(slotInfo.assistant)}</div>` : ''}
          <div class="duty-row-actions">
            ${getShiftStatusBadgeHtml(conf)}
            <div class="duty-row-btns">
              <button type="button" class="duty-row-btn is-confirm tap-glow" onclick="confirmDutyShiftByMeta('${escapeHtml(shiftDocId)}', '${escapeHtml(item.day)}', '${shiftKey}', '${escapeHtml(slotInfo.primary)}', '${escapeHtml(shiftFullLabel)}')">
                ${conf && conf.status === 'confirmed' ? '✓ مؤكّد' : 'تأكيد'}
              </button>
              <button type="button" class="duty-row-btn is-excuse tap-glow" onclick="openExcuseForShift('${escapeHtml(shiftDocId)}', '${escapeHtml(shiftFullLabel)}', '${escapeHtml(item.day)}', '${escapeHtml(slotInfo.primary)}')">
                طلب بديل
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="duty-day-block ${isToday ? 'is-today' : ''}">
        <div class="duty-day-block-head">
          <span>${escapeHtml(item.day)}</span>
          ${isToday ? '<span class="duty-status-pill is-live">جدول اليوم</span>' : ''}
        </div>
        ${shiftRowsHtml}
      </div>
    `;
  }).join('');
}

async function saveDutyScheduleToCloud() {
  const contentEl = document.getElementById('dutyScheduleContent');
  if (!contentEl) return;

  weeklyDutySchedule.forEach((item, idx) => {
    ['morning', 'evening'].forEach((shiftKey) => {
      const pEl = contentEl.querySelector(`.duty-edit-primary[data-day="${idx}"][data-shift="${shiftKey}"]`);
      const uEl = contentEl.querySelector(`.duty-edit-username[data-day="${idx}"][data-shift="${shiftKey}"]`);
      const aEl = contentEl.querySelector(`.duty-edit-assistant[data-day="${idx}"][data-shift="${shiftKey}"]`);
      if (!item[shiftKey]) item[shiftKey] = {};
      if (pEl) item[shiftKey].primary = pEl.value.trim();
      if (uEl) item[shiftKey].username = uEl.value.trim().replace(/^@/, '');
      if (aEl) item[shiftKey].assistant = aEl.value.trim() || '---';
    });
  });

  saveDutyScheduleCache();
  const sdb = getScheduleFirestoreDb();
  const updatedBy = (DutyState.userProfile && DutyState.userProfile.fullName && DutyState.userProfile.fullName.trim())
    ? DutyState.userProfile.fullName.trim()
    : 'مشرف المداومة';

  if (sdb) {
    try {
      await sdb.collection('duty_schedules').doc('current_schedule').set({
        schedule: weeklyDutySchedule,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedBy
      });
      updateDutyScheduleSyncBadge('synced');
      showToast('💾 تم حفظ جدول المداومة في السحابة لجميع المداومين!');
    } catch (err) {
      console.warn('Save schedule to cloud warning:', err);
      updateDutyScheduleSyncBadge('offline');
      showToast('💾 تم حفظ جدول المداومة محلياً بنجاح.');
    }
  } else {
    showToast('💾 تم حفظ جدول المداومة محلياً بنجاح.');
  }

  toggleDutyScheduleEditMode();
}

function getNextShiftPayload() {
  const state = computeCurrentAndNextShift(new Date());
  if (!state.next) return null;
  const n = state.next;
  const dateShort = formatDisplayDateShort(n.dateObj);
  return {
    shiftDocId: n.shiftDocId,
    dayName: n.dayName,
    shiftKey: n.shiftKey,
    scheduledMember: n.primary,
    shiftLabel: `${n.dayName} (${dateShort}) — ${n.shiftArabic} (${n.timeRange})`,
    confirmation: n.confirmation
  };
}

async function confirmNextDutyShift() {
  const target = getNextShiftPayload();
  if (!target) {
    showToast('⚠️ لم يتم تحديد الموعد القادم في الجدول بعد.');
    return;
  }
  await confirmDutyShiftByMeta(
    target.shiftDocId,
    target.dayName,
    target.shiftKey,
    target.scheduledMember,
    target.shiftLabel
  );
}

async function confirmDutyShiftByMeta(shiftDocId, dayName, shiftKey, scheduledMember, shiftLabel) {
  if (isConfirmingDutyShift || !shiftDocId) return;
  const existing = dutyConfirmationsMap[shiftDocId];
  if (existing && existing.status === 'confirmed') {
    showToast(`✅ مداومة «${scheduledMember}» في (${shiftLabel}) مؤكدة مسبقاً بالفعل.`);
    return;
  }

  const profileName = (DutyState.userProfile && DutyState.userProfile.fullName && DutyState.userProfile.fullName.trim())
    ? DutyState.userProfile.fullName.trim()
    : '';
  const confirmedBy = (scheduledMember && scheduledMember !== 'غير معيّن بعد' && scheduledMember !== 'عضو مداوم')
    ? (profileName && profileName !== scheduledMember ? `${scheduledMember} (بإشعار: ${profileName})` : scheduledMember)
    : (profileName || scheduledMember || 'المداوم المكلف');

  const payload = {
    shiftDocId,
    dateKey: shiftDocId.split('_')[0] || '',
    dayName,
    shiftKey,
    shiftLabel,
    scheduledMember,
    confirmedBy,
    status: 'confirmed',
    confirmedAtMs: Date.now(),
    updatedAtMs: Date.now()
  };

  isConfirmingDutyShift = true;
  dutyConfirmationsMap[shiftDocId] = { id: shiftDocId, ...payload };
  saveDutyConfirmations();
  renderDutyHomeHub();

  try {
    const db = getSharedFirestoreDb();
    if (db) {
      await db.collection('duty_confirmations').doc(shiftDocId).set({
        ...payload,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    }

    audio.playSuccessChime();
    showToast('✅ تم تأكيد المداومة وجاري إرسال الإشعار التلقائي إلى «نشطاء جسور 8»...');

    const tgMessage = `✅ <b>تأكيد حضور المداومة القادمة</b> 🏛️\n\n` +
      `👤 <b>المداوم(ة):</b> ${escapeHtml(confirmedBy)}\n` +
      `🗓️ <b>الموعد:</b> ${escapeHtml(shiftLabel)}\n` +
      `📌 <b>الحالة:</b> تم تأكيد المداومة والحضور في الموعد المحدد بإذن الله.\n\n` +
      `🌿 <i>بارك الله في انضباطكم وحرصكم على أمانة مقر نادي جسور.</i>`;

    const tgOk = await sendTelegramGroupNotification(tgMessage);
    if (tgOk) {
      showToast('✅ تم تأكيد المداومة وإبلاغ قناة «نُشَطَاء جُسُور |8|» بنجاح 📢');
    } else {
      showToast('✅ حُفظ تأكيد المداومة في التطبيق (تعذر الاتصال ببوت تيليجرام حالياً)');
    }
  } catch (err) {
    console.error('Confirm duty shift error:', err);
    showToast('✅ تم تأكيد المداومة محلياً.');
  } finally {
    isConfirmingDutyShift = false;
  }
}

async function unconfirmDutyShift(shiftDocId) {
  if (!shiftDocId) return;
  delete dutyConfirmationsMap[shiftDocId];
  saveDutyConfirmations();
  renderDutyHomeHub();
  const db = getSharedFirestoreDb();
  if (db) {
    try {
      await db.collection('duty_confirmations').doc(shiftDocId).delete();
    } catch (e) {}
  }
  audio.playCeramicClick();
  showToast('🔄 أُزيل تأكيد هذه المناوبة بنجاح.');
}

function openExcuseForNextShift() {
  const target = getNextShiftPayload();
  if (!target) {
    openNewTakafulModal();
    return;
  }
  openExcuseForShift(target.shiftDocId, target.shiftLabel, target.dayName, target.scheduledMember);
}

function openExcuseForShift(shiftDocId, shiftLabel, dayName, scheduledMember) {
  openNewTakafulModal({
    shiftDocId,
    shiftLabel,
    dayName,
    memberName: scheduledMember
  });
}

function updateTakafulSyncBadge(state) {
  const badge = document.getElementById('takafulSyncBadge');
  if (!badge) return;
  badge.classList.remove('synced', 'offline');
  if (state === 'synced') {
    badge.classList.add('synced');
    badge.textContent = '☁️ متزامن مع الجميع ✅';
  } else if (state === 'offline') {
    badge.classList.add('offline');
    badge.textContent = '📴 وضع محلي مؤقت';
  } else {
    badge.textContent = '☁️ جاري الاتصال...';
  }
}

function loadTakafulRequests() {
  const saved = localStorage.getItem(TAKAFUL_LOCAL_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        DutyState.takafulRequests = parsed;
      }
    } catch (e) {
      console.error(e);
    }
  }
}

function saveTakafulRequests() {
  localStorage.setItem(TAKAFUL_LOCAL_KEY, JSON.stringify(DutyState.takafulRequests || []));
}

function initTakafulCloudSync() {
  const db = getSharedFirestoreDb();
  if (!db) {
    updateTakafulSyncBadge('offline');
    return;
  }
  updateTakafulSyncBadge('syncing');
  if (takafulUnsub) takafulUnsub();
  takafulUnsub = db
    .collection('takaful_requests')
    .orderBy('createdAtMs', 'desc')
    .limit(40)
    .onSnapshot((snapshot) => {
      const cloudList = [];
      snapshot.forEach((doc) => {
        const d = doc.data() || {};
        cloudList.push({
          id: doc.id,
          shiftDocId: d.shiftDocId || '',
          name: d.name || 'أحد الرفاق المداومين',
          shift: d.shift || 'مداومة قادمة',
          day: d.day || 'مناوبة المقر',
          reason: d.reason || 'ظرف طارئ',
          claimed: Boolean(d.claimed),
          claimedBy: d.claimedBy || null,
          createdAtMs: Number(d.createdAtMs) || 0
        });
      });
      DutyState.takafulRequests = cloudList;
      saveTakafulRequests();
      renderTakafulList();
      updateTakafulSyncBadge('synced');
    }, (err) => {
      console.error('Firestore substitute snapshot error:', err);
      updateTakafulSyncBadge('offline');
    });
}

function renderTakafulList() {
  const container = document.getElementById('takafulListContainer');
  if (!container) return;
  container.innerHTML = '';

  if (!DutyState.takafulRequests || DutyState.takafulRequests.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: var(--ink-muted); font-size: 0.85rem; padding: 16px; background: var(--surface-soft); border: 1px dashed rgba(15, 123, 150, 0.35); border-radius: 14px;">
        لا توجد أي طلبات بدائل بانتظار التغطية حالياً، الجميع ملتزمون بمناوباتهم ولله الحمد. 🌿
      </div>
    `;
    return;
  }

  DutyState.takafulRequests.forEach((req, idx) => {
    const safeName = escapeHtml(req.name || 'أحد الرفاق المداومين');
    const safeDay = escapeHtml(req.day && req.day !== 'مداومة التكافل' ? req.day : 'مناوبة المقر');
    const safeShift = escapeHtml(req.shift || 'مداومة قادمة');
    const safeReason = escapeHtml(req.reason || 'ظرف طارئ');
    const safeClaimedBy = escapeHtml(req.claimedBy || 'أحد الرفاق الكرام');

    const card = document.createElement('div');
    card.className = 'takaful-card tap-glow';
    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span style="font-family: var(--font-traditional); font-size: 1.2rem; font-weight: 700; color: var(--lapis-deep);">
          المداوم(ة): ${safeName}
        </span>
        <div style="display: flex; gap: 6px; align-items: center;">
          <span class="card-badge" style="background: #fef3c7; color: var(--gold-deep); border-color: var(--gold-antique);">
            ${safeDay}
          </span>
          <button type="button" onclick="deleteTakafulRequest(${idx})" class="takaful-delete-btn" title="حذف هذا الطلب">
            🗑️
          </button>
        </div>
      </div>
      <p style="font-size: 0.83rem; color: var(--ink-secondary); font-weight: 700; margin-bottom: 6px;">⏰ ${safeShift}</p>
      <p style="font-size: 0.86rem; color: var(--ink-primary); background: var(--surface-soft); border: 1px solid rgba(197, 143, 50, 0.3); padding: 8px 12px; border-radius: 12px; margin-bottom: 12px;">
        سبب العذر: ${safeReason}
      </p>
      ${req.claimed ? `
        <div style="text-align: center; color: var(--emerald-deep); font-weight: 800; font-size: 0.92rem; padding: 10px; background: var(--emerald-soft); border: 1px solid var(--emerald-garden); border-radius: 12px;">
          ✅ تم تأمين البديل: ${safeClaimedBy} (جزاه الله خيراً)
        </div>
      ` : `
        <button type="button" onclick="claimTakaful(${idx})" class="takaful-claim-btn tap-glow">
          أنا لها — أتطوّع كبديل لهذه المناوبة 🤝
        </button>
      `}
    `;
    container.appendChild(card);
  });
}

async function deleteTakafulRequest(idx) {
  const target = DutyState.takafulRequests[idx];
  if (!target) return;

  const db = getSharedFirestoreDb();
  if (target.shiftDocId && dutyConfirmationsMap[target.shiftDocId] && dutyConfirmationsMap[target.shiftDocId].status === 'excused') {
    delete dutyConfirmationsMap[target.shiftDocId];
    saveDutyConfirmations();
    renderDutyHomeHub();
    if (db) {
      db.collection('duty_confirmations').doc(target.shiftDocId).delete().catch(() => {});
    }
  }

  if (db && target.id && typeof target.id === 'string') {
    try {
      await db.collection('takaful_requests').doc(target.id).delete();
      audio.playCeramicClick();
      showToast('🗑️ تم حذف طلب البديل للجميع بنجاح.');
      return;
    } catch (err) {
      console.error('Firestore substitute delete error:', err);
      updateTakafulSyncBadge('offline');
    }
  }

  DutyState.takafulRequests.splice(idx, 1);
  saveTakafulRequests();
  audio.playCeramicClick();
  renderTakafulList();
  showToast('🗑️ تم حذف طلب البديل بنجاح.');
}

async function claimTakaful(idx) {
  const req = DutyState.takafulRequests[idx];
  if (!req || req.claimed) return;

  const claimedBy = (DutyState.userProfile && DutyState.userProfile.fullName && DutyState.userProfile.fullName.trim())
    ? DutyState.userProfile.fullName.trim()
    : 'أحد الرفاق الكرام';
  const claimedAtMs = Date.now();
  const db = getSharedFirestoreDb();

  if (req.shiftDocId) {
    const existing = dutyConfirmationsMap[req.shiftDocId] || { shiftDocId: req.shiftDocId };
    dutyConfirmationsMap[req.shiftDocId] = {
      ...existing,
      status: 'covered',
      coveredBy: claimedBy,
      coveredAtMs: claimedAtMs,
      updatedAtMs: claimedAtMs
    };
    saveDutyConfirmations();
    renderDutyHomeHub();
  }

  if (db && req.id && typeof req.id === 'string') {
    try {
      await db.collection('takaful_requests').doc(req.id).update({
        claimed: true,
        claimedBy: claimedBy,
        claimedAtMs: claimedAtMs
      });
      if (req.shiftDocId) {
        await db.collection('duty_confirmations').doc(req.shiftDocId).set({
          shiftDocId: req.shiftDocId,
          status: 'covered',
          coveredBy: claimedBy,
          coveredAtMs: claimedAtMs,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      }
      updateTakafulSyncBadge('synced');
    } catch (err) {
      console.error('Firestore substitute claim error:', err);
      updateTakafulSyncBadge('offline');
      req.claimed = true;
      req.claimedBy = claimedBy;
      saveTakafulRequests();
      renderTakafulList();
    }
  } else {
    req.claimed = true;
    req.claimedBy = claimedBy;
    saveTakafulRequests();
    renderTakafulList();
  }

  audio.playSuccessChime();
  showToast(`🌟 جزاك الله خيراً! سجّلت كبديل لمناوبة ${req.name}، وأُرسل إشعار لرفاق المجموعة.`);

  const tgMessage = `🤝 <b>بشارة تأمين البديل | تمت تغطية المناوبة</b> 🕌\n\n` +
    `✅ تطوّع الأخ/الأخت: <b>${escapeHtml(claimedBy)}</b> لتغطية مناوبة الأخ/الأخت: <b>${escapeHtml(req.name)}</b> (${escapeHtml(req.shift)}).\n\n` +
    `🌿 <i>جزاه الله خيراً وجعل هذا الإيثار في ميزان حسناته ونفع به إخوانه ورواد النادي.</i>`;

  sendTelegramGroupNotification(tgMessage);
}

function openNewTakafulModal(ctx = null) {
  pendingExcuseShiftContext = ctx && ctx.shiftDocId ? ctx : null;
  const title = document.getElementById('modalShiftTitle');
  const body = document.getElementById('modalShiftBody');
  const prefillShift = ctx && ctx.shiftLabel ? escapeHtml(ctx.shiftLabel) : '';
  const profileName = (DutyState.userProfile && DutyState.userProfile.fullName && DutyState.userProfile.fullName.trim())
    ? DutyState.userProfile.fullName.trim()
    : '';
  const prefillMember = escapeHtml((ctx && ctx.memberName && ctx.memberName !== 'غير معيّن بعد') ? ctx.memberName : profileName);

  title.textContent = 'الاعتذار وطلب بديل للمداومة';
  body.innerHTML = `
    <label for="takafulMemberInput" style="display: block; font-size: 0.82rem; font-weight: 800; color: var(--lapis-deep); margin-bottom: 5px;">
      اسم المداوم(ة) المعتذر(ة):
    </label>
    <input type="text" id="takafulMemberInput" class="book-title-input" value="${prefillMember}" placeholder="اكتب الاسم الكريم...">
    <label for="takafulShiftInput" style="display: block; font-size: 0.82rem; font-weight: 800; color: var(--lapis-deep); margin-bottom: 5px;">
      الموعد أو الفترة المطلوب تغطيتها:
    </label>
    <input type="text" id="takafulShiftInput" class="book-title-input" value="${prefillShift}" placeholder="مثال: الأحد صباحاً / الخميس مساءً...">
    <label for="takafulReasonInput" style="display: block; font-size: 0.82rem; font-weight: 800; color: var(--lapis-deep); margin-bottom: 5px;">
      بيان سبب العذر باختصار:
    </label>
    <textarea id="takafulReasonInput" rows="3" class="book-title-input" placeholder="مثال: ظرف دراسي، امتحان، سفر، موعد طبي..."></textarea>
    <button type="button" onclick="submitTakafulRequest(); closeModal();" class="takaful-claim-btn" style="margin-top: 6px;">
      إرسال طلب البديل في التطبيق والتيليجرام 📢
    </button>
  `;
  openModal();
  const reasonEl = document.getElementById('takafulReasonInput');
  if (ctx && reasonEl) setTimeout(() => reasonEl.focus(), 60);
}

async function submitTakafulRequest() {
  if (isSubmittingTakaful) return;
  const memberInput = document.getElementById('takafulMemberInput');
  const shiftInput = document.getElementById('takafulShiftInput');
  const reasonInput = document.getElementById('takafulReasonInput');
  const ctx = pendingExcuseShiftContext;
  pendingExcuseShiftContext = null;

  const shiftText = (shiftInput && shiftInput.value.trim()) ? shiftInput.value.trim() : 'مداومة قادمة';
  const reason = (reasonInput && reasonInput.value.trim()) ? reasonInput.value.trim() : 'عذر طارئ';
  const profileName = (DutyState.userProfile && DutyState.userProfile.fullName && DutyState.userProfile.fullName.trim())
    ? DutyState.userProfile.fullName.trim()
    : '';
  const userName = (memberInput && memberInput.value.trim())
    ? memberInput.value.trim()
    : (profileName || 'أحد الرفاق المداومين');
  const dayLabel = (ctx && ctx.dayName) ? ctx.dayName : 'مناوبة المقر';
  const shiftDocId = (ctx && ctx.shiftDocId) ? ctx.shiftDocId : '';
  const createdAtMs = Date.now();

  isSubmittingTakaful = true;
  const db = getSharedFirestoreDb();

  if (shiftDocId) {
    dutyConfirmationsMap[shiftDocId] = {
      id: shiftDocId,
      shiftDocId,
      dayName: dayLabel,
      shiftLabel: shiftText,
      scheduledMember: userName,
      excuseReason: reason,
      status: 'excused',
      updatedAtMs: createdAtMs
    };
    saveDutyConfirmations();
    renderDutyHomeHub();
  }

  try {
    if (db) {
      await db.collection('takaful_requests').add({
        shiftDocId: shiftDocId,
        name: userName,
        shift: shiftText,
        day: dayLabel,
        reason: reason,
        claimed: false,
        claimedBy: null,
        createdAtMs: createdAtMs,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      if (shiftDocId) {
        await db.collection('duty_confirmations').doc(shiftDocId).set({
          shiftDocId,
          dayName: dayLabel,
          shiftLabel: shiftText,
          scheduledMember: userName,
          excuseReason: reason,
          status: 'excused',
          updatedAtMs: createdAtMs,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }
      updateTakafulSyncBadge('synced');
    } else {
      DutyState.takafulRequests.unshift({
        id: createdAtMs,
        shiftDocId: shiftDocId,
        name: userName,
        shift: shiftText,
        day: dayLabel,
        reason: reason,
        claimed: false,
        claimedBy: null,
        createdAtMs: createdAtMs
      });
      saveTakafulRequests();
      renderTakafulList();
      updateTakafulSyncBadge('offline');
    }
  } catch (err) {
    console.error('Firestore substitute add error:', err);
    DutyState.takafulRequests.unshift({
      id: createdAtMs,
      shiftDocId: shiftDocId,
      name: userName,
      shift: shiftText,
      day: dayLabel,
      reason: reason,
      claimed: false,
      claimedBy: null,
      createdAtMs: createdAtMs
    });
    saveTakafulRequests();
    renderTakafulList();
    updateTakafulSyncBadge('offline');
  } finally {
    isSubmittingTakaful = false;
  }

  audio.playSuccessChime();
  showToast('📢 جاري نشر طلب البديل للجميع وبث الإشعار في مجموعة نشطاء جسور 8...');

  const tgMessage = `🚨 <b>نداء طلب بديل للمداومة | اعتذار عن مناوبة</b> 🕌\n\n` +
    `👤 <b>المداوم(ة):</b> ${escapeHtml(userName)}\n` +
    `⏰ <b>المناوبة المعنية:</b> ${escapeHtml(shiftText)}\n` +
    `📝 <b>بيان العذر:</b> ${escapeHtml(reason)}\n\n` +
    `🌿 <i>«والله في عون العبد ما كان العبد في عون أخيه»</i>\n` +
    `فمن تيسر له التطوع كبديل لتغطية هذه المناوبة فليتفضل بتأكيد ذلك عبر الواجهة الرئيسية للتطبيق أو التواصل المباشر.`;

  const success = await sendTelegramGroupNotification(tgMessage);

  if (success) {
    showToast('✅ نُشر طلب البديل في الواجهة الرئيسية وبُث إشعار لمجموعة «نُشَطَاء جُسُور |8|» 📢');
  } else {
    showToast('📢 نُشر طلب البديل في القائمة (تأكد من الاتصال لبثه في تيليجرام)');
  }
}

// ── 12. رسائل الزملاء المداومين (مزامنة سحابية لحظية بين جميع الأجهزة عبر Firestore) ──
const CAPSULES_LOCAL_KEY = 'joussour_duty_capsules_v3';
let capsulesUnsub = null;
let isSubmittingCapsule = false;

function updateCapsulesSyncBadge(state) {
  const badge = document.getElementById('capsulesSyncBadge');
  if (!badge) return;
  badge.classList.remove('synced', 'offline');
  if (state === 'synced') {
    badge.classList.add('synced');
    badge.textContent = '☁️ متزامن مع الجميع ✅';
  } else if (state === 'offline') {
    badge.classList.add('offline');
    badge.textContent = '📴 وضع محلي مؤقت';
  } else {
    badge.textContent = '☁️ جاري الاتصال...';
  }
}

function loadCapsules() {
  const saved = localStorage.getItem(CAPSULES_LOCAL_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        DutyState.capsules = parsed;
      }
    } catch (e) {
      console.error(e);
    }
  }
}

function saveCapsules() {
  localStorage.setItem(CAPSULES_LOCAL_KEY, JSON.stringify(DutyState.capsules || []));
}

function initCapsulesCloudSync() {
  const db = getSharedFirestoreDb();
  if (!db) {
    updateCapsulesSyncBadge('offline');
    return;
  }
  updateCapsulesSyncBadge('syncing');

  if (capsulesUnsub) capsulesUnsub();
  capsulesUnsub = db
    .collection('duty_capsules')
    .orderBy('createdAtMs', 'desc')
    .limit(40)
    .onSnapshot((snapshot) => {
      const cloudCapsules = [];
      snapshot.forEach((doc) => {
        const data = doc.data() || {};
        cloudCapsules.push({
          id: doc.id,
          author: data.author || 'عضو جسور',
          text: data.text || '',
          date: data.date || '',
          createdAtMs: Number(data.createdAtMs) || 0
        });
      });
      DutyState.capsules = cloudCapsules;
      saveCapsules();
      renderCapsules();
      updateCapsulesSyncBadge('synced');
    }, (err) => {
      console.error('Firestore capsules snapshot error:', err);
      updateCapsulesSyncBadge('offline');
    });
}

function renderCapsules() {
  const list = document.getElementById('capsulesListContainer');
  if (!list) return;
  list.innerHTML = '';

  if (!DutyState.capsules || DutyState.capsules.length === 0) {
    list.innerHTML = `
      <div style="text-align: center; color: var(--ink-muted); font-size: 0.85rem; padding: 14px; background: var(--surface-soft); border: 1px dashed rgba(197, 143, 50, 0.4); border-radius: 12px; margin-bottom: 8px;">
        لا توجد رسائل حالياً. كن أول من يترك نصيحة أو دعاءً لزميلك المداوم أو زميلتك المداومة 🌿
      </div>
    `;
    return;
  }

  DutyState.capsules.forEach((cap, idx) => {
    const safeAuthor = escapeHtml(cap.author || 'عضو جسور');
    const safeText = escapeHtml(cap.text || '');
    const safeDate = escapeHtml(cap.date || '');
    const item = document.createElement('div');
    item.className = 'capsule-card tap-glow';
    item.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <span style="font-weight: 800; color: var(--lapis-deep); font-size: 0.88rem;">💌 من: ${safeAuthor}</span>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 0.72rem; color: var(--ink-muted);">${safeDate}</span>
          <button type="button" onclick="deleteCapsule(${idx})" class="capsule-delete-btn" title="حذف هذه الرسالة">
            🗑️
          </button>
        </div>
      </div>
      <p style="font-size: 0.85rem; color: var(--ink-primary); line-height: 1.55; margin: 0;">${safeText}</p>
    `;
    list.appendChild(item);
  });
}

async function deleteCapsule(idx) {
  const target = DutyState.capsules[idx];
  if (!target) return;

  const db = getSharedFirestoreDb();
  if (db && target.id) {
    try {
      await db.collection('duty_capsules').doc(target.id).delete();
      audio.playCeramicClick();
      showToast('🗑️ تم حذف الرسالة للجميع بنجاح.');
      return;
    } catch (err) {
      console.error('Firestore capsule delete error:', err);
      updateCapsulesSyncBadge('offline');
    }
  }

  DutyState.capsules.splice(idx, 1);
  saveCapsules();
  audio.playCeramicClick();
  renderCapsules();
  showToast('🗑️ تم حذف الرسالة محلياً.');
}

async function addNewCapsule() {
  if (isSubmittingCapsule) return;
  const textInput = document.getElementById('newCapsuleInput');
  const addBtn = document.getElementById('addCapsuleBtn');
  if (!textInput) return;

  const text = textInput.value.trim();
  if (!text) {
    showToast('⚠️ اكتب رسالتك للمداوم التالي أولاً');
    return;
  }

  const now = new Date();
  const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')} - ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const createdAtMs = now.getTime();
  const author = (DutyState.userProfile && DutyState.userProfile.fullName && DutyState.userProfile.fullName.trim())
    ? DutyState.userProfile.fullName.trim()
    : 'عضو جسور';

  isSubmittingCapsule = true;
  if (addBtn) {
    addBtn.disabled = true;
    addBtn.style.opacity = '0.65';
  }

  const db = getSharedFirestoreDb();
  try {
    if (db) {
      await db.collection('duty_capsules').add({
        author: author,
        text: text,
        date: dateStr,
        createdAtMs: createdAtMs,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      textInput.value = '';
      audio.playSuccessChime();
      updateCapsulesSyncBadge('synced');
      showToast('💌 تم إيداع رسالتك بنجاح وتظهر الآن في جميع التطبيقات!');
    } else {
      DutyState.capsules.unshift({ author, text, date: dateStr, createdAtMs });
      saveCapsules();
      renderCapsules();
      textInput.value = '';
      audio.playSuccessChime();
      updateCapsulesSyncBadge('offline');
      showToast('💌 حُفظت كبسولتك محلياً مؤقتاً.');
    }
  } catch (err) {
    console.error('Firestore capsule add error:', err);
    DutyState.capsules.unshift({ author, text, date: dateStr, createdAtMs });
    saveCapsules();
    renderCapsules();
    textInput.value = '';
    updateCapsulesSyncBadge('offline');
    showToast('⚠️ تعذّر الإرسال السحابي؛ حُفظت رسالتك محلياً مؤقتاً.');
  } finally {
    isSubmittingCapsule = false;
    if (addBtn) {
      addBtn.disabled = false;
      addBtn.style.opacity = '';
    }
  }
}

// ── 13. ميثاق النظافة وبصمة الإحسان ──
function confirmCleanlinessPledge() {
  audio.playSuccessChime();
  showToast('🌿 بارك الله فيك! تركتَ المحراب أبهى مما دخلته كما هو سمت المسلمين.');
}

// ── 14. روضة الأذكار التفاعلية بالنقر بحسب عدد كل ذكر ──
function renderFullAdhkar() {
  const morningContainer = document.getElementById('morningAdhkarList');
  const eveningContainer = document.getElementById('eveningAdhkarList');

  if (morningContainer) {
    morningContainer.innerHTML = '';
    AuthenticAdhkar.morning.forEach((item, idx) => {
      morningContainer.appendChild(createDhikrCard(item, idx, 'morning'));
    });
  }

  if (eveningContainer) {
    eveningContainer.innerHTML = '';
    AuthenticAdhkar.evening.forEach((item, idx) => {
      eveningContainer.appendChild(createDhikrCard(item, idx, 'evening'));
    });
  }
}

function createDhikrCard(item, idx, type) {
  const card = document.createElement('div');
  const progressKey = `${type}_${idx}`;
  const currentCount = DutyState.dhikrCounts[progressKey] || 0;
  const isDone = currentCount >= item.targetCount;

  card.className = `dhikr-card tap-glow ${isDone ? 'dhikr-done' : ''}`;
  card.id = `dhikrCard_${type}_${idx}`;

  const remaining = Math.max(0, item.targetCount - currentCount);

  card.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
      <span style="font-weight: 800; color: var(--sun-gold-bright); font-size: 1rem;">
        ${idx + 1}. ${item.title}
      </span>
      <div style="display: flex; gap: 8px; align-items: center;">
        <span class="dhikr-card-count">${item.countLabel}</span>
        <button class="dhikr-tap-action-btn ${isDone ? 'done' : ''}" id="dhikrBtn_${type}_${idx}" onclick="tapDhikr(event, '${type}', ${idx})">
          ${isDone ? 'تم بحمد الله ✅' : `انقر: باقي (${remaining}) 📿`}
        </button>
      </div>
    </div>
    <div class="dhikr-card-text" onclick="tapDhikr(event, '${type}', ${idx})">${item.text}</div>
    <div class="dhikr-card-virtue">✨ الفضل: ${item.virtue}</div>
  `;
  return card;
}

function tapDhikr(event, type, idx) {
  if (event) event.stopPropagation();

  const progressKey = `${type}_${idx}`;
  const item = AuthenticAdhkar[type][idx];
  let currentCount = DutyState.dhikrCounts[progressKey] || 0;

  if (currentCount >= item.targetCount) {
    // إذا كان مكتملاً ونقر مجدداً، يتم إعادة التصفير لمن أراد القراءة ثانية
    DutyState.dhikrCounts[progressKey] = 0;
    audio.playCeramicClick();
    updateDhikrCardUI(type, idx, item, 0);
    showToast(`🔄 تمت إعادة ضبط ذكر: ${item.title}`);
    return;
  }

  currentCount++;
  DutyState.dhikrCounts[progressKey] = currentCount;
  audio.playWaterDrop();

  if (navigator.vibrate) {
    navigator.vibrate(25);
  }

  const isDone = currentCount >= item.targetCount;
  updateDhikrCardUI(type, idx, item, currentCount);

  if (isDone) {
    audio.playSuccessChime();
    showToast(`✅ تم بحمد الله ذكر: ${item.title}`);
  }
}

function updateDhikrCardUI(type, idx, item, currentCount) {
  const card = document.getElementById(`dhikrCard_${type}_${idx}`);
  const btn = document.getElementById(`dhikrBtn_${type}_${idx}`);
  const isDone = currentCount >= item.targetCount;
  const remaining = Math.max(0, item.targetCount - currentCount);

  if (card) {
    if (isDone) {
      card.classList.add('dhikr-done');
    } else {
      card.classList.remove('dhikr-done');
    }
  }

  if (btn) {
    if (isDone) {
      btn.className = 'dhikr-tap-action-btn done';
      btn.textContent = 'تم بحمد الله ✅';
    } else {
      btn.className = 'dhikr-tap-action-btn';
      btn.textContent = `انقر: باقي (${remaining}) 📿`;
    }
  }
}

function incrementTasbih() {
  DutyState.tasbihCount++;
  const countEl = document.getElementById('tasbihCountEl');
  if (countEl) countEl.textContent = DutyState.tasbihCount;
  audio.playWaterDrop();

  if (navigator.vibrate) {
    navigator.vibrate(25);
  }
}

function resetTasbih() {
  DutyState.tasbihCount = 0;
  const countEl = document.getElementById('tasbihCountEl');
  if (countEl) countEl.textContent = 0;
  audio.playCeramicClick();
}

function switchAdhkarSubTab(subTabId) {
  audio.playCeramicClick();
  document.querySelectorAll('.adhkar-subtab-pane').forEach(p => p.style.display = 'none');
  const target = document.getElementById(subTabId);
  if (target) target.style.display = 'block';

  document.querySelectorAll('.adhkar-nav-pill').forEach(pill => {
    if (pill.getAttribute('data-subtab') === subTabId) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });
}

// ── 15. نوافذ المودال والتوست ──
function openModal() {
  const modal = document.getElementById('shiftDetailsModal');
  if (modal) modal.classList.add('open');
}

function closeModal() {
  const modal = document.getElementById('shiftDetailsModal');
  if (modal) modal.classList.remove('open');
}

function showToast(message) {
  const toast = document.getElementById('inAppToast');
  if (toast) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }
}

function openReportReminderModal() {
  const modal = document.getElementById('shiftDetailsModal');
  const title = document.getElementById('modalShiftTitle');
  const body = document.getElementById('modalShiftBody');

  title.textContent = 'الحمد لله على التمام والفضل';

  let notesHtml = '';
  if (DutyState.quickNotes && DutyState.quickNotes.length > 0) {
    notesHtml = `
      <div style="background: var(--surface-soft); border: 1px dashed var(--turquoise-dome); border-radius: 12px; padding: 10px 12px; margin-bottom: 14px; text-align: right;">
        <div style="font-size: 0.82rem; font-weight: 800; color: var(--gold-deep); margin-bottom: 6px;">
          📋 ملاحظاتك ومواقفك المسجلة اليوم (${DutyState.quickNotes.length}):
        </div>
        <div style="max-height: 120px; overflow-y: auto; font-size: 0.78rem; color: var(--ink-primary); line-height: 1.5; margin-bottom: 8px;">
          ${DutyState.quickNotes.map(n => `<div style="margin-bottom: 4px;">• [${n.time}] ${escapeHtml(n.text)}</div>`).join('')}
        </div>
        <button onclick="copyAllQuickNotes()" class="quick-note-btn" style="width: 100%; padding: 6px; font-weight: bold;">
          نسخ جميع الملاحظات للتقرير 📋
        </button>
      </div>
    `;
  }

  body.innerHTML = `
    <p style="font-size: 0.95rem; color: var(--ink-secondary); margin-bottom: 14px; text-align: center; line-height: 1.6;">
      تقبل الله جهودك وبذلك! تفضل بالدخول إلى رابط موقع التقارير المعتمد لملء تقرير مناوبتك بنفسك:
    </p>
    ${notesHtml}
    <a href="https://mirazed001-rgb.github.io/josour-duty-reports/" target="_blank" class="takaful-claim-btn" style="display: block; text-align: center; text-decoration: none; margin-bottom: 10px;">
      الانتقال إلى موقع تقارير المداومة 📝
    </a>
    <button onclick="closeModal();" class="focus-btn focus-btn-notify" style="width: 100%;">
      سأملؤه لاحقاً
    </button>
  `;
  openModal();
}

// ── 16. إدارة تبويبات البروتوكولات وقوائم الدخول والخروج التفاعلية ──
const PROTOCOL_STORAGE_KEY = 'joussour_protocol_checks_v1';
const PROTOCOL_TOTALS = { entry: 4, exit: 5 };
let protocolChecksState = { date: '', entry: {}, exit: {} };

function getTodayProtocolKey() {
  const now = new Date();
  return (
    now.getFullYear() +
    '-' +
    String(now.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(now.getDate()).padStart(2, '0')
  );
}

function loadProtocolChecksState() {
  const today = getTodayProtocolKey();
  try {
    const raw = localStorage.getItem(PROTOCOL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.date === today) {
        protocolChecksState = {
          date: today,
          entry: parsed.entry || {},
          exit: parsed.exit || {}
        };
        return;
      }
    }
  } catch (e) {}
  protocolChecksState = { date: today, entry: {}, exit: {} };
}

function saveProtocolChecksState() {
  try {
    protocolChecksState.date = getTodayProtocolKey();
    localStorage.setItem(PROTOCOL_STORAGE_KEY, JSON.stringify(protocolChecksState));
  } catch (e) {}
}

function initProtocolChecklists() {
  loadProtocolChecksState();
  renderProtocolChecklist('entry');
  renderProtocolChecklist('exit');
}

function renderProtocolChecklist(type) {
  const total = PROTOCOL_TOTALS[type] || 0;
  const items = document.querySelectorAll(`.protocol-checklist-item[data-protocol="${type}"]`);
  let doneCount = 0;

  items.forEach((item) => {
    const idx = item.getAttribute('data-step');
    const isChecked = Boolean(protocolChecksState[type] && protocolChecksState[type][idx]);
    if (isChecked) {
      item.classList.add('checked');
      doneCount++;
    } else {
      item.classList.remove('checked');
    }
  });

  const progressText = document.getElementById(`${type}ProgressText`);
  if (progressText) {
    progressText.textContent = `تم إنجاز ${doneCount} من ${total}`;
  }

  const progressFill = document.getElementById(`${type}ProgressFill`);
  if (progressFill) {
    const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;
    progressFill.style.width = `${pct}%`;
  }
}

function toggleProtocolCheck(type, index) {
  loadProtocolChecksState();
  const key = String(index);
  if (!protocolChecksState[type]) protocolChecksState[type] = {};
  const nextVal = !Boolean(protocolChecksState[type][key]);
  protocolChecksState[type][key] = nextVal;
  saveProtocolChecksState();
  renderProtocolChecklist(type);

  audio.playWaterDrop();
  if (navigator.vibrate) {
    navigator.vibrate(25);
  }

  const total = PROTOCOL_TOTALS[type] || 0;
  let doneCount = 0;
  for (let i = 0; i < total; i++) {
    if (protocolChecksState[type][String(i)]) doneCount++;
  }

  if (nextVal && doneCount === total) {
    audio.playSuccessChime();
    if (type === 'entry') {
      showToast('✨ أحسنت! أتممت جميع خطوات بروتوكول الدخول بنجاح 🌿');
    } else {
      showToast('✨ بارك الله فيك! أتممت جميع خطوات بروتوكول الخروج بنجاح 🌿');
    }
  }
}

function resetProtocolChecklist(type) {
  loadProtocolChecksState();
  protocolChecksState[type] = {};
  saveProtocolChecksState();
  renderProtocolChecklist(type);
  audio.playCeramicClick();
  showToast('🔄 تم تصفير قائمة التحقق بنجاح');
}

function switchAdabSubTab(subTabId) {
  audio.playCeramicClick();
  document.querySelectorAll('.adab-subtab-pane').forEach((pane) => {
    pane.style.display = 'none';
  });
  const targetPane = document.getElementById(subTabId);
  if (targetPane) {
    targetPane.style.display = 'block';
  }

  document.querySelectorAll('.adab-nav-pill').forEach((pill) => {
    if (pill.getAttribute('data-adabtab') === subTabId) {
      pill.classList.add('active');
      if (pill.scrollIntoView) {
        pill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    } else {
      pill.classList.remove('active');
    }
  });
}

function openProtocolTab(subTabId) {
  switchScreen('screen-adab');
  switchAdabSubTab(subTabId);
}
