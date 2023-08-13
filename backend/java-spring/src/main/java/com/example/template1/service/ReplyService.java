package com.example.template1.service;

import com.example.template1.model.Board;
import com.example.template1.model.Reply;
import com.example.template1.model.Users;
import com.example.template1.model.dto.ReplyRequest;
import com.example.template1.repository.ReplyRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReplyService {
    private final ReplyRepository replyRepository;
    public List<Reply> getAllReply(long id) {
        List<Reply> replyList = replyRepository.findAllByBoardIdAndParentsNoIsNull(id);
        return replyList;
    }

    public List<Reply> getAllChildReply(Reply id) {
        List<Reply> replyList = replyRepository.findAllByParentsNo(id);
        return replyList;
    }

    public Reply saveReply(long id, ReplyRequest request) {
        Users users = new Users();
        users.setId(1L); //userid 임의로 1로 지정

        Board board = new Board();
        board.setId(id);

        Reply reply =  Reply.builder()
                .content(request.getContent())
                .status('Y')
                .users(users)
                .board(board)
                .build();

        return replyRepository.save(reply);
    }

    @Transactional
    public Reply deleteOrEditReply(long id, ReplyRequest request) {
        Reply reply = replyRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("not found : " + id));
        // content가 비어서 오는 경우 삭제기능
        if(request.getContent() != null) {
            reply.setContent(request.getContent());
        }
        reply.setStatus(request.getStatus());
        return reply;
    }
}
