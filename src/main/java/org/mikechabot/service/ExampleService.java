package org.mikechabot.service;

import org.mikechabot.model.Example;

import java.util.List;

/**
 * Created by mikechabot on 10/31/15.
 */
public interface ExampleService {

    List<Example> getExampleData();
    void createExampleData();
    void clearCollection();

}
