package com.example.template1.repository;

import com.example.template1.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {

    boolean existsByReporterIdAndBoardId(long reporterId, long boardId); //신고게시물 중복검사 쿼리
}
