const UserRepository = require("../Repository/user-repository");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_KEY } = require("../config/serverConfig")

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }


    async create(data) {
        try {
            const response = this.userRepository.create(data);
            return response;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
            return result;
        } catch (error) {
            console.log("something went wrong in token creation");
            throw (error);
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("something went wrong in token verification");
            throw (error);
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw error;
        }
    }

    async signIN(email,password){
        try {
            const response=await this.userRepository.getByEmail(email);

            const passwordcheck=this.checkPassword(password,response.password);
            if(!passwordcheck) {
                console.log("Password doesn't match");
                throw {error: 'Incorrect password'}
            }
            // now if password is correct generate a new token

            const JWT_creation=this.createToken({email:response.email,id:response.id})
            return JWT_creation;
            }

         catch (error) {
            console.log("Something went wrong in signin process");
            throw error;
        }
    }

    

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if (!response) {
                throw { error: "invalid token" };
            }
            const user = await this.userRepository.getById(response.id)//we didn't do destructuring as userid is not an object having multiple values but a variable having single value
            if(!user){
                throw {error: 'No user with the corresponding token exists'};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in Authentication process");
            throw error;
        }
    }

    async isAdmin(userid){
        try {
            return this.userRepository.isAdmin(userid);
        } catch (error) {
            console.log("Something went wrong in isAdmin ");
            throw error;
        }
    }
}

module.exports = UserService