export class Usuario {
    id?: string;
    email?: string;
    password?: string;
    nombre?: string;

    static parseItem(raw: any): Usuario {
        const usuario = new Usuario();
        usuario.id = raw.id ? raw.id : undefined;
        usuario.nombre = raw.nombre ? raw.nombre : undefined;
        usuario.email = raw.email ? raw.email: undefined;
        usuario.password = raw.password ? raw.password : undefined;
        return usuario;
    }

}