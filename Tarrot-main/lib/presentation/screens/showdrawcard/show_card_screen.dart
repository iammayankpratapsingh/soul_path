import 'package:flutter/material.dart';
import 'package:soul_path_lights/core/constants/colors.dart';

class ShowCardScreen extends StatelessWidget {
  final String image;
  final String title;
  const ShowCardScreen({super.key, required this.image, required this.title});
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Scaffold(
      appBar: AppBar(
        backgroundColor: AppColors.lightPink,
        centerTitle: true,
        title: Text(title, style: TextStyle(color: AppColors.headingColor)),
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios_new_outlined),
        ),
      ),
      body: Center(child: Text(image)),
    );
  }
}
