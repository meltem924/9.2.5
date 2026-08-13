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
    else if (target === 5) initS5();
    else if (target === 6) initS6();
    else if (target === 'final') showFinal();
}

function initS1() {
    let answered = 0;
    const name = document.getElementById('s1-source-name');
    const primary = document.getElementById('s1-primary-btn');
    const secondary = document.getElementById('s1-secondary-btn');
    const feedbackContainer = document.getElementById('s1-feedback-container');
    const feedbackEl = document.getElementById('s1-feedback');
    const nextBtn = document.getElementById('s1-next-btn');
    const nextBtnText = document.getElementById('s1-next-btn-text');
    
    function showSource() {
        const item = s1Data[answered];
        document.querySelectorAll('.s1-source-image').forEach(img => 
            img.classList.toggle('hidden', img.dataset.templateId !== item.image)
        );
        name.textContent = item.text;
        
        primary.disabled = false; 
        secondary.disabled = false;
        
        primary.style.background = '#ecfdf5';
        primary.style.borderColor = '#10b981';
        primary.style.color = '#065f46';
        primary.style.boxShadow = 'none';

        secondary.style.background = '#f0f9ff';
        secondary.style.borderColor = '#0ea5e9';
        secondary.style.color = '#0369a1';
        secondary.style.boxShadow = 'none';

        if (feedbackContainer) feedbackContainer.classList.add('hidden');
    }
    
    function choose(choice) {
        if (answered >= s1Data.length || primary.disabled) return;
        const item = s1Data[answered];
        const isCorrect = choice === item.answer;
        const clickedBtn = choice === 'primary' ? primary : secondary;
        const correctBtn = item.answer === 'primary' ? primary : secondary;

        primary.disabled = true; 
        secondary.disabled = true;

        if (feedbackContainer) feedbackContainer.classList.remove('hidden');

        if (isCorrect) {
            clickedBtn.style.background = '#059669';
            clickedBtn.style.borderColor = '#047857';
            clickedBtn.style.color = '#ffffff';
            clickedBtn.style.boxShadow = '0 0 10px rgba(16, 185, 129, 0.4)';

            const label = item.answer === 'primary' ? 'Birinci El' : 'İkinci El';
            if (feedbackEl) {
                feedbackEl.innerHTML = `
                    <div class="text-sm font-extrabold mb-1">İnceleme Notu</div>
                    <div class="font-normal opacity-95">${item.explanation || `"${item.text}" ${label} kaynak örneğidir.`}</div>
                `;
                feedbackEl.className = 'text-xs font-semibold p-4 text-left leading-relaxed bg-emerald-50 border border-emerald-300 text-emerald-900 shadow-sm fade-in';
            }
        } else {
            clickedBtn.style.background = '#dc2626';
            clickedBtn.style.borderColor = '#b91c1c';
            clickedBtn.style.color = '#ffffff';
            clickedBtn.style.boxShadow = '0 0 10px rgba(220, 38, 38, 0.4)';

            correctBtn.style.background = '#059669';
            correctBtn.style.borderColor = '#047857';
            correctBtn.style.color = '#ffffff';

            const correctLabel = item.answer === 'primary' ? 'Birinci El' : 'İkinci El';
            if (feedbackEl) {
                feedbackEl.innerHTML = `
                    <div class="text-sm font-extrabold mb-1">Değerlendirme & Bilgi Notu</div>
                    <div class="font-normal opacity-95">${item.explanation || `"${item.text}" aslında ${correctLabel} kaynak örneğidir.`}</div>
                `;
                feedbackEl.className = 'text-xs font-semibold p-4 text-left leading-relaxed bg-amber-50 border border-amber-300 text-amber-900 shadow-sm fade-in';
            }
        }

        const isLastItem = (answered + 1 >= s1Data.length);
        if (isLastItem) {
            if (nextBtn) nextBtn.classList.add('hidden');
            showNext();
        } else {
            if (nextBtn) nextBtn.classList.remove('hidden');
            if (nextBtnText) nextBtnText.textContent = 'Sonraki Kaynağa Geç';
        }
    }
    
    if (nextBtn) {
        nextBtn.onclick = () => {
            answered++;
            if (answered < s1Data.length) {
                showSource();
            }
        };
    }

    primary.onclick = () => choose('primary');
    secondary.onclick = () => choose('secondary');
    showSource();
}

