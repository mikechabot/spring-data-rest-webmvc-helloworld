package org.mikechabot.ajax;

import org.mikechabot.model.Example;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.testng.Assert.*;

import java.util.*;

public class AjaxResponseFactoryTest {

    @InjectMocks
    private AjaxResponseFactory ajaxResponseFactory;

    @Mock
    private ResponseEntity responseEntity;

    private final HttpStatus OK = HttpStatus.OK;
    private final HttpStatus INTERNAL_SERVER_ERROR = HttpStatus.INTERNAL_SERVER_ERROR;

    private static final AjaxResponseStatus SUCCESS = AjaxResponseStatus.SUCCESS;
    private static final AjaxResponseStatus FAIL = AjaxResponseStatus.FAIL;
    private static final AjaxResponseStatus ERROR = AjaxResponseStatus.ERROR;

    @BeforeMethod
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testSuccessShouldHaveCorrectStatuses() throws Exception {
        ResponseEntity entity = ajaxResponseFactory.success();
        JsonResponse response = (JsonResponse) entity.getBody();

        assertEquals(entity.getStatusCode(), OK);
        assertEquals(response.getStatus(), SUCCESS);
        assertEquals(response.getStatusMessage(), null);
        assertEquals(response.getData(), null);
    }

    @Test
    public void testSuccessWithMessageShouldReturnTheMessage() throws Exception {
        ResponseEntity entity = ajaxResponseFactory.successWithMessage("This is a test message");
        JsonResponse response = (JsonResponse) entity.getBody();

        assertEquals(entity.getStatusCode(), OK);
        assertEquals(response.getStatus(), SUCCESS);
        assertEquals(response.getStatusMessage(), "This is a test message");
        assertEquals(response.getData(), null);
    }

    @Test
    public void testSuccessWithDataShouldReturnTheData() throws Exception {
        Example data = mock(Example.class);
        when(data.getId()).thenReturn("123-abc-345");

        ResponseEntity entity = ajaxResponseFactory.successWithData(data);
        assertEquals(entity.getStatusCode(), OK);

        JsonResponse responseWithMessage = (JsonResponse) entity.getBody();
        assertEquals(responseWithMessage.getStatus(), SUCCESS);
        assertEquals(responseWithMessage.getData(), data);
        assertEquals(responseWithMessage.getStatusMessage(), null);

        Example example = (Example) ((JsonResponse) entity.getBody()).getData();

        assertNotNull(example);
        assertEquals(example, data);
        assertEquals(example.getId(), data.getId());
    }

    @Test
    public void testSuccessWithMessageAndDataShouldReturnTheMessageAndData() throws Exception {
        Example data = mock(Example.class);
        when(data.getId()).thenReturn("123-abc-345");

        ResponseEntity entity = ajaxResponseFactory.successWithMessageAndData("This is a message", data);
        assertEquals(entity.getStatusCode(), OK);

        JsonResponse responseWithMessage = (JsonResponse) entity.getBody();
        assertEquals(responseWithMessage.getStatus(), SUCCESS);
        assertEquals(responseWithMessage.getData(), data);
        assertEquals(responseWithMessage.getStatusMessage(), "This is a message");

        Example example = (Example) ((JsonResponse) entity.getBody()).getData();

        assertNotNull(example);
        assertEquals(example, data);
        assertEquals(example.getId(), data.getId());
    }

