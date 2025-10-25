import 'package:flutter/material.dart';
import 'package:soul_path_lights/core/constants/colors.dart';
import 'package:soul_path_lights/presentation/screens/paymentscreen/payment_screen.dart';
import 'package:soul_path_lights/utils/navigation_animation.dart';

class HistroryScreen extends StatefulWidget {
  const HistroryScreen({super.key});
  @override
  State<HistroryScreen> createState() => _HistroryScreen();
}

class _HistroryScreen extends State<HistroryScreen> {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return ListView.builder(
      itemBuilder: (context, index) {
        return GestureDetector(
          onTap: () {
            Navigator.push(context, SlidePage(page: const PaymentScreen()));
          },
          child: historyCardView(noOfCards: 5, index: index),
        );
      },
      itemCount: 20,
    );
  }
}

//Cards widget function
Widget historyCardView({required int noOfCards, required int index}) {
  return Dismissible(
    direction: DismissDirection.endToStart,
    key: Key(index.toString()),
    background: Container(
      alignment: Alignment.centerRight,
      padding: EdgeInsets.only(right: 20),
      color: Colors.red,
      child: Icon(Icons.delete, color: Colors.white, size: 60),
    ),
    child: Card(
      color: AppColors.lightPink,
      shape: RoundedRectangleBorder(),
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: 10, vertical: 7),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Stack(
              alignment: Alignment.topLeft,
              children: List.generate(noOfCards, (index) {
                int e = noOfCards - (index);
                return Container(
                  decoration: BoxDecoration(
                    border: Border(
                      right: BorderSide(color: Colors.white, width: 2),
                    ),
                  ),
                  child: Image.asset(
                    "assets/images/$e.png",
                    height: 60,
                    width: ((e - 1) * 10) + 30,
                    fit: BoxFit.fill,
                  ),
                );
              }),
            ),
            SizedBox(width: 10),
            Expanded(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
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
                          "5",
                          style: TextStyle(
                            fontWeight: FontWeight.w700,
                            fontSize: 25,
                          ),
                        ),
                      ),
                      SizedBox(width: 7),
                      Text(
                        "One Card",
                        style: TextStyle(
                          fontSize: 18,
                          color: AppColors.headingColor,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 3),
                  Text(
                    "A special reading that gives you guidance for the day ahead. A special reading that gives you guidance for the day ahead A special reading that gives you guidance for the day ahead A special reading that gives you guidance for the day ahead A special reading that gives you guidance for the day ahead A special reading that gives you guidance for the day ahead",
                    style: TextStyle(color: AppColors.lightText),
                    overflow: TextOverflow.ellipsis,
                    maxLines: 1,
                  ),
                  Text(
                    "Jul 11,2025-03:57PM",
                    style: TextStyle(color: AppColors.lightText),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    ),
  );
}
