import '../database.dart';

class UserRolesTable extends SupabaseTable<UserRolesRow> {
  @override
  String get tableName => 'user_roles';

  @override
  UserRolesRow createRow(Map<String, dynamic> data) => UserRolesRow(data);
}

class UserRolesRow extends SupabaseDataRow {
  UserRolesRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => UserRolesTable();

  int get id => getField<int>('id')!;
  set id(int value) => setField<int>('id', value);

  String get roleName => getField<String>('role_name')!;
  set roleName(String value) => setField<String>('role_name', value);
}
