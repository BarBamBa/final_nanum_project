package com.example.template1.controller;

import com.example.template1.model.*;
import com.example.template1.model.dto.*;
import com.example.template1.service.AdminService;
import com.example.template1.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/boards") //게시판 리스트 조회
    public ResponseEntity<List<BoardResponse>> getAllBoards() {
        List<BoardResponse> boards = adminService.getAllBoard()
                .stream()
                .map(BoardResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(boards);
    }

    @PostMapping("/boards/reported") // id로 게시판 신고 내역 리스트 조회
    public ResponseEntity<List<ReportResponse>> getAllReports(@RequestBody ReportRequest request) {
        List<ReportResponse> reports = adminService.getAllReport(request.getBoard())
                .stream()
                .map(ReportResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(reports);
    }

    @PutMapping("/boards/delete") //게시글 삭제
    public ResponseEntity<List<Board>> deleteBoards(@RequestBody List<BoardRequest> request) {
        List<Board> deleteList = adminService.deleteBoard(request);

        return ResponseEntity.ok()
                .body(deleteList);
    }

    @PutMapping("/boards/revert") //게시글 복구
    public ResponseEntity<List<Board>> revertBoards(@RequestBody List<BoardRequest> request) {
        List<Board> revertList = adminService.revertBoard(request);

        return ResponseEntity.ok()
                .body(revertList);
    }

    @PostMapping("/boards/category") //게시글 카테고리로 조회
    public ResponseEntity<List<BoardResponse>> getBoardsByCategory(@RequestBody BoardRequest request) {
        List<BoardResponse> boardList = adminService.getBoardByCategory(request.getFlg())
                .stream()
                .map(BoardResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(boardList);
    }

    @PutMapping("/reply/delete") //댓글 삭제
    public ResponseEntity<List<Reply>> deleteReplies(@RequestBody List<ReplyRequest> request) {
        List<Reply> deleteList = adminService.deleteReply(request);

        return ResponseEntity.ok()
                .body(deleteList);
    }

    @PutMapping("/reply/revert") //댓글 복구
    public ResponseEntity<List<Reply>> revertReplies(@RequestBody List<ReplyRequest> request) {
        List<Reply> revertList = adminService.revertReply(request);

        return ResponseEntity.ok()
                .body(revertList);
    }

    @GetMapping("/users") // 유저 리스트
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> usersList = adminService.getAllUser()
                .stream()
                .map(UserResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(usersList);
    }

//    @PostMapping("/users/board") // id로 게시판 내역 조회
//    public ResponseEntity<List<BoardResponse>> getAllBoard(@RequestBody BoardRequest request) {
//        List<BoardResponse> boardList = adminService.getAllBoards(request.getUsers().getId())
//                .stream()
//                .map(BoardResponse::new)
//                .toList();
//
//        return ResponseEntity.ok()
//                .body(boardList);
//    }

    @PostMapping("/users/search") //게시판 검색
    public ResponseEntity<List<UserResponse>> searchingBoard(@RequestBody UsersRequest request) {
        List<UserResponse> users = adminService.searchUser(request)
                .stream()
                .map(UserResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(users);
    }

    @PutMapping("/users/black") // 유저 차단
    public ResponseEntity<List<Users>> blackUser(@RequestBody List<UsersRequest> request) {
        List<Users> blackList = adminService.blackUsers(request);

        return ResponseEntity.ok()
                .body(blackList);
    }

    @PutMapping("/users/revert") //유저 복구
    public ResponseEntity<List<Users>> revertUser(@RequestBody List<UsersRequest> request) {
        List<Users> revertList = adminService.revertUsers(request);

        return ResponseEntity.ok()
                .body(revertList);
    }

    @PutMapping("/users/addAdmin") //관리자 권한 부여
    public ResponseEntity<List<Users>> addAdmin(@RequestBody List<UsersRequest> request) {
        List<Users> adminList = adminService.addAdmins(request);

        return ResponseEntity.ok()
                .body(adminList);
    }

    @PutMapping("/users/removeAdmin") //관리자 권한 없애기
    public ResponseEntity<List<Users>> removeAdmin(@RequestBody List<UsersRequest> request) {
        List<Users> adminList = adminService.removeAdmins(request);

        return ResponseEntity.ok()
                .body(adminList);
    }

    @GetMapping("/qna") //문의글 리스트 조회
    public ResponseEntity<List<QnaResponse>> getAllQnas() {
        List<QnaResponse> qna = adminService.getAllQna()
                .stream()
                .filter(item -> item.getTitle() != null)
                .map(QnaResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(qna);
    }

    @PostMapping("/qna/category") //문의글 카테고리로 조회
    public ResponseEntity<List<QnaResponse>> getQnasByCategory(@RequestBody QnaRequest request) {
        List<QnaResponse> qnaList = adminService.getQnaByCategory(request.getFlg())
                .stream()
                .map(QnaResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(qnaList);
    }

    @PutMapping("/qna/delete") //문의글 삭제
    public ResponseEntity<List<QnA>> deleteQnas(@RequestBody List<QnaRequest> request) {
        List<QnA> deleteList = adminService.deleteQna(request);

        return ResponseEntity.ok()
                .body(deleteList);
    }

    @PutMapping("/qna/revert") //문의글 복구
    public ResponseEntity<List<QnA>> revertQnas(@RequestBody List<QnaRequest> request) {
        List<QnA> revertList = adminService.revertQna(request);

        return ResponseEntity.ok()
                .body(revertList);
    }

    @GetMapping("/volunteer") //봉사활동 신청 리스트 조회
    public ResponseEntity<List<ApplicantsAdminResponse>> getAllApplicants() {
        List<ApplicantsAdminResponse> applicants = adminService.getAllApplicant()
                .stream()
                .map(ApplicantsAdminResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(applicants);
    }

    @PutMapping("/volunteer/permit") //봉사활동 신청 승인
    public ResponseEntity<List<Applicants>> permitApplicants(@RequestBody List<ApplicantsRequest> request) {
        List<Applicants> permitList = adminService.permitApplicant(request);

        return ResponseEntity.ok()
                .body(permitList);
    }

    @PutMapping("/volunteer/deny") //봉사활동 신청 거부
    public ResponseEntity<List<Applicants>> denyApplicants(@RequestBody List<ApplicantsRequest> request) {
        List<Applicants> denyList = adminService.denyApplicant(request);

        return ResponseEntity.ok()
                .body(denyList);
    }

    @PutMapping("/volunteer/wait") //봉사활동 승인대기중 상태로 돌리기
    public ResponseEntity<List<Applicants>> waitApplicants(@RequestBody List<ApplicantsRequest> request) {
        List<Applicants> waitList = adminService.waitApplicant(request);

        return ResponseEntity.ok()
                .body(waitList);
    }

    @PostMapping("/volunteer/category") //봉사신청 승인상태로 조회
    public ResponseEntity<List<ApplicantsResponse>> getBoardsByCategory(@RequestBody ApplicantsRequest request) {
        List<ApplicantsResponse> applicantsList = adminService.getApplicantsByCategory(request.getStatus())
                .stream()
                .map(ApplicantsResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(applicantsList);
    }

    @PostMapping("/boards/date")
    public ResponseEntity<List<BoardResponse>> getBoardsByDate(@RequestBody DateRequest request) {
        LocalDateTime startDate = request.getStartDate();
        LocalDateTime endDate = request.getEndDate();
        List<BoardResponse> boardList = adminService.getBoardsByDates(startDate, endDate)
                .stream()
                .map(BoardResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(boardList);
    }


}
