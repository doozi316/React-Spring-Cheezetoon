package com.example.cheezetoon;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController{

    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/users")
    public List userlist(){
        System.out.println("aaaa");
        List<User> list = userRepository.findAll();
        return list;
    }
}