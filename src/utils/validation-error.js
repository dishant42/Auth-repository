const Apperrors=require("./error-handling");
const {StatusCodes}=require("http-status-codes");

class validationError extends Apperrors{
    constructor(error){
        let errorname=error.name;
        let explanation=[];
        error.errors.forEach(element => {
            explanation.push(element.message);
            
        });
        super(
            errorname,
            "not able to validate data sent in the request",
            explanation,
            StatusCodes.BAD_REQUEST
        )

    }
}


module.exports=validationError