package org.mikechabot.repository;

import org.mikechabot.model.Example;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * This repository corresponds the 'example' collection in MongoDB, where the primary key is a String
 *
 * Created by mikechabot on 10/31/15.
 */
@Repository
public interface ExampleRepository extends MongoRepository<Example, String> {
}
