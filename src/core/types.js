//


export class Request {
    queryString = null
    timestamp = null
}

export class Response {
    status = null
    data = null
    timestamp = null
    elapsed_time = null
}

export class QueryHistory{
    queryString = null
    queryPayload = null
    queryType = null // console, internal
    timestamp = null
}
