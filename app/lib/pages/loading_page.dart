part of '../main.dart';

class CreateLoadingPage extends StatefulWidget {
  const CreateLoadingPage({super.key});

  @override
  State<CreateLoadingPage> createState() => _CreateLoadingPageState();
}

class _CreateLoadingPageState extends State<CreateLoadingPage>
    with TickerProviderStateMixin {
  late final AnimationController _radarController;
  late final AnimationController _progressController;

  @override
  void initState() {
    super.initState();
    _radarController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 4),
    )..repeat();
    _progressController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 16),
    )..forward();
  }

  @override
  void dispose() {
    _radarController.dispose();
    _progressController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _background,
      body: SafeArea(
        bottom: false,
        child: AnimatedBuilder(
          animation: Listenable.merge([_radarController, _progressController]),
          builder: (context, _) {
            final progress = _progressController.value * .94;
            return SingleChildScrollView(
              physics: const ClampingScrollPhysics(),
              padding: const EdgeInsets.only(bottom: 28),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  _buildLoadingHeader(context),
                  const Padding(
                    padding: EdgeInsets.fromLTRB(18, 8, 18, 0),
                    child: _LoadingProgress(),
                  ),
                  const SizedBox(height: 24),
                  const Padding(
                    padding: EdgeInsets.symmetric(horizontal: 18),
                    child: _LoadingIntro(),
                  ),
                  const SizedBox(height: 12),
                  _LoadingRadar(rotation: _radarController.value * math.pi * 2),
                  Text(
                    '${(progress * 100).round()}%',
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      fontSize: 43,
                      height: 1,
                      fontWeight: FontWeight.w300,
                      color: Colors.white,
                      letterSpacing: -2,
                    ),
                  ),
                  const SizedBox(height: 5),
                  const Text(
                    '분석을 진행 중입니다',
                    textAlign: TextAlign.center,
                    style: TextStyle(color: _muted, fontSize: 13),
                  ),
                  const SizedBox(height: 21),
                  const Padding(
                    padding: EdgeInsets.symmetric(horizontal: 18),
                    child: _LoadingEngineSection(),
                  ),
                  const SizedBox(height: 16),
                  const Padding(
                    padding: EdgeInsets.symmetric(horizontal: 18),
                    child: _LoadingTipSection(),
                  ),
                ],
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildLoadingHeader(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(12, 4, 18, 0),
      child: SizedBox(
        height: 50,
        child: Row(
          children: [
            IconButton(
              onPressed: () => Navigator.of(context).pop(),
              icon: const Icon(Icons.arrow_back_ios_new_rounded),
              iconSize: 20,
              color: Colors.white,
              padding: EdgeInsets.zero,
              constraints: const BoxConstraints(minWidth: 36, minHeight: 36),
            ),
            const Expanded(
              child: Center(
                child: Text.rich(
                  TextSpan(
                    style: TextStyle(
                      fontFamily: 'serif',
                      fontSize: 25,
                      letterSpacing: -2,
                      color: Colors.white,
                    ),
                    children: [
                      TextSpan(text: 'Ghost'),
                      TextSpan(
                        text: 'Cam',
                        style: TextStyle(color: _red),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            const SizedBox(width: 36),
          ],
        ),
      ),
    );
  }
}

class _LoadingProgress extends StatelessWidget {
  const _LoadingProgress();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        const _LoadingStep(icon: Icons.check_rounded, label: '사진 선택'),
        const Expanded(child: _LoadingStepLine()),
        const _LoadingStep(number: '2', label: 'AI 탐지 중', active: true),
        const Expanded(child: _LoadingStepLine()),
        const _LoadingStep(number: '3', label: '결과 확인'),
      ],
    );
  }
}

class _LoadingStep extends StatelessWidget {
  const _LoadingStep({
    required this.label,
    this.number,
    this.icon,
    this.active = false,
  });

  final String label;
  final String? number;
  final IconData? icon;
  final bool active;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 27,
          height: 27,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: active ? _red : Colors.transparent,
            border: Border.all(color: active ? _red : const Color(0xFF454545)),
          ),
          child: icon != null
              ? Icon(icon, size: 16, color: const Color(0xFFD8D8D8))
              : Text(
                  number ?? '',
                  style: TextStyle(
                    color: active ? Colors.black : const Color(0xFFBDBDBD),
                    fontSize: 12,
                  ),
                ),
        ),
        const SizedBox(width: 6),
        Text(
          label,
          style: TextStyle(
            color: active ? _red : const Color(0xFFBDBDBD),
            fontSize: 11.5,
            fontWeight: active ? FontWeight.w600 : FontWeight.w400,
          ),
        ),
      ],
    );
  }
}

