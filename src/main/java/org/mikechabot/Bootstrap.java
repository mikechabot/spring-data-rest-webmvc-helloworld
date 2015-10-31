package org.mikechabot;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

/**
 * Created by mikechabot on 10/30/15.
 */
public class Bootstrap implements WebApplicationInitializer {

    private static final String CONFIG_PACKAGE = "org.mikechabot.config";       // Package name of annotation based configuration classes
    private static final String URL_MAPPING = "/spring/*";                      // Direct certain HTTP requests to Spring

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
        context.setConfigLocation(CONFIG_PACKAGE);

        ServletRegistration.Dynamic dispatcher = servletContext.addServlet("DispatcherServlet", new DispatcherServlet(context));
        dispatcher.setLoadOnStartup(1);
        dispatcher.addMapping(URL_MAPPING);
    }

}
