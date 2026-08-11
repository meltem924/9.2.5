const state = { stage: 0, maxStage: 6 };

const s1Data = [
    { text: "Tariat (Terhin) Kitabesi", answer: "primary", image: "s1-image-1", explanation: "Uygur Kağanlığı döneminden (753) kalma doğrudan yazılı anıt olduğu için 1. el kaynaktır." },
    { text: "Tarih Ders Kitabı Konu Anlatımı", answer: "secondary", image: "s1-image-5", explanation: "Olayların yaşandığı dönemden çok sonra, birincil kaynaklar incelenerek kaleme alındığı için 2. el kaynaktır." },
    { text: "Pazırık Kurganı Tören Arabası", answer: "primary", image: "s1-image-2", explanation: "Asya Hunları döneminden günümüze ulaşan doğrudan orijinal bir arkeolojik buluntu olduğu için 1. el kaynaktır." },
    { text: "Tarih Araştırma Makaleleri", answer: "secondary", image: "s1-image-6", explanation: "Tarihçilerin 1. el kaynakları inceleyip yorumlayarak günümüzde yazdığı bilimsel eserler olduğu için 2. el kaynaktır." },
    { text: "Orhun Yazıtları", answer: "primary", image: "s1-image-3", explanation: "Göktürkler çağında Bilge Kağan ve Kül Tigin adına dikilmiş doğrudan dönem belgesi olduğu için 1. el kaynaktır." },
    { text: "Çin Yıllıkları", answer: "primary", image: "s1-image-4", explanation: "Olayların gerçekleştiği dönemde komşu Çinli elçiler ve tarihçiler tarafından tutulan çağdaş kayıtlar olduğu için 1. el kaynaktır." }
];

const s2Data = [
    { front: "Barınak", back: "Keçe Çadır (Yurt/Otağ) — Korluk (ocak) ve Kerevet (sedir)" },
    { front: "Ulaşım & Taşıma", back: "At, deve ve 4 tekerlekli ev-arabalar" },
    { front: "Giyim & Kuşam", back: "Ton (elbise), Börk (başlık) ve deri çizmeler" },
    { front: "Beslenme & Saklama", back: "Pastırma (eğer altı et), Kımız, Tutmaç ve Yahni" },
    { front: "Hukuk & Töre", back: "Töre kuralları ve en fazla 10 günlük hapis cezası" },
    { front: "Anıt & İnanç", back: "Balbal mezar taşları ve hayvan üslubu motifler" }
];

