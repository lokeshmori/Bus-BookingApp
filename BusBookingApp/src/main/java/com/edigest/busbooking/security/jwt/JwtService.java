package com.edigest.busbooking.security.jwt;

import org.springframework.stereotype.Service;

@Service
public class JwtService {

	 private final JwtTokenBuilder tokenBuilder;

	    public JwtService(JwtConfig config) {
	        this.tokenBuilder =
	                new JwtTokenBuilder(
	                        config.getSecret(),
	                        config.getExpiration()
	                );
	    }

	    public String generateAccessToken(Long userId,
	                                      String email,
	                                      String role) {

	        JwtClaims claims = new JwtClaims.Builder()
	                .subject(email)
	                .userId(userId)
	                .role(role)
	                .build();

	        return tokenBuilder.buildToken(claims);
	    }
	
}
