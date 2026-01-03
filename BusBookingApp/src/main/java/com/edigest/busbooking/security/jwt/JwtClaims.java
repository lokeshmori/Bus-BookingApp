package com.edigest.busbooking.security.jwt;

import java.util.Map;

public class JwtClaims {
	
	private final String subject;
    private final String role;
    private final Long userId;
    private final Map<String, Object> extraClaims;
    
    private JwtClaims(Builder builder) {
        this.subject = builder.subject;
        this.role = builder.role;
        this.userId = builder.userId;
        this.extraClaims = builder.extraClaims;
    }
    
    public String getSubject() {
        return subject;
    }

    public String getRole() {
        return role;
    }

    public Long getUserId() {
        return userId;
    }

    public Map<String, Object> getExtraClaims() {
        return extraClaims;
    }
    
    
    
    public static class Builder {
        private String subject;
        private String role;
        private Long userId;
        private Map<String, Object> extraClaims;

        public Builder subject(String subject) {
            this.subject = subject;
            return this;
        }

        public Builder role(String role) {
            this.role = role;
            return this;
        }

        public Builder userId(Long userId) {
            this.userId = userId;
            return this;
        }

        public Builder extraClaims(Map<String, Object> extraClaims) {
            this.extraClaims = extraClaims;
            return this;
        }

        public JwtClaims build() {
            return new JwtClaims(this);
        }
    }
}
