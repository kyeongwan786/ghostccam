"use client";

import { ChangeEvent, useRef, useState } from "react";

const samples = [
  { title: "거울 셀카", src: "/assets/user-bedroom-selfie.png", tone: "red" },
  { title: "엘리베이터에서", src: "/assets/user-elevator-selfie.png", tone: "blue" },
  { title: "카페 창가에서", src: "/assets/user-cafe-selfie.png", tone: "brown" },
  { title: "친구들과 함께", src: "/assets/user-group-selfie.png", tone: "gray" },
];

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [heroImage, setHeroImage] = useState("/assets/ghost-selfie-hero.png");
  const [menuOpen, setMenuOpen] = useState(false);

  const handlePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file?.type.startsWith("image/")) setHeroImage(URL.createObjectURL(file));
  };

  return (
    <main className="ghostnear-app">
      <div className="backdrop-glow" />
      <header className="site-header">
        <a className="logo" href="#top">Ghost<span>Near</span></a>
        <nav className={menuOpen ? "open" : ""}>
          <a href="#top">홈</a><a href="#guide">이용안내</a><a href="#contact">문의하기</a>
          <button className="header-upload" onClick={() => inputRef.current?.click()}>사진 업로드 <b>↗</b></button>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴 열기"><span /><span /><span /></button>
      </header>

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><i /> REALITY, WITH A LITTLE STATIC</p>
          <h1>네 옆에<br /><em>귀신이</em> 있다</h1>
          <p className="hero-description">당신의 사진 속에<br />보이지 않던 존재를 보여드립니다.</p>
          <button className="upload-card" onClick={() => inputRef.current?.click()}>
            <span className="upload-symbol">↥</span><span><strong>사진 업로드</strong><small>JPG, PNG, AVIF / 최대 10MB</small></span><b>↗</b>
            <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/avif" onChange={handlePhoto} />
          </button>
          <p className="privacy"><span>♧</span> 사진은 안전하게 처리되며 저장되지 않습니다.</p>
        </div>
        <div className="hero-media">
          <div className="hero-frame">
            <img src={heroImage} alt="거울 속에 나타난 귀신" />
            <div className="hero-vignette" /><span className="media-meta top-meta">GHOSTNEAR / 001</span><span className="media-meta bottom-meta">LOOK CLOSER<br />THERE IS SOMEONE BEHIND YOU</span><span className="hero-corner corner-one" /><span className="hero-corner corner-two" />
          </div>
          <div className="media-caption"><span><i /> LIVE PREVIEW</span><span>자연스러운 합성 · 01</span></div>
        </div>
      </section>

      <section className="benefits" id="guide">
        <article className="benefit-card feature-card"><div className="card-kicker">01 / WHAT WE DO</div><h2>심령 사진 생성</h2><p>AI가 당신의 사진 속에 보이지 않던 존재를 자연스럽게 만들어 드립니다.</p><div className="benefit-icons"><span><b>✣</b> 자연스러운 합성</span><span><b>HD</b> 고화질 결과</span><span><b>▱</b> 개인정보 보호</span></div></article>
        <article className="benefit-card recommend-card"><div className="card-kicker">02 / TRY THIS</div><h2>이런 사진을 추천해요</h2><div className="recommend-grid"><span><b>◌</b> 거울 셀카</span><span><b>⌂</b> 어두운 실내</span><span><b>┘</b> 복도 · 계단</span><span><b>♧</b> 여러 명의 사진</span></div></article>
      </section>

      <section className="moments-section"><div className="section-heading"><div><p className="eyebrow"><i /> REAL USER MOMENTS</p><h2>실제 사용자들이 <em>경험한 순간</em></h2><p>평범한 셀카 속, 보이지 않던 존재가 나타납니다.</p></div><a href="#contact">더 많은 사례 보기 <b>↗</b></a></div><div className="moments-grid">{samples.map((sample, index) => <article className={`moment moment-${index + 1}`} key={sample.title}><div className={`moment-image ${sample.tone}`} style={{ backgroundImage: `url(${sample.src})` }} /><div className="moment-overlay" /><span>{sample.title}</span><small>GHOSTNEAR / 0{index + 1}</small></article>)}</div></section>

      <section className="stats-section"><div className="stats-copy"><p className="eyebrow"><i /> HOW IT WORKS</p><h2>심령 사진이란?</h2><p>특수한 AI 기술을 통해 사용자의 사진 속에 보이지 않던 존재를 자연스럽게 합성하여 심령 사진을 생성합니다.<br />실제 존재를 믿지 않아도, 오늘 당신의 사진을 한번 확인해보세요.</p></div><div className="stats"><div><strong>1,250,000<small>+</small></strong><span>생성된 사진 수</span></div><div><strong>98.7<small>%</small></strong><span>만족도</span></div><div><strong>24<small>/7</small></strong><span>서비스 이용 가능</span></div></div></section>

      <section className="cta-section" id="contact"><div><p className="eyebrow"><i /> ONE MORE LOOK</p><h2>지금 바로 업로드하고<br /><em>심령 사진을 확인해보세요</em></h2></div><button onClick={() => inputRef.current?.click()}>사진 업로드 <b>↗</b></button></section>

      <footer className="site-footer"><div><a className="logo" href="#top">Ghost<span>Near</span></a><p>© 2024 GhostNear. All rights reserved.</p></div><div className="footer-links"><a href="/terms">이용약관</a><a href="/privacy">개인정보처리방침</a><a href="#contact">문의하기</a></div><div className="socials"><span>◎</span><span>♪</span><span>▶</span></div></footer>
    </main>
  );
}
