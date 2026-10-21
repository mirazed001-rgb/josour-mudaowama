/* ═════════════════════════════════════════════════════════════════════
   محرك تطبيق مداومة جسور — الخلية والمحراب الأندلسي
   ملف المداوم المرن، الأذكار التفاعلية بالنقرات، البومودورو، والتكافل
   ═════════════════════════════════════════════════════════════════════ */

// ── 1. محرك المؤثرات الصوتية الأندلسية (Web Audio API Synthesizer) ──
class AndalusAudioEngine {
  constructor() {
    this.ctx = null;
    this.ambientSource = null;
    this.ambientGain = null;
    this.currentAmbient = null;
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

  playAmbient(type) {
    this.stopAmbient();
    this.initContext();
    this.currentAmbient = type;

    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.3;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    if (type === 'water') {
      filter.type = 'bandpass';
      filter.frequency.value = 650;
      filter.Q.value = 2.5;
    } else if (type === 'breeze') {
      filter.type = 'lowpass';
      filter.frequency.value = 400;
    } else if (type === 'manuscript') {
      filter.type = 'highpass';
      filter.frequency.value = 1800;
    }

    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(this.ambientGain);
    this.ambientGain.connect(this.ctx.destination);

    whiteNoise.start();
    this.ambientSource = whiteNoise;
  }

  stopAmbient() {
    if (this.ambientSource) {
      try {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
        setTimeout(() => {
          this.ambientSource.stop();
          this.ambientSource.disconnect();
          this.ambientSource = null;
        }, 300);
      } catch (e) {}
    }
    this.currentAmbient = null;
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
  
  // الملف الشخصي وجدول المناوبات المفصل لكل يوم
  userProfile: {
    fullName: '',
    partnerName: '',
    schedule: {
      sat: 'none', // 'none', 'morning', 'evening', 'both'
      sun: 'morning',
      mon: 'none',
      tue: 'none',
      wed: 'none',
      thu: 'evening'
    }
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

  // قائمة التكافل (قابلة للحذف والإضافة)
  takafulRequests: [
    {
      id: 1,
      name: 'أحمد زروقي',
      shift: 'الفترة المسائية (12:30 – 15:30)',
      day: 'غداً الخميس',
      reason: 'ظرف عائلي طارئ وامتحان استدراكي',
      claimed: false,
      claimedBy: null
    },
    {
      id: 2,
      name: 'سارة لعموري',
      shift: 'الفترة الصباحية (08:30 – 12:45)',
      day: 'الأحد القادم',
      reason: 'سفر مفاجئ لزيارة الأهل',
      claimed: false,
      claimedBy: null
    }
  ],

  // كبسولات المداومة
  capsules: [
    {
      author: 'آية ز.',
      text: 'المكان هادئ ومعطر؛ وقد تركتُ كتاب فتح الباري مرتباً على رف المراجع، وراجعتُ لمبات القاعة. بالتوفيق للمداوم بعدي!',
      date: 'اليوم 12:40'
    },
    {
      author: 'بلال م.',
      text: 'شاي الأعشاب في الخزانة العلوية، لا تنسوا ركعتي الضحى وتجديد النية. بارك الله في مسعاكم.',
      date: 'أمس 15:20'
    }
  ],

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
        <div style="text-align: right; font-size: 0.88rem; color: #cbd5e1; line-height: 1.6;">
          <p style="margin-bottom: 10px; color: var(--sun-gold-bright); font-weight: bold;">
            لتثبيت التطبيق على شاشة هاتفك الرئيسية:
          </p>
          <div style="background: rgba(0,0,0,0.3); padding: 10px 12px; border-radius: 10px; margin-bottom: 8px;">
            <strong style="color: var(--sea-blue-sky);">🤖 لهواتف أندرويد (Chrome):</strong><br>
            1. اضغط على زر القائمة (النقاط الثلاث <strong style="color:#fff;">⋮</strong>) في أعلى يمين المتصفح.<br>
            2. اختر <strong style="color: var(--sun-gold-bright);">«تثبيت التطبيق» (Install app)</strong> أو <strong style="color: var(--sun-gold-bright);">«إضافة إلى الشاشة الرئيسية»</strong>.<br>
            3. <em>ملاحظة لهواتف شاومي/ريدمي/أوبو:</em> تأكد من أن إذن "اختصارات الشاشة الرئيسية" مفعّل لمتصفح Chrome في إعدادات التطبيقات بالهاتف.
          </div>
          <div style="background: rgba(0,0,0,0.3); padding: 10px 12px; border-radius: 10px; margin-bottom: 12px;">
            <strong style="color: var(--foliage-mint);">🍏 لهواتف آيفون (Safari):</strong><br>
            1. اضغط على زر المشاركة <strong style="color:#fff;">⎋</strong> أسفل الشاشة.<br>
            2. اختر <strong style="color: var(--sun-gold-bright);">«إضافة إلى الصفحة الرئيسية» (Sur l'écran d'accueil)</strong>.
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
  loadQuickNotes();
  loadUserProfile();
  setupNavigation();
  setupClickGlowAndSounds();
  renderFullAdhkar();
  renderTakafulList();
  renderCapsules();
  renderQuickNotes();
  initDutyNotificationScheduler();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
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
  DutyState.activeScreen = screenId;

  document.querySelectorAll('.view-screen').forEach(scr => {
    scr.classList.remove('active');
  });
  const activeScr = document.getElementById(screenId);
  if (activeScr) {
    activeScr.classList.add('active');
  }

  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-screen') === screenId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

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

// ── 5. الملف الشخصي للمداوم وحفظ مناوبته المفصلة لكل يوم ──
function loadUserProfile() {
  const saved = localStorage.getItem('joussour_duty_user_profile_v2');
  if (saved) {
    try {
      DutyState.userProfile = JSON.parse(saved);
    } catch (e) {}
  }

  const nameInput = document.getElementById('profileFullNameInput');
  const partnerInput = document.getElementById('profilePartnerInput');
  
  if (nameInput && DutyState.userProfile.fullName) {
    nameInput.value = DutyState.userProfile.fullName;
  }
  if (partnerInput && DutyState.userProfile.partnerName) {
    partnerInput.value = DutyState.userProfile.partnerName;
  }

  // استرجاع أوقات كل يوم (بما فيها يوم السبت)
  const schedule = DutyState.userProfile.schedule || {};
  if (document.getElementById('shiftDay_sat')) document.getElementById('shiftDay_sat').value = schedule.sat || 'none';
  if (document.getElementById('shiftDay_sun')) document.getElementById('shiftDay_sun').value = schedule.sun || 'morning';
  if (document.getElementById('shiftDay_mon')) document.getElementById('shiftDay_mon').value = schedule.mon || 'none';
  if (document.getElementById('shiftDay_tue')) document.getElementById('shiftDay_tue').value = schedule.tue || 'none';
  if (document.getElementById('shiftDay_wed')) document.getElementById('shiftDay_wed').value = schedule.wed || 'none';
  if (document.getElementById('shiftDay_thu')) document.getElementById('shiftDay_thu').value = schedule.thu || 'evening';

  updateProfileBadgeUI();
  updateNotifStatusUI();
}

function saveUserProfile() {
  const nameInput = document.getElementById('profileFullNameInput');
  const partnerInput = document.getElementById('profilePartnerInput');

  const fullName = nameInput.value.trim();
  if (!fullName) {
    showToast('⚠️ يرجى كتابة اسمك الكريم لتثبيت ملفك');
    return;
  }

  DutyState.userProfile.fullName = fullName;
  DutyState.userProfile.partnerName = partnerInput.value.trim() || 'زميل المناوبة';
  DutyState.userProfile.schedule = {
    sat: document.getElementById('shiftDay_sat') ? document.getElementById('shiftDay_sat').value : 'none',
    sun: document.getElementById('shiftDay_sun') ? document.getElementById('shiftDay_sun').value : 'morning',
    mon: document.getElementById('shiftDay_mon') ? document.getElementById('shiftDay_mon').value : 'none',
    tue: document.getElementById('shiftDay_tue') ? document.getElementById('shiftDay_tue').value : 'none',
    wed: document.getElementById('shiftDay_wed') ? document.getElementById('shiftDay_wed').value : 'none',
    thu: document.getElementById('shiftDay_thu') ? document.getElementById('shiftDay_thu').value : 'evening'
  };

  localStorage.setItem('joussour_duty_user_profile_v2', JSON.stringify(DutyState.userProfile));

  updateProfileBadgeUI();
  checkDutyNotificationTimer();
  audio.playSuccessChime();
  showToast(`✨ مرحباً بك يا ${fullName}! تم حفظ وتثبيت جدول مناوبتك المخصص بنجاح.`);
  switchScreen('screen-cockpit');
}

function updateProfileBadgeUI() {
  const badgeNameEl = document.getElementById('topProfileNameDisplay');
  const badgeShiftEl = document.getElementById('topProfileShiftDisplay');
  const bannerPartnerEl = document.getElementById('proactivePartnerEl');

  const name = DutyState.userProfile.fullName || 'أخي المداوم، أختي المداومة';

  // صياغة ملخص الأيام المحددة مع السبت
  const daysArabic = { sat: 'السبت', sun: 'الأحد', mon: 'الإثنين', tue: 'الثلاثاء', wed: 'الأربعاء', thu: 'الخميس' };
  const shiftsArabic = { morning: 'صباحاً', evening: 'مساءً', both: 'صباحاً ومساءً' };
  
  let summary = [];
  const sched = DutyState.userProfile.schedule || {};
  for (let k in daysArabic) {
    if (sched[k] && sched[k] !== 'none' && shiftsArabic[sched[k]]) {
      summary.push(`${daysArabic[k]} (${shiftsArabic[sched[k]]})`);
    }
  }

  if (badgeNameEl) badgeNameEl.textContent = name;
  if (badgeShiftEl) {
    badgeShiftEl.textContent = summary.length > 0 ? summary.join(' • ') : 'لم يتم تحديد جدول بعد';
  }
  if (bannerPartnerEl) bannerPartnerEl.textContent = DutyState.userProfile.partnerName || 'عبد الرحيم قاسي';
}

// ── 6. نظام مؤقت الإشعارات التلقائي (ساعتان قبل موعد المناوبة) ──
function initDutyNotificationScheduler() {
  updateNotifStatusUI();
  checkDutyNotificationTimer();
  // فحص دوري كل 30 ثانية لتنبيه المداوم فور حلول موعد الساعتين
  setInterval(checkDutyNotificationTimer, 30000);
}

function updateNotifStatusUI() {
  const statusEl = document.getElementById('notifStatusText');
  if (!statusEl) return;
  if (!('Notification' in window)) {
    statusEl.textContent = 'المتصفح لا يدعم الإشعارات المنبثقة مباشرة ⚠️';
    return;
  }
  if (Notification.permission === 'granted') {
    statusEl.innerHTML = '<span style="color: var(--foliage-mint); font-weight: bold;">مفعّل تلقائياً ومضبوط (قبل ساعتين من مناوبتك) ✅</span>';
  } else if (Notification.permission === 'denied') {
    statusEl.innerHTML = '<span style="color: #f87171;">الإشعارات محجوبة في إعدادات المتصفح ❌</span>';
  } else {
    statusEl.textContent = 'انقر على "تفعيل الإشعارات" لتلقي التنبيه قبل المناوبة بساعتين ⏰';
  }
}

function requestNotificationPermission() {
  if (!('Notification' in window)) {
    showToast('⚠️ متصفحك لا يدعم نظام الإشعارات المنبثقة');
    return;
  }
  Notification.requestPermission().then(permission => {
    updateNotifStatusUI();
    if (permission === 'granted') {
      audio.playSuccessChime();
      showToast('🔔 تم تفعيل إشعارات التنبيه التلقائية بنجاح!');
      sendDutySystemNotification('الفترة المحددة', 'ساعتان قبل المناوبة');
      checkDutyNotificationTimer();
    } else {
      showToast('ℹ️ يرجى السماح بالإشعارات من شريط المتصفح لتلقي التنبيهات');
    }
  });
}

function checkDutyNotificationTimer() {
  const now = new Date();
  const dayKeys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const todayKey = dayKeys[now.getDay()];
  const sched = DutyState.userProfile.schedule || {};
  const todayShift = sched[todayKey] || 'none';

  if (todayShift === 'none') return;

  const todayStr = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');

  // فحص الفترة الصباحية (تبدأ 08:30 -> التنبيه قبل ساعتين في 06:30)
  if (todayShift === 'morning' || todayShift === 'both') {
    const alertTimeMorning = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 30, 0);
    const startTimeMorning = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 30, 0);

    const sentKeyMorning = `duty_notif_sent_${todayStr}_morning`;
    if (now >= alertTimeMorning && now < startTimeMorning) {
      if (!localStorage.getItem(sentKeyMorning)) {
        localStorage.setItem(sentKeyMorning, 'true');
        sendDutySystemNotification('الفترة الصباحية', '08:30 – 12:45');
      }
    }
  }

  // فحص الفترة المسائية (تبدأ 12:30 -> التنبيه قبل ساعتين في 10:30)
  if (todayShift === 'evening' || todayShift === 'both') {
    const alertTimeEvening = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 30, 0);
    const startTimeEvening = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 30, 0);

    const sentKeyEvening = `duty_notif_sent_${todayStr}_evening`;
    if (now >= alertTimeEvening && now < startTimeEvening) {
      if (!localStorage.getItem(sentKeyEvening)) {
        localStorage.setItem(sentKeyEvening, 'true');
        sendDutySystemNotification('الفترة المسائية', '12:30 – 15:30');
      }
    }
  }
}

