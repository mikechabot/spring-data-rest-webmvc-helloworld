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
    public List<Example> getByName(String name) {
        return exampleRepository.findByName(name);
    }

    @Override
    public void createExampleData(String name) {
        exampleRepository.save(new Example(name));
    }

    @Override
    public void clearCollection() {
        exampleRepository.deleteAll();
    }

}
