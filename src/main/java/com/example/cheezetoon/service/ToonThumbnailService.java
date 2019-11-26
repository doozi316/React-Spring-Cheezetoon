package com.example.cheezetoon.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import com.example.cheezetoon.config.FileStorageProperties;
import com.example.cheezetoon.exception.FileStorageException;
import com.example.cheezetoon.model.ToonThumbnail;
import com.example.cheezetoon.repository.ToonThumbnailRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.util.StringUtils;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Service
public class ToonThumbnailService {

    //Service가 실행될때 생성자에서 기존에 생성한 설정클래스인 FileStorageProperties 클래스로 기본 디렉토리를 설정하고 생성한다.
    private final Path fileStorageLocation;

    @Autowired
    private ToonThumbnailRepository toonThumbnailRepository;

    @Autowired
    public ToonThumbnailService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
            .toAbsolutePath().normalize();

            try {
                Files.createDirectories(this.fileStorageLocation);
            } catch (Exception ex) {
                throw new FileStorageException("파일을 업로드할 디렉토리를 생성하지 못했습니다.", ex);
            }
    }

    //파일 저장
    public ToonThumbnail saveThumbnail(MultipartFile file) {
        //파일 이름(fileName)
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        //파일 경로(FileUri)
        String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/uploads/")
            .path(fileName)
            .toUriString();

        
        try {
            // 파일명에 부적합 문자가 있는지 확인한다.
            if(fileName.contains("..")) {
                throw new FileStorageException ("파일명에 부적합 문자가 포함되어 있습니다. " + fileName);
            }

        //동일한 파일 이름이 존재한다면 copy 대체
        Path targetLocation = this.fileStorageLocation.resolve(fileName);

        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        ToonThumbnail toonThumbnail = new ToonThumbnail(fileName, file.getContentType(), fileUri, file.getSize());
    
        return toonThumbnail;
    
    } catch (IOException ex) {
            throw new FileStorageException("Could not store file " +fileName + ". Please try again!", ex);
        }
    }


   
}
