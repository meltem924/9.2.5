const state = { stage: 0, maxStage: 5, unlockedStage: 5 }; // Geliştirme aşaması için tüm kilitler açık

const s1FocusedData = [
    {
        id: "src-1",
        title: "Tariat Kitabesi",
        text: "“Dört taraftaki halklar (benim) işimi gücümü görürler. Düşmanım bölünüp yok oldu. Ötüken ülkesi (ve) çevresi, ikisi arasında tarlalarım; Sekiz Selenge, Orkun, Togla, Sebintürdü, Kargu (ve) Burgu yerlerimde (ve) sularımda konar-göçerim.“",
        category: "kultur",
        sourceRef: "Tariat Kitabesi",
        hint: "İpucu: Yazıtlar (kitabeler) bir milletin dilini, yazısını ve tarihi belleğini gelecek nesillere aktaran en önemli miraslardır.",
        question: "Yukarıdaki kitabe metninde 'konar-göçerim' ifadesinin taşlara kazınmış olması, Türklerin hangi alandaki gelişmişlik düzeyini gösterir?",
        options: [
            "Yazılı dili kullanarak tarihi kayıtları taşlara işleyip gelecek nesillere aktarma bilincini",
            "Göçebe oldukları için kalıcı sanat eseri bırakmadıklarını ve sadece sözlü kültüre sahip olduklarını"
        ],
        correctOptionIndex: 0,
        explanation: "Kitabeler (Orhun ve Tariat yazıtları) Türklerin edebi, tarihi ve yazılı kültürlerinin en açık kanıtıdır. Taşların üzerine yazılan bu metinler kültürel bir mirastır."
    },
    {
        id: "src-2",
        title: "İktisadi Hayat ve Üretim",
        text: "“Konar-göçer yaşam biçiminde iktisadi hayat büyük oranda hayvancılığa dayanmaktadır. Bu durum eski Türklerin hayvansal ürünler geliştirmesine katkı sağlamıştır. Nitekim küçükbaş hayvanların kürklerinden üretilen keçeler, eski Türklerin kıyafetlerinden atlarının eyerlerine, yattıkları yastıklarından üzerlerini örttükleri yorganlarına, çadırların örtülerinden çadırların içerisindeki döşemelere ve yer yaygılarına kadar çeşitli yerlerde türlü amaçlar için kullanılmıştır.”",
        category: "ekonomi",
        sourceRef: "Göner ve Gönen, 2022",
        hint: "İpucu: Metin hayvansal ürünlerin üretimi ve bunların günlük eşyalara dönüştürülmesiyle ilgilidir.",
        question: "Metne göre hayvancılığın konargöçer Türklerin yaşamındaki yeri hakkında nasıl bir çıkarım yapılabilir?",
        options: [
            "Hayvancılık yalnızca et ve süt ihtiyacını karşılamakla kalmamış; giyim, barınma ve eşya üretiminin de temel hammaddesi olmuştur.",
            "Hayvansal ürünler sadece ticari amaçla üretilmiş, günlük yaşamda genellikle tarım ürünleri kullanılmıştır."
        ],
        correctOptionIndex: 0,
        explanation: "Keçe, kıyafet, yorgan, çadır örtüsü gibi eşyaların tamamı hayvancılığın bir sonucudur; yani ekonomi tüm maddi kültürü şekillendirmiştir."
    },
    {
        id: "src-3",
        title: "Oğuzname'de Birlik",
        text: "“Oğuz Kağan yaşlanınca vasiyetini açıklamak için tüm çocuklarının katıldığı bir toy toplamış ve oğullarına ‘biriniz bir ok verin’ dedi ve aldı eliyle kırdı. Sonra ikisine döndü ‘iki ok verin’ dedi ve aldı kırdı ve üçünden birer ok istedi ve dizine vurup kırdı; ve altısından birer ok istedi dizine vurup kıramadı... Hepsini iple ortadan bağladı, ellerine verdi ve şöyle söyledi: ‘kıramazsınız’ Şöyle devam etti: ‘işbu örnek gereğince birlik olun birbirinize uyun...’”",
        category: "siyasi",
        sourceRef: "Oğuzname",
        hint: "İpucu: Metin bir yöneticinin (kağanın) halkını/çocuklarını bir arada tutması, devleti yönetmesi ve birliği sağlamasıyla ilgilidir.",
        question: "Oğuz Kağan'ın çocuklarına oklarla verdiği bu vasiyet, konargöçer Türklerde hangi unsurun hayati önem taşıdığını vurgulamaktadır?",
        options: [
            "Ordu içinde sadece yetenekli okçuların komuta kademesine getirilmesi gerektiğini",
            "Boylar arasında siyasi birliğin ve dayanışmanın devleti ayakta tutan en temel güç olduğunu"
        ],
        correctOptionIndex: 1,
        explanation: "Oğuz Kağan, parçalanmanın zayıflık getireceğini, siyasi birliğin (tek ok yerine bağlı oklar) ise devleti yıkılamaz kılacağını somut bir şekilde göstermiştir."
    },
    {
        id: "src-4",
        title: "Hapishanelerin Olmayışı",
        text: "“Hapis cezası yalnız 10 güne kadar verilir; böylece devletin sınırları içindeki hükümlülerin sayısı çok azdır. Devlet göçebe olduğu için sürekli hapishaneler kurulması istenmemiştir”",
        category: "hukuk",
        sourceRef: "Altunbaş, 2022",
        hint: "İpucu: Metin suçlulara uygulanan yaptırımlar ve adalet sisteminin (hapishane) işleyişi ile ilgilidir.",
        question: "Bu metinden hareketle, konargöçer yaşam tarzının Türklerdeki ceza sistemini nasıl etkilediği söylenebilir?",
        options: [
            "Hareketli yaşam tarzı, uzun süreli hapis cezasını ve kalıcı hapishaneleri imkânsız kıldığı için cezaların kısa süreli ve pratik olmasına yol açmıştır.",
            "Göçebe toplumlarda suç oranı çok yüksek olduğu için hapishaneler yetersiz kalmış ve bu yüzden cezalar kısaltılmıştır."
        ],
        correctOptionIndex: 0,
        explanation: "Sürekli yer değiştiren bir toplumda mahkumları aylarca bir binaya kapatmak fiziksel olarak mümkün değildir. Bu nedenle adalet ve töre hızlıca uygulanmıştır."
    },
    {
        id: "src-5",
        title: "Göçebelik ve Bağımsızlık",
        text: "“Şehirde veya köyde yaşamak bizim işimize gelmez. Şimdiye kadar hür ve bağımsız kalabilmemiz göçebelik sayesindedir. Göçebe olduğumuz için, istediğimiz dakikada Çin’e akın ve yağma yapabiliriz. Çinliler durumu öğrenip, savaş hazırlıklarına başlayıncaya kadar, biz işimizi bitirir, aile çadırlarımızla birlikte Çinlilerin yetişemeyeceği uzak bölgelere çekilmiş oluruz. Böylece Çinliler... bize hiçbir şey yapamazlar.”",
        category: "askeri",
        sourceRef: "Orhun Yazıtları (Bilge Kağan)",
        hint: "İpucu: Metin düşmana akın yapma, savaş hazırlığı ve hızlı manevra kabiliyeti ile ilgilidir.",
        question: "Bilge Kağan'ın bu sözlerine göre, konargöçer yaşamın Türklere sağladığı en büyük askerî stratejik avantaj nedir?",
        options: [
            "Düşman karşısında hızlı hareket ederek (vur-kaç taktiği) sürpriz saldırılar yapabilme ve kolayca geri çekilebilme imkânı",
            "Geniş ve sağlam surlarla çevrili şehirler kurarak savunma savaşlarında üstünlük kurabilme becerisi"
        ],
        correctOptionIndex: 0,
        explanation: "Yerleşik ordular ağır hareket ederken, atlı göçebeler çok hızlı manevra yaparak düşmanı şaşırtır ve anında ulaşılmaz bölgelere çekilerek güvende kalır."
    },
    {
        id: "src-6",
        title: "Pastırma ve Saklama",
        text: "“[Konargöçer] bir toplum olan eski Türklerde yiyecek olarak kullanılan en önemli besin maddesi hayvansal ürünlerdir. Pastırma, etin uzun süre dayanabilmesi amacıyla kullanılan bir saklama yöntemidir... İlk kez Türkistan Türkleri tarafından üretilen pastırma, göçebeliğin bir gereği olarak ortaya çıkmıştır... Özellikle akınlara giden askerlerin, beslenme ihtiyaçlarını karşılamaktaydı. Atın eğeri altında saklanan et yol boyunca eğer ve diğer düzeneklerle sıkışmakta ve terleyen atın tuzu ile de birleşerek pastırma halini almaktadır.”",
        category: "sosyal",
        sourceRef: "Türker vd., 2019",
        hint: "İpucu: Metin beslenme kültürü, yiyecekleri muhafaza etme ve gündelik hayatta ortaya çıkan yaşam pratikleriyle ilgilidir.",
        question: "Pastırmanın ortaya çıkış hikayesi dikkate alındığında, konargöçer Türklerin gündelik pratikleri hakkında ne söylenebilir?",
        options: [
            "Zorlu doğa şartları ve hareketli yaşam (göç ve akınlar), yiyeceklerin bozulmadan uzun süre saklanabileceği pratik yöntemleri zorunlu kılmıştır.",
            "Pastırma sadece yerleşik hayata geçtikten sonra bol baharat bulunmasıyla icat edilen özel bir tören yemeğidir."
        ],
        correctOptionIndex: 0,
        explanation: "Konargöçerlikte gıdayı saklayacak soğutucu sistemler yoktur; hareket halindeki atın teri ve eyerin basıncı kullanılarak bozkıra has pratik bir çözüm bulunmuştur."
    }
];

const s2Data = [
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

const s3Data = [
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

const s4Data = [
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

const s5Badges = [
    { emoji: "🦅", label: "Bağımsızlık & Hürriyet" },
    { emoji: "🌿", label: "Doğayla Uyum" },
    { emoji: "👥", label: "Dayanışma & İmece" },
    { emoji: "💪", label: "Disiplin & Savaşçılık" },
    { emoji: "🏛️", label: "Töreye Bağlılık" },
    { emoji: "🔄", label: "Uyum Yeteneği" }
];
