package com.example.cheezetoon.payload;

import java.sql.Blob;

public class NewWebtoonDto{

    private Long id;
    private String title;
    private String artist;
    private String genre;
    private Blob thumbnail;
    private String day;




    public Long getId() {
        return this.id;
    }
    public void setId(Long id) {
        this.id = id;
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


    public String getGenre() {
    	return this.genre;
    }
    public void setGenre(String genre) {
    	this.genre = genre;
    }


    public Blob getThumbnail() {
    	return this.thumbnail;
    }
    public void setThumbnail(Blob thumbnail) {
    	this.thumbnail = thumbnail;
    }
    public String getDay() {
        return this.day;
    }
    public void setDay(String day) {
        this.day = day;
    }
    
}