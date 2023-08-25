package com.example.template1.model;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class QnA extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private Users users;

    @ManyToOne
    @JoinColumn(name = "MANAGER_ID")
    private Manager manager;

    private String UTitle;

    @Column(columnDefinition = "TEXT")
    private String UContent;

    private String MTitle;

    @Column(columnDefinition = "TEXT")
    private String MContent;

    private char flg; //1 : FAQ, 2: QnA

    @Column(columnDefinition = "CHAR(1) DEFAULT 'Y'")
    private char status;
}
