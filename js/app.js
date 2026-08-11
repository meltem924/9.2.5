lucide.createIcons();

function updateNavTabs() {
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
        const target = btn.dataset.navStage;
        const targetVal = target === 'final' ? 'final' : parseInt(target, 10);
        if (targetVal === state.stage) {
            btn.classList.add('active-tab');
        } else {
            btn.classList.remove('active-tab');
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

    if (stageVal === 0 || stageVal === 'final') {
        document.getElementById('next-container').classList.add('hidden');
    } else {
        document.getElementById('next-container').classList.remove('hidden');
    }
}

function showNext() { 
    document.getElementById('next-container').classList.remove('hidden'); 
}

function initStageContent(n) {
    const target = n === 'final' ? 'final' : parseInt(n, 10);
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
        
        primary.style.background = 'rgb(6, 78, 59)';
        primary.style.borderColor = 'rgb(4, 120, 87)';
        primary.style.color = 'rgb(110, 231, 183)';
        primary.style.boxShadow = 'none';

        secondary.style.background = 'rgb(30, 58, 95)';
        secondary.style.borderColor = 'rgb(29, 78, 216)';
        secondary.style.color = 'rgb(147, 197, 253)';
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
            clickedBtn.style.borderColor = '#34d399';
            clickedBtn.style.color = '#ffffff';
            clickedBtn.style.boxShadow = '0 0 16px rgba(16, 185, 129, 0.7)';

            const label = item.answer === 'primary' ? 'Birinci El' : 'İkinci El';
            if (feedbackEl) {
                feedbackEl.innerHTML = `
                    <div class="text-sm font-extrabold mb-1">💡 İnceleme Notu</div>
                    <div class="font-normal opacity-95">${item.explanation || `"${item.text}" ${label} kaynak örneğidir.`}</div>
                `;
                feedbackEl.className = 'text-xs font-bold p-3.5 rounded-xl text-left leading-relaxed bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 shadow-xl fade-in';
            }
        } else {
            clickedBtn.style.background = '#d97706';
            clickedBtn.style.borderColor = '#fbbf24';
            clickedBtn.style.color = '#ffffff';
            clickedBtn.style.boxShadow = '0 0 16px rgba(217, 119, 6, 0.7)';

            correctBtn.style.background = '#059669';
            correctBtn.style.borderColor = '#34d399';
            correctBtn.style.color = '#ffffff';

            const correctLabel = item.answer === 'primary' ? 'Birinci El' : 'İkinci El';
            if (feedbackEl) {
                feedbackEl.innerHTML = `
                    <div class="text-sm font-extrabold mb-1">💡 Değerlendirme & Bilgi Notu</div>
                    <div class="font-normal opacity-95">${item.explanation || `"${item.text}" aslında ${correctLabel} kaynak örneğidir.`}</div>
                `;
                feedbackEl.className = 'text-xs font-bold p-3.5 rounded-xl text-left leading-relaxed bg-amber-950/90 border border-amber-500/60 text-amber-200 shadow-xl fade-in';
            }
        }

        if (nextBtnText) {
            nextBtnText.textContent = (answered + 1 >= s1Data.length) ? 'Sonraki Aşamaya Geç' : 'Sonraki Kaynağa Geç';
        }
    }
    
    if (nextBtn) {
        nextBtn.onclick = () => {
            answered++;
            if (answered >= s1Data.length) {
                showNext();
            } else {
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
    
    function createBtn(card) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.dataset.pair = card.pair;
        btn.dataset.kind = card.kind;
        
        if (card.kind === 'feature') {
            btn.className = 'option-btn w-full p-3.5 rounded-xl text-sm font-bold border-2 border-amber-500/50 bg-gradient-to-br from-amber-950/80 to-amber-900/40 text-amber-200 shadow-md hover:border-amber-400 hover:shadow-amber-500/20 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-amber-400';
        } else {
            btn.className = 'option-btn w-full p-3.5 rounded-xl text-sm font-semibold border-2 border-sky-500/40 bg-gradient-to-br from-sky-950/70 to-slate-800/60 text-sky-200 shadow-md hover:border-sky-400 hover:shadow-sky-500/20 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-sky-400';
        }
        btn.textContent = card.label;
        
        btn.addEventListener('click', () => {
            if (btn.disabled || btn.classList.contains('matched')) return;
            if (!selected) { 
                selected = btn; 
                btn.style.transform = 'scale(1.04)';
                btn.style.boxShadow = '0 0 20px rgba(217, 119, 6, 0.5)';
                btn.style.borderColor = '#fbbf24';
                return; 
            }
            if (selected === btn) return;
            if (selected.dataset.pair === btn.dataset.pair && selected.dataset.kind !== btn.dataset.kind) {
                selected.style.transform = '';
                selected.style.boxShadow = '';
                
                [selected, btn].forEach(b => {
                    b.classList.add('matched');
                    b.disabled = true;
                    b.style.background = 'linear-gradient(135deg, rgba(5, 150, 105, 0.3), rgba(6, 78, 59, 0.5))';
                    b.style.borderColor = '#34d399';
                    b.style.color = '#a7f3d0';
                    b.style.boxShadow = '0 0 12px rgba(52, 211, 153, 0.3)';
                    b.style.transform = '';
                    b.style.opacity = '0.85';
                });
                
                matched++; 
                selected = null;
                if (matched === s2Data.length) setTimeout(showNext, 700);
            } else {
                btn.style.borderColor = '#f59e0b';
                btn.style.boxShadow = '0 0 12px rgba(245, 158, 11, 0.4)';
                const prev = selected; 
                selected = null;
                setTimeout(() => { 
                    btn.style.borderColor = '';
                    btn.style.boxShadow = '';
                    prev.style.borderColor = '';
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
    gameWrapper.className = 'space-y-5';
    container.appendChild(gameWrapper);
    
    s3Data.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 's3-card p-5 rounded-2xl fade-in';
        card.style.animationDelay = `${index * 100}ms`;
        
        // Randomize option order (A/B)
        const isCorrectFirst = Math.random() < 0.5;
        const options = isCorrectFirst ? [
            { type: 'correct', text: item.effect, label: 'A' },
            { type: 'wrong', text: item.wrong, label: 'B' }
        ] : [
            { type: 'wrong', text: item.wrong, label: 'A' },
            { type: 'correct', text: item.effect, label: 'B' }
        ];

        card.innerHTML = `
            <div class="s3-cause-box p-4 rounded-xl mb-4">
                <p class="text-base font-bold text-slate-100 leading-snug">${item.cause}</p>
            </div>

            <p class="text-xs font-semibold text-slate-300 mb-2.5 flex items-center gap-1.5">
                <span>🎯</span> Bu durum hangi tarihi sonuca yol açmıştır?
            </p>

            <div class="grid gap-2.5">
                ${options.map(opt => `
                    <button type="button" class="s3-option-btn option-btn text-left p-3.5 rounded-xl text-sm text-slate-200 flex items-start gap-3 w-full" data-choice="${opt.type}">
                        <span class="shrink-0 w-6 h-6 rounded-lg bg-slate-800/80 border border-slate-600 text-slate-300 font-bold text-xs flex items-center justify-center">▸</span>
                        <span class="leading-snug pt-0.5">${opt.text}</span>
                    </button>
                `).join('')}
            </div>

            <div class="s3-feedback hidden text-xs font-medium mt-3.5 p-3.5 rounded-xl leading-relaxed"></div>
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
                feedback.className = 's3-feedback text-xs font-medium mt-3.5 p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 leading-relaxed'; 
            } else { 
                btn.classList.add('incorrect'); 
                const correctBtn = card.querySelector('[data-choice="correct"]');
                if (correctBtn) correctBtn.classList.add('correct');
                feedback.textContent = `✕ ${item.wrongExplanation}`; 
                feedback.className = 's3-feedback text-xs font-medium mt-3.5 p-3.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 leading-relaxed'; 
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
        hotspot.className = 'hotspot-target absolute w-7 h-7 rounded-full border-2 border-amber-400 bg-amber-950/90 text-amber-200 font-bold flex items-center justify-center shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-300';
        hotspot.style.top = `${item.top}%`;
        hotspot.style.left = `${item.left}%`;
        hotspot.setAttribute('title', item.hint);
        hotspot.innerHTML = `<span class="text-amber-300 font-extrabold text-xs">?</span>`;

        hotspot.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Show modal info
            modalTitle.textContent = `${item.name} (${item.title})`;
            modalDetail.textContent = item.detail;
            modal.classList.remove('hidden');
            modal.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            if (!hotspot.classList.contains('discovered')) {
                hotspot.classList.add('discovered');
                hotspot.innerHTML = `<span class="text-emerald-300 text-[11px] font-black">✓</span>`;
                discoveredCount++;
                counter.textContent = `${discoveredCount} / ${s4Data.length}`;

                if (discoveredCount === s4Data.length) {
                    setTimeout(showNext, 1200);
                }
            }
        });

        layer.appendChild(hotspot);
    });

    modalClose.onclick = () => {
        modal.classList.add('hidden');
    };
}

function initS5() {
    const container = document.getElementById('s5-game');
    container.innerHTML = '';
    let currentStep = 0;

    // Soruları her başlangıçta rastgele karıştır
    const s5Items = [...s5Data].sort(() => Math.random() - 0.5);

    container.innerHTML = `
        <!-- Active Draggable Item Panel (Above) -->
        <div id="s5-active-panel" class="card-surface p-5 rounded-2xl border border-amber-500/40 shadow-xl mb-6 fade-in">
            <!-- Draggable Item Card -->
            <div id="s5-drag-card" draggable="true" class="p-4 rounded-xl bg-slate-900/90 border-2 border-amber-400/80 text-base font-bold text-amber-100 leading-snug shadow-lg text-center cursor-grab active:cursor-grabbing hover:border-amber-300 transition-all select-none">
                <span id="s5-active-item"></span>
            </div>

            <p id="s5-feedback" class="hidden text-xs font-semibold mt-3 p-2.5 rounded-lg leading-relaxed text-center transition-all"></p>
        </div>

        <!-- 3 Columns Drop Zones (Below) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Sütun 1: Sadece Geçmiş -->
            <div class="s5-drop-zone p-4 rounded-2xl bg-slate-900/70 border-2 border-amber-500/30 flex flex-col min-h-[220px] transition-all" data-cat="past">
                <div class="text-amber-300 font-extrabold text-sm mb-3 flex items-center justify-center gap-2 border-b border-amber-500/20 pb-2.5 pointer-events-none">
                    <span class="text-base">📜</span> <span>Sadece Geçmiş</span>
                </div>
                <div id="s5-past-list" class="space-y-2 flex-1 pointer-events-none"></div>
            </div>

            <!-- Sütun 2: Sadece Günümüz -->
            <div class="s5-drop-zone p-4 rounded-2xl bg-slate-900/70 border-2 border-amber-500/30 flex flex-col min-h-[220px] transition-all" data-cat="present">
                <div class="text-amber-300 font-extrabold text-sm mb-3 flex items-center justify-center gap-2 border-b border-amber-500/20 pb-2.5 pointer-events-none">
                    <span class="text-base">📱</span> <span>Sadece Günümüz</span>
                </div>
                <div id="s5-present-list" class="space-y-2 flex-1 pointer-events-none"></div>
            </div>

            <!-- Sütun 3: Her İki Dönem -->
            <div class="s5-drop-zone p-4 rounded-2xl bg-slate-900/70 border-2 border-amber-500/30 flex flex-col min-h-[220px] transition-all" data-cat="both">
                <div class="text-amber-300 font-extrabold text-sm mb-3 flex items-center justify-center gap-2 border-b border-amber-500/20 pb-2.5 pointer-events-none">
                    <span class="text-base">🔄</span> <span>Her İki Dönem</span>
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
                    <span class="text-3xl mb-2 block">🎉</span>
                    <h3 class="font-bold text-emerald-400 text-base mb-1">Tebrikler!</h3>
                    <p class="text-xs text-slate-300">Tüm kültürel ögeleri doğru sütunlara yerleştirdiniz.</p>
                </div>
            `;
            setTimeout(showNext, 1200);
            return;
        }

        const item = s5Items[currentStep];
        activeItemEl.textContent = item.item;
        feedbackEl.classList.add('hidden');
        dragCardEl.className = 'p-4 rounded-xl bg-slate-900/90 border-2 border-amber-400/80 text-base font-bold text-amber-100 leading-snug shadow-lg text-center cursor-grab active:cursor-grabbing hover:border-amber-300 transition-all select-none';
    }

    function processDrop(chosenCat) {
        if (currentStep >= s5Items.length) return;

        const item = s5Items[currentStep];

        if (chosenCat === item.category) {
            feedbackEl.classList.remove('hidden');
            feedbackEl.textContent = `✨ Harika Tespit! ${item.hint}`;
            feedbackEl.className = 'text-xs font-semibold mt-3 p-3 rounded-xl leading-relaxed text-left bg-emerald-950/90 text-emerald-200 border border-emerald-500/60 shadow-lg fade-in';

            const targetList = document.getElementById(`s5-${item.category}-list`);
            const badge = document.createElement('div');
            badge.className = 'p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 font-semibold text-xs flex items-center gap-2 fade-in shadow-md';
            badge.innerHTML = `<span class="shrink-0 text-emerald-400 font-bold">✓</span> <span>${item.item}</span>`;
            targetList.appendChild(badge);

            currentStep++;
            setTimeout(renderStep, 4000);
        } else {
            dragCardEl.className = 'p-4 rounded-xl bg-amber-950/90 border-2 border-amber-500 text-base font-bold text-amber-100 leading-snug shadow-lg text-center cursor-grab active:cursor-grabbing transition-all select-none';
            
            feedbackEl.classList.remove('hidden');
            feedbackEl.textContent = `💡 İpucu: ${item.hint}`;
            feedbackEl.className = 'text-xs font-semibold mt-3 p-3 rounded-xl leading-relaxed text-left bg-amber-950/90 text-amber-200 border border-amber-500/60 shadow-lg fade-in';
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
            zone.classList.add('border-amber-400', 'bg-amber-500/20', 'scale-[1.02]');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('border-amber-400', 'bg-amber-500/20', 'scale-[1.02]');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('border-amber-400', 'bg-amber-500/20', 'scale-[1.02]');
            const chosenCat = zone.dataset.cat;
            processDrop(chosenCat);
        });
    });

    renderStep();
}

function initS6() {
    const container = document.getElementById('s6-badges');
    container.innerHTML = '';
    let selected = 0;
    state.selectedValues = [];
    
    s6Badges.forEach(badge => {
        const div = document.createElement('button');
        div.className = 'option-btn flex flex-col items-center gap-2 p-5 rounded-xl card-surface border border-slate-600 hover:border-amber-500 transition-all';
        div.innerHTML = `<span class="text-3xl">${badge.emoji}</span><span class="text-xs font-semibold text-slate-300 uppercase tracking-wide">${badge.label}</span>`;
        div.addEventListener('click', () => {
            if (div.classList.contains('chosen')) return;
            div.classList.add('chosen');
            div.style.borderColor = '#d97706';
            div.style.background = 'rgba(217,119,6,0.15)';
            state.selectedValues.push(badge);
            selected++;
            if (selected >= 3) {
                const opinionBox = document.getElementById('s6-perspective-box');
                if (opinionBox) opinionBox.scrollIntoView({ behavior: 'smooth' });
                setTimeout(showNext, 600);
            }
        });
        container.appendChild(div);
    });
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
                tag.className = 'px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs font-bold flex items-center gap-1.5';
                tag.innerHTML = `<span>${v.emoji}</span> <span>${v.label}</span>`;
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
        initStageContent(target);
    });
});

document.getElementById('start-btn').addEventListener('click', () => { 
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
    initStageContent(nextStage);
});

document.getElementById('restart-btn').addEventListener('click', () => {
    initStageContent(0);
});

const closeBtn = document.getElementById('close-btn');
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        try {
            window.close();
        } catch (e) {}
        
        document.body.innerHTML = `
            <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center fade-in">
                <div class="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 text-emerald-400 flex items-center justify-center text-4xl mb-4 shadow-2xl">
                    ✓
                </div>
                <h2 class="text-2xl font-black mb-2 text-slate-100">Etkinlik Başarıyla Sonlandırıldı</h2>
                <p class="text-sm text-slate-400 max-w-md">Katılımınız için teşekkür ederiz. Bu sekmeyi veya pencereyi kapatabilirsiniz.</p>
            </div>
        `;
    });
}
