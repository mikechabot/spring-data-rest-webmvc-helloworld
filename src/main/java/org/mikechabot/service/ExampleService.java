package org.mikechabot.service;

import org.mikechabot.model.Example;

import java.util.List;

/**
 * Created by mikechabot on 10/31/15.
 */
public interface ExampleService {


    List<Example> getExampleData();
    List<Example> getByName(String name);
    void createExampleData(String name);
    void clearCollection();

}
