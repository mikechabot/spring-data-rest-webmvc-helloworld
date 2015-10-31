package org.mikechabot.ajax;

import org.springframework.stereotype.Component;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * Factory class to generate ResponseEntity objects, which represent the entire HTTP response.
 * Created by mikechabot on 10/30/15.
 */
@Component
public class AjaxResponseFactory<T> {

    private enum AjaxResponseStatus {
        SUCCESS,    // The HTTP and business request were successful
           FAIL,    // The HTTP request was successful, but the business request encountered a failure condition (e.g. failed validation)
          ERROR     // The HTTP or business request encountered an error condition (e.g. MongoClientException, 401 Bad Request)
    }

    public ResponseEntity<JsonResponse<T>> success() {
        return getResponseEntity(HttpStatus.OK, AjaxResponseStatus.SUCCESS, null, null, null);
    }

    public ResponseEntity<JsonResponse<T>> successWithMessage (String statusMessage) {
        return getResponseEntity(HttpStatus.OK, AjaxResponseStatus.SUCCESS, statusMessage, null, null);
    }

    public ResponseEntity<JsonResponse<T>> successWithData (T t) {
        return getResponseEntity(HttpStatus.OK, AjaxResponseStatus.SUCCESS, null, t, null);
    }

    public ResponseEntity<JsonResponse<T>> successWithMessageAndData (String statusMessage, T t) {
        return getResponseEntity(HttpStatus.OK, AjaxResponseStatus.SUCCESS, statusMessage, t, null);
    }

    public ResponseEntity<JsonResponse<T>> successWithMessageDataAndHeaders (String statusMessage, T t, HttpHeaders headers) {
        return getResponseEntity(HttpStatus.OK, AjaxResponseStatus.SUCCESS, statusMessage, t, headers);
    }

    public ResponseEntity<JsonResponse<T>> fail() {
        return getResponseEntity(HttpStatus.OK, AjaxResponseStatus.FAIL, null, null, null);
    }

    public ResponseEntity<JsonResponse<T>> failWithMessage (String statusMessage) {
        return getResponseEntity(HttpStatus.OK, AjaxResponseStatus.FAIL, statusMessage, null, null);
    }

    public ResponseEntity<JsonResponse<T>> failWithData (T t) {
        return getResponseEntity(HttpStatus.OK, AjaxResponseStatus.FAIL, null, t, null);
    }

    public ResponseEntity<JsonResponse<T>> failWithMessageAndData (String statusMessage, T t) {
        return getResponseEntity(HttpStatus.OK, AjaxResponseStatus.FAIL, statusMessage, t, null);
    }

    public ResponseEntity<JsonResponse<T>> error () {
        return getResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR, AjaxResponseStatus.ERROR, null, null, null);
    }

    public ResponseEntity<JsonResponse<T>> errorWithMessage (String statusMessage) {
        return getResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR, AjaxResponseStatus.ERROR, statusMessage, null, null);
    }

    public ResponseEntity<JsonResponse<T>> errorWithData(T t) {
        return getResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR, AjaxResponseStatus.ERROR, null, t, null);
    }

    public ResponseEntity<JsonResponse<T>> errorWithMessageAndData (String statusMessage, T t) {
        return getResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR, AjaxResponseStatus.ERROR, statusMessage, t, null);
    }

    public ResponseEntity<JsonResponse<T>> forbidden () {
        return getResponseEntity(HttpStatus.FORBIDDEN, AjaxResponseStatus.ERROR, null, null, null);
    }

    public ResponseEntity<JsonResponse<T>> forbiddenWithMessage (String statusMessage) {
        return getResponseEntity(HttpStatus.FORBIDDEN, AjaxResponseStatus.ERROR, statusMessage, null, null);
    }

    public ResponseEntity<JsonResponse<T>> forbiddenWithData (T t) {
        return getResponseEntity(HttpStatus.FORBIDDEN, AjaxResponseStatus.ERROR, null, t, null);
    }

    public ResponseEntity<JsonResponse<T>> forbiddenWithMessageAndData (String statusMessage, T t) {
        return getResponseEntity(HttpStatus.FORBIDDEN, AjaxResponseStatus.ERROR, statusMessage, t, null);
    }


    /**
     * ResponseEntity represents the complete HTTP response
     * @param httpStatus
     * @param responseStatus
     * @param statusMessage
     * @param t
     * @param headers
     * @return an HTTP response object
     */
    private ResponseEntity<JsonResponse<T>> getResponseEntity(HttpStatus httpStatus, AjaxResponseStatus responseStatus, String statusMessage, T t, HttpHeaders headers) {
        if (httpStatus == null) throw new IllegalArgumentException("HttpStatus cannot be null");
        return new ResponseEntity(getResponseBody(responseStatus, statusMessage, t), headers, httpStatus);
    }

    /**
     * JsonResponse represents the body of the HTTP response
     * @param responseStatus
     * @param statusMessage
     * @param t
     * @return
     */
    private JsonResponse<T> getResponseBody(AjaxResponseStatus responseStatus, String statusMessage, T t) {
        if (responseStatus == null) throw new IllegalArgumentException("ResponseStatus cannot be null");
        return new JsonResponse(responseStatus, statusMessage, t);
    }

    /**
     * Generic AJAX response object. Consumed by JavaScript services
     * @param <T>
     */
    public static class JsonResponse<T> {

        private AjaxResponseStatus status;
        private String statusMessage;
        private T data;

        public JsonResponse(AjaxResponseStatus status, String statusMessage, T data) {
            if (status == null) throw new IllegalArgumentException("ResponseStatus cannot be null");
            this.status = status;
            this.statusMessage = statusMessage;
            this.data = data;
        }

        public AjaxResponseStatus getStatus() {
            return status;
        }

        public void setStatus(AjaxResponseStatus status) {
            this.status = status;
        }

        public String getStatusMessage() {
            return statusMessage;
        }

        public void setStatusMessage(String statusMessage) {
            this.statusMessage = statusMessage;
        }

        public T getData() {
            return data;
        }

        public void setData(T data) {
            this.data = data;
        }
    }

}
