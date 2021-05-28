export class Projet {
    public id?: number
    public lignesProjetDto?: LignesProjetDto[]
    public filesDBDto?: FilesDBDto[]
    public tempsTotal?: number
    constructor(
        public nom?: string
    ){}
}

export class LignesProjetDto {
    public id?: number
    public tempsTotal?: number
    public plainProjetDto: ProjetDto
    constructor(
        public libelle?: string,
        public description?: string,
        public tache?: string,
        public dateDebut?: Date,
        public dateFin?: Date
    ){}
}

export class ProjetDto {
    public id?: number
    public nom?: string
}

export class TacheDto {
    public idTache?: number
    constructor(
        public libelle?: string
    ){}
}

export class FilesDBDto {
    public id?: string
    constructor(
        public name?: string,
        public url?: string
    ){}
}