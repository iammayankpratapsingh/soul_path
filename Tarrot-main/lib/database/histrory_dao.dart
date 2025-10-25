import 'package:soul_path_lights/database/db_helper.dart';
import 'package:soul_path_lights/models/history_model.dart';

class HistroryDao {
  final dbHelper = DbHelper.getInstance;

  //To add history data
  Future<bool> addtHistory(Map<String, String> map) async {
    var db = await dbHelper.getDB();
    int rawAffected = await db.insert(DbHelper.TABLE, {
      DbHelper.CARDS: map["cards"],
      DbHelper.DATA: map["data"],
      DbHelper.DATE_TIME: map["dateTime"],
    });
    return rawAffected > 0;
  }

  //To get history data
  Future<List<HistoryModel>> getHistory() async {
    var db = await dbHelper.getDB();
    List<Map<String, dynamic>> mData = await db.query(DbHelper.TABLE);
    List<HistoryModel> list = mData.map((map) {
      return HistoryModel.fromMap(map);
    }).toList();
    return list;
  }

  //To delete history
  Future<bool> deleteHistory({required int id}) async {
    var db = await dbHelper.getDB();
    var rawAffected = await db.delete(
      DbHelper.TABLE,
      where: "id = ?",
      whereArgs: [id],
    );
    return rawAffected > 0;
  }
}
