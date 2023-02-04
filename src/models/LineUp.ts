export class LineUp {
    bandaId: string = '';

    static parseItem(raw: any): LineUp {
        const lineUp = new LineUp();
        lineUp.bandaId = raw.bandaId ? raw.bandaId : undefined;
        return lineUp;
    }

    
    static parseArray(raws: any): LineUp[] {
        if (!raws || !raws.length) {
            return [];
        }
        return raws.map((raw: any) => LineUp.parseItem(raw));
    }

}