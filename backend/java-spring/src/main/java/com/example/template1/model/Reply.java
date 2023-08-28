package com.example.template1.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Reply extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REPLY_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private Users users;

    @ManyToOne
    @JoinColumn(name = "BOARD_ID")
    @JsonBackReference
    private Board board;

    @Column(columnDefinition = "TEXT")
    private String content;

    @ManyToOne
    @JoinColumn(name = "Parent_No")
    private Reply reply;

    @Column(columnDefinition = "CHAR(1) DEFAULT 'Y'")
    private char status;

}
