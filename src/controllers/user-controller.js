const UserService = require("../services/user-service");


const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        })
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new user',
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            message: error.message,
            data: {},
            success: false,
            err: error.explanation
        })
    }

}

const signIN = async (req, res) => {
    try {
        const response = await userService.signIN(req.body.email, req.body.password);
        return res.status(200).json({
            success: true,
            data: response,
            err: {},
            message: 'Successfully signed in'
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            message: error.message,
            data: {},
            success: false,
            err: error.explanation
        })
    }
}

const isAuthenticated = async (req, res) => {
    try {
        const token=req.headers['x-access-token'];
        const response=await userService.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            data: response,
            err: {},
            message: 'Successfully Authenticated'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        })
    }
}

const isAdmin = async (req, res) => {
    try{
        const result=await userService.isAdmin(req.body.id);
        // console.log(result);
        return res.status(200).json({
            success:true,
            data:result,
            err:{},
            message:"the user is an admin or not"
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong in isAdmin',
            data: {},
            success: false,
            err: error
        })
    }
}



module.exports = {
    create, signIN, isAuthenticated,isAdmin
}