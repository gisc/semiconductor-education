/* The Thinking Sand - interactions (vanilla JS, no dependencies) */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  /* ---------- Hero wafer dies ---------- */
  (function () {
    var g = $('waferDies');
    if (!g) return;
    var colors = ['#73a89a', '#6fa8dc', '#f6b26b', '#b49ddb', '#93c47d', '#e8a0bf', '#76c7c0', '#f7d154'];
    var size = 26, gap = 4, k = 0, svgns = 'http://www.w3.org/2000/svg';
    for (var r = 0; r < 8; r++) for (var c = 0; c < 8; c++) {
      var x = 60 + c * (size + gap), y = 10 + r * (size + gap);
      var dx = x + size / 2 - 175, dy = y + size / 2 - 125;
      if (Math.sqrt(dx * dx + dy * dy) < 112) {
        var rect = document.createElementNS(svgns, 'rect');
        rect.setAttribute('x', x); rect.setAttribute('y', y);
        rect.setAttribute('width', size); rect.setAttribute('height', size);
        rect.setAttribute('rx', 4); rect.setAttribute('fill', colors[k++ % colors.length]);
        rect.setAttribute('opacity', 0.9);
        g.appendChild(rect);
      }
    }
  })();

  /* ---------- Chapter nav ---------- */
  document.querySelectorAll('.index button').forEach(function (b) {
    b.addEventListener('click', function () {
      var t = $(b.getAttribute('data-goto'));
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ---------- Chapter 1: chip hunt ---------- */
  var HUNT = [
    { emoji: '\u{1F4F1}', name: 'Your phone', fact: 'Dozens of specialised chips: a main processor with billions of transistors, memory, cameras, radios, and tiny managers for power and touch.' },
    { emoji: '\u{1F697}', name: 'A modern car', fact: 'A petrol car already hides roughly 600-700 chips - engine, brakes, airbags, windows, screens. An electric car carries about 1,600 to 3,000.' },
    { emoji: '\u{1F4B3}', name: 'Your bank or ez-link card', fact: 'The small gold contact hides a secure chip that proves the card is really yours.' },
    { emoji: '\u{1F35A}', name: 'A rice cooker', fact: 'Even a humble cooker has a microcontroller - a tiny complete computer on one chip - watching the temperature.' },
    { emoji: '\u{1F6A6}', name: 'Traffic lights', fact: 'Controllers time the lights and talk to each other across the city.' },
    { emoji: '\u{1F687}', name: 'MRT fare gates', fact: 'Each gate reads your card, checks the fare and opens - in a fraction of a second.' }
  ];
  var huntFound = [];
  var huntGrid = $('chipHunt');
  HUNT.forEach(function (item, i) {
    var b = el('button', 'hunt');
    b.type = 'button';
    function render() {
      var on = huntFound.indexOf(i) >= 0;
      b.classList.toggle('found', on);
      b.setAttribute('aria-pressed', on);
      b.innerHTML = '';
      b.appendChild(el('span', 'emoji', on ? item.emoji : '\u2753'));
      b.appendChild(el('span', 'name', item.name));
      b.appendChild(el('span', on ? 'fact' : 'tap', on ? item.fact : 'Tap to look inside'));
      $('huntScore').textContent = huntFound.length + ' of ' + HUNT.length + ' objects opened' + (huntFound.length === HUNT.length ? ' - everything around you is computing!' : '');
    }
    b.addEventListener('click', function () {
      var k = huntFound.indexOf(i);
      if (k >= 0) huntFound.splice(k, 1); else huntFound.push(i);
      render();
    });
    render();
    huntGrid.appendChild(b);
  });

  /* ---------- Chapter 1b: chip family ---------- */
  var FAMILY = [
    { emoji: '\u{1F9E0}', name: 'Processors', tag: 'the thinkers', fact: 'CPUs and GPUs do the maths - billions of transistor switches running your apps, games and AI.' },
    { emoji: '\u{1F5C4}\uFE0F', name: 'Memory', tag: 'the rememberers', fact: 'DRAM and flash chips hold your photos, apps and AI models as electric charge in trillions of microscopic cells.' },
    { emoji: '\u{1F441}\uFE0F', name: 'Image sensors', tag: 'the eyes', fact: 'Every camera starts here: a chip that turns light into electrical signals, millions of pixels at a time.' },
    { emoji: '\u{1F50C}', name: 'Power chips', tag: 'the muscle', fact: 'Power semiconductors steer big currents - they decide how fast your phone charges and how far an EV drives.' }
  ];
  var famOpen = -1;
  var famGrid = $('chipFamily');
  FAMILY.forEach(function (item, i) {
    var b = el('button', 'hunt');
    b.type = 'button';
    function render() {
      var on = famOpen === i;
      b.classList.toggle('found', on);
      b.setAttribute('aria-pressed', on);
      b.innerHTML = '';
      b.appendChild(el('span', 'emoji', item.emoji));
      b.appendChild(el('span', 'name', item.name));
      b.appendChild(el('span', 'tap', item.tag));
      if (on) b.appendChild(el('span', 'fact', item.fact));
    }
    b.addEventListener('click', function () {
      famOpen = (famOpen === i) ? -1 : i;
      famGrid.querySelectorAll('.hunt').forEach(function (x, j) { x.dispatchEvent(new Event('famrefresh')); });
      renderAll();
    });
    function renderAll() { FAMILY.forEach(function (_, j) { famGrid.children[j]._render(); }); }
    b._render = render;
    b.addEventListener('famrefresh', render);
    render();
    famGrid.appendChild(b);
  });

  /* ---------- Chapter 2: doping lab ---------- */
  var dopant = 'P';
  var cells = new Array(12).fill(null);
  var lattice = $('lattice');
  function dopeVerdict() {
    var b = cells.filter(function (c) { return c === 'B'; }).length;
    var p = cells.filter(function (c) { return c === 'P'; }).length;
    if (b > p) return 'More boron than phosphorus: this is P-type silicon. It carries current as holes - empty seats where electrons should be.';
    if (p > b) return 'More phosphorus than boron: this is N-type silicon. It carries current with spare electrons.';
    if (b > 0) return 'Perfectly balanced - and almost useless! Real chips use uneven doping to do their work.';
    return 'Pure silicon - a well-behaved crystal that barely conducts.';
  }
  for (var ci = 0; ci < 12; ci++) (function (i) {
    var a = el('button', 'atom', 'Si');
    a.type = 'button';
    a.addEventListener('click', function () {
      cells[i] = (cells[i] === dopant) ? null : dopant;
      a.className = 'atom' + (cells[i] ? ' doped-' + cells[i] : '');
      a.innerHTML = '';
      a.appendChild(el('span', '', cells[i] || 'Si'));
      if (cells[i] === 'P') a.appendChild(el('i', 'badge', 'e\u207B'));
      if (cells[i] === 'B') a.appendChild(el('i', 'badge', '\u25CB'));
      $('dopeVerdict').textContent = dopeVerdict();
    });
    lattice.appendChild(a);
  })(ci);
  $('pickP').addEventListener('click', function () { dopant = 'P'; $('pickP').classList.add('picked'); $('pickB').classList.remove('picked'); });
  $('pickB').addEventListener('click', function () { dopant = 'B'; $('pickB').classList.add('picked'); $('pickP').classList.remove('picked'); });
  $('dopeReset').addEventListener('click', function () {
    cells = new Array(12).fill(null);
    lattice.querySelectorAll('.atom').forEach(function (a) { a.className = 'atom'; a.innerHTML = '<span>Si</span>'; });
    $('dopeVerdict').textContent = dopeVerdict();
  });

  /* ---------- Chapter 2: diode ---------- */
  var diodeForward = true;
  $('diodeFlip').addEventListener('click', function () {
    diodeForward = !diodeForward;
    $('batLeft').setAttribute('fill', diodeForward ? '#73a89a' : '#ed313e');
    $('batLeftSign').textContent = diodeForward ? '+' : '\u2212';
    $('batRight').setAttribute('fill', diodeForward ? '#ed313e' : '#73a89a');
    $('batRightSign').textContent = diodeForward ? '\u2212' : '+';
    $('diodeFlow').style.display = diodeForward ? '' : 'none';
    var m = $('diodeMsg');
    m.textContent = diodeForward ? 'Current flows - the bulb lights up' : 'Blocked - almost no current gets through';
    m.setAttribute('fill', diodeForward ? '#3d6e5f' : '#ed313e');
    var bulb = $('diodeBulb');
    bulb.classList.toggle('on', diodeForward);
    bulb.textContent = diodeForward ? '\u{1F4A1}' : '\u26AB';
  });

  /* ---------- Chapter 3: transistor ---------- */
  var transOn = false;
  $('transToggle').addEventListener('click', function () {
    transOn = !transOn;
    var b = $('transToggle');
    b.classList.toggle('on', transOn);
    b.setAttribute('aria-pressed', transOn);
    b.textContent = (transOn ? 'Gate ON' : 'Gate OFF') + ' - tap to switch';
    $('gateRect').setAttribute('fill', transOn ? '#73a89a' : '#c0bebf');
    $('transFlow').style.display = transOn ? '' : 'none';
    var s = $('transState');
    s.textContent = transOn ? 'ON - current flows: a 1' : 'OFF - no current: a 0';
    s.setAttribute('fill', transOn ? '#3d6e5f' : '#585254');
  });

  /* ---------- Chapter 3: logic gates ---------- */
  var GATES = {
    AND: { fn: function (a, b) { return a && b; }, hint: 'On only when BOTH inputs are on.' },
    OR: { fn: function (a, b) { return a || b; }, hint: 'On when AT LEAST ONE input is on.' },
    XOR: { fn: function (a, b) { return a !== b; }, hint: 'On when the inputs are DIFFERENT. Half of every adding circuit.' },
    NAND: { fn: function (a, b) { return !(a && b); }, hint: 'Off only when both are on. Every chip you own is built almost entirely from NAND gates.' }
  };
  var gate = 'AND', inA = false, inB = false;
  var gatePick = $('gatePick');
  Object.keys(GATES).forEach(function (name) {
    var b = el('button', 'gatebtn' + (name === gate ? ' picked' : ''), name);
    b.type = 'button';
    b.addEventListener('click', function () {
      gate = name;
      gatePick.querySelectorAll('.gatebtn').forEach(function (x) { x.classList.toggle('picked', x.textContent === name); });
      renderGate();
    });
    gatePick.appendChild(b);
  });
  function renderGate() {
    var out = GATES[gate].fn(inA, inB);
    $('inA').textContent = 'A: ' + (inA ? 1 : 0);
    $('inB').textContent = 'B: ' + (inB ? 1 : 0);
    $('inA').classList.toggle('on', inA);
    $('inB').classList.toggle('on', inB);
    $('gateName').textContent = gate;
    var o = $('gateOut');
    o.textContent = out ? '1' : '0';
    o.classList.toggle('on', out);
    $('gateHint').textContent = GATES[gate].hint;
    var body = $('truthBody');
    body.innerHTML = '';
    [[false, false], [false, true], [true, false], [true, true]].forEach(function (row) {
      var tr = document.createElement('tr');
      if (row[0] === inA && row[1] === inB) tr.className = 'active';
      var ro = GATES[gate].fn(row[0], row[1]);
      [row[0] ? 1 : 0, row[1] ? 1 : 0, ro ? 1 : 0].forEach(function (v, k) {
        var td = el('td', k === 2 && ro ? 'one' : '', String(v));
        tr.appendChild(td);
      });
      body.appendChild(tr);
    });
  }
  $('inA').addEventListener('click', function () { inA = !inA; renderGate(); });
  $('inB').addEventListener('click', function () { inB = !inB; renderGate(); });
  renderGate();

  /* ---------- Chapter 4: fab stepper ---------- */
  var FAB_ART = {
    ingot: '<svg viewBox="0 0 320 150" class="art" aria-hidden="true"><ellipse cx="160" cy="120" rx="110" ry="18" fill="#dfe3e6"/><rect x="70" y="40" width="180" height="80" rx="38" fill="#cfd6da"/><ellipse cx="160" cy="40" rx="90" ry="18" fill="#e9edef"/><text x="160" y="85" text-anchor="middle" font-size="13" fill="#585254">one perfect crystal</text></svg>',
    coat: '<svg viewBox="0 0 320 150" class="art" aria-hidden="true"><rect x="40" y="80" width="240" height="26" rx="6" fill="#cfd6da"/><rect x="40" y="66" width="240" height="14" rx="6" fill="#e69138"/><text x="160" y="45" text-anchor="middle" font-size="12" fill="#585254">photoresist coat on wafer</text></svg>',
    expose: '<svg viewBox="0 0 320 150" class="art" aria-hidden="true"><rect x="60" y="30" width="200" height="14" rx="3" fill="#251f21"/><rect x="100" y="30" width="30" height="14" fill="#f4efec"/><rect x="190" y="30" width="30" height="14" fill="#f4efec"/><polygon points="100,44 130,44 150,90 80,90" fill="#ffd966" opacity="0.6"/><polygon points="190,44 220,44 240,90 160,90" fill="#ffd966" opacity="0.6"/><rect x="40" y="90" width="240" height="24" rx="6" fill="#cfd6da"/><text x="160" y="135" text-anchor="middle" font-size="12" fill="#585254">mask + light = printed pattern</text></svg>',
    etch: '<svg viewBox="0 0 320 150" class="art" aria-hidden="true"><rect x="40" y="70" width="240" height="34" rx="6" fill="#cfd6da"/><rect x="90" y="70" width="34" height="22" fill="#f4efec"/><rect x="196" y="70" width="34" height="22" fill="#f4efec"/><text x="107" y="60" text-anchor="middle" font-size="16">\u26A1</text><text x="213" y="60" text-anchor="middle" font-size="16">\u26A1</text><text x="160" y="130" text-anchor="middle" font-size="12" fill="#585254">carving canyons atoms wide</text></svg>',
    metal: '<svg viewBox="0 0 320 150" class="art" aria-hidden="true"><rect x="40" y="50" width="240" height="14" rx="4" fill="#6fa8dc"/><rect x="40" y="72" width="240" height="14" rx="4" fill="#e69138"/><rect x="40" y="94" width="240" height="14" rx="4" fill="#93c47d"/><line x1="80" y1="64" x2="80" y2="72" stroke="#585254" stroke-width="4"/><line x1="240" y1="86" x2="240" y2="94" stroke="#585254" stroke-width="4"/><text x="160" y="135" text-anchor="middle" font-size="12" fill="#585254">dozens of layers of wiring</text></svg>',
    pkg: '<svg viewBox="0 0 320 150" class="art" aria-hidden="true"><rect x="110" y="45" width="100" height="60" rx="8" fill="#251f21"/><rect x="135" y="62" width="50" height="26" rx="3" fill="#3d6e5f"/><circle cx="160" cy="75" r="6" fill="#ffd966"/><rect x="92" y="50" width="18" height="5" fill="#c0bebf"/><rect x="100" y="64" width="18" height="5" fill="#c0bebf"/><rect x="108" y="78" width="18" height="5" fill="#c0bebf"/><rect x="116" y="92" width="18" height="5" fill="#c0bebf"/><rect x="210" y="50" width="18" height="5" fill="#c0bebf"/><rect x="202" y="64" width="18" height="5" fill="#c0bebf"/><rect x="194" y="78" width="18" height="5" fill="#c0bebf"/><rect x="186" y="92" width="18" height="5" fill="#c0bebf"/><text x="160" y="135" text-anchor="middle" font-size="12" fill="#585254">one chip, sealed and ready</text></svg>'
  };
  var FAB_STEPS = [
    { t: 'Grow a perfect crystal', b: 'Ultra-pure sand is melted and spun into a single flawless crystal of silicon - an ingot taller than you, pure to 99.9999999%. It is sliced into thin discs called wafers.', art: 'ingot' },
    { t: 'Paint with light-sensitive resist', b: 'The wafer is coated with photoresist, a chemical that changes where light touches it - like photographic film, but thousands of times more precise.', art: 'coat' },
    { t: 'Print the pattern with light', b: 'Light shines through a mask - the chip\u2019s blueprint - and shrinks the pattern onto the wafer. The most advanced machines use extreme ultraviolet light with a wavelength of just 13.5 nanometres, made only by ASML in the Netherlands. One machine costs hundreds of millions of dollars.', art: 'expose' },
    { t: 'Etch and dope', b: 'Where the resist was exposed, material is etched away or atoms are fired into the silicon - doping it, like you did in Chapter 2 - to build transistors.', art: 'etch' },
    { t: 'Wire it up, layer after layer', b: 'Thin metal layers connect billions of transistors. The whole dance - coat, expose, etch, dope, deposit - repeats dozens of times over about three months, in cleanrooms far cleaner than a hospital operating theatre.', art: 'metal' },
    { t: 'Test, slice, package', b: 'Each wafer holds hundreds of chips. They are tested, the wafer is sliced into dice, and each good die is sealed in the black package with metal legs you see on circuit boards.', art: 'pkg' }
  ];
  var fabStep = 0;
  function renderFab() {
    var s = FAB_STEPS[fabStep];
    $('fabArt').innerHTML = FAB_ART[s.art];
    $('fabStepLine').textContent = 'Step ' + (fabStep + 1) + ' of ' + FAB_STEPS.length + ': ' + s.t;
    $('fabStepBody').textContent = s.b;
    $('fabBack').disabled = fabStep === 0;
    $('fabNext').disabled = fabStep === FAB_STEPS.length - 1;
    var d = $('fabDots');
    d.innerHTML = '';
    for (var i = 0; i < FAB_STEPS.length; i++) d.appendChild(el('i', i === fabStep ? 'here' : ''));
  }
  $('fabBack').addEventListener('click', function () { if (fabStep > 0) { fabStep--; renderFab(); } });
  $('fabNext').addEventListener('click', function () { if (fabStep < FAB_STEPS.length - 1) { fabStep++; renderFab(); } });
  renderFab();

  /* ---------- Chapter 4: Moore slider ---------- */
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
    $('mooreCount').textContent = m.label + ' transistors';
    $('mooreFill').style.width = Math.max(2, Math.round((Math.log10(m.count) / Math.log10(208000000000)) * 100)) + '%';
  });
  $('mooreFill').style.width = '2%';

  /* ---------- Chapter 5: CPU vs GPU race ---------- */
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
    $('raceVerdict').style.display = 'none';
    var btn = $('raceBtn');
    btn.disabled = true; btn.textContent = 'Racing...';
    raceTimer = setInterval(function () {
      cpuDone = Math.min(TOTAL, cpuDone + 2);
      gpuDone = Math.min(TOTAL, gpuDone + 32);
      paintTiles();
      if (cpuDone === TOTAL && gpuDone === TOTAL) {
        clearInterval(raceTimer); raceTimer = null;
        btn.disabled = false; btn.textContent = 'Race again';
        $('raceVerdict').style.display = '';
      }
    }, 450);
  });

  /* ---------- Chapter 6: passport ---------- */
  var PASSPORT = [
    { emoji: '\u270F\uFE0F', stage: 'Dreamed up \u00B7 United States', body: 'Companies like NVIDIA, Apple and Qualcomm design chips but own no factories - they are fabless. A modern chip design takes years and billions of dollars.' },
    { emoji: '\u{1F527}', stage: 'Tools built \u00B7 Netherlands, Japan, US', body: 'ASML in the Netherlands is the only maker of EUV lithography machines - the printers for the most advanced chips. Tokyo Electron in Japan and Applied Materials in the US build other essential tools.' },
    { emoji: '\u{1F3ED}', stage: 'Manufactured \u00B7 Taiwan, South Korea', body: 'TSMC in Taiwan made about 72% of the world\u2019s foundry chips in mid-2026 and produces nearly all of the most advanced ones. South Korea\u2019s Samsung and SK hynix lead in memory.' },
    { emoji: '\u{1F4E6}', stage: 'Assembled & tested \u00B7 Malaysia, China, Taiwan', body: 'Chips are sliced, tested and packaged - increasingly advanced packaging stacks several chips together into one powerful unit.' },
    { emoji: '\u{1F1F8}\u{1F1EC}', stage: 'Singapore\u2019s part \u00B7 Singapore', body: 'About 1 in 10 of the world\u2019s chips and 1 in 5 pieces of chip-making equipment come from Singapore. The industry contributes almost 7% of Singapore\u2019s GDP - small island, outsized role.' }
  ];
  var passStage = 0;
  var stamps = $('stamps');
  PASSPORT.forEach(function (s, i) {
    var b = el('button', 'stamp', s.emoji);
    b.type = 'button';
    b.setAttribute('aria-label', s.stage);
    b.addEventListener('click', function () { passStage = i; renderPass(); });
    stamps.appendChild(b);
  });
  function renderPass() {
    stamps.querySelectorAll('.stamp').forEach(function (b, i) {
      b.classList.toggle('here', i === passStage);
      b.setAttribute('aria-pressed', i === passStage);
    });
    $('passStage').textContent = PASSPORT[passStage].stage;
    $('passBody').textContent = PASSPORT[passStage].body;
  }
  renderPass();

  /* ---------- Quiz ---------- */
  var QUIZ = [
    { q: 'Why is silicon called a semiconductor?', options: ['It carries about half as much current as an equal copper wire', 'It conducts in one direction only, like a one-way valve', 'Its conduction sits between metal and insulator - and we can tune it'], answer: 2, why: 'Silicon conducts far better than glass but far worse than copper, and doping lets engineers tune how it behaves. One-way conduction is the diode - built from silicon, but a different idea.' },
    { q: 'You add phosphorus atoms to silicon. What do you get?', options: ['N-type silicon, whose spare electrons carry current', 'P-type silicon, whose moving holes carry current', 'A metal-like alloy that conducts in all directions'], answer: 0, why: 'Phosphorus has five outer electrons, so each atom brings one spare. Those electrons carry the current: that is N-type. Boron, with three outer electrons, makes P-type instead.' },
    { q: 'A transistor is best described as...', options: ['A one-way valve that passes current in a single direction', 'An electrically controlled switch with no moving parts', 'A tiny cell that stores charge for use later on'], answer: 1, why: 'A voltage on the gate opens or closes the current between source and drain - a switch flipped by electricity itself. The one-way valve is the diode, a different component.' },
    { q: 'Who is the only maker of EUV lithography machines?', options: ['TSMC', 'NVIDIA', 'ASML'], answer: 2, why: 'ASML, a Dutch company, is the sole supplier of the extreme ultraviolet machines that print the most advanced chips. TSMC makes chips and NVIDIA designs them - neither builds the printers.' },
    { q: 'Why do GPUs suit AI workloads?', options: ['They work on thousands of simple operations at the same time', 'They run at far higher clock speeds than any CPU', 'They draw less power than a CPU on the same calculation'], answer: 0, why: 'AI maths is the same simple operation repeated trillions of times - ideal for thousands of small cores working in parallel. Clock speed and power draw are not what decides it.' }
  ];
  var picked = new Array(QUIZ.length).fill(null);
  var quizRoot = $('quiz');
  QUIZ.forEach(function (item, qi) {
    var qd = el('div', 'q');
    qd.appendChild(el('p', 'qq', (qi + 1) + '. ' + item.q));
    var opts = el('div', 'qopts');
    item.options.forEach(function (opt, oi) {
      var b = el('button', 'qopt', opt);
      b.type = 'button';
      b.addEventListener('click', function () {
        if (picked[qi] !== null) return;
        picked[qi] = oi;
        opts.querySelectorAll('.qopt').forEach(function (x, xi) {
          x.disabled = true;
          if (xi === item.answer) x.classList.add('right');
          else if (xi === oi) x.classList.add('wrong');
          else x.classList.add('muted');
        });
        qd.appendChild(el('p', 'qwhy', item.why));
        var answered = picked.filter(function (p) { return p !== null; }).length;
        if (answered === QUIZ.length) {
          var score = picked.filter(function (p, i) { return p === QUIZ[i].answer; }).length;
          var fs = $('quizScore');
          fs.style.display = '';
          fs.textContent = 'You scored ' + score + ' of ' + QUIZ.length +
            (score === QUIZ.length ? ' - full marks, future chip architect!' : score >= 3 ? ' - solid! Revisit the chapters you missed.' : ' - worth another trip through the chapters above.');
        }
      });
      opts.appendChild(b);
    });
    qd.appendChild(opts);
    quizRoot.appendChild(qd);
  });
})();
