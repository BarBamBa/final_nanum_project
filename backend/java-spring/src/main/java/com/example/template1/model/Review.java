package com.example.template1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Review extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    private String VTitle;

    private String title;

    private String content;

    private char status;

    @ManyToOne
    @JoinColumn(name = "uId")
    private Users users;

    @ManyToOne
    @JoinColumn(name = "vId")
    private Volunteer volunteer;
}
