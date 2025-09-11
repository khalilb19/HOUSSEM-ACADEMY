import '../database.dart';

class NotificationTemplatesTable
    extends SupabaseTable<NotificationTemplatesRow> {
  @override
  String get tableName => 'notification_templates';

  @override
  NotificationTemplatesRow createRow(Map<String, dynamic> data) =>
      NotificationTemplatesRow(data);
}

class NotificationTemplatesRow extends SupabaseDataRow {
  NotificationTemplatesRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => NotificationTemplatesTable();

  String get id => getField<String>('id')!;
  set id(String value) => setField<String>('id', value);

  String get name => getField<String>('name')!;
  set name(String value) => setField<String>('name', value);

  String get titleTemplate => getField<String>('title_template')!;
  set titleTemplate(String value) => setField<String>('title_template', value);

  String get contentTemplate => getField<String>('content_template')!;
  set contentTemplate(String value) =>
      setField<String>('content_template', value);

  String get type => getField<String>('type')!;
  set type(String value) => setField<String>('type', value);

  bool? get isActive => getField<bool>('is_active');
  set isActive(bool? value) => setField<bool>('is_active', value);

  DateTime? get createdAt => getField<DateTime>('created_at');
  set createdAt(DateTime? value) => setField<DateTime>('created_at', value);
}
