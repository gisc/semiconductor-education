/* Mira and the Great Dimming - interactions (original) */
(function () {
'use strict';
var $ = function (id) { return document.getElementById(id); };
function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }


/* ---------- Sparks ---------- */

var SPARKS = [
    { id: 'sight', ico: '👁️', name: 'Spark of Sight' },
    { id: 'flow', ico: '🌊', name: 'Spark of Flow' },
    { id: 'logic', ico: '🗝️', name: 'Spark of Logic' },
    { id: 'craft', ico: '🏔️', name: 'Spark of Craft' },
    { id: 'scale', ico: '📚', name: 'Spark of Scale' },
    { id: 'woven', ico: '🧵', name: 'Spark of Connection' }
];
var lit = [];
function renderSparks() {
    var bar = $('sparkBar');
    bar.innerHTML = '';
    SPARKS.forEach(function (s) {
        var on = lit.indexOf(s.id) >= 0;
        var chip = el('span', 'quest-spark' + (on ? ' lit' : ''));
        chip.appendChild(el('span', 'ico', on ? s.ico : '·'));
        chip.appendChild(document.createTextNode(on ? s.name : 'unlit'));
        bar.appendChild(chip);
    });
    $('sparkCount').textContent = lit.length + ' of 6 sparks lit' + (lit.length === 6 ? ' - the Lighthouse is waiting.' : '');
}
function earn(id) {
    if (lit.indexOf(id) >= 0) return;
    lit.push(id);
    renderSparks();
    var b = $('earn-' + id);
    if (b) b.hidden = false;
}
renderSparks();

/* ---------- Realm I: wake the city ---------- */

var CITY = [
    { id: 'gate', emoji: '🚇', name: 'The MRT fare gate', fact: 'Its chip reads your card, checks the fare and swings open in a blink. A whole computer for one small job.' },
    { id: 'cooker', emoji: '🍚', name: 'The hawker stall rice cooker', fact: 'A microcontroller - a tiny complete computer - watches the temperature so the rice never burns.' },
    { id: 'traffic', emoji: '🚦', name: 'The traffic light', fact: 'Controllers time the crossings and whisper to each other across the city.' },
    { id: 'card', emoji: '💳', name: 'Her ez-link card', fact: 'The gold contact hides a secure chip that proves the card is really hers.' },
    { id: 'phone', emoji: '📱', name: 'Her silent phone', fact: 'Dozens of chips inside: processor, memory, cameras, radios, and tiny managers for power and touch.' },
    { id: 'clinic', emoji: '🩺', name: 'The clinic monitor', fact: 'Chips listen to heartbeats and turn them into numbers a doctor can trust.' }
];
var awake = [];
var cityGrid = $('cityGrid');
CITY.forEach(function (item) {
    var b = el('button', 'hunt');
    b.type = 'button';
    function paint() {
        var on = awake.indexOf(item.id) >= 0;
        b.className = 'hunt' + (on ? ' found' : '');
        b.setAttribute('aria-pressed', on);
        b.innerHTML = '';
        b.appendChild(el('span', 'emoji', on ? item.emoji : '💤'));
        b.appendChild(el('span', 'name', item.name));
        b.appendChild(el('span', on ? 'fact' : 'tap', on ? item.fact : 'Tap to wake it'));
    }
    b.addEventListener('click', function () {
        var i = awake.indexOf(item.id);
        if (i >= 0) awake.splice(i, 1); else awake.push(item.id);
        paint();
        $('cityScore').textContent = awake.length + ' of ' + CITY.length + ' machines awake' + (awake.length === CITY.length ? ' - the city was never dumb metal. It was full of tiny minds.' : '');
        if (awake.length === CITY.length) earn('sight');
    });
    paint();
    cityGrid.appendChild(b);
});
$('cityScore').textContent = '0 of ' + CITY.length + ' machines awake';

/* ---------- Realm II: doping + diode door ---------- */

var dopant = 'P';
var cells = [];
for (var ci = 0; ci < 12; ci++) cells.push(null);
var flipped = false;
function dopeVerdict() {
    var doped = cells.filter(Boolean);
    var nP = doped.filter(function (d) { return d === 'P'; }).length;
    var nB = doped.length - nP;
    if (doped.length === 0) return 'The cave crystal is pure silicon - beautiful, orderly, and almost silent. It barely conducts.';
    if (nP > nB) return 'More phosphorus than boron: this is N-type crystal. Spare electrons carry the song - the cave hums with current.';
    if (nB > nP) return 'More boron than phosphorus: this is P-type crystal. It carries the song as holes - empty seats where electrons should be.';
    return 'Perfectly balanced - the spare electrons fill the holes and the crystal falls quiet again.';
}
function checkFlow() {
    var doped = cells.filter(Boolean).length;
    var cd = $('chkDope'), cf = $('chkDoor');
    cd.textContent = (doped >= 3 ? '✓' : '○') + ' tune at least 3 atoms';
    cd.classList.toggle('done', doped >= 3);
    cf.textContent = (flipped ? '✓' : '○') + ' open the one-way door';
    cf.classList.toggle('done', flipped);
    if (doped >= 3 && flipped) earn('flow');
}
function renderLattice() {
    var lat = $('lattice');
    lat.innerHTML = '';
    cells.forEach(function (c, i) {
        var a = el('button', 'atom' + (c ? ' doped-' + c : ''));
        a.type = 'button';
        a.setAttribute('aria-label', 'Atom ' + (i + 1) + (c ? ' doped ' + (c === 'P' ? 'phosphorus' : 'boron') : 'silicon'));
        var label = el('span', '', c || 'Si');
        a.appendChild(label);
        if (c) { var tag = el('i', '', c === 'P' ? 'e⁻' : 'h⁺'); a.appendChild(tag); }
        a.addEventListener('click', function () {
            cells[i] = cells[i] ? null : dopant;
            renderLattice();
            $('dopeVerdict').textContent = dopeVerdict();
            checkFlow();
        });
        lat.appendChild(a);
    });
}
$('pickP').addEventListener('click', function () { dopant = 'P'; $('pickP').classList.add('picked'); $('pickB').classList.remove('picked'); });
$('pickB').addEventListener('click', function () { dopant = 'B'; $('pickB').classList.add('picked'); $('pickP').classList.remove('picked'); });
$('dopeReset').addEventListener('click', function () {
    for (var i = 0; i < 12; i++) cells[i] = null;
    renderLattice();
    $('dopeVerdict').textContent = dopeVerdict();
    checkFlow();
});
renderLattice();
function renderDiode() {
    $('diodeArt').innerHTML = '<svg viewBox="0 0 320 90" class="art" role="img" aria-label="' + (flipped ? 'Current flows through the crystal door' : 'The crystal door is shut') + '">' +
        '<rect x="30" y="30" width="110" height="30" rx="6" fill="' + (flipped ? '#f6b26b' : '#e8b06b') + '"/>' +
        '<rect x="180" y="30" width="110" height="30" rx="6" fill="#6fa8dc"/>' +
        '<text x="85" y="49" text-anchor="middle" font-size="13" fill="#5a3a10">P cave</text>' +
        '<text x="235" y="49" text-anchor="middle" font-size="13" fill="#1f3a5f">N cave</text>' +
        '<polygon points="140,30 180,45 140,60" fill="' + (flipped ? '#73a89a' : '#585254') + '"/>' +
        (flipped ? '<circle cx="70" cy="45" r="5" fill="#ffd966" class="flowdot"/><circle cx="70" cy="45" r="5" fill="#ffd966" class="flowlong"/>' : '') +
        '<text x="160" y="80" text-anchor="middle" font-size="12" fill="#585254">' + (flipped ? 'the door swings open - current flows' : 'shut - no current this way') + '</text></svg>';
    var btn = $('diodeBtn');
    btn.textContent = flipped ? 'Flip the battery back' : 'Flip the battery';
    btn.classList.toggle('on', flipped);
}
$('diodeBtn').addEventListener('click', function () { flipped = !flipped; renderDiode(); checkFlow(); });
renderDiode();
checkFlow();

/* ---------- Realm III: the Switchwood ---------- */

var GATES = [
    { id: 'AND', fn: function (a, b) { return a && b; }, story: 'both fireflies must glow together' },
    { id: 'OR', fn: function (a, b) { return a || b; }, story: 'either firefly alone will do' },
    { id: 'XOR', fn: function (a, b) { return a !== b; }, story: 'exactly one firefly - never both' },
    { id: 'NAND', fn: function (a, b) { return !(a && b); }, story: 'anything except both together' }
];
var gateIdx = 0, inA = false, inB = false;
GATES.forEach(function (g, i) {
    var b = el('button', 'gatebtn' + (i === 0 ? ' picked' : ''), g.id);
    b.type = 'button';
    b.addEventListener('click', function () {
        gateIdx = i;
        $('gatePick').querySelectorAll('.gatebtn').forEach(function (x, xi) { x.classList.toggle('picked', xi === i); });
        renderGate();
    });
    $('gatePick').appendChild(b);
});
function renderGate() {
    var g = GATES[gateIdx];
    var out = g.fn(inA, inB);
    $('inA').textContent = inA ? '✨ A lit' : 'A dark';
    $('inA').classList.toggle('on', inA);
    $('inB').textContent = inB ? '✨ B lit' : 'B dark';
    $('inB').classList.toggle('on', inB);
    $('gateBox').textContent = g.id;
    $('gateOut').textContent = out ? '🦋 moth through!' : 'moth waits';
    $('gateOut').classList.toggle('on', out);
    $('gateStory').textContent = 'That gate is ' + g.id + ': ' + g.story + '.';
    var t = $('truthTable');
    t.innerHTML = '<thead><tr><th>A</th><th>B</th><th>' + g.id + '</th></tr></thead>';
    var tb = el('tbody');
    [[false, false], [false, true], [true, false], [true, true]].forEach(function (row) {
        var ro = g.fn(row[0], row[1]);
        var tr = el('tr', row[0] === inA && row[1] === inB ? 'active' : '');
        tr.appendChild(el('td', '', row[0] ? '1' : '0'));
        tr.appendChild(el('td', '', row[1] ? '1' : '0'));
        tr.appendChild(el('td', ro ? 'one' : '', ro ? '1' : '0'));
        tb.appendChild(tr);
    });
    t.appendChild(tb);
    if (out) earn('logic');
}
$('inA').addEventListener('click', function () { inA = !inA; renderGate(); });
$('inB').addEventListener('click', function () { inB = !inB; renderGate(); });
renderGate();

/* ---------- Realm IV: Sky Fab stepper + Moore ---------- */

var FAB_ART = {
    ingot: '<svg viewBox="0 0 320 150" class="art" aria-hidden="true"><ellipse cx="160" cy="120" rx="110" ry="18" fill="#dfe3e6"/><rect x="70" y="40" width="180" height="80" rx="38" fill="#cfd6da"/><ellipse cx="160" cy="40" rx="90" ry="18" fill="#e9edef"/><text x="160" y="85" text-anchor="middle" font-size="13" fill="#585254">one perfect crystal</text></svg>',
    coat: '<svg viewBox="0 0 320 150" class="art" aria-hidden="true"><rect x="40" y="80" width="240" height="26" rx="6" fill="#cfd6da"/><rect x="40" y="66" width="240" height="14" rx="6" fill="#e69138"/><text x="160" y="45" text-anchor="middle" font-size="12" fill="#585254">photoresist coat on wafer</text></svg>',
    expose: '<svg viewBox="0 0 320 150" class="art" aria-hidden="true"><rect x="60" y="30" width="200" height="14" rx="3" fill="#251f21"/><rect x="100" y="30" width="30" height="14" fill="#f4efec"/><rect x="190" y="30" width="30" height="14" fill="#f4efec"/><polygon points="100,44 130,44 150,90 80,90" fill="#ffd966" opacity="0.6"/><polygon points="190,44 220,44 240,90 160,90" fill="#ffd966" opacity="0.6"/><rect x="40" y="90" width="240" height="24" rx="6" fill="#cfd6da"/><text x="160" y="135" text-anchor="middle" font-size="12" fill="#585254">mask + light = printed pattern</text></svg>',
    etch: '<svg viewBox="0 0 320 150" class="art" aria-hidden="true"><rect x="40" y="70" width="240" height="34" rx="6" fill="#cfd6da"/><rect x="90" y="70" width="34" height="22" fill="#f4efec"/><rect x="196" y="70" width="34" height="22" fill="#f4efec"/><text x="107" y="60" text-anchor="middle" font-size="16">⚡</text><text x="213" y="60" text-anchor="middle" font-size="16">⚡</text><text x="160" y="130" text-anchor="middle" font-size="12" fill="#585254">carving canyons atoms wide</text></svg>',
    metal: '<svg viewBox="0 0 320 150" class="art" aria-hidden="true"><rect x="40" y="50" width="240" height="14" rx="4" fill="#6fa8dc"/><rect x="40" y="72" width="240" height="14" rx="4" fill="#e69138"/><rect x="40" y="94" width="240" height="14" rx="4" fill="#93c47d"/><line x1="80" y1="64" x2="80" y2="72" stroke="#585254" stroke-width="4"/><line x1="240" y1="86" x2="240" y2="94" stroke="#585254" stroke-width="4"/><text x="160" y="135" text-anchor="middle" font-size="12" fill="#585254">dozens of layers of wiring</text></svg>',
    pkg: '<svg viewBox="0 0 320 150" class="art" aria-hidden="true"><rect x="110" y="45" width="100" height="60" rx="8" fill="#251f21"/><rect x="135" y="62" width="50" height="26" rx="3" fill="#3d6e5f"/><circle cx="160" cy="75" r="6" fill="#ffd966"/><rect x="92" y="50" width="18" height="5" fill="#c0bebf"/><rect x="100" y="64" width="18" height="5" fill="#c0bebf"/><rect x="108" y="78" width="18" height="5" fill="#c0bebf"/><rect x="116" y="92" width="18" height="5" fill="#c0bebf"/><rect x="210" y="50" width="18" height="5" fill="#c0bebf"/><rect x="202" y="64" width="18" height="5" fill="#c0bebf"/><rect x="194" y="78" width="18" height="5" fill="#c0bebf"/><rect x="186" y="92" width="18" height="5" fill="#c0bebf"/><text x="160" y="135" text-anchor="middle" font-size="12" fill="#585254">one chip, sealed and ready</text></svg>'
};
var FAB_STEPS = [
    { t: 'Grow a perfect crystal', b: 'Ultra-pure sand is melted and spun into a single flawless crystal - an ingot taller than Mira, pure to 99.9999999%. It is sliced into thin discs called wafers.', art: 'ingot' },
    { t: 'Paint with light-sensitive resist', b: 'The wafer is coated with photoresist, a chemical that changes where light touches it - like photographic film, but thousands of times more precise.', art: 'coat' },
    { t: 'Print the pattern with light', b: 'Light shines through a mask - the chip\u2019s blueprint - and shrinks the pattern onto the wafer. The most advanced machines use extreme ultraviolet light with a wavelength of just 13.5 nanometres, made only by ASML in the Netherlands. One machine costs hundreds of millions of dollars.', art: 'expose' },
    { t: 'Etch and dope', b: 'Where the resist was exposed, material is etched away or atoms are fired into the silicon - doping it, as Mira did in the caves - to build transistors.', art: 'etch' },
    { t: 'Wire it up, layer after layer', b: 'Thin metal layers connect billions of transistors. The whole dance - coat, expose, etch, dope, deposit - repeats dozens of times over about three months, in cleanrooms far cleaner than a hospital operating theatre.', art: 'metal' },
    { t: 'Test, slice, package', b: 'Each wafer holds hundreds of chips. They are tested, sliced into dice, and each good die is sealed in the black package with metal legs you see on circuit boards.', art: 'pkg' }
];
var fabStep = 0;
function renderFab() {
    var s = FAB_STEPS[fabStep];
    $('fabArt').innerHTML = FAB_ART[s.art];
    $('fabStepLine').textContent = 'Station ' + (fabStep + 1) + ' of ' + FAB_STEPS.length + ': ' + s.t;
    $('fabStepBody').textContent = s.b;
    $('fabBack').disabled = fabStep === 0;
    $('fabNext').disabled = fabStep === FAB_STEPS.length - 1;
    var d = $('fabDots');
    d.innerHTML = '';
    for (var i = 0; i < FAB_STEPS.length; i++) d.appendChild(el('i', i === fabStep ? 'here' : ''));
    if (fabStep === FAB_STEPS.length - 1) earn('craft');
}
$('fabBack').addEventListener('click', function () { if (fabStep > 0) { fabStep--; renderFab(); } });
$('fabNext').addEventListener('click', function () { if (fabStep < FAB_STEPS.length - 1) { fabStep++; renderFab(); } });
renderFab();

var MOORE = [
    { year: 1971, chip: 'Intel 4004', count: 2300, label: '2,300 transistors' },
    { year: 1978, chip: 'Intel 8086', count: 29000, label: '29,000' },
    { year: 1985, chip: 'Intel 386', count: 275000, label: '275,000' },
    { year: 1993, chip: 'Intel Pentium', count: 3100000, label: '3.1 million' },
    { year: 2000, chip: 'Intel Pentium 4', count: 42000000, label: '42 million' },
    { year: 2006, chip: 'Intel Core 2 Duo', count: 291000000, label: '291 million' },
    { year: 2017, chip: 'AMD EPYC (32 cores)', count: 19200000000, label: '19.2 billion' },
    { year: 2024, chip: 'NVIDIA B200 AI GPU', count: 208000000000, label: '208 billion' }
];
$('mooreRange').addEventListener('input', function () {
    var m = MOORE[Number(this.value)];
    $('mooreYear').textContent = m.year;
    $('mooreChip').textContent = m.chip;
    $('mooreCount').textContent = m.label + (m.label.indexOf('transistors') >= 0 ? '' : ' transistors');
    $('mooreFill').style.width = Math.max(2, Math.round((Math.log10(m.count) / Math.log10(208000000000)) * 100)) + '%';
});
$('mooreFill').style.width = '2%';

/* ---------- Realm V: Scholar vs Choir race ---------- */

var TOTAL = 64, cpuDone = 0, gpuDone = 0, raceTimer = null;
var cpuTiles = $('cpuTiles'), gpuTiles = $('gpuTiles');
for (var ti = 0; ti < TOTAL; ti++) { cpuTiles.appendChild(el('i')); gpuTiles.appendChild(el('i')); }
function paintTiles() {
    cpuTiles.querySelectorAll('i').forEach(function (t, i) { t.className = i < cpuDone ? 'cpu' : ''; });
    gpuTiles.querySelectorAll('i').forEach(function (t, i) { t.className = i < gpuDone ? 'gpu' : ''; });
    $('cpuCount').textContent = cpuDone + '/' + TOTAL;
    $('gpuCount').textContent = gpuDone + '/' + TOTAL;
}
$('raceBtn').addEventListener('click', function () {
    if (raceTimer) clearInterval(raceTimer);
    cpuDone = 0; gpuDone = 0; paintTiles();
    $('raceVerdict').hidden = true;
    var btn = $('raceBtn');
    btn.disabled = true; btn.textContent = 'Shelving...';
    raceTimer = setInterval(function () {
        cpuDone = Math.min(TOTAL, cpuDone + 2);
        gpuDone = Math.min(TOTAL, gpuDone + 32);
        paintTiles();
        if (cpuDone === TOTAL && gpuDone === TOTAL) {
            clearInterval(raceTimer); raceTimer = null;
            btn.disabled = false; btn.textContent = 'Race again';
            $('raceVerdict').hidden = false;
            earn('scale');
        }
    }, 450);
});

/* ---------- Realm VI: the woven world ---------- */

var JOURNEY = [
    { emoji: '✏️', stage: 'Dreamed up · United States', body: 'Companies like NVIDIA, Apple and Qualcomm design chips but own no factories - they are fabless. A modern chip design takes years and billions of dollars.' },
    { emoji: '🔧', stage: 'Tools built · Netherlands, Japan, US', body: 'ASML in the Netherlands is the only maker of EUV lithography machines - the printers for the most advanced chips. Tokyo Electron in Japan and Applied Materials in the US build other essential tools.' },
    { emoji: '🏭', stage: 'Manufactured · Taiwan, South Korea', body: 'TSMC in Taiwan made about 72% of the world\u2019s foundry chips in mid-2026 and produces nearly all of the most advanced ones. South Korea\u2019s Samsung and SK hynix lead in memory.' },
    { emoji: '📦', stage: 'Assembled & tested · Malaysia, China, Taiwan', body: 'Chips are sliced, tested and packaged - increasingly advanced packaging stacks several chips together into one powerful unit.' },
    { emoji: '🇸🇬', stage: 'Singapore\u2019s part · Singapore', body: 'About 1 in 10 of the world\u2019s chips and 1 in 5 pieces of chip-making equipment come from Singapore. The industry contributes almost 7% of Singapore\u2019s GDP - small island, outsized role.' },
    { emoji: '🗾', stage: 'The comeback bet · Japan', body: 'Japan once made over half the world\u2019s chips, then fell behind. Its national comeback project, Rapidus - backed by roughly US$15 billion of public money - aims to mass-produce advanced 2-nanometre chips in Hokkaido from 2027. The technology is on track; the hardest question - who will buy? - remains open.' }
];
var passStage = 0, passSeen = [0];
JOURNEY.forEach(function (s, i) {
    var b = el('button', 'stamp', s.emoji);
    b.type = 'button';
    b.setAttribute('aria-label', s.stage);
    b.addEventListener('click', function () {
        passStage = i;
        if (passSeen.indexOf(i) < 0) passSeen.push(i);
        renderPass();
    });
    $('stamps').appendChild(b);
});
function renderPass() {
    $('stamps').querySelectorAll('.stamp').forEach(function (b, i) {
        b.classList.toggle('here', i === passStage);
        b.setAttribute('aria-pressed', i === passStage);
    });
    $('passStage').textContent = JOURNEY[passStage].stage;
    $('passBody').textContent = JOURNEY[passStage].body;
    $('passScore').textContent = passSeen.length + ' of ' + JOURNEY.length + ' stamps collected' + (passSeen.length === JOURNEY.length ? ' - you have traced the whole thread.' : '');
    if (passSeen.length === JOURNEY.length) earn('woven');
}
renderPass();

/* ---------- The Lighthouse: five riddles ---------- */

var RIDDLES = [
    { q: 'Why is silicon called a semiconductor?', options: ['It carries about half as much current as an equal copper wire', 'It conducts in one direction only, like a one-way valve', 'Its conduction sits between metal and insulator - and we can tune it'], answer: 2, why: 'Silicon conducts far better than glass but far worse than copper, and doping lets engineers tune how it behaves. One-way conduction is the diode - built from silicon, but a different idea.' },
    { q: 'You add phosphorus atoms to silicon. What do you get?', options: ['N-type silicon, whose spare electrons carry current', 'P-type silicon, whose moving holes carry current', 'A metal-like alloy that conducts in all directions'], answer: 0, why: 'Phosphorus has five outer electrons, so each atom brings one spare. Those electrons carry the current: that is N-type. Boron, with three outer electrons, makes P-type instead.' },
    { q: 'A transistor is best described as...', options: ['A one-way valve that passes current in a single direction', 'An electrically controlled switch with no moving parts', 'A tiny cell that stores charge for use later on'], answer: 1, why: 'A voltage on the gate opens or closes the current between source and drain - a switch flipped by electricity itself. The one-way valve is the diode, a different component.' },
    { q: 'Who is the only maker of EUV lithography machines?', options: ['TSMC', 'NVIDIA', 'ASML'], answer: 2, why: 'ASML, a Dutch company, is the sole supplier of the extreme ultraviolet machines that print the most advanced chips. TSMC makes chips and NVIDIA designs them - neither builds the printers.' },
    { q: 'Why do GPUs suit AI workloads?', options: ['They work on thousands of simple operations at the same time', 'They run at far higher clock speeds than any CPU', 'They draw less power than a CPU on the same calculation'], answer: 0, why: 'AI maths is the same simple operation repeated trillions of times - ideal for thousands of small cores working in parallel. Clock speed and power draw are not what decides it.' }
];
var lampLit = RIDDLES.map(function () { return false; });
var lampRow = $('lamps');
RIDDLES.forEach(function (_, i) {
    var l = el('span', 'quest-lamp', '·');
    l.setAttribute('aria-label', 'Lamp ' + (i + 1) + ' unlit');
    lampRow.appendChild(l);
});
function renderLamps() {
    var n = 0;
    lampRow.querySelectorAll('.quest-lamp').forEach(function (l, i) {
        var on = lampLit[i];
        l.classList.toggle('lit', on);
        l.textContent = on ? '🕯️' : '·';
        l.setAttribute('aria-label', 'Lamp ' + (i + 1) + (on ? ' lit' : ' unlit'));
        if (on) n++;
    });
    $('lampCount').textContent = n + ' of 5 lamps lit';
    if (n === 5) $('dawn').hidden = false;
}
var riddleRoot = $('riddles');
RIDDLES.forEach(function (item, qi) {
    var qd = el('div', 'q');
    var pq = el('p', 'qq');
    var strong = el('strong', '', (qi + 1) + '. ' + item.q);
    pq.appendChild(strong);
    qd.appendChild(pq);
    var opts = el('div', 'qopts');
    var why = null;
    item.options.forEach(function (opt, oi) {
        var b = el('button', 'qopt', opt);
        b.type = 'button';
        b.addEventListener('click', function () {
            if (lampLit[qi]) return;
            opts.querySelectorAll('.qopt').forEach(function (x, xi) {
                x.classList.remove('wrong');
                if (lampLit[qi]) { x.disabled = true; if (xi === item.answer) x.classList.add('right'); else x.classList.add('muted'); }
            });
            if (oi === item.answer) {
                lampLit[qi] = true;
                opts.querySelectorAll('.qopt').forEach(function (x, xi) {
                    x.disabled = true;
                    if (xi === item.answer) x.classList.add('right');
                    else x.classList.add('muted');
                });
                if (why) why.textContent = item.why;
                renderLamps();
            } else {
                b.classList.add('wrong');
                if (why) why.textContent = 'Not quite - ' + item.why + ' Try again.';
            }
        });
        opts.appendChild(b);
    });
    qd.appendChild(opts);
    why = el('p', 'qwhy', '');
    qd.appendChild(why);
    riddleRoot.appendChild(qd);
});

})();