function initS2() {
    const featuresCol = document.getElementById('s2-features');
    const meaningsCol = document.getElementById('s2-meanings');
    featuresCol.innerHTML = '';
    meaningsCol.innerHTML = '';
    let selected = null, matched = 0;
    
    const features = s2Data.map((card, i) => ({ pair: i, label: card.front, kind: 'feature' })).sort(() => Math.random() - 0.5);
    const meanings = s2Data.map((card, i) => ({ pair: i, label: card.back, kind: 'meaning' })).sort(() => Math.random() - 0.5);
    
    // Doğru cevapların doğrudan karşılıklı gelmesini önle
    for (let i = 0; i < features.length; i++) {
        if (features[i].pair === meanings[i].pair) {
            const swapIdx = (i + 1) % meanings.length;
            const temp = meanings[i];
            meanings[i] = meanings[swapIdx];
            meanings[swapIdx] = temp;
        }
    }
    
    function createBtn(card) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.dataset.pair = card.pair;
        btn.dataset.kind = card.kind;
        
        if (card.kind === 'feature') {
            btn.className = 'option-btn w-full p-3.5 text-sm font-bold border-2 border-amber-300 bg-amber-50 text-amber-950 shadow-sm hover:border-amber-500 hover:bg-amber-100 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400';
        } else {
            btn.className = 'option-btn w-full p-3.5 text-sm font-medium border-2 border-sky-300 bg-sky-50 text-sky-950 shadow-sm hover:border-sky-500 hover:bg-sky-100 transition-all focus:outline-none focus:ring-2 focus:ring-sky-400';
        }
        btn.textContent = card.label;
        
        btn.addEventListener('click', () => {
            if (btn.disabled || btn.classList.contains('matched')) return;
            if (!selected) { 
                selected = btn; 
                btn.style.transform = 'scale(1.02)';
                btn.style.boxShadow = '0 0 10px rgba(217, 119, 6, 0.35)';
                btn.style.borderColor = '#d97706';
                btn.style.background = '#fef3c7';
                return; 
            }
            if (selected === btn) return;
            if (selected.dataset.pair === btn.dataset.pair && selected.dataset.kind !== btn.dataset.kind) {
                selected.style.transform = '';
                selected.style.boxShadow = '';
                
                [selected, btn].forEach(b => {
                    b.classList.add('matched');
                    b.disabled = true;
                    b.style.background = '#ecfdf5';
                    b.style.borderColor = '#10b981';
                    b.style.color = '#065f46';
                    b.style.boxShadow = 'none';
                    b.style.transform = '';
                    b.style.opacity = '0.9';
                });
                
                matched++; 
                selected = null;
                if (matched === s2Data.length) setTimeout(showNext, 700);
            } else {
                btn.style.borderColor = '#ef4444';
                btn.style.background = '#fef2f2';
                btn.style.boxShadow = '0 0 8px rgba(239, 68, 68, 0.3)';
                const prev = selected; 
                selected = null;
                setTimeout(() => { 
                    btn.style.borderColor = '';
                    btn.style.background = '';
                    btn.style.boxShadow = '';
                    prev.style.borderColor = '';
                    prev.style.background = '';
                    prev.style.boxShadow = '';
                    prev.style.transform = '';
                }, 500);
            }
        });
        return btn;
    }
    
    features.forEach(card => featuresCol.appendChild(createBtn(card)));
    meanings.forEach(card => meaningsCol.appendChild(createBtn(card)));
}

