package com.example.template1.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
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

    private char rStatus;

    private int cityCode;

    private int districtCode;

    private char aFlg;

    private char tFlg;

    private String category;

    private String location;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private LocalDateTime rStartDate;

    private LocalDateTime rEndDate;

    private int rCapacity;
}
