
export interface SignupData 
{
    name: string,
    email: string,
    password: string
}


export interface LoginData 
{
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

export const validLoginUser : LoginData =
{
    email:"testpy@gmail.com",
    password: "#67Dattebayo"
}

export const validLoginUserApi : LoginData =
{
    email:"bhanguparminder1@gmail.com",
    password: "Bhangug67@"
}

export const invalidPasswordLoginUser : LoginData =
{
    email:"testpy@gmail.com",
    password: "#67Datasaayo"
}

export const invalidEmailLoginUser : LoginData =
{
    email:"testpyy@gmail.com",
    password: "#67Dattebayo"
}

export const emptyLoginUser : LoginData =
{
    email:"",
    password: "#67Dattebayo"
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

export const invalidEmailSignupResponse =
{
    "error": "Invalid email"
}

export const validLoginResponse = 
{
    message: "Login Successful",
    user: {
        id: "6a30f3094e836a7c03e6ffbe",
        name: "bhangu",
        email: "testpy@gmail.com"
    },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMzBmMzA5NGU4MzZhN2MwM2U2ZmZiZSIsImVtYWlsIjoidGVzdHB5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYmhhbmd1IiwiaWF0IjoxNzgyMzc5ODYyLCJleHAiOjE3ODI0NjYyNjJ9.rIql5eAikqF8mBP1haIdkiwlPizDQwmnBvA-9XGxBeM"
}

export const invalidPasswordLogin =
{
    "success": false,
    "error": "Invalid Credentials"
}

export const emptyLoginUserResponse =
{
    "success": false,
    "error": "Email and Password are required"
}