class _LoadingStepLine extends StatelessWidget {
  const _LoadingStepLine();

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 1,
      margin: const EdgeInsets.symmetric(horizontal: 9),
      color: const Color(0xFF4A4A4A),
    );
  }
}

class _LoadingIntro extends StatelessWidget {
  const _LoadingIntro();

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const Text(
          'AI가 사진을 분석하고 있습니다',
          textAlign: TextAlign.center,
          style: TextStyle(color: Colors.white, fontSize: 21),
        ),
        const SizedBox(height: 6),
        const Text.rich(
          TextSpan(
            style: TextStyle(
              color: Colors.white,
              fontSize: 27,
              height: 1.15,
              letterSpacing: -1.1,
            ),
            children: [
              TextSpan(text: '잠시만 '),
              TextSpan(
                text: '기다려주세요',
                style: TextStyle(color: _red),
              ),
              TextSpan(text: '...'),
            ],
          ),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 13),
        const Text(
          'AI가 사진 속의 빛, 그림자, 형태, 패턴을 분석하여\n눈에 보이지 않는 존재의 흔적을 찾고 있습니다.',
          textAlign: TextAlign.center,
          style: TextStyle(color: _muted, fontSize: 12.5, height: 1.55),
        ),
      ],
    );
  }
}

class _LoadingRadar extends StatelessWidget {
  const _LoadingRadar({required this.rotation});

