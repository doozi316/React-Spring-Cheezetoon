package com.example.cheezetoon.payload;

public class ToonStorageResponse {
    private String fileName;
    private String fileUri;
    private String fileType;
    private long size;

    public ToonStorageResponse(String fileName, String fileUri, String fileType, long size) {
        this.fileName = fileName;
        this.fileUri = fileUri;
        this.fileType = fileType;
        this.size = size;
    }

    public String getFileName() {
    	return this.fileName;
    }
    public void setFileName(String fileName) {
    	this.fileName = fileName;
    }


    public String getFileUri() {
    	return this.fileUri;
    }
    public void setFileUri(String fileUri) {
    	this.fileUri = fileUri;
    }


    public String getFileType() {
    	return this.fileType;
    }
    public void setFileType(String fileType) {
    	this.fileType = fileType;
    }


    public long getSize() {
    	return this.size;
    }
    public void setSize(long size) {
    	this.size = size;
    }

    
}