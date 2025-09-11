import '../database.dart';

class AttendanceRecordsTable extends SupabaseTable<AttendanceRecordsRow> {
  @override
  String get tableName => 'attendance_records';

  @override
  AttendanceRecordsRow createRow(Map<String, dynamic> data) =>
      AttendanceRecordsRow(data);
}

class AttendanceRecordsRow extends SupabaseDataRow {
  AttendanceRecordsRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => AttendanceRecordsTable();

  String get id => getField<String>('id')!;
  set id(String value) => setField<String>('id', value);

  String get sessionId => getField<String>('session_id')!;
  set sessionId(String value) => setField<String>('session_id', value);

  String get studentId => getField<String>('student_id')!;
  set studentId(String value) => setField<String>('student_id', value);

  String get status => getField<String>('status')!;
  set status(String value) => setField<String>('status', value);

  PostgresTime? get arrivalTime => getField<PostgresTime>('arrival_time');
  set arrivalTime(PostgresTime? value) =>
      setField<PostgresTime>('arrival_time', value);

  String? get notes => getField<String>('notes');
  set notes(String? value) => setField<String>('notes', value);

  String? get markedBy => getField<String>('marked_by');
  set markedBy(String? value) => setField<String>('marked_by', value);

  DateTime? get markedAt => getField<DateTime>('marked_at');
  set markedAt(DateTime? value) => setField<DateTime>('marked_at', value);

  DateTime? get createdAt => getField<DateTime>('created_at');
  set createdAt(DateTime? value) => setField<DateTime>('created_at', value);
}
