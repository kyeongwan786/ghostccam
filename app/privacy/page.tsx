import type { Metadata } from "next";

export const metadata: Metadata = { title: "개인정보처리방침 | GhostNear", description: "GhostNear 개인정보처리방침" };

export default function PrivacyPage() {
  return <main className="legal-page">
    <header className="legal-header"><a className="logo" href="/">Ghost<span>Near</span></a><a className="legal-back" href="/">서비스로 돌아가기 <b>↗</b></a></header>
    <article className="legal-content">
      <p className="legal-kicker">GHOSTNEAR / LEGAL</p><h1>개인정보처리방침</h1><p className="legal-lead">GhostNear는 이용자의 사진과 개인정보를 가볍게 다루지 않습니다.</p><p className="legal-date">시행일: 2026년 8월 3일</p>
      <div className="privacy-highlight"><span>현재 서비스의 핵심 처리 원칙</span><strong>업로드한 사진은 현재 MVP에서 브라우저 안에서만 처리되며 GhostNear 서버에 저장하지 않습니다.</strong></div>
      <section><h2>1. 개인정보의 처리 목적</h2><p>GhostNear는 사진 합성 기능 제공, 서비스 보안과 오류 확인, 이용 문의 대응을 위해 필요한 범위에서 개인정보를 처리합니다. 현재 웹 MVP에서는 회원가입 없이 사진을 이용할 수 있으며, 사진 파일을 서비스 서버로 전송하지 않는 방식으로 동작합니다.</p></section>
      <section><h2>2. 처리하는 개인정보의 항목</h2><p>현재 MVP는 회원가입·로그인·결제를 제공하지 않으며 이용자의 이름, 이메일, 전화번호를 별도로 수집하지 않습니다. 이용자가 선택한 사진은 브라우저의 메모리에서 미리보기와 합성에 사용될 수 있으며, 브라우저 탭을 닫거나 페이지를 새로고침하면 사라집니다.</p><p>서비스 운영 과정에서 호스팅·보안 시스템의 접속 로그(IP 주소, 접속 시각, 브라우저 정보 등)가 자동 생성될 수 있습니다. 실제로 로그를 수집·보관하는 경우 출시 전 해당 호스팅 사업자와 보관기간을 확인해 이 문구를 구체화해야 합니다.</p></section>
      <section><h2>3. 개인정보의 보유 및 이용기간</h2><p>브라우저에서 처리되는 사진은 GhostNear가 별도로 보유하지 않습니다. 문의를 위해 이용자가 자발적으로 연락처를 남기는 경우에는 문의 처리에 필요한 기간 동안만 보관한 뒤 지체 없이 파기합니다. 법령에 따라 보존이 필요한 경우에는 해당 법령에서 정한 기간을 따릅니다.</p></section>
      <section><h2>4. 개인정보의 제3자 제공 및 처리위탁</h2><p>GhostNear는 현재 사진을 제3자에게 제공하거나 사진 합성을 외부 업체에 위탁하지 않습니다. 향후 분석 도구, 광고, 결제, 서버 기반 이미지 처리 또는 클라우드 저장 기능을 추가하는 경우 제공받는 자·위탁업체·처리 항목·보유기간을 사전에 이 방침에 반영하고 필요한 동의 절차를 진행합니다.</p></section>
      <section><h2>5. 이용자의 권리와 행사방법</h2><p>이용자는 자신의 개인정보에 대해 열람, 정정, 삭제 또는 처리정지를 요청할 수 있습니다. 요청은 서비스 내 문의 채널을 통해 접수할 수 있으며, 운영자는 관련 법령에 따라 필요한 조치를 진행합니다.</p></section>
      <section><h2>6. 개인정보의 파기</h2><p>보유기간이 끝났거나 처리 목적이 달성된 개인정보는 지체 없이 파기합니다. 전자적 파일은 복구할 수 없도록 삭제하고, 종이 문서는 분쇄하거나 소각합니다. 브라우저에서만 처리되는 사진은 서비스가 보유하지 않으므로 별도의 서버 파기 절차를 거치지 않습니다.</p></section>
      <section><h2>7. 안전성 확보조치</h2><p>GhostNear는 개인정보 접근을 최소화하고, 서비스 운영 환경의 접근 통제와 보안 설정을 적용합니다. 다만 인터넷 환경의 특성상 모든 위험을 완전히 제거할 수는 없습니다.</p></section>
      <section><h2>8. 개인정보 보호책임자 및 문의</h2><p>정식 출시 전 아래 항목을 실제 운영자 정보로 교체해야 합니다.</p><div className="legal-placeholder">개인정보 보호책임자 / 운영자명 / 문의 이메일 / 주소 입력 필요</div></section>
      <section><h2>9. 방침의 변경</h2><p>법령, 서비스 기능 또는 개인정보 처리 방식이 변경되는 경우 변경된 방침을 이 페이지에 게시하고 시행일을 안내합니다.</p></section>
    </article>
  </main>;
}
