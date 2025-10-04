package com.book.spacely.controller;

import com.book.spacely.dto.RegistrationRequest;
import com.book.spacely.service.AuthService;
import lombok.Generated;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegistrationRequest request){
        authService.register(request);
        return ResponseEntity.ok("User registered succesfully");
    }
}
