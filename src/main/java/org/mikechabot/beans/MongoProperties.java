package org.mikechabot.beans;

import com.mongodb.WriteConcern;

/**
 * Created by mikechabot on 11/1/15.
 */
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