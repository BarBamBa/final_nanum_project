package com.example.template1.repository;

import com.example.template1.model.Reply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReplyRepository extends JpaRepository<Reply, Long> {

    List<Reply> findAllByBoardIdAndReplyIsNull(long id);

    List<Reply> findAllByReply(Reply id);
}
