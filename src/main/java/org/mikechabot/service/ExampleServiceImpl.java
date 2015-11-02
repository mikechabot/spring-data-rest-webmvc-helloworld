package org.mikechabot.service;

import org.mikechabot.model.Example;
import org.mikechabot.repository.ExampleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by mikechabot on 10/31/15.
 */
@Service
public class ExampleServiceImpl implements ExampleService {

    @Autowired
    private ExampleRepository exampleRepository;

    @Override
    public List<Example> getExampleData() {
        return exampleRepository.findAll();
    }

    @Override
    public void createExampleData() {
        exampleRepository.save(new Example());
    }

    @Override
    public void clearCollection() {
        exampleRepository.deleteAll();
    }

}
