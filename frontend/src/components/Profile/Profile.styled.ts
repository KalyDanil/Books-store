import styled from 'styled-components';

export const Profile = styled.div<{isMakingNewPassword: boolean}>`
.profile__avatar {
    position: absolute;
    width: 305px;
    height: 305px;
    background: #F0F4EF;
    border-radius: 16px;
    margin-left: 5.5%;
    margin-top: 60px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 255px;
        height: 255px;
        margin-left: 1.7%;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        position: relative;
        width: 290px;
        height: 290px;
        margin-left: auto;
        margin-right: auto;
    }
}

.profifile__avatar-default {
    margin-left: 77px;
    margin-top: 77px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 135px;
        height: 135px;
        margin-left: 60px;
        margin-top: 60px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 153px;
        height: 153px;
        margin-left: 68px;
        margin-top: 68px;
    }
}

.profifile__avatar-camera {
   position: absolute;
   z-index: 2;
   top: 237px;
   left: 237px;
   @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 40px;
        height: 40px;
        top: 200px;
        left: 200px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 40px;
        height: 40px;
        top: 230px;
        left: 230px;
    }
}

.personalInformation {
    position: relative;
    width: 36.5%;
    margin-left: 35.6%;
    margin-top: 60px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 63.4%;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 90.6%;
        margin-left: 4.6%;
        margin-top: 30px;
    }
}

.personalInformation__inputText {
    width: calc(100% - 64px);
    height: 34px;
    background: #F0F4EF;
    border-radius: 16px;
    border: none;
    padding-left: 64px;
    padding-top: 30px;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    color: #344966;
    margin-bottom: 20px;  
}

.personalInformation__header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 30px;
    @media screen and (min-width: 320px) and (max-width:833px) {
        flex-direction: column;
    }
    h1 {
        margin: 0;
        font-weight: 500;
        font-size: 20px;
        line-height: 30px;
        color: #0D1821;
        @media screen and (min-width: 833px) and (max-width:1439px) {
            font-size: 16px;
            line-height: 24px;
        }
        @media screen and (min-width: 320px) and (max-width:833px) {
            font-size: 16px;
            line-height: 24px;
        }
    }
    span {
        cursor: default;
        margin-top: 5px;
        text-decoration-line: underline;
        color: #8D9F4F;
        @media screen and (min-width: 833px) and (max-width:1439px) {
            font-size: 12px;
            line-height: 18px;
        }
        @media screen and (min-width: 320px) and (max-width:833px) {
            font-size: 12px;
            line-height: 18px;
        }
    }
}

.personalInformation__div {
    position: relative;
    span {
        position: absolute;
        color: #344966;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        top: 6px;
        left: 64px;
    }
    img {
        position: absolute;
        top: 22px;
        left: 27px;
    }
}

.personalInformation__passwordHeader {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 30px;
    margin-top: 40px;
    h1 {
        margin: 0;
        font-weight: 500;
        font-size: 20px;
        line-height: 30px;
        color: #0D1821;
        @media screen and (min-width: 833px) and (max-width:1439px) {
            font-size: 16px;
            line-height: 24px;
        }
        @media screen and (min-width: 320px) and (max-width:833px) {
            font-size: 16px;
            line-height: 24px;
        }
    }
    span {
        cursor: default;
        margin-top: 5px;
        text-decoration-line: underline;
        color: #8D9F4F;
        @media screen and (min-width: 833px) and (max-width:1439px) {
            font-size: 12px;
            line-height: 18px;
        }
        @media screen and (min-width: 320px) and (max-width:833px) {
            font-size: 12px;
            line-height: 18px;
        }
    }
}

.personalInformation__newPassword {
    display: ${props => props.isMakingNewPassword? '' : 'none'};
    position: relative;
    padding-top: 0px;
    width: 100%;
    input {
        width: calc(100% - 64px);
        height: 64px;
        background: #F0F4EF;
        border-radius: 16px;
        border: none;
        font-weight: 400;
        font-size: 16px;
        line-height: 28px;
        color: #344966;
        margin-top: 9px;
        padding-left: 64px;
        ::placeholder {
            color: #B9BAC4;
        } 
    }
    img {
        position: absolute;
        top: 30px;
        left: 27px;
    }
    span {
        font-size: 14px;
        line-height: 24px;
        font-weight: 500;
        color: #344966;
        margin-top: 9px;
        margin-bottom: 50px;
    }
}

.personalInformation__button {
    display: ${props => props.isMakingNewPassword? '' : 'none'};
    width: 32.5%;
    height: 44px;
    background: #344966;
    border-radius: 16px;
    border: none;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #F0F4EF;
    margin-top: 50px;
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 58%;
    }
}
`;


