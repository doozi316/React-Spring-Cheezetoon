package com.example.cheezetoon.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import com.example.cheezetoon.config.EpiThumbnailProperties;
import com.example.cheezetoon.exception.FileStorageException;
import com.example.cheezetoon.model.EpiThumbnail;
import com.example.cheezetoon.repository.EpiThumbnailRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;



@Service
public class EpiThumbnailService {

    private final Path epiThumbnailLocation;

    @Autowired
    private EpiThumbnailRepository epiThumbnailRepository;

    @Autowired
    public EpiThumbnailService(EpiThumbnailProperties epiThumbnailProperties) {
        this.epiThumbnailLocation = Paths.get(epiThumbnailProperties.getUploadDir())
            .toAbsolutePath().normalize();

            try {
                Files.createDirectories(this.epiThumbnailLocation);
            } catch (Exception ex) {
                throw new FileStorageException("파일을 업로드할 디렉토리를 생성하지 못했습니다.", ex);
            }
    }

    //파일 저장
    public EpiThumbnail saveEpiThumbnail(MultipartFile eFile) {
        //파일 이름
        String fileName = StringUtils.cleanPath(eFile.getOriginalFilename());

        //파일 경로(FileUri)
        String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/thumbnails/")
            .path(fileName)
            .toUriString();

        
        try {
            // 파일명에 부적합 문자가 있는지 확인한다.
            if(fileName.contains("..")) {
                throw new FileStorageException ("파일명에 부적합 문자가 포함되어 있습니다. " + fileName);
            }

        //동일한 파일 이름이 존재한다면 copy 대체
        Path targetLocation = this.epiThumbnailLocation.resolve(fileName);

        Files.copy(eFile.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        EpiThumbnail epiThumbnail = new EpiThumbnail(fileName, eFile.getContentType(), fileUri, eFile.getSize());
    
        return epiThumbnail;
    
    } catch (IOException ex) {
            throw new FileStorageException("Could not store file " +fileName + ". Please try again!", ex);
        }
    }


   
}