function sendDutySystemNotification(shiftName, shiftTime) {
  const title = '⏰ تنبيه المداومة — نادي جسور';
  const name = DutyState.userProfile.fullName ? DutyState.userProfile.fullName : 'أخي المداوم، أختي المداومة';
  const body = `${name}، بقيت ساعتان على موعد مناوبتك (${shiftName}: ${shiftTime}). جدد نيتك وأفرد قصدك لله تعالى 🌿`;

  // إرسال الإشعار عبر Service Worker أو Notification API مباشرة
  if ('Notification' in window && Notification.permission === 'granted') {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then(reg => {
        reg.showNotification(title, {
          body: body,
          icon: 'logo.png',
          badge: 'logo.png',
          vibrate: [200, 100, 200],
          tag: 'duty-2h-alert',
          renotify: true
        });
      });
    } else {
      try {
        new Notification(title, {
          body: body,
          icon: 'logo.png'
        });
      } catch (e) {
        console.warn('Direct notification failed:', e);
      }
    }
  }

  audio.playSuccessChime();
  showToast(`⏰ إشعار المداومة: بقيت ساعتان على موعد مناوبتك (${shiftName})`);
}

function goToAppropriateAdhkar() {
  switchScreen('screen-adhkar');
  const now = new Date().getHours();
  const targetSubTab = now < 12 ? 'subtab-morning' : 'subtab-evening';
  switchAdhkarSubTab(targetSubTab);
  showToast(now < 12 ? '☀️ تقبل الله أذكار صباحك وطيب مسعاك' : '🌙 تقبل الله أذكار مسائك وطيب مسعاك');
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
    btnText.textContent = 'ابدأ المداومة (اختياري) ✨';
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
  const bookInput = document.getElementById('bookTitleInput');
  const bookName = bookInput.value.trim() || 'أحد المراجع العلمية النافعة';
  const userName = DutyState.userProfile.fullName || 'أخوكم المداوم';

  audio.playSuccessChime();
  showToast(`📖 أُرسل إشعار لجميع الرفاق: ${userName} في خلوة معرفية واستغراق مع كتاب «${bookName}»، فلنحترم استغراقه العلمي.`);
}

