import { api } from '.';
import { IBook, TBooksResponse, TGenresResponse } from '../utils/types/book';
import { IAddBookToCartReq, IChangeRatingReq, IComment, IDeleteBookFromCartReq, IGetBooksReq, IGetCartBooksReq, IGetLikedBooksReq, IGetRecommendationsReq, IGetSelectedBookReq, IMakeCommentReq, IToLikeBookReq, TCartBooksResponse } from '../utils/types/userBooks';

export const getBooks = async (params: IGetBooksReq) => {
  const res: { books: TBooksResponse, booksCount: number, minPrice: number, maxPrice: number, genres: TGenresResponse } = await api.get('main/', { params });
  return res;
};

export const getLikedBooks = async (params: IGetLikedBooksReq) => {
  const res: { books: TBooksResponse, booksCount: number } = await api.get('main/liked-books', { params });
  return res;
};

export const getSelectedBook = async (params: IGetSelectedBookReq) => {
  const res: { book: IBook, comments: IComment[], userRating: number | undefined } = await api.get('main/book-page', { params });
  return res;
};

export const getRecommendations = async (params: IGetRecommendationsReq) => {
  const res: TBooksResponse = await api.get('main/book-page/recommendations', { params });
  return res;
};

export const changeRating = async (body: IChangeRatingReq) => {
  await api.put('main/book-page/change-rating', body);
};

export const makeComment = async (body: IMakeCommentReq) => {
  await api.post('main/book-page/comment', body);
};

export const addBookToCart = async (body: IAddBookToCartReq) => {
  await api.put('main/book-page/add-to-cart', body);
};

export const changeBooksAmount = async (body: IAddBookToCartReq) => {
  await api.put('main/book-page/change-books-amount', body);
};

export const deleteBookFromCart = async (body: IDeleteBookFromCartReq) => {
  await api.post('main/book-page/delete-book-from-cart', body);
};

export const toLikeBook = async (body: IToLikeBookReq) => {
  await api.put('main/book-page/to-like', body);
};

export const getCartBooks = async (params: IGetCartBooksReq) => {
  const res: TCartBooksResponse = await api.get('main/cart', { params });
  return res;
};
