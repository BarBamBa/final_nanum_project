package com.example.template1.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

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

//    @ManyToOne
//    @JoinColumn(name = "MANAGER_ID")
//    private Users manager;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    //    private String mTitle;
//
//    @Column(columnDefinition = "TEXT")
//    private String mContent;

    @ManyToOne
    @JoinColumn(name = "Parent_No")
    @JsonBackReference
    private QnA qna;

    @OneToMany(mappedBy = "qna")
    @JsonManagedReference
    List<QnA> answers = new ArrayList<>();

    private char flg; //1 : FAQ, 2: QnA

    @Column(columnDefinition = "CHAR(1) DEFAULT 'Y'")
    private char status;
}
