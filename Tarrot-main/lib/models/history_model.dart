import 'package:soul_path_lights/database/db_helper.dart';

class HistoryModel {
  int? id;
  String cards;
  String data;
  String dateTime;

  //constructor
  HistoryModel({
    this.id,
    required this.cards,
    required this.data,
    required this.dateTime,
  });

  //To convert into map
  Map<String, String> toMap() {
    return {"cards": cards, "data": data, "dateTime": dateTime};
  }

  //To convert map to class object
  factory HistoryModel.fromMap(Map<String, dynamic> map) {
    return HistoryModel(
      id: map[DbHelper.ID] as int,
      cards: map[DbHelper.CARDS]!,
      data: map[DbHelper.DATA]!,
      dateTime: map[DbHelper.DATE_TIME]!,
    );
  }
}
