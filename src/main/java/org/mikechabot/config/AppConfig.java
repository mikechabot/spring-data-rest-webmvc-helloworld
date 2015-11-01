package org.mikechabot.config;

import org.mikechabot.beans.MongoProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

import com.mongodb.WriteConcern;

/**
 * Created by mikechabot on 10/30/15.
 */
@Configuration
@ComponentScan(basePackages = "org.mikechabot")
@PropertySource("classpath:bootstrap.properties")
public class AppConfig {

    @Autowired
    private Environment environment;

    @Bean
    public MongoProperties mongoProperties() {
        return new MongoProperties(
                environment.getRequiredProperty("mongo-db-name"),
                environment.getRequiredProperty("mongo-model-base-package"),
                environment.getRequiredProperty("mongo-host-name"),
                environment.getRequiredProperty("mongo-port-number", Integer.class),
                environment.getProperty("mongo-write-concern", WriteConcern.class, WriteConcern.SAFE)
        );
    }

}
