package com.example.template1.service;

import com.example.template1.model.QnA;
import com.example.template1.repository.QnARepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QnaService {
    private final QnARepository qnARepository;
    public List<QnA> getAllQna() {
        List<QnA> qnaList = qnARepository.findAllByOrderByCreateAtDesc();

        return qnaList;
    }

    public QnA getQna(long id) {
        QnA qna = qnARepository.findById(id).orElseThrow(() -> new IllegalArgumentException("not found : " + id));;
        return qna;
    }
}
