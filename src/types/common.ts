export type Film = {
    title: string
};

export type Character = {
    id: string
    name: string
    birthYear: string
    height: number
    mass: number
    gender: string
    eyeColor: string
    hairColor: string
    skinColor: string
    filmConnection: {
        films: Film[]
    }
    species: {
        name: string
    }[]
};

export type ExportCharacter = {
    id: string
    name: string
    birthYear: string
    height: number
    mass: number
    gender: string
    eyeColor: string
    hairColor: string
    skinColor: string
    films: string
    species: {
        name: string
    }[]
};



