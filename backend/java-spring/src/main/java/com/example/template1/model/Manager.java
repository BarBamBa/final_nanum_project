package com.example.template1.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Manager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MANAGER_ID")
    @Column(name = "MANAGER_ID")
    private Long id;

    private String password;

    private String name;

    private String nickname;
}
