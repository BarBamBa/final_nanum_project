package com.example.template1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Board extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @ManyToOne
    @JoinColumn(name = "uId")
    private Users users;

    @OneToMany(mappedBy = "board")
    List<Reply> replies = new ArrayList<>();

    private String title;

    private String content;

    private char status;

    private char boardFlg; // 1=공지사항 2=소식공유 3=자유게시판 4=봉사후기

}
