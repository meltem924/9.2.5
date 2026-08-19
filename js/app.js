lucide.createIcons();

function getStageNum(stage) {
    if (stage === 'final') return 7;
    return parseInt(stage, 10) || 0;
}

function unlockStage(target) {
    const targetVal = getStageNum(target);
    const currentUnlocked = getStageNum(state.unlockedStage);
    if (targetVal > currentUnlocked) {
        state.unlockedStage = target === 'final' ? 'final' : targetVal;
    }
    updateNavTabs();
}

function updateNavTabs() {
    const unlockedVal = getStageNum(state.unlockedStage);

    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
        const target = btn.dataset.navStage;
        const targetVal = getStageNum(target);
        const isCurrent = (target === 'final' && state.stage === 'final') || (parseInt(target, 10) === state.stage);

        if (isCurrent) {
            btn.classList.add('active-tab');
            btn.classList.remove('tab-locked', 'tab-unlocked');
        } else {
            btn.classList.remove('active-tab');
        }

        if (targetVal > unlockedVal) {
            btn.disabled = true;
            btn.classList.add('tab-locked', 'pointer-events-none');
            btn.classList.remove('tab-unlocked');
        } else {
            btn.disabled = false;
            btn.classList.remove('tab-locked', 'pointer-events-none');
            if (!isCurrent) {
                btn.classList.add('tab-unlocked');
            }
        }
    });
}

function showStage(n) {
    const stageVal = n === 'final' ? 'final' : parseInt(n, 10);
    state.stage = stageVal;

    document.querySelectorAll('.stage').forEach(s => s.classList.remove('active'));
    const el = document.getElementById(`stage-${stageVal}`);
    if (el) { el.classList.add('active'); }

    updateNavTabs();

    const stageNav = document.getElementById('stage-nav');
    if (stageNav) {
        if (stageVal === 0) {
            stageNav.classList.add('hidden');
        } else {
            stageNav.classList.remove('hidden');
        }
    }

    const nextContainer = document.getElementById('next-container');
    if (nextContainer) {
        const unlockedVal = getStageNum(state.unlockedStage);
        const currentStageVal = getStageNum(stageVal);
        
        // Etkinlik tamamlanmadan "Sonraki Aşama" butonunu gizle
        if (stageVal === 0 || stageVal === 'final' || unlockedVal <= currentStageVal) {
            nextContainer.classList.add('hidden');
        } else {
            nextContainer.classList.remove('hidden');
        }
    }
}

function showNext() { 
    const nextContainer = document.getElementById('next-container');
    if (nextContainer) {
        nextContainer.classList.remove('hidden');
    }
    let nextStage;
    if (typeof state.stage === 'number') {
        nextStage = state.stage + 1;
        if (nextStage > state.maxStage) nextStage = 'final';
    } else {
        nextStage = 'final';
    }
    unlockStage(nextStage);
}

function initStageContent(n) {
    const target = n === 'final' ? 'final' : parseInt(n, 10);
    const targetVal = getStageNum(target);
    const unlockedVal = getStageNum(state.unlockedStage);

    if (targetVal > 0 && targetVal > unlockedVal) {
        return;
    }

    showStage(target);

    if (target === 1) initS1();
    else if (target === 2) initS2();
    else if (target === 3) initS3();
    else if (target === 4) initS4();
    else if (target === 'final') showFinal();
}

