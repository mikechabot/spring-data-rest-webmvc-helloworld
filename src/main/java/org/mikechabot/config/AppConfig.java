package org.mikechabot.config;

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

    public class MongoProperties {

        private final String databaseName;
        private final String modelBasePackage;
        private final String hostName;
        private final int portNumber;
        private final WriteConcern writeConcern;

        public MongoProperties(String databaseName, String modelBasePackage, String hostName, Integer portNumber, WriteConcern writeConcern) {
            this.databaseName = databaseName;
            this.modelBasePackage = modelBasePackage;
            this.hostName = hostName;
            this.portNumber = portNumber;
            this.writeConcern = writeConcern;
        }

        public String getDatabaseName() {
            return databaseName;
        }

        public String getModelBasePackage() {
            return modelBasePackage;
        }

        public String getHostName() {
            return hostName;
        }

        public int getPortNumber() {
            return portNumber;
        }

        public WriteConcern getWriteConcern() {
            return writeConcern;
        }

    }

}
