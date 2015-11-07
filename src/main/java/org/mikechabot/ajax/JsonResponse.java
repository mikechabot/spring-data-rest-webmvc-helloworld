package org.mikechabot.ajax;

/**
 * Generic AJAX response object. Consumed by JavaScript services
 * @param <T>
 * Created by mikechabot on 11/1/15.
 */
public class JsonResponse<T> {

    private AjaxResponseStatus status;
    private String message;
    private T data;

    public JsonResponse(AjaxResponseStatus status, String message, T data) {
        if (status == null) throw new IllegalArgumentException("ResponseStatus cannot be null");
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public AjaxResponseStatus getStatus() {
        return status;
    }

    public void setStatus(AjaxResponseStatus status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

}