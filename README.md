# spring-data-rest-webmvc-helloworld
Full stack annotation based Spring MVC web project that utilizes Spring Data MongoDB. Fronted with AngularJS.

### Live Demo
Viewable at http://ec2-52-91-168-48.compute-1.amazonaws.com

### Prerequisites
* Maven
* MongoDB
* Java 1.8
* Java web server

### Deployment
1. Clone repository:
  - `git clone https://github.com/mikechabot/spring-data-rest-webmvc-helloworld.git`
2. Navigate to directory:
  - `cd spring-data-rest-webmvc-helloworld`
3. Clean, run tests, and package:
  - `mvn clean test package`
4. Obtain `ROOT.war` from `/target` folder
5. Deploy to web server

### MongoDB
Out-of-the-box configuration assumes MongoDB is running at the default socket address:
- **Host**: `localhost`
- **Port**: `27017`

These properties along with the database name, base mapping package, and transaction write concern are configurable, and can be found in `/resource/bootstrap.properties`.

### Spring
* Spring Data MongoDB 
  * http://docs.spring.io/spring-data/data-mongo/docs/1.8.0.RELEASE/reference/html/
* Spring Data REST
  * http://docs.spring.io/spring-data/rest/docs/2.4.0.RELEASE/reference/html/

### Unit tests
* Java
  * TestNG
  * Mockito
* JavaScript
  * Jasmine
