package com.example.template1.service;

import com.example.template1.model.Board;
import com.example.template1.model.QnA;
import com.example.template1.model.Users;
import com.example.template1.model.dto.BoardRequest;
import com.example.template1.model.dto.QnaRequest;
import com.example.template1.repository.QnARepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QnaService {
    private final QnARepository qnARepository;
    public List<QnA> getAllQna() { //qna 리스트 조회
        List<QnA> qnaList = qnARepository.findAllByOrderByCreateAtDesc();
        return qnaList;
    }

    public QnA getQna(long id) { //qna조회
        QnA qna = qnARepository.findById(id).orElseThrow(() -> new IllegalArgumentException("not found : " + id));;
        return qna;
    }

    public List<QnA> searchQna(String title, char flg) { //qna 검색 (검색어와 게시판종류로)
        List<QnA> qnaList;
        if (title == null) { // 검색어가 비어있는 경우 모든 게시글 반환
            qnaList = qnARepository.findByFlgOrderByCreateAtDesc(flg);
        } else {
            qnaList = qnARepository.findByTitleContainingAndFlg(title, flg);
        }
        return qnaList;
    }

    public QnA saveQna(QnaRequest request) { //qna 글쓰기
        Users users = new Users();
        users.setId(request.getUserId()); // 관리자 id

        QnA qna = QnA.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .status('Y')
                .flg(request.getFlg())
                .users(users)
                .build();
        return qnARepository.save(qna);
    }
    @Transactional
    public QnA updateQna(QnaRequest request) { //qna 수정
        QnA qna = qnARepository.findById(request.getId())
                .orElseThrow(() -> new IllegalArgumentException("not found : " + request.getId()));

        qna.setTitle(request.getTitle());
        qna.setContent(request.getContent());

        return qna;
    }

    @Transactional
    public QnA deleteQna(long id, QnaRequest request) { //게시글 삭제
        QnA qna = qnARepository.findById(id).orElseThrow(() -> new IllegalArgumentException("not found : " + id));
        qna.setStatus(request.getStatus());
        return qna;
    }

    public QnA replyQnA(QnaRequest request) { //qna 답변
        Users users = new Users();
        users.setId(request.getUserId());

        QnA parentNo = new QnA();
        parentNo.setId((request.getParentNo()));

        QnA qna = QnA.builder()
                .content(request.getContent())
                .status('Y')
                .flg(request.getFlg())
                .qna(parentNo)
                .users(users)
                .build();
        return qnARepository.save(qna);
    }
}
