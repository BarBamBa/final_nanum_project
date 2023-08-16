package com.example.template1.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REPORT_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name="USER_ID") //신고 할 사람
    private Users users;

    @ManyToOne
    @JoinColumn(name="REPORTER_ID") //신고자
    private Users reporter;

    @ManyToOne
    @JoinColumn(name="BOARD_ID") //신고 할 게시판
    private Board board;

    private String reason; //사유

}
