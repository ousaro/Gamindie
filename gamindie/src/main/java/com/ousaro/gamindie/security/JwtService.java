
package com.ousaro.gamindie.security;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;


@Service  // service provider where we can define the logic used in the application
public class JwtService {

    @Value("${application.security.jwt.expiration}") // to get the expiration time of the token from the application.properties file
    private long jwtExpiration;
    @Value("${application.security.jwt.secret-key}")
    private String secretKey;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject); // to extract the subject from the token (usermane)
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) { // T is the type of the claim that we want to extract and claimsResolver is the function that will extract the claim
        final Claims claims = extractAllClaims(token); // to extract all the claims from the token // claims are the data that we want to store in the token
        return claimsResolver.apply(claims); // to apply the claimsResolver function to the claims
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder() // to build the parser
                .setSigningKey(getSignInKey()) // to set the signing key
                .build() // to build the parser
                .parseClaimsJws(token) // to parse the token
                .getBody(); // to get the body of the token
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    // claims are the data that we want to store in the token
    public String generateToken(Map<String, Object> claims, UserDetails userDetails) {
        return buildToken(claims, userDetails, jwtExpiration);
    }

    private String buildToken(Map<String, Object> claims, UserDetails userDetails, long expiration) {
        var authorities = userDetails.getAuthorities() // to get the authorities of the user
                .stream() // to convert the authorities to a stream
                .map(GrantedAuthority::getAuthority) // to get the authority of the user as a string
                .toList();

        return Jwts.builder() // to build the token
                .setClaims(claims) // to set the extra claims
                .setSubject(userDetails.getUsername()) // to set the subject of the token
                .setIssuedAt(new Date(System.currentTimeMillis())) // to set the issued date of the token
                .setExpiration(new Date(System.currentTimeMillis() + expiration)) // to set the expiration date of the token
                .claim("authorities", authorities) // to set the authorities of the user as a extra claim
                .signWith(getSignInKey()) // to sign the token
                .compact(); // to compact the token
    }


    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date()); // to check if the expiration date is before the current date
    }
    
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration); // to extract the expiration date from the token
    }

    private Key getSignInKey() { // this is used to create a key from the secret key to sign the token for security
        byte[] keyBytes = Decoders.BASE64.decode(secretKey); // to decode the secret key
        return Keys.hmacShaKeyFor(keyBytes); // to create a key from the secret key
    }

    

}
