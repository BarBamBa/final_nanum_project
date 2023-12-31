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
    public List<Reply> getAllReply(long id) { //boardId로 댓글 모두 조회
        List<Reply> replyList = replyRepository.findAllByBoardIdAndReplyIsNull(id);
        return replyList;
    }

    public List<Reply> getAllChildReply(Reply id) { //parentsId 로 대댓글 조회
        List<Reply> replyList = replyRepository.findAllByReply(id);
        return replyList;

    }

    public Reply saveReply(long id, ReplyRequest request) { //댓글입력
        Users users = new Users();
        users.setId(request.getUserId());

        Board board = new Board();
        board.setId(id);

        Reply reply = new Reply();
        reply.setId(request.getParentNo());

        Reply replyData = null;

        // 부모댓글 id가 없이 넘어오면 댓글입력
        if (request.getParentNo() == null) {
            replyData = Reply.builder()
                    .content(request.getContent())
                    .status('Y')
                    .users(users)
                    .board(board)
                    .build();
        }
        // 부모댓글 id가 넘어오면 대댓글 입력
        if (request.getParentNo() != null) {
//            Reply reply2 = new Reply();
//            reply2.setId(request.getParentNo());
            replyData = Reply.builder()
                    .content(request.getContent())
                    .reply(reply)
                    .status('Y')
                    .users(users)
                    .board(board)
                    .build();
        }


        return replyRepository.save(replyData);
    }

    @Transactional
    public Reply deleteOrEditReply(long id, ReplyRequest request) { //댓글/대댓글 수정
        Reply reply = replyRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("not found : " + id));
        // content가 비어서 오는 경우 삭제기능
        if(request.getContent() != null) {
            reply.setContent(request.getContent());
        }
        reply.setStatus(request.getStatus());
        return reply;
    }
}
