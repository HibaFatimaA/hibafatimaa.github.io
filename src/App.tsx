import React, { useState } from 'react';

/* ─────────────────────────────────────────────
   DATA  –  fill these in whenever you're ready
───────────────────────────────────────────── */
const LINKS = [
  { emoji: '🐙', label: 'github',    href: 'https://github.com/HibaFatimaA' },
  { emoji: '💼', label: 'linkedin',  href: 'https://www.linkedin.com/in/hiba-fatima-aab856221/' },
  { emoji: '🎵', label: 'spotify', href: 'https://open.spotify.com/user/hiba123456?si=0dc8d8bebe014d0d' },
  { emoji: '✉️', label: 'email me',  href: 'mailto:h2fatima@uwaterloo.ca' },
];

const CURRENTLY = [
  { icon: '📖', label: 'reading',      value: 'fill this in later' },
  { icon: '🎵', label: 'listening',    value: 'your playlist here' },
  { icon: '💻', label: 'building',     value: 'this site lol' },
  { icon: '☕', label: 'obsessed with', value: 'matcha everything' },
];

const EXPERIENCE = [
  { icon: '💡', role: 'Solutions Eng. Intern', company: 'Cloudstarter · Summer 2024' },
  { icon: '🛠️', role: 'Freelance Dev',          company: 'Various clients · 2023–present' },
];

const PROJECTS = [
  { icon: '🛒', title: 'e-commerce platform',   tech: 'react · node · postgres' },
  { icon: '📊', title: 'data viz dashboard',    tech: 'react · d3 · python' },
  { icon: '📱', title: 'task manager app',       tech: 'react native · firebase' },
];

const INTERESTS = [
  { label: '🌿 plants',       color: '#2d5a1e' },
  { label: 'ai/ml',           color: '#5a2d6e' },
  { label: '☕ matcha',        color: '#6b4020' },
  { label: 'cloud computing', color: '#1a4a70' },
  { label: '📷 photography',  color: '#5a2020' },
  { label: 'open source',     color: '#1e5038' },
  { label: '🎵 music',        color: '#5a5010' },
  { label: 'hiking 🏔️',       color: '#3a2060' },
  { label: 'problem solving', color: '#4a3a10' },
];

const MARQUEE_TEXT =
  '✦ welcome to my site ✦ 🌿 currently: existing ✦ eating new foods ✦ math brain ✦ building things ✦ she/her ✦ waterloo + laurier ✦ 🐸 hi ✦          ';

/* ─────────────────────────────────────────────
   STYLE TOKENS  (darker greens throughout)
───────────────────────────────────────────── */
const C = {
  // panels
  panelBg:       '#f5f2e8',
  panelBorder:   '#4a6e2e',
  panelShadow:   '#3a5e1e',
  creamBg:       '#faf7ee',
  creamBorder:   '#b8a070',
  creamShadow:   '#a09060',
  sageBg:        '#c8d8a8',
  sageBorder:    '#3a5e1e',
  sageShadow:    '#2a4e0e',
  // browser
  browserBg:     '#b4c894',
  browserBorder: '#3a5e1e',
  barFrom:       '#4a6e2e',
  barTo:         '#3a5e1e',
  barBorder:     '#2a4e0e',
  // text
  dark:          '#1a2e08',
  mid:           '#3a5028',
  light:         '#5a7040',
  muted:         '#7a8a60',
  // link btn
  linkBtnBg:     '#f5f2e8',
  linkBtnHover:  '#c8d8a8',
  // action btn
  actionBg:      '#3a5e1e',
  actionBorder:  '#2a4e0e',
  actionShadow:  '#1a3e0e',
  // status
  statusDot:     '#50a050',
};

/* ─────────────────────────────────────────────
   SMALL REUSABLE COMPONENTS
───────────────────────────────────────────── */
const panel = (extra = ''): React.CSSProperties => ({
  background: C.panelBg,
  border: `2.5px solid ${C.panelBorder}`,
  borderRadius: 8,
  padding: 12,
  boxShadow: `3px 3px 0 ${C.panelShadow}`,
});

const creamPanel = (): React.CSSProperties => ({
  background: C.creamBg,
  border: `2.5px solid ${C.creamBorder}`,
  borderRadius: 8,
  padding: 12,
  boxShadow: `3px 3px 0 ${C.creamShadow}`,
});

