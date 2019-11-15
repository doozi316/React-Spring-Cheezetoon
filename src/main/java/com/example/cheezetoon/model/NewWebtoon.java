package com.example.cheezetoon.model;


import java.sql.Blob;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;



@Entity
@Table(name = "new_webtoon")
public class NewWebtoon {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Long getId() {
        return this.id;
    }
    public void setId(Long id) {
        this.id = id;
    }


    @Column(name = "TITLE")
    private String title;

    public String getTitle() {
        return this.title;
    }
    public void setTitle(String title) {
        this.title = title;
    }



    @Column(name="ARTIST")
    private String artist;

    public String getArtist() {
        return this.artist;
    }
    public void setArtist(String artist) {
        this.artist = artist;
    }

    
    @Column(name="GENRE")
    private String genre;

    public String getGenre() {
 	    return this.genre;
    }
    public void setGenre(String genre) {
 	    this.genre = genre;
    }


    @Column(name="day")
    private String day;

    public String getDay() {
        return this.day;
    }
    public void setDay(String day) {
        this.day = day;
    }


    @Lob
    private Blob thumbnail;

    public Blob getThumbnail() {
 	    return this.thumbnail;
    }
    public void setThumbnail(Blob thumbnail) {
 	    this.thumbnail = thumbnail;
    }

}