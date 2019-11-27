package com.example.cheezetoon.controller;


import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.example.cheezetoon.model.EpiThumbnail;
import com.example.cheezetoon.model.EpiToon;
import com.example.cheezetoon.model.Episode;
import com.example.cheezetoon.model.Toon;
import com.example.cheezetoon.model.ToonThumbnail;
import com.example.cheezetoon.repository.EpisodeRepository;
import com.example.cheezetoon.repository.ToonRepository;
import com.example.cheezetoon.service.EpiThumbnailService;
import com.example.cheezetoon.service.EpiToonService;
import com.example.cheezetoon.service.ToonThumbnailService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @Autowired
    private EpiThumbnailService epiThumbnailService;
    
    @Autowired
    private EpisodeRepository episodeRepository;

    @Autowired
    private EpiToonService epiToonService;
    
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

    // 새 에피소드 등록
    // @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/newEpi", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public Episode newEpi(@RequestParam("epiTitle") String epiTitle, @RequestParam("webtoonId") Integer webtoonId,
            @RequestParam("eFile") MultipartFile eFile, @RequestParam("mFile") MultipartFile mFile) {

        
        
        Episode episode = new Episode(epiTitle, webtoonId);
        EpiThumbnail epiThumbnail = epiThumbnailService.saveEpiThumbnail(eFile);
        EpiToon epiToon = epiToonService.saveEpiToon(mFile);


        episode.setEpiToon(epiToon);
        epiToon.setEpisode(episode);

        episode.setEpiThumbnail(epiThumbnail);
        epiThumbnail.setEpisode(episode);

        Episode result = episodeRepository.save(episode);
        
        return result;

    }

    
    // 새 에피소드 등록을 위한 webtoonId 값 가져오기
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getToonIdAndName")
    public List<Map<String, Object>> getTIAN() {
        return toonRepository.getToonIdAndName();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getToon")
    public Collection<Toon> getToon() {
        return toonRepository.findAll();
    }

    // @PreAuthorize("hasRole('ADMIN')")
    // @GetMapping("/getEpi")
    // public Collection<EpiStorage> getEpi() {
    //     return epiStorageDAO.findAll();
    // }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getToonById/{id}")
    public Optional<Toon> getToonById(@PathVariable int id) {
        return toonRepository.findById(id);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getToonThumbnailById/{id}")
    public List<Map<String, Object>> getToonThumbnailById(@PathVariable int id) {
        return toonRepository.getToonThumbnailByID(id);
    }

    // // @PreAuthorize("hasRole('ADMIN')")
    // @PutMapping("/deleteFile/{id}")
    // public Integer deleteFile(@PathVariable Integer id) {
    //     return toonStorageDAO.deleteFileInfo(id);
    // }

    // 기존 웹툰 삭제
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/deleteToon/{id}")
    public void deleteToon(@PathVariable Integer id) {
        toonRepository.deleteById(id);
    }

}
