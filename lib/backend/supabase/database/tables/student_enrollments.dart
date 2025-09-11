import '../database.dart';

class StudentEnrollmentsTable extends SupabaseTable<StudentEnrollmentsRow> {
  @override
  String get tableName => 'student_enrollments';

  @override
  StudentEnrollmentsRow createRow(Map<String, dynamic> data) =>
      StudentEnrollmentsRow(data);
}

class StudentEnrollmentsRow extends SupabaseDataRow {
  StudentEnrollmentsRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => StudentEnrollmentsTable();

  String get id => getField<String>('id')!;
  set id(String value) => setField<String>('id', value);

  String get studentId => getField<String>('student_id')!;
  set studentId(String value) => setField<String>('student_id', value);

  int get classId => getField<int>('class_id')!;
  set classId(int value) => setField<int>('class_id', value);

  DateTime? get enrolledAt => getField<DateTime>('enrolled_at');
  set enrolledAt(DateTime? value) => setField<DateTime>('enrolled_at', value);
}
