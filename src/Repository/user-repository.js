const {user}=require("../models/index");

class UserRepository{

    async create(data){
        try {
            const User=await user.create(data);
            return User;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async destroy(userId) {
        try {
            await user.destroy({
                where: {
                    id: userId
                }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async getById(userId) {
        try {
            const User = await user.findByPk(userId, {
                attributes: ['email', 'id']           //we dont want to even expose encrypted passwords that's why we did attributes 
            });
            return User;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async getByEmail(email){
        try {
            const result=await user.findOne({
                where:{
                    email:email
                }
            })
            return result;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
}

module.exports=UserRepository;