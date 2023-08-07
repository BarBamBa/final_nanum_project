package com.example.template1.repository;

import com.example.template1.model.RegionCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RegionCodeRepository extends JpaRepository<RegionCode, Integer> {

    RegionCode findByCityCodeAndDistrictCode(int cityCode, int districtCode);
}
