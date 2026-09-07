import 'dart:math' as math;
import 'dart:ui' as ui;

import 'package:flutter/material.dart';

part 'widgets/shared_widgets.dart';
part 'widgets/app_bottom_nav.dart';
part 'widgets/create_widgets.dart';
part 'pages/home_page.dart';
part 'pages/create_page.dart';
part 'pages/loading_page.dart';

const _red = Color(0xFFFF3B3B);
const _background = Color(0xFF030303);
const _panel = Color(0xFF111111);
const _panelLight = Color(0xFF171717);
const _muted = Color(0xFFB5B5B5);

void main() {
  runApp(const GhostCamApp());
}

class GhostCamApp extends StatelessWidget {
  const GhostCamApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'GhostCam',
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: _background,
        splashColor: _red.withValues(alpha: .12),
        highlightColor: Colors.transparent,
        fontFamily: 'sans-serif',
        colorScheme: ColorScheme.fromSeed(
          seedColor: _red,
          brightness: Brightness.dark,
        ),
      ),
      home: const HomePage(),
    );
  }
}
