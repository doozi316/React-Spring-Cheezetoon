package com.example.cheezetoon.controller;

import com.example.cheezetoon.model.ToonStorage;
import com.example.cheezetoon.service.ToonStorageService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class ToonController {

    private static final Logger logger = LoggerFactory.getLogger(ToonController.class);

    @Autowired
    private ToonStorageService toonStorageService;

    @PostMapping(value = "/newToonSave", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @PreAuthorize("hasRole('ADMIN')")
    public ToonStorage uploadFile(@RequestParam("file") MultipartFile file) {
        
        ToonStorage toonStorage = toonStorageService.storeFile(file);


        return toonStorage;
        
    }

}