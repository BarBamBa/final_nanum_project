package com.example.template1.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;


@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardImg extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @ManyToOne
    @JoinColumn(name = "BOARD_ID")
    @JsonBackReference
    private Board board;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private Users users;

    private String path;

    private String name;

    @Column(columnDefinition = "CHAR(1) DEFAULT 'Y'")
    private char status;

//    public BoardImg( Long id, String path, String name, Board board, Users users) {
//        this.id = id;
//        this.path = path;
//        this.name = name;
//        this.board = board;
//        this.users = users;
//    }

}
