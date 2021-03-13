var responseValidator= function(expectedStatus,validationFunction){
    return {
        json:function(statusCode,data){
            statusCode.should.equal(expectedStatus);
            validationFunction(data);
        },
        send:function(statusCode,data){
            statusCode.should.equal(expectedStatus);
            validationFunction(data);
        }
    }

};

module.exports={
    responseValidator
};