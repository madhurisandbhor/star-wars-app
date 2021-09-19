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
};



