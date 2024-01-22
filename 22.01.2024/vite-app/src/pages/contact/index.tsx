import Heading from "../../components/heading"

import "./index.scss"

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

export default function Contact(){
    return(
        <div>
            <Heading title={"Contact"}/>
            <form method="get" action="/contact">
                <label>E-mail <input type="email" name="email" onChange={validateEmail}/></label>
                <span id="emailSpan"></span>
                <label>Topic 
                    <select name="topic">
                        <option>Topic 1</option>
                        <option>Topic 2</option>
                        <option>Topic 3</option>
                        <option>Topic 4</option>
                        <option>Topic 5</option>
                    </select>
                </label>
                <label>I agree to process my personal data <input type="checkbox" name="personalData" onChange={validatePersonalData}/></label>
                <span id="personalDataSpan"></span>
                <label>Message <textarea name="message" rows={3} onChange={validateMessage}></textarea></label>
                <span id="messageSpan"></span>
                <input type="Button" value="Send" onClick={validateForm}/>
            </form>
        </div>
    )
}