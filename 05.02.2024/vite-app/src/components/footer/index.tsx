import { styled } from "styled-components"

const Foo = styled.footer`
    background-color: #FBF9F1;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 70px;
    width: 100%;
`;

export default function Footer(){
    return(
        <Foo>
            <p>Copyright Jakub Gajewy 2024</p>
        </Foo>
    )
}