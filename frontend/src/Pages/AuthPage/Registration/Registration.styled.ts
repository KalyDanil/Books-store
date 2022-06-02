import styled from 'styled-components';

export const RegistrationForm = styled.form`
    display: flex;
    width: 28.6%;
    flex-direction: column;
    margin-top: 94px;
    margin-left: 5.5%;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 47%;
        margin-left: 15px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 90%;
        margin-left: 4.6%;
    }
    
.registration__header {
    font-weight: 700;
    font-size: 40px;
    line-height: 60px;
    color: #0D1821;
    @media screen and (min-width: 320px) and (max-width:833px) {
        font-size: 18px;
        line-height: 27px;
    }
}

.registration__input {
    width: 100%;
    height: 64px;
    background-color: #F0F4EF;
    border: none;
    border-radius: 16px;
    padding-left: 5.8%;
    margin-top: 30px;
    :focus-within {
        ::placeholder {
            visibility: hidden;
        }
    }
    ::placeholder {
        padding-left: 35px;
        font-weight: 400;
        font-size: 16px;
        line-height: 28px;
        padding-bottom: 5px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 94.2%;
        ::placeholder {
            font-size: 14px;
        }
    }
}

span {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #344966;
    margin-top: 9px;
    @media screen and (min-width: 320px) and (max-width:833px) {
        font-size: 12px;
    }
}

.registration__email {
    ::placeholder {
        background: url(./assets/image/email.svg) no-repeat;
    }
}

.registration__password {
    ::placeholder {
        background: url(./assets/image/hide.svg) no-repeat;
    }
}

.registration__button {
    background: #344966;
    border-radius: 16px;
    border: none;
    width: 40.2%;
    height: 44px;
    margin-top: 60px;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: #F0F4EF;
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 57.2%;
        margin-top: 40px;
    }
}
`;

export const Picture = styled.div`
    position: absolute;
    top: 178px;
    left: 51.9%;
    width: 42.5%;
    max-width: 1000px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        top: 267px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        position: static;
        width: 90.6%;
        max-width: 434px;
        margin-top: 60px;
        margin-left: auto;
        margin-right: auto;
    }

.registration__picture {
    width: 100%;
    height: auto;
}
`;