// ── 9. مكتبة السكينة الأندلسية ──
function toggleAmbientSound(soundType) {
  const pills = document.querySelectorAll('.sound-pill');
  if (audio.currentAmbient === soundType) {
    audio.stopAmbient();
    pills.forEach(p => p.classList.remove('active'));
    showToast('🔇 تم إيقاف الصوت الهادئ');
  } else {
    pills.forEach(p => {
      if (p.getAttribute('data-sound') === soundType) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });
    audio.playAmbient(soundType);
    let title = 'خرير مياه الحمراء';
    if (soundType === 'breeze') title = 'نسيم رياض الأندلس';
    if (soundType === 'manuscript') title = 'حفيف أوراق المخطوطات';
    showToast(`🌿 تشغيل صوت: ${title}`);
  }
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

// ── 11. رواق التكافل (طلب بديل، حذف، وإشعار مزدوج) ──
function renderTakafulList() {
  const container = document.getElementById('takafulListContainer');
  if (!container) return;
  container.innerHTML = '';

  if (DutyState.takafulRequests.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: #94a3b8; font-size: 0.88rem; padding: 20px; background: rgba(0,0,0,0.25); border-radius: 16px;">
        لا توجد أي مناوبات بانتظار الإسناد حالياً، الحمد لله. 🌿
      </div>
    `;
    return;
  }

  DutyState.takafulRequests.forEach(req => {
    const card = document.createElement('div');
    card.className = 'takaful-card tap-glow';
    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span style="font-family: var(--font-traditional); font-size: 1.25rem; font-weight: 700; color: var(--sun-gold-bright);">
          فارس الإسناد: ${req.name}
        </span>
        <div style="display: flex; gap: 6px; align-items: center;">
          <span class="card-badge" style="background: rgba(234, 88, 12, 0.25); color: var(--sun-gold-bright); border-color: var(--terracotta);">
            ${req.day}
          </span>
          <button onclick="deleteTakafulRequest(${req.id})" class="takaful-delete-btn" title="حذف هذا الطلب">
            🗑️
          </button>
        </div>
      </div>
      <p style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 6px;">⏰ ${req.shift}</p>
      <p style="font-size: 0.88rem; color: #f1f5f9; background: rgba(0,0,0,0.35); padding: 8px 12px; border-radius: 12px; margin-bottom: 12px;">
        العذر: ${req.reason}
      </p>
      ${req.claimed ? `
        <div style="text-align: center; color: var(--foliage-mint); font-weight: 800; font-size: 0.95rem; padding: 10px; background: rgba(16, 185, 129, 0.2); border-radius: 12px;">
          ✅ تكفل بها أخوكم: ${req.claimedBy} (جزاه الله خيراً)
        </div>
      ` : `
        <button onclick="claimTakaful(${req.id})" class="takaful-claim-btn tap-glow">
          أنا لها! (أتكفل بالمناوبة إيثاراً) 🤝
        </button>
      `}
    `;
    container.appendChild(card);
  });
}

