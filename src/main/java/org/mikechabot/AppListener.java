package org.mikechabot;

import org.springframework.stereotype.Component;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;

import org.apache.log4j.Logger;

/**
 * Created by mikechabot on 10/30/15.
 */
@Component
public class AppListener implements ApplicationListener<ContextRefreshedEvent> {

    private static final Logger log = Logger.getLogger(AppListener.class);

    /**
     * At this point the Spring application has been fully initialized
     * with all dependencies loaded. Maybe we want to know the size
     * of our active user cache on startup, or kick off a one-time task -
     * since we're fully loaded we can simply @Autowire the necessary
     * service to get the answer or perform the action
     * @param contextRefreshedEvent
     */
    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        log.info("Application started...");
    }

}
