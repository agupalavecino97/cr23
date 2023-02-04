export class Banda {
    id: string = '';
    nombre: string = '';
    horaInicio: string = '';
    horaFin: string = '';
    dia: string = '';
    escenario: string = '';
    seleccionado: boolean = false;

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