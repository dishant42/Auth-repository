const UserRepository=require("../Repository/user-repository");

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
}

module.exports=UserService