package com.example.template1.model;

import jakarta.persistence.*;
import lombok.*;
import org.apache.ibatis.annotations.Many;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "B_REPORT_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name="USER_ID")
    private Users users;

    @ManyToOne
    @JoinColumn(name="REPORTER_ID")
    private Users reporter;

    @ManyToOne
    @JoinColumn(name="BOARD_ID")
    private Board board;

    private String reason;

}
