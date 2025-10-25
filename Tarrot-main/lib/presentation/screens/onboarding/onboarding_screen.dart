import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:soul_path_lights/core/constants/colors.dart';
import 'package:soul_path_lights/presentation/screens/onboarding/states/next_flow.dart';
import 'package:soul_path_lights/presentation/screens/onboarding/text.dart';
import 'package:soul_path_lights/presentation/screens/signup/sign_up_screen.dart';
import 'package:soul_path_lights/utils/navigation_animation.dart';

class OnboardingScreen extends StatelessWidget {
  OnboardingScreen({super.key});
  final List<Widget> widgets = [_firstFlow(), _secondFlow(), _thirdFlow()];
  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    final height = MediaQuery.of(context).size.height;
    // TODO: implement build
    return Scaffold(
      body: SafeArea(
        child: Container(
          margin: EdgeInsets.symmetric(vertical: height * .03),
          width: width,
          height: height,
          padding: EdgeInsets.symmetric(horizontal: 10),
          child: Column(
            children: [
              Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      BlocBuilder<NextFlowCounter, int>(
                        builder: (context, state) {
                          return Text(
                            "${state + 1} of 3",
                            style: TextStyle(fontSize: 17),
                          );
                        },
                      ),
                      (context.watch<NextFlowCounter>().state != 2)
                          ? GestureDetector(
                              onTap: () {},
                              child: Text(
                                "Skip",
                                style: TextStyle(
                                  fontSize: 17,
                                  color: AppColors.gray,
                                ),
                              ),
                            )
                          : SizedBox(),
                    ],
                  ),
                  SizedBox(height: 5),
                  Stack(
                    children: [
                      Container(
                        height: 6,
                        width: width,
                        decoration: BoxDecoration(
                          color: Color(0xffD2D2D2),
                          borderRadius: BorderRadius.circular(5),
                        ),
                      ),
                      BlocBuilder<NextFlowCounter, int>(
                        builder: (context, state) {
                          return Container(
                            height: 6,
                            width: (width / 3) * (state + 1),
                            decoration: BoxDecoration(
                              color: AppColors.pink,
                              borderRadius: BorderRadius.circular(5),
                            ),
                          );
                        },
                      ),
                    ],
                  ),
                ],
              ),
              Expanded(child: SizedBox()),
              BlocBuilder<NextFlowCounter, int>(
                builder: (context, state) {
                  return widgets[state];
                },
              ),
              Expanded(child: SizedBox()),
              GestureDetector(
                onTap: () {
                  if (context.read<NextFlowCounter>().state < 2) {
                    context.read<NextFlowCounter>().add(NextFlow());
                  } else {
                    Navigator.push(context, SlidePage(page: SignUpScreen()));
                  }
                },
                child: Container(
                  height: 50,
                  decoration: BoxDecoration(
                    color: AppColors.pink,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      (context.watch<NextFlowCounter>().state < 2)
                          ? Text(
                              "Next ",
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 18,
                              ),
                            )
                          : Text(
                              "Begin Your Journey ",
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 18,
                              ),
                            ),
                      Icon(
                        Icons.arrow_forward_ios,
                        color: Colors.white,
                        //size: 20,
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

//first flow
Widget _firstFlow() {
  return Column(
    children: [
      Container(
        width: 140,
        height: 140,
        decoration: BoxDecoration(
          color: AppColors.lightPink,
          shape: BoxShape.circle,
        ),
        child: Center(
          child: SvgPicture.asset(
            "assets/svg/lotus.svg",
            height: 100,
            width: 100,
          ),
        ),
      ),
      SizedBox(height: 10),
      Text(
        FirstFlowText.heading,
        style: TextStyle(fontSize: 24, color: AppColors.headingColor),
      ),
      Text(
        FirstFlowText.subHeading,
        textAlign: TextAlign.center,
        style: TextStyle(color: AppColors.gray),
      ),
    ],
  );
}

//second flow
Widget _secondFlow() {
  return Column(
    children: [
      Container(
        width: 140,
        height: 140,
        decoration: BoxDecoration(
          color: AppColors.lightPink,
          shape: BoxShape.circle,
        ),
        child: Center(
          child: SvgPicture.asset(
            "assets/svg/heart.svg",
            height: 100,
            width: 100,
          ),
        ),
      ),
      SizedBox(height: 10),
      Text(
        SecondFlowText.heading,
        style: TextStyle(fontSize: 24, color: AppColors.headingColor),
      ),
      Text(
        SecondFlowText.subHeading,
        textAlign: TextAlign.center,
        style: TextStyle(color: AppColors.gray),
      ),
    ],
  );
}

//third flow
Widget _thirdFlow() {
  return Column(
    children: [
      Container(
        width: 140,
        height: 140,
        decoration: BoxDecoration(
          color: AppColors.lightPink,
          shape: BoxShape.circle,
        ),
        child: Center(
          child: SvgPicture.asset("assets/svg/moon.svg", height: 80, width: 80),
        ),
      ),
      SizedBox(height: 10),
      Text(
        ThirdFlowText.heading,
        style: TextStyle(fontSize: 24, color: AppColors.headingColor),
      ),
      Text(
        ThirdFlowText.subHeading,
        textAlign: TextAlign.center,
        style: TextStyle(color: AppColors.gray),
      ),
    ],
  );
}
