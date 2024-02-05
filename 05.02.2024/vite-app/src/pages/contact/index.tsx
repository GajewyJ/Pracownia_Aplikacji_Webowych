import styled from "styled-components";
import Heading from "../../components/heading"

function validateForm(e: any){
    e.preventDefault();
    const target = e.currentTarget.parentNode;
    const email = target.email;
    const message = target.message;
    const personalData = target.personalData;
    const topic = target.topic;

    let sendCheck:boolean = true;

    if (!email.value) {
        email.parentNode.parentNode.querySelector("#emailSpan").innerText = "Invalid e-mail";
        email.style.border = "1px solid red";
        sendCheck = false;
    }
    if (message.value.length < 20) {
        message.parentNode.parentNode.querySelector("#messageSpan").innerText = "Message must be at least 20 characters long";
        message.style.border = "1px solid red";
        sendCheck = false;
    }
    if (!personalData.checked) {
        personalData.parentNode.parentNode.querySelector("#personalDataSpan").innerText = "You must agree to continue";
        sendCheck = false;
    }

    if(sendCheck){
        console.log({email: email.value, topic: topic.value, message: message.value});
        target.innerText = "Your message has been sent";
    }
}

function validateEmail(e: any){
    e.preventDefault;
    const email = e.currentTarget;

    if (!email.value) {
        email.parentNode.parentNode.querySelector("#emailSpan").innerText = "Invalid e-mail";
        email.style.border = "1px solid red";
    }
    else{
        email.parentNode.parentNode.querySelector("#emailSpan").innerText = "";
        email.style.border = "none";
    }
}

function validateMessage(e: any){
    e.preventDefault;
    const message = e.currentTarget;

    if (message.value.length < 20) {
        message.parentNode.parentNode.querySelector("#messageSpan").innerText = "Message must be at least 20 characters long";
        message.style.border = "1px solid red";
    }
    else {
        message.parentNode.parentNode.querySelector("#messageSpan").innerText = "";
        message.style.border = "none";
    }
}

function validatePersonalData(e: any){
    e.preventDefault;
    const personalData = e.currentTarget;

    if (!personalData.checked) {
        personalData.parentNode.parentNode.querySelector("#personalDataSpan").innerText = "";
    }
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 25%;
    height: 300px;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 40px;
`;

const Label = styled.label`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const WrongSpan = styled.span`
    color: red;
    font-size: 1.1em;
`;

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const Input = styled.input`
    width: 65%;
    height: 30px;
    border: none;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 10px;
    outline: none;
`;

const Select = styled.select`
    width: 65%;
    border: none;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 7px;
    outline: none;
`;

const Checkbox = styled.input`
    width: 15px;
    height: 15px;
`;

const Textarea = styled.textarea`
    width: 65%;
    resize: none;
    border: none;
    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;
    outline: none;
`;

const Button = styled.input`
    background-color: #AAD7D9;
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    text-decoration: none;
    border: none;
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

export default function Contact(){
    return(
        <Div>
            <Heading title={"Contact"}/>
            <Form method="get" action="/contact">
                <Label>E-mail <Input type="email" name="email" onChange={validateEmail}/></Label>
                <WrongSpan id="emailSpan"></WrongSpan>
                <Label>Topic 
                    <Select name="topic">
                        <option>Topic 1</option>
                        <option>Topic 2</option>
                        <option>Topic 3</option>
                        <option>Topic 4</option>
                        <option>Topic 5</option>
                    </Select>
                </Label>
                <Label>I agree to process my personal data <Checkbox type="checkbox" name="personalData" onChange={validatePersonalData}/></Label>
                <WrongSpan id="personalDataSpan"></WrongSpan>
                <Label>Message <Textarea name="message" rows={3} onChange={validateMessage}></Textarea></Label>
                <WrongSpan id="messageSpan"></WrongSpan>
                <Button type="Button" value="Send" onClick={validateForm}/>
            </Form>
        </Div>
    )
}