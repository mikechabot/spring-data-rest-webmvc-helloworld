package org.mikechabot.controller;

import org.mikechabot.service.ExampleService;
import org.mikechabot.ajax.AjaxResponseFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.http.ResponseEntity;

/**
 * Created by mikechabot on 10/30/15.
 */
@Controller
@RequestMapping(value = "/example")
public class ExampleController {

    @Autowired
    private AjaxResponseFactory ajaxResponseFactory;

    @Autowired
    private ExampleService exampleService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity getExampleData() {
        return ajaxResponseFactory.successWithData(exampleService.getExampleData());
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity createExampleData() {
        exampleService.createExampleData();
        return ajaxResponseFactory.successWithMessage("Successfully created example data");
    }

    @RequestMapping(value = "/delete/all", method = RequestMethod.POST)
    public ResponseEntity clearCollection() {
        exampleService.clearCollection();
        return ajaxResponseFactory.successWithMessage("Purged collection");
    }

}
