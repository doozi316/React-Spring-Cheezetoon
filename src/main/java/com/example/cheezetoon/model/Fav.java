package com.example.cheezetoon.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.example.cheezetoon.model.audit.DateAudit;
import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="fav")
public class Fav extends DateAudit{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="fno")
    private Integer fno;

    private String title;

    private String username;

    private Integer webtoonId;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="tid")
    private Toon toon;

    public Fav(){

    }

    public Fav(String username, String title, Integer webtoonId){
        this.title = title;
        this.username=username;
        this.webtoonId = webtoonId;
    }

}