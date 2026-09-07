part of '../main.dart';

class _CreateProgress extends StatelessWidget {
  const _CreateProgress();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        const _CreateStepItem(number: '1', label: '사진 선택', active: true),
        const Expanded(child: _CreateStepLine()),
        const _CreateStepItem(number: '2', label: 'AI 탐지'),
        const Expanded(child: _CreateStepLine()),
        const _CreateStepItem(number: '3', label: '결과 확인'),
      ],
    );
  }
}

class _CreateStepItem extends StatelessWidget {
  const _CreateStepItem({
    required this.number,
    required this.label,
    this.active = false,
  });

  final String number;
  final String label;
  final bool active;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 28,
          height: 28,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: active ? _red : Colors.transparent,
            border: Border.all(color: active ? _red : const Color(0xFF454545)),
          ),
          child: Text(
            number,
            style: TextStyle(
              color: active ? Colors.black : const Color(0xFFBDBDBD),
              fontSize: 13,
            ),
          ),
        ),
        const SizedBox(width: 7),
        Text(
          label,
          style: TextStyle(
            color: active ? _red : const Color(0xFFBDBDBD),
            fontSize: 13,
            fontWeight: active ? FontWeight.w600 : FontWeight.w400,
          ),
        ),
      ],
    );
  }
}

class _CreateStepLine extends StatelessWidget {
  const _CreateStepLine();

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 1,
      margin: const EdgeInsets.symmetric(horizontal: 12),
      color: const Color(0xFF4A4A4A),
    );
  }
}

class _CreateChoiceCard extends StatelessWidget {
  const _CreateChoiceCard({
    required this.icon,
    required this.title,
    required this.description,
    required this.onTap,
    this.accent = false,
  });

  final IconData icon;
  final String title;
  final String description;
  final VoidCallback onTap;
  final bool accent;

  @override
  Widget build(BuildContext context) {
    return AspectRatio(
      aspectRatio: 1.05,
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(17),
          child: Ink(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: accent ? const Color(0xFF170B0B) : const Color(0xFF111111),
              borderRadius: BorderRadius.circular(17),
              border: Border.all(
                color: accent
                    ? const Color(0xFFE33131)
                    : const Color(0xFF4A4A4A),
              ),
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  icon,
                  color: accent ? _red : const Color(0xFFD1D1D1),
                  size: 36,
                ),
                const SizedBox(height: 12),
                Text(
                  title,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontFamily: 'serif',
                    fontSize: 17,
                    color: Colors.white,
                    letterSpacing: -.8,
                  ),
                ),
                const SizedBox(height: 7),
                Text(
                  description,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    color: _muted,
                    fontSize: 10,
                    height: 1.45,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _CreateProcessSection extends StatelessWidget {
  const _CreateProcessSection();

  @override
  Widget build(BuildContext context) {
    const steps = [
      (Icons.graphic_eq_rounded, '신호 수집', '사진 속 빛, 색, 패턴을\n정밀하게 수집합니다.'),
      (Icons.scatter_plot_rounded, '비정상 신호 탐지', '일반적인 환경과 다른\n미세한 신호를 찾습니다.'),
      (Icons.radar_rounded, '존재 가능성 분석', '탐지된 신호의 패턴을\n분석해 가능성을 판단합니다.'),
    ];

    return Container(
      padding: const EdgeInsets.fromLTRB(12, 16, 12, 16),
      decoration: BoxDecoration(
        color: const Color(0xFF0A0A0A),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFF303030)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'AI 탐지는 이렇게 진행돼요',
            style: TextStyle(
              fontFamily: 'serif',
              fontSize: 16,
              color: Colors.white,
              letterSpacing: -.8,
            ),
          ),
          const SizedBox(height: 15),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              for (var i = 0; i < steps.length; i++)
                Expanded(
                  child: _CreateProcessStep(
                    icon: steps[i].$1,
                    title: steps[i].$2,
                    description: steps[i].$3,
                    number: i + 1,
                  ),
                ),
            ],
          ),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 11),
            decoration: BoxDecoration(
              color: const Color(0xFF1A0C0C),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: const Color(0xFF8F2424)),
            ),
            child: const Row(
              children: [
                Icon(Icons.auto_awesome, color: _red, size: 22),
                SizedBox(width: 10),
                Expanded(
                  child: Text.rich(
                    TextSpan(
                      style: TextStyle(
                        color: _muted,
                        fontSize: 10.5,
                        height: 1.5,
                      ),
                      children: [
                        TextSpan(text: 'GhostCam은 '),
                        TextSpan(
                          text: 'AI',
                          style: TextStyle(color: _red),
                        ),
                        TextSpan(text: ' 기술을 통해 사진 속 미세한 신호를 탐지하여\n사용자가 '),
                        TextSpan(
                          text: '인지하지 못하는 존재의 흔적',
                          style: TextStyle(color: _red),
                        ),
                        TextSpan(text: '을 찾아냅니다.'),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _CreateProcessStep extends StatelessWidget {
  const _CreateProcessStep({
    required this.icon,
    required this.title,
    required this.description,
    required this.number,
  });

  final IconData icon;
  final String title;
  final String description;
  final int number;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 2),
      child: Column(
        children: [
          Container(
            width: 42,
            height: 42,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(color: const Color(0xFF662020)),
            ),
            child: Icon(icon, color: const Color(0xFFD8D8D8), size: 21),
          ),
          const SizedBox(height: 7),
          FittedBox(
            fit: BoxFit.scaleDown,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 17,
                  height: 17,
                  alignment: Alignment.center,
                  decoration: const BoxDecoration(
                    color: _red,
                    shape: BoxShape.circle,
                  ),
                  child: Text(
                    '$number',
                    style: const TextStyle(color: Colors.black, fontSize: 10),
                  ),
                ),
                const SizedBox(width: 3),
                Text(
                  title,
                  maxLines: 1,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 10,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 5),
          Text(
            description,
            textAlign: TextAlign.center,
            style: const TextStyle(color: _muted, fontSize: 9.8, height: 1.4),
          ),
        ],
      ),
    );
  }
}

class _CreateEnvironmentSection extends StatelessWidget {
  const _CreateEnvironmentSection();

  @override
  Widget build(BuildContext context) {
    const items = [
      (Icons.group_outlined, '인물이 한 명 이상\n나오는 사진이 좋아요.'),
      (Icons.nightlight_outlined, '어두운 환경일수록\n탐지 정확도가 높아요.'),
      (Icons.meeting_room_outlined, '공간감이 느껴지는\n배경이 좋아요.'),
      (Icons.flash_off_outlined, '플래시는 끄고\n촬영하는 것을 추천해요.'),
    ];

    return Container(
      padding: const EdgeInsets.fromLTRB(12, 14, 12, 14),
      decoration: BoxDecoration(
        color: const Color(0xFF0A0A0A),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFF303030)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            '탐지가 잘 되는 환경',
            style: TextStyle(
              fontFamily: 'serif',
              fontSize: 15,
              color: Colors.white,
              letterSpacing: -.8,
            ),
          ),
          const SizedBox(height: 13),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              for (final item in items)
                Expanded(
                  child: Column(
                    children: [
                      Icon(item.$1, color: _red, size: 26),
                      const SizedBox(height: 6),
                      Text(
                        item.$2,
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          color: _muted,
                          fontSize: 9.5,
                          height: 1.4,
                        ),
                      ),
                    ],
                  ),
                ),
            ],
          ),
        ],
      ),
    );
  }
}
