package com.example.cheezetoon.security;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtTokenProvider { //Jwt 토큰 생성 및 유효성 검증 컴포넌트 

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Value("${app.jwtSecret}") //app properties에 정의돼있음
    private String jwtSecret;

    @Value("${app.jwtExpirationInMs}") //유효기간
    private int jwtExpirationInMs; 

    //Jwt 토큰 생성
    public String generateToken(Authentication authentication) {

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs); //만기 날짜

        return Jwts.builder()
                .setSubject(Long.toString(userPrincipal.getId())) //데이터
                .setIssuedAt(new Date()) //토큰 발행 일자
                .setExpiration(expiryDate) //만기 기간
                .signWith(SignatureAlgorithm.HS512, jwtSecret) //암호화 알고리즘, secret값 세팅
                .compact();
    }

    // Jwt 토큰에서 회원구별 정보 추출
    public Long getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();

        return Long.parseLong(claims.getSubject());
    }

    // Jwt 토큰의 유효성 확인
    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException ex) {
            logger.error("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            logger.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            logger.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            logger.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            logger.error("JWT claims string is empty.");
        }
        return false;
    }
}