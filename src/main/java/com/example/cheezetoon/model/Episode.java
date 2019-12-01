package com.example.cheezetoon.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.example.cheezetoon.model.audit.DateAudit;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name="episode") 
public class Episode extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name ="eno")
    private Integer eno;

    @Column(name="epi_title")
    private String epiTitle;

    @Column(name="webtoon_id")
    private Integer webtoonId;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="toon_id")
    private Toon toon;

    // @Column(name="webtoon_id")
    // private Integer webtoonId;

    @JsonManagedReference
    @OneToOne(fetch=FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            mappedBy = "episode")
    private EpiThumbnail epiThumbnail;

    @JsonManagedReference
    @OneToOne(fetch=FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            mappedBy = "episode")
    private EpiToon epiToon;

    @JsonManagedReference
    @OneToMany(fetch=FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy="episode")
    private Set<Comment> comments = new HashSet<>();

    public Episode(){
        
    }

    public Episode(String epiTitle, Integer webtoonId, Toon toon){
        this.epiTitle= epiTitle;
        this.toon = toon;
        this.webtoonId = webtoonId;
    }


}