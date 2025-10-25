import 'package:flutter/material.dart';
import 'package:soul_path_lights/core/constants/colors.dart';
import 'package:soul_path_lights/presentation/screens/drawcard/draw_card_screen.dart';
import 'package:soul_path_lights/utils/navigation_animation.dart';

class SpreadScreen extends StatefulWidget {
  const SpreadScreen({super.key});
  @override
  State<SpreadScreen> createState() => _SpreadScreen();
}

class _SpreadScreen extends State<SpreadScreen> {
  List<dynamic> list = ["Zero", "One", "Two", "Three", "Four", "Five", "Six"];
  @override
  Widget build(BuildContext context) {
    print("bharat");
    // TODO: implement build
    return ListView.builder(
      itemBuilder: (context, index) {
        if (index > 0 && index < list.length - 1) {
          return GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                SlidePage(
                  page: DrawCardScreen(
                    noOfCards: index,
                    name: list[index] + " Cards",
                  ),
                ),
              );
            },
            child: _oneTwoFiveCards(index: index, name: list[index]),
          );
        } else if (index == 0) {
          return GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                SlidePage(
                  page: DrawCardScreen(noOfCards: 1, name: "Daily Reading"),
                ),
              );
            },
            child: _dailyCard(),
          );
        } else {
          return GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                SlidePage(page: DrawCardScreen(noOfCards: 1, name: "Yes/No")),
              );
            },
            child: _yesNoCard(),
          );
        }
      },
      itemCount: list.length,
    );
  }
}

// Daily Card Widget function
Widget _dailyCard() {
  return Container(
    margin: EdgeInsets.symmetric(vertical: 7),
    padding: EdgeInsets.all(10),
    decoration: BoxDecoration(
      color: AppColors.lightPink,
      border: Border.all(color: AppColors.gray),
      borderRadius: BorderRadius.circular(10),
    ),
    child: Column(
      children: [
        Row(
          children: [
            Image.asset("assets/images/daily.png", height: 30, width: 30),
            SizedBox(width: 7),
            Text(
              "Daily Reading",
              style: TextStyle(
                fontSize: 18,
                color: AppColors.headingColor,
                fontWeight: FontWeight.w700,
              ),
            ),
          ],
        ),
        SizedBox(height: 7),
        Text(
          "A special reading that gives you guidance for the day ahead.",
          style: TextStyle(color: AppColors.lightText),
        ),
      ],
    ),
  );
}

//Yes No card function
Widget _yesNoCard() {
  return Container(
    margin: EdgeInsets.symmetric(vertical: 7),
    padding: EdgeInsets.all(10),
    decoration: BoxDecoration(
      color: AppColors.lightPink,
      border: Border.all(color: AppColors.gray),
      borderRadius: BorderRadius.circular(10),
    ),
    child: Column(
      children: [
        Row(
          children: [
            Image.asset("assets/images/yes_no.png", height: 30, width: 30),
            SizedBox(width: 7),
            Text(
              "Yes/No",
              style: TextStyle(
                fontSize: 18,
                color: AppColors.headingColor,
                fontWeight: FontWeight.w700,
              ),
            ),
          ],
        ),
        SizedBox(height: 7),
        Text(
          "Provides a clear, concise answer to a specific yes-or-no question.",
          style: TextStyle(color: AppColors.lightText),
        ),
      ],
    ),
  );
}

//One To Five Card function
Widget _oneTwoFiveCards({required int index, required String name}) {
  return Container(
    margin: EdgeInsets.symmetric(vertical: 7),
    padding: EdgeInsets.all(10),
    decoration: BoxDecoration(
      color: AppColors.lightPink,
      border: Border.all(color: AppColors.gray),
      borderRadius: BorderRadius.circular(10),
    ),
    child: Column(
      children: [
        Row(
          children: [
            Container(
              padding: EdgeInsets.symmetric(horizontal: 10),
              decoration: BoxDecoration(
                color: AppColors.pink,
                borderRadius: BorderRadius.circular(10),
              ),
              child: Text(
                "$index",
                style: TextStyle(fontWeight: FontWeight.w700, fontSize: 25),
              ),
            ),
            SizedBox(width: 7),
            Text(
              "$name Card",
              style: TextStyle(
                fontSize: 18,
                color: AppColors.headingColor,
                fontWeight: FontWeight.w700,
              ),
            ),
          ],
        ),
        SizedBox(height: 7),
        Text(
          "Provides a clear, concise answer to a specific yes-or-no question.",
          style: TextStyle(color: AppColors.lightText),
        ),
      ],
    ),
  );
}
