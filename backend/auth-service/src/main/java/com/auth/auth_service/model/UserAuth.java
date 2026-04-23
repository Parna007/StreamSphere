package com.auth.auth_service.model;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user_auth")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAuth {
    @Id
    private String id;

    private String email;

    // Optional (for local login)
    private String password;

    private String role;

    // GOOGLE or LOCAL
    private String provider;

    // Google unique ID
    private String providerId;
}
