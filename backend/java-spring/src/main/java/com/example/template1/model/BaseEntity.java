package com.example.template1.model;

import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Data
@MappedSuperclass
@EntityListeners(value = AuditingEntityListener.class)
public class BaseEntity implements TimeAuditable{

    @CreatedDate            // AudtingEntityListner Annotation
    private LocalDateTime createAt;

    @LastModifiedDate       // AudtingEntityListner Annotation
    private LocalDateTime updateAt;
}