    @Test
    public void testSuccessWithMessageDataAndHeadersShouldReturnTheMessageDataAndHeaders() throws Exception {
        final String HEADER_KEY = "header-key";
        final String HEADER_VALUE = "header-value";

        Example data = mock(Example.class);
        when(data.getId()).thenReturn("123-abc-345");

        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.add(HEADER_KEY, HEADER_VALUE);

        ResponseEntity entity = ajaxResponseFactory.successWithMessageDataAndHeaders("This is a message", data, requestHeaders);
        assertEquals(entity.getStatusCode(), OK);

        JsonResponse responseWithMessage = (JsonResponse) entity.getBody();
        assertEquals(responseWithMessage.getStatus(), SUCCESS);
        assertEquals(responseWithMessage.getData(), data);
        assertEquals(responseWithMessage.getStatusMessage(), "This is a message");

        Example example = (Example) ((JsonResponse) entity.getBody()).getData();

        assertNotNull(example);
        assertEquals(example, data);
        assertEquals(example.getId(), data.getId());

        HttpHeaders headers = entity.getHeaders();

        assertNotNull(headers);
        assertEquals(headers.size(), 1);

        List<String> headerValues = headers.get(HEADER_KEY);

        assertNotNull(headerValues);
        assertEquals(headerValues, requestHeaders.get(HEADER_KEY));
        assertEquals(headerValues.size(), requestHeaders.get(HEADER_KEY).size());
        assertEquals(headerValues.get(0), requestHeaders.get(HEADER_KEY).get(0));
        assertEquals(headerValues.get(0), HEADER_VALUE);
    }

    @Test(expectedExceptions=IllegalArgumentException.class)
    public void testSuccessWithNullMessageShouldThrowException() throws Exception {
        ajaxResponseFactory.successWithMessage(null);
    }

    @Test(expectedExceptions=IllegalArgumentException.class)
    public void testSuccessWithNullDataShouldThrowException() throws Exception {
        ajaxResponseFactory.successWithData(null);
    }

    @Test(expectedExceptions=IllegalArgumentException.class)
    public void testSuccessWithNullMessageOrDataShouldThrowException() throws Exception {
        ajaxResponseFactory.successWithMessageAndData(null, null);
    }

    @Test(expectedExceptions=IllegalArgumentException.class)
    public void testSuccessWithNullMessageDataOrHeadersShouldThrowException() throws Exception {
        ajaxResponseFactory.successWithMessageDataAndHeaders(null, null, null);
    }

    @Test
    public void testFailShouldHaveCorrectStatuses() throws Exception {
        ResponseEntity entity = ajaxResponseFactory.fail();
        JsonResponse response = (JsonResponse) entity.getBody();

        assertEquals(entity.getStatusCode(), OK);
        assertEquals(response.getStatus(), FAIL);
        assertEquals(response.getStatusMessage(), null);
        assertEquals(response.getData(), null);
    }

    @Test
    public void testFailWithMessageShouldReturnTheMessage() throws Exception {
        ResponseEntity entity = ajaxResponseFactory.failWithMessage("This is a test message");
        JsonResponse response = (JsonResponse) entity.getBody();

        assertEquals(entity.getStatusCode(), OK);
        assertEquals(response.getStatus(), FAIL);
        assertEquals(response.getStatusMessage(), "This is a test message");
        assertEquals(response.getData(), null);
    }

    @Test
    public void testFailWithDataShouldReturnTheData() throws Exception {
        Example data = mock(Example.class);
        when(data.getId()).thenReturn("123-abc-345");

        ResponseEntity entity = ajaxResponseFactory.failWithData(data);
        assertEquals(entity.getStatusCode(), OK);

        JsonResponse responseWithMessage = (JsonResponse) entity.getBody();
        assertEquals(responseWithMessage.getStatus(), FAIL);
        assertEquals(responseWithMessage.getData(), data);
        assertEquals(responseWithMessage.getStatusMessage(), null);

        Example example = (Example) ((JsonResponse) entity.getBody()).getData();

        assertNotNull(example);
        assertEquals(example, data);
        assertEquals(example.getId(), data.getId());
    }

    @Test
    public void testFailWithMessageAndDataShouldReturnTheMessageAndData() throws Exception {
        Example data = mock(Example.class);
        when(data.getId()).thenReturn("123-abc-345");

        ResponseEntity entity = ajaxResponseFactory.failWithMessageAndData("This is a message", data);
        assertEquals(entity.getStatusCode(), OK);

        JsonResponse responseWithMessage = (JsonResponse) entity.getBody();
        assertEquals(responseWithMessage.getStatus(), FAIL);
        assertEquals(responseWithMessage.getData(), data);
        assertEquals(responseWithMessage.getStatusMessage(), "This is a message");

        Example example = (Example) ((JsonResponse) entity.getBody()).getData();

        assertNotNull(example);
        assertEquals(example, data);
        assertEquals(example.getId(), data.getId());
    }


