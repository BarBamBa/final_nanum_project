package com.example.template1.repository;

import com.example.template1.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {


}