function initS3() {
    const container = document.getElementById('s3-game');
    container.innerHTML = '';
    let answered = 0;
    
    const gameWrapper = document.createElement('div');
    gameWrapper.className = 'space-y-4';
    container.appendChild(gameWrapper);
    
    s3Data.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 's3-card p-5 fade-in';
        card.style.animationDelay = `${index * 100}ms`;
        
        // Randomize option order
        const isCorrectFirst = Math.random() < 0.5;
        const options = isCorrectFirst ? [
            { type: 'correct', text: item.effect },
            { type: 'wrong', text: item.wrong }
        ] : [
            { type: 'wrong', text: item.wrong },
            { type: 'correct', text: item.effect }
        ];

        card.innerHTML = `
            <div class="s3-cause-box mb-4">
                <p class="text-base font-bold text-amber-950 leading-relaxed">
                    "${item.cause}" durumu hangi tarihsel sonuca yol açmıştır?
                </p>
            </div>

            <div class="grid gap-2.5">
                ${options.map(opt => `
                    <button type="button" class="s3-option-btn option-btn text-left p-3.5 text-sm text-slate-800 flex items-start gap-3 w-full bg-white border border-slate-300 hover:border-amber-500 hover:bg-amber-50 shadow-sm" data-choice="${opt.type}">
                        <span class="leading-snug pt-0.5">${opt.text}</span>
                    </button>
                `).join('')}
            </div>

            <div class="s3-feedback hidden text-xs font-medium mt-3.5 p-3.5 leading-relaxed"></div>
        `;
        
        gameWrapper.appendChild(card);
        
        card.querySelectorAll('[data-choice]').forEach(btn => btn.addEventListener('click', () => {
            if (card.dataset.done) return;
            card.dataset.done = 'true';
            card.classList.add('is-done');
            
            card.querySelectorAll('[data-choice]').forEach(b => { 
                b.disabled = true; 
                b.classList.add('selected'); 
            });
            
            const feedback = card.querySelector('.s3-feedback');
            feedback.classList.remove('hidden');
            
            if (btn.dataset.choice === 'correct') { 
                btn.classList.add('correct'); 
                feedback.textContent = `✓ ${item.correctExplanation}`; 
                feedback.className = 's3-feedback text-xs font-semibold mt-3.5 p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-900 leading-relaxed shadow-sm'; 
            } else { 
                btn.classList.add('incorrect'); 
                const correctBtn = card.querySelector('[data-choice="correct"]');
                if (correctBtn) correctBtn.classList.add('correct');
                feedback.textContent = `✕ ${item.wrongExplanation}`; 
                feedback.className = 's3-feedback text-xs font-semibold mt-3.5 p-3.5 bg-red-50 border border-red-300 text-red-900 leading-relaxed shadow-sm'; 
            }
            answered++;
            if (answered === s3Data.length) setTimeout(showNext, 800);
        }));
    });
}

