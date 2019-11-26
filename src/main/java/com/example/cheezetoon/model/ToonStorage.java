package com.example.cheezetoon.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.example.cheezetoon.model.audit.DateAudit;




@Entity
@Table(name="toon_storage")
public class ToonStorage extends DateAudit{

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;

    @Column(name="title")
    private String title;

    @Column(name="artist")
    private String artist;

    @Column(name="day")
    private String day;

    @Column(name="genre")
    private String genre;

    @Column(name="file_name")
    private String fileName;
    
    @Column(name="file_uri")
    private String fileUri;

    @Column(name="file_type")
    private String fileType;

    @Column(name="size")
    private long size;

    public ToonStorage(){
    }

    public ToonStorage(String title, String artist, String day, String genre, String fileName, String fileUri, String fileType, Long size) {
        this.title = title;
        this.artist = artist;
        this.day = day;
        this.genre = genre;
        this.fileName = fileName;
        this.fileUri = fileUri;
        this.fileType = fileType;
        this.size = size;
    }

    public Integer getId() {
    	return this.id;
    }
    public void setId(Integer id) {
    	this.id = id;
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

    public String getTitle() {
    	return this.title;
    }
    public void setTitle(String title) {
    	this.title = title;
    }

    public String getArtist() {
    	return this.artist;
    }
    public void setArtist(String artist) {
    	this.artist = artist;
    }

    public String getDay() {
        return this.day;
    }
    public void setDay(String day) {
        this.day = day;
    }
 
    public String getGenre() {
    	return this.genre;
    }
    public void setGenre(String genre) {
    	this.genre = genre;
    }
}