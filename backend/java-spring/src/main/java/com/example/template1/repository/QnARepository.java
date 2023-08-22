package com.example.template1.repository;

import com.example.template1.model.QnA;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QnARepository extends JpaRepository<QnA, Long> {

    List<QnA> findAllByOrderByCreateAtDesc();

}
