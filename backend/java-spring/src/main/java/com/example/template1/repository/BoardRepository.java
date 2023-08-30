package com.example.template1.repository;

import com.example.template1.model.Board;
import com.example.template1.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {

    List<Board> findAllByOrderByCreateAtDesc();
    List<Board> findByTitleContainingAndFlg(String title, char flg);
    List<Board> findByFlgOrderByCreateAtDesc(char flg);
    List<Board> findByCreateAtBetween(LocalDateTime startDate, LocalDateTime endDate);



}