function deleteTakafulRequest(id) {
  DutyState.takafulRequests = DutyState.takafulRequests.filter(r => r.id !== id);
  audio.playCeramicClick();
  renderTakafulList();
  showToast('🗑️ تم حذف الطلب بنجاح.');
}

function claimTakaful(id) {
  const req = DutyState.takafulRequests.find(r => r.id === id);
  if (req) {
    req.claimed = true;
    req.claimedBy = DutyState.userProfile.fullName || 'أنت';
    audio.playSuccessChime();
    renderTakafulList();
    showToast(`🌟 جزاك الله خيراً! تكفلت بمناوبة ${req.name}، وأُرسلت رسالة شكر له وتحديث الجدول.`);
  }
}

function openNewTakafulModal() {
  const modal = document.getElementById('shiftDetailsModal');
  const title = document.getElementById('modalShiftTitle');
  const body = document.getElementById('modalShiftBody');

  title.textContent = 'طلب بديل في رواق التكافل';
  body.innerHTML = `
    <p style="font-size: 0.88rem; color: #cbd5e1; margin-bottom: 12px;">
      اكتب سبب تعذرك باختصار ليظهر لإخوانك الراغبين في التعويض:
    </p>
    <textarea id="takafulReasonInput" rows="3" class="book-title-input" placeholder="مثال: ظرف دراسي، سفر، موعد طبي..."></textarea>
    <button onclick="submitTakafulRequest(); closeModal();" class="takaful-claim-btn" style="margin-top: 10px;">
      نشر النداء في التطبيق والتيليجرام 📢
    </button>
  `;
  openModal();
}

