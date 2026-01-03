package com.edigest.busbooking.security.jwt;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtTokenBuilder {
	
	 private final SecretKey key;
	    private final long expiration;

	    public JwtTokenBuilder(String secret, long expiration) {
	        this.key = Keys.hmacShaKeyFor(secret.getBytes());
	        this.expiration = expiration;
	    }
	    
	    
	    public String buildToken(JwtClaims claims) {

	        Map<String, Object> payload = new HashMap<>();
	        payload.put("role", claims.getRole());
	        payload.put("userId", claims.getUserId());

	        if (claims.getExtraClaims() != null) {
	            payload.putAll(claims.getExtraClaims());
	        }

	        return Jwts.builder()
	                .setClaims(payload)
	                .setSubject(claims.getSubject())
	                .setIssuedAt(new Date())
	                .setExpiration(new Date(System.currentTimeMillis() + expiration))
	                .signWith(key)
	                .compact();
	    }

}