  final double rotation;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final size = math.min(constraints.maxWidth * .62, 280.0);
        return SizedBox(
          height: size,
          child: Center(
            child: SizedBox(
              width: size,
              height: size,
              child: Stack(
                alignment: Alignment.center,
                children: [
                  CustomPaint(
                    size: Size.square(size),
                    painter: _LoadingRadarPainter(rotation: rotation),
                  ),
                  Container(
                    width: size * .18,
                    height: size * .18,
                    decoration: BoxDecoration(
                      gradient: const RadialGradient(
                        colors: [Color(0xFF261010), Color(0xFF080808)],
                      ),
                      shape: BoxShape.circle,
                      border: Border.all(color: Color(0xFF6A2525), width: .8),
                      boxShadow: const [
                        BoxShadow(
                          color: Color(0x55FF3030),
                          blurRadius: 9,
                          spreadRadius: 1,
                        ),
                      ],
                    ),
                    child: const CustomPaint(painter: _RadarGhostPainter()),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}

class _LoadingRadarPainter extends CustomPainter {
  const _LoadingRadarPainter({required this.rotation});

  final double rotation;

  @override
  void paint(Canvas canvas, Size size) {
    final center = size.center(Offset.zero);
    final radius = size.shortestSide * .442;
    final red = const Color(0xFFFF2F2F);

    canvas.drawCircle(
      center,
      radius * 1.06,
      Paint()
        ..shader = ui.Gradient.radial(
          center,
          radius * 1.08,
          [red.withValues(alpha: .10), Colors.transparent],
          const [0, 1],
          ui.TileMode.clamp,
        )
        ..maskFilter = const ui.MaskFilter.blur(ui.BlurStyle.normal, 14),
    );

    final ringGlow = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.8
      ..color = red.withValues(alpha: .05)
      ..maskFilter = const ui.MaskFilter.blur(ui.BlurStyle.normal, 4);
    canvas.drawCircle(center, radius, ringGlow);

    final ring = Paint()..style = PaintingStyle.stroke;
    for (var i = 1; i <= 6; i++) {
      ring
        ..strokeWidth = i == 6 ? .8 : .55
        ..color = red.withValues(alpha: i == 6 ? .24 : .105);
      canvas.drawCircle(center, radius * i / 6, ring);

      final highlight = Paint()
        ..style = PaintingStyle.stroke
        ..strokeWidth = i == 6 ? 1.0 : .7
        ..color = red.withValues(alpha: .115 - i * .008);
      canvas.drawArc(
        Rect.fromCircle(center: center, radius: radius * i / 6),
        -2.72,
        1.05,
        false,
        highlight,
      );
    }

    final rimHighlight = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.1
      ..color = red.withValues(alpha: .24);
    canvas.drawArc(
      Rect.fromCircle(center: center, radius: radius * 1.012),
      -2.55,
      .92,
      false,
      rimHighlight,
    );

    final innerAtmosphere = Paint()
      ..shader = ui.Gradient.radial(
        center,
        radius * .70,
        [red.withValues(alpha: .07), Colors.transparent],
        const [0, 1],
        ui.TileMode.clamp,
      );
    canvas.drawCircle(center, radius * .70, innerAtmosphere);

    final spoke = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = .4
      ..color = red.withValues(alpha: .045);
    for (var i = 0; i < 12; i++) {
      final angle = i * math.pi * 2 / 12;
      canvas.drawLine(
        center,
        Offset(
          center.dx + math.cos(angle) * radius,
          center.dy + math.sin(angle) * radius,
        ),
        spoke,
      );
    }

    final crosshair = Paint()
      ..color = red.withValues(alpha: .13)
      ..strokeWidth = .5;
    canvas.drawLine(
      Offset(center.dx - radius, center.dy),
      Offset(center.dx + radius, center.dy),
      crosshair,
    );
    canvas.drawLine(
      Offset(center.dx, center.dy - radius),
      Offset(center.dx, center.dy + radius),
      crosshair,
    );

    final tick = Paint()
      ..color = red.withValues(alpha: .25)
      ..strokeWidth = .5;
    for (var i = 0; i < 120; i++) {
      final angle = i * math.pi * 2 / 120;
      final outer = Offset(
        center.dx + math.cos(angle) * radius * 1.075,
        center.dy + math.sin(angle) * radius * 1.075,
      );
      final innerRadius = i % 10 == 0 ? radius * .99 : radius * 1.045;
      final inner = Offset(
        center.dx + math.cos(angle) * innerRadius,
        center.dy + math.sin(angle) * innerRadius,
      );
      canvas.drawLine(inner, outer, tick);
    }

    final sweepAngle = -math.pi / 2 + rotation;
    const sweepWidth = .84;
    final sweepStart = sweepAngle;
    final sweepPath = Path()
      ..moveTo(center.dx, center.dy)
      ..lineTo(
        center.dx + math.cos(sweepAngle) * radius,
        center.dy + math.sin(sweepAngle) * radius,
      )
      ..arcTo(
        Rect.fromCircle(center: center, radius: radius),
        sweepStart,
        -sweepWidth,
        false,
      )
      ..close();

    final sweepGlow = Paint()
      ..color = red.withValues(alpha: .07)
      ..maskFilter = const ui.MaskFilter.blur(ui.BlurStyle.normal, 12);
    canvas.drawPath(sweepPath, sweepGlow);

    canvas.drawPath(
      sweepPath,
      Paint()
        ..shader = ui.Gradient.radial(
          center,
          radius,
          [
            red.withValues(alpha: .095),
            red.withValues(alpha: .035),
            Colors.transparent,
          ],
          const [0, .38, 1],
          ui.TileMode.clamp,
        ),
    );
    const slices = 60;
    for (var i = 0; i < slices; i++) {
      final start = sweepAngle - sweepWidth * i / slices;
      final width = -sweepWidth / slices - .010;
      final strength = math.pow(1 - i / slices, 1.8).toDouble();
      final slice = Path()
        ..moveTo(center.dx, center.dy)
        ..lineTo(
          center.dx + math.cos(start) * radius,
          center.dy + math.sin(start) * radius,
        )
        ..arcTo(
          Rect.fromCircle(center: center, radius: radius),
          start,
          width,
          false,
        )
        ..close();
      canvas.drawPath(
        slice,
        Paint()..color = red.withValues(alpha: .006 + strength * .19),
      );
    }

    final leadingEdge = Offset(
      center.dx + math.cos(sweepAngle) * radius,
      center.dy + math.sin(sweepAngle) * radius,
    );
    final leadingBand = Path()
      ..moveTo(center.dx, center.dy)
      ..lineTo(
        center.dx + math.cos(sweepAngle) * radius,
        center.dy + math.sin(sweepAngle) * radius,
      )
      ..arcTo(
        Rect.fromCircle(center: center, radius: radius),
        sweepAngle,
        -.22,
        false,
      )
      ..close();
    canvas.drawPath(
      leadingBand,
      Paint()
        ..color = red.withValues(alpha: .18)
        ..maskFilter = const ui.MaskFilter.blur(ui.BlurStyle.normal, 7),
    );
    final beamGlow = Path()
      ..moveTo(center.dx, center.dy)
      ..lineTo(
        center.dx + math.cos(sweepAngle) * radius,
        center.dy + math.sin(sweepAngle) * radius,
      )
      ..arcTo(
        Rect.fromCircle(center: center, radius: radius),
        sweepAngle,
        -.075,
        false,
      )
      ..close();
    canvas.drawPath(
      beamGlow,
      Paint()
        ..color = red.withValues(alpha: .24)
        ..maskFilter = const ui.MaskFilter.blur(ui.BlurStyle.normal, 5),
    );
    canvas.drawLine(
      center,
      leadingEdge,
      Paint()
        ..color = red.withValues(alpha: .88)
        ..strokeWidth = .8,
    );

    final points = [
      const Offset(.18, -.63),
      const Offset(.78, -.08),
      const Offset(.42, .67),
      const Offset(-.66, .26),
      const Offset(-.45, -.48),
    ];
    for (final point in points) {
      final dot = Offset(
        center.dx + point.dx * radius,
        center.dy + point.dy * radius,
      );
      canvas.drawCircle(
        dot,
        5,
        Paint()
          ..color = red.withValues(alpha: .22)
          ..maskFilter = const ui.MaskFilter.blur(ui.BlurStyle.normal, 4),
      );
      canvas.drawCircle(dot, 1.7, Paint()..color = red.withValues(alpha: .98));
    }
  }

  @override
  bool shouldRepaint(covariant _LoadingRadarPainter oldDelegate) {
    return oldDelegate.rotation != rotation;
  }
}

class _RadarGhostPainter extends CustomPainter {
  const _RadarGhostPainter();

  @override
  void paint(Canvas canvas, Size size) {
    final stroke = Paint()
      ..color = const Color(0xFFD8D8D8)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.7
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round;
    final centerX = size.width / 2;
    final left = size.width * .25;
    final right = size.width * .75;
    final top = size.height * .18;
    final bottom = size.height * .78;
    final path = Path()
      ..moveTo(centerX, top)
      ..cubicTo(left + 2, top, left, top + 7, left, top + 12)
      ..lineTo(left, bottom - 5)
      ..cubicTo(left, bottom + 1, left - 2, bottom + 2, left - 4, bottom)
      ..cubicTo(
        left - 1,
        bottom - 6,
        left + 4,
        bottom - 6,
        left + 7,
        bottom - 1,
      )
      ..cubicTo(
        centerX - 3,
        bottom + 6,
        centerX + 3,
        bottom + 6,
        right - 7,
        bottom - 1,
      )
      ..cubicTo(right - 4, bottom - 6, right + 1, bottom - 6, right + 4, bottom)
      ..cubicTo(right + 2, bottom + 2, right, bottom + 1, right, bottom - 5)
      ..lineTo(right, top + 12)
      ..cubicTo(right, top + 7, right - 2, top, centerX, top)
      ..close();
    canvas.drawPath(path, stroke);
    canvas.drawCircle(
      Offset(centerX - size.width * .14, size.height * .43),
      1.4,
      stroke,
    );
    canvas.drawCircle(
      Offset(centerX + size.width * .14, size.height * .43),
      1.4,
      stroke,
    );
  }

  @override
  bool shouldRepaint(covariant _RadarGhostPainter oldDelegate) => false;
}

class _LoadingEngineSection extends StatelessWidget {
  const _LoadingEngineSection();

  @override
  Widget build(BuildContext context) {
    const items = [
      (Icons.center_focus_strong_outlined, '미세 패턴 인식', '환경 속 미세한\n이상 패턴을 감지'),
      (Icons.scatter_plot_outlined, '형태 특성 분석', '사람과 유사한\n형태를 분석'),
      (Icons.graphic_eq_rounded, '주변 에너지 감지', '빛과 그림자의\n분포를 분석'),
      (Icons.my_location_outlined, '존재 가능성 평가', '분석 결과를\n종합해 판단'),
    ];

    return Container(
      padding: const EdgeInsets.fromLTRB(10, 13, 10, 11),
      decoration: BoxDecoration(
        color: const Color(0xFF0A0A0A),
        borderRadius: BorderRadius.circular(13),
        border: Border.all(color: const Color(0xFF252525), width: .8),
      ),
      child: Column(
        children: [
          const Text.rich(
            TextSpan(
              style: TextStyle(color: Colors.white, fontSize: 16),
              children: [
                TextSpan(text: 'GhostCam의 '),
                TextSpan(
                  text: 'AI 탐지 엔진',
                  style: TextStyle(color: _red),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              for (var i = 0; i < items.length; i++)
                Expanded(
                  child: Padding(
                    padding: EdgeInsets.only(left: i == 0 ? 0 : 4),
                    child: Column(
                      children: [
                        Container(
                          width: 42,
                          height: 42,
                          alignment: Alignment.center,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: const Color(0xFF100909),
                            border: Border.all(color: const Color(0xFF461818)),
                          ),
                          child: Icon(items[i].$1, color: _red, size: 19),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          items[i].$2,
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 9.5,
                            height: 1.2,
                          ),
                        ),
                        const SizedBox(height: 5),
                        Text(
                          items[i].$3,
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            color: _muted,
                            fontSize: 8.3,
                            height: 1.3,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
            ],
          ),
        ],
      ),
    );
  }
}

class _LoadingTipSection extends StatelessWidget {
  const _LoadingTipSection();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(12, 11, 12, 11),
      decoration: BoxDecoration(
        color: const Color(0xFF0A0A0A),
        borderRadius: BorderRadius.circular(13),
        border: Border.all(color: const Color(0xFF252525), width: .8),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Icon(Icons.lightbulb_outline_rounded, color: _red, size: 25),
          const SizedBox(width: 10),
          const Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'TIP',
                  style: TextStyle(
                    color: _red,
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                SizedBox(height: 4),
                Text(
                  '어두운 환경, 복잡한 배경, 인물이 있는 사진일수록\n더 정확한 탐지가 가능합니다.',
                  style: TextStyle(color: _muted, fontSize: 10.5, height: 1.35),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
