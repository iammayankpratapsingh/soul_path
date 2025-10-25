import 'dart:math';

import 'package:flutter/material.dart';
import 'package:soul_path_lights/core/constants/colors.dart';
import 'package:soul_path_lights/main.dart';

class ShowCardDetail extends StatelessWidget {
  final int index;
  const ShowCardDetail({super.key, required this.index});
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Scaffold(
      appBar: AppBar(
        elevation: 10.0,
        backgroundColor: AppColors.lightPink,
        centerTitle: true,
        title: Text(
          table!.rows[index][0]!.value.toString(),
          style: TextStyle(color: AppColors.headingColor),
        ),
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios),
        ),
      ),
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: 10),
        child: singleCardView(index: index),
      ),
    );
  }
}

//single card detail widget
Widget singleCardView({required int index}) {
  List<String> list = table!.rows[index][2]!.value.toString().split(",");
  return SingleChildScrollView(
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(height: 15),
        ClipRRect(
          borderRadius: BorderRadius.circular(20),
          child: SizedBox(
            width: double.maxFinite,
            child: Image.asset(
              "assets/images/$index.png",
              height: 450,
              width: 300,
              fit: BoxFit.fill,
            ),
          ),
        ),
        SizedBox(height: 10),
        Text(
          style: TextStyle(fontSize: 16),
          "bsjha jhahfjhsfbjhbbsdfsuvf biusdfsibfs sdfbisbf sdfbsu sudfb sudf sdfs dufyv bsjha jhahfjhsfbjhbbsdfsuvf biusdfsibfs sdfbisbf sdfbsu sudfb sudf sdfs dufyv bsjha jhahfjhsfbjhbbsdfsuvf biusdfsibfs sdfbisbf sdfbsu sudfb sudf sdfs dufyv bsjha jhahfjhsfbjhbbsdfsuvf biusdfsibfs sdfbisbf sdfbsu sudfb sudf sdfs dufyv bsjha jhahfjhsfbjhbbsdfsuvf biusdfsibfs sdfbisbf sdfbsu sudfb sudf sdfs dufyv bsjha jhahfjhsfbjhbbsdfsuvf biusdfsibfs sdfbisbf sdfbsu sudfb sudf sdfs dufyv v",
        ),
        SizedBox(height: 15),
        Text(
          "Key meanings",
          style: TextStyle(fontSize: 20, color: AppColors.headingColor),
        ),
        SizedBox(height: 5),
        Wrap(
          spacing: 10,
          runSpacing: 8,
          children: list.map((e) {
            return Container(
              padding: EdgeInsets.symmetric(horizontal: 10, vertical: 5),
              decoration: BoxDecoration(
                color: Colors.primaries[Random().nextInt(18)],
                borderRadius: BorderRadius.circular(10),
              ),
              child: Text(e),
            );
          }).toList(),
        ),
        SizedBox(height: 40),
      ],
    ),
  );
}
