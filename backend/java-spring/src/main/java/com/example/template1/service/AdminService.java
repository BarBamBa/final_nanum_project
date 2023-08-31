package com.example.template1.service;

import com.example.template1.model.*;
import com.example.template1.model.dto.*;
import com.example.template1.model.enums.Authority;
import com.example.template1.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final BoardRepository boardRepository;
    private final ReportRepository reportRepository;
    private final ReplyRepository replyRepository;
    private final UsersRepository usersRepository;
    private final QnARepository qnARepository;
    private final ApplicantsRepository applicantsRepository;

    public List<Board> getAllBoard() { //게시판 조회
        List<Board> boardList = boardRepository.findAllByOrderByCreateAtDesc();
        return boardList;
    }

    public List<Report> getAllReport(long boardId) { // 신고된 게시판 조회
        List<Report> boardList = reportRepository.findByBoard_Id(boardId);
        return boardList;
    }

    public List<Board> getBoardByCategory(char flg) { //게시판 카테고리 조회
        if(flg == '0') {
            List<Board> boardList = boardRepository.findAllByOrderByCreateAtDesc();
            return boardList;
        }
        List<Board> boardList = boardRepository.findByFlgOrderByCreateAtDesc(flg);

        return boardList;
    }
    public List<Board> deleteBoard(List<BoardRequest> request) { //게시글 삭제로 전환
        List<Board> deletedBoards = new ArrayList<>();

        for (BoardRequest boardRequest : request) {
            Long id = boardRequest.getId();
            Optional<Board> boardItem = boardRepository.findById(id);

            if (boardItem.isPresent()) {
                Board board = boardItem.get();
                board.setStatus('N');
                deletedBoards.add(boardRepository.save(board));
            }
        }

        return deletedBoards;
    }

    public List<Board> revertBoard(List<BoardRequest> request) { //게시글 복구
        List<Board> revertBoards = new ArrayList<>();

        for (BoardRequest boardRequest : request) {
            Long id = boardRequest.getId();
            Optional<Board> boardItem = boardRepository.findById(id);

            if (boardItem.isPresent()) {
                Board board = boardItem.get();
                board.setStatus('Y');
                revertBoards.add(boardRepository.save(board));
            }
        }

        return revertBoards;
    }

    public List<Reply> deleteReply(List<ReplyRequest> request) { //게시글 삭제로 전환
        List<Reply> deletedReplies = new ArrayList<>();

        for (ReplyRequest replyRequest : request) {
            Long id = replyRequest.getId();
            Optional<Reply> replyItem = replyRepository.findById(id);

            if (replyItem.isPresent()) {
                Reply reply = replyItem.get();
                reply.setStatus('N');
                deletedReplies.add(replyRepository.save(reply));
            }
        }

        return deletedReplies;
    }

    public List<Reply> revertReply(List<ReplyRequest> request) { //게시글 복구로 전환
        List<Reply> revertReplies = new ArrayList<>();

        for (ReplyRequest replyRequest : request) {
            Long id = replyRequest.getId();
            Optional<Reply> replyItem = replyRepository.findById(id);

            if (replyItem.isPresent()) {
                Reply reply = replyItem.get();
                reply.setStatus('Y');
                revertReplies.add(replyRepository.save(reply));
            }
        }

        return revertReplies;
    }

    public List<Users> getAllUser() { //유저 리스트
        List<Users> users = usersRepository.findAllByOrderByCreateAtDesc();
        return users;
    }

