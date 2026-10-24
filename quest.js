/* Mira and the Great Dimming - interactions (original) */
(function () {
'use strict';
var $ = function (id) { return document.getElementById(id); };
function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }

/* ---------- Storybook character builders (original SVG) ---------- */

function miraG(x, y, sc, wave) {
    return '<g transform="translate(' + x + ',' + y + ') scale(' + sc + ')">' +
        '<path d="M-12 44 Q-13 16 -8 12 L8 12 Q13 16 12 44 Q0 47 -12 44 Z" fill="#d84f36"/>' +
        '<circle cx="-9" cy="14" r="4.6" fill="#f3e7d3"/><circle cx="9" cy="14" r="4.6" fill="#f3e7d3"/>' +
        '<path d="M-5 11 Q0 14 5 11 L5 9 Q0 12 -5 9 Z" fill="#f3e7d3"/>' +
        '<rect x="-7.5" y="44" width="5" height="9.5" rx="2.4" fill="#3a3f4a"/>' +
        '<rect x="2.5" y="44" width="5" height="9.5" rx="2.4" fill="#3a3f4a"/>' +
        '<ellipse cx="-5" cy="54.5" rx="4.8" ry="2.6" fill="#5a4632"/>' +
        '<ellipse cx="5" cy="54.5" rx="4.8" ry="2.6" fill="#5a4632"/>' +
        (wave
            ? '<path d="M10 16 Q20 8 22 -4" stroke="#f6cfae" stroke-width="4.6" stroke-linecap="round" fill="none"/>'
            : '<path d="M10 16 Q16 26 13 33" stroke="#f6cfae" stroke-width="4.6" stroke-linecap="round" fill="none"/>') +
        '<path d="M-10 16 Q-16 26 -13 33" stroke="#f6cfae" stroke-width="4.6" stroke-linecap="round" fill="none"/>' +
        '<rect x="-2.6" y="4" width="5.2" height="7" rx="2.4" fill="#f6cfae"/>' +
        '<ellipse cx="0" cy="-3" rx="10.5" ry="12" fill="#f6cfae"/>' +
        '<path d="M-10.5 -5 Q-11 -17 0 -17 Q11 -17 10.5 -5 Q9 -9 6.5 -9.5 Q8 -13 0 -13 Q-8 -13 -6.5 -9.5 Q-9 -9 -10.5 -5 Z" fill="#241d18"/>' +
        '<circle cx="-11.5" cy="-11" r="4.4" fill="#241d18"/>' +
        '<circle cx="11.5" cy="-11" r="4.4" fill="#241d18"/>' +
        '<path d="M-10.5 -4 Q-12 0 -10.5 2" stroke="#241d18" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
        '<path d="M10.5 -4 Q12 0 10.5 2" stroke="#241d18" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
        '<path d="M-7.6 -3 Q-4.8 -5.4 -2 -3 Q-4.8 -1.2 -7.6 -3 Z" fill="#251f21"/>' +
        '<path d="M2 -3 Q4.8 -5.4 7.6 -3 Q4.8 -1.2 2 -3 Z" fill="#251f21"/>' +
        '<circle cx="-4.4" cy="-3.4" r="0.7" fill="#fff"/>' +
        '<circle cx="5.2" cy="-3.4" r="0.7" fill="#fff"/>' +
        '<path d="M-7.4 -6.4 Q-4.8 -7.6 -2.2 -6.6" stroke="#3a2c22" stroke-width="1" fill="none" stroke-linecap="round"/>' +
        '<path d="M2.2 -6.6 Q4.8 -7.6 7.4 -6.4" stroke="#3a2c22" stroke-width="1" fill="none" stroke-linecap="round"/>' +
        '<path d="M0 -0.6 Q0.8 0.6 0 1.4" stroke="#dfa173" stroke-width="0.9" fill="none" stroke-linecap="round"/>' +
        '<path d="M-2.6 3 Q0 5.4 2.6 3" stroke="#b25b41" stroke-width="1.2" fill="none" stroke-linecap="round"/>' +
        '<ellipse cx="-6.8" cy="1.6" rx="2.2" ry="1.4" fill="#ef9d7c" opacity="0.6"/>' +
        '<ellipse cx="6.8" cy="1.6" rx="2.2" ry="1.4" fill="#ef9d7c" opacity="0.6"/>' +
        '</g>';
}

function siliG(x, y, sc) {
    return '<g transform="translate(' + x + ',' + y + ') scale(' + sc + ')">' +
        '<circle r="12" fill="#e8c170" opacity="0.22"/><circle r="7" fill="#e8c170" opacity="0.35"/>' +
        '<ellipse rx="5.5" ry="4.8" fill="#f7d154" class="spark"/>' +
        '<circle cx="-1.8" cy="-0.8" r="0.9" fill="#4a3a10"/><circle cx="1.8" cy="-0.8" r="0.9" fill="#4a3a10"/>' +
        '<path d="M-1.8 1.6 Q0 3.2 1.8 1.6" stroke="#4a3a10" stroke-width="0.9" fill="none" stroke-linecap="round"/>' +
        '</g>';
}

function personG(x, y, sc, o) {
    o = o || {};
    var skin = o.skin || '#f2c9a0', hair = o.hair || '#4a3a2c', cloth = o.cloth || '#6fa8dc';
    return '<g transform="translate(' + x + ',' + y + ') scale(' + sc + ')">' +
        '<path d="M-13 40 Q-15 12 0 10 Q15 12 13 40 Z" fill="' + cloth + '"/>' +
        '<rect x="-8" y="40" width="5" height="10" rx="2.5" fill="#6b5d4f"/>' +
        '<rect x="3" y="40" width="5" height="10" rx="2.5" fill="#6b5d4f"/>' +
        '<circle cx="0" cy="0" r="12.5" fill="' + skin + '"/>' +
        '<path d="' + (o.bun
            ? 'M-12 -2 Q-13 -14 0 -14 Q13 -14 12 -2 Q11 1 9 1 Q10 -6 0 -6 Q-10 -6 -9 1 Q-11 1 -12 -2 Z'
            : 'M-12 -1 Q-13 -15 0 -15 Q13 -15 12 -1 Q11 2 9 2 Q10 -7 0 -7 Q-10 -7 -9 2 Q-11 2 -12 -1 Z') + '" fill="' + hair + '"/>' +
        (o.bun ? '<circle cx="0" cy="-15" r="4" fill="' + hair + '"/>' : '') +
        '<circle cx="-4.5" cy="0.5" r="1.7" fill="#251f21"/><circle cx="4.5" cy="0.5" r="1.7" fill="#251f21"/>' +
        (o.glasses ? '<g stroke="#251f21" stroke-width="1" fill="none"><circle cx="-4.5" cy="0.5" r="3.4"/><circle cx="4.5" cy="0.5" r="3.4"/><path d="M-1.1 0.5 L1.1 0.5"/></g>' : '') +
        '<path d="M-2.5 4.5 Q0 7 2.5 4.5" stroke="#8a5a41" stroke-width="1.2" fill="none" stroke-linecap="round"/>' +
        '</g>';
}

/* ---------- Scene illustrations (original SVG) ---------- */

var SCENES = {
    hero: '<svg viewBox="0 0 380 240" role="img" aria-label="Mira, a little girl with two hair buns and a red dress, holds up Sili, a small glowing grain of sand, above a city whose lights have gone out">' +
        '<rect width="380" height="240" fill="#2b3a67"/>' +
        [[30,26,1.6],[78,14,1.2],[120,34,1.8],[170,18,1.3],[210,40,1.5],[262,20,1.7],[330,30,1.4],[352,52,1.2],[96,52,1.2],[240,58,1.1],[300,12,1.3],[54,48,1.1]].map(function (s) { return '<circle cx="' + s[0] + '" cy="' + s[1] + '" r="' + s[2] + '" fill="#fdf6e3" opacity="0.85"/>'; }).join('') +
        '<circle cx="338" cy="40" r="16" fill="#f7ecd7" opacity="0.9"/><circle cx="332" cy="36" r="14" fill="#2b3a67" opacity="0.55"/>' +
        [22, 60, 98, 250, 288, 326].map(function (bx) { return '<rect x="' + bx + '" y="146" width="28" height="54" fill="#141a2e"/>'; }).join('') +
        [22, 60, 98, 250, 288, 326].map(function (bx, bi) {
            var w = '';
            for (var r = 0; r < 3; r++) for (var c = 0; c < 2; c++) {
                var on = (bi * 7 + r * 3 + c) % 4 === 0;
                w += '<rect x="' + (bx + 6 + c * 12) + '" y="' + (158 + r * 14) + '" width="7" height="9" fill="' + (on ? '#e8c170' : '#232a45') + '" opacity="' + (on ? 0.9 : 1) + '"/>';
            }
            return w;
        }).join('') +
        '<rect x="0" y="198" width="380" height="42" fill="#10162a"/>' +
        '<circle cx="234" cy="128" r="26" fill="#e8c170" opacity="0.14"/>' +
        '<path d="M196 166 Q214 152 228 136" stroke="#e2543e" stroke-width="7" stroke-linecap="round" fill="none"/>' +
        miraG(190, 152, 1.15, false) + siliG(233, 129, 1.4) +
        '<text x="262" y="106" text-anchor="middle" font-size="11" fill="#f7ecd7">one last light</text></svg>',
    city: '<svg viewBox="0 0 380 170" role="img" aria-label="Mira and Sili walk through a city of sleeping machines">' +
        '<rect width="380" height="170" fill="#2b3a67"/>' +
        '<circle cx="40" cy="30" r="1.4" fill="#fdf6e3"/><circle cx="90" cy="18" r="1.2" fill="#fdf6e3"/><circle cx="300" cy="26" r="1.5" fill="#fdf6e3"/><circle cx="345" cy="44" r="1.2" fill="#fdf6e3"/>' +
        [30, 80, 130, 240, 290, 335].map(function (bx) { return '<rect x="' + bx + '" y="70" width="34" height="100" rx="3" fill="#1b2340"/>'; }).join('') +
        [30, 80, 130, 240, 290, 335].map(function (bx, i) {
            var w = '';
            for (var r = 0; r < 3; r++) for (var c = 0; c < 2; c++) {
                var on = (i + r + c) % 3 === 0;
                w += '<rect x="' + (bx + 6 + c * 14) + '" y="' + (80 + r * 22) + '" width="9" height="12" fill="' + (on ? '#e8c170' : '#232a45') + '" opacity="' + (on ? 0.85 : 1) + '"/>';
            }
            return w;
        }).join('') +
        '<rect x="0" y="140" width="380" height="30" fill="#141a2e"/>' +
        '<text x="188" y="132" font-size="16" fill="#8a94b8">💤 🚇 💤 🚦 💤</text>' +
        miraG(180, 96, 0.85, false) + siliG(205, 88, 0.9) + '</svg>',
    caves: '<svg viewBox="0 0 380 170" role="img" aria-label="Mira meets the crystal keeper in a cave of orange and blue crystals">' +
        '<rect width="380" height="170" fill="#241f38"/>' +
        '<polygon points="0,170 0,40 60,0 120,50 120,170" fill="#2f2a4a"/>' +
        '<polygon points="380,170 380,30 320,0 260,55 260,170" fill="#2f2a4a"/>' +
        '<polygon points="150,170 165,90 180,170" fill="#6fa8dc" opacity="0.85"/>' +
        '<polygon points="200,170 218,80 236,170" fill="#f6b26b" opacity="0.9"/>' +
        '<polygon points="255,170 268,110 282,170" fill="#6fa8dc" opacity="0.7"/>' +
        '<polygon points="105,170 118,115 132,170" fill="#f6b26b" opacity="0.7"/>' +
        '<circle cx="190" cy="60" r="26" fill="#e8c170" opacity="0.1"/>' +
        personG(95, 102, 0.8, { skin: '#e8b88a', hair: '#d8d8d8', cloth: '#7a5fa8', bun: true }) +
        '<text x="95" y="152" text-anchor="middle" font-size="10" fill="#cbb8e8">the crystal keeper</text>' +
        miraG(270, 102, 0.85, false) + siliG(295, 94, 0.9) +
        '<rect x="0" y="150" width="380" height="20" fill="#1c1830"/></svg>',
    forest: '<svg viewBox="0 0 380 170" role="img" aria-label="Mira waves in a forest of transistor trees lit by fireflies">' +
        '<rect width="380" height="170" fill="#16301f"/>' +
        '<circle cx="330" cy="30" r="14" fill="#f7ecd7" opacity="0.85"/>' +
        [[55, 55, '#1d452c'], [140, 75, '#2a5a3a'], [235, 60, '#1d452c'], [320, 70, '#2a5a3a']].map(function (t) {
            return '<rect x="' + (t[0] - 4) + '" y="' + (140 - t[1]) + '" width="8" height="' + t[1] + '" fill="#4a3a2c"/>' +
                '<circle cx="' + t[0] + '" cy="' + (128 - t[1]) + '" r="26" fill="' + t[2] + '"/>' +
                '<rect x="' + (t[0] - 10) + '" y="' + (120 - t[1]) + '" width="20" height="16" rx="3" fill="#251f21"/>' +
                '<rect x="' + (t[0] - 5) + '" y="' + (124 - t[1]) + '" width="10" height="8" rx="1.5" fill="#3d6e5f"/>';
        }).join('') +
        [[70, 70], [120, 45], [185, 60], [255, 40], [300, 65], [340, 50]].map(function (f) { return '<circle cx="' + f[0] + '" cy="' + f[1] + '" r="2.6" fill="#f7d154" class="spark"/>'; }).join('') +
        '<text x="205" y="52" font-size="13">🦋</text>' +
        '<rect x="0" y="140" width="380" height="30" fill="#10241a"/>' +
        miraG(185, 98, 0.85, true) + siliG(210, 88, 0.9) + '</svg>',
    fab: '<svg viewBox="0 0 380 170" role="img" aria-label="Mira and a cloud engineer at a factory floating in the sky">' +
        '<rect width="380" height="170" fill="#a8c8e8"/>' +
        '<ellipse cx="70" cy="45" rx="42" ry="16" fill="#fff" opacity="0.9"/>' +
        '<ellipse cx="310" cy="35" rx="48" ry="18" fill="#fff" opacity="0.85"/>' +
        '<ellipse cx="190" cy="150" rx="120" ry="26" fill="#fff" opacity="0.95"/>' +
        '<rect x="105" y="60" width="170" height="70" rx="10" fill="#f4efec"/>' +
        '<rect x="105" y="60" width="170" height="16" rx="8" fill="#7a5fa8"/>' +
        '<text x="190" y="72" text-anchor="middle" font-size="11" fill="#fff">THE SKY FAB</text>' +
        '<rect x="120" y="84" width="24" height="20" rx="3" fill="#ffd966"/>' +
        '<polygon points="122,84 142,84 138,104 126,104" fill="#fff3c4" opacity="0.7"/>' +
        '<rect x="156" y="84" width="68" height="8" rx="3" fill="#cfd6da"/>' +
        '<rect x="156" y="96" width="68" height="8" rx="3" fill="#e69138"/>' +
        '<rect x="236" y="84" width="24" height="34" rx="3" fill="#b49ddb"/>' +
        '<ellipse cx="190" cy="132" rx="105" ry="12" fill="#dfe8f2"/>' +
        personG(70, 100, 0.78, { skin: '#f2c9a0', hair: '#2c2c2c', cloth: '#ffffff' }) +
        '<rect x="63" y="86" width="14" height="10" rx="2" fill="#fff"/>' +
        '<text x="70" y="152" text-anchor="middle" font-size="10" fill="#4a5a78">cloud engineer</text>' +
        miraG(310, 100, 0.85, false) + siliG(333, 92, 0.9) + '</svg>',
    library: '<svg viewBox="0 0 380 170" role="img" aria-label="Mira with the Scholar and the choir of young readers in a great library">' +
        '<rect width="380" height="170" fill="#3d2f22"/>' +
        [0, 1, 2].map(function (i) {
            var g = '<rect x="' + (20 + i * 120) + '" y="18" width="100" height="110" rx="4" fill="#54402c"/>';
            for (var r = 0; r < 4; r++) g += '<rect x="' + (26 + i * 120) + '" y="' + (26 + r * 26) + '" width="88" height="18" rx="2" fill="' + ['#b26a2e', '#6fa8dc', '#93c47d', '#c2546a'][(i + r) % 4] + '"/>';
            return g;
        }).join('') +
        '<rect x="0" y="132" width="380" height="38" fill="#2c2117"/>' +
        personG(60, 92, 0.85, { skin: '#e8b88a', hair: '#d8d8d8', cloth: '#54402c', glasses: true }) +
        '<text x="60" y="150" text-anchor="middle" font-size="10" fill="#d8c8a8">the Scholar</text>' +
        [150, 178, 206, 234].map(function (cx, i) {
            return personG(cx, 104, 0.55, { skin: ['#ffe3c7', '#e8b88a', '#c98a5a', '#f2c9a0'][i], hair: ['#3a2c22', '#2c2c2c', '#6a4a2a', '#4a3a2c'][i], cloth: ['#6fa8dc', '#93c47d', '#e8a0bf', '#f6b26b'][i] });
        }).join('') +
        '<text x="192" y="150" text-anchor="middle" font-size="10" fill="#d8c8a8">the Choir</text>' +
        miraG(312, 96, 0.85, true) + siliG(336, 88, 0.9) + '</svg>',
    woven: '<svg viewBox="0 0 380 170" role="img" aria-label="Mira beside a glowing thread that wraps around the whole world">' +
        '<rect width="380" height="170" fill="#1b2340"/>' +
        '<circle cx="40" cy="24" r="1.4" fill="#fdf6e3"/><circle cx="120" cy="14" r="1.2" fill="#fdf6e3"/><circle cx="350" cy="30" r="1.5" fill="#fdf6e3"/>' +
        '<circle cx="230" cy="85" r="58" fill="#2a5a8a"/>' +
        '<path d="M190 60 Q210 45 235 55 Q260 50 270 75 Q275 100 255 110 Q230 125 205 115 Q185 105 188 80 Z" fill="#3d6e5f" opacity="0.9"/>' +
        '<path d="M172 85 Q120 70 80 95 Q60 108 75 120" stroke="#f7d154" stroke-width="2.5" fill="none" stroke-dasharray="6 5"/>' +
        '<path d="M172 85 Q200 40 260 35 Q310 32 330 60" stroke="#f7d154" stroke-width="2.5" fill="none" stroke-dasharray="6 5"/>' +
        [[172, 85], [120, 74], [80, 95], [260, 35], [310, 42]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="3.5" fill="#f7d154"/>'; }).join('') +
        miraG(120, 95, 0.85, false) + siliG(145, 86, 0.9) +
        '<text x="230" y="160" text-anchor="middle" font-size="10" fill="#8a94b8">one thread, seventy borders</text></svg>',
    lighthouse: '<svg viewBox="0 0 380 170" role="img" aria-label="The Keeper of the Last Lamp greets Mira at the Lighthouse">' +
        '<rect width="380" height="170" fill="#1b2340"/>' +
        '<circle cx="60" cy="26" r="1.4" fill="#fdf6e3"/><circle cx="150" cy="16" r="1.2" fill="#fdf6e3"/><circle cx="330" cy="24" r="1.5" fill="#fdf6e3"/>' +
        '<polygon points="255,10 245,60 265,60" fill="#f7d154" opacity="0.35"/>' +
        '<polygon points="245,60 235,140 275,140 265,60" fill="#f4efec"/>' +
        '<polygon points="245,60 265,60 263,80 247,80" fill="#e2543e"/>' +
        '<polygon points="242,100 268,100 266,118 244,118" fill="#e2543e"/>' +
        '<rect x="250" y="2" width="10" height="10" rx="2" fill="#ffd966" class="spark"/>' +
        '<rect x="0" y="140" width="380" height="30" fill="#141a2e"/>' +
        personG(150, 98, 0.85, { skin: '#c98a5a', hair: '#2c2c2c', cloth: '#7a5a12', bun: true }) +
        '<text x="150" y="156" text-anchor="middle" font-size="10" fill="#e8c170">the Keeper of the Last Lamp</text>' +
        miraG(205, 98, 0.85, true) + siliG(228, 88, 0.9) + '</svg>'
};
Object.keys(SCENES).forEach(function (k) {
    var id = 'scene' + k.charAt(0).toUpperCase() + k.slice(1);
    var host = $(id);
    if (host) host.innerHTML = SCENES[k];
});

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
