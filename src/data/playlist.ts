
export type Song = {
    id: string;
    title: string;
    autor: string;
    duration: number;
}

export const playlist: Song[] = [
    {
        id: "1",
        title: 'Bohemian Rhapsody',
        autor: 'Queen',
        duration: 354,
    },
    {
        id: "2",
        title: 'Billie Jean',
        autor: 'Michael Jackson',
        duration: 293,
    },
    {
        id: "3",
        title: 'Hotel California',
        autor: 'Eagles',
        duration: 274,
    },
    {
        id: "4",
        title: 'Imagine',
        autor: 'John Lennon',
        duration: 321,
    },
]