package com.example.template1.model;

import jakarta.persistence.*;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Notice extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MANAGER_ID")
    private Manager manager;
    @ManyToOne
    @JoinColumn(name = "MANAGER_ID")
    private Manager manager;

    private String title;

    @Column(columnDefinition = "TEXT")
    @Column(columnDefinition = "TEXT")
    private String content;

    private char status;

}
