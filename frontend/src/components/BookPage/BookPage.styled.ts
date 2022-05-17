import styled from 'styled-components';

export const BookPageStyle = styled.div<{isLoggedIn: boolean}>`
.bookDiv {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 88.8%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 60px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 96.4%;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 90.6%;
        margin-top: 110px;   
    }
}
.bookCoverDiv {
    position: relative;
    width: 40.7%;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 48.6%;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 46.5%;
        max-width: 150px;
    }
}

.bookCover {
    width: 100%;
    height: auto;
}

.bookLike {
    position: absolute;
    width: 59px;
    top: 30px;
    left: 82.9%;
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 30px;
        top: 25px;
        left: 65%;
    }
}

.bookInformation {
    width: 43.7%;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 48.6%;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 46.5%;   
    }
}

.bookInformation__name {
    font-style: normal;
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 700;
    font-size: 40px;
    line-height: 60px;
    @media screen and (min-width: 320px) and (max-width:833px) {
        font-size: 18px;
        line-height: 20px;   
    }
}

.bookInformation__author {
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
    @media screen and (min-width: 320px) and (max-width:833px) {
        font-size: 12px;
        line-height: 18px;
    }
}

.bookStars {
    display: flex;
    flex-direction: row;
    margin-top: 31px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        flex-direction: column;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        flex-direction: column;
        margin-top: 15px;
    }
    img {
        width: 27px;
        height: 27px;
        @media screen and (min-width: 833px) and (max-width:1439px) {
            width: 23px;
            height: 23px;
        }
        @media screen and (min-width: 320px) and (max-width:833px) {
            width: 14px;
            height: 14px;
        }
    }
    span {
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #B9BAC4;
    }
}

.bookRating {
    margin-right: 41px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        margin-bottom: 17px;
    }
    img {
        margin-right: 14px;
    }
    span {
        position: relative;
        top: -5px;
        @media screen and (min-width: 320px) and (max-width:833px) {
            top: 0px;
            left: -7px; 
        }
    }
}

.makingRatingDiv {
    display: flex;
    flex-direction: row;
    @media screen and (min-width: 320px) and (max-width:833px) {
        flex-direction: column;
        margin-top: 10px;
    }
}

.starsToRate {
    display: ${props => props.isLoggedIn? 'flex' : 'none'};
    justify-content: space-between;
    margin-right: 41px;
    width: 208px;
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 100%;
        max-width: 177px;
    }
}

.defaultStarsToRate {
    display: ${props => props.isLoggedIn? 'none' : 'flex'};
    justify-content: space-between;
    margin-right: 41px;
    width: 208px;
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 100%;
        max-width: 177px;
    }
}

.rateThisBook {
    span {
        position: relative;
        top: -5px;
        left: 10px;
        @media screen and (min-width: 833px) and (max-width:1439px) {
            font-size: 16px;
            line-height: 24px;
        }
        @media screen and (min-width: 320px) and (max-width:833px) {
            left: 0;
            top: 10px;
            font-size: 12px;
            line-height: 18px;
        }
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        img {
            display: none;
        }
    }
    
}

.bookDesctiptionAndButton {
    @media screen and (min-width: 320px) and (max-width:833px) {
        position: relative;
        width: 215%;
        top: 70px;
        right: 115%;
    }
}

.bookDescription__h {
    margin-top: 31px;
    margin-bottom: 0;
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
}

.bookDescription {
    width: 100%;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #344966;
    @media screen and (min-width: 320px) and (max-width:833px) {
        font-size: 12px;
        line-height: 18px;
    }
}

.buyingButton {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 88px;
    margin-top: 74px;
    @media screen and (min-width: 320px) and (max-width:833px) {
        margin-top: 30px;
    }
    div {
        width: 39%;
        display: flex;
        flex-direction: column;
        @media screen and (min-width: 320px) and (max-width:833px) {
            width: 46.5%;
        }
        span{
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
            color: #344966;
        }
    }
    input {
        width: 100%;
        height: 50px;
        margin-top: 14px;
        border: none;
        border-radius: 16px;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 30px;
        @media screen and (min-width: 320px) and (max-width:833px) {
            font-size: 12px;
            line-height: 18px;
        }
    }
}

.active {
    background: #344966;
    color: #F0F4EF;
}

.notAvailable {
    background: #B9BAC4;
    color: #F0F4EF;
}

.commentsDiv {
    margin-top: 110px;
    width: 88.8%;;
    margin-left: auto;
    margin-right: auto;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 96.4%;
        margin-top: 0px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 90.6%;
    }
    h1 {
        margin-bottom: 50px;
    }
}

.makingComments {
    display: ${props => props.isLoggedIn? 'flex' : 'none'};
    flex-direction: column;
    width: 57.6%;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 82.9% ;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 100%;
    }
}

.makingComments__text {
    background: #F0F4EF;
    border: none;
    border-radius: 16px;
    width: calc(100%% - 24px);
    margin-top: 30px;
    padding-left: 24px;
    height: 128px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.75px;
    color: #344966;
    @media screen and (min-width: 320px) and (max-width:833px) {
        font-size: 12px;
    }
    :focus {
        ::placeholder {
            visibility: hidden;
        }
    }
    ::placeholder {
        position: absolute;
        top: 20px;
        left: 24px;
        font-weight: 400;
        font-size: 16px;
        line-height: 28px;
        letter-spacing: 0.75px;
        color: #B9BAC4;
        @media screen and (min-width: 320px) and (max-width:833px) {
            font-size: 12px;
        }
    }
}

.makingComments__button {
    margin-top: 30px;
    width: 276px;
    height: 50px;
    background: #344966;
    border-radius: 16px;
    border: none;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: 0.75px;
    color: #F0F4EF;
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 210px;
        height: 38px;
        font-size: 12px;
        line-height: 18px;
    }
}

.recommendations {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 88.8%;
    padding-top: 98px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 96.4%;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 96.6%;
        margin-top: 0px;
        position: relative;   
    }
    h1 {
        position: absolute;
        top: 0;
        left: 10px;
        @media screen and (min-width: 320px) and (max-width:833px) {
            font-weight: 700;
            font-size: 18px;
            line-height: 27px;
            top: 50px;
        }
    }
}
`