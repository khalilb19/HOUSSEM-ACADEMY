import '../database.dart';

class MessageAttachmentsTable extends SupabaseTable<MessageAttachmentsRow> {
  @override
  String get tableName => 'message_attachments';

  @override
  MessageAttachmentsRow createRow(Map<String, dynamic> data) =>
      MessageAttachmentsRow(data);
}

class MessageAttachmentsRow extends SupabaseDataRow {
  MessageAttachmentsRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => MessageAttachmentsTable();

  String get id => getField<String>('id')!;
  set id(String value) => setField<String>('id', value);

  String get messageId => getField<String>('message_id')!;
  set messageId(String value) => setField<String>('message_id', value);

  String get fileName => getField<String>('file_name')!;
  set fileName(String value) => setField<String>('file_name', value);

  String get filePath => getField<String>('file_path')!;
  set filePath(String value) => setField<String>('file_path', value);

  int get fileSize => getField<int>('file_size')!;
  set fileSize(int value) => setField<int>('file_size', value);

  String get fileType => getField<String>('file_type')!;
  set fileType(String value) => setField<String>('file_type', value);

  DateTime get uploadedAt => getField<DateTime>('uploaded_at')!;
  set uploadedAt(DateTime value) => setField<DateTime>('uploaded_at', value);
}