const sagePanel = (): React.CSSProperties => ({
  background: C.sageBg,
  border: `2.5px solid ${C.sageBorder}`,
  borderRadius: 8,
  padding: 12,
  boxShadow: `3px 3px 0 ${C.sageShadow}`,
});

/* ─────────────────────────────────────────────
   FLOATING STICKER
───────────────────────────────────────────── */
interface StickerProps {
  emoji: string;
  style?: React.CSSProperties;
  delay?: number;
}
function Sticker({ emoji, style, delay = 0 }: StickerProps) {
  return (
    <span
      style={{
        position: 'fixed',
        fontSize: 26,
        pointerEvents: 'none',
        zIndex: 0,
        animation: `wobble 4s ease-in-out ${delay}s infinite alternate`,
        ...style,
      }}
    >
      {emoji}
    </span>
  );
}

/* ─────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────── */
export default function App() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [hoveredProj, setHoveredProj] = useState<number | null>(null);

  return (
    <>
      {/* Global keyframes injected once */}
      <style>{`
        @keyframes wobble {
          from { transform: rotate(-6deg) scale(1);   }
          to   { transform: rotate( 6deg) scale(1.08); }
        }
        @keyframes blink {
          0%,100% { opacity: 1;   }
          50%      { opacity: 0.3; }
        }
        @keyframes marquee {
          from { transform: translateX(100vw);  }
          to   { transform: translateX(-100%);  }
        }
        @keyframes glow {
          0%,100% { opacity:1; filter: drop-shadow(0 0 4px #ffe066); }
          50%      { opacity:0.5; filter: drop-shadow(0 0 1px #ffe066); }
        }
        .link-btn:hover {
          background: ${C.linkBtnHover} !important;
          transform: translate(-1px,-1px);
          box-shadow: 3px 3px 0 ${C.panelShadow} !important;
        }
      `}</style>

      {/* Floating page stickers */}
      <Sticker emoji="🍄" style={{ top: 30,  left:  40 }} delay={0}   />
      <Sticker emoji="⭐" style={{ top: 60,  right: 50 }} delay={1}   />
      <Sticker emoji="🌿" style={{ top: 140, left:  20 }} delay={0.5} />
      <Sticker emoji="🍀" style={{ bottom: 80, left: 30 }} delay={1.5} />
      <Sticker emoji="✨" style={{ bottom: 60, right: 40 }} delay={0.8} />

      {/* ══ BROWSER WINDOW ══ */}
      <div style={{
        width: '100%',
        maxWidth: 860,
        background: C.browserBg,
        border: `2.5px solid ${C.browserBorder}`,
        borderRadius: '10px 10px 8px 8px',
        boxShadow: '0 8px 32px rgba(30,60,10,0.3), 0 2px 8px rgba(0,0,0,0.12)',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10,
      }}>

        {/* Browser bar */}
        <div style={{
          background: `linear-gradient(180deg, ${C.barFrom} 0%, ${C.barTo} 100%)`,
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          borderBottom: `2px solid ${C.barBorder}`,
        }}>
          {/* dots */}
          <div style={{ display: 'flex', gap: 6 }}>
            {(['#d05050','#c8a030','#50a050'] as const).map((bg, i) => (
              <div key={i} style={{
                width: 12, height: 12, borderRadius: '50%',
                background: bg, border: '1.5px solid rgba(0,0,0,0.2)',
              }} />
            ))}
          </div>
          {/* nav */}
          <div style={{ display: 'flex', gap: 4 }}>
            {['◀','▶'].map(ch => (
              <div key={ch} style={{
                background: 'rgba(255,255,255,0.22)',
                border: '1.5px solid rgba(255,255,255,0.38)',
                borderRadius: 4,
                color: '#fff',
                fontFamily: "'VT323', monospace",
                fontSize: 14,
                padding: '1px 8px',
                cursor: 'default',
              }}>{ch}</div>
            ))}
          </div>
          {/* address */}
          <div style={{
            flex: 1,
            background: 'rgba(255,255,255,0.88)',
            border: '1.5px solid rgba(255,255,255,0.6)',
            borderRadius: 4,
            fontFamily: "'VT323', monospace",
            fontSize: 14,
            color: C.mid,
            padding: '2px 10px',
            letterSpacing: 0.5,
          }}>
            🌿 hibafatima.garden/home
          </div>
        </div>

        {/* ── PAGE BODY ── */}
        <div style={{
          background: '#eeeae0',
          padding: 18,
          position: 'relative',
          minHeight: 600,
        }}>

          {/* inner stickers */}
          <span style={{ position:'absolute', top:10, right:18, fontSize:22,
            animation:'wobble 4s ease-in-out 0.3s infinite alternate',
            pointerEvents:'none', zIndex:2 }}>🐸</span>
          <span style={{ position:'absolute', bottom:20, right:10, fontSize:18,
            animation:'wobble 4s ease-in-out 1.2s infinite alternate',
            pointerEvents:'none', zIndex:2 }}>🌸</span>

          {/* Two-column grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '210px 1fr',
            gap: 14,
            position: 'relative',
            zIndex: 5,
          }}>

            {/* ══ LEFT COLUMN ══ */}
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>

              {/* Photo */}
              <div style={{
                aspectRatio: '1',
                border: `2.5px solid ${C.panelBorder}`,
                borderRadius: 8,
                boxShadow: `3px 3px 0 ${C.panelShadow}`,
                overflow: 'hidden',
              }}>
                <img
                  src="/hiba_indexpfp.JPG"
                  alt="hiba's profile picture"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>

              {/* Links + info */}
              <div style={sagePanel()}>
                {/* title */}
                <div style={{
                  fontFamily:"'VT323', monospace",
                  fontSize:22, color: C.dark,
                  textAlign:'center', letterSpacing:1,
                  marginBottom:8,
                  borderBottom:`1.5px dashed ${C.sageBorder}`,
                  paddingBottom:6,
                }}>✦ links ✦</div>

                {LINKS.map(l => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="link-btn"
                    onMouseEnter={() => setHoveredLink(l.label)}
                    onMouseLeave={() => setHoveredLink(null)}
                    style={{
                      display: 'block',
                      width: '100%',
                      background: C.linkBtnBg,
                      border: `2px solid ${C.panelBorder}`,
                      borderRadius: 5,
                      padding: '6px 10px',
                      textAlign: 'center',
                      fontFamily: "'VT323', monospace",
                      fontSize: 18,
                      color: C.mid,
                      textDecoration: 'underline',
                      marginBottom: 7,
                      cursor: 'pointer',
                      boxShadow: `2px 2px 0 ${C.panelShadow}`,
                      transition: 'all 0.1s',
                    }}
                  >
                    {l.emoji} {l.label}
                  </a>
                ))}

                <hr style={{ border:'none', borderTop:`1.5px dashed ${C.sageBorder}`, margin:'10px 0' }} />

                {/* mini info */}
                <div style={{
                  fontFamily:"'VT323', monospace",
                  fontSize:15, color: C.mid,
                  textAlign:'center', lineHeight:1.7,
                }}>
                  math + bba 🎓<br/>
                  waterloo · laurier<br/>
                  2021 – 2026<br/>
                  <br/>
                  📍 waterloo, ON
                </div>

                {/* pixel frog */}
                <div style={{ textAlign:'center', fontSize:38, marginTop:4,
                  filter:'drop-shadow(1px 1px 0 #2a4e0e)' }}>🐸</div>
              </div>
            </div>

            {/* ══ RIGHT COLUMN ══ */}
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>

              {/* Header */}
              <div style={panel()}>
                {/* username row */}
                <div style={{ display:'flex', alignItems:'baseline', gap:12, flexWrap:'wrap', marginBottom:4 }}>
                  <span style={{
                    fontFamily:"'VT323', monospace",
                    fontSize:34, color: C.dark, letterSpacing:1,
                  }}>@hibafatima</span>
                  <span style={{
                    fontFamily:"'VT323', monospace",
                    fontSize:16, color: C.light,
                    background: C.sageBg,
                    border: `1.5px solid ${C.panelBorder}`,
                    borderRadius:4, padding:'1px 8px',
                  }}>she/her</span>
                </div>

                {/* action buttons */}
                <div style={{ display:'flex', gap:7, flexWrap:'wrap', marginBottom:4 }}>
                  {[
                    { label:'+ follow',  outline:false },
                    { label:'message',   outline:true  },
                    { label:'🌿',        outline:true  },
                    { label:'· · ·',     outline:true  },
                  ].map(b => (
                    <div key={b.label} style={{
                      background: b.outline ? C.panelBg : C.actionBg,
                      color: b.outline ? C.mid : '#fff',
                      border: `2px solid ${C.actionBorder}`,
                      borderRadius:5,
                      padding:'4px 14px',
                      fontFamily:"'VT323', monospace",
                      fontSize:17,
                      cursor:'pointer',
                      boxShadow:`2px 2px 0 ${C.actionShadow}`,
                      letterSpacing:0.5,
                    }}>{b.label}</div>
                  ))}
                </div>

                <hr style={{ border:'none', borderTop:`1.5px dashed ${C.panelBorder}`, margin:'8px 0' }} />

                <p style={{
                  fontFamily:"'Lora', serif",
                  fontSize:12.5, color:'#4a4030',
                  lineHeight:1.7, fontStyle:'italic',
                  textAlign:'center',
                }}>
                  hi! i'm hiba — a math & business student who thinks too much,
                  collects too many plants, and builds random things on the internet.
                  welcome to my little corner 🌿
                </p>
              </div>

              {/* Status */}
              <div style={{
                background: C.creamBg,
                border: `2px solid ${C.creamBorder}`,
                borderRadius:6,
                padding:'8px 12px',
                fontFamily:"'VT323', monospace",
                fontSize:17, color:'#5a4a28',
                display:'flex', alignItems:'center', gap:8,
                boxShadow:`2px 2px 0 ${C.creamShadow}`,
              }}>
                <div style={{
                  width:8, height:8, borderRadius:'50%',
                  background: C.statusDot,
                  boxShadow:`0 0 5px ${C.statusDot}`,
                  animation:'blink 2s ease-in-out infinite',
                  flexShrink:0,
                }} />
                user status: probably overwatering my plants again 🪴
              </div>

              {/* Currently */}
              <div style={creamPanel()}>
                <div style={{
                  fontFamily:"'VT323', monospace",
                  fontSize:20, color: C.mid,
                  letterSpacing:2, textTransform:'uppercase',
                  borderBottom:`2px dashed ${C.creamBorder}`,
                  paddingBottom:5, marginBottom:8,
                }}>🌱 currently...</div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:7 }}>
                  {CURRENTLY.map(c => (
                    <div key={c.label} style={{
                      background:'#eef5de',
                      border:`1.5px solid ${C.panelBorder}`,
                      borderRadius:5,
                      padding:'6px 8px',
                      fontFamily:"'VT323', monospace",
                      fontSize:15, color: C.mid,
                      lineHeight:1.4,
                    }}>
                      <span style={{ fontSize:11, color:'#5a8030', letterSpacing:1,
                        textTransform:'uppercase', display:'block', marginBottom:2 }}>
                        {c.icon} {c.label}
                      </span>
                      {c.value}
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div style={panel()}>
                <div style={{
                  fontFamily:"'VT323', monospace",
                  fontSize:20, color: C.mid,
                  letterSpacing:2, textTransform:'uppercase',
                  borderBottom:`2px dashed ${C.panelBorder}`,
                  paddingBottom:5, marginBottom:8,
                }}>📌 things i've been up to</div>
                {EXPERIENCE.map((e, i) => (
                  <div key={i} style={{
                    display:'flex', alignItems:'flex-start', gap:8,
                    marginBottom: i < EXPERIENCE.length - 1 ? 8 : 0,
                    paddingBottom: i < EXPERIENCE.length - 1 ? 8 : 0,
                    borderBottom: i < EXPERIENCE.length - 1 ? `1px dashed #d4cc98` : 'none',
                  }}>
                    <span style={{ fontSize:18, flexShrink:0, marginTop:1 }}>{e.icon}</span>
                    <div>
                      <div style={{ fontFamily:"'Caveat', cursive", fontSize:15,
                        fontWeight:700, color: C.dark }}>{e.role}</div>
                      <div style={{ fontFamily:"'VT323', monospace",
                        fontSize:14, color: C.light }}>{e.company}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Projects */}
              <div style={creamPanel()}>
                <div style={{
                  fontFamily:"'VT323', monospace",
                  fontSize:20, color: C.mid,
                  letterSpacing:2, textTransform:'uppercase',
                  borderBottom:`2px dashed ${C.creamBorder}`,
                  paddingBottom:5, marginBottom:8,
                }}>🔧 things i made</div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
                  {PROJECTS.map((p, i) => (
                    <div
                      key={i}
                      onMouseEnter={() => setHoveredProj(i)}
                      onMouseLeave={() => setHoveredProj(null)}
                      style={{
                        background: C.creamBg,
                        border: `2px solid ${C.creamBorder}`,
                        borderRadius:6,
                        padding:8,
                        boxShadow: hoveredProj === i
                          ? `4px 4px 0 ${C.creamShadow}`
                          : `2px 2px 0 ${C.creamShadow}`,
                        transform: hoveredProj === i ? 'translate(-2px,-2px)' : 'none',
                        transition:'all 0.15s',
                        cursor:'default',
                      }}
                    >
                      <div style={{ fontSize:22, marginBottom:4 }}>{p.icon}</div>
                      <div style={{ fontFamily:"'Caveat', cursive",
                        fontSize:14, fontWeight:700, color: C.dark, marginBottom:3 }}>{p.title}</div>
                      <div style={{ fontFamily:"'VT323', monospace",
                        fontSize:13, color:'#6a5a40', lineHeight:1.4 }}>{p.tech}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Favourite photo placeholder */}
              <div style={{
                background: 'linear-gradient(135deg, #90b870, #6a9850)',
                border: `2px solid ${C.panelBorder}`,
                borderRadius:6,
                height:100,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:32,
                boxShadow:`2px 2px 0 ${C.panelShadow}`,
                position:'relative', overflow:'hidden',
              }}>
                <span>🌧️🪴</span>
                <span style={{
                  position:'absolute', bottom:6, left:0, right:0,
                  textAlign:'center',
                  fontFamily:"'VT323', monospace",
                  fontSize:13, color:'rgba(255,255,255,0.75)',
                }}>favourite photo</span>
              </div>

              {/* Interests */}
              <div style={sagePanel()}>
                <div style={{
                  fontFamily:"'VT323', monospace",
                  fontSize:20, color: C.dark,
                  letterSpacing:2, textTransform:'uppercase',
                  borderBottom:`2px dashed ${C.sageBorder}`,
                  paddingBottom:5, marginBottom:8,
                }}>💚 things i love</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                  {INTERESTS.map((it, i) => (
                    <div key={i} style={{
                      background: C.panelBg,
                      border: `2px solid ${it.color}`,
                      borderRadius:3,
                      padding:'3px 10px',
                      fontFamily:"'VT323', monospace",
                      fontSize:16,
                      color: it.color,
                      transform: `rotate(${[-2,2,-3,1,-1,3,-2,2,-1][i % 9]}deg)`,
                      boxShadow:`1px 1px 0 ${it.color}`,
                      transition:'transform 0.2s',
                      cursor:'default',
                    }}>{it.label}</div>
                  ))}
                </div>
              </div>

            </div>{/* end right col */}
          </div>{/* end grid */}

          {/* footer */}
          <div style={{ textAlign:'center', marginTop:16 }}>
            <span style={{
              fontFamily:"'VT323', monospace",
              fontSize:14, color: C.muted, letterSpacing:2,
            }}>
              made with 🌿 by hiba · 2025 · best viewed with a cup of matcha
            </span>
          </div>

        </div>{/* end page-body */}

        {/* Marquee bar */}
        <div style={{
          background: `linear-gradient(180deg, ${C.barFrom} 0%, ${C.barTo} 100%)`,
          borderTop: `2px solid ${C.barBorder}`,
          padding:'5px 0',
          overflow:'hidden',
          whiteSpace:'nowrap',
        }}>
          <span style={{
            display:'inline-block',
            fontFamily:"'VT323', monospace",
            fontSize:15, color:'#c8e8a0',
            letterSpacing:2,
            animation:'marquee 18s linear infinite',
          }}>
            {MARQUEE_TEXT}
          </span>
        </div>

      </div>{/* end browser window */}
    </>
  );
}
