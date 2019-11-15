package com.example.cheezetoon.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.cheezetoon.model.ApiResponse;
import com.example.cheezetoon.model.NewWebtoon;
import com.example.cheezetoon.payload.NewWebtoonDto;
import com.example.cheezetoon.service.WebtoonService;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api")
public class NewWebController {

    @Autowired
    private WebtoonService webtoonService;

    @PostMapping("/save")
    private ApiResponse<NewWebtoon> saveNewWebtoon(@RequestBody NewWebtoonDto newwebtoon){
        return new ApiResponse<> (HttpStatus.OK.value(), "User saved successfully.", webtoonService.save(newwebtoon));
    }
}