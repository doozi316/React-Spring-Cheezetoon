package com.example.cheezetoon.service;

import com.example.cheezetoon.model.Toon;
import com.example.cheezetoon.repository.ToonRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ToonService {

    @Autowired
    ToonRepository toonRepository;

    public void updateToon(Toon toon){
        toonRepository.save(toon);
    }
}