function initS1() {
    const container = document.getElementById('s1-card-container');
    const catButtonsContainer = document.getElementById('category-selection');
    const catButtons = document.querySelectorAll('.cat-btn');
    let currentIndex = 0;

    function renderCard(index) {
        if (index >= s1FocusedData.length) {
            if (catButtonsContainer) catButtonsContainer.classList.add('hidden');
            container.innerHTML = '';
            showNext();
            return;
        }

        if (catButtonsContainer) catButtonsContainer.classList.remove('hidden');
        
        const categoryHint = document.getElementById('category-hint');
        if (categoryHint) categoryHint.classList.add('hidden');
        
        // Reset category buttons
        catButtons.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('opacity-50', 'border-red-400', 'bg-red-50');
            btn.classList.add('bg-white', 'hover:border-amber-400', 'hover:bg-amber-50');
        });

        const data = s1FocusedData[index];

        // Rastgele şık sıralaması
        const isSwapped = Math.random() > 0.5;
        const optA_idx = isSwapped ? 1 : 0;
        const optB_idx = isSwapped ? 0 : 1;

        container.innerHTML = `
            <div id="active-card" class="relative bg-white rounded-2xl shadow-md border-2 border-slate-200 p-6 sm:p-7 pb-10 sm:pb-11 min-h-[140px] flex flex-col justify-center transition-all duration-300 fade-in" data-category="${data.category}">
                <p class="text-[15px] sm:text-[16px] leading-relaxed font-semibold text-slate-800">
                    ${data.text}
                </p>
                <div class="absolute bottom-3.5 right-5 sm:right-6 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                    ${data.sourceRef}
                </div>
            </div>
            
            <div id="question-panel" class="hidden bg-emerald-50 rounded-2xl shadow-md border-2 border-emerald-400 p-5 mt-3 fade-in relative">
                <h4 class="text-[13.5px] font-bold text-slate-800 mb-3 mt-2">${data.question}</h4>
                <div class="space-y-2" id="options-container">
                    <button class="opt-btn w-full text-left p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-[13px] font-medium text-slate-700 transition-colors shadow-sm" data-idx="${optA_idx}">A) ${data.options[optA_idx]}</button>
                    <button class="opt-btn w-full text-left p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-[13px] font-medium text-slate-700 transition-colors shadow-sm" data-idx="${optB_idx}">B) ${data.options[optB_idx]}</button>
                </div>
                <div id="feedback-panel" class="hidden mt-4 p-3 rounded-lg text-xs font-semibold leading-relaxed"></div>
                <button id="next-card-btn" class="hidden mt-4 w-full py-2.5 bg-emerald-600 text-white text-[13px] font-bold rounded-lg shadow-sm hover:bg-emerald-700 transition-colors">Sonraki Kaynağa Geç</button>
            </div>
        `;
    }

    // Clone and replace buttons to prevent multiple event listeners on re-init
    const newCatButtons = [];
    catButtons.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newCatButtons.push(newBtn);
    });

    newCatButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = document.getElementById('active-card');
            if (!card) return;
            
            const cardCategory = card.dataset.category;
            const selectedCategory = btn.dataset.category;
            
            if (cardCategory === selectedCategory) {
                // Correct Selection
                card.classList.add('border-emerald-400', 'bg-emerald-50/20');

                if (catButtonsContainer) catButtonsContainer.classList.add('hidden');

                showQuestionPanel();
            } else {
                // Wrong Selection
                btn.classList.add('border-red-400', 'bg-red-50');
                btn.classList.remove('bg-white', 'hover:border-amber-400', 'hover:bg-amber-50');
                
                const hintPanel = document.getElementById('category-hint');
                if (hintPanel) {
                    hintPanel.textContent = s1FocusedData[currentIndex].hint;
                    hintPanel.classList.remove('hidden');
                    hintPanel.classList.add('fade-in');
                }

                setTimeout(() => {
                    btn.classList.remove('border-red-400', 'bg-red-50');
                    btn.classList.add('bg-white', 'hover:border-amber-400', 'hover:bg-amber-50');
                }, 500);
            }
        });
    });

    function showQuestionPanel() {
        const panel = document.getElementById('question-panel');
        const feedback = document.getElementById('feedback-panel');
        const nextBtn = document.getElementById('next-card-btn');
        const options = document.querySelectorAll('.opt-btn');
        const data = s1FocusedData[currentIndex];

        panel.classList.remove('hidden');

        options.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.disabled) return;
                options.forEach(b => b.disabled = true);
                
                const selectedIdx = parseInt(btn.dataset.idx);
                if (selectedIdx === data.correctOptionIndex) {
                    btn.classList.remove('bg-white');
                    btn.classList.add('bg-emerald-100', 'border-emerald-500', 'text-emerald-900');
                    feedback.className = 'mt-4 p-3 rounded-lg text-xs font-semibold leading-relaxed bg-white border border-emerald-200 text-emerald-900 shadow-sm fade-in';
                    feedback.innerHTML = `<strong class="text-emerald-700">✓ Doğru!</strong> ${data.explanation}`;
                    feedback.classList.remove('hidden');
                    nextBtn.classList.remove('hidden');
                } else {
                    btn.classList.remove('bg-white');
                    btn.classList.add('bg-red-50', 'border-red-400', 'text-red-800');
                    const correctBtn = document.querySelector(`.opt-btn[data-idx="${data.correctOptionIndex}"]`);
                    correctBtn.classList.remove('bg-white');
                    correctBtn.classList.add('bg-emerald-100', 'border-emerald-500', 'text-emerald-900');
                    
                    feedback.className = 'mt-4 p-3 rounded-lg text-xs font-semibold leading-relaxed bg-white border border-amber-200 text-amber-900 shadow-sm fade-in';
                    feedback.innerHTML = `<strong class="text-amber-700">Daha Dikkatli İnceleyelim:</strong> ${data.explanation}`;
                    feedback.classList.remove('hidden');
                    nextBtn.classList.remove('hidden');
                }
            });
        });

        nextBtn.addEventListener('click', () => {
            currentIndex++;
            renderCard(currentIndex);
        });
    }

    renderCard(0);
}

