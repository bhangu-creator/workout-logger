export interface SignupData 
{
    name: string,
    email: string,
    password: string
}

export interface SignupResponse 
{
    message: string,
    user: {
        id: string
        name: string,
        email: string
    }

}

export const validUser : SignupData =
{
    name : "tester",
    email : `testuser_${Date.now()}@mail.com`,
    password : "123Password!"
}

export const duplicateUser : SignupData =
{
    name : "toast",
    email : `testpy@gmail.com`,
    password : "123Password!"
}

export const passwordMissingUser : SignupData =
{
    name : "toast",
    email : `testuser_${Date.now()}@mail.com`,
    password : ""
}

export const invalidEmailUser : SignupData =
{
    name : "toast",
    email : 'wrong-email-format',
    password : "123Password!"
}

export const expectedResponseSignup =
{
    message: "User registered Successfully",
    user: {
        id: "6a3bb6d7609f3187a78a4876",
        name: "tester",
        email: "bhangutoastt@gmail.com"
    }
}

export const duplicateEmailSignupResponse =
{
    "success": false,
    "error": "User already exists"
}

export const missingPasswordSignupResponse =
{
    "success": false,
    "error": "Password must have at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and be 8+ characters long."
}

