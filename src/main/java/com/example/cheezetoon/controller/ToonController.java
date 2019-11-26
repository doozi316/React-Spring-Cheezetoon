package com.example.cheezetoon.controller;


import com.example.cheezetoon.model.Toon;
import com.example.cheezetoon.model.ToonThumbnail;

import com.example.cheezetoon.repository.ToonRepository;

import com.example.cheezetoon.service.ToonThumbnailService;

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

@RequestMapping("/api")
@RestController
public class ToonController {

    private static final Logger logger = LoggerFactory.getLogger(ToonController.class);

    @Autowired
    private ToonRepository toonRepository;

    @Autowired
    private ToonThumbnailService toonThumbnailService;
    
    
    // 새 웹툰 등록
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/newAdd", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public Toon newAdd(@RequestParam("title") String title, @RequestParam("artist") String artist,
            @RequestParam("day") String day, @RequestParam("genre") String genre,
            @RequestParam("file") MultipartFile file) {

        
        
        Toon toon = new Toon(title, artist, day, genre);
        ToonThumbnail toonThumbnail = toonThumbnailService.saveThumbnail(file);
        
        toon.setToonThumbnail(toonThumbnail);

        toonThumbnail.setToon(toon);

        Toon result = toonRepository.save(toon);

        return result;

    }








    // @PreAuthorize("hasRole('ADMIN')")
    // @GetMapping("/getToonIdAndName")
    // public List<Map<String, Object>> getTIAN() {
    //     return toonStorageDAO.getToonIdAndName();
    // }

    // @PreAuthorize("hasRole('ADMIN')")
    // @GetMapping("/getToon")
    // public Collection<ToonStorage> getToon() {
    //     return toonStorageDAO.findAll();
    // }

    // @PreAuthorize("hasRole('ADMIN')")
    // @GetMapping("/getEpi")
    // public Collection<EpiStorage> getEpi() {
    //     return epiStorageDAO.findAll();
    // }

    // @PreAuthorize("hasRole('ADMIN')")
    // @GetMapping("/getToonById/{id}")
    // public Optional<ToonStorage> getToonById(@PathVariable int id) {
    //     return toonStorageDAO.findById(id);
    // }


    // // @PreAuthorize("hasRole('ADMIN')")
    // @PutMapping("/deleteFile/{id}")
    // public Integer deleteFile(@PathVariable Integer id) {
    //     return toonStorageDAO.deleteFileInfo(id);
    // }

    // // @PreAuthorize("hasRole('ADMIN')")
    // @DeleteMapping("/deleteToon/{id}")
    // public void deleteToon(@PathVariable Integer id) {
    //     toonStorageDAO.deleteById(id);
    // }

}
