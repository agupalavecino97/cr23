export class Banda {
    id: number = 0;
    nombre: string = '';
    horaInicio: string = '';
    horaFin: string = '';
    dia: number = 0;
    escenario: string = '';
    seleccionado: boolean = false;
    estado?: string;

    static parseItem(raw: any): Banda {
        const banda = new Banda();
        banda.id = raw.id ? raw.id : undefined;
        banda.nombre = raw.nombre ? raw.nombre : undefined;
        banda.horaInicio = raw.horaInicio ? raw.horaInicio: undefined;
        banda.horaFin = raw.horaFin ? raw.horaFin : undefined;
        banda.dia = raw.dia ? raw.dia : undefined;
        banda.escenario = raw.escenario ? raw.escenario : undefined;
        banda.seleccionado = raw.seleccionado ? raw.seleccionado : undefined;
        return banda;
    }

    
    static parseArray(raws: any): Banda[] {
        if (!raws || !raws.length) {
            return [];
        }
        return raws.map((raw: any) => Banda.parseItem(raw));
    }

}