import { IRegistrationUser } from './user';
import { IComment, TCartBooksResponse } from './userBooks';

export type TBooksResponse = Array<IBook>;

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
  CartBooks: Array<IRegistrationUser>,
  UserLikedBooks: Array<{ id: number } | undefined>
}

export interface IBooks {
  book: IBook
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
