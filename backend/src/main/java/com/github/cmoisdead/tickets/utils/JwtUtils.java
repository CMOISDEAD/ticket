package com.github.cmoisdead.tickets.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Map;

@Component
public class JwtUtils {

    public String generateToken(String email, Map<String, Object> claims) {
        Instant now = Instant.now();

        return Jwts.builder()
                .claims(claims)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plus(1L, ChronoUnit.HOURS)))
                .signWith(getSecretKey())
                .compact();
    }

    public Jws<Claims> parseToken(String token)
            throws ExpiredJwtException, UnsupportedJwtException, MalformedJwtException, IllegalArgumentException {
        JwtParser parser = Jwts.parser().verifyWith(getSecretKey()).build();
        return parser.parseSignedClaims(token);
    }

    public String getIdFromToken(String token) {
        Jws<Claims> claims = parseToken(token);
        return claims.getPayload().get("id", String.class);
    }

    public boolean isTokenExpired(Jws<Claims> claimsJws) {
        return claimsJws.getBody().getExpiration().before(new Date());
    }

    private SecretKey getSecretKey() {
        String secret = "secretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecret";
        byte[] bytes = secret.getBytes();
        return Keys.hmacShaKeyFor(bytes);
    }
}