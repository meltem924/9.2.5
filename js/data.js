const state = { stage: 0, maxStage: 6 };

const s1Data = [
    { text: "Tariat (Terhin) Kitabesi ('Konar köçer' teriminin geçtiği ilk Uygur yazıtı, 753)", answer: "primary", image: "s1-image-1" },
    { text: "Pazırık Kurganı Tören Arabası (Asya Hunları 4 tekerlekli ev-araba kalıntısı)", answer: "primary", image: "s1-image-2" },
    { text: "Orhun Yazıtları (Bilge Kağan Anıtı)", answer: "primary", image: "s1-image-3" },
    { text: "Çin Yıllıkları (Dönemin komşu devlet kayıtları)", answer: "primary", image: "s1-image-4" },
    { text: "Tarih Ders Kitabı Anlatımları", answer: "secondary", image: "s1-image-5" },
    { text: "Modern Tarih Araştırma Makaleleri", answer: "secondary", image: "s1-image-6" }
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
        correctExplanation: "Doğru! Konargöçer Türkler hayvanlarını korumak ve otlatmak için yazın serin yaylaklara göç etmişlerdir.",
        wrongExplanation: "Yanlış. Çünkü konargöçer yaşam tarzında mevsime ve otlaklara bağımlılık nedeniyle sabit taş yapılardan oluşan şehirler inşa edilmezdi."
    },
    { 
        cause: "Konargöçer yaşamın getirdiği sürekli hareket ve hafiflik ihtiyacı", 
        effect: "Hapis cezalarının en fazla 10 gün ile sınırlandırılması", 
        wrong: "Devasa hapishane binaları ve mahkeme kompleksleri kurulması",
        correctExplanation: "Doğru! Hareketli konargöçer yaşam nedeniyle sabit hapishaneler yapılmamış, hapis cezası en fazla 10 gün ile sınırlandırılmıştır.",
        wrongExplanation: "Yanlış. Çünkü konargöçer yapıda sürekli hareket halinde olunduğu için sabit ve yüksek kapasiteli hapishaneler kurulması istenmemiştir."
    },
    { 
        cause: "Askeri seferlerde et yiyeceğinin uzun süre bozulmadan saklanması gereksinimi", 
        effect: "At eğeri altında etin tuzlanıp sıkıştırılmasıyla pastırma üretilmesi", 
        wrong: "Etlerin cam kavanozlarda konserve yapılarak saklanması",
        correctExplanation: "Doğru! Türkler 'bastırmaktan' türeyen pastırma yöntemiyle eti eğere bağlayıp kurutarak uzun süre saklamışlardır.",
        wrongExplanation: "Yanlış. Çünkü o dönemde cam kavanoz ve modern konserve teknolojisi bulunmuyordu; etler eğer altında tuzlanıp kurutulurdu."
    },
    { 
        cause: "Bozkırın çetin coğrafi koşulları ve sürekli savunma ihtiyacı", 
        effect: "Eli silah tutan herkesin savaşçı sayıldığı Ordu-Millet anlayışı", 
        wrong: "Sadece soylulardan oluşan maaşlı profesyonel ordu kurulması",
        correctExplanation: "Doğru! Türklerde sınıfsal ayrım yapılmamış, kadın ve erkek herkes küçük yaştan itibaren savaşçı yetişmiştir.",
        wrongExplanation: "Yanlış. Çünkü konargöçer Türk toplumunda sınıfsal ayrım yoktur; eli silah tutan herkesin asker sayıldığı ordu-millet anlayışı esastır."
    }
];

const s4Data = [
    { statement: "Türklerde toplumun en küçük birimi Oguş (aile) birleşerek sırasıyla Urug (sülale), Boy, Budun ve İl'i (devlet) oluşturur.", correct: true },
    { statement: "Türkler işledikleri demir kılıç ve eşyaları satarak karşılığında komşularından pirinç, hububat ve ipek kumaş almışlardır.", correct: true },
    { statement: "Konargöçer Türklerde toplumsal sınıflar belirgindir ve alt sınıfların asker olması yasaktır.", correct: false },
    { statement: "Türk Kağanları halkın refahını sağlamayı, açları doyurup çıplakları giydirmeyi temel görev saymışlardır.", correct: true },
    { statement: "Romalılar keten gömlekleri ilk kez Avrupa Hunlarında görmüşlerdir.", correct: true }
];

const s5Data = [
    { item: "Kara çadır ve konak adı verilen evlerin kullanılması", category: "both" },
    { item: "Kımız (kısrak sütü) ve tutmaç yemeğinin tüketilmesi", category: "past" },
    { item: "Tarhana, erişte, gözleme ve keşkek gibi yöresel yemeklerin tüketilmesi", category: "present" },
    { item: "Kök Börü ve Çevgen atlı oyunlarının oynanması", category: "past" },
    { item: "Sebze yetiştiriciliği, ev yapımı ürünler ve turizmden geçim sağlanması", category: "present" },
    { item: "At eğeri altında pastırma imal edilmesi", category: "past" }
];

const s6Badges = [
    { emoji: "🦅", label: "Bağımsızlık & Hürriyet" },
    { emoji: "🌿", label: "Doğayla Uyum" },
    { emoji: "👥", label: "Dayanışma & İmece" },
    { emoji: "💪", label: "Disiplin & Savaşçılık" },
    { emoji: "🏛️", label: "Töreye Bağlılık" },
    { emoji: "🔄", label: "Uyum Yeteneği" }
];
