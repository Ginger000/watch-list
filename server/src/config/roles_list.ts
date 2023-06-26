interface RoleList {
  readonly [role:string] :number
  'Admin':number,
  'Editor': number,
  'User': number
}

const ROLES_LIST: RoleList = {
  'Admin':5150,
  'Editor': 1984,
  'User': 2001
}

export default ROLES_LIST