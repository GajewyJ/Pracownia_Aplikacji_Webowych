import {routes} from "../../helpers/routes"

import styled from "styled-components"

const Nav = styled.div`
    background-color: #FBF9F1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 80px;
    width: 100%;
`;

const Link = styled.a`
    background-color: #AAD7D9;
    width: 17%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60%;
    text-decoration: none;
    color: black;
    border-radius: 20px;
    text-transform: uppercase;
    font-size: 1em;

    transition: box-shadow 0.35s;

    &:hover{
        box-shadow: 6px 6px 24px -4px rgba(0,0,0,0.67);
        -webkit-box-shadow: 6px 6px 24px -4px rgba(0,0,0,0.67);
        -moz-box-shadow: 6px 6px 24px -4px rgba(0,0,0,0.67);
    }

    &:focus{
        box-shadow: 6px 6px 24px -4px rgba(0,0,0,0.67);
        -webkit-box-shadow: 6px 6px 24px -4px rgba(0,0,0,0.67);
        -moz-box-shadow: 6px 6px 24px -4px rgba(0,0,0,0.67);
        outline: none;
    }
`;

export default function NavBar(){
    return(
        <Nav>
            {routes.map((route) => (
                <Link href={route.path}>{route.label}</Link>
            ))}
        </Nav>
    )
}