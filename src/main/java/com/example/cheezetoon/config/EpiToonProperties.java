package com.example.cheezetoon.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "toon")
public class EpiToonProperties {
    private String uploadDir;

    public String getUploadDir(){
        return uploadDir;
    }

    public void setUploadDir(String uploadDir) {
        this.uploadDir = uploadDir;
    }
}