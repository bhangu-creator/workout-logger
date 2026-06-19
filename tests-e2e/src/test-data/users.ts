export interface User {

    email:string,
    password : string
}

export const validUser : User = {

    email: process.env.TEST_USER_EMAIL!,
    password : process.env.TEST_USER_PASSWORD!

}