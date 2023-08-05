package com.example.template1.repository;

import com.example.template1.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface ReviewRepository extends JpaRepository<Review, Long> {
}
