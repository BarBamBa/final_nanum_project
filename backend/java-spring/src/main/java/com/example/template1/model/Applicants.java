package com.example.template1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Columns;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Applicants extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @ManyToOne
    @JoinColumn(name = "uId")
    private Users users;

    @ManyToOne
    @JoinColumn(name = "vId")
    private Volunteer volunteer;

    private char status;
}
