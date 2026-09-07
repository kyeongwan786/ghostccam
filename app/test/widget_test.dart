import 'package:flutter_test/flutter_test.dart';

import 'package:ghostcam_app/main.dart';

void main() {
  testWidgets('GhostCam home screen renders', (tester) async {
    await tester.pumpWidget(const GhostCamApp());

    expect(find.byType(HomePage), findsOneWidget);
    expect(find.text('탐지 시작'), findsOneWidget);
    expect(find.text('사진으로 생성'), findsOneWidget);
    expect(find.text('시스템 상태'), findsOneWidget);
  });
}
