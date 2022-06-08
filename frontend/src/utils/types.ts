import { ReactElement } from "react";

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
    headerButton: string,
    editResponse: string
}

export type TBooksResponse = Array<IBook>;

export type TCartBooksResponse = Array<ICartBook>;

export interface ICartBook {
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
    CartBook: {
        amount: number,
    },
}

export interface IBook {
    id: number,
    name: string,
    authorname: string,
    description: string,
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
    CartBooks: Array<IRegistrationUser>,
    Users: Array<IDbUser>,
    UserLikedBooks: Array<{ id: number } | undefined>
}

export interface IBooks {
    book: IBook
}

export interface ICartBooks {
    book: ICartBook
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
    id: number;
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
    cartBooksAmount: number,
    cartBooksLength: number,
    limit: number,
    selectedFilterButton: string,
    cartBooks: TCartBooksResponse,
    maxRating: number,
    page: number,
    minPrice: number,
    maxPrice: number,
    genres: TGenresResponse,
    selectedGenres: string[],
    idBook: number,
    selectedBook: IBook,
    selectedBookLike: string,
    comments: IComment[],
    userRating: number,
    totalPrice: number
}

export interface ModalProps {
    visible: boolean
    title: string
    content: ReactElement | string
    footer: ReactElement | string
    onClose: () => void
}


export interface IRegistrationReq {
    email: string,
    password: string
}

export interface IEditReq {
    fullName: string,
    email: string,
}

export interface IEditPasswordReq {
    newPassword: string,
    oldPassword: string,
    token: string | null
}

export interface IAvatarConfig {
    headers: {
        'Content-Type': string,
    },
    params: {
        token: string | null,
    }
}

export interface IGetBooksReq {
    genres: string[],
    minPrice: string | number |null,
    maxPrice: string | number | null,
    sortBy: string | null,
    search: string | null,
    page: string | null,
    limit: number,
    userId: number | string,
}

export interface IGetLikedBooksReq {
    page: string | null,
    limit: number,
    userId: number,
}

export interface IGetSelectedBookReq {
    bookId?: string,
    userId: number,
}

export interface IGetRecommendationsReq {
    limit: number,
    userId: number,
    bookId?: string
}

export interface IChangeRatingReq {
    rating: number,
    userId: number,
    bookId: number,
}

export interface IMakeCommentReq {
    userId: number,
    bookId: number,
    comment: string,
    commentDate: Date,
}

export interface IAddBookToCartReq {
    userId: number,
    bookId?: number | string,
}

export interface IDeleteBookFromCartReq {
    userId: number,
    bookId?: number | string,
}

export interface IChangeBooksAmountReq {
    userId: number,
    bookId?: number | string,
    amount: number
}

export interface IToLikeBookReq {
    userId: number,
    bookId?: string,
    like: boolean,
}

export interface IGetCartBooksReq {
    userId: number
}