//    public List<Board> getAllBoards(long id) { // 유저가 작성한 게시판 조회
//        List<Board> boardList = boardRepository.findAllByUsers(id);
//        return boardList;
//    }

    public List<Users> searchUser(UsersRequest request) { //게시판 검색 (검색어와 게시판종류로)
        List<Users> usersList = null;

        
        if (request == null) { //검색어없으면 전체검색
            usersList = usersRepository.findAllByOrderByCreateAtDesc();
        }
        assert request != null;
        if (request.getId() != null) {
            usersList = usersRepository.findAllByIdOrderByCreateAtDesc(request.getId());
        }
        if (request.getName() != null) {
            usersList = usersRepository.findAllByNameContainingOrderByCreateAtDesc(request.getName());
        }
        if (request.getEmail() != null) {
            usersList = usersRepository.findAllByEmailContainingOrderByCreateAtDesc(request.getEmail());
        }
        if (request.getNickname() != null) {
            usersList = usersRepository.findAllByNicknameContainingOrderByCreateAtDesc(request.getNickname());
        }
        return usersList;
    }

    public List<Users> blackUsers(List<UsersRequest> request) { //유저 블랙하기
        List<Users> blackList = new ArrayList<>();

        for (UsersRequest usersRequest : request) {
            Long id = usersRequest.getId();
            Optional<Users> userList = usersRepository.findById(id);

            if (userList.isPresent()) {
                Users users = userList.get();
                users.setStatus('N');
                blackList.add(usersRepository.save(users));
            }
        }

        return blackList;
    }

    public List<Users> revertUsers(List<UsersRequest> request) { //유저블랙 복구
        List<Users> revertList = new ArrayList<>();

        for (UsersRequest usersRequest : request) {
            Long id = usersRequest.getId();
            Optional<Users> userList = usersRepository.findById(id);

            if (userList.isPresent()) {
                Users users = userList.get();
                users.setStatus('Y');
                revertList.add(usersRepository.save(users));
            }
        }

        return revertList;
    }

    public List<Users> addAdmins(List<UsersRequest> request) { //유저블랙 복구
        List<Users> adminList = new ArrayList<>();

        for (UsersRequest usersRequest : request) {
            Long id = usersRequest.getId();
            Optional<Users> userList = usersRepository.findById(id);

            if (userList.isPresent()) {
                Users users = userList.get();
                users.setAuthority(Authority.valueOf("ROLE_ADMIN"));
                adminList.add(usersRepository.save(users));
            }
        }

        return adminList;
    }

    public List<Users> removeAdmins(List<UsersRequest> request) { //유저블랙 복구
        List<Users> adminList = new ArrayList<>();

        for (UsersRequest usersRequest : request) {
            Long id = usersRequest.getId();
            Optional<Users> userList = usersRepository.findById(id);

            if (userList.isPresent()) {
                Users users = userList.get();
                users.setAuthority(Authority.valueOf("ROLE_USER"));
                adminList.add(usersRepository.save(users));
            }
        }

        return adminList;
    }

    public List<QnA> getAllQna() { //문의글 조회
        List<QnA> qnaList = qnARepository.findAllByOrderByCreateAtDesc();
        return qnaList;
    }

    public List<QnA> getQnaByCategory(char flg) { //문의글 카테고리 조회
        if(flg == '0') {
            List<QnA> qnaList = qnARepository.findAllByOrderByCreateAtDesc();
            return qnaList;
        }
        List<QnA> qnaList = qnARepository.findByFlgOrderByCreateAtDesc(flg);

        return qnaList;
    }

    public List<QnA> deleteQna(List<QnaRequest> request) { //문의글 삭제로 전환
        List<QnA> deletedQnas = new ArrayList<>();

        for (QnaRequest qnaRequest : request) {
            Long id = qnaRequest.getId();
            Optional<QnA> boardItem = qnARepository.findById(id);

            if (boardItem.isPresent()) {
                QnA qna = boardItem.get();
                qna.setStatus('N');
                deletedQnas.add(qnARepository.save(qna));
            }
        }

        return deletedQnas;
    }

    public List<QnA> revertQna(List<QnaRequest> request) { //문의글 복구
        List<QnA> revertBoards = new ArrayList<>();

        for (QnaRequest qnaRequest : request) {
            Long id = qnaRequest.getId();
            Optional<QnA> boardItem = qnARepository.findById(id);

            if (boardItem.isPresent()) {
                QnA qna = boardItem.get();
                qna.setStatus('Y');
                revertBoards.add(qnARepository.save(qna));
            }
        }

        return revertBoards;
    }

    public List<Applicants> getAllApplicant() { //게시판 조회
        List<Applicants> applicants = applicantsRepository.findAllByOrderByCreateAtDesc();
        return applicants;
    }

    public List<Applicants> permitApplicant(List<ApplicantsRequest> request) { // 봉사활동 신청 승인
        List<Applicants> permitApplicants = new ArrayList<>();

        for (ApplicantsRequest applicantsRequest : request) {
            Long id = applicantsRequest.getId();
            Optional<Applicants> boardItem = applicantsRepository.findById(id);

            if (boardItem.isPresent()) {
                Applicants applicants = boardItem.get();
                applicants.setStatus('Y');
                permitApplicants.add(applicantsRepository.save(applicants));
            }
        }

        return permitApplicants;
    }

    public List<Applicants> denyApplicant(List<ApplicantsRequest> request) { // 봉사활동 신청 거부
        List<Applicants> denyApplicants = new ArrayList<>();

        for (ApplicantsRequest applicantsRequest : request) {
            Long id = applicantsRequest.getId();
            Optional<Applicants> boardItem = applicantsRepository.findById(id);

            if (boardItem.isPresent()) {
                Applicants applicants = boardItem.get();
                applicants.setStatus('N');
                denyApplicants.add(applicantsRepository.save(applicants));
            }
        }

        return denyApplicants;
    }

    public List<Applicants> waitApplicant(List<ApplicantsRequest> request) { //봉사활동 승인대기중 상태로 돌리기
        List<Applicants> denyApplicants = new ArrayList<>();

        for (ApplicantsRequest applicantsRequest : request) {
            Long id = applicantsRequest.getId();
            Optional<Applicants> boardItem = applicantsRepository.findById(id);

            if (boardItem.isPresent()) {
                Applicants applicants = boardItem.get();
                applicants.setStatus('R');
                denyApplicants.add(applicantsRepository.save(applicants));
            }
        }

        return denyApplicants;
    }

    public List<Applicants> getApplicantsByCategory(char status) { //봉사신청 승인상태로 조회
        if(status == 'A') {
            List<Applicants> applicantsList = applicantsRepository.findAllByOrderByCreateAtDesc();
            return applicantsList;
        }
        List<Applicants> applicantsList = applicantsRepository.findByStatusOrderByCreateAtDesc(status);

        return applicantsList;
    }

    public List<Board> getBoardsByDates(LocalDateTime startDate, LocalDateTime endDate) {

        return boardRepository.findByCreateAtBetween(startDate, endDate);
    }

}
