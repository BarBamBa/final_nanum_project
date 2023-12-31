package com.example.template1.service;

import com.example.template1.model.Board;
import com.example.template1.model.Users;
import com.example.template1.model.Volunteer;
import com.example.template1.model.dto.BoardRequest;
import com.example.template1.repository.BoardRepository;
import com.example.template1.repository.UsersRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final UsersRepository usersRepository;

    public List<Board> getAllBoard() { //게시판 조회
        List<Board> boardList = boardRepository.findAllByOrderByCreateAtDesc();
        return boardList;
    }

    public Board getBoardDetail(long id) { //게시글 조회
        Board board = boardRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("not found : " + id));
        return board;
    }

    public List<Board> getMyBoard(Long userId) { //내가 작성한 게시글 조회
        Users user = usersRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("not found" + userId));
        return boardRepository.findAllByUsers(user);
    }

    public List<Board> searchBoard(String title, char flg) { //게시판 검색 (검색어와 게시판종류로)
        List<Board> boardList;
        if (title == null) { // 검색어가 비어있는 경우 모든 게시글 반환
            boardList = boardRepository.findByFlgOrderByCreateAtDesc(flg);
        } else {
            boardList = boardRepository.findByTitleContainingAndFlg(title, flg);
        }
        return boardList;
    }

    public Board saveBoard(BoardRequest request) { //게시판 글쓰기
        Users users = new Users();
        users.setId(request.getUsers().getId());

        Volunteer volunteer = null;

        if (request.getFlg() == '4') { // 봉사후기글일 경우에만 volunteer id  입력
            volunteer = new Volunteer();
            volunteer.setId(request.getVolunteer().getId());
        }

        Board board =  Board.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .flg(request.getFlg())
                .status(request.getStatus())
                .likeCount(request.getLikeCount())
                .users(users)
                .volunteer(volunteer)
                .build();

        return boardRepository.save(board);
    }

    @Transactional
    public Board updateBoard(BoardRequest request) { //게시글 수정
        Board board = boardRepository.findById(request.getId())
                .orElseThrow(() -> new IllegalArgumentException("not found : " + request.getId()));

        board.setTitle(request.getTitle());
        board.setContent(request.getContent());
        if (request.getFlg() == '4') {
            board.setVolunteer(request.getVolunteer());
        }


        return board;
    }
    @Transactional
    public Board deleteBoard(long id, BoardRequest request) { //게시글 삭제
        Board board = boardRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("not found : " + id));
        board.setStatus(request.getStatus());
        return board;
    }

    @Transactional
    public Board reportBoard(long id, BoardRequest request) { //게시글 신고
        Board board = boardRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("not found : " + id));
        board.setStatus('R');
        return board;
    }



}
