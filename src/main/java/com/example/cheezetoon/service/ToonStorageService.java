package com.example.cheezetoon.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;

import com.example.cheezetoon.config.FileStorageProperties;
import com.example.cheezetoon.exception.DataAlreadyExistsException;
import com.example.cheezetoon.exception.FileStorageException;
import com.example.cheezetoon.model.ToonStorage;
import com.example.cheezetoon.repository.ToonStorageDAO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Service
public class ToonStorageService {


    //Service가 실행될때 생성자에서 기존에 생성한 설정클래스인 FileStorageProperties 클래스로 기본 디렉토리를 설정하고 생성한다.
    private final Path fileStorageLocation;

    @Autowired
    private ToonStorageDAO toonStorageDAO;

    @Autowired
    public ToonStorageService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
            .toAbsolutePath().normalize();

            try {
                Files.createDirectories(this.fileStorageLocation);
            } catch (Exception ex) {
                throw new FileStorageException("파일을 업로드할 디렉토리를 생성하지 못했습니다.", ex);
            }
    }

    // 파일 저장
    public ToonStorage storeFile(String title, String artist, String day, String genre, MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/Thumbnail/")
                .path(fileName)
                .toUriString();
        
        try {
            // 파일명에 부적합 문자가 있는지 확인한다.
            if(fileName.contains("..")) {
                throw new FileStorageException ("파일명에 부적합 문자가 포함되어 있습니다. " + fileName);
            }

            //Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            ToonStorage toonStorage = new ToonStorage(title, artist, day, genre, fileName, fileUri, file.getContentType(), file.getSize());
        
            toonStorageDAO.save(toonStorage);
        
            return toonStorage;

        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " +fileName + ". Please try again!", ex);
        }
    }


}
