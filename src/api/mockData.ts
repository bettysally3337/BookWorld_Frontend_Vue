export interface NPCData {
    id: number;
    name: string;
    imageUrl: string;
    quotes: string[];
}

export interface BookLinks {
    booksTw?: string;
    eslite?: string;
    penguin?: string;
    goodreads?: string;
}

export interface BookData {
    id: string;
    title: string;
    author: string;
    year: number;
    description: string;
    links: BookLinks;
    characters: NPCData[];
}

export const bookMockData: BookData[] = [
    {
        id: 'b1',
        title: 'Alice in Wonderland',
        author: 'Lewis Carroll',
        year: 1865,
        description: 'A young girl named Alice falls through a rabbit hole into a fantasy world sparsely populated by peculiar, anthropomorphic creatures.',
        links: {
            booksTw: 'https://www.books.com.tw/',
            eslite: 'https://www.eslite.com/',
            goodreads: 'https://www.goodreads.com/book/show/24213.Alice_s_Adventures_in_Wonderland_Through_the_Looking_Glass'
        },
        characters: [
            {
                id: 1,
                name: 'Alice',
                imageUrl: '/images/Alice In The Wonderland - Alice.png',
                quotes: [
                    "Curiouser and curiouser!",
                    "I can't go back to yesterday because I was a different person then.",
                    "Who in the world am I? Ah, that's the great puzzle."
                ]
            }
        ]
    },
    {
        id: 'b2',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        year: 1813,
        description: 'A romantic novel of manners that follows the character development of Elizabeth Bennet, the dynamic protagonist of the book who learns about the repercussions of hasty judgments.',
        links: {
            booksTw: 'https://www.books.com.tw/',
            goodreads: 'https://www.goodreads.com/book/show/1885.Pride_and_Prejudice',
            penguin: 'https://www.penguinrandomhouse.com/'
        },
        characters: [
            {
                id: 2,
                name: 'Mr. Darcy',
                imageUrl: '/images/Pride and Prejudice - Mr.Darcy.png',
                quotes: [
                    "My affections and wishes are unchanged.",
                    "I have faults enough, but they are not, I hope, of understanding.",
                    "What are men to rocks and mountains?"
                ]
            },
            {
                id: 3,
                name: 'Elizabeth Bennet',
                imageUrl: '/images/Pride and Prejudice - Eliazabeth Bennet.png',
                quotes: [
                    "I could easily forgive his pride, if he had not mortified mine.",
                    "There is a stubbornness about me that never can bear to be frightened at the will of others.",
                    "I am only resolved to act in that manner, which will, in my own opinion, constitute my happiness."
                ]
            },
            {
                id: 4,
                name: 'Mr. Bennet',
                imageUrl: '/images/Pride and Prejudice - Mr.Bennet.png',
                quotes: [
                    "For what do we live, but to make sport for our neighbors, and laugh at them in our turn?",
                    "You must be a simpleton indeed if you think I am going to let you alone.",
                    "I have high respect for your nerves. They are my old friends."
                ]
            }
        ]
    },
    {
        id: 'b3',
        title: 'The Adventures of Sherlock Holmes',
        author: 'Arthur Conan Doyle',
        year: 1892,
        description: 'A collection of twelve short stories featuring the famous detective Sherlock Holmes and his loyal friend Dr. Watson.',
        links: {
            eslite: 'https://www.eslite.com/',
            goodreads: 'https://www.goodreads.com/book/show/3590.The_Adventures_of_Sherlock_Holmes'
        },
        characters: [
            {
                id: 5,
                name: 'Sherlock Holmes',
                imageUrl: '/images/Sherlock Holmes.png',
                quotes: [
                    "Elementary, my dear Watson.",
                    "When you have eliminated the impossible, whatever remains, however improbable, must be the truth.",
                    "I am a brain, Watson. The rest of me is a mere appendix."
                ]
            }
        ]
    },
    {
        id: 'b4',
        title: 'The Little Prince',
        author: 'Antoine de Saint-Exupéry',
        year: 1943,
        description: 'A poetic tale, with watercolor illustrations by the author, in which a pilot stranded in the desert meets a young prince fallen to Earth from a tiny asteroid.',
        links: {
            booksTw: 'https://www.books.com.tw/',
            goodreads: 'https://www.goodreads.com/book/show/157993.The_Little_Prince',
            penguin: 'https://www.penguinrandomhouse.com/'
        },
        characters: [
            {
                id: 6,
                name: 'The Little Prince',
                imageUrl: '/images/The Little Prince.png',
                quotes: [
                    "It is only with the heart that one can see rightly.",
                    "You become responsible, forever, for what you have tamed.",
                    "All grown-ups were once children... but only few of them remember it."
                ]
            }
        ]
    },
    {
        id: 'b5',
        title: 'Jane Eyre',
        author: 'Charlotte Brontë',
        year: 1847,
        description: 'A novel that follows the emotions and experiences of its eponymous heroine, including her growth to adulthood and her love for Mr. Rochester.',
        links: {
            eslite: 'https://www.eslite.com/',
            goodreads: 'https://www.goodreads.com/book/show/10210.Jane_Eyre'
        },
        characters: [
            {
                id: 7,
                name: 'Jane Eyre',
                imageUrl: '/images/Jane Eyre.png',
                quotes: [
                    "I am no bird; and no net ensnares me.",
                    "I would always rather be happy than dignified.",
                    "Life appears to me too short to be spent in nursing animosity or registering wrongs."
                ]
            }
        ]
    },
    {
        id: 'b6',
        title: 'The Adventures of Tom Sawyer',
        author: 'Mark Twain',
        year: 1876,
        description: 'A novel about a young boy growing up along the Mississippi River. It is set in the 1840s in the fictional town of St. Petersburg.',
        links: {
            booksTw: 'https://www.books.com.tw/',
            goodreads: 'https://www.goodreads.com/book/show/24583.The_Adventures_of_Tom_Sawyer'
        },
        characters: [
            {
                id: 8,
                name: 'Tom Sawyer',
                imageUrl: '/images/The Adventures of Tom Sawyer - Tom Sawyer.png',
                quotes: [
                    "Work consists of whatever a body is obliged to do.",
                    "Play consists of whatever a body is not obliged to do.",
                    "The less there is to justify a traditional custom, the harder it is to get rid of it."
                ]
            }
        ]
    }
];
