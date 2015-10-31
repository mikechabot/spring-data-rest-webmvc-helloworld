package org.mikechabot.controllers;

import org.mikechabot.ajax.AjaxResponseFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.http.ResponseEntity;

import java.util.Date;

/**
 * Created by mikechabot on 10/30/15.
 */
@Controller
@RequestMapping(value = "/example")
public class ExampleController {

    @Autowired
    private AjaxResponseFactory ajaxResponseFactory;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity getDate() {
        return ajaxResponseFactory.success(null, new Date());
    }

}
