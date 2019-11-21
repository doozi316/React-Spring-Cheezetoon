package com.example.cheezetoon.controller;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import com.example.cheezetoon.model.EpiStorage;
import com.example.cheezetoon.model.ToonStorage;
import com.example.cheezetoon.repository.ToonStorageDAO;
import com.example.cheezetoon.service.EpiStorageService;
import com.example.cheezetoon.service.ToonStorageService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@RequestMapping("/api")
@RestController
public class ToonController {

    private static final Logger logger = LoggerFactory.getLogger(ToonController.class);

    @Autowired
    private ToonStorageService toonStorageService;
    
    @Autowired
    private EpiStorageService epiStorageService;

    @Autowired
    private ToonStorageDAO toonStorageDAO;



    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/newAdd", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ToonStorage NewAdd(@RequestParam("title") String title,
                                    @RequestParam("artist") String artist,
                                    @RequestParam("day") String day,
                                    @RequestParam("genre") String genre,
                                    @RequestParam("file") MultipartFile file) {
        
        ToonStorage toonStorage = toonStorageService.storeFile(title, artist, day, genre, file);

        return toonStorage;
        
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping (value = "/newEpi", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public EpiStorage NewEpi(@RequestParam("epiTitle") String epiTitle,
                                @RequestParam("webtoonId") int webtoonId,
                                @RequestParam("epiFile") MultipartFile epiFile,
                                @RequestParam("conFile") MultipartFile conFile) {

                                    
        EpiStorage epiStorage = epiStorageService.storeEpi(epiTitle, webtoonId, epiFile, conFile);

        return epiStorage;
        
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping ("/getToonIdAndName")
    public List<Map<String, Object>> getTIAN() {
        return toonStorageDAO.getToonIdAndName();
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping ("/getToon")
    public Collection<ToonStorage> getToon() {
        return toonStorageDAO.findAll();
    }
}
