package com.edigest.busbooking.auth.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edigest.busbooking.auth.dto.AuthResponse;
import com.edigest.busbooking.auth.dto.LoginRequest;
import com.edigest.busbooking.auth.dto.RegisterRequest;
import com.edigest.busbooking.auth.service.AuthService;

@RestController
@RequestMapping("/api/auth")
//@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

	  private final AuthService authService ;
	  
	  public AuthController(AuthService authService) {
	        this.authService = authService;
	    }


	    @PostMapping("/register")
	    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
	        authService.register(req);
	        Map<String, String> response = new HashMap<>();
	        response.put("message", "Registered successfully");
	        return ResponseEntity.ok(response);
	    }

	    @PostMapping("/login")
	    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest req) {
	        return ResponseEntity.ok(authService.login(req));
	    }
	    
	    @GetMapping("/loki")
	    public ResponseEntity<String> profile(){
	    	
	    	 return ResponseEntity.ok().body("profile") ;
	    	
	    }
	
}
