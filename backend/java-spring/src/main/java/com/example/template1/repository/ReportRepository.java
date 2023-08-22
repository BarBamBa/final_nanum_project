package com.example.template1.repository;

import com.example.template1.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {

    boolean existsByReporterIdAndBoardId(long reporterId, long boardId); //신고게시물 중복검사 쿼리

    List<Report> findByBoard_Id(long boardId);
}
