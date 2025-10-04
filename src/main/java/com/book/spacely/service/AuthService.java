package com.book.spacely.service;

import com.book.spacely.dto.RegistrationRequest;
import com.book.spacely.entity.User;
import com.book.spacely.model.Role;
import com.book.spacely.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void register(RegistrationRequest request){
        if(userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new IllegalStateException("Email is already in use");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.MEMBER);

        userRepository.save(user);
    }
}
