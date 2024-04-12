import bcrypt from 'bcrypt'

export const hashPassword = async (password)=>{
    try{
        const hashedPass = await bcrypt.hash(password,10)
        return hashedPass
    }
    catch(err){
        console.log('error',err)
    }

};

export const comparePass = async(password,hashedPassword) =>{
    try {
        return bcrypt.compare(password,hashedPassword)
    }
    catch(err){

    }
}

export default {comparePass,hashPassword}