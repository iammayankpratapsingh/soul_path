import 'dart:async';
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:soul_path_lights/core/constants/colors.dart';
import 'package:soul_path_lights/main.dart';
import 'package:soul_path_lights/presentation/screens/showdrawcard/show_card_screen.dart';
import 'package:soul_path_lights/utils/navigation_animation.dart';

class DrawCardScreen extends StatefulWidget {
  final int noOfCards;
  final String name;
  const DrawCardScreen({
    required this.noOfCards,
    required this.name,
    super.key,
  });
  @override
  State<StatefulWidget> createState() => _DrawCardScreen();
}

class _DrawCardScreen extends State<DrawCardScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  int noOfCards = 15;
  int drawCard = 0;
  late List<bool> list;
  bool isVisible = false;
  bool isAccepted = false;
  String image = "assets/images/card_back.png";
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    list = List.generate(noOfCards, (_) {
      return true;
    });
    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 500),
    );
    _animationController.addStatusListener((status) {
      if (status.isCompleted) {
        isVisible = true;
        setState(() {});
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    /*var width = MediaQuery.of(context).size.width;
    var height = MediaQuery.of(context).size.height;*/
    // TODO: implement build
    return Scaffold(
      appBar: AppBar(
        backgroundColor: AppColors.lightPink,
        centerTitle: true,
        title: Text(
          widget.name,
          style: TextStyle(color: AppColors.headingColor),
        ),
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios),
        ),
      ),
      body: SafeArea(
        child: Column(
          children: [
            SizedBox(height: 100),
            GestureDetector(
              onTap: () {
                list[noOfCards - 1] = true;
                _animationController.forward();
              },
              child: Stack(
                alignment: Alignment.center,
                children: List.generate(noOfCards, (index) {
                  return AnimatedBuilder(
                    animation: _animationController,
                    builder: (context, child) {
                      return Transform(
                        transform: Matrix4.identity()
                          ..translate(
                            list[index]
                                ? (-150.0 + (index * 20)) *
                                      _animationController.value
                                : 0.0,
                          )
                          ..rotateZ(
                            list[index]
                                ? ((-20.0 * (pi / 180.0)) *
                                      (_animationController.value))
                                : 0.0,
                          ),

                        child: Draggable<String>(
                          data: "assets/images/card_back.png",
                          feedback: Container(
                            decoration: BoxDecoration(
                              border: Border.all(color: Colors.grey, width: 2),
                              borderRadius: BorderRadius.circular(13),
                            ),
                            child: ClipRRect(
                              borderRadius: BorderRadius.circular(10),
                              child: Image.asset(
                                "assets/images/card_back.png",
                                height: 200,
                                width: 120,
                                fit: BoxFit.cover,
                              ),
                            ),
                          ),
                          child: Container(
                            decoration: BoxDecoration(
                              border: Border.all(color: Colors.grey, width: 2),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.grey,
                                  offset: Offset(-2, 2),
                                ),
                              ],
                              borderRadius: BorderRadius.circular(13),
                            ),
                            child: ClipRRect(
                              borderRadius: BorderRadius.circular(10),
                              child: Image.asset(
                                "assets/images/card_back.png",
                                height: 200,
                                width: 120,
                                fit: BoxFit.cover,
                              ),
                            ),
                          ),
                        ),
                      );
                    },
                  );
                }),
              ),
            ),

            Expanded(
              child: Center(
                child: Visibility(
                  visible: isVisible,
                  child: DragTarget<String>(
                    onAcceptWithDetails: (details) {
                      setState(() {
                        isAccepted = true;
                      });

                      Timer(Duration(milliseconds: 200), () {
                        Navigator.push(
                          context,
                          SlidePage(
                            page: ShowCardScreen(
                              image: excel
                                  .tables["names"]!
                                  .rows[Random().nextInt(79)][0]!
                                  .value
                                  .toString(),
                              title: widget.name,
                            ),
                          ),
                        );
                      });
                    },
                    builder: (context, accept, reject) {
                      return (isAccepted)
                          ? ClipRRect(
                              borderRadius: BorderRadius.circular(10),
                              child: Image.asset(
                                image,
                                height: 200,
                                width: 120,
                                fit: BoxFit.cover,
                              ),
                            )
                          : Container(
                              height: 200,
                              width: 120,
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(10),
                                border: Border.all(
                                  color: Colors.grey,
                                  width: 2,
                                ),
                              ),
                            );
                    },
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
