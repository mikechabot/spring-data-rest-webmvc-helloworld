package org.mikechabot.ajax;

import org.springframework.stereotype.Component;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * Factory class to generate ResponseEntity objects
 * Created by mikechabot on 10/30/15.
 */
@Component
public class AjaxResponseFactory<T> {

    public ResponseEntity<JsonResponse<T>> success() {
        return getResponseEntity(HttpStatus.OK, AjaxResponseStatus.SUCCESS, null, null, null);
    }

    public ResponseEntity<JsonResponse<T>> successWithMessage (String message) {
        if (message == null || message.isEmpty()) throw new IllegalArgumentException("Message cannot be null/empty.");
        return getResponseEntity(HttpStatus.OK, AjaxResponseStatus.SUCCESS, message, null, null);
    }

    public ResponseEntity<JsonResponse<T>> successWithData (T t) {
        if (t == null) throw new IllegalArgumentException("Data cannot be null.");
        return getResponseEntity(HttpStatus.OK, AjaxResponseStatus.SUCCESS, null, t, null);
    }

    public ResponseEntity<JsonResponse<T>> successWithMessageAndData (String message, T t) {
        if (message == null || message.isEmpty() || t == null) throw new IllegalArgumentException("Status and/or data cannot be null/empty");
        return getResponseEntity(HttpStatus.OK, AjaxResponseStatus.SUCCESS, message, t, null);
    }

    public ResponseEntity<JsonResponse<T>> successWithMessageDataAndHeaders (String message, T t, HttpHeaders headers) {
        if (message == null || message.isEmpty() || t == null || headers == null) throw new IllegalArgumentException("Message, data and/or headers cannot be null/empty");
        return getResponseEntity(HttpStatus.OK, AjaxResponseStatus.SUCCESS, message, t, headers);
    }

    public ResponseEntity<JsonResponse<T>> fail() {
        return getResponseEntity(HttpStatus.OK, AjaxResponseStatus.FAIL, null, null, null);
    }

    public ResponseEntity<JsonResponse<T>> failWithMessage (String message) {
        if (message == null || message.isEmpty()) throw new IllegalArgumentException("Message cannot be null/empty.");
        return getResponseEntity(HttpStatus.OK, AjaxResponseStatus.FAIL, message, null, null);
    }

    public ResponseEntity<JsonResponse<T>> failWithData (T t) {
        if (t == null) throw new IllegalArgumentException("Data cannot be null.");
        return getResponseEntity(HttpStatus.OK, AjaxResponseStatus.FAIL, null, t, null);
    }

    public ResponseEntity<JsonResponse<T>> failWithMessageAndData (String message, T t) {
        if (message == null || message.isEmpty() || t == null) throw new IllegalArgumentException("Status and/or data cannot be null/empty");
        return getResponseEntity(HttpStatus.OK, AjaxResponseStatus.FAIL, message, t, null);
    }

    public ResponseEntity<JsonResponse<T>> error () {
        return getResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR, AjaxResponseStatus.ERROR, null, null, null);
    }

    public ResponseEntity<JsonResponse<T>> errorWithMessage (String message) {
        if (message == null || message.isEmpty()) throw new IllegalArgumentException("Message cannot be null/empty.");
        return getResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR, AjaxResponseStatus.ERROR, message, null, null);
    }

    public ResponseEntity<JsonResponse<T>> errorWithData(T t) {
        if (t == null) throw new IllegalArgumentException("Data cannot be null.");
        return getResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR, AjaxResponseStatus.ERROR, null, t, null);
    }

    public ResponseEntity<JsonResponse<T>> errorWithMessageAndData (String message, T t) {
        if (message == null || message.isEmpty() || t == null) throw new IllegalArgumentException("Status and/or data cannot be null/empty");
        return getResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR, AjaxResponseStatus.ERROR, message, t, null);
    }

    /**
     * ResponseEntity represents the complete HTTP response
     * @param httpStatus
     * @param responseStatus
     * @param message
     * @param t
     * @param headers
     * @return an HTTP response object
     */
    private ResponseEntity<JsonResponse<T>> getResponseEntity(HttpStatus httpStatus, AjaxResponseStatus responseStatus, String message, T t, HttpHeaders headers) {
        if (httpStatus == null) throw new IllegalArgumentException("HttpStatus cannot be null");
        return new ResponseEntity(getResponseBody(responseStatus, message, t), headers, httpStatus);
    }

    /**
     * JsonResponse represents the body of the HTTP response
     * @param responseStatus
     * @param message
     * @param t
     * @return
     */
    private JsonResponse<T> getResponseBody(AjaxResponseStatus responseStatus, String message, T t) {
        if (responseStatus == null) throw new IllegalArgumentException("ResponseStatus cannot be null");
        return new JsonResponse(responseStatus, message, t);
    }

}
