package com.example.template1.service;

import com.example.template1.model.VolunteerCode;
import com.example.template1.repository.VolunteerCodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VolunteerCodeService {
    private final VolunteerCodeRepository volunteerCodeRepository;

    public List<VolunteerCode> getVolunteerCode() {
        return volunteerCodeRepository.findAll();
    }
}
