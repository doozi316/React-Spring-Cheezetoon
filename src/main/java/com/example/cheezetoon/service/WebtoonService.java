package com.example.cheezetoon.service;

import com.example.cheezetoon.model.NewWebtoon;
import com.example.cheezetoon.payload.NewWebtoonDto;


public interface WebtoonService{

    NewWebtoon save(NewWebtoonDto newwebtoon);
    NewWebtoon findById(Long id);
}