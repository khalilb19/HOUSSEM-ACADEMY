import '../database.dart';

class AttendanceSessionsTable extends SupabaseTable<AttendanceSessionsRow> {
  @override
  String get tableName => 'attendance_sessions';

  @override
  AttendanceSessionsRow createRow(Map<String, dynamic> data) =>
      AttendanceSessionsRow(data);
}

class AttendanceSessionsRow extends SupabaseDataRow {
  AttendanceSessionsRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => AttendanceSessionsTable();

  String get id => getField<String>('id')!;
  set id(String value) => setField<String>('id', value);

  int get classId => getField<int>('class_id')!;
  set classId(int value) => setField<int>('class_id', value);

  String get teacherId => getField<String>('teacher_id')!;
  set teacherId(String value) => setField<String>('teacher_id', value);

  String get subject => getField<String>('subject')!;
  set subject(String value) => setField<String>('subject', value);

  DateTime get sessionDate => getField<DateTime>('session_date')!;
  set sessionDate(DateTime value) => setField<DateTime>('session_date', value);

  PostgresTime get startTime => getField<PostgresTime>('start_time')!;
  set startTime(PostgresTime value) =>
      setField<PostgresTime>('start_time', value);

  PostgresTime get endTime => getField<PostgresTime>('end_time')!;
  set endTime(PostgresTime value) => setField<PostgresTime>('end_time', value);

  String get status => getField<String>('status')!;
  set status(String value) => setField<String>('status', value);

  String? get notes => getField<String>('notes');
  set notes(String? value) => setField<String>('notes', value);

  DateTime? get createdAt => getField<DateTime>('created_at');
  set createdAt(DateTime? value) => setField<DateTime>('created_at', value);

  DateTime? get updatedAt => getField<DateTime>('updated_at');
  set updatedAt(DateTime? value) => setField<DateTime>('updated_at', value);
}
