export type Song = {
    id: number;
    title: string;
    autor: string;
    duration: number;
}

export const playlist: Song[] = [
    {
        id: 1,
        title: 'Bohemian Rhapsody',
        autor: 'Queen',
        duration: 354, 
    },

     {
        id: 2,
        title: 'Beat it',
        autor: 'Michael Jackson',
        duration: 354,   
    },

     {
        id: 3,
        title: 'Hotel California',
        autor: 'Eagles',
        duration: 274,   
    },
     {
        id: 4,
        title: 'Imagine',
        autor: 'John Lennon',
        duration: 321,   
    },
     
]