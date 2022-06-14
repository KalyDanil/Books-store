import { Books } from './MainPage.styled';
import { useCallback, useEffect } from 'react';
import React from 'react';
import Book from '../../../components/Book/Book';
import BannerOfAuthorization from '../../../containers/BannerOfAuthorization/BannerOfAuthorization';
import Pagination from '../../../containers/Pagination/Pagination';
import { AppDispatch } from '../../../store/index';
import { useDispatch } from 'react-redux';
import { getBooksRequest, getPageAction } from '../../../store/reducers/bookReducer/thunks';
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from '../../../utils/hooks/useAppSelector';
import TopFilterBar from '../TopFilterBar/TopFilterBar';
import HeaderBanner from '../../../containers/HeaderBanner/HeaderBanner';

const MainPage: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const books = useAppSelector((state) => state.books);
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = (books.books).map((item, index) => {
    return (<Book book={item} key={item.id} />);
  });

  const getBooks = useCallback(async () => {
    const params = {
      genres: searchParams.getAll('genre'),
      minPrice: searchParams.get('minPrice') == null ? books.minPrice : searchParams.get('minPrice'),
      maxPrice: searchParams.get('maxPrice') == null ? books.maxPrice : searchParams.get('maxPrice'),
      sortBy: searchParams.get('sortBy'),
      search: searchParams.get('search'),
      page: searchParams.get('page'),
      limit: books.limit,
      userId: user.id,
    }
    await dispatch(getBooksRequest(params));
  }, [books.limit, books.maxPrice, books.minPrice, dispatch, searchParams, user.id]);

  useEffect(() => {
    setSearchParams(searchParams);
    dispatch(getPageAction(+searchParams.getAll('page')[0]));
    getBooks();
  }, [getBooks, dispatch, searchParams, setSearchParams]);

  return (
    <div>
      <HeaderBanner />
      <TopFilterBar />
      <Books>
        {page}
      </Books>
      <Pagination pageCount={Math.ceil(books.booksCount / books.limit)} />
      <BannerOfAuthorization />
    </div>
  );
}

export default MainPage;