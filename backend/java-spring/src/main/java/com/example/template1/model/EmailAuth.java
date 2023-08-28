package com.example.template1.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class EmailAuth {

    private static final Long MAX_EXPIRE_TIME = 5L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String authToken;
    private boolean useToken;
    private LocalDateTime expiration;

    @Builder
    public EmailAuth(String email, String authToken, boolean useToken) {
        this.email = email;
        this.authToken = authToken;
        this.useToken = useToken;
        this.expiration = LocalDateTime.now().plusMinutes(MAX_EXPIRE_TIME);
    }

    public void expired() {
        this.useToken = true;
    }

    public boolean isExpired() {
        return this.expiration.isBefore(LocalDateTime.now());
    }
}
