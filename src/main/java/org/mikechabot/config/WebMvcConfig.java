package org.mikechabot.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by mikechabot on 10/30/15.
 */
@EnableWebMvc
@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {

    /**
     * Add static resources
     * @param registry
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        final String[] excludedFileExtensions = new String[] {"css","fonts","ico","img","js"};
        for (String each : excludedFileExtensions) {
            registry.addResourceHandler("/" + each + "/**").addResourceLocations("/" + each + "/");
        }
    }

}
