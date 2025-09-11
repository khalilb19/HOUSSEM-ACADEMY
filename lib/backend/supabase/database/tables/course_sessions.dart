import '../database.dart';

class CourseSessionsTable extends SupabaseTable<CourseSessionsRow> {
  @override
  String get tableName => 'course_sessions';

  @override
  CourseSessionsRow createRow(Map<String, dynamic> data) =>
      CourseSessionsRow(data);
}

class CourseSessionsRow extends SupabaseDataRow {
  CourseSessionsRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => CourseSessionsTable();

  String get id => getField<String>('id')!;
  set id(String value) => setField<String>('id', value);

  String get courseId => getField<String>('course_id')!;
  set courseId(String value) => setField<String>('course_id', value);

  String? get scheduleId => getField<String>('schedule_id');
  set scheduleId(String? value) => setField<String>('schedule_id', value);

  DateTime get sessionDate => getField<DateTime>('session_date')!;
  set sessionDate(DateTime value) => setField<DateTime>('session_date', value);

  PostgresTime get startTime => getField<PostgresTime>('start_time')!;
  set startTime(PostgresTime value) =>
      setField<PostgresTime>('start_time', value);

  PostgresTime get endTime => getField<PostgresTime>('end_time')!;
  set endTime(PostgresTime value) => setField<PostgresTime>('end_time', value);

  String? get room => getField<String>('room');
  set room(String? value) => setField<String>('room', value);

  String get status => getField<String>('status')!;
  set status(String value) => setField<String>('status', value);

  String? get topic => getField<String>('topic');
  set topic(String? value) => setField<String>('topic', value);

  String? get notes => getField<String>('notes');
  set notes(String? value) => setField<String>('notes', value);

  bool? get isExam => getField<bool>('is_exam');
  set isExam(bool? value) => setField<bool>('is_exam', value);

  bool? get isMakeup => getField<bool>('is_makeup');
  set isMakeup(bool? value) => setField<bool>('is_makeup', value);

  DateTime? get createdAt => getField<DateTime>('created_at');
  set createdAt(DateTime? value) => setField<DateTime>('created_at', value);

  DateTime? get updatedAt => getField<DateTime>('updated_at');
  set updatedAt(DateTime? value) => setField<DateTime>('updated_at', value);
}
