package com.example.template1.repository;

import com.example.template1.model.Announce;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnounceRepository extends JpaRepository<Announce, Long> {
}
