import '../database.dart';

class TeacherClassesTable extends SupabaseTable<TeacherClassesRow> {
  @override
  String get tableName => 'teacher_classes';

  @override
  TeacherClassesRow createRow(Map<String, dynamic> data) =>
      TeacherClassesRow(data);
}

class TeacherClassesRow extends SupabaseDataRow {
  TeacherClassesRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => TeacherClassesTable();

  String get id => getField<String>('id')!;
  set id(String value) => setField<String>('id', value);

  String get teacherId => getField<String>('teacher_id')!;
  set teacherId(String value) => setField<String>('teacher_id', value);

  int get classId => getField<int>('class_id')!;
  set classId(int value) => setField<int>('class_id', value);

  DateTime? get createdAt => getField<DateTime>('created_at');
  set createdAt(DateTime? value) => setField<DateTime>('created_at', value);
}
