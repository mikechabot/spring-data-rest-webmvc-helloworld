package org.mikechabot.repository;

import org.mikechabot.model.Example;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * If the Example collection does not already exist in the repository,
 * MongoDB will create one. As a result, we can easily add new repositories on-the-fly
 *
 * By extending MongoRepository<Example, String>, we're telling Mongo we're going to store
 * Example objects in this collection with a primary key of type String
 * Created by mikechabot on 10/31/15.
 */
@Repository
public interface ExampleRepository extends MongoRepository<Example, String> {
}
