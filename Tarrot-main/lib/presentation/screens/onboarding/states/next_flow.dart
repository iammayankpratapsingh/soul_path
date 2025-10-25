import 'package:flutter_bloc/flutter_bloc.dart';

class NextFlow {}

class NextFlowCounter extends Bloc<NextFlow, int> {
  NextFlowCounter() : super(0) {
    on<NextFlow>((event, emit) {
      if (state < 2) {
        emit(state + 1);
      }
    });
  }
}