const s3Data = [
    { 
        cause: "Yaz aylarında otlakların kuruması ve aşırı sıcaklar", 
        effect: "Serin ve otlağı bol olan yaylaklara göç edilmesi", 
        wrong: "Kalıcı taş binalarla büyük şehirler inşa edilmesi",
        correctExplanation: "Tarihsel Çıkarım: Konargöçer Türkler hayvanlarını korumak ve otlatmak için yazın serin yaylaklara göç etmişlerdir.",
        wrongExplanation: "Gözden Geçirelim: Konargöçer yaşam tarzında mevsime ve otlaklara bağımlılık nedeniyle sabit taş yapılardan oluşan şehirler inşa edilmezdi."
    },
    { 
        cause: "Konargöçer yaşamın getirdiği sürekli hareket ve hafiflik ihtiyacı", 
        effect: "Hapis cezalarının en fazla 10 gün ile sınırlandırılması", 
        wrong: "Devasa hapishane binaları ve mahkeme kompleksleri kurulması",
        correctExplanation: "Tarihsel Çıkarım: Hareketli konargöçer yaşam nedeniyle sabit hapishaneler yapılmamış, hapis cezası en fazla 10 gün ile sınırlandırılmıştır.",
        wrongExplanation: "Gözden Geçirelim: Konargöçer yapıda sürekli hareket halinde olunduğu için sabit ve yüksek kapasiteli hapishaneler kurulması istenmemiştir."
    },
    { 
        cause: "Askeri seferlerde et yiyeceğinin uzun süre bozulmadan saklanması gereksinimi", 
        effect: "At eğeri altında etin tuzlanıp sıkıştırılmasıyla pastırma üretilmesi", 
        wrong: "Etlerin cam kavanozlarda konserve yapılarak saklanması",
        correctExplanation: "Tarihsel Çıkarım: Türkler 'bastırmaktan' türeyen pastırma yöntemiyle eti eğere bağlayıp kurutarak uzun süre saklamışlardır.",
        wrongExplanation: "Gözden Geçirelim: O dönemde cam kavanoz ve modern konserve teknolojisi bulunmuyordu; etler eğer altında tuzlanıp kurutulurdu."
    },
    { 
        cause: "Bozkırın çetin coğrafi koşulları ve sürekli savunma ihtiyacı", 
        effect: "Eli silah tutan herkesin savaşçı sayıldığı Ordu-Millet anlayışı", 
        wrong: "Sadece soylulardan oluşan maaşlı profesyonel ordu kurulması",
        correctExplanation: "Tarihsel Çıkarım: Türklerde sınıfsal ayrım yapılmamış, kadın ve erkek herkes küçük yaştan itibaren savaşçı yetişmiştir.",
        wrongExplanation: "Gözden Geçirelim: Konargöçer Türk toplumunda sınıfsal ayrım yoktur; eli silah tutan herkesin asker sayıldığı ordu-millet anlayışı esastır."
    }
];

const s4Data = [
    {
        id: "ocak",
        name: "Merkez Ateşi (Korluk)",
        emoji: "🔥",
        hint: "Çadırın ortasında yanan ocak ve kışlak ısınma yöntemi",
        top: 58,
        left: 48,
        title: "Yaylak, Kışlak ve Isınma",
        detail: "Konargöçer Türkler dondurucu kış soğuklarında korunaklı kışlaklara çekilir, çadırın ortasındaki ocakta (korluk) ısınırlardı. Yazın ise hayvanlarını otlatmak için yüksek ve serin yaylaklara göç ederlerdi."
    },
    {
        id: "silah",
        name: "Demir Kılıç & Zırhlar",
        emoji: "⚔️",
        hint: "Demircilik zanaatı ve Ordu-Millet yapısı",
        top: 48,
        left: 20,
        title: "Demircilik ve Ordu-Millet",
        detail: "Türkler işledikleri demir kılıç ve eşyaları satarak komşu devletlerden pirinç ve ipek kumaş almışlardır. Ayrıca bozkır koşulları nedeniyle eli silah tutan herkes (kadın-erkek) asker sayılmıştır."
    },
    {
        id: "sandik",
        name: "Ahşap Sandık & İpekler",
        emoji: "📦",
        hint: "Ticaret malları ve sosyal refah",
        top: 66,
        left: 82,
        title: "Ticaret ve Sosyal Dayanışma",
        detail: "Türkler ürettikleri et, deri, keçe ve demir eşyalar karşılığında ipek kumaşlar ve hububat temin ederlerdi. Türk Kağanları halkı giydirmeyi ve doyurmayı temel sorumluluk sayarlardı."
    },
    {
        id: "besin",
        name: "Kımız & Saklama Kabı",
        emoji: "🥩",
        hint: "Temel besin maddeleri ve pastırma üretimi",
        top: 74,
        left: 36,
        title: "Beslenme ve Gıda Saklama",
        detail: "Savaş ve seferlerde etin bozulmaması için et at eğeri altında tuzlanıp sıkıştırılarak Pastırma yapılırdı. Kısrak sütünden Kımız ve besleyici Tutmaç çorbası temel besinler arasındaydı."
    },
    {
        id: "giyim",
        name: "Giyim, Börk & Çizmeler",
        emoji: "👘",
        hint: "Geleneksel Türk kıyafetleri ve çizmeler",
        top: 38,
        left: 70,
        title: "Giyim Kültürü ve Dünya Etkisi",
        detail: "Türklerin giydiği Ton (elbise), Börk (başlık) ve rahat hareket sağlayan deri çizmeler at binmeyi kolaylaştırırdı. Romalılar keten gömlekleri ilk kez Avrupa Hunlarında görmüş ve etkilenmişlerdir."
    },
    {
        id: "cadir",
        name: "Keçe Çadır & Aile Düzeni",
        emoji: "🏕️",
        hint: "Çadır mimarisi ve toplumsal örgütlenme",
        top: 25,
        left: 33,
        title: "Toplumsal Yapı (Oguş ve Urug)",
        detail: "Toplumun en küçük birimi Oguş (aile) birleşerek Urug (sülale), Boy, Budun ve İl'i (devlet) oluştururdu. Çadır içindeki tüm yaşam yazısız hukuk kuralı olan Töre'ye göre düzenlenirdi."
    }
];

