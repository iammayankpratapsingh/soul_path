import 'dart:io';

import 'package:path/path.dart';
import 'package:path_provider/path_provider.dart';
import 'package:sqflite/sqflite.dart';

class DbHelper {
  DbHelper._();
  static final DbHelper getInstance = DbHelper._();
  //table history
  static final String TABLE = "history";
  static final String CARDS = "cards";
  static final String DATA = "data";
  static final String DATE_TIME = "dateTime";
  static final String ID = "id";

  Database? myDB;

  Future<Database> getDB() async {
    myDB = myDB ?? await openDB();
    return myDB!;
    /*if (myDB != null) {
      return myDB!;
    } else {
      myDB = await openDB();
      return myDB!;
    }*/
  }

  Future<Database> openDB() async {
    Directory dirPath = await getApplicationDocumentsDirectory();
    String dbPath = join(dirPath.path, "history.db");

    return await openDatabase(
      dbPath,
      onCreate: (db, version) {
        db.execute(
          "create table $TABLE ($ID integer primary key autoincrement,$CARDS text,$DATA text,$DATE_TIME text)",
        );
      },
      version: 1,
    );
  }
}
