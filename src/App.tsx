import React, { useState, useEffect } from 'react';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const LINKS = [
  { emoji: '🐙', label: 'github',    href: 'https://github.com/HibaFatimaA' },
  { emoji: '💼', label: 'linkedin',  href: 'https://linkedin.com/in/hibafatimaa' },
  { emoji: '📸', label: 'instagram', href: 'https://instagram.com/' },
  { emoji: '✉️', label: 'email me',  href: 'mailto:you@example.com' },
];

const EXPERIENCE = [
  {
    logo: '/medmelogo.png',
    role: 'Solutions Engineer Intern',
    company: 'MedMe Health',
    period: 'Fall 2025',
  },
  {
    logo: '/csllogo.png',
    role: 'Solutions Engineer Intern',
    company: 'Cloudstarter Labs',
    period: 'Winter 2025',
  }
];

const TRAVEL_PHOTOS = [
  { src: '/asia1.JPG',  caption: 'asia, sept 2026'      },
  { src: '/ams_1.JPG',  caption: 'amsterdam, may 2026'  },
  { src: '/sf1.JPG',    caption: 'sf, oct 2025'         },
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

const MARQUEE =
  '✦ welcome to my little corner of the internet ✦ 🌿 currently: existing ✦ plant mom ✦ math brain ✦ she/her ✦ waterloo + laurier ✦ 🐸 hi ✦          ';

/* ─────────────────────────────────────────────
   COLOUR TOKENS  (darker greens)
───────────────────────────────────────────── */
const C = {
  panelBg:     '#f5f2e8',
  panelBorder: '#3a5e1e',
  panelShadow: '#2a4e0e',
  creamBg:     '#faf7ee',
  creamBorder: '#b8a070',
  creamShadow: '#a09060',
  sageBg:      '#c0d09a',
  sageBorder:  '#3a5e1e',
  sageShadow:  '#2a4e0e',
  barFrom:     '#4a6e2e',
  barTo:       '#3a5e1e',
  barBorder:   '#2a4e0e',
  dark:        '#1a2e08',
  mid:         '#3a5028',
  light:       '#5a7040',
  muted:       '#7a8a60',
  actionBg:    '#3a5e1e',
  actionBorder:'#2a4e0e',
  actionShadow:'#1a3e0e',
  statusDot:   '#50a050',
};

/* ─────────────────────────────────────────────
   PANEL STYLES
───────────────────────────────────────────── */
const panelStyle = (): React.CSSProperties => ({
  background: C.panelBg,
  border: `2.5px solid ${C.panelBorder}`,
  borderRadius: 8,
  padding: 12,
  boxShadow: `3px 3px 0 ${C.panelShadow}`,
});

const creamStyle = (): React.CSSProperties => ({
  background: C.creamBg,
  border: `2.5px solid ${C.creamBorder}`,
  borderRadius: 8,
  padding: 12,
  boxShadow: `3px 3px 0 ${C.creamShadow}`,
});

const sageStyle = (): React.CSSProperties => ({
  background: C.sageBg,
  border: `2.5px solid ${C.sageBorder}`,
  borderRadius: 8,
  padding: 12,
  boxShadow: `3px 3px 0 ${C.sageShadow}`,
});

/* ─────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────── */
function SectionHeader({ children, borderColor }: { children: React.ReactNode; borderColor: string }) {
  return (
    <div style={{
      fontFamily: "'Space Mono', monospace",
      fontSize: 11,
      color: C.mid,
      letterSpacing: 3,
      textTransform: 'uppercase',
      borderBottom: `2px dashed ${borderColor}`,
      paddingBottom: 5,
      marginBottom: 8,
      fontWeight: 700,
    }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SPOTIFY WIDGET
───────────────────────────────────────────── */
interface SpotifyTrack {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumArt?: string;
  songUrl?: string;
}

function SpotifyWidget() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);

  useEffect(() => {
    // Fetch from our Vercel serverless function
    fetch('https://hibafatimaa-github-mq8vsagro-hiba-5d4b.vercel.app/api/spotify')
      .then(r => r.json())
      .then(data => setTrack(data))
      .catch(() => setTrack({ isPlaying: false }));
  }, []);

  return (
    <div style={{
      background: '#0f1a0a',
      border: `2px solid ${C.panelBorder}`,
      borderRadius: 8,
      padding: '10px 12px',
      boxShadow: `3px 3px 0 ${C.panelShadow}`,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    }}>
      {/* Spotify icon */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#1DB954" style={{ flexShrink: 0 }}>
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>

      <div style={{ flex: 1, minWidth: 0 }}>
        {!track ? (
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#4a6a3a' }}>
            loading...
          </span>
        ) : track.isPlaying && track.title ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9,
                color: '#1DB954', letterSpacing: 2, textTransform: 'uppercase' }}>
                now playing
              </span>
              {/* animated bars */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 10 }}>
                {[1,2,3].map(i => (
                  <div key={i} style={{
                    width: 3,
                    background: '#1DB954',
                    borderRadius: 1,
                    animation: `bar${i} 0.8s ease-in-out ${i * 0.15}s infinite alternate`,
                  }} />
                ))}
              </div>
            </div>
            <a href={track.songUrl} target="_blank" rel="noreferrer"
              style={{ textDecoration: 'none' }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12,
                color: '#e8f0d8', fontWeight: 700,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {track.title}
              </div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10,
                color: '#7a9a6a' }}>
                {track.artist}
              </div>
            </a>
          </>
        ) : (
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9,
              color: '#4a6a3a', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 2 }}>
              not playing
            </div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#6a8a5a' }}>
              hiba is offline 🌿
            </div>
          </div>
        )}
      </div>

      {track?.albumArt && (
        <img src={track.albumArt} alt="album art"
          style={{ width: 36, height: 36, borderRadius: 4, flexShrink: 0 }} />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   VISITOR COUNTER
───────────────────────────────────────────── */
function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://api.countapi.xyz/hit/hibafatimaa.github.io/visits')
      .then(r => r.json())
      .then(data => setCount(data.value))
      .catch(() => setCount(null));
  }, []);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: '#0f1a0a',
      border: `2px solid ${C.panelBorder}`,
      borderRadius: 6,
      padding: '6px 12px',
      boxShadow: `2px 2px 0 ${C.panelShadow}`,
    }}>
      <span style={{ fontSize: 14 }}>👁</span>
      <span style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 12,
        color: '#a8c88a',
        letterSpacing: 1,
      }}>
        {count !== null ? `${count.toLocaleString()} visitors` : 'counting...'}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   POLAROID
