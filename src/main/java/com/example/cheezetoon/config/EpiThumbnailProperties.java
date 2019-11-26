package com.example.cheezetoon.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "thumbnail")
public class EpiThumbnailProperties {
    private String uploadDir;

    public String getUploadDir(){
        return uploadDir;
    }

    public void setUploadDir(String uploadDir) {
        this.uploadDir = uploadDir;
    }
}