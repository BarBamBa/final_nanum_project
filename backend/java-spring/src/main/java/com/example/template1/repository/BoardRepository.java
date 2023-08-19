package com.example.template1.repository;

import com.example.template1.model.Board;
import com.example.template1.model.dto.BoardRequest;
import com.example.template1.model.dto.BoardResponse;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {

    List<Board> findAllByOrderByCreateAtDesc();
    List<Board> findByTitleContainingAndFlg(String title, char flg);

    @Query("SELECT b FROM Board b JOIN FETCH b.users u WHERE b.status = 'Y' ORDER BY b.createAt DESC")
    List<Board> findAllByOrderByCreateAtDescWithUserInfo();

}
