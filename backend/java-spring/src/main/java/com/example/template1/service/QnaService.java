package com.example.template1.service;

import com.example.template1.model.QnA;
import com.example.template1.model.Users;
import com.example.template1.model.dto.QnaRequest;
import com.example.template1.repository.QnARepository;
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

    public QnA saveQna(QnaRequest request) {
        Users users = new Users();
        users.setId(request.getManagerId().getId()); // 관리자 id

        QnA qna = QnA.builder()
                .mTitle(request.getMTitle())
                .mContent(request.getMContent())
                .flg(request.getFlg())
                .manager(users)
                .build();
        return qnARepository.save(qna);
    }

    public QnA updateQna(QnaRequest request) {
        return null;
    }
}
