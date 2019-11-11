package com.example.cheezetoon.security;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import java.lang.annotation.*;

//Custom annotation 
@Target({ElementType.PARAMETER, ElementType.TYPE}) //어노테이션이 적용할 위치 : 타입 선언, 매개 변수 선언 시
@Retention(RetentionPolicy.RUNTIME) //어노테이션의 범위 : 컴파일 이후에도 JVM에 의해서 참조 가능
@Documented //문서에도 어노테이션의 정보 표현됨
@AuthenticationPrincipal //현재 인증 유저에 접근
public @interface CurrentUser { //custom annotation : @interface

} 