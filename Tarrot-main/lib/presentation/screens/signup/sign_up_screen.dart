import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:soul_path_lights/core/constants/colors.dart';
import 'package:soul_path_lights/presentation/screens/login/log_in_screen.dart';
import 'package:soul_path_lights/utils/navigation_animation.dart';

class SignUpScreen extends StatelessWidget {
  const SignUpScreen({super.key});
  @override
  Widget build(BuildContext context) {
    var width = MediaQuery.of(context).size.width;
    var height = MediaQuery.of(context).size.height;
    // TODO: implement build
    return Scaffold(
      body: SizedBox(
        width: width,
        height: height,
        child: Stack(
          children: [
            Positioned(
              left: width * (-.55),
              top: height * (-.15),
              child: SvgPicture.asset("assets/svg/light_lotus.svg"),
            ),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 13),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(child: SizedBox()),
                  Text(
                    "Begin Your Journey",
                    style: TextStyle(
                      fontSize: 30,
                      color: AppColors.headingColor,
                    ),
                  ),
                  Text(
                    "Continue your sacred space",
                    style: TextStyle(color: AppColors.lightText, fontSize: 16),
                  ),
                  SizedBox(height: 15),
                  Text(
                    " Name",
                    style: TextStyle(
                      color: AppColors.headingColor,
                      fontSize: 16,
                    ),
                  ),
                  Container(
                    padding: EdgeInsets.symmetric(horizontal: 3),
                    decoration: BoxDecoration(
                      border: Border.all(color: Color(0xffD2D2D2)),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Row(
                      children: [
                        SvgPicture.asset(
                          "assets/svg/user_name.svg",
                          height: 20,
                          width: 20,
                          colorFilter: ColorFilter.mode(
                            AppColors.gray,
                            BlendMode.srcIn,
                          ),
                        ),
                        SizedBox(width: 5),
                        Expanded(
                          child: TextField(
                            decoration: InputDecoration(
                              border: InputBorder.none,
                              hintText: "Enter your name",
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 15),
                  Text(
                    " Email",
                    style: TextStyle(
                      color: AppColors.headingColor,
                      fontSize: 16,
                    ),
                  ),
                  Container(
                    padding: EdgeInsets.symmetric(horizontal: 3),
                    decoration: BoxDecoration(
                      border: Border.all(color: Color(0xffD2D2D2)),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Row(
                      children: [
                        Icon(
                          Icons.email_outlined,
                          size: 20,
                          color: AppColors.gray,
                        ),
                        SizedBox(width: 5),
                        Expanded(
                          child: TextField(
                            decoration: InputDecoration(
                              border: InputBorder.none,
                              hintText: "Enter your e-mail",
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 15),
                  Text(
                    " Password",
                    style: TextStyle(
                      color: AppColors.headingColor,
                      fontSize: 16,
                    ),
                  ),
                  Container(
                    padding: EdgeInsets.only(left: 3, right: 13),
                    decoration: BoxDecoration(
                      border: Border.all(color: Color(0xffD2D2D2)),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Row(
                      children: [
                        Icon(
                          Icons.lock_outline,
                          size: 22,
                          color: AppColors.gray,
                        ),
                        SizedBox(width: 5),
                        Expanded(
                          child: TextField(
                            decoration: InputDecoration(
                              border: InputBorder.none,
                              hintText: "Enter your password",
                            ),
                          ),
                        ),
                        Icon(Icons.visibility_outlined),
                      ],
                    ),
                  ),
                  SizedBox(height: 20),
                  GestureDetector(
                    onTap: () {},
                    child: Container(
                      height: 50,
                      decoration: BoxDecoration(
                        color: AppColors.pink,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Center(
                        child: Text(
                          "Sign Up",
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 18,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(height: 10),
                  Row(
                    children: [
                      Text(
                        "Already have an Account,",
                        style: TextStyle(
                          fontSize: 16,
                          color: AppColors.lightText,
                        ),
                      ),
                      GestureDetector(
                        onTap: () {
                          Navigator.pushReplacement(
                            context,
                            SlidePage(page: const LogInScreen()),
                          );
                        },
                        child: Text(
                          "  Sign In",
                          style: TextStyle(
                            fontSize: 18,
                            color: AppColors.headingColor,
                          ),
                        ),
                      ),
                    ],
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        "Or",
                        style: TextStyle(
                          fontSize: 20,
                          color: AppColors.lightText,
                        ),
                      ),
                    ],
                  ),
                  GestureDetector(
                    onTap: () {},
                    child: Container(
                      decoration: BoxDecoration(
                        border: Border.all(color: AppColors.lightText),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      height: 50,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          SvgPicture.asset("assets/svg/google.svg", height: 25),
                          Text(
                            "  Sign in with Google",
                            style: TextStyle(
                              color: AppColors.gray,
                              fontSize: 17,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  SizedBox(height: 15),
                  GestureDetector(
                    onTap: () {},
                    child: Container(
                      decoration: BoxDecoration(
                        border: Border.all(color: AppColors.lightText),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      height: 50,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            "Continue as Guest",
                            style: TextStyle(
                              color: AppColors.gray,
                              fontSize: 17,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  SizedBox(height: height * .08),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
