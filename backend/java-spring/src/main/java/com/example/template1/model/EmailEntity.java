package com.example.template1.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class EmailEntity {
    private String to;
    private String subject;
    private String message;
}
