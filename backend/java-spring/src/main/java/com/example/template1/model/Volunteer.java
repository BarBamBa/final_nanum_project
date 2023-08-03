package com.example.template1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Volunteer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

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

    @OneToMany(mappedBy = "volunteer")
    List<Applicants> applicants = new ArrayList<>();

    @OneToMany(mappedBy = "volunteer")
    List<Review> reviews = new ArrayList<>();
}
