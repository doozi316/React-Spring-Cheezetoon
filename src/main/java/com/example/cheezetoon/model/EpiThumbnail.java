package com.example.cheezetoon.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.example.cheezetoon.model.audit.DateAudit;
import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="epi_thumbnail")
public class EpiThumbnail extends DateAudit {
    @Id
    @Column(name="eth_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ethNo;

    @Column(name="file_name")
    private String fileName;

    @Column(name="file_type")
    private String fileType;

    @Column(name="file_uri")
    private String fileUri;

    @Column(name="file_size")
    private long fileSize;

    @JsonBackReference
    @OneToOne
    @JoinColumn(name="episode_no")
    private Episode episode;

    public EpiThumbnail(){

    }

    public EpiThumbnail(String fileName, String fileType, String fileUri, Long fileSize){
        this.fileName = fileName;
        this.fileUri = fileUri;
        this.fileType = fileType;
        this.fileSize = fileSize;
    }
}