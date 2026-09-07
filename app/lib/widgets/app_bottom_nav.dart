part of '../main.dart';

class AppBottomNavigation extends StatelessWidget {
  const AppBottomNavigation({
    super.key,
    required this.selectedIndex,
    required this.onTabSelected,
  });

  final int selectedIndex;
  final ValueChanged<int> onTabSelected;

  @override
  Widget build(BuildContext context) {
    const items = [
      (Icons.home_outlined, '홈'),
      (Icons.radar_rounded, '탐지'),
      (Icons.camera_alt_outlined, '생성'),
      (Icons.description_outlined, '기록'),
      (Icons.settings_outlined, '설정'),
    ];

    return SafeArea(
      top: false,
      child: Container(
        height: 64,
        decoration: const BoxDecoration(
          color: Color(0xFF0B0B0B),
          border: Border(top: BorderSide(color: Color(0xFF292929))),
        ),
        padding: const EdgeInsets.fromLTRB(8, 4, 8, 0),
        child: Row(
          children: [
            for (var i = 0; i < items.length; i++)
              Expanded(
                child: GestureDetector(
                  onTap: () => onTabSelected(i),
                  behavior: HitTestBehavior.opaque,
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(
                        items[i].$1,
                        color: selectedIndex == i
                            ? _red
                            : const Color(0xFF969696),
                        size: 23,
                      ),
                      const SizedBox(height: 4),
                      Text(
                        items[i].$2,
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: selectedIndex == i
                              ? _red
                              : const Color(0xFF969696),
                          fontSize: 10,
                          height: 1.1,
                          letterSpacing: -.1,
                        ),
                      ),
                      const SizedBox(height: 3),
                      AnimatedContainer(
                        duration: const Duration(milliseconds: 160),
                        height: 2,
                        width: 30,
                        decoration: BoxDecoration(
                          color: selectedIndex == i ? _red : Colors.transparent,
                          borderRadius: BorderRadius.circular(3),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
