import '../database.dart';

class AcademicLevelsTable extends SupabaseTable<AcademicLevelsRow> {
  @override
  String get tableName => 'academic_levels';

  @override
  AcademicLevelsRow createRow(Map<String, dynamic> data) =>
      AcademicLevelsRow(data);
}

class AcademicLevelsRow extends SupabaseDataRow {
  AcademicLevelsRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => AcademicLevelsTable();

  int get id => getField<int>('id')!;
  set id(int value) => setField<int>('id', value);

  DateTime get createdAt => getField<DateTime>('created_at')!;
  set createdAt(DateTime value) => setField<DateTime>('created_at', value);

  String get name => getField<String>('name')!;
  set name(String value) => setField<String>('name', value);
}
