lucide.createIcons();

function updateProgress() {
    const isNumericStage = typeof state.stage === 'number' && state.stage > 0;
    const currentNum = isNumericStage ? state.stage : (state.stage === 'final' ? state.maxStage : 0);
    const pct = (currentNum / state.maxStage) * 100;
    document.getElementById('progress-bar').style.width = pct + '%';
    
    if (state.stage === 'final') {
        document.getElementById('stage-label').textContent = 'Tamamlama Özeti';
    } else {
        document.getElementById('stage-label').textContent = `Aşama ${state.stage}/${state.maxStage}`;
    }
}

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

    if (stageVal === 0) {
        document.getElementById('progress-container').classList.add('hidden');
        document.getElementById('next-container').classList.add('hidden');
    } else if (stageVal === 'final') {
        document.getElementById('progress-container').classList.remove('hidden');
        document.getElementById('next-container').classList.add('hidden');
        updateProgress();
    } else {
        document.getElementById('progress-container').classList.remove('hidden');
        document.getElementById('next-container').classList.remove('hidden');
        updateProgress();
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
    const container = document.getElementById('s4-game');
    container.innerHTML = '';
    let answered = 0;
    s4Data.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-[#36291e]/80 backdrop-blur-md border border-[#d5a85b]/20 transition-all hover:border-[#d5a85b]/40 shadow-sm fade-in';
        div.style.animationDelay = `${index * 100}ms`;
        div.innerHTML = `
            <div class="flex items-start gap-3">
                <span class="text-sm font-medium text-slate-200 leading-relaxed">${item.statement}</span>
            </div>
            <div class="flex gap-3 shrink-0 s4-actions">
                <button class="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-950/40 text-emerald-400 border border-emerald-900/50 hover:bg-emerald-900/60 hover:border-emerald-500/50 transition-all font-semibold text-sm w-28 shadow-sm" data-val="true">
                    Evet
                </button>
                <button class="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-red-950/40 text-red-400 border border-red-900/50 hover:bg-red-900/60 hover:border-red-500/50 transition-all font-semibold text-sm w-28 shadow-sm" data-val="false">
                    Hayır
                </button>
            </div>
            <div class="s4-feedback hidden items-center justify-center px-4 py-2 rounded-xl font-bold text-sm w-full md:w-auto text-center shrink-0"></div>
        `;
        div.addEventListener('click', e => {
            const btn = e.target.closest('[data-val]');
            if (!btn || div.dataset.done) return;
            div.dataset.done = 'true';
            
            const actionsDiv = div.querySelector('.s4-actions');
            actionsDiv.classList.add('hidden');
            
            const feedbackDiv = div.querySelector('.s4-feedback');
            feedbackDiv.classList.remove('hidden');
            feedbackDiv.classList.add('flex');
            
            const isCorrect = (btn.dataset.val === 'true') === item.correct;
            
            if (isCorrect) {
                div.classList.add('border-emerald-500/40', 'bg-emerald-950/20');
                div.classList.remove('border-[#d5a85b]/20', 'bg-[#36291e]/80');
                feedbackDiv.innerHTML = `<i data-lucide="check-circle-2" class="w-5 h-5 mr-1.5"></i> Dönemle Uyumlu`;
                feedbackDiv.className += ' text-emerald-400 bg-emerald-950/50 border border-emerald-900/50';
            } else {
                div.classList.add('border-amber-500/40', 'bg-amber-950/20');
                div.classList.remove('border-[#d5a85b]/20', 'bg-[#36291e]/80');
                feedbackDiv.innerHTML = `<i data-lucide="info" class="w-5 h-5 mr-1.5"></i> Gözden Geçirilmeli`;
                feedbackDiv.className += ' text-amber-400 bg-amber-950/50 border border-amber-900/50';
            }
            
            lucide.createIcons({ root: div });
            answered++;
            if (answered === s4Data.length) setTimeout(showNext, 600);
        });
        container.appendChild(div);
    });
    lucide.createIcons({ root: container });
}

