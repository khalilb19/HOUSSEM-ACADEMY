import '../database.dart';

class ProfilesBackupPreReconstructTable
    extends SupabaseTable<ProfilesBackupPreReconstructRow> {
  @override
  String get tableName => 'profiles_backup_pre_reconstruct';

  @override
  ProfilesBackupPreReconstructRow createRow(Map<String, dynamic> data) =>
      ProfilesBackupPreReconstructRow(data);
}

class ProfilesBackupPreReconstructRow extends SupabaseDataRow {
  ProfilesBackupPreReconstructRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => ProfilesBackupPreReconstructTable();

  String? get id => getField<String>('id');
  set id(String? value) => setField<String>('id', value);

  DateTime? get createdAt => getField<DateTime>('created_at');
  set createdAt(DateTime? value) => setField<DateTime>('created_at', value);

  String? get userId => getField<String>('user_id');
  set userId(String? value) => setField<String>('user_id', value);

  String? get firstName => getField<String>('first_name');
  set firstName(String? value) => setField<String>('first_name', value);

  String? get lastName => getField<String>('last_name');
  set lastName(String? value) => setField<String>('last_name', value);

  int? get roleId => getField<int>('role_id');
  set roleId(int? value) => setField<int>('role_id', value);

  int? get userRoleId => getField<int>('user_role_id');
  set userRoleId(int? value) => setField<int>('user_role_id', value);

  String? get parentId => getField<String>('parent_id');
  set parentId(String? value) => setField<String>('parent_id', value);
}