    @Test(expectedExceptions=IllegalArgumentException.class)
    public void testFailWithNullMessageShouldThrowException() throws Exception {
        ajaxResponseFactory.failWithMessage(null);
    }

    @Test(expectedExceptions=IllegalArgumentException.class)
    public void testFailWithNullDataShouldThrowException() throws Exception {
        ajaxResponseFactory.failWithData(null);
    }

    @Test(expectedExceptions=IllegalArgumentException.class)
    public void testFailWithNullMessageOrDataShouldThrowException() throws Exception {
        ajaxResponseFactory.failWithMessageAndData(null, null);
    }

    @Test
    public void testErrorShouldHaveCorrectStatuses() throws Exception {
        ResponseEntity entity = ajaxResponseFactory.error();
        JsonResponse response = (JsonResponse) entity.getBody();

        assertEquals(entity.getStatusCode(), INTERNAL_SERVER_ERROR);
        assertEquals(response.getStatus(), ERROR);
        assertEquals(response.getStatusMessage(), null);
        assertEquals(response.getData(), null);
    }

    @Test
    public void testErrorWithMessageShouldReturnTheMessage() throws Exception {
        ResponseEntity entity = ajaxResponseFactory.errorWithMessage("This is a test message");
        JsonResponse response = (JsonResponse) entity.getBody();

        assertEquals(entity.getStatusCode(), INTERNAL_SERVER_ERROR);
        assertEquals(response.getStatus(), ERROR);
        assertEquals(response.getStatusMessage(), "This is a test message");
        assertEquals(response.getData(), null);
    }

    @Test
    public void testErrorWithDataShouldReturnTheData() throws Exception {
        Example data = mock(Example.class);
        when(data.getId()).thenReturn("123-abc-345");

        ResponseEntity entity = ajaxResponseFactory.errorWithData(data);
        assertEquals(entity.getStatusCode(), INTERNAL_SERVER_ERROR);

        JsonResponse responseWithMessage = (JsonResponse) entity.getBody();
        assertEquals(responseWithMessage.getStatus(), ERROR);
        assertEquals(responseWithMessage.getData(), data);
        assertEquals(responseWithMessage.getStatusMessage(), null);

        Example example = (Example) ((JsonResponse) entity.getBody()).getData();

        assertNotNull(example);
        assertEquals(example, data);
        assertEquals(example.getId(), data.getId());
    }

    @Test
    public void testErrorWithMessageAndDataShouldReturnTheMessageAndData() throws Exception {
        Example data = mock(Example.class);
        when(data.getId()).thenReturn("123-abc-345");

        ResponseEntity entity = ajaxResponseFactory.errorWithMessageAndData("This is a message", data);
        assertEquals(entity.getStatusCode(), INTERNAL_SERVER_ERROR);

        JsonResponse responseWithMessage = (JsonResponse) entity.getBody();
        assertEquals(responseWithMessage.getStatus(), ERROR);
        assertEquals(responseWithMessage.getData(), data);
        assertEquals(responseWithMessage.getStatusMessage(), "This is a message");

        Example example = (Example) ((JsonResponse) entity.getBody()).getData();

        assertNotNull(example);
        assertEquals(example, data);
        assertEquals(example.getId(), data.getId());
    }


    @Test(expectedExceptions=IllegalArgumentException.class)
    public void testErrorWithNullMessageShouldThrowException() throws Exception {
        ajaxResponseFactory.errorWithMessage(null);
    }

    @Test(expectedExceptions=IllegalArgumentException.class)
    public void testErrorWithNullDataShouldThrowException() throws Exception {
        ajaxResponseFactory.errorWithData(null);
    }

    @Test(expectedExceptions=IllegalArgumentException.class)
    public void testErrorWithNullMessageOrDataShouldThrowException() throws Exception {
        ajaxResponseFactory.errorWithMessageAndData(null, null);
    }

}