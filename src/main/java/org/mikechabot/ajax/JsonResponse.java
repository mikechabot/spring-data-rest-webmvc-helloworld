package org.mikechabot.ajax;

/**
 * Generic AJAX response object. Consumed by JavaScript services
 * @param <T>
 * Created by mikechabot on 11/1/15.
 */
public class JsonResponse<T> {

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