package com.example.cheezetoon;

import java.util.Date;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
 
@RestController
public class HelloController {
    @GetMapping("/api/hello")
    public String hello() {
        return "Did you change? " + new Date() + "\n";
    }
}