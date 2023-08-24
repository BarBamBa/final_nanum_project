package com.example.template1.model;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QnA extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private Users users;

    @ManyToOne
    @JoinColumn(name = "MANAGER_ID")
    private Users manager;

    private String uTitle;

    @Column(columnDefinition = "TEXT")
    private String uContent;

    private String mTitle;

    @Column(columnDefinition = "TEXT")
    private String mContent;

    private char flg; //1 : FAQ, 2: QnA

    @Column(columnDefinition = "CHAR(1) DEFAULT 'Y'")
    private char status;
}
