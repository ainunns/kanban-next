enum PermissionEnum {
  'all',
  'authed',
  'user',
}

export type PermissionList = keyof typeof PermissionEnum;

export type PermissionListArray = Array<keyof typeof PermissionEnum>;
