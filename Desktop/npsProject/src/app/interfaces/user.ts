export interface UserModel {
    id: 0;
    name: string,
    password: string,
    type: UserType
}

enum UserType{
    Administrador = 0,
    Cliente = 1,
}
