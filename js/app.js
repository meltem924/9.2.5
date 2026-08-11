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
    const counter = document.getElementById('s1-counter');
    const primary = document.getElementById('s1-primary-btn');
    const secondary = document.getElementById('s1-secondary-btn');
    
    function showSource() {
        const item = s1Data[answered];
        document.querySelectorAll('.s1-source-image').forEach(img => 
            img.classList.toggle('hidden', img.dataset.templateId !== item.image)
        );
        name.textContent = item.text;
        counter.textContent = `Kaynak ${answered + 1} / ${s1Data.length}`;
        primary.disabled = false; 
        secondary.disabled = false;
        primary.classList.remove('correct', 'incorrect'); 
        secondary.classList.remove('correct', 'incorrect');
    }
    
    function choose(choice) {
        if (answered >= s1Data.length || primary.disabled) return;
        const item = s1Data[answered];
        const button = choice === 'primary' ? primary : secondary;
        button.classList.add(choice === item.answer ? 'correct' : 'incorrect');
        if (choice !== item.answer) {
            (item.answer === 'primary' ? primary : secondary).classList.add('correct');
        }
        primary.disabled = true; 
        secondary.disabled = true;
        answered++;
        if (answered === s1Data.length) setTimeout(showNext, 700);
        else setTimeout(showSource, 700);
    }
    
    primary.onclick = () => choose('primary');
    secondary.onclick = () => choose('secondary');
    showSource();
}

function initS2() {
    const container = document.getElementById('s2-cards');
    container.innerHTML = '';
    let selected = null, matched = 0;
    const pairs = s2Data.flatMap((card, i) => [
        { id: `f-${i}`, pair: i, label: card.front, kind: 'feature' },
        { id: `m-${i}`, pair: i, label: card.back, kind: 'meaning' }
    ]).sort(() => Math.random() - 0.5);
    
    pairs.forEach(card => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.dataset.pair = card.pair;
        btn.dataset.kind = card.kind;
        btn.className = 'option-btn min-h-24 p-3 rounded-xl card-surface text-sm font-semibold text-slate-200 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500';
        btn.textContent = card.label;
        btn.addEventListener('click', () => {
            if (btn.disabled || btn.classList.contains('matched')) return;
            if (!selected) { 
                selected = btn; 
                btn.classList.add('border-amber-400', 'bg-slate-700'); 
                return; 
            }
            if (selected === btn) return;
            if (selected.dataset.pair === btn.dataset.pair && selected.dataset.kind !== btn.dataset.kind) {
                selected.classList.remove('border-amber-400', 'bg-slate-700');
                selected.classList.add('matched', 'correct'); 
                btn.classList.add('matched', 'correct');
                selected.disabled = true; 
                btn.disabled = true;
                matched++; 
                selected = null;
                if (matched === s2Data.length) setTimeout(showNext, 700);
            } else {
                btn.classList.add('incorrect'); 
                selected.classList.add('incorrect');
                const prev = selected; 
                selected = null;
                setTimeout(() => { 
                    btn.classList.remove('incorrect'); 
                    prev.classList.remove('incorrect', 'border-amber-400', 'bg-slate-700'); 
                }, 500);
            }
        });
        container.appendChild(btn);
    });
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
            <div class="flex items-center justify-between gap-2 mb-3">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                    ⚡ Neden #${index + 1}
                </span>
                <span class="text-xs text-slate-400 font-medium">${index + 1} / ${s3Data.length}</span>
            </div>

            <div class="s3-cause-box p-4 rounded-xl mb-4">
                <p class="text-xs text-amber-400/90 uppercase tracking-widest font-semibold mb-1">Tarihi Koşul / Durum</p>
                <p class="text-base font-bold text-slate-100 leading-snug">${item.cause}</p>
            </div>

            <p class="text-xs font-semibold text-slate-300 mb-2.5 flex items-center gap-1.5">
                <span>🎯</span> Bu durum hangi tarihi sonuca yol açmıştır?
            </p>

            <div class="grid gap-2.5">
                ${options.map(opt => `
                    <button type="button" class="s3-option-btn option-btn text-left p-3.5 rounded-xl text-sm text-slate-200 flex items-start gap-3 w-full" data-choice="${opt.type}">
                        <span class="shrink-0 w-6 h-6 rounded-lg bg-slate-800/80 border border-slate-600 text-slate-300 font-bold text-xs flex items-center justify-center">${opt.label}</span>
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
                <span class="mt-1 text-amber-500/70 shrink-0">
                    <i data-lucide="help-circle" class="w-5 h-5"></i>
                </span>
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
                feedbackDiv.innerHTML = `<i data-lucide="check-circle-2" class="w-5 h-5 mr-1.5"></i> Doğru`;
                feedbackDiv.className += ' text-emerald-400 bg-emerald-950/50 border border-emerald-900/50';
            } else {
                div.classList.add('border-red-500/40', 'bg-red-950/20');
                div.classList.remove('border-[#d5a85b]/20', 'bg-[#36291e]/80');
                feedbackDiv.innerHTML = `<i data-lucide="x-circle" class="w-5 h-5 mr-1.5"></i> Yanlış`;
                feedbackDiv.className += ' text-red-400 bg-red-950/50 border border-red-900/50';
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
    let answered = 0;
    s5Data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'flex items-center justify-between card-surface p-3 rounded-lg';
        div.innerHTML = `<span class="text-sm font-medium text-slate-200">${item.item}</span>
            <div class="flex gap-1 shrink-0">
                <button class="option-btn px-2 py-1 text-xs rounded-full bg-slate-700 border border-slate-500 text-slate-300 font-semibold" data-val="past">Geçmiş</button>
                <button class="option-btn px-2 py-1 text-xs rounded-full bg-slate-700 border border-slate-500 text-slate-300 font-semibold" data-val="present">Günümüz</button>
                <button class="option-btn px-2 py-1 text-xs rounded-full bg-slate-700 border border-slate-500 text-slate-300 font-semibold" data-val="both">İkisi de</button>
            </div>`;
        div.addEventListener('click', e => {
            const btn = e.target.closest('[data-val]');
            if (!btn || div.dataset.done) return;
            div.dataset.done = 'true';
            div.querySelectorAll('[data-val]').forEach(b => b.classList.add('selected'));
            if (btn.dataset.val === item.category) { 
                btn.classList.add('correct'); 
            } else { 
                btn.classList.add('incorrect'); 
                div.querySelector(`[data-val="${item.category}"]`).classList.add('correct'); 
            }
            answered++;
            if (answered === s5Data.length) setTimeout(showNext, 600);
        });
        container.appendChild(div);
    });
}

function initS6() {
    const container = document.getElementById('s6-badges');
    container.innerHTML = '';
    let selected = 0;
    s6Badges.forEach(badge => {
        const div = document.createElement('button');
        div.className = 'option-btn flex flex-col items-center gap-2 p-5 rounded-xl card-surface border border-slate-600 hover:border-amber-500 transition-all';
        div.innerHTML = `<span class="text-3xl">${badge.emoji}</span><span class="text-xs font-semibold text-slate-300 uppercase tracking-wide">${badge.label}</span>`;
        div.addEventListener('click', () => {
            if (div.classList.contains('chosen')) return;
            div.classList.add('chosen');
            div.style.borderColor = '#d97706';
            div.style.background = 'rgba(217,119,6,0.15)';
            selected++;
            if (selected >= 3) setTimeout(showNext, 400);
        });
        container.appendChild(div);
    });
}

function showFinal() {
    showStage('final');
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
