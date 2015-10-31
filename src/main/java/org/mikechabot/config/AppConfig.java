package org.mikechabot.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

/**
 * Created by mikechabot on 10/30/15.
 */
@Configuration
@ComponentScan(basePackages = "org.mikechabot")
@PropertySource("classpath:bootstrap.properties")
public class AppConfig {

}
