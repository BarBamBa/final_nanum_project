package com.example.template1.repository;

import com.example.template1.model.Board;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
    @Query("SELECT b FROM Board b JOIN FETCH b.users") // Board 엔티티와 User 엔티티를 조인하는 어노테이션
    List<Board> findAllWithUsers();

}
