import 'package:flutter/material.dart';
import 'package:soul_path_lights/core/constants/colors.dart';
import 'package:soul_path_lights/main.dart';
import 'package:soul_path_lights/presentation/screens/showcard/show_card_detail.dart';
import 'package:soul_path_lights/utils/navigation_animation.dart';

class CardsScreen extends StatefulWidget {
  const CardsScreen({super.key});
  @override
  State<CardsScreen> createState() => _CardsScreen();
}

class _CardsScreen extends State<CardsScreen> {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return ListView.builder(
      itemBuilder: (context, index) {
        return GestureDetector(
          onTap: () {
            Navigator.push(
              context,
              SlidePage(page: ShowCardDetail(index: index + 1)),
            );
          },
          child: cardView(index: index),
        );
      },
      itemCount: 78,
    );
  }
}

//card view Widget function
Widget cardView({required int index}) {
  return Container(
    margin: EdgeInsets.symmetric(vertical: 7),
    child: Row(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Image.asset("assets/images/${index + 1}.png", height: 100, width: 60),
        SizedBox(width: 10),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                "${table!.rows[index + 1][0]!.value}",
                style: TextStyle(
                  fontSize: 18,
                  color: AppColors.headingColor,
                  fontWeight: FontWeight.w700,
                ),
              ),
              Text(
                "A special reading that gives you guidance for the day ahead. A special reading that gives you guidance for the day ahead A special reading that gives you guidance for the day ahead A special reading that gives you guidance for the day ahead A special reading that gives you guidance for the day ahead A special reading that gives you guidance for the day ahead",
                style: TextStyle(color: AppColors.lightText),
                //overflow: TextOverflow.ellipsis,
                maxLines: 4,
              ),
              Divider(color: AppColors.gray),
            ],
          ),
        ),
      ],
    ),
  );
}
