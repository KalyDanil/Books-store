import {HeaderBackground, HeaderBackgroundDiv, Catalog, Books} from './MainPage.styled';
import {useState, useEffect, useRef} from 'react';
import React from 'react';
import Book from '../Book/Book';  
import Genre from '../Genre/Genre';
import BannerOfAuthorization from '../BannerOfAuthorization/BannerOfAuthorization';
import PagesController from '../PagesController/PagesController'; 
import {RootState} from '../../store/index';
import {useDispatch, useSelector} from 'react-redux';
import {getBooksRequest, getAllGenresRequest, getMinMaxPriceRequest, getPageAction} from '../../store/reducers/books';
import {sortByConstants} from '../../utils/constants';
import {useSearchParams} from "react-router-dom";

interface IBooks {
    id: number
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
    Users: Array<UserBook>, 
    UserLikedBooks: Array<{id: number} | undefined>,
}

interface UserBook {
    UserBook: {
        rating: number,
        isLiked: boolean,
    }
}

interface IGenres {
    id: number,
    name: string,
}

const MainPage: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const books = useSelector((state: RootState) => state.books);
    const dispatch = useDispatch();  
    const [searchParams, setSearchParams] = useSearchParams();
    const [genreIsEditing, setgenreIsEditing] = useState(false);
    const [sortByIsEditing, setsortByIsEditing] = useState(false);
    const [priceSliderIsEditing, setpriceSliderIsEditing] = useState(true);
    const [minPrice, setminPrice] = useState(0);
    const [maxPrice, setmaxPrice] = useState(100);
    const [sortBy, setsortBy] = useState('name');
    const [nowMoving, setNowMoving] = useState('nothing');
    const minPriceBar = useRef<HTMLDivElement>(null);
    const maxPriceBar = useRef<HTMLDivElement>(null);
    const sliderDiv = useRef<HTMLDivElement>(null);
    const sliderBar = useRef<HTMLDivElement>(null);
    const sliderBar2 = useRef<HTMLDivElement>(null);
    const zeroPosition = sliderBar.current?.getBoundingClientRect().x;
    const widthSliderBar = sliderBar.current?.offsetWidth;
    
    const getBooks = async () => {
        const params = {
            genres: searchParams.getAll("genre"), 
            minPrice: searchParams.get("minPrice") == null? books.minPrice : searchParams.get("minPrice"), 
            maxPrice: searchParams.get("maxPrice") == null? books.maxPrice : searchParams.get("maxPrice"),
            sortBy: searchParams.get("sortBy"),
            page: searchParams.get("page"),
            limit: books.limit,
            userId: user.id,
        }
        await dispatch<any>(getBooksRequest(params));
    }

    const getAllGenres = async () => {
        await dispatch<any>(getAllGenresRequest());
    }

    useEffect(() => {
        setSearchParams(searchParams);
        dispatch(getPageAction(+searchParams.getAll("page")[0]));
        getBooks();
        getAllGenres();
    },[]);

    useEffect(() => {
        getBooks();
    },[books.selectedGenres, books.page, minPrice, maxPrice, sortBy]);

    useEffect(() => {
        dispatch<any>(getMinMaxPriceRequest());
        setminPrice(books.minPrice);
        setmaxPrice(books.maxPrice);
    },[books.minPrice]);

    useEffect(() => {
        bar2Moving();
        setpriceSliderIsEditing(false);
    },[]);

    const editGenre = () => {
        if(genreIsEditing === false) {
            setgenreIsEditing(true);
        } else{setgenreIsEditing(false);}
        setsortByIsEditing(false);
        setpriceSliderIsEditing(false);
    }

    const editPrice = (e:any) => {
        if(priceSliderIsEditing === false) {
            setpriceSliderIsEditing(true);
        } else{setpriceSliderIsEditing(false);}
        setgenreIsEditing(false);
        setsortByIsEditing(false);
    }

    const editSort = () => {
        if(sortByIsEditing === false) {
            setsortByIsEditing(true);
        } else{setsortByIsEditing(false);}
        setgenreIsEditing(false);
        setpriceSliderIsEditing(false);
    }

    const editNothing = () => {
        setgenreIsEditing(false);
        setsortByIsEditing(false);
        setpriceSliderIsEditing(false);
    }

    const selectSortBy = (value: string) => {
        const arr = value.toLowerCase().split(' ');
        const str = arr.join('');
        setsortBy(str);
        searchParams.delete('sortBy');
        searchParams.append('sortBy', str);
        setSearchParams(searchParams);
    }

    const startMinPriceMoving = () => {
        setNowMoving('minPrice');
    }

    const startMaxPriceMoving = () => {
        setNowMoving('maxPrice');
    }

    const minPriceMoving = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
        if(maxPriceBar.current !== null && sliderBar2.current !== null) {
            const maxCoord = maxPriceBar.current.getBoundingClientRect().x;
            if(minPriceBar.current !== null && zeroPosition !== undefined && e.pageX >= zeroPosition + 10 && e.pageX < maxCoord - 10) {
                const nextPosition = (e.pageX - zeroPosition);
                const firstPosition = minPriceBar.current.getBoundingClientRect().x;
                minPriceBar.current.style.left = nextPosition + 'px';
                const currentPosition = minPriceBar.current.getBoundingClientRect().x;
                sliderBar2.current.style.left = nextPosition + 'px';
                bar2Moving();
               
                if(currentPosition > firstPosition) {
                    setminPrice(minPrice + 0.5);
                }

                if(currentPosition < firstPosition && minPrice > books.minPrice) {
                    setminPrice(minPrice - 0.5)
                }

                searchParams.delete('minPrice');
                searchParams.append('minPrice', minPrice.toString());
                setSearchParams(searchParams);
            }
        }
    }
 
    const maxPriceMoving = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(minPriceBar.current !== null && widthSliderBar !== undefined && sliderBar2.current !== null) {
            const minCoord = minPriceBar.current.getBoundingClientRect().x;
            if(maxPriceBar.current !== null && zeroPosition !== undefined && e.pageX > minCoord + 40 && e.pageX <= zeroPosition + widthSliderBar - 5) {
                const firstPosition = maxPriceBar.current.getBoundingClientRect().x;
                const nextPosition = (e.pageX - zeroPosition);
                maxPriceBar.current.style.left = nextPosition + 'px';
                const currentPosition = maxPriceBar.current.getBoundingClientRect().x;
                sliderBar2.current.style.left = nextPosition + sliderBar2.current.style.width + 'px';
                bar2Moving();

                if(currentPosition > firstPosition && maxPrice <=books.maxPrice) {
                    setmaxPrice(maxPrice + 0.5);
                }
    
                if(currentPosition < firstPosition) {
                    setmaxPrice(maxPrice - 0.5);
                }

                searchParams.delete('maxPrice');
                searchParams.append('maxPrice', maxPrice.toString());
                setSearchParams(searchParams);
            }
        }
    }

    const priceMoving = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(nowMoving === 'minPrice') {
            minPriceMoving(e)
        }
        if(nowMoving === 'maxPrice') {
            maxPriceMoving(e)
        }
    }

    const bar2Moving = () => {
        if(minPriceBar.current !== null && maxPriceBar.current !== null && sliderBar2.current !== null) {
            sliderBar2.current.style.width = (maxPriceBar.current.getBoundingClientRect().x + 5 - minPriceBar.current.getBoundingClientRect().x) + 'px';
        }
    }

    const stopPriceMoving = () => {
        setNowMoving('nothing');
    }

    const page = (books.books).map((item) => {
        return (<Book book={item} key={item.id}/>);
    });

    const genreArr = (books.genres).map((item)=> {
        return (<Genre genre={item.name} id={item.id} key={item.id}/>);
    });

    return (
        <div>
            <HeaderBackground isLoggedIn={user.tokenIsValid}>
                <HeaderBackgroundDiv>
                    <h1>Build your library with us</h1>
                    <span>Buy two books and get one for free</span>
                    <input type='button' value='Choose a book'></input>
                </HeaderBackgroundDiv>
                <img className='headerBackground__books' src="./assets/image/headerBackgroundBooks.svg" alt='BackgroundBooks'></img>
                <img className='headerBackground__girl' src="./assets/image/headerBackgroundGirl.svg" alt='BackgroundGirl'></img>
            </HeaderBackground>
            <Catalog genreIsEditing={genreIsEditing} sortByIsEditing={sortByIsEditing} sortBy={sortBy} priceSliderIsEditing={priceSliderIsEditing}>
                <div className='catalog__header'>
                    <h1>Catalog</h1>
                    <div className='catalog__header-select'>
                        <div className='header-select__genre'>
                            <input className='select-genre__button' type='button' value='Genre' onClick={editGenre}/>
                            <ul className='select-genre__ul' id='ul' onMouseLeave={editNothing}>
                                <img src="./assets/image/polygon.svg" alt=''/>
                                {genreArr}
                            </ul>
                        </div>
                        <div className='header-select__price'>
                            <input className='select-price__button' type='button' value='Price' onClick={editPrice}></input>
                            <img className='select-price__arrow' src="./assets/image/arrow.svg" alt='arrow'></img>
                            <div className='select-price__slider' ref={sliderDiv} onMouseMove={priceMoving} onMouseLeave={stopPriceMoving} onMouseUp={stopPriceMoving}>
                                <img src="./assets/image/polygon.svg" alt=''/>
                                <div className="bar" ref={sliderBar}></div>
                                <div className="bar2" ref={sliderBar2}></div>
                                <div className="range-toggle range-toggle-min" ref={minPriceBar} onMouseDown={startMinPriceMoving}/>
                                <div className="range-toggle range-toggle-max" ref={maxPriceBar} onMouseDown={startMaxPriceMoving}/>
                                <div className='minAndMaxPrice'>
                                    <span>$ {minPrice} </span> <span>$ {maxPrice} </span>
                                </div>
                            </div>
                        </div>
                        <div className='header-select__sortBy'>
                            <input className='select-sortBy__button' type='button' value='Sort by' onClick={editSort}></input>
                            <div className='select-sortBy__ul' onMouseLeave={editNothing}>
                                <img src="./assets/image/polygon.svg" alt=''/>
                                {sortByConstants.map((item, index) => (
                                    <div id={item.split(' ').join('')} onClick={() => selectSortBy(item)} key={index}>{item}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Catalog>
            <Books>
                {page}
            </Books>
            <PagesController pageCount={Math.ceil(books.booksCount / books.limit)}/>
            <BannerOfAuthorization/>
        </div>
    );
  }

  export default MainPage;