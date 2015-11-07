package org.mikechabot.ajax;

/**
 * Created by mikechabot on 11/1/15.
 */
public enum AjaxResponseStatus {
    SUCCESS,    // The HTTP and business request were successful
    FAIL,       // The HTTP request was successful, but the business request encountered a failure condition (e.g. failed validation)
    ERROR       // The HTTP or business request encountered an error condition (e.g. MongoClientException, 401 Bad Request)
}
