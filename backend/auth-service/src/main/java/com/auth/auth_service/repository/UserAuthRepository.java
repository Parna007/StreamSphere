package com.auth.auth_service.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.auth.auth_service.model.UserAuth;
import java.util.Optional;

public interface UserAuthRepository
        extends MongoRepository<UserAuth, String> {

    Optional<UserAuth> findByEmail(String email);

    Optional<UserAuth> findByProviderId(String providerId);
}