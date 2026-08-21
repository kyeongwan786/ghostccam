"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

const samples = [
  ["거울 속의 나", "/assets/user-bedroom-selfie.png"],
  ["엘리베이터 뒤편", "/assets/user-elevator-selfie.png"],
  ["카페 창가에서", "/assets/user-cafe-selfie.png"],
  ["친구들과 함께", "/assets/user-group-selfie.png"],
];

const loadingMessages = [
  "사진의 잔상을 읽고 있습니다",
  "남겨진 기척을 추적하고 있습니다",
  "보이지 않는 흔적을 대조하고 있습니다",
  "마지막 장면을 다시 들여다보고 있습니다",
];

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [heroImage, setHeroImage] = useState("/assets/ghostcam-hero-reference.png");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "ready" | "loading" | "done">("idle");
  const [menuOpen, setMenuOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [loadingDotCount, setLoadingDotCount] = useState(1);

  useEffect(() => {
    if (status !== "loading") return;
    const dots = window.setInterval(() => {
      setLoadingDotCount((count) => (count >= 3 ? 1 : count + 1));
    }, 420);
    const messages = window.setInterval(() => {
      setLoadingMessageIndex((index) => (index + 1) % loadingMessages.length);
    }, 2400);
    return () => {
      window.clearInterval(dots);
      window.clearInterval(messages);
    };
  }, [status]);

  const handlePhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const uploadFile = await optimizeForUpload(file);
    setSelectedFile(uploadFile);
    setErrorMessage("");
    const previewUrl = URL.createObjectURL(file);
    setHeroImage(previewUrl);
    await generate(uploadFile, previewUrl);
  };

  const generate = async (file = selectedFile, previewUrl?: string) => {
    if (!file) {
      inputRef.current?.click();
      return;
    }
    setStatus("loading");
    const body = new FormData();
    body.append("image", file);
    try {
      const response = await fetch("/api/generate", { method: "POST", body });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "이미지 생성에 실패했습니다.");
      sessionStorage.setItem("ghostcam-result", data.image);
      sessionStorage.setItem("ghostcam-analysis", JSON.stringify(data.analysis || null));
      window.location.assign("/result");
    } catch (error) {
      setStatus("ready");
      setSelectedFile(null);
      setHeroImage("/assets/ghostcam-hero-reference.png");
      setErrorMessage(error instanceof Error ? error.message : "잠시 후 다시 시도해주세요.");
    }
  };

  if (status === "loading") {
    return (
      <main className="ghostcam-loading-screen">
        <div className="loading-noise" />
        <header className="site-header loading-header"><a className="logo" href="#top">Ghost<span>Cam</span></a><span className="loading-id">ANALYSIS / 001</span></header>
        <section className="loading-stage">
          <div className="loading-preview"><img src={heroImage} alt="업로드한 사진 분석 중" /><div className="loading-scan" /><div className="loading-vignette" /><span className="scan-corner scan-one" /><span className="scan-corner scan-two" /></div>
          <div className="loading-copy"><p className="eyebrow"><i /> PLEASE WAIT</p><h1>사진 속을<br /><em>살펴보는 중입니다</em></h1><p className="loading-subcopy">{loadingMessages[loadingMessageIndex]}<strong>{".".repeat(loadingDotCount)}</strong></p><div className="loading-progress"><span /><b>SCANNING THE IMAGE</b><strong>{".".repeat(loadingDotCount)}</strong></div></div>
        </section>
      </main>
    );
  }

  return (
    <main className="ghostcam-app">
      <div className="backdrop-glow" />
      <header className="site-header">
        <a className="logo" href="#top">Ghost<span>Cam</span></a>
        <nav className={menuOpen ? "open" : ""}>
          <a href="#top">홈</a><a href="#guide">사용 안내</a><a href="#contact">문의하기</a>
          <button className="header-upload" onClick={() => inputRef.current?.click()}>사진 업로드 <b>↗</b></button>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴 열기"><span /><span /><span /></button>
      </header>

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><i /> REALITY, WITH A LITTLE STATIC</p>
          <h1>네 옆에<br /><em>귀신</em>이 있다</h1>
          <p className="hero-description">AI가 당신의 사진을 살펴보고,<br />눈에 보이지 않던 존재를 자연스럽게 보여드립니다.</p>
          <button className="upload-card" onClick={() => inputRef.current?.click()} disabled={status === "loading"}>
            <span className="upload-symbol">{status === "loading" ? "…" : "＋"}</span>
            <span><strong>{status === "loading" ? "귀신을 찾는 중" : selectedFile ? "귀신 찾아보기" : "사진 업로드"}</strong><small>JPG, PNG, AVIF / 최대 10MB</small></span><b>↗</b>
            <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/avif" onClick={(event) => event.stopPropagation()} onChange={handlePhoto} />
          </button>
          {errorMessage && <p className="upload-error">{errorMessage}</p>}
        </div>
        <div className="hero-media"><div className="hero-frame"><img src={heroImage} alt="GhostCam 결과 미리보기" /><div className="hero-vignette" /><span className="media-meta top-meta">GHOSTCAM / 001</span><span className="media-meta bottom-meta">LOOK CLOSER<br />THERE IS SOMEONE BEHIND YOU</span><span className="hero-corner corner-one" /><span className="hero-corner corner-two" /></div><div className="media-caption"><span><i /> {status === "loading" ? "GENERATING" : "LIVE PREVIEW"}</span><span>AI IMAGE EDIT / 01</span></div></div>
      </section>

      <section className="benefits" id="guide"><article className="benefit-card feature-card"><div className="card-kicker">01 / WHAT WE DO</div><h2>사진 속 존재 발견</h2><p>당신의 사진을 분석하고, 보이지 않던 존재를 자연스럽고 오싹하게 표현합니다.</p><div className="benefit-icons"><span><b>✦</b> 자연스러운 표현</span><span><b>HD</b> 고화질 결과</span><span><b>◉</b> 개인정보 보호</span></div></article><article className="benefit-card recommend-card"><div className="card-kicker">02 / TRY THIS</div><h2>이런 사진을 추천해요</h2><div className="recommend-grid"><span><b>◌</b> 거울 사진</span><span><b>↕</b> 어두운 실내</span><span><b>⌁</b> 복도 · 계단</span><span><b>✣</b> 여러 명의 사진</span></div></article></section>

      <section className="moments-section"><div className="section-heading"><div><p className="eyebrow"><i /> REAL USER MOMENTS</p><h2>실제 사용자들의 <em>경험의 순간</em></h2><p>평범한 사진 속, 보이지 않던 존재가 나타납니다.</p></div><a href="#contact">더 많은 사례 보기 <b>↗</b></a></div><div className="moments-grid">{samples.map(([title, src], index) => <article className={`moment moment-${index + 1}`} key={title}><div className="moment-image" style={{ backgroundImage: `url(${src})` }} /><div className="moment-overlay" /><span>{title}</span><small>GHOSTCAM / 0{index + 1}</small></article>)}</div></section>

      <section className="platform-section" id="contact"><article className="platform-showcase"><div className="platform-showcase-copy"><span className="platform-label">GHOSTCAM APP</span><h2>휴대폰 하나로<br />직접 <em>탐지</em>해보세요</h2><p className="platform-lead">지금 내 주변에 귀신이 있다면?<br />직접 찾아보세요.</p><p>실시간 주변 스캔과 카메라를 활용해<br />주변의 이상 신호를 확인할 수 있습니다.</p><ul><li><b className="feature-icon"><svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="10"/><circle cx="16" cy="16" r="4"/><path d="M16 2v5M16 25v5M2 16h5M25 16h5M9 9l3 3M20 20l3 3M23 9l-3 3M12 20l-3 3"/></svg></b><span><strong>실시간 주변 스캔</strong><small>주변의 움직임을 추적합니다.</small></span></li><li><b className="feature-icon"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 10h5l2-3h8l2 3h5v15H5z"/><circle cx="16" cy="17" r="5"/><path d="M25 12h.01"/></svg></b><span><strong>카메라 탐지</strong><small>신호가 감지된 방향을 확인합니다.</small></span></li><li><b className="feature-icon"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M2 17h5l3-8 4 14 4-17 3 11h9"/></svg></b><span><strong>이상 신호 감지</strong><small>주변의 이상 신호를 감지합니다.</small></span></li><li><b className="feature-icon"><svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="8"/><circle cx="16" cy="16" r="2"/><path d="M16 2v6M16 24v6M2 16h6M24 16h6"/></svg></b><span><strong>직접 확인</strong><small>카메라로 현장을 확인해보세요.</small></span></li></ul><button onClick={() => inputRef.current?.click()}>앱 자세히 보기 <b>↗</b></button></div><div className="showcase-composite"><img src="/assets/ghostcam-phones-only.png" alt="GhostCam 앱 휴대폰 3개 화면" /></div></article><div className="download-strip"><img className="download-device-image" src="/assets/download-device.svg" alt="앱 아이콘" /><span className="download-copy">지금 앱을 다운로드하고<br /><em>더 강력한 탐지 경험</em>을 시작하세요</span><button className="download-app-button" type="button" onClick={(event) => event.preventDefault()}>앱 다운로드 <b>↗</b></button><span className="qr-badge">▦</span><small>QR 코드를 스캔해<br />앱으로 바로 시작하세요.</small></div></section>
      <footer className="site-footer"><div><a className="logo" href="#top">Ghost<span>Cam</span></a><p>© 2026 GhostCam. All rights reserved.</p></div><div className="footer-links"><a href="/terms">이용약관</a><a href="/privacy">개인정보처리방침</a><a href="#contact">문의하기</a></div><div className="socials"><span>◎</span><span>◌</span><span>✦</span></div></footer>
    </main>
  );
}

async function optimizeForUpload(file: File): Promise<File> {
  if (file.size <= 900_000 || file.type === "image/gif") return file;
  const source = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = reject;
      element.src = source;
    });
    const scale = Math.min(1, 2048 / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.9));
    return blob ? new File([blob], "ghostcam-upload.jpg", { type: "image/jpeg" }) : file;
  } finally {
    URL.revokeObjectURL(source);
  }
}