function initS2() {
    const layer = document.getElementById('s2-hotspots-layer');
    const modal = document.getElementById('s2-info-modal');
    const modalTitle = document.getElementById('s2-modal-title');
    const modalDetail = document.getElementById('s2-modal-detail');
    const modalClose = document.getElementById('s2-modal-close');
    
    if (!layer) return;
    layer.innerHTML = '';
    let visitedCount = 0;
    modal.classList.add('hidden');

    s2Data.forEach((item) => {
        const hotspot = document.createElement('button');
        hotspot.type = 'button';
        hotspot.className = 'hotspot-target absolute w-7 h-7 font-bold flex items-center justify-center shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400';
        hotspot.style.top = `${item.top}%`;
        hotspot.style.left = `${item.left}%`;
        hotspot.setAttribute('title', item.hint);
        hotspot.innerHTML = `<span class="text-amber-800 font-extrabold text-xs">?</span>`;

        hotspot.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Show modal info
            modalTitle.textContent = `${item.name} (${item.title})`;
            modalDetail.textContent = item.detail;
            modal.classList.remove('hidden');
            modal.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            if (!hotspot.classList.contains('discovered')) {
                hotspot.classList.add('discovered');
                hotspot.innerHTML = `<span class="text-white text-[11px] font-black">✓</span>`;
                visitedCount++;

                if (visitedCount === s2Data.length) {
                    setTimeout(showNext, 1200);
                }
            }
        });

        layer.appendChild(hotspot);
    });

    if (modalClose) {
        modalClose.onclick = () => {
            modal.classList.add('hidden');
        };
    }
}

