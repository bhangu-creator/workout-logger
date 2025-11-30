//this file contains the methods used to validate all the input done by user in login/signup forms

//validate the entered email 
export function validateEmail(email)
{
    if(!email.trim()) return "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format";
    return ""

}

//validate the entered username 
export function validateUsername(name)
{
    if(!name.trim()) return "Username is required";
    else if (name.trim().length>30) return "username is too long";
    return ""

}

//validate the entered password in signup form 
export function validateStrongPassword(pswd)
{
    if(!pswd.trim()) return "password is required";
    else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,15}$/.test(pswd))
    {
        return "Password must be 8+ chars, include uppercase, lowercase, number, special char";
    }
    return ""
}

//validate the entered password in login form  
export function validatePassword(pswd)
{
    if(!pswd.trim()) return "password is required";
    return ""
}

//validate the confirm password input

export function confirmPassword(pswdstr1,pswdstr2)
{
    if(pswdstr1.trim()!==pswdstr2.trim()) {return "Entered password is not a match"}
    else {return ""}

}