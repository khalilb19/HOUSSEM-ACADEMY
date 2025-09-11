import '../database.dart';

class NotificationSettingsTable extends SupabaseTable<NotificationSettingsRow> {
  @override
  String get tableName => 'notification_settings';

  @override
  NotificationSettingsRow createRow(Map<String, dynamic> data) =>
      NotificationSettingsRow(data);
}

class NotificationSettingsRow extends SupabaseDataRow {
  NotificationSettingsRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => NotificationSettingsTable();

  String get id => getField<String>('id')!;
  set id(String value) => setField<String>('id', value);

  String get userId => getField<String>('user_id')!;
  set userId(String value) => setField<String>('user_id', value);

  bool? get emailEnabled => getField<bool>('email_enabled');
  set emailEnabled(bool? value) => setField<bool>('email_enabled', value);

  bool? get pushEnabled => getField<bool>('push_enabled');
  set pushEnabled(bool? value) => setField<bool>('push_enabled', value);

  bool? get attendanceNotifications =>
      getField<bool>('attendance_notifications');
  set attendanceNotifications(bool? value) =>
      setField<bool>('attendance_notifications', value);

  bool? get gradeNotifications => getField<bool>('grade_notifications');
  set gradeNotifications(bool? value) =>
      setField<bool>('grade_notifications', value);

  bool? get announcementNotifications =>
      getField<bool>('announcement_notifications');
  set announcementNotifications(bool? value) =>
      setField<bool>('announcement_notifications', value);

  bool? get reminderNotifications => getField<bool>('reminder_notifications');
  set reminderNotifications(bool? value) =>
      setField<bool>('reminder_notifications', value);

  DateTime? get createdAt => getField<DateTime>('created_at');
  set createdAt(DateTime? value) => setField<DateTime>('created_at', value);

  DateTime? get updatedAt => getField<DateTime>('updated_at');
  set updatedAt(DateTime? value) => setField<DateTime>('updated_at', value);
}
