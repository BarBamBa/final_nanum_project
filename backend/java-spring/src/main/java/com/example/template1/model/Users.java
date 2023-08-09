package com.example.template1.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.validator.constraints.pl.REGON;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(value = AuditingEntityListener.class)
public class Users extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID")
    private Long id;

    @OneToMany(mappedBy = "users")
    List<Board> boards = new ArrayList<>();

    @OneToMany(mappedBy = "users")
    List<Applicants> applicants = new ArrayList<>();

    @OneToMany(mappedBy = "users")
    List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "users")
    List<BoardImg> boardImgs = new ArrayList<>();

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    private String name;

    private String nickname;

    private String address;

    private int age;

    private String phone;

    @Column(nullable = true)
    private char status;

}
