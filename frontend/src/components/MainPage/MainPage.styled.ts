import styled from 'styled-components';

export const HeaderBackground = styled.div`
    position: relative;
    width: 88%;
    height: 400px;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    background: #F0F4EF;
    border-radius: 16px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 96%;
        height: 289px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 90%;
        height: 505px;
        margin-top: 90px;
    }

.headerBackground__books {
    position: absolute;
    width: 42.3%;
    max-width: 536px;
    height: auto;
    max-height: 262px;
    bottom: 0;
    left: 0;
    z-index.: -1;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 43.3%;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 80%;
        top: 0;
        left: 20%;
        max-width: 374px;
    }
}

.headerBackground__girl{
    position: absolute;
    width: 31.7%;
    height: auto;
    max-height: 400px; 
    right: 98px;
    bottom: 0;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 328px;
        right: 14px;
        top: -35px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 253px;
        bottom: 0;
        left: 6.2%;
    }
}
`;

export const HeaderBackgroundDiv = styled.div`
    position: relative;    
    z-index: 1;
    display: flex;
    flex-direction: column;
    width: 40.78%;
    margin-left: 8.4%;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 408px;
        margin-left: 4.9%;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 79.3%;
        text-align: center;
    }

h1 {
    font-size: 40px;
    line-height: 60px;
    color: #0D1821;
    margin-bottom: 0;
    margin-top: 80px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        font-size: 32px;
        line-height: 48px;
        margin-top: 45px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        font-size: 18px;
        line-height: 27px;
        margin-top: 20px;
    }
}

span {
    font-size: 20px;
    line-height: 30px;
    color: #344966;
    margin-top: 10px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        line-height: 24px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        font-size: 14px;
        line-height: 21px;
    }
}

input {
    width: 44%;
    height: 44px;
    color: #F0F4EF;
    font-size: 16px;
    line-height: 24px;  
    background: #344966;
    border-radius: 16px;
    margin-top: 50px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 56.3%;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 86.9%;
        font-size: 12px;
        line-height: 18px;
        margin-top: 30px;
        margin-left: auto;
        margin-right: auto;
    }
}
`;

