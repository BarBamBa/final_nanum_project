package com.example.template1.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Volunteer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "VOLUNTEER_ID")
    private Long id;

    private int number;

    private String title;

    private String org;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private int rStatus;

    private String city;

    private String district;

    private char aFlg;

    private char tFlg;

    private String category;

    private String location;

    private int startTime;

    private int endTime;

    private LocalDateTime rStartDate;

    private LocalDateTime rEndDate;

    private int rCapacity;

}