function initS5() {
    const container = document.getElementById('s5-game');
    container.innerHTML = '';
    let currentStep = 0;

    // Outer layout: Active Drag Card on top, Frayer Diagram Grid below with Drop Zones
    container.innerHTML = `
        <!-- Active Question / Draggable Card Panel -->
        <div id="frayer-active-panel" class="card-surface p-5 rounded-2xl border border-amber-500/40 shadow-xl mb-6 fade-in">
            <div class="flex items-center justify-end gap-2 mb-2">
                <span id="frayer-step-counter" class="text-xs font-semibold text-slate-400">1 / ${s5Data.length}</span>
            </div>
            
            <!-- Draggable Item Card -->
            <div id="frayer-drag-item" draggable="true" class="frayer-drag-card p-4 rounded-xl bg-slate-900/90 border-2 border-amber-400/80 text-base font-bold text-slate-100 leading-snug shadow-lg">
                <span id="frayer-active-item"></span>
            </div>

            <p id="frayer-feedback" class="hidden text-xs font-semibold mt-3 p-2.5 rounded-lg leading-relaxed"></p>
        </div>

        <!-- Central Hub Header -->
        <div class="text-center mb-3">
            <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-600/90 to-amber-700/90 text-slate-900 font-extrabold text-xs uppercase tracking-wider shadow-lg border border-amber-300/50">
                ⛺ KONARGÖÇER KÜLTÜR
            </span>
        </div>

        <!-- 2x2 Frayer Model Grid with Drop Zones -->
        <div class="frayer-grid">
            <!-- Quadrant 1: Tanım & Özellikler (Drop Zone) -->
            <div class="frayer-quadrant frayer-drop-zone border-amber-500/30" data-drop-cat="definition">
                <div class="frayer-quadrant-header text-amber-400 pointer-events-none">
                    <i data-lucide="book-open" class="w-4 h-4"></i>
                    <span>📖 Tanım & Özellikler</span>
                </div>
                <div id="frayer-definition-list" class="space-y-2 flex-1 pointer-events-none"></div>
            </div>

            <!-- Quadrant 2: Geçmişe Ait (Drop Zone) -->
            <div class="frayer-quadrant frayer-drop-zone border-amber-500/30" data-drop-cat="past">
                <div class="frayer-quadrant-header text-amber-400 pointer-events-none">
                    <i data-lucide="history" class="w-4 h-4"></i>
                    <span>📜 Sadece Geçmiş</span>
                </div>
                <div id="frayer-past-list" class="space-y-2 flex-1 pointer-events-none"></div>
            </div>

            <!-- Quadrant 3: Günümüze Ait (Drop Zone) -->
            <div class="frayer-quadrant frayer-drop-zone border-amber-500/30" data-drop-cat="present">
                <div class="frayer-quadrant-header text-amber-400 pointer-events-none">
                    <i data-lucide="smartphone" class="w-4 h-4"></i>
                    <span>📱 Sadece Günümüz</span>
                </div>
                <div id="frayer-present-list" class="space-y-2 flex-1 pointer-events-none"></div>
            </div>

            <!-- Quadrant 4: Her İki Dönem (Drop Zone) -->
            <div class="frayer-quadrant frayer-drop-zone border-amber-500/30" data-drop-cat="both">
                <div class="frayer-quadrant-header text-amber-400 pointer-events-none">
                    <i data-lucide="repeat" class="w-4 h-4"></i>
                    <span>🔄 Her İki Dönem</span>
                </div>
                <div id="frayer-both-list" class="space-y-2 flex-1 pointer-events-none"></div>
            </div>
        </div>
    `;

    lucide.createIcons({ root: container });

    const activeItemEl = document.getElementById('frayer-active-item');
    const dragCardEl = document.getElementById('frayer-drag-item');
    const stepCounterEl = document.getElementById('frayer-step-counter');
    const feedbackEl = document.getElementById('frayer-feedback');
    const activePanelEl = document.getElementById('frayer-active-panel');

    function renderStep() {
        if (currentStep >= s5Data.length) {
            activePanelEl.innerHTML = `
                <div class="text-center py-3">
                    <span class="text-2xl mb-1 block">🎉</span>
                    <h3 class="font-bold text-emerald-400 text-sm">Tamamlandı!</h3>
                </div>
            `;
            setTimeout(showNext, 800);
            return;
        }

        const item = s5Data[currentStep];
        activeItemEl.textContent = item.item;
        stepCounterEl.textContent = `${currentStep + 1} / ${s5Data.length}`;
        feedbackEl.classList.add('hidden');
    }

    function showMinimalWrongPopup() {
        const existing = document.getElementById('minimal-wrong-popup');
        if (existing) existing.remove();

        const popup = document.createElement('div');
        popup.id = 'minimal-wrong-popup';
        popup.className = 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 px-5 py-3 rounded-2xl bg-red-950/90 border border-red-500/50 text-red-200 text-sm font-bold shadow-2xl backdrop-blur-md flex items-center gap-2 fade-in';
        popup.innerHTML = `<span class="text-base">✕</span> <span>Yanlış kutu! Tekrar deneyin.</span>`;
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.classList.add('opacity-0', 'transition-opacity', 'duration-300');
            setTimeout(() => popup.remove(), 300);
        }, 1200);
    }

    function processChoice(choice) {
        if (currentStep >= s5Data.length) return;

        const item = s5Data[currentStep];
        const isCorrect = choice === item.category;

        if (isCorrect) {
            feedbackEl.classList.remove('hidden');
            feedbackEl.textContent = '✓ Doğru! Öge kutusuna yerleştirildi.';
            feedbackEl.className = 'text-xs font-semibold mt-3 p-2.5 rounded-lg leading-relaxed bg-emerald-950/80 text-emerald-300 border border-emerald-600/50';

            const targetList = document.getElementById(`frayer-${item.category}-list`);
            const badge = document.createElement('div');
            badge.className = 'frayer-item-badge bg-emerald-950/70 border border-emerald-500/40 text-emerald-200';
            badge.innerHTML = `<span class="shrink-0 text-xs font-bold">✓</span> <span>${item.item}</span>`;
            targetList.appendChild(badge);

            currentStep++;
            setTimeout(renderStep, 700);
        } else {
            dragCardEl.classList.add('incorrect');
            setTimeout(() => dragCardEl.classList.remove('incorrect'), 400);

            showMinimalWrongPopup();
        }
    }

    // Drag events on Draggable Card
    dragCardEl.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', s5Data[currentStep].category);
        dragCardEl.classList.add('is-dragging');
    });

    dragCardEl.addEventListener('dragend', () => {
        dragCardEl.classList.remove('is-dragging');
    });

    // Drop zone events on Frayer Quadrants (Drag & Drop Only)
    document.querySelectorAll('.frayer-drop-zone').forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('drag-over');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-over');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            const dropCat = zone.dataset.dropCat;
            processChoice(dropCat);
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
