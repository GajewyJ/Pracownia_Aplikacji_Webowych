import Heading from "../../components/heading"

import "./index.scss"

function validateForm(this: any, e: any){
    e.preventDefault();
    const target = e.currentTarget.parentNode;
    const email = target.email;
    const message = target.message;

    if (!email.value) {
        email.parentNode.parentNode.querySelector("#emailSpan").innerText = "Invalid e-mail";
    }
    if (message.value.length < 20) {
        email.parentNode.parentNode.querySelector("#messageSpan").innerText = "Message can not be shorter that 20 characters";
    }

    //target.submit();
}

export default function Contact(){
    return(
        <div>
            <Heading title={"Contact"}/>
            <form method="post">
                <label>E-mail <input type="email" name="email"/></label>
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
                <label>I agree to process my personal data <input type="checkbox" name="personalData"/></label>
                <label>Message <textarea name="message" rows={3} onChange={validateForm}></textarea></label>
                <span id="messageSpan"></span>
                <input type="Button" value="Send" onClick={validateForm}/>
            </form>
        </div>
    )
}