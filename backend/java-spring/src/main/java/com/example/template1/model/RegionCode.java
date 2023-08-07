package com.example.template1.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegionCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int cityCode;

    private String city;

    private int districtCode;

    private String district;
}