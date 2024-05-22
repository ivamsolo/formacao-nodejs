import { HttpResponseModel } from "../models/http-response-model";

export const httpResponse = async (data: any):Promise <HttpResponseModel> => {
    let code = 204;
    
    if (data) code = 200;
    return {
        statusCode: code,
        body: data
    };
};
