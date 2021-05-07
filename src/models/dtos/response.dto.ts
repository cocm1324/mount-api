import { SERVER_ERROR_CODE, USER_ERROR_CODE } from "@models/enums";

export interface ResponseBody {
    status: boolean;
}

export interface SuccessResponseBody extends ResponseBody {
    data: any | any[];
}

export interface SuccessWithCountResponseBody extends ResponseBody {
    data: any | any[];
    rowCount: number;
}

export interface UserErrorResponseBody extends ResponseBody {
    error: {
        code: USER_ERROR_CODE;
        message: string;
    }
}

export interface ServerErrorResponseBody extends ResponseBody {
    error: {
        code: SERVER_ERROR_CODE;
        detail: any;
    }
}