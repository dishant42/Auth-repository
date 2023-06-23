const {user,Role}=require("../models/index");
const validationError=require("../utils/validation-error");
const ClientError=require("../utils/client-error");
const {StatusCodes}=require("http-status-codes");

class UserRepository{

    async create(data){
        try {
            const User=await user.create(data);
            return User;
        } catch (error) {
           if(error.name == 'SequelizeValidationError'){
            throw new validationError(error);
           }
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
            if(!result){
                throw new ClientError(
                    'Attribute not found',
                    'Invalid email',
                    'Please check email, as there is no record',
                    StatusCodes.NOT_FOUND
                );
            }
            return result;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async isAdmin(userid){
        try {
            const User=await user.findByPk(userid);
            const people_having_adminrole=await Role.findOne({
                where:{
                    name:"ADMIN"
                }
            })
            const result=await User.hasRole(people_having_adminrole);
            return result;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
}

module.exports=UserRepository;