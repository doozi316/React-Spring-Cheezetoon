package com.example.cheezetoon.controller;

import com.example.cheezetoon.model.EpiStorage;
import com.example.cheezetoon.model.ToonStorage;
import com.example.cheezetoon.service.EpiStorageService;
import com.example.cheezetoon.service.ToonStorageService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


// @RequestMapping("/api")
@RestController
public class ToonController {

    private static final Logger logger = LoggerFactory.getLogger(ToonController.class);

    @Autowired
    private ToonStorageService toonStorageService;
    
    @Autowired
    private EpiStorageService epiStorageService;


    // @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/newAdd", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ToonStorage NewAdd(@RequestParam("title") String title,
                                    @RequestParam("artist") String artist,
                                    @RequestParam("day") String day,
                                    @RequestParam("genre") String genre,
                                    @RequestParam("file") MultipartFile file) {
        
        ToonStorage toonStorage = toonStorageService.storeFile(title, artist, day, genre, file);

        return toonStorage;
        
    }

    @PostMapping (value = "/newEpi", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public EpiStorage NewEpi(@RequestParam("epiTitle") String epiTitle,
                                @RequestParam("webtoonId") int webtoonId,
                                @RequestParam("epiFile") MultipartFile epiFile,
                                @RequestParam("conFile") MultipartFile conFile) {

                                    
        EpiStorage epiStorage = epiStorageService.storeEpi(epiTitle, webtoonId, epiFile, conFile);

        return epiStorage;
        
    }
}