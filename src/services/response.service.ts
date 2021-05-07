import { ServerErrorResponseBody, SuccessResponseBody, SuccessWithCountResponseBody, UserErrorResponseBody } from '@models/dtos';
import { SERVER_ERROR_CODE, USER_ERROR_CODE } from '@src/models/enums';

export class ResponseService {

    BadRequest(_message?: string): UserErrorResponseBody {
        const code = USER_ERROR_CODE.BAD_REQUEST;
        const message = _message || 'Bad Request';
        return { status: false, error: { code, message } };
    }

    Success(data?: any): SuccessResponseBody {
        return { status: true, data };
    }

    SuccessWithCount(data: any, rowCount): SuccessWithCountResponseBody {
        return { status: true, data, rowCount };
    }

    FailedToSave(_message?: string): ServerErrorResponseBody {
        const code = SERVER_ERROR_CODE.FAILED_TO_SAVE;
        const message = _message || 'Failed to Save Object in the Server';
        return { status: false, error: { code, detail: message } };
    }

    InternalServerError(detail: any): ServerErrorResponseBody {
        const code = SERVER_ERROR_CODE.INTERNAL_SERVER_ERROR;
        return { status: false, error: { code, detail } };
    }

    DeleteRestrictedError(): UserErrorResponseBody {
        const code = USER_ERROR_CODE.DELETE_RESTRICTED;
        const message = 'Cannot Delete Items Linked to Other Object';
        return { status: false, error: { code, message } };
    }
}