function initS3() {
    const container = document.getElementById('s3-game');
    container.innerHTML = '';
    let currentStep = 0;

    // Soruları her başlangıçta rastgele karıştır
    const s3Items = [...s3Data].sort(() => Math.random() - 0.5);

    container.innerHTML = `
        <!-- Active Draggable Item Panel (Above) -->
        <div id="s3-active-panel" class="card-surface p-5 border border-slate-300 shadow-sm mb-6 fade-in">
            <!-- Draggable Item Card -->
            <div id="s3-drag-card" draggable="true" class="p-4 bg-white border-2 border-amber-500 text-base font-bold text-slate-800 leading-snug shadow-sm text-center cursor-grab active:cursor-grabbing hover:border-amber-600 transition-all select-none">
                <span id="s3-active-item"></span>
            </div>

            <p id="s3-feedback" class="hidden text-xs font-semibold mt-3 p-3 leading-relaxed text-left transition-all"></p>
        </div>

        <!-- 3 Columns Drop Zones (Below) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Sütun 1: Sadece Geçmiş -->
            <div class="s3-drop-zone p-4 bg-white border-2 border-dashed border-slate-300 flex flex-col min-h-[220px] transition-all" data-cat="past">
                <div class="text-amber-900 font-extrabold text-sm mb-3 flex items-center justify-center gap-2 border-b border-amber-200 pb-2.5 pointer-events-none">
                    <span>Sadece Geçmiş</span>
                </div>
                <div id="s3-past-list" class="space-y-2 flex-1 pointer-events-none"></div>
            </div>

            <!-- Sütun 2: Sadece Günümüz -->
            <div class="s3-drop-zone p-4 bg-white border-2 border-dashed border-slate-300 flex flex-col min-h-[220px] transition-all" data-cat="present">
                <div class="text-amber-900 font-extrabold text-sm mb-3 flex items-center justify-center gap-2 border-b border-amber-200 pb-2.5 pointer-events-none">
                    <span>Sadece Günümüz</span>
                </div>
                <div id="s3-present-list" class="space-y-2 flex-1 pointer-events-none"></div>
            </div>

            <!-- Sütun 3: Her İki Dönem -->
            <div class="s3-drop-zone p-4 bg-white border-2 border-dashed border-slate-300 flex flex-col min-h-[220px] transition-all" data-cat="both">
                <div class="text-amber-900 font-extrabold text-sm mb-3 flex items-center justify-center gap-2 border-b border-amber-200 pb-2.5 pointer-events-none">
                    <span>Her İki Dönem</span>
                </div>
                <div id="s3-both-list" class="space-y-2 flex-1 pointer-events-none"></div>
            </div>
        </div>
    `;

    const activeItemEl = document.getElementById('s3-active-item');
    const dragCardEl = document.getElementById('s3-drag-card');
    const feedbackEl = document.getElementById('s3-feedback');
    const activePanelEl = document.getElementById('s3-active-panel');

    function renderStep() {
        if (currentStep >= s3Items.length) {
            activePanelEl.innerHTML = `
                <div class="text-center py-4">
                    <h3 class="font-bold text-emerald-700 text-base mb-1">Tebrikler!</h3>
                    <p class="text-xs text-slate-600">Tüm kültürel ögeleri doğru sütunlara yerleştirdiniz.</p>
                </div>
            `;
            setTimeout(showNext, 1200);
            return;
        }

        const item = s3Items[currentStep];
        activeItemEl.textContent = item.item;
        feedbackEl.classList.add('hidden');
        dragCardEl.className = 'p-4 bg-white border-2 border-amber-500 text-base font-bold text-slate-800 leading-snug shadow-sm text-center cursor-grab active:cursor-grabbing hover:border-amber-600 transition-all select-none';
    }

    function processDrop(chosenCat) {
        if (currentStep >= s3Items.length) return;

        const item = s3Items[currentStep];

        if (chosenCat === item.category) {
            if (window._s3HintTimer) clearTimeout(window._s3HintTimer);
            feedbackEl.classList.add('hidden');
            feedbackEl.textContent = '';

            const targetList = document.getElementById(`s3-${item.category}-list`);
            if (targetList) {
                const badge = document.createElement('div');
                badge.className = 'p-2.5 bg-emerald-50 border border-emerald-300 text-emerald-900 font-semibold text-xs flex items-center gap-2 fade-in shadow-sm';
                badge.innerHTML = `<span class="shrink-0 text-emerald-600 font-bold">✓</span> <span>${item.item}</span>`;
                targetList.appendChild(badge);
            }

            currentStep++;
            renderStep();
        } else {
            dragCardEl.className = 'p-4 bg-amber-50 border-2 border-amber-500 text-base font-bold text-amber-900 leading-snug shadow-sm text-center cursor-grab active:cursor-grabbing transition-all select-none';
            
            feedbackEl.classList.remove('hidden');
            feedbackEl.textContent = `İpucu: ${item.hint}`;
            feedbackEl.className = 'text-xs font-semibold mt-3 p-3 leading-relaxed text-left bg-amber-50 text-amber-900 border border-amber-300 shadow-sm fade-in';

            if (window._s3HintTimer) clearTimeout(window._s3HintTimer);
            window._s3HintTimer = setTimeout(() => {
                feedbackEl.classList.add('hidden');
                dragCardEl.className = 'p-4 bg-white border-2 border-amber-500 text-base font-bold text-slate-800 leading-snug shadow-sm text-center cursor-grab active:cursor-grabbing hover:border-amber-600 transition-all select-none';
            }, 4000);
        }
    }

    // Click / Touch selection for mobile and smart boards
    let isCardSelected = false;

    dragCardEl.addEventListener('click', () => {
        isCardSelected = !isCardSelected;
        if (isCardSelected) {
            dragCardEl.classList.add('ring-2', 'ring-amber-500', 'bg-amber-50');
        } else {
            dragCardEl.classList.remove('ring-2', 'ring-amber-500', 'bg-amber-50');
        }
    });

    // Drag events (Desktop)
    dragCardEl.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', s3Items[currentStep].category);
        dragCardEl.classList.add('opacity-50');
    });

    dragCardEl.addEventListener('dragend', () => {
        dragCardEl.classList.remove('opacity-50');
    });

    // Drop Zone events
    document.querySelectorAll('.s3-drop-zone').forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('border-amber-600', 'bg-amber-50');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('border-amber-600', 'bg-amber-50');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('border-amber-600', 'bg-amber-50');
            const chosenCat = zone.dataset.cat;
            processDrop(chosenCat);
        });

        // Click / Touch to drop
        zone.addEventListener('click', () => {
            if (isCardSelected) {
                isCardSelected = false;
                dragCardEl.classList.remove('ring-2', 'ring-amber-500', 'bg-amber-50');
                const chosenCat = zone.dataset.cat;
                processDrop(chosenCat);
            }
        });
    });

    renderStep();
}

