package com.example.template1.service;

import com.example.template1.config.jwt.JwtTokenProvider;
import com.example.template1.model.Users;
import com.example.template1.config.jwt.JwtTokenDto;
import com.example.template1.model.dto.UsersDto;
import com.example.template1.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class UserService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;


    public Users saveUser(UsersDto dto) {
        Users users = Users.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .age(dto.getAge())
                .password(dto.getPassword())
                .address(dto.getAddress())
                .nickname(dto.getNickname())
                .phone(dto.getPhone())
                .gender(dto.getGender())
                .authority(dto.getAuthority())
                .build();
        System.out.println(users.getId());
        String encodedPassword = passwordEncoder.encode(dto.getPassword());
        users.setPassword(encodedPassword);

        return usersRepository.save(users);
    }

    // 닉네임 중복확인
    public boolean isNicknameAvailable(String nickname) {
        Optional<Users> existingUser = usersRepository.findByNickname(nickname);
        return !existingUser.isPresent();
    }

    // 이메일 중복확인
    public boolean isEmailAvailable(String email) {
        Users existingUser = usersRepository.findByEmail(email);
        return existingUser == null;
    }


    // 비밀번호 암호화 로그인 및 토큰 반환

    @Transactional
    public JwtTokenDto login(String email, String password) {

        Users user = usersRepository.findByEmail(email);

        if (user == null) {

            return null; // 로그인 실패

        }

        if (passwordEncoder.matches(password, user.getPassword())) {

            // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
            // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);

            // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
            // authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

            // 3. 인증 정보를 기반으로 JWT 토큰 생성
            JwtTokenDto jwtTokenDto = jwtTokenProvider.generateTokenDto(authentication);

            log.info("Generated token: {}", jwtTokenDto.getAccessToken());

            jwtTokenDto.setNickname(user.getNickname());

            return jwtTokenDto;

        } else {
            return null;
        }

    }


    //유저 정보 조회
    public UsersDto getMyInfoBySecurity() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication.getName());
        Long id = Long.valueOf(authentication.getName());

        Optional<UsersDto> userOptional
                = usersRepository.findById(id).map(UsersDto::new);
        return userOptional.orElse(null);
    }




    // 유저 정보 업데이트
    @Transactional
    public void updateUser(UsersDto dto) {
        Users user = usersRepository.findById(dto.getId())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        if(!user.getEmail().equals(dto.getEmail())) {
            user.setEmailVerify('N');
        }
        user.setEmail(dto.getEmail());
        user.setNickname(dto.getNickname());
        user.setPhone(dto.getPhone());
        user.setAddress(dto.getAddress());


        usersRepository.save(user);
    }

    public String findEmailByNameAndPhone(String name, String phone) {
        return usersRepository.findByNameAndPhone(name, phone).getEmail();
    }
}
