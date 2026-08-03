import type { Metadata } from "next";

export const metadata: Metadata = { title: "이용약관 | GhostNear", description: "GhostNear 서비스 이용약관" };

export default function TermsPage() {
  return <main className="legal-page">
    <header className="legal-header"><a className="logo" href="/">Ghost<span>Near</span></a><a className="legal-back" href="/">서비스로 돌아가기 <b>↗</b></a></header>
    <article className="legal-content">
      <p className="legal-kicker">GHOSTNEAR / LEGAL</p><h1>이용약관</h1><p className="legal-lead">GhostNear 서비스 이용과 관련한 기본 약속을 안내합니다.</p><p className="legal-date">시행일: 2026년 8월 3일</p>
      <section><h2>제1조 (목적)</h2><p>이 약관은 GhostNear(이하 “서비스”)가 제공하는 사진 기반 심령 사진 합성 및 관련 기능의 이용 조건과 절차, 이용자와 서비스 운영자의 권리·의무를 정하는 것을 목적으로 합니다.</p></section>
      <section><h2>제2조 (서비스의 내용)</h2><p>서비스는 이용자가 제공한 사진을 바탕으로 귀신 또는 초자연적 존재가 포함된 이미지를 확인할 수 있도록 돕는 엔터테인먼트 목적의 기능을 제공합니다. 생성 결과는 창작·오락을 위한 것으로 실제 영적 존재나 사실을 증명하지 않습니다.</p></section>
      <section><h2>제3조 (사진 및 이용자의 책임)</h2><p>이용자는 본인이 업로드하거나 사용할 권리를 가진 사진만 이용해야 합니다. 타인의 초상, 개인정보, 저작물 또는 명예를 침해하는 사진을 허락 없이 처리해서는 안 됩니다. 이용자가 업로드한 사진과 결과물을 이용하여 발생하는 분쟁과 책임은 이용자에게 있습니다.</p></section>
      <section><h2>제4조 (금지행위)</h2><ul><li>타인의 동의 없이 사진을 업로드하거나 결과물을 배포하는 행위</li><li>특정인을 대상으로 한 괴롭힘, 협박, 사기, 명예훼손</li><li>불법·음란·폭력적 목적의 이용 또는 서비스 운영을 방해하는 행위</li><li>서비스의 정상적인 동작을 방해하거나 비정상적인 방법으로 접근하는 행위</li></ul></section>
      <section><h2>제5조 (지식재산권)</h2><p>서비스의 브랜드, 화면 구성, 소프트웨어, 문구 및 자체 제작 콘텐츠에 관한 권리는 서비스 운영자 또는 정당한 권리자에게 있습니다. 이용자는 서비스가 허용한 범위를 넘어 이를 복제·배포·변경할 수 없습니다.</p></section>
      <section><h2>제6조 (서비스 이용 및 변경)</h2><p>서비스는 기능 개선, 보안, 운영상의 필요에 따라 일부 기능을 변경하거나 일시적으로 중단할 수 있습니다. 중대한 변경이 있는 경우 서비스 화면 또는 별도의 공지로 안내합니다.</p></section>
      <section><h2>제7조 (면책)</h2><p>서비스는 오락과 창작을 위한 도구이며 생성 결과의 정확성, 특정 목적에 대한 적합성 또는 이용자가 기대하는 결과를 보장하지 않습니다. 천재지변, 통신 장애, 이용자의 귀책사유로 발생한 손해에 대해서는 관련 법령이 허용하는 범위에서 책임을 부담하지 않습니다.</p></section>
      <section><h2>제8조 (문의)</h2><p>서비스 이용과 관련된 문의는 서비스 내 문의 채널을 이용해 주세요. 정식 출시 전 아래 운영자 정보를 실제 사업자 정보로 교체해야 합니다.</p><div className="legal-placeholder">운영자명 / 사업자등록번호 / 주소 / 문의 이메일 입력 필요</div></section>
    </article>
  </main>;
}