function validateUserOpinion(rawText, selectedBadges) {
    const text = (rawText || '').trim();
    if (!text) {
        return {
            isValid: false,
            message: 'Lütfen konargöçer yaşamın Türk kültüründeki yeri ve önemine ilişkin düşüncelerinizi yazınız.'
        };
    }

    // 1. Kural: Minimum karakter uzunluğu kontrolü
    if (text.length < 15) {
        return {
            isValid: false,
            message: 'Düşünceniz çok kısa. Lütfen en az 1-2 cümlelik (en az 15 karakter) bir değerlendirme yazınız.'
        };
    }

    // 1. Kural: Minimum kelime sayısı kontrolü
    const words = text.split(/\s+/).filter(w => w.length > 0);
    if (words.length < 3) {
        return {
            isValid: false,
            message: 'Lütfen düşüncenizi en az 3-4 anlamlı kelime kullanarak açıklayınız.'
        };
    }

    const lowerText = text.toLocaleLowerCase('tr-TR');

    // 1. Kural: Peş peşe tekrarlayan harf kontrolü (örn. aaaaa, sssss)
    if (/(.)\1{2,}/i.test(text)) {
        return {
            isValid: false,
            message: 'Yazdığınız metinde tekrarlayan anlamsız harfler ("aaaa", "ssss" vb.) tespit edildi. Lütfen konuyla ilgili gerçek düşüncenizi yazınız.'
        };
    }

    // 1. Kural: Klavye dizilimleri ve anlamsız tuşlama kontrolü
    const keyboardSpamPatterns = [
        'asdf', 'fdsa', 'qwerty', 'ytrewq', 'zxcv', 'vcxz', 'qwert', 'trewq',
        'asdfg', 'gfdsa', 'zxcvb', 'bvcxz', '1234', '4321', 'jklm', 'mlkj',
        'fghj', 'jhgf', 'hjkla', 'ghjkl', 'asdasd', 'qweqwe', 'zxczxc'
    ];
    for (const pattern of keyboardSpamPatterns) {
        if (lowerText.includes(pattern)) {
            return {
                isValid: false,
                message: 'Rastgele klavye tuşlaması tespit edildi. Lütfen konargöçer yaşamla ilgili anlamlı bir çıkarım yazınız.'
            };
        }
    }

    // 1. Kural: Sesli harf yoksunluğu kontrolü (4+ harfli kelimelerde hiç ünlü harf yoksa)
    const vowels = /[aeıioöuüAEIİOÖUÜ]/i;
    for (const w of words) {
        const cleanWord = w.replace(/[^a-zA-ZçğıöşüÇĞİÖŞÜ]/g, '');
        if (cleanWord.length >= 4 && !vowels.test(cleanWord)) {
            return {
                isValid: false,
                message: 'Yazdığınız metin anlaşılamadı. Lütfen Türkçe kurallarına uygun anlamlı ifadeler kullanınız.'
            };
        }
    }

    // 1. Kural: Benzersiz kelime çeşitliliği kontrolü
    const uniqueWords = new Set(words.map(w => w.toLocaleLowerCase('tr-TR').replace(/[^a-zA-ZçğıöşüÇĞİÖŞÜ]/g, '')));
    if (uniqueWords.size < 3) {
        return {
            isValid: false,
            message: 'Lütfen aynı kelimeleri tekrarlamak yerine konargöçer yaşam hakkındaki düşüncelerinizi cümle kurarak ifade ediniz.'
        };
    }

    // 2. Kural: Zenginleştirilmiş Konu & Tarihsel Kavram Havuzu
    const topicKeywords = [
        // Konargöçer ve Yaşam Biçimi
        'konar', 'göç', 'göçer', 'göçebe', 'yörük', 'yaylak', 'kışlak', 'otlak', 'mera', 'mevsim', 
        'çadır', 'otağ', 'yurt', 'oba', 'boy', 'kervan', 'hareket', 'yaşam', 'yaşayış', 'yaşantı', 'hayat',
        
        // Tarih, Millet, Coğrafya ve Kültür
        'türk', 'tarih', 'kültür', 'miras', 'geçmiş', 'bozkır', 'orta asya', 'avrasya', 'anadolu', 'toros',
        'coğrafya', 'doğa', 'çevre', 'iklim', 'toprak', 'vatan', 'il', 'budun', 'kağan', 'hakan', 'devlet',
        'gelenek', 'örf', 'adet', 'öge', 'unsur', 'kimlik',
        
        // Sosyal Yapı, Hukuk ve Değerler
        'töre', 'hukuk', 'yasa', 'kural', 'adalet', 'aile', 'oguş', 'urug', 'toplum', 'birlik', 'beraberlik',
        'dayanışma', 'imece', 'yardımlaşma', 'saygı', 'sevgi', 'bağlılık', 'disiplin', 'özgür', 'özgürlük',
        'bağımsız', 'bağımsızlık', 'hürriyet', 'istiklal', 'eşitlik', 'kadın', 'barış', 'erdem',
        
        // Hayvancılık, Ekonomi ve Beslenme
        'hayvan', 'hayvancılık', 'sürü', 'at', 'atlı', 'koyun', 'keçi', 'deve', 'et', 'süt', 'kımız',
        'tutmaç', 'pastırma', 'deri', 'keçe', 'dokuma', 'halı', 'kilim', 'demir', 'demircilik', 'maden',
        'zanaat', 'ticaret', 'takas', 'ipek',
        
        // Askeri Yapı, Mücadele ve Savunma
        'ordu', 'asker', 'savaş', 'savaşçı', 'ordu-millet', 'savunma', 'mücadele', 'direnç', 'çevik',
        'çeviklik', 'hız', 'ok', 'yay', 'kılıç', 'alp', 'cesaret', 'kahraman', 'güç', 'dayanıklı', 'dayanıklılık',
        
        // Düşünce, Gelişim ve Çıkarım İfadeleri
        'önem', 'önemli', 'etki', 'etkile', 'geliş', 'geliştir', 'sağla', 'oluş', 'şekillen', 'biçimlen',
        'katkı', 'rol', 'anlayış', 'özellik', 'beceri', 'kabiliyet', 'uyum', 'zor', 'şart', 'koşul',
        'bakış', 'çıkarım', 'sonuç', 'fikir', 'düşünce', 'değer', 'kavram',
        
        // Tarihsel Kaynaklar ve Anıtlar
        'orhun', 'kitabe', 'yazıt', 'tariat', 'terhin', 'bilge', 'kül tigin', 'tonyukuk', 'pazırık',
        'kurgan', 'balbal', 'belge', 'kaynak'
    ];

    // Seçilen değerlerin etiketlerini de anahtar kelime havuzuna dahil et
    if (Array.isArray(selectedBadges)) {
        selectedBadges.forEach(b => {
            if (b && b.label) {
                const wordsInLabel = b.label.toLocaleLowerCase('tr-TR').split(/\s+/);
                wordsInLabel.forEach(w => {
                    const cleanW = w.replace(/[^a-zA-ZçğıöşüÇĞİÖŞÜ]/g, '');
                    if (cleanW.length >= 3) {
                        topicKeywords.push(cleanW);
                    }
                });
            }
        });
    }

    const hasTopicKeyword = topicKeywords.some(keyword => lowerText.includes(keyword));

    if (!hasTopicKeyword) {
        return {
            isValid: false,
            message: 'Lütfen konargöçer yaşam tarzı, bozkır kültürü veya seçtiğiniz değerlerle ilgili anlamlı bir düşünce ifade ediniz (Örn: Bozkır koşulları Türklerin bağımsızlık ve dayanışma duygusunu güçlendirmiştir).'
        };
    }

    return {
        isValid: true,
        message: '✓ Görüşünüz başarıyla kaydedildi ve onaylandı! Sonraki aşamaya geçebilirsiniz.'
    };
}

