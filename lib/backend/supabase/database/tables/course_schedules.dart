import '../database.dart';

class CourseSchedulesTable extends SupabaseTable<CourseSchedulesRow> {
  @override
  String get tableName => 'course_schedules';

  @override
  CourseSchedulesRow createRow(Map<String, dynamic> data) =>
      CourseSchedulesRow(data);
}

class CourseSchedulesRow extends SupabaseDataRow {
  CourseSchedulesRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => CourseSchedulesTable();

  String get id => getField<String>('id')!;
  set id(String value) => setField<String>('id', value);

  String get courseId => getField<String>('course_id')!;
  set courseId(String value) => setField<String>('course_id', value);

  int get dayOfWeek => getField<int>('day_of_week')!;
  set dayOfWeek(int value) => setField<int>('day_of_week', value);

  PostgresTime get startTime => getField<PostgresTime>('start_time')!;
  set startTime(PostgresTime value) =>
      setField<PostgresTime>('start_time', value);

  PostgresTime get endTime => getField<PostgresTime>('end_time')!;
  set endTime(PostgresTime value) => setField<PostgresTime>('end_time', value);

  String? get room => getField<String>('room');
  set room(String? value) => setField<String>('room', value);

  bool? get isActive => getField<bool>('is_active');
  set isActive(bool? value) => setField<bool>('is_active', value);

  DateTime get effectiveFrom => getField<DateTime>('effective_from')!;
  set effectiveFrom(DateTime value) =>
      setField<DateTime>('effective_from', value);

  DateTime? get effectiveUntil => getField<DateTime>('effective_until');
  set effectiveUntil(DateTime? value) =>
      setField<DateTime>('effective_until', value);

  DateTime? get createdAt => getField<DateTime>('created_at');
  set createdAt(DateTime? value) => setField<DateTime>('created_at', value);
}
