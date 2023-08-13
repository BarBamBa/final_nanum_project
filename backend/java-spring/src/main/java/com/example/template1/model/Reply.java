package com.example.template1.model;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;
import org.apache.ibatis.annotations.Many;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString(exclude = {"board","childReply"})
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
    private Board board;

    @Column(columnDefinition = "TEXT")
    private String content;

    @ManyToOne
    @JoinColumn(name = "Parents_No")
    private Reply parentsNo;

    private char status;

}