───────────────────────────────────────────── */
function Polaroid({ src, caption, rotation }: { src: string; caption: string; rotation: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fffef9',
        padding: '7px 7px 26px',
        boxShadow: hovered
          ? '5px 8px 20px rgba(0,0,0,0.28)'
          : '3px 4px 12px rgba(0,0,0,0.18)',
        transform: hovered ? `rotate(0deg) scale(1.05)` : `rotate(${rotation}deg)`,
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        flex: '1 1 0',
        minWidth: 0,
      }}
    >
      <div style={{
        width: '100%',
        paddingTop: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: '#c8d8a8',
      }}>
        <img
          src={src}
          alt={caption}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      <div style={{
        fontFamily: "'Caveat', cursive",
        fontSize: 13,
        color: '#5a4a34',
        textAlign: 'center',
        marginTop: 5,
        letterSpacing: 0.5,
      }}>
        {caption}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────── */
export default function App() {
  const [hoveredProj, setHoveredProj] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Caveat:wght@400;600;700&family=VT323&display=swap');

        @keyframes wobble {
          from { transform: rotate(var(--r-from, -6deg)) scale(1); }
          to   { transform: rotate(var(--r-to, 6deg)) scale(1.08); }
        }
        @keyframes blink {
          0%,100% { opacity:1; } 50% { opacity:0.3; }
        }
        @keyframes marquee {
          from { transform: translateX(100vw); }
          to   { transform: translateX(-100%); }
        }
        @keyframes bar1 { from{height:4px} to{height:10px} }
        @keyframes bar2 { from{height:8px} to{height:4px}  }
        @keyframes bar3 { from{height:5px} to{height:9px}  }

        .link-btn:hover {
          background: ${C.sageBg} !important;
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 ${C.panelShadow} !important;
        }
        .stamp:hover {
          transform: rotate(0deg) scale(1.1) !important;
        }
      `}</style>

      {/* ── BACKGROUND STICKER IMAGES (outside browser window, on grid paper) ── */}
      {([
        { src:'/star4.png',      top:10,   right:10, width:60,  delay:0.8, r:'5deg',   rTo:'-5deg' },
        { src:'/feltstar2.png',  top:120,  left:5,   width:55,  delay:0.4, r:'-5deg',  rTo:'7deg'  },
        { src:'/smiskiboard.png',bottom:60,left:8,   width:90,  delay:1.2, r:'-3deg',  rTo:'5deg'  },
        { src:'/heart1.png',     bottom:20,left:100, width:50,  delay:0.6, r:'6deg',   rTo:'-4deg' },
        { src:'/post1.png',      top:200,  right:5,  width:70,  delay:1.0, r:'-6deg',  rTo:'4deg'  },
        { src:'/fabric1.png',    bottom:100,right:8, width:75,  delay:0.3, r:'4deg',   rTo:'-6deg' },
        { src:'/swirl2.png',     bottom:200,left:15, width:45,  delay:1.4, r:'-4deg',  rTo:'6deg'  },
        { src:'/star1.png',      top:350,  left:20,  width:40,  delay:0.7, r:'3deg',   rTo:'-7deg' },
      ] as { src:string; top?:number; bottom?:number; left?:number; right?:number; width:number; delay:number; r:string; rTo:string }[]).map((s, i) => (
        <img key={i} src={s.src} alt="" style={{
          position:'fixed',
          top: s.top, bottom: s.bottom,
          left: s.left, right: s.right,
          width: s.width,
          pointerEvents:'none', zIndex:0,
          opacity: 0.88,
          animation:`wobble ${3.5 + i * 0.3}s ease-in-out ${s.delay}s infinite alternate`,
          ['--r-from' as any]: s.r,
          ['--r-to' as any]: s.rTo,
        }} />
      ))}

      {/* ══ BROWSER WINDOW ══ */}
      <div style={{
        width:'100%', maxWidth:880,
        background:'#b4c894',
        border:`2.5px solid ${C.panelBorder}`,
        borderRadius:'10px 10px 8px 8px',
        boxShadow:'0 8px 32px rgba(30,60,10,0.3)',
        overflow:'hidden',
        position:'relative', zIndex:10,
      }}>

        {/* Browser bar */}
        <div style={{
          background:`linear-gradient(180deg, ${C.barFrom} 0%, ${C.barTo} 100%)`,
          padding:'8px 12px',
          display:'flex', alignItems:'center', gap:10,
          borderBottom:`2px solid ${C.barBorder}`,
        }}>
          <div style={{ display:'flex', gap:6 }}>
            {['#d05050','#c8a030','#50a050'].map((bg,i) => (
              <div key={i} style={{ width:12, height:12, borderRadius:'50%',
                background:bg, border:'1.5px solid rgba(0,0,0,0.2)' }} />
            ))}
          </div>
          <div style={{ display:'flex', gap:4 }}>
            {['◀','▶'].map(ch => (
              <div key={ch} style={{
                background:'rgba(255,255,255,0.22)',
                border:'1.5px solid rgba(255,255,255,0.38)',
                borderRadius:4, color:'#fff',
                fontFamily:"'Space Mono', monospace",
                fontSize:12, padding:'1px 8px', cursor:'default',
              }}>{ch}</div>
            ))}
          </div>
          <div style={{
            flex:1, background:'rgba(255,255,255,0.88)',
            border:'1.5px solid rgba(255,255,255,0.6)',
            borderRadius:4,
            fontFamily:"'Space Mono', monospace",
            fontSize:11, color:C.mid, padding:'2px 10px', letterSpacing:0.5,
          }}>
            🌿 hibafatimaa.github.io
          </div>
        </div>

        {/* ── PAGE BODY ── */}
        <div style={{
          background:'#eeeae0',
          padding:18,
          position:'relative',
        }}>

        {/* ── WASHI TAPE on seam between browser bar and page body ── */}
        <div style={{
          position:'absolute', top:-6, left:0, right:0,
          height:14, zIndex:30, pointerEvents:'none',
          backgroundImage:`url('/washi.png')`,
          backgroundRepeat:'repeat-x',
          backgroundSize:'auto 100%',
          opacity:0.85,
        }} />

          {/* Two-col grid */}
          <div style={{
            display:'grid',
            gridTemplateColumns:'210px 1fr',
            gap:14,
            position:'relative', zIndex:5,
          }}>

            {/* ══ LEFT COLUMN ══ */}
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>

              {/* Photo */}
              <div style={{
                aspectRatio:'1',
                border:`2.5px solid ${C.panelBorder}`,
                borderRadius:8,
                boxShadow:`3px 3px 0 ${C.panelShadow}`,
                overflow:'hidden',
              }}>
                <img src="/hiba_indexpfp.JPG" alt="hiba"
                  style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
              </div>

              {/* Links */}
              <div style={sageStyle()}>
                <div style={{
                  fontFamily:"'Space Mono', monospace",
                  fontSize:11, color:C.dark, textAlign:'center',
                  letterSpacing:2, marginBottom:8, fontWeight:700,
                  borderBottom:`1.5px dashed ${C.sageBorder}`, paddingBottom:6,
                }}>✦ LINKS ✦</div>

                {LINKS.map(l => (
                  <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                    className="link-btn"
                    style={{
                      display:'block', width:'100%',
                      background:C.panelBg,
                      border:`2px solid ${C.panelBorder}`,
                      borderRadius:5, padding:'6px 10px',
                      textAlign:'center',
                      fontFamily:"'Space Mono', monospace",
                      fontSize:12, color:C.mid,
                      textDecoration:'none',
                      marginBottom:7, cursor:'pointer',
                      boxShadow:`2px 2px 0 ${C.panelShadow}`,
                      transition:'all 0.1s',
                    }}>
                    {l.emoji} {l.label}
                  </a>
                ))}

                <hr style={{ border:'none', borderTop:`1.5px dashed ${C.sageBorder}`, margin:'10px 0' }} />

                <div style={{ fontFamily:"'Space Mono', monospace", fontSize:11,
                  color:C.mid, textAlign:'center', lineHeight:1.9 }}>
                  math + bba 🎓<br/>
                  waterloo · laurier<br/>
                  2021 – 2026<br/><br/>
                  📍 somewhere in canada
                </div>

                <div style={{ textAlign:'center', marginTop:8, display:'flex', justifyContent:'center' }}>
                  <img src="/cat1.png" alt="" style={{ width:65, opacity:0.92 }} />
                </div>
              </div>

              {/* Visitor counter */}
              <VisitorCounter />

            </div>{/* end left col */}

            {/* ══ RIGHT COLUMN ══ */}
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>

              {/* Header */}
              <div style={panelStyle()}>
                <div style={{ display:'flex', alignItems:'baseline', gap:12,
                  flexWrap:'wrap', marginBottom:6 }}>
                  <span style={{ fontFamily:"'Space Mono', monospace",
                    fontSize:28, color:C.dark, fontWeight:700 }}>@hibafatima</span>
                  <span style={{ fontFamily:"'Space Mono', monospace", fontSize:11,
                    color:C.light, background:C.sageBg,
                    border:`1.5px solid ${C.panelBorder}`,
                    borderRadius:4, padding:'2px 8px' }}>she/her</span>
                </div>

                <div style={{ display:'flex', gap:7, flexWrap:'wrap', marginBottom:8 }}>
                  {[{label:'+ follow',outline:false},{label:'message',outline:true},
                    {label:'🌿',outline:true},{label:'· · ·',outline:true}].map(b => (
                    <div key={b.label} style={{
                      background: b.outline ? C.panelBg : C.actionBg,
                      color: b.outline ? C.mid : '#fff',
                      border:`2px solid ${C.actionBorder}`,
                      borderRadius:5, padding:'4px 14px',
                      fontFamily:"'Space Mono', monospace",
                      fontSize:12, cursor:'pointer',
                      boxShadow:`2px 2px 0 ${C.actionShadow}`,
                    }}>{b.label}</div>
                  ))}
                </div>

                <hr style={{ border:'none', borderTop:`1.5px dashed ${C.panelBorder}`, margin:'0 0 8px' }} />

                <p style={{ fontFamily:"'Space Mono', monospace", fontSize:11,
                  color:'#4a4030', lineHeight:1.8, textAlign:'center' }}>
                  hi! i'm hiba. welcome to my website — a personal site made as a creative outlet,
                  inspired by my favourite colour green. feel free to connect :D
                </p>
              </div>

              {/* Status */}
              <div style={{
                background:C.creamBg,
                border:`2px solid ${C.creamBorder}`,
                borderRadius:6, padding:'8px 12px',
                fontFamily:"'Space Mono', monospace",
                fontSize:12, color:'#5a4a28',
                display:'flex', alignItems:'center', gap:8,
                boxShadow:`2px 2px 0 ${C.creamShadow}`,
              }}>
                <div style={{
                  width:8, height:8, borderRadius:'50%',
                  background:C.statusDot,
                  boxShadow:`0 0 5px ${C.statusDot}`,
                  animation:'blink 2s ease-in-out infinite',
                  flexShrink:0,
                }} />
                user status: probably overwatering my plants again 🪴
              </div>

              {/* Spotify */}
              <SpotifyWidget />

              {/* Experience */}
              <div style={panelStyle()}>
                <SectionHeader borderColor={C.panelBorder}>📌 things i've been up to</SectionHeader>
                {EXPERIENCE.map((e, i) => (
                  <div key={i} style={{
                    display:'flex', alignItems:'center', gap:12,
                    marginBottom: i < EXPERIENCE.length - 1 ? 10 : 0,
                    paddingBottom: i < EXPERIENCE.length - 1 ? 10 : 0,
                    borderBottom: i < EXPERIENCE.length - 1 ? `1px dashed #d4cc98` : 'none',
                  }}>
                    <img src={e.logo} alt={e.company}
                      style={{ width:42, height:42, objectFit:'contain',
                        borderRadius:6, background:'#fff',
                        border:`1.5px solid ${C.creamBorder}`,
                        padding:4, flexShrink:0 }} />
                    <div>
                      <div style={{ fontFamily:"'Space Mono', monospace",
                        fontSize:12, fontWeight:700, color:C.dark }}>{e.role}</div>
                      <div style={{ fontFamily:"'Space Mono', monospace",
                        fontSize:11, color:C.light }}>{e.company}</div>
                      <div style={{ fontFamily:"'Space Mono', monospace",
                        fontSize:10, color:C.muted, marginTop:1 }}>{e.period}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Travel polaroids */}
              <div style={creamStyle()}>
                <SectionHeader borderColor={C.creamBorder}>📷 places i've been</SectionHeader>
                <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                  {TRAVEL_PHOTOS.map((p, i) => (
                    <Polaroid key={i} src={p.src} caption={p.caption}
                      rotation={[-3, 2, -1.5][i]} />
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div style={sageStyle()}>
                <SectionHeader borderColor={C.sageBorder}>💚 things i love</SectionHeader>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                  {INTERESTS.map((it, i) => (
                    <div key={i} className="stamp" style={{
                      background:C.panelBg,
                      border:`2px solid ${it.color}`,
                      borderRadius:3, padding:'3px 10px',
                      fontFamily:"'Space Mono', monospace",
                      fontSize:11, color:it.color,
                      transform:`rotate(${[-2,2,-3,1,-1,3,-2,2,-1][i % 9]}deg)`,
                      boxShadow:`1px 1px 0 ${it.color}`,
                      transition:'transform 0.2s',
                      cursor:'default',
                    }}>{it.label}</div>
                  ))}
                </div>
              </div>

            </div>{/* end right col */}
          </div>{/* end grid */}

          <div style={{ textAlign:'center', marginTop:16 }}>
            <span style={{ fontFamily:"'Space Mono', monospace",
              fontSize:10, color:C.muted, letterSpacing:2 }}>
              made with 🌿 by hiba · 2025 · best viewed with a cup of matcha
            </span>
          </div>

        </div>{/* end page body */}

        {/* Marquee */}
        <div style={{
          background:`linear-gradient(180deg, ${C.barFrom} 0%, ${C.barTo} 100%)`,
          borderTop:`2px solid ${C.barBorder}`,
          padding:'5px 0', overflow:'hidden', whiteSpace:'nowrap',
        }}>
          <span style={{
            display:'inline-block',
            fontFamily:"'Space Mono', monospace",
            fontSize:11, color:'#c8e8a0', letterSpacing:2,
            animation:'marquee 20s linear infinite',
          }}>{MARQUEE}</span>
        </div>

      </div>{/* end browser window */}
    </>
  );
}
