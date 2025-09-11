import '../database.dart';

class CoursesTable extends SupabaseTable<CoursesRow> {
  @override
  String get tableName => 'courses';

  @override
  CoursesRow createRow(Map<String, dynamic> data) => CoursesRow(data);
}

class CoursesRow extends SupabaseDataRow {
  CoursesRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => CoursesTable();

  String get id => getField<String>('id')!;
  set id(String value) => setField<String>('id', value);

  String get name => getField<String>('name')!;
  set name(String value) => setField<String>('name', value);

  String get code => getField<String>('code')!;
  set code(String value) => setField<String>('code', value);

  String? get description => getField<String>('description');
  set description(String? value) => setField<String>('description', value);

  int get classId => getField<int>('class_id')!;
  set classId(int value) => setField<int>('class_id', value);

  String get teacherId => getField<String>('teacher_id')!;
  set teacherId(String value) => setField<String>('teacher_id', value);

  String get academicYear => getField<String>('academic_year')!;
  set academicYear(String value) => setField<String>('academic_year', value);

  String? get semester => getField<String>('semester');
  set semester(String? value) => setField<String>('semester', value);

  int? get credits => getField<int>('credits');
  set credits(int? value) => setField<int>('credits', value);

  String? get color => getField<String>('color');
  set color(String? value) => setField<String>('color', value);

  bool? get isActive => getField<bool>('is_active');
  set isActive(bool? value) => setField<bool>('is_active', value);

  DateTime? get createdAt => getField<DateTime>('created_at');
  set createdAt(DateTime? value) => setField<DateTime>('created_at', value);

  DateTime? get updatedAt => getField<DateTime>('updated_at');
  set updatedAt(DateTime? value) => setField<DateTime>('updated_at', value);
}
