package com.example.cheezetoon.config;

import com.example.cheezetoon.security.CustomUserDetailsService;
import com.example.cheezetoon.security.JwtAuthenticationEntryPoint;
import com.example.cheezetoon.security.JwtAuthenticationFilter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity( //보안 어노테이션
    securedEnabled = true, //@Secured 가 붙은 클래스나 인터페이스의 메소드 액세스 제한
    jsr250Enabled = true, //@RolesAllowed
    prePostEnabled = true //@PreAuthorize
)

//WebSecurityConfigurerAdapter : extends, customize by customize 제공
public class SecurityConfig extends WebSecurityConfigurerAdapter{
    
    //user, role 인증을 위해 users detail 가져오기
    //loadUserByUsername으로 UserDetail 객체를 반환하는 userDetailService로 구성되어있음
    @Autowired
    CustomUserDetailsService customUserDetailService;  

    //보안 resource에 인증되지 않은 접근 발생시 401 에러 return
    //spring security의 AuthenticationEntryPoint interface를 implements
    @Autowired
    private JwtAuthenticationEntryPoint unauthorizedHandler;

    //(모든 요청의 Authorization header의)토큰이 필요한 필터
    //filter는 RequestMatcher(해당 필터에 대한 Url, Method 설정 부분) 인터페이스 무조건 받음
    //토큰과 관련된 users detail 가져옴(SecurityContext)
    @Bean
    public JwtAuthenticationFilter JwtAuthenticationFilter(){
        return new JwtAuthenticationFilter();
    }

    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception{
        authenticationManagerBuilder //인증 객체 생성 제공 
                //스프링 시큐리티 인증용.
                //userRepository를 통해 영속성으로 저장된 인증정보를 검색한 후 존재하지 않는다면 exception 반환
                //있다면 UserDetails 객체 반환
                .userDetailsService(customUserDetailService) 
                .passwordEncoder(passwordEncoder()); //패스워드 암호화 구현체
    }

    //AuthenticationManager : 인증 공급자를 위한 컨테이너
    //인증을 시도해서 성공하면 authentication 객체 반환
    //실패 시 exception 반환
    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors() //Cross Origin Resource Sharing
                    .and()
                .csrf()
                    .disable() //rest api이므로 csrf 보안이 필요 없으므로 disable 처리
                .exceptionHandling() //예외처리
                    .authenticationEntryPoint(unauthorizedHandler) //전달 예외 잡기
                    .and()
                .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // jwt token으로 인증하므로 세션은 필요없으므로 생성안함
                    .and()
                .authorizeRequests() //다음 리퀘스트에 대한 사용권한 체크
                    .antMatchers("/",
                        "/favicon.ico",
                        "/**/*.png",
                        "/**/*.gif",
                        "/**/*.svg",
                        "/**/*.jpg",
                        "/**/*.html",
                        "/**/*.css",
                        "/**/*.js")
                        .permitAll() // 위 경로는 누구나 접근 가능
                    .antMatchers("/api/auth/**") // api/auth 로 시작하는 경로 누구나 접근가능
                        .permitAll()
                    .antMatchers("/api/user/checkUsernameAvailability", "/api/user/checkEmailAvailability")
                        .permitAll() // 위 경로 누구나 접근가능
                    .antMatchers(HttpMethod.GET, "/api/users/**", "/api/getToon/**", "/api/getToonThumbnail") //api/users로 시작하는 GET요청 리소스 누구나 접근 가능
                        .permitAll()
                    .antMatchers(HttpMethod.POST, "/newAdd", "/saveComment/**", "/testAdd") 
                        .permitAll()
                    .antMatchers(HttpMethod.PUT, "/deleteToonThumbnail/**", "/putEdit/**", "/uploadEditEpi/**", "/uploadEditEpiExceptTaM/**") 
                        .permitAll()  
                    .antMatchers(HttpMethod.DELETE, "/deleteToon/**") 
                        .permitAll()   
                    .anyRequest()
                        .authenticated(); //그 외 나머지 요청은 모두 인증된 회원만 접근가능

        // Add our custom JWT security filter
        http.addFilterBefore(JwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

    }
}