function initS4() {
    const container = document.getElementById('s4-badges');
    const opinionTextarea = document.getElementById('user-opinion');
    const feedbackEl = document.getElementById('s4-opinion-feedback');
    const submitBtn = document.getElementById('s4-submit-opinion-btn');
    
    container.innerHTML = '';
    let selected = 0;
    state.selectedValues = [];
    
    if (feedbackEl) {
        feedbackEl.classList.add('hidden');
        feedbackEl.textContent = '';
    }

    s4Badges.forEach(badge => {
        const div = document.createElement('button');
        div.className = 'option-btn p-3 border border-slate-300 hover:border-amber-500 hover:bg-amber-50 bg-white text-xs font-bold text-slate-700 tracking-wide text-center transition-all shadow-sm';
        div.innerHTML = `<span>${badge.label}</span>`;
        div.addEventListener('click', () => {
            if (div.classList.contains('chosen')) return;
            if (selected >= 3) return;

            div.classList.add('chosen');
            div.style.borderColor = '#d97706';
            div.style.background = '#fef3c7';
            div.style.color = '#92400e';
            state.selectedValues.push(badge);
            selected++;

            if (selected === 3) {
                const opinionBox = document.getElementById('s4-perspective-box');
                if (opinionBox) {
                    opinionBox.scrollIntoView({ behavior: 'smooth' });
                }
                if (opinionTextarea) {
                    opinionTextarea.focus();
                }
            }
        });
        container.appendChild(div);
    });

    if (submitBtn) {
        submitBtn.onclick = () => {
            if (state.selectedValues.length < 3) {
                if (feedbackEl) {
                    feedbackEl.textContent = 'Lütfen önce yukarıdaki alandan konargöçer yaşamı tanımlayan 3 kavramı seçiniz.';
                    feedbackEl.className = 'text-xs font-semibold mt-3 p-3 text-left leading-relaxed bg-amber-50 border border-amber-300 text-amber-900 shadow-sm fade-in';
                    feedbackEl.classList.remove('hidden');
                }
                return;
            }

            const rawText = opinionTextarea ? opinionTextarea.value : '';
            const validation = validateUserOpinion(rawText, state.selectedValues);

            if (!validation.isValid) {
                if (feedbackEl) {
                    feedbackEl.textContent = validation.message;
                    feedbackEl.className = 'text-xs font-semibold mt-3 p-3 text-left leading-relaxed bg-red-50 border border-red-300 text-red-900 shadow-sm fade-in';
                    feedbackEl.classList.remove('hidden');
                }
                if (opinionTextarea) {
                    opinionTextarea.focus();
                }
            } else {
                if (feedbackEl) {
                    feedbackEl.textContent = validation.message;
                    feedbackEl.className = 'text-xs font-semibold mt-3 p-3 text-left leading-relaxed bg-emerald-50 border border-emerald-300 text-emerald-900 shadow-sm fade-in';
                    feedbackEl.classList.remove('hidden');
                }
                showNext();
            }
        };
    }
}

