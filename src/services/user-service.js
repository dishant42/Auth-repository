const UserRepository=require("../Repository/user-repository");
const jwt=require("jsonwebtoken");
const{JWT_KEY}=require("../config/serverConfig")

class UserService{
    constructor(){
        this.userRepository=new UserRepository();
    }


    async create(data){
        try {
            const response=this.userRepository.create(data);
            return response;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    createToken(user){
        try {
            const result=jwt.sign(user,JWT_KEY,{expiresIn:"1d"});
            return result;
        } catch (error) {
            console.log("something went wrong in token creation");
            throw(error);
        }
    }

    verifyToken(token){
        try {
            const response=jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("something went wrong in token verification");
            throw(error);
        }
    }
}

module.exports=UserService