const s5Data = [
    { 
        item: "Kımız (kısrak sütü) ve tutmaç yemeğinin tüketilmesi", 
        category: "past",
        hint: "Kısrak sütünden elde edilen kımız ve besleyici tutmaç çorbası Eski Türk bozkır kültürüne ait geleneksel gıdalardır."
    },
    { 
        item: "At eğeri altında pastırma imal edilmesi", 
        category: "past",
        hint: "Savaşa giden Türk süvarilerinin eti at eğeri altında tuzlayıp sıkıştırarak kurutması eski bozkır savaşçılık geleneğidir."
    },
    { 
        item: "Kök Börü ve Çevgen atlı oyunlarının oynanması", 
        category: "past",
        hint: "Kök börü ve çevgen (cirit benzeri) atlı oyunları eski Türklerin çeviklik ve savaş hazırlığı antrenmanı oyunlarıdır."
    },
    { 
        item: "Tarhana, erişte, gözleme ve keşkek gibi yöresel yemeklerin tüketilmesi", 
        category: "present",
        hint: "Tarhana, keşkek ve erişte yerleşik hayata geçişle birlikte Anadolu kültürümüzde günümüzde yaygınlaşan yemeklerimizdir."
    },
    { 
        item: "Sebze yetiştiriciliği, ev yapımı ürünler ve turizmden geçim sağlanması", 
        category: "present",
        hint: "Tarım, turizm ve ev yapımı ürün üretimi modern zamanlarda ve günümüzde önemli geçim kaynaklarımızdandır."
    },
    { 
        item: "Kara çadır ve konak adı verilen evlerin kullanılması", 
        category: "both",
        hint: "Keçe/kara çadırlar ilk Türklerden beri kullanılmış olup günümüzde Toroslarda Yörükler tarafından hâlâ kullanılmaktadır."
    },
    { 
        item: "Mevsimsel otlak göçlerine dayalı hayvancılık yaşam biçimi", 
        category: "both",
        hint: "Yaylacılık ve mevsimlik hayvancılık göçleri hem İlk Türklerde hem de günümüz Türkiye'sinde (Yörüklerde) varlığını korumaktadır."
    },
    { 
        item: "Töre kurallarına ve toplumsal dayanışmaya dayalı sosyal yapı", 
        category: "both",
        hint: "Yardımlaşma, imece ve töre anlayışı geçmişten günümüze Türk toplum yapısının en temel değeridir."
    }
];

const s6Badges = [
    { emoji: "🦅", label: "Bağımsızlık & Hürriyet" },
    { emoji: "🌿", label: "Doğayla Uyum" },
    { emoji: "👥", label: "Dayanışma & İmece" },
    { emoji: "💪", label: "Disiplin & Savaşçılık" },
    { emoji: "🏛️", label: "Töreye Bağlılık" },
    { emoji: "🔄", label: "Uyum Yeteneği" }
];
