import 'package:flutter/material.dart';
import 'package:soul_path_lights/core/constants/colors.dart';
import 'package:soul_path_lights/presentation/screens/dashboard/tabscreens/card_tab/cards_screen.dart';
import 'package:soul_path_lights/presentation/screens/dashboard/tabscreens/history_tab/histrory_screen.dart';
import 'package:soul_path_lights/presentation/screens/dashboard/tabscreens/spread_tab/spread_screen.dart';

class DashBoardScreen extends StatefulWidget {
  const DashBoardScreen({super.key});
  @override
  State<DashBoardScreen> createState() => _DashBoardScreen();
}

class _DashBoardScreen extends State<DashBoardScreen> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  List<Widget> screens = [SpreadScreen(), HistroryScreen(), CardsScreen()];
  List<String> items = ["Spreads", "History", "Cards"];
  late List<bool> visibleList = [true, false, false];
  int currentIndex = 0;

  void _enableAndDisableTab({required int current}) {
    visibleList[currentIndex] = false;
    visibleList[current] = true;
    currentIndex = current;
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Scaffold(
      key: _scaffoldKey,
      appBar: AppBar(
        automaticallyImplyLeading: false,
        elevation: 5.0,
        backgroundColor: AppColors.lightPink,
        title: Text(
          "Soul Path Lights",
          style: TextStyle(
            fontSize: 23,
            //fontWeight: FontWeight.w900,
            color: AppColors.headingColor,
            fontFamily: "Title",
          ),
        ),
        actions: [
          IconButton(
            onPressed: () {
              _scaffoldKey.currentState?.openDrawer();
            },
            icon: Icon(Icons.settings),
          ),
          SizedBox(width: 10),
        ],
      ),
      body: (currentIndex == 1)
          ? screens[currentIndex]
          : Padding(
              padding: EdgeInsetsGeometry.symmetric(horizontal: 10),
              child: screens[currentIndex],
            ),
      bottomNavigationBar: Material(
        elevation: 10.0,
        shadowColor: Colors.grey,
        child: Container(
          color: AppColors.lightPink,
          padding: EdgeInsets.symmetric(vertical: 15),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: items.asMap().entries.map((e) {
              return InkWell(
                onTap: () {
                  _enableAndDisableTab(current: e.key);
                },
                child: Container(
                  padding: EdgeInsets.symmetric(horizontal: 15, vertical: 7),
                  decoration: BoxDecoration(
                    color: (visibleList[e.key])
                        ? AppColors.pink
                        : Colors.transparent,
                    borderRadius: BorderRadius.circular(50),
                  ),
                  child: Text(
                    e.value,
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: (visibleList[e.key])
                          ? FontWeight.w800
                          : FontWeight.w500,
                    ),
                  ),
                ),
              );
            }).toList(),
          ),
        ),
      ),
      drawer: Drawer(
        backgroundColor: AppColors.lightPink,
        width: 300,
        shape: RoundedRectangleBorder(),
        shadowColor: Colors.grey,
      ),
      drawerEdgeDragWidth: 200,
      drawerScrimColor: Colors.transparent,
    );
  }
}