export const Catalog = styled.div<{genreIsEditing: boolean, sortByIsEditing: boolean, sortBy: string, priceSliderIsEditing: boolean}>`
    width: 88.8%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 110px;
    font-family: Poppins;
    line-height: 27px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 96.4%;
    }

.catalog__header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        position: relative;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        position: relative;;
    }
}

h1 {
    margin-top: 0;
    font-size: 40px;
    line-height: 60px;
    color: #0D1821;
    font-weight: 700;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        position: absolute;
        top: -60px;
        font-size: 32px;
        line-height: 48px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        position: absolute;
        top: -70px;
        font-size: 32px;
        line-height: 48px;
    }
}

.catalog__header-select {
    position: relative;
    width: 49%;
    display: flex;
    justify-content: space-between;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 100%;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        flex-direction: column;
        width: 100%;
    }
}

.header-select__genre {
    position: relative;
    width 31%;
    z-index: 2;
    ::after {
        z-index: -1;
        content: "";
        position: absolute;
        width: 24px;
        height: 24px;
        background: url(./assets/image/arrow.svg);
        color: #000000;
        background-repeat: no-repeat;
        top: 10px;
        left: 83.6%;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 100%;
        margin-bottom: 20px;
    }
}

.select-genre__ul {
        display: ${props => props.genreIsEditing? '' : 'none'};
        position: absolute;
        z-index: 2;
        color: #344966;
        width: 100%;
        list-style-type: none;
        font-size: 16px;
        line-height: 28px;
        font-weight: 500;
        padding-left: 5px;
        padding-top: 15px;
        background: #F0F4EF;
        border-radius: 16px;

        img {
            position: absolute;
            top: -10px;
            left: 10px;
        }

        li {
            padding-bottom: 10px;
            input {
                margin-right: 5px;
                transform:scale(2);
                background-image: url(./assets/image/noChecked.svg);
                background-repeat: no-repeat;
            }
        }
}

.select-sortBy__ul{
    display: ${props => props.sortByIsEditing? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    width: 100%;
    padding-left: 5px;
    background: #F0F4EF;
    border-radius: 16px;
    padding-top: 16px;
    margin-top: 13px;
    img {
        position: absolute;
        top: -10px;
        left: 10px;
    }
    input {
        color: #B9BAC4;
        color: ${props => props.sortBy === ''? 'flex' : 'none'};
        text-align: start;
        border: none;
        margin-bottom: 12px;
        background: transparent;
    }
    #price {
        color: ${props => props.sortBy === 'price'? ' #344966' : '#B9BAC4'};
    }
    #name {
        color: ${props => props.sortBy === 'name'? ' #344966' : '#B9BAC4'};
    }
    #authorName {
        color: ${props => props.sortBy === 'authorname'? ' #344966' : '#B9BAC4'};
    }
    #rating {
        color: ${props => props.sortBy === 'rating'? ' #344966' : '#B9BAC4'};
    }
    #dateOfIssue {
        color: ${props => props.sortBy === 'dateofissue'? ' #344966' : '#B9BAC4'};
    }
}

.checkbox {
   font-size: 50px;
}

.select-genre__button {
    -webkit-appearance: none;
    width 100%;
    height: 48px;
    background: #F0F4EF;
    background-color: rgb(240, 244, 239, 0.5);
    border: none;
    border-radius: 16px;
    color: #344966;
    font-size: 18px;
    line-height: 28px;
    padding-left: 17px;
    padding-right: 66.3%;
}

.header-select__price {
    position: relative;
    z-index: 1;
    width 31%;
    height: 48px;
    border: none;
    border-radius: 16px;
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 100%;
        margin-bottom: 20px;
    }
}

.header-select__sortBy {
    position: relative;
    width 31%;
    z-index: 0;
    ::after {
        z-index: -1;
        content: "";
        position: absolute;
        width: 24px;
        height: 24px;
        background: url(./assets/image/arrow.svg);
        color: #000000;
        background-repeat: no-repeat;
        top: 10px;
        left: 83.6%;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 100%;
        margin-bottom: 20px;
    }
}
.select-price__slider {
    display: ${props => props.priceSliderIsEditing? '' : 'none'};
    position: relative;
    width: 413px;
    height: 151px;
    background: #F0F4EF;
    border-radius: 16px;
    margin-top: 26px;
    img {
        position: absolute;
        top: -10px;
        left: 10px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 100%;
    }
}
  
.price-controls span {
    width: 50px;
    margin: 0;

    color: inherit;
    font: inherit;

    background: none;
    border: none;
    outline: none;
}

.bar {
    position: absolute;
    width: 91.4%;
    height: 12px;
    top: 50px;
    left: 4.3%;
    background: #D6D8E7;
    border-radius: 40px;    
}

.bar2 {
    position: absolute;
    width: 80%;
    height: 12px;
    top: 50px;
    left: 4.3%;
    background: #BFCC94;
    border-radius: 40px;
}
  
.range-toggle {
    position: absolute;
    top: 40px;
    width: 32px;
    height: 32px;
    background: #F7F7FC;
    border: 2px solid #BFCC94;
    box-sizing: border-box;
    border-radius: 40px;
}
  
.range-toggle:hover {
    background: #1c4f80;
}
  
.range-toggle-min {
    left: 4.3%;
}
  
.range-toggle-max {
    left: 80%;
}

.minAndMaxPrice {
    position: absolute;
    width: 91%;
    display: flex;
    justify-content: space-between;
    top: 77px;
    left: 4.3%;
    color: #344966;
    font-weight: 400;
    font-size: 16px;
    line-height: 34px;
}

.select-price__button {
    width: 100%;
    height: 48px;
    border: none;
    border-radius: 16px;
    background: rgb(240, 244, 239, 0.5);
    color: #344966;
    font-size: 18px;
    line-height: 28px;
    padding-right: 66.3%;
}

.select-price__arrow {
    z-index: -1;
    position: absolute;
    width: 24px;
    height: 24px;
    left: 83.6%;
    top: 12px;
}

.select-sortBy__button {
    color: #0D1821;
    background: rgb(255, 255, 255, 0.5);
    -webkit-appearance: none;
    width 100%;
    height: 48px;
    border: none;
    border-radius: 16px;
    font-size: 18px;
    line-height: 28px;
    padding-right: 66.3%;
}
`;

export const Books = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 88.8%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 96.4%;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        margin-top: 40px;
        position: relative;   
    }

    div {
        display: flex;
        flex-direction: column;
    }

.books__div {
    @media screen and (min-width: 320px) and (max-width:833px) {
        position: relative;
        z-index: -1;
        height: 400px;
        margin-bottom: 30px;   
    }
}

.book {
    margin-bottom: 30px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 254px;
        height: auto;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 135px;
        margin-bottom: 15px;
    }
}

