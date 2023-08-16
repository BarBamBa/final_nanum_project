package com.example.template1.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "U_REPORT_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name="USER_ID")
    private Users users;

    @ManyToOne
    @JoinColumn(name="REPORTER_ID")
    private Users reporter;

    private String reason;

}

