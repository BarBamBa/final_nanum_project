package com.example.template1.model;

import com.example.template1.model.enums.Authority;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.validator.constraints.pl.REGON;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(value = AuditingEntityListener.class)

public class Users extends BaseEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID")
    private Long id;

//    @OneToMany(mappedBy = "users")
//    List<Board> boards = new ArrayList<>();

//    @OneToMany(mappedBy = "users")
//    List<Applicants> applicants = new ArrayList<>();
//
//    @OneToMany(mappedBy = "users")
//    List<Review> reviews = new ArrayList<>();
//
//    @OneToMany(mappedBy = "users")
//    List<BoardImg> boardImgs = new ArrayList<>();

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    private String name;

    @Column(unique = true, nullable = false)
    private String nickname;

    private String address;

    private int age;

    private char gender;

    private String phone;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "authority")
    private Authority authority;

    @Column(columnDefinition = "CHAR(1) DEFAULT 'Y'")
    private char status;

    @Column(columnDefinition = "CHAR(1) DEFAULT 'N'")
    private char emailVerify;

    private String accessToken;

    private Long accessTokenExpireIn;

    private String refreshToken;

//    @Transient
//    private List<String> roles = new ArrayList<>();

//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities(){
//        return this.roles.stream()
//                .map(SimpleGrantedAuthority::new)
//                .collect(Collectors.toList());
////        return null;
//    }

    @Override
    public String getUsername() { return String.valueOf(id); }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