.bookName {
    font-weight: 500;
    color: #344966;
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 135px;
        font-size: 14px;
        line-height: 21px;
    }
}

.author {
    margin-bottom: 21px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #B9BAC4;
    @media screen and (min-width: 320px) and (max-width:833px) {
        margin-bottom: 21px;
        font-size: 14px;
        line-height: 21px;
    }
}

.books__stars {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 32px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 254px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        position: absolute;
        top: 300px;
        width: 135px;
        margin-bottom: 80px;
    }
    img {
        width: 23px;
        height: 23px;
        @media screen and (min-width: 833px) and (max-width:1439px) {
            width: 18px;
            height: 18px;
        }
        @media screen and (min-width: 320px) and (max-width:833px) {
            width: 13px;
            height: 13px;
            margin-bottom: 17px;
        }
    }
    span {
        color: #B9BAC4;
        @media screen and (min-width: 320px) and (max-width:833px) {
            margin-top: -5px;
            font-size: 16px;
            line-height: 24px;
        }
    }
}

.books__addButton {
    background: #344966;
    border-radius: 16px;
    width: 305px;
    height: 48px;
    color: #F0F4EF;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    border: none;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 254px;
        font-size: 16px;
        line-height: 28px;
        margin-bottom: 29px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        position: absolute;
        top: 340px;
        left: 0;
        width: 135px;
        font-size: 16px;
        line-height: 28px;
        margin-bottom: 29px;
    }
}

.books__notActive {
    background: #B9BAC4;
    border-radius: 16px;
    width: 305px;
    height: 48px;
    color: #F0F4EF;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    border: none;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 254px;
        font-size: 16px;
        line-height: 28px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        position: absolute;
        top: 340px;
        left: 0;
        width: 135px;
        font-size: 16px;
        line-height: 28px;
        margin-bottom: 29px
    }
}
`;

export const BooksPagesControler = styled.div`
    display: flex;
    justify-content: space-between;
    width: 18.6%;
    margin-left: auto;
    margin-right: auto;
    height: 24px;
    margin-top: 80px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 33.3%;
        margin-top: 50px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 83.7%;
        margin-top: 20px;
    }
    div {
        width: 41.4%;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
        img {
            width: 13px;
            height: 13px;
        }
    }
`;

export const Banner = styled.div<{loggedIn: boolean}>`
    display: ${props => props.loggedIn? 'none' : ''};
    position: relative;
    margin-top: 97px;
    margin-left: auto;
    margin-right: auto;
    width: 88.8%;
    height: 400px;
    background: #F0F4EF;
    border-radius: 16px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 96.2%;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 90.3%;
        height: 501px;
    }

.bannerKingdome{
    position: absolute;
    left: 8.4%;
    top: -10px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 389px;
        left: 0;
        top: 95px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 282px;
        top: 280px;
        left: 0;
    }
}

.bannerFay{
    position: absolute;
    right:0;
    top: -63px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 377px;
        left: 55%;
        top: 15px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 246px;
        top: 0;
        right:0;
    }
}

.banner__text {
    position: relative;
    width: 32.4%;
    display: flex;
    flex-direction: column;
    margin-left: 59.1%;
    z-index: 1;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 48.7%;
        margin-left: 51.1%;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 86%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }
    
    h1 {
        margin-bottom: 10px;
        margin-top: 80px;
        font-weight: 700;
        font-size: 40px;
        line-height: 60px;
        @media screen and (min-width: 833px) and (max-width:1439px) {
            font-size: 32px;
            line-height: 48px;
            margin-top: 60px;
        }
        @media screen and (min-width: 320px) and (max-width:833px) {
            font-size: 18px;
            line-height: 27px;
        }
    }
    span {
        margin-bottom: 50px;
        font-weight: 500;
        font-size: 20px;
        line-height: 30px;
        color: #0D1821;
        @media screen and (min-width: 833px) and (max-width:1439px) {
            font-size: 16px;
            line-height: 24px;
        }
        @media screen and (min-width: 320px) and (max-width:833px) {
            font-size: 14px;
            line-height: 21px;
        }
    }
    input {
        width: 55.6%;
        height: 44px;
        background: #344966;
        border-radius: 16px;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #F0F4EF;
        @media screen and (min-width: 833px) and (max-width:1439px) {
            width: 59.2%;
        }
        @media screen and (min-width: 320px) and (max-width:833px) {
            width: 92%;
            max-width: 385px;
            margin-left: auto;
            margin-right: auto;
        }    
    }
}
`;