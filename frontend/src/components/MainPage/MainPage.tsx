import {HeaderBackground, HeaderBackgroundDiv, Catalog, Books, BooksPagesControler, Banner} from './MainPage.styled';
import {useState} from 'react';

function MainPage() {
    const [genreIsEditing, setgenreIsEditing] = useState(false);
    const [sortByIsEditing, setsortByIsEditing] = useState(false);
    const [priceSliderIsEditing, setpriceSliderIsEditing] = useState(true);
    const [sortBy, setsortBy] = useState('name');

    function editGenre(e: any) {
        setgenreIsEditing(true);
        setsortByIsEditing(false);
        setpriceSliderIsEditing(false);
    }

    function editPrice(e: any) {
        setgenreIsEditing(false);
        setsortByIsEditing(false);
        setpriceSliderIsEditing(true);
    }

    function editSort(e: any) {
        setgenreIsEditing(false);
        setsortByIsEditing(true);
        setpriceSliderIsEditing(false);
    }

    function editNothing(e: any) {
        setgenreIsEditing(false);
        setsortByIsEditing(false);
        setpriceSliderIsEditing(false);
    }

    function selectSortBy(e: any) {
        const arr = e.target.value.toLowerCase().split(' ');
        const str = arr.join('');
        setsortBy(str);
    }

    function toAuthorization() {
        localStorage .setItem('headerButton',  'Sing Up');
        window.location.href = '/authorization';
    }

    return (
        <div>
            <HeaderBackground>
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
                            <input className='select-genre__button' type='button' value='Genre' onClick={editGenre} ></input>
                            <ul className='select-genre__ul'>
                                <img src="./assets/image/polygon.svg" alt=''/>
                                <li className='select-genre__li'><input className='select-genre__checkbox' type='checkbox'/>
                                    <span>Fiction</span>
                                </li>
                                <li className='select-genre__li'>
                                    <input className='select-genre__checkbox' type='checkbox'/>Non-fiction
                                </li>
                                <li className='select-genre__li'><input className='select-genre__checkbox' type='checkbox'/>
                                    <span>Light fiction</span>
                                </li>
                                <li className='select-genre__li'><input className='select-genre__checkbox' type='checkbox'/>
                                    <span>Science-fiction</span>
                                </li>
                                <li className='select-genre__li'><input className='select-genre__checkbox' type='checkbox'/>
                                    <span>Fantasy</span>
                                </li>
                                <li className='select-genre__li'><input className='select-genre__checkbox' type='checkbox'/>
                                    <span>Business &#38; Finance</span>
                                </li>
                                <li className='select-genre__li'><input className='select-genre__checkbox' type='checkbox'/>
                                    <span>Politics</span>
                                </li>
                                <li className='select-genre__li'><input className='select-genre__checkbox' type='checkbox'/>
                                    <span>travel books</span>
                                </li>
                                <li className='select-genre__li'><input className='select-genre__checkbox' type='checkbox'/>
                                    <span>Autobiography</span>
                                </li>
                                <li className='select-genre__li'><input className='select-genre__checkbox' type='checkbox'/>
                                    <span>History</span>
                                </li>
                                <li className='select-genre__li'><input className='select-genre__checkbox' type='checkbox'/>
                                    <span>Thriller / Mystery</span>
                                </li>
                                <li className='select-genre__li'><input className='select-genre__checkbox' type='checkbox'/>
                                    <span>Romance</span>
                                </li>
                                <li className='select-genre__li'><input className='select-genre__checkbox' type='checkbox'/>
                                    <span>Satire</span>
                                </li>
                                <li className='select-genre__li'><input className='select-genre__checkbox' type='checkbox'/>
                                    <span>Horror</span>
                                </li>
                                <li className='select-genre__li'><input className='select-genre__checkbox' type='checkbox'/>
                                    <span>Health / Medicine</span>
                                </li>
                                <li className='select-genre__li'><input className='select-genre__checkbox' type='checkbox'/>
                                    <span>Choldren's books</span>
                                </li>
                                <li className='select-genre__li'><input className='select-genre__checkbox' type='checkbox'/>
                                    <span>Encyclopedia</span>
                                </li>
                            </ul>
                        </div>
                        <div className='header-select__price'>
                            <input className='select-price__button' type='button' value='Price' onClick={editPrice} onBlur={editNothing}></input>
                            <img className='select-price__arrow' src="./assets/image/arrow.svg" alt='arrow'></img>
                            <div className='select-price__slider'>
                                <img src="./assets/image/polygon.svg" alt=''/>
                                <div className="bar"></div>
                                <div className="bar2"></div>
                                <div className="range-toggle range-toggle-min"></div>
                                <div className="range-toggle range-toggle-max"></div>
                                <div className='minAndMaxPrice'>
                                <span>$ 0,00</span> <span>$ 50,00</span>
                                </div>
                            </div>
                        </div>
                        <div className='header-select__sortBy'>
                            <input className='select-sortBy__button' type='button' value='Sort by price' onClick={editSort} onBlur={editNothing}></input>
                            <div className='select-sortBy__ul'>
                                <img src="./assets/image/polygon.svg" alt=''/>
                                <input id='price' type='button' value='Price' onClick={selectSortBy}/>
                                <input id='name' type='button' value='Name' onClick={selectSortBy}/>
                                <input id='authorName' type='button' value='Author name' onClick={selectSortBy}/>
                                <input id='rating' type='button' value='Rating' onClick={selectSortBy}/>
                                <input id='dateOfIssue' type='button' value='Date of issue' onClick={selectSortBy}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Catalog>
            <Books>
                    <div className='books__div'>
                        <img className='likeOnBook' src="./assets/image/books/likeOnBook.svg" alt='likeOnBook'/>
                        <img className='book' src="./assets/image/books/1.svg" alt='book'/>
                        <span className='bookName'>The Chronicles of Narnia</span>  
                        <span className='author'>C. S. Lewis</span>
                        <div className='books__stars'>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <span>5</span>
                        </div>
                        <input className='books__addButton' type='button' value='$ 20.00 USD'/>   
                    </div>
                    <div className='books__div'>
                        <img className='likeOnBook' src="./assets/image/books/likeOnBook.svg" alt='likeOnBook'/>
                        <img className='book' src="./assets/image/books/2.svg" alt='books'/>
                        <span className='bookName'>The Psychlogy of Money</span>  
                        <span className='author'>Morgan Housel</span>
                        <div className='books__stars'>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/hollowStar.svg" alt='star'/>
                            <span>4</span>
                        </div>
                        <input className='books__addButton' type='button' value='$ 15.00 USD'/> 
                    </div>
                    <div className='books__div'>
                        <img className='likeOnBook' src="./assets/image/books/likeOnBook.svg" alt='likeOnBook'/>
                        <img className='book' src="./assets/image/books/3.svg" alt='books'/>
                        <span className='bookName'>The Picture of Dorian Gray</span>  
                        <span className='author'>Oscar Wilde</span>
                        <div className='books__stars'>
                            <img src="./assets/image/books/hollowStar.svg" alt='star'/>
                            <img src="./assets/image/books/hollowStar.svg" alt='star'/>
                            <img src="./assets/image/books/hollowStar.svg" alt='star'/>
                            <img src="./assets/image/books/hollowStar.svg" alt='star'/>
                            <img src="./assets/image/books/hollowStar.svg" alt='star'/>
                            <span>0</span>
                        </div>
                        <input className='books__addButton' type='button' value='$ 20.00 USD'/> 
                    </div>
                    <div className='books__div'>
                        <img className='likeOnBook' src="./assets/image/books/likeOnBook.svg" alt='likeOnBook'/>
                        <img className='book' src="./assets/image/books/4.svg" alt='books'/>
                        <span className='bookName'>The Subtle art of not giving a fuck</span>  
                        <span className='author'>Mark Manson</span>
                        <div className='books__stars'>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <span>5</span>
                        </div>
                        <input className='books__addButton' type='button' value='$ 23.99 USD'/> 
                    </div>
                    <div className='books__div'>
                        <img className='likeOnBook' src="./assets/image/books/likeOnBook.svg" alt='likeOnBook'/>
                        <img className='book' src="./assets/image/books/5.svg" alt='books'/>
                        <span className='bookName'>The Two towers</span>  
                        <span className='author'>J. R. R. Tolkien</span>
                        <div className='books__stars'>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <span>5</span>
                        </div>
                        <input className='books__notActive' type='button' value='Not available'/> 
                    </div>
                    <div className='books__div'>
                        <img className='likeOnBook' src="./assets/image/books/likeOnBook.svg" alt='likeOnBook'/>
                        <img className='book' src="./assets/image/books/6.svg" alt='books'/>
                        <span className='bookName'>Book of Fairy Tales</span>  
                        <span className='author'>Angela Carter</span>
                        <div className='books__stars'>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <span>5</span>
                        </div>
                        <input className='books__addButton' type='button' value='$ 32.00 USD'/> 
                    </div>
                    <div className='books__div'>
                        <img className='likeOnBook' src="./assets/image/books/likeOnBook.svg" alt='likeOnBook'/>
                        <img className='book' src="./assets/image/books/7.svg" alt='books'/>
                        <span className='bookName'>How to stop worrying and start living</span>  
                        <span className='author'>Dale Carnegie</span>
                        <div className='books__stars'>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <span>5</span>
                        </div>
                        <input className='books__addButton' type='button' value='$ 37.85 USD'/> 
                    </div>
                    <div className='books__div'>
                        <img className='likeOnBook' src="./assets/image/books/likeOnBook.svg" alt='likeOnBook'/>
                        <img className='book' src="./assets/image/books/8.svg" alt='books'/>
                        <span className='bookName'>Don't sweat the Small Stuuff</span>  
                        <span className='author'>Richard Carlson</span>
                        <div className='books__stars'>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <span>5</span>
                        </div>
                        <input className='books__addButton' type='button' value='$ 40.00 USD'/> 
                    </div>
                    <div className='books__div'>
                        <img className='likeOnBook' src="./assets/image/books/likeOnBook.svg" alt='likeOnBook'/>
                        <img className='book' src="./assets/image/books/9.svg" alt='books'/>
                        <span className='bookName'>The Weight of Things</span>  
                        <span className='author'>Marianne Flitz</span>
                        <div className='books__stars'>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/hollowStar.svg" alt='star'/>
                            <img src="./assets/image/books/hollowStar.svg" alt='star'/>
                            <span>3</span>
                        </div>
                        <input className='books__addButton' type='button' value='$ 41.50 USD'/> 
                    </div>
                    <div className='books__div'>
                        <img className='likeOnBook' src="./assets/image/books/likeOnBook.svg" alt='likeOnBook'/>
                        <img className='book' src="./assets/image/books/10.svg" alt='books'/>
                        <span className='bookName'>Milk and honey</span>  
                        <span className='author'>Rupi Kaur</span>
                        <div className='books__stars'>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <span>5</span>
                        </div>
                        <input className='books__addButton' type='button' value='$ 55.99 USD'/> 
                    </div>
                    <div className='books__div'>
                        <img className='likeOnBook' src="./assets/image/books/likeOnBook.svg" alt='likeOnBook'/>
                        <img className='book' src="./assets/image/books/11.svg" alt='books'/>
                        <span className='bookName'>Moby Dick</span>  
                        <span className='author'>Herman Melville</span>
                        <div className='books__stars'>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <span>5</span>
                        </div>
                        <input className='books__addButton' type='button' value='$ 60.00 USD'/> 
                    </div>
                    <div className='books__div'>
                        <img className='likeOnBook' src="./assets/image/books/likeOnBook.svg" alt='likeOnBook'/>
                        <img className='book' src="./assets/image/books/12.svg" alt='books'/>
                        <span className='bookName'>The Crying book</span>  
                        <span className='author'>Heather Christle</span>
                        <div className='books__stars'>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/star.svg" alt='star'/>
                            <img src="./assets/image/books/hollowStar.svg" alt='star'/>
                            <img src="./assets/image/books/hollowStar.svg" alt='star'/>
                            <span>3</span>
                        </div>
                        <input className='books__addButton' type='button' value='$ 70.00 USD'/> 
                    </div>
            </Books>
            <BooksPagesControler>
                <img src="./assets/image/books/left.svg" alt='left'/>
                <div>
                    <img src="./assets/image/books/darkPoint.svg" alt='point'/>
                    <img src="./assets/image/books/whitePoint.svg" alt='starpoint'/>
                    <img src="./assets/image/books/whitePoint.svg" alt='point'/>
                </div>
                <img src="./assets/image/books/right.svg" alt='right'/>
            </BooksPagesControler>
            <Banner isLoggedIn={localStorage .getItem('isLoggedIn')}>
                <img className='bannerKingdome' src="./assets/image/bannerKingdome.svg" alt='bannerKingdome'/>
                <img className='bannerFay' src="./assets/image/bannerFay.svg" alt='bannerFay'/>
                <div className='banner__text'>
                    <h1>Authorize now</h1>
                    <span>Authorize now and discover the fabulous <br/> world of books</span>
                    <input type='button' value='Log In' onClick={toAuthorization}/>
                </div>
            </Banner>
        </div>
    );
  }

  export default MainPage;