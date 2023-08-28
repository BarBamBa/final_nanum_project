package com.example.template1.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;
import org.hibernate.annotations.ColumnDefault;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
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

    @ManyToOne
    @JoinColumn(name = "VOLUNTEER_ID")
    private Volunteer volunteer;

    @OneToMany(mappedBy = "board")
    @JsonManagedReference
    List<Reply> replies = new ArrayList<>();

    @OneToMany(mappedBy = "board")
    @JsonManagedReference
    List<BoardImg> boardImgs = new ArrayList<>();

    @OneToMany(mappedBy = "board")
    @JsonManagedReference
    List<Report> reports = new ArrayList<>();

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private char flg;

    @Column(columnDefinition = "CHAR(1) DEFAULT 'Y'")
    private char status;

    @Column(columnDefinition = "INTEGER default 0")
    private Integer likeCount;


}