function submitTakafulRequest() {
  const reason = document.getElementById('takafulReasonInput').value.trim() || 'عذر طارئ';
  const userName = DutyState.userProfile.fullName || 'أحد المداومين';

  const newReq = {
    id: Date.now(),
    name: userName,
    shift: 'المناوبة المحددة في ملفي',
    day: 'المناوبة القادمة',
    reason: reason,
    claimed: false,
    claimedBy: null
  };
  DutyState.takafulRequests.unshift(newReq);
  renderTakafulList();
  audio.playSuccessChime();

  showToast('📢 نُشر النداء في سوق التكافل وأُرسل إشعار لهواتف الرفاق مع ومضة التيليجرام');
}

// ── 12. كبسولة المداومة (رسائل الرفاق مع إمكانية الحذف) ──
function loadCapsules() {
  const saved = localStorage.getItem('joussour_duty_capsules_v2');
  if (saved) {
    try {
      DutyState.capsules = JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
  }
}

function saveCapsules() {
  localStorage.setItem('joussour_duty_capsules_v2', JSON.stringify(DutyState.capsules));
}

function renderCapsules() {
  const list = document.getElementById('capsulesListContainer');
  if (!list) return;
  list.innerHTML = '';

  if (!DutyState.capsules || DutyState.capsules.length === 0) {
    list.innerHTML = `
      <div style="text-align: center; color: #94a3b8; font-size: 0.85rem; padding: 14px; background: rgba(0,0,0,0.25); border-radius: 12px; margin-bottom: 8px;">
        الصندوق الخشبي فارغ حالياً. كن أول من يضع نصيحة أو دعاء لأخيه المداوم 🌿
      </div>
    `;
    return;
  }

  DutyState.capsules.forEach((cap, idx) => {
    const item = document.createElement('div');
    item.className = 'capsule-card tap-glow';
    item.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <span style="font-weight: 800; color: var(--sun-gold-bright); font-size: 0.88rem;">💌 من: ${cap.author}</span>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 0.72rem; color: #94a3b8;">${cap.date}</span>
          <button onclick="deleteCapsule(${idx})" class="capsule-delete-btn" title="حذف هذه الرسالة">
            🗑️
          </button>
        </div>
      </div>
      <p style="font-size: 0.85rem; color: #f1f5f9; line-height: 1.5; margin: 0;">${cap.text}</p>
    `;
    list.appendChild(item);
  });
}

function deleteCapsule(idx) {
  DutyState.capsules.splice(idx, 1);
  saveCapsules();
  audio.playCeramicClick();
  renderCapsules();
  showToast('🗑️ تم حذف الرسالة من كبسولة المداومة بنجاح.');
}

function addNewCapsule() {
  const textInput = document.getElementById('newCapsuleInput');
  const text = textInput.value.trim();
  if (!text) {
    showToast('⚠️ اكتب رسالتك للمداوم التالي أولاً');
    return;
  }
  const now = new Date();
  const timeStr = 'اليوم ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  DutyState.capsules.unshift({
    author: DutyState.userProfile.fullName || 'أنت',
    text: text,
    date: timeStr
  });
  saveCapsules();
  renderCapsules();
  textInput.value = '';
  audio.playSuccessChime();
  showToast('💌 وُضعت كبسولتك الطيبة في الصندوق الخشبي للمداوم التالي');
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
      <div style="background: rgba(0,0,0,0.35); border: 1px dashed var(--sea-blue-sky); border-radius: 12px; padding: 10px 12px; margin-bottom: 14px; text-align: right;">
        <div style="font-size: 0.82rem; font-weight: 800; color: var(--sun-gold-bright); margin-bottom: 6px;">
          📋 ملاحظاتك ومواقفك المسجلة اليوم (${DutyState.quickNotes.length}):
        </div>
        <div style="max-height: 120px; overflow-y: auto; font-size: 0.78rem; color: #f1f5f9; line-height: 1.5; margin-bottom: 8px;">
          ${DutyState.quickNotes.map(n => `<div style="margin-bottom: 4px;">• [${n.time}] ${escapeHtml(n.text)}</div>`).join('')}
        </div>
        <button onclick="copyAllQuickNotes()" class="quick-note-btn" style="width: 100%; padding: 6px; font-weight: bold; background: rgba(56, 189, 248, 0.2);">
          نسخ جميع الملاحظات للتقرير 📋
        </button>
      </div>
    `;
  }

  body.innerHTML = `
    <p style="font-size: 0.95rem; color: #cbd5e1; margin-bottom: 14px; text-align: center; line-height: 1.6;">
      تقبل الله جهودك وبذلك! تفضل بالدخول إلى رابط موقع التقارير المعتمد لملء تقرير مناوبتك بنفسك:
    </p>
    ${notesHtml}
    <a href="https://thefirststepstep-alt.github.io/josour-duty-reports/" target="_blank" class="takaful-claim-btn" style="display: block; text-align: center; text-decoration: none; margin-bottom: 10px;">
      الانتقال إلى موقع تقارير المداومة 📝
    </a>
    <button onclick="closeModal();" class="focus-btn focus-btn-notify" style="width: 100%;">
      سأملؤه لاحقاً
    </button>
  `;
  openModal();
}