function showFinal() {
    showStage('final');
    
    // Display selected values
    const valuesContainer = document.getElementById('final-selected-values');
    if (valuesContainer) {
        valuesContainer.innerHTML = '';
        if (state.selectedValues && state.selectedValues.length > 0) {
            state.selectedValues.forEach(v => {
                const tag = document.createElement('span');
                tag.className = 'px-3 py-1 bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center gap-1.5 shadow-sm';
                tag.innerHTML = `<span>${v.label}</span>`;
                valuesContainer.appendChild(tag);
            });
        }
    }

    // Display user personal perspective (Kazanım f)
    const opinionTextarea = document.getElementById('user-opinion');
    const perspectiveContainer = document.getElementById('final-perspective-container');
    const perspectiveDisplay = document.getElementById('final-perspective-display');
    
    if (opinionTextarea && perspectiveContainer && perspectiveDisplay) {
        const val = opinionTextarea.value.trim();
        if (val) {
            perspectiveDisplay.textContent = `"${val}"`;
            perspectiveContainer.classList.remove('hidden');
        } else {
            perspectiveContainer.classList.add('hidden');
        }
    }
}

// Stage navigation tabs event setup
document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.navStage;
        const targetVal = getStageNum(target);
        const unlockedVal = getStageNum(state.unlockedStage);

        if (targetVal <= unlockedVal) {
            initStageContent(target);
        }
    });
});

