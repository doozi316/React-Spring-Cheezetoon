package com.example.cheezetoon.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.example.cheezetoon.model.audit.DateAudit;

@Entity
@Table(name = "epi_storage")
public class EpiStorage extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="epi_title")
    private String epiTitle;

    @Column(name="webtoon_Id")
    private int webtoonId;

    @Column(name="epi_file_name")
    private String epiFileName;
    
    @Column(name="epi_file_uri")
    private String epiFileUri;

    @Column(name="epi_file_type")
    private String epiFileType;

    @Column(name="epi_size")
    private long epiSize;

    public EpiStorage(){

    }

    public EpiStorage(String epiTitle, int webtoonId, String epiFileName, String epiFileUri, String epiFileType, Long epiSize) {

        this.epiTitle = epiTitle;
        this.webtoonId = webtoonId;
        this.epiFileName = epiFileName;
        this.epiFileUri = epiFileUri;
        this.epiFileType = epiFileType;
        this.epiSize = epiSize;
    }

    public int getId() {
        return this.id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getEpiTitle() {
    	return this.epiTitle;
    }
    public void setEpiTitle(String epiTitle) {
    	this.epiTitle = epiTitle;
    }

    public String getEpiFileName() {
    	return this.epiFileName;
    }
    public void setEpiFileName(String epiFileName) {
    	this.epiFileName = epiFileName;
    }

    public String getEpiFileUri() {
    	return this.epiFileUri;
    }
    public void setEpiFileUri(String epiFileUri) {
    	this.epiFileUri = epiFileUri;
    }

    public String getEpiFileType() {
    	return this.epiFileType;
    }
    public void setEpiFileType(String epiFileType) {
    	this.epiFileType = epiFileType;
    }

    public long getEpiSize() {
    	return this.epiSize;
    }
    public void setEpiSize(long epiSize) {
    	this.epiSize = epiSize;
    }
}