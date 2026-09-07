part of '../main.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  bool _isScanning = false;
  int _selectedTab = 0;

  void _toggleScan() {
    setState(() => _isScanning = !_isScanning);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(_isScanning ? '실시간 탐지를 시작합니다.' : '탐지를 잠시 멈췄습니다.'),
        duration: const Duration(milliseconds: 1300),
        backgroundColor: const Color(0xFF252525),
      ),
    );
  }

  void _openCreatePage() {
    Navigator.of(
      context,
    ).push(MaterialPageRoute(builder: (_) => const CreatePage()));
  }

  void _onTabSelected(int index) {
    if (index == 2) {
      _openCreatePage();
      return;
    }
    setState(() => _selectedTab = index);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        left: false,
        right: false,
        bottom: false,
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                physics: const ClampingScrollPhysics(),
                padding: const EdgeInsets.only(top: 8),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 12),
                      child: _buildHeader(),
                    ),
                    _buildHero(),
                    const SizedBox(height: 24),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 18),
                      child: Column(
                        children: [
                          _buildActionCards(),
                          const SizedBox(height: 16),
                          _buildSystemStatus(),
                          const SizedBox(height: 16),
                          _buildGuide(),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            AppBottomNavigation(
              selectedIndex: _selectedTab,
              onTabSelected: _onTabSelected,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return SizedBox(
      height: 31,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 1),
            child: RichText(
              text: const TextSpan(
                style: TextStyle(
                  color: Colors.white,
                  fontFamily: 'serif',
                  fontSize: 25,
                  height: 1,
                  letterSpacing: -2.5,
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
          const Spacer(),
          Padding(
            padding: const EdgeInsets.only(top: 4, right: 2),
            child: Stack(
              clipBehavior: Clip.none,
              children: [
                const Icon(
                  Icons.notifications_none_rounded,
                  size: 25,
                  color: Colors.white,
                ),
                Positioned(
                  right: -2,
                  top: -1,
                  child: Container(
                    width: 8,
                    height: 8,
                    decoration: const BoxDecoration(
                      color: _red,
                      shape: BoxShape.circle,
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

  Widget _buildHero() {
    return AspectRatio(
      aspectRatio: 1.35,
      child: DecoratedBox(
        decoration: const BoxDecoration(
          border: Border(
            top: BorderSide(color: Color(0xFF292929)),
            bottom: BorderSide(color: Color(0xFF292929)),
          ),
        ),
        child: Stack(
          fit: StackFit.expand,
          children: [
            Image.asset(
              'assets/ghost-selfie-hero-v10.png',
              fit: BoxFit.cover,
              alignment: Alignment.center,
              filterQuality: FilterQuality.high,
            ),
            DecoratedBox(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.centerLeft,
                  end: Alignment.centerRight,
                  colors: [
                    Colors.black.withValues(alpha: .84),
                    Colors.black.withValues(alpha: .46),
                    Colors.black.withValues(alpha: .04),
                  ],
                  stops: const [0, .46, 1],
                ),
              ),
            ),
            DecoratedBox(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Colors.black.withValues(alpha: .12),
                    Colors.transparent,
                    Colors.black.withValues(alpha: .28),
                  ],
                  stops: const [0, .42, 1],
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(8, 22, 20, 24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const _Eyebrow(label: 'REALITY, WITH A LITTLE STATIC'),
                  const Spacer(flex: 2),
                  const Text.rich(
                    TextSpan(
                      style: TextStyle(
                        fontFamily: 'serif',
                        fontSize: 33,
                        height: 1.02,
                        color: Colors.white,
                        letterSpacing: -2.2,
                      ),
                      children: [
                        TextSpan(text: '네 옆에\n'),
                        TextSpan(
                          text: '귀신',
                          style: TextStyle(color: _red),
                        ),
                        TextSpan(text: '이 있다'),
                      ],
                    ),
                    textAlign: TextAlign.left,
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'AI가 당신의 사진을 살펴보고,\n눈에 보이지 않던 존재를 자연스럽게 보여드립니다.',
                    textAlign: TextAlign.left,
                    style: TextStyle(
                      color: Color(0xFFC0C0C0),
                      fontSize: 12,
                      height: 1.55,
                      letterSpacing: -.2,
                    ),
                  ),
                  const Spacer(flex: 2),
                  Row(
                    children: [
                      const _Dot(),
                      const SizedBox(width: 9),
                      Text(
                        _isScanning ? '스캔 진행 중' : '분석 준비 완료',
                        style: const TextStyle(
                          color: Color(0xFFD5D5D5),
                          fontSize: 12,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const Positioned(right: 24, top: 24, child: _CornerMark()),
          ],
        ),
      ),
    );
  }

  Widget _buildActionCards() {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          child: _ActionCard(
            eyebrow: 'LIVE SCAN',
            title: '탐지 시작',
            description: '실시간 스캔으로\n이상 징후를 감지합니다.',
            accent: true,
            onTap: _toggleScan,
            child: Image.asset(
              'assets/action-scan-art.png',
              fit: BoxFit.cover,
              alignment: Alignment.center,
            ),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: _ActionCard(
            eyebrow: 'CREATE FROM PHOTO',
            title: '사진으로 생성',
            description: '업로드한 사진 속에서\n이상 현상을 분석합니다.',
            accent: false,
            onTap: _openCreatePage,
            child: Image.asset(
              'assets/action-photo-art.png',
              fit: BoxFit.cover,
              alignment: Alignment.center,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildSystemStatus() {
    return _BorderPanel(
      padding: const EdgeInsets.fromLTRB(14, 15, 14, 15),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Row(
            children: [
              _Dot(),
              SizedBox(width: 9),
              Text('시스템 상태', style: TextStyle(fontSize: 13)),
            ],
          ),
          const SizedBox(height: 14),
          Row(
            children: [
              const _SystemStatus(
                icon: Icons.gps_fixed_rounded,
                label: '탐지 준비',
                value: '준비 완료',
              ),
              _homeDivider(),
              const _SystemStatus(
                icon: Icons.shield_outlined,
                label: '권한 상태',
                value: '허용됨',
              ),
              _homeDivider(),
              const _SystemStatus(
                icon: Icons.monitor_heart_outlined,
                label: '센서 상태',
                value: '정상',
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildGuide() {
    return _BorderPanel(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      child: Row(
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: const Color(0xFF251111),
              borderRadius: BorderRadius.circular(10),
            ),
            child: const Icon(Icons.menu_book_outlined, color: _red, size: 22),
          ),
          const SizedBox(width: 12),
          const Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '사용 가이드',
                  style: TextStyle(
                    fontSize: 16,
                    fontFamily: 'serif',
                    letterSpacing: -.7,
                  ),
                ),
                SizedBox(height: 3),
                Text(
                  '더 정확한 탐지를 위한 팁을 확인하세요.',
                  style: TextStyle(fontSize: 10, color: _muted),
                ),
              ],
            ),
          ),
          const Icon(
            Icons.chevron_right_rounded,
            size: 22,
            color: Color(0xFFBDBDBD),
          ),
        ],
      ),
    );
  }
}

Widget _homeDivider() => Container(
  width: 1,
  height: 46,
  margin: const EdgeInsets.symmetric(horizontal: 3),
  color: const Color(0xFF303030),
);