document.getElementById('start-btn').addEventListener('click', () => { 
    unlockStage(1);
    initStageContent(1); 
});

document.getElementById('next-btn').addEventListener('click', () => {
    let nextStage;
    if (typeof state.stage === 'number') {
        nextStage = state.stage + 1;
        if (nextStage > state.maxStage) nextStage = 'final';
    } else {
        nextStage = 'final';
    }
    const nextVal = getStageNum(nextStage);
    const unlockedVal = getStageNum(state.unlockedStage);

    if (nextVal <= unlockedVal) {
        initStageContent(nextStage);
    }
});

// SCORM Servis İlklendirmesi
window.addEventListener('DOMContentLoaded', () => {
    if (window.SCORM && typeof window.SCORM.initialize === 'function') {
        window.SCORM.initialize();
    }
});

window.addEventListener('beforeunload', () => {
    if (window.SCORM && typeof window.SCORM.terminate === 'function') {
        window.SCORM.terminate();
    }
});

document.getElementById('restart-btn').addEventListener('click', () => {
    if (window.SCORM && typeof window.SCORM.sendCompletion === 'function') {
        window.SCORM.sendCompletion(true);
    }
    state.unlockedStage = 1;
    initStageContent(0);
});

const closeBtn = document.getElementById('close-btn');
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        if (window.SCORM && typeof window.SCORM.sendCompletion === 'function') {
            window.SCORM.sendCompletion(true);
        }
        try {
            window.close();
        } catch (e) {}
        
        document.body.innerHTML = `
            <div class="min-h-screen bg-[#e8e2d7] text-slate-800 flex flex-col items-center justify-center p-6 text-center fade-in">
                <div class="w-16 h-16 bg-emerald-100 border-2 border-emerald-500 text-emerald-700 flex items-center justify-center text-3xl mb-4 shadow-md">
                    ✓
                </div>
                <h2 class="text-2xl font-black mb-2 text-slate-800">Etkinlik Başarıyla Sonlandırıldı</h2>
                <p class="text-sm text-slate-600 max-w-md">Katılımınız için teşekkür ederiz. Bu sekmeyi veya pencereyi kapatabilirsiniz.</p>
            </div>
        `;
    });
}

// Fullscreen Toggle Logic
const fsBtn = document.getElementById('fullscreen-btn');
if (fsBtn) {
    fsBtn.addEventListener('click', () => {
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen().catch(err => console.log(err));
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    });

    const updateFsBtnState = () => {
        const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
        fsBtn.setAttribute('title', isFs ? 'Tam Ekrandan Çık' : 'Tam Ekran');
    };

    document.addEventListener('fullscreenchange', updateFsBtnState);
    document.addEventListener('webkitfullscreenchange', updateFsBtnState);
}

// Başlangıçta tüm sekmelerin kilit durumunu güncelle
updateNavTabs();
