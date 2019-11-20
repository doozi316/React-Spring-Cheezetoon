package com.example.cheezetoon.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import com.example.cheezetoon.config.FileStorageProperties;
import com.example.cheezetoon.exception.FileStorageException;
import com.example.cheezetoon.model.EpiStorage;
import com.example.cheezetoon.repository.EpiStorageDAO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.util.StringUtils;

@Service
public class EpiStorageService {


    //Service가 실행될때 생성자에서 기존에 생성한 설정클래스인 FileStorageProperties 클래스로 기본 디렉토리를 설정하고 생성한다.
    private final Path fileStorageLocation;

    @Autowired
    private EpiStorageDAO epiStorageDAO;

    @Autowired
    public EpiStorageService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
            .toAbsolutePath().normalize();

            try {
                Files.createDirectories(this.fileStorageLocation);
            } catch (Exception ex) {
                throw new FileStorageException("파일을 업로드할 디렉토리를 생성하지 못했습니다.", ex);
            }
    }


    // 파일 저장
    public EpiStorage storeEpi(String epiTitle, int webtoonId, MultipartFile epiFile){

        // Normalize file name
        String epiFileName = StringUtils.cleanPath(epiFile.getOriginalFilename());

        String epiFileUri = ServletUriComponentsBuilder.fromCurrentContextPath()
        .path("/uploads/")
        .path(epiFileName)
        .toUriString();

        try {
            // 파일명에 부적합 문자가 있는지 확인한다.
            if(epiFileName.contains("..")) {
                throw new FileStorageException ("파일명에 부적합 문자가 포함되어 있습니다. " + epiFileName);
            }
        //Copy file to the target location (Replacing existing file with the same name)
        Path targetLocation = this.fileStorageLocation.resolve(epiFileName);

        Files.copy(epiFile.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        EpiStorage epiStorage = new EpiStorage(epiTitle, webtoonId, epiFileName, epiFileUri, epiFile.getContentType(), epiFile.getSize());

        epiStorageDAO.save(epiStorage);

        return epiStorage;
 
    } catch(IOException ex) {
        throw new FileStorageException("Could not store file " + epiFileName + ". Please try again!", ex);
    }
}
}