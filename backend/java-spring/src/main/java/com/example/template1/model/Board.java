package com.example.template1.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Board extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BOARD_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private Users users;

    @OneToMany(mappedBy = "board")
    List<Reply> replies = new ArrayList<>();

    @OneToMany(mappedBy = "board")
    List<BoardImg> boardImg = new ArrayList<>();

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private char flg;

    private char status;

}
