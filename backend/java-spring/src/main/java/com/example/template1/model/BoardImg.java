package com.example.template1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
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
