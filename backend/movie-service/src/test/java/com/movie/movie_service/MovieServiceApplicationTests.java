package com.movie.movie_service;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = {
    // Provide a dummy MongoDB URI for the test context
    "spring.data.mongodb.uri=mongodb://localhost:27017/testdb",
    // Provide a dummy JWT secret that meets the 256-bit length requirement
    "jwt.secret=mySuperSecretKeyThatIsAtLeast322CharactersLong12345",
    // Keep your security exclusion if you want to skip security during tests
    "spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration"
})
class MovieServiceApplicationTests {

    @Test
    void contextLoads() {
        // This test will now pass because all ${VARIABLES} in application.yml are satisfied
    }
}