package com.example.template1.service;

import com.example.template1.model.Volunteer;
import com.example.template1.model.dto.VolunteerRequestDto;
import com.example.template1.repository.VolunteerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class VolunteerService {
    private final VolunteerRepository volunteerRepository;

    public Boolean existByNumber(int num) {
        return volunteerRepository.existsByNumber(num);
    }

    public Volunteer findVolunteerByNumber(int num) {
        return volunteerRepository.findByNumber(num);
    }

    public Volunteer addVolunteer(VolunteerRequestDto dto) {

        return volunteerRepository.save(dto.toEntity());
    }
}
