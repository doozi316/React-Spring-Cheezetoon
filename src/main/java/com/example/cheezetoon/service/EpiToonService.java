package com.example.cheezetoon.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import com.example.cheezetoon.config.EpiToonProperties;
import com.example.cheezetoon.exception.FileStorageException;
import com.example.cheezetoon.model.EpiToon;
import com.example.cheezetoon.repository.EpiToonRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;



@Service
public class EpiToonService {

    private final Path epiToonLocation;

    @Autowired
    private EpiToonRepository epiToonRepository;

    @Autowired
    public EpiToonService(EpiToonProperties epiToonProperties) {
        this.epiToonLocation = Paths.get(epiToonProperties.getUploadDir())
            .toAbsolutePath().normalize();

            try {
                Files.createDirectories(this.epiToonLocation);
            } catch (Exception ex) {
                throw new FileStorageException("파일을 업로드할 디렉토리를 생성하지 못했습니다.", ex);
            }
    }

    //파일 저장
    public EpiToon saveEpiToon(MultipartFile mFile) {
        //파일 이름
        String fileName = StringUtils.cleanPath(mFile.getOriginalFilename());

        //파일 경로(FileUri)
        String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/toons/")
            .path(fileName)
            .toUriString();

        
        try {
            // 파일명에 부적합 문자가 있는지 확인한다.
            if(fileName.contains("..")) {
                throw new FileStorageException ("파일명에 부적합 문자가 포함되어 있습니다. " + fileName);
            }

        //동일한 파일 이름이 존재한다면 copy 대체
        Path targetLocation = this.epiToonLocation.resolve(fileName);

        Files.copy(mFile.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        EpiToon epiToon = new EpiToon(fileName, mFile.getContentType(), fileUri, mFile.getSize());
    
        return epiToon;
    
    } catch (IOException ex) {
            throw new FileStorageException("Could not store file " +fileName + ". Please try again!", ex);
        }
    }


   
}
