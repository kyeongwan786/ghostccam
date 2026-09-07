# GhostCam App

GhostCam의 독립형 Flutter 모바일 앱입니다. 웹 앱은 `../web`에 있으며,
모바일 앱의 Android 코드는 이 폴더 안에서만 관리합니다.

## 실행

```powershell
flutter pub get
flutter run
```

실제 기기 또는 Android 에뮬레이터에서 실행할 수 있습니다. 센서값은 실제
스마트폰에서 테스트할 때 가장 정확하며, 현재 홈 화면의 레이더는 UI 프로토타입입니다.

## 구조

- `lib/main.dart`: GhostCam 홈 화면과 앱 진입점
- `assets/ghost-selfie-hero.png`: 홈 화면 히어로 이미지
- `android/`: Android 네이티브 프로젝트

웹과 앱은 서로 다른 빌드 진입점을 사용하므로 한쪽의 화면 코드를 변경해도
다른 쪽 라우트와 충돌하지 않습니다.
