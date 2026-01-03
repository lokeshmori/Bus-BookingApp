package com.edigest.busbooking.auth.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.edigest.busbooking.auth.dto.AuthResponse;
import com.edigest.busbooking.auth.dto.LoginRequest;
import com.edigest.busbooking.auth.dto.RegisterRequest;
import com.edigest.busbooking.auth.entity.User;
import com.edigest.busbooking.auth.repository.UserRepository;
import com.edigest.busbooking.common.enums.Role;
import com.edigest.busbooking.security.JwtUtil;
import com.edigest.busbooking.security.jwt.JwtService;

@Service
public class AuthService {

	private final JwtService jwtService;
    private final UserRepository repo;
    private final PasswordEncoder encoder;
    
    //private final JwtUtil jwtUtil;
    
    

    public AuthService(UserRepository repo, PasswordEncoder encoder, JwtService jwtService) {
		super();
		this.repo = repo;
		this.encoder = encoder;
		this.jwtService = jwtService;
		//this.jwtUtil = jwtUtil;
	}

	public void register(RegisterRequest req) {
        User user = new User();
        user.setEmail(req.getEmail());
        user.setFullName(req.getFullName());
        user.setPasswordHash(encoder.encode(req.getPassword()));
        user.setRole(Role.USER);
        repo.save(user);
    }

    public AuthResponse login(LoginRequest req) {
        User user = repo.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!encoder.matches(req.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }
        
        String token = jwtService.generateAccessToken(
                user.getId(),
                user.getEmail(),
                user.getRole().name()
        );

        return new AuthResponse(token ,"");

       // return new AuthResponse(jwtUtil.generateToken(user.getEmail()));
    }
    
    public Optional<User> GetUserDetails(String email) {
 	   
	     return repo.findByEmail(email);
	
}
    
    
	
}
