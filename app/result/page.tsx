"use client";

import { CSSProperties, useEffect, useState } from "react";

export default function ResultPage() {
  const [image, setImage] = useState("");
  useEffect(() => {
    setImage(sessionStorage.getItem("ghostcam-result") || "");
  }, []);

  const download = () => {
    if (!image) return;
    const link = document.createElement("a");
    link.href = image;
    link.download = "ghostcam-result.png";
    link.click();
  };

  const share = async () => {
    if (!image) return;
    if (navigator.share) {
      await navigator.share({ title: "GhostCam 탐지 결과", text: "GhostCam으로 확인한 사진 속 이상 현상입니다." });
      return;
    }
    await navigator.clipboard?.writeText(window.location.href);
    window.alert("결과 페이지 주소를 복사했습니다.");
  };

  if (!image) return <main className="result-empty"><a className="logo" href="/">Ghost<span>Cam</span></a><h1>결과를 찾을 수 없습니다.</h1><a className="result-back" href="/">다시 시작하기 ↗</a></main>;

  return (
    <main className="result-dashboard">
      <header className="dashboard-header"><a className="logo" href="/">Ghost<span>Cam</span></a><nav><a href="/">홈</a><a href="/#guide">사용 안내</a><a href="/#contact">문의하기</a></nav><a className="new-scan-top" href="/">↻ &nbsp;새 사진으로 탐지하기</a></header>
      <section className="result-workspace" id="result">
        <div className="dashboard-title"><p className="eyebrow"><i /> ANALYSIS COMPLETE</p><h1>사진 속 <em>이상 현상</em>이 감지되었습니다</h1><p>당신의 사진 속, 보이지 않던 존재를 찾아냈습니다.</p></div>
        <div className="dashboard-image" style={{"--result-image": `url(${image})`} as CSSProperties}><div className="result-image-backdrop" /><img src={image} alt="GhostCam 분석 결과" /><span className="result-meta result-meta-top">GHOSTCAM / FOUND</span><span className="result-meta result-meta-bottom">LOOK CLOSER<br />ANOMALY DETECTED</span></div><div className="result-dots"><b /><i /><i /><i /><i /></div>
        <section className="result-actions" aria-label="결과 작업">
          <a className="action-primary" href="/"><span className="action-icon">↻</span><span><strong>다른 사진으로 다시 탐지하기</strong><small>새로운 사진에서 이상 현상을 찾아보세요</small></span><b>↗</b></a>
          <button onClick={download}><span className="action-icon">⇩</span><span><strong>이미지 저장</strong><small>결과 이미지 다운로드</small></span></button>
          <button onClick={share}><span className="action-icon">♧</span><span><strong>공유하기</strong><small>결과 페이지 공유</small></span></button>
        </section>
        <section className="deep-analysis" id="details"><div className="deep-ghost">●</div><div><h3>사진 속 장면을 다시 확인해보세요</h3><p>가까이 들여다볼수록 보이지 않던 흔적이 선명해집니다.</p></div></section>
        <footer className="dashboard-footer"><a href="/terms">이용약관</a><a href="/privacy">개인정보처리방침</a><a href="#contact">문의하기</a><span>◎　♪　▣</span></footer>
      </section>
    </main>
  );
}
