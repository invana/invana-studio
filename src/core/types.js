//


export class Request {
    queryString = null
    payload = null

    timestamp = null
}

export class Response {
    status = null
    result = null
    timestamp = null
}

export class QueryEvent{

    request = Request
    response = Response

    queryType = null // console, internal
    elapsedTime = null

}
