package com.example.cheezetoon.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.example.cheezetoon.model.audit.DateAudit;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "toon")
public class Toon extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="tno")
    private Integer tno;

    private String title;

    private String artist;

    private String day;

    private String genre;
    
    @JsonManagedReference
    @OneToOne(fetch=FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "toon")
    private ToonThumbnail toonThumbnail;


    public Toon(){

    }

    public Toon(String title, String artist, String day, String genre){
        this.title = title;
        this.artist = artist;
        this.day = day;
        this.genre = genre;
    }

}