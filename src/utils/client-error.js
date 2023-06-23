const Apperrors=require("./error-handling");

class ClientError extends Apperrors{
    constructor(name,message,explanation,statuscode){
        super(
            name,message,explanation,statuscode
        )
    }
}


module.exports=ClientError