part of '../main.dart';

class CreatePage extends StatelessWidget {
  const CreatePage({super.key});

  void _openLoadingPage(BuildContext context) {
    Navigator.of(
      context,
    ).push(MaterialPageRoute(builder: (_) => const CreateLoadingPage()));
  }

  void _showComingSoon(BuildContext context) {
    ScaffoldMessenger.of(
      context,
    ).showSnackBar(const SnackBar(content: Text('이 기능은 준비 중입니다.')));
  }

  void _onTabSelected(BuildContext context, int index) {
    if (index == 0) {
      Navigator.of(context).pop();
    } else if (index != 2) {
      _showComingSoon(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _background,
      body: SafeArea(
        bottom: false,
        child: SingleChildScrollView(
          physics: const ClampingScrollPhysics(),
          padding: const EdgeInsets.only(bottom: 18),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Padding(
                padding: const EdgeInsets.fromLTRB(12, 10, 18, 0),
                child: SizedBox(
                  height: 50,
                  child: Row(
                    children: [
                      IconButton(
                        onPressed: () => Navigator.of(context).pop(),
                        icon: const Icon(Icons.arrow_back_ios_new_rounded),
                        iconSize: 22,
                        color: Colors.white,
                        padding: EdgeInsets.zero,
                        constraints: const BoxConstraints(
                          minWidth: 36,
                          minHeight: 36,
                        ),
                      ),
                      const Expanded(
                        child: Center(
                          child: Text.rich(
                            TextSpan(
                              style: TextStyle(
                                fontFamily: 'serif',
                                fontSize: 28,
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
              ),
              const Padding(
                padding: EdgeInsets.fromLTRB(18, 17, 18, 0),
                child: _CreateProgress(),
              ),
              const SizedBox(height: 28),
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 18),
                child: Text.rich(
                  TextSpan(
                    style: TextStyle(
                      fontFamily: 'serif',
                      fontSize: 25,
                      height: 1.25,
                      letterSpacing: -1.3,
                      color: Colors.white,
                    ),
                    children: [
                      TextSpan(text: '사진을 선택하거나\n촬영하여 '),
                      TextSpan(
                        text: '업로드',
                        style: TextStyle(color: _red),
                      ),
                      TextSpan(text: '해주세요'),
                    ],
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
              const SizedBox(height: 10),
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 24),
                child: Text(
                  'AI가 사진 속 미세한 신호를 분석해\n눈에 보이지 않는 존재를 탐지합니다.',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: _muted, fontSize: 12, height: 1.5),
                ),
              ),
              const SizedBox(height: 22),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 18),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: _CreateChoiceCard(
                        icon: Icons.file_upload_outlined,
                        title: '앨범에서 선택',
                        description: '기기에 저장된 사진을\n선택하여 업로드합니다.',
                        accent: true,
                        onTap: () => _openLoadingPage(context),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: _CreateChoiceCard(
                        icon: Icons.camera_alt_outlined,
                        title: '카메라로 촬영',
                        description: '지금 바로 촬영하여\n업로드합니다.',
                        onTap: () => _openLoadingPage(context),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 22),
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 18),
                child: _CreateProcessSection(),
              ),
              const SizedBox(height: 16),
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 18),
                child: _CreateEnvironmentSection(),
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: AppBottomNavigation(
        selectedIndex: 2,
        onTabSelected: (index) => _onTabSelected(context, index),
      ),
    );
  }
}
