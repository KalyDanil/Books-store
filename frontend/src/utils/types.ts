export interface IRegistrationUser {
    id: number,
    fullName: string,
    dob: string,
    email: string,
    password: string,
    avatar: string,
    token: string,
    tokenIsValid: boolean,
    loadingTokenVerify: boolean,
    headerButton: string
}

export type TBooksResponse = Array<IBook>;

export interface IBook {
    id: number,
    name: string,
    authorname: string,
    description1: string,
    description2: string,
    description3: string,
    price: number,
    paperBackPrice: number,
    rating: number,
    dateofissue: string,
    cover: string,
    status: string,
    genre: string,
    selectStatus: boolean,
    UserBook: {
        rating: number,
        inCart: number,
        isLiked: boolean,
    },
    Users: Array<IDbUser>,
    UserLikedBooks: Array<{ id: number } | undefined>
}

export interface IBooks {
    book: IBook
}

export interface ILikedBook {
    id: number,
    name: string,
    authorname: string,
    description1: string,
    description2: string,
    description3: string,
    price: number,
    paperBackPrice: number,
    rating: number,
    dateofissue: string,
    cover: string,
    status: string,
    genre: string,
    selectStatus: boolean,
}

export interface IDbUser {
    UserBook: {
        rating: number,
        inCart: number,
        isLiked: boolean,
    }
    comment: string,
    createdAt: {},
}

export interface IComment {
    comment: string,
    createdAt: {},
    User: {
        fullName: string,
        avatar: string
    }
}

export interface IComments {
    comment: IComment
}

export interface IGenre {
    id: number,
    name: string,
    genre: string,
}

export type TGenresResponse = Array<IGenre>

export interface IStars {
    value: number
}

export interface IPageCount {
    pageCount: number
}

export interface IState {
    books: TBooksResponse,
    booksCount: number,
    limit: number,
    cartBooks: TBooksResponse,
    maxRating: number,
    page: number,
    minPrice: number,
    maxPrice: number,
    genres: TGenresResponse,
    selectedGenres: string[],
    idBook: number,
    selectedBook: IBook,
    comments: IComment[],
    userRating: number,
    totalPrice: number
}