function initS4() {
    const layer = document.getElementById('s4-hotspots-layer');
    const counter = document.getElementById('s4-counter');
    const modal = document.getElementById('s4-info-modal');
    const modalTitle = document.getElementById('s4-modal-title');
    const modalDetail = document.getElementById('s4-modal-detail');
    const modalClose = document.getElementById('s4-modal-close');
    
    if (!layer) return;
    layer.innerHTML = '';
    let discoveredCount = 0;
    counter.textContent = `0 / ${s4Data.length}`;
    modal.classList.add('hidden');

    s4Data.forEach((item) => {
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
                discoveredCount++;
                counter.textContent = `${discoveredCount} / ${s4Data.length}`;

                if (discoveredCount === s4Data.length) {
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

function initS5() {
    const container = document.getElementById('s5-game');
    container.innerHTML = '';
    let currentStep = 0;

    // Soruları her başlangıçta rastgele karıştır
    const s5Items = [...s5Data].sort(() => Math.random() - 0.5);

    container.innerHTML = `
        <!-- Active Draggable Item Panel (Above) -->
        <div id="s5-active-panel" class="card-surface p-5 border border-slate-300 shadow-sm mb-6 fade-in">
            <!-- Draggable Item Card -->
            <div id="s5-drag-card" draggable="true" class="p-4 bg-white border-2 border-amber-500 text-base font-bold text-slate-800 leading-snug shadow-sm text-center cursor-grab active:cursor-grabbing hover:border-amber-600 transition-all select-none">
                <span id="s5-active-item"></span>
            </div>

            <p id="s5-feedback" class="hidden text-xs font-semibold mt-3 p-3 leading-relaxed text-left transition-all"></p>
        </div>

        <!-- 3 Columns Drop Zones (Below) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Sütun 1: Sadece Geçmiş -->
            <div class="s5-drop-zone p-4 bg-white border-2 border-dashed border-slate-300 flex flex-col min-h-[220px] transition-all" data-cat="past">
                <div class="text-amber-900 font-extrabold text-sm mb-3 flex items-center justify-center gap-2 border-b border-amber-200 pb-2.5 pointer-events-none">
                    <span>Sadece Geçmiş</span>
                </div>
                <div id="s5-past-list" class="space-y-2 flex-1 pointer-events-none"></div>
            </div>

            <!-- Sütun 2: Sadece Günümüz -->
            <div class="s5-drop-zone p-4 bg-white border-2 border-dashed border-slate-300 flex flex-col min-h-[220px] transition-all" data-cat="present">
                <div class="text-amber-900 font-extrabold text-sm mb-3 flex items-center justify-center gap-2 border-b border-amber-200 pb-2.5 pointer-events-none">
                    <span>Sadece Günümüz</span>
                </div>
                <div id="s5-present-list" class="space-y-2 flex-1 pointer-events-none"></div>
            </div>

            <!-- Sütun 3: Her İki Dönem -->
            <div class="s5-drop-zone p-4 bg-white border-2 border-dashed border-slate-300 flex flex-col min-h-[220px] transition-all" data-cat="both">
                <div class="text-amber-900 font-extrabold text-sm mb-3 flex items-center justify-center gap-2 border-b border-amber-200 pb-2.5 pointer-events-none">
                    <span>Her İki Dönem</span>
                </div>
                <div id="s5-both-list" class="space-y-2 flex-1 pointer-events-none"></div>
            </div>
        </div>
    `;

    const activeItemEl = document.getElementById('s5-active-item');
    const dragCardEl = document.getElementById('s5-drag-card');
    const feedbackEl = document.getElementById('s5-feedback');
    const activePanelEl = document.getElementById('s5-active-panel');

    function renderStep() {
        if (currentStep >= s5Items.length) {
            activePanelEl.innerHTML = `
                <div class="text-center py-4">
                    <h3 class="font-bold text-emerald-700 text-base mb-1">Tebrikler!</h3>
                    <p class="text-xs text-slate-600">Tüm kültürel ögeleri doğru sütunlara yerleştirdiniz.</p>
                </div>
            `;
            setTimeout(showNext, 1200);
            return;
        }

        const item = s5Items[currentStep];
        activeItemEl.textContent = item.item;
        feedbackEl.classList.add('hidden');
        dragCardEl.className = 'p-4 bg-white border-2 border-amber-500 text-base font-bold text-slate-800 leading-snug shadow-sm text-center cursor-grab active:cursor-grabbing hover:border-amber-600 transition-all select-none';
    }

    function processDrop(chosenCat) {
        if (currentStep >= s5Items.length) return;

        const item = s5Items[currentStep];

        if (chosenCat === item.category) {
            feedbackEl.classList.remove('hidden');
            feedbackEl.textContent = `Harika Tespit! ${item.hint}`;
            feedbackEl.className = 'text-xs font-semibold mt-3 p-3 leading-relaxed text-left bg-emerald-50 text-emerald-900 border border-emerald-300 shadow-sm fade-in';

            const targetList = document.getElementById(`s5-${item.category}-list`);
            const badge = document.createElement('div');
            badge.className = 'p-2.5 bg-emerald-50 border border-emerald-300 text-emerald-900 font-semibold text-xs flex items-center gap-2 fade-in shadow-sm';
            badge.innerHTML = `<span class="shrink-0 text-emerald-600 font-bold">✓</span> <span>${item.item}</span>`;
            targetList.appendChild(badge);

            currentStep++;
            setTimeout(renderStep, 3500);
        } else {
            dragCardEl.className = 'p-4 bg-amber-50 border-2 border-amber-500 text-base font-bold text-amber-900 leading-snug shadow-sm text-center cursor-grab active:cursor-grabbing transition-all select-none';
            
            feedbackEl.classList.remove('hidden');
            feedbackEl.textContent = `İpucu: ${item.hint}`;
            feedbackEl.className = 'text-xs font-semibold mt-3 p-3 leading-relaxed text-left bg-amber-50 text-amber-900 border border-amber-300 shadow-sm fade-in';
        }
    }

    // Drag events (Desktop)
    dragCardEl.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', s5Items[currentStep].category);
        dragCardEl.classList.add('opacity-50');
    });

    dragCardEl.addEventListener('dragend', () => {
        dragCardEl.classList.remove('opacity-50');
    });

    // Drop Zone events
    document.querySelectorAll('.s5-drop-zone').forEach(zone => {
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
    });

    renderStep();
}

function validateUserOpinion(rawText, selectedBadges) {
    const text = (rawText || '').trim();
    if (!text) {
        return {
            isValid: false,
            message: 'Lütfen konargöçer yaşam tarzının tarihi ve kültürel önemi hakkındaki düşüncenizi yazınız.'
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
    const vowels = /[aeıioöuü]/i;
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
            message: 'Lütfen aynı kelimeleri tekrarlamak yerine konargöçer yaşam hakkındaki bakış açınızı cümle kurarak ifade ediniz.'
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

function initS6() {
    const container = document.getElementById('s6-badges');
    const opinionTextarea = document.getElementById('user-opinion');
    const feedbackEl = document.getElementById('s6-opinion-feedback');
    const submitBtn = document.getElementById('s6-submit-opinion-btn');
    
    container.innerHTML = '';
    let selected = 0;
    state.selectedValues = [];
    
    if (feedbackEl) {
        feedbackEl.classList.add('hidden');
        feedbackEl.textContent = '';
    }

    s6Badges.forEach(badge => {
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
                const opinionBox = document.getElementById('s6-perspective-box');
                if (opinionBox) {
                    opinionBox.scrollIntoView({ behavior: 'smooth' });
                }
                if (opinionTextarea) {
                    opinionTextarea.focus();
                }
                if (feedbackEl) {
                    feedbackEl.textContent = '3 değer seçtiniz. Lütfen aşağıdaki alana konargöçer yaşama ilişkin kişisel bakış açınızı yazıp "Görüşümü Kaydet & Değerlendir" butonuna basınız.';
                    feedbackEl.className = 'text-xs font-semibold mt-3 p-3 text-left leading-relaxed bg-amber-50 border border-amber-300 text-amber-900 shadow-sm fade-in';
                    feedbackEl.classList.remove('hidden');
                }
            }
        });
        container.appendChild(div);
    });

    if (submitBtn) {
        submitBtn.onclick = () => {
            if (state.selectedValues.length < 3) {
                if (feedbackEl) {
                    feedbackEl.textContent = 'Lütfen önce yukarıdaki alandan konargöçer yaşamı tanımlayan 3 değeri seçiniz.';
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
            <div class="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center justify-center p-6 text-center fade-in">
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
