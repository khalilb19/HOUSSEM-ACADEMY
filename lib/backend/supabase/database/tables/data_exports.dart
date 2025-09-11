import '../database.dart';

class DataExportsTable extends SupabaseTable<DataExportsRow> {
  @override
  String get tableName => 'data_exports';

  @override
  DataExportsRow createRow(Map<String, dynamic> data) => DataExportsRow(data);
}

class DataExportsRow extends SupabaseDataRow {
  DataExportsRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => DataExportsTable();

  String get id => getField<String>('id')!;
  set id(String value) => setField<String>('id', value);

  String get userId => getField<String>('user_id')!;
  set userId(String value) => setField<String>('user_id', value);

  String get exportType => getField<String>('export_type')!;
  set exportType(String value) => setField<String>('export_type', value);

  String get fileName => getField<String>('file_name')!;
  set fileName(String value) => setField<String>('file_name', value);

  String? get filePath => getField<String>('file_path');
  set filePath(String? value) => setField<String>('file_path', value);

  String get status => getField<String>('status')!;
  set status(String value) => setField<String>('status', value);

  dynamic get filters => getField<dynamic>('filters');
  set filters(dynamic value) => setField<dynamic>('filters', value);

  String? get errorMessage => getField<String>('error_message');
  set errorMessage(String? value) => setField<String>('error_message', value);

  int? get fileSize => getField<int>('file_size');
  set fileSize(int? value) => setField<int>('file_size', value);

  int? get downloadCount => getField<int>('download_count');
  set downloadCount(int? value) => setField<int>('download_count', value);

  DateTime? get expiresAt => getField<DateTime>('expires_at');
  set expiresAt(DateTime? value) => setField<DateTime>('expires_at', value);

  DateTime? get createdAt => getField<DateTime>('created_at');
  set createdAt(DateTime? value) => setField<DateTime>('created_at', value);
}
