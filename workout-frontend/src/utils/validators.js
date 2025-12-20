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

//function to validate the add exercise form input fields

export function validateExercise(name,sets,reps,weight,duration,calories)
{
    const errors={};
    const s=Number(sets);
    const r=Number(reps);
    const w=Number(weight);
    const d=Number(duration);
    const c=Number(calories);
    //validating exercise name
    if (!name||!name.trim()) errors.exname="Exercise name is required" 
    //validates exercise name length
    else if (name.trim().length<2 || name.trim().length>50) errors.exname="Exercise name should contain between 2-50 characters"

    //validating sets type
    if (sets!=null && sets!=""){
    if(Number.isNaN(s)) errors.sets="sets should be numeric"
    //validating sets value
    else if (s>10 ) errors.sets="sets value must be lower than 10"
    }

    //validating reps type
    if (reps!=null && reps!=""){
    if(Number.isNaN(r)) errors.reps="reps should be numeric"
    //validating reps value
    else if (r>50 )  errors.reps="reps value must be lower than 50"
    }

    //validating weight type
    if (weight!=null && weight!=""){
    if(Number.isNaN(w)) errors.weight="weight should be numeric"
    //validating reps value
    else if (w>1000)  errors.weight="weight value must be lower than 1000"
    }

    //validating duration type
    if (duration!=null && duration!=""){
    if(Number.isNaN(d)) errors.duration="duration should be numeric"
    //validating reps value
    else if (d<1 || d>1440 )  errors.duration="duration value must be between 1-1440"
    }

    //validating calories type
    if (calories!=null && calories!=""){
    if(Number.isNaN(c)) errors.calories="calories should be numeric"
    //validating reps value
    else if (c<1 || c>10000 )  errors.calories="calories value must be between 1-10000"
    }

    return errors;

}

//function to validate the specific fields of exercises

export function validateSpecificExercise(key,value)
{
    //when key is name of exercise
    if(key=="name")
    {
    //validating exercise name
    if (!value||!value.trim()) return "Exercise name is required" 
    //validates exercise name length
    else if (value.trim().length<2 || value.trim().length>50) return "Exercise name should contain between 2-50 characters"
    }

    //when key is sets of exercise
    else if(key=="sets" && value!=null && value!="")
    {
        const s=Number(value);
        if(Number.isNaN(s)) return "sets should be numeric"
        //validating sets value
        else if (s>10 ) return "sets value must be lower than 10"
    }
    
    //when key is reps of exercise
    else if(key=="reps" && value!=null && value!="")
    {
        const r=Number(value);
        if(Number.isNaN(r)) return "reps should be numeric"
        //validating reps value
        else if (r>50 )  return "sets value must be lower than 50"

    }

    //when key is weight of exercise
    else if(key=="weight" && value!=null && value!="")
    {
        const w=Number(value);
        if(Number.isNaN(w)) return "weight should be numeric"
        //validating reps value
        else if (w>1000)  return "weight value must be lower than 1000"
    }

     //when key is duration of exercise
     else if(key=="duration" && value!=null && value!="")
     {
        const d=Number(value);
        if(Number.isNaN(d)) return "duration should be numeric"
        //validating reps value
        else if (d<1 || d>1440 )  return "duration value must be between 1-1440"

     }

     //when key is calories of exercise
     else if(key=="kcalBurned" && value!=null && value!="")
     {
        const c=Number(value);
        if(Number.isNaN(c)) return "calories should be numeric"
        //validating reps value
        else if (c<1 || c>10000 )  return   "calories value must be between 1-10000"
     }

    }

    //function to validate the form submission
    export function canSubmitWorkout(title,type,exercise)
    {
        const errors={
            title:"",
            type:"",
            global:"",
            nullExercise:"",
            isValid:true
        }
        //validate the Title of Workout
        if(!title||!title.trim()){ errors.title="Workout Title is required"
            errors.isValid=false
        }
        else if(title.trim().length<2 || title.trim().length>50) { errors.title="Workout Title length must be between 2-50" 
            errors.isValid=false}

        //validate the Type of Workout
        if(!type){ errors.type="Select a valid Workout Type"
            errors.isValid=false
        }

        //validate if any exercise is added 
        if(! exercise || exercise.length==0){
            errors.isValid=false
            errors.nullExercise="Please add atleset 1 exercise in this Workout"
        }
        else {

        //validate if any error is present in side exercises

        const hasExerciseErrors=exercise.some((ex)=>
        {
            return ex.errors && Object.values(ex.errors).some(val=>val)
        })

        if (hasExerciseErrors){
            
            errors.global = "Please fix the highlighted errors before submitting";
            errors.isValid=false
        }
    }
        
        return errors;
    }