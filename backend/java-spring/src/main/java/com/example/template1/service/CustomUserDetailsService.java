package com.example.template1.service;

import com.example.template1.model.Users;
import com.example.template1.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UsersRepository usersRepository;
//    private final PasswordEncoder passwordEncoder;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        Optional<Users> usersOptional = Optional.ofNullable(usersRepository.findByEmail(username));

        if (usersOptional.isPresent()) {
            Users users = usersOptional.get();
            return createUserDetails(users);
        } else {
            throw new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다.");
        }
    }

    private UserDetails createUserDetails(Users users) {
        GrantedAuthority authorities = new SimpleGrantedAuthority(users.getAuthority());

        return new User(
                String.valueOf(users.getId()),
                users.getPassword(),
                Collections.singleton(authorities)
        );
    }
}
