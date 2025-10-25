import 'package:excel/excel.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:soul_path_lights/core/constants/excel.dart';
import 'package:soul_path_lights/presentation/screens/onboarding/states/next_flow.dart';
import 'package:soul_path_lights/presentation/screens/splash/splash_screen.dart';

late Excel excel;
Sheet? table;
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  ByteData data = await rootBundle.load("assets/excel/card_list.xlsx");
  var bytes = data.buffer.asUint8List();
  excel = Excel.decodeBytes(bytes);
  table = excel.tables[TABLE_NAME];
  await SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
  runApp(BlocProvider(create: (_) => NextFlowCounter(), child: const App()));
}

class App extends StatelessWidget {
  const App({super.key});
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return MaterialApp(home: const SplashScreen());
  }
}
