package com.example.template1.model;

import jakarta.persistence.*;
import lombok.*;


@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString(exclude = "board")
public class BoardImg extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @ManyToOne
    @JoinColumn(name = "BOARD_ID")
    private Board board;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private Users users;

    private String path;

    private String name;

    public BoardImg( Long id, String path, String name, Board board, Users users) {
        this.id = id;
        this.path = path;
        this.name = name;
        this.board = board;
        this.users = users;
    }

}
