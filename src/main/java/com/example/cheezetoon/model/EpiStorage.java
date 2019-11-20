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

    @Column(name="con_file_name")
    private String conFileName;

    @Column(name="con_file_uri")
    private String conFileUri;

    @Column(name="con_file_type")
    private String conFileType;

    @Column(name="con_size")
    private long conSize;

    public EpiStorage(){

    }

    public EpiStorage(String epiTitle, int webtoonId, String epiFileName, String epiFileUri, String epiFileType, Long epiSize, String conFileName, String conFileUri, String conFileType, Long conSize) {

        this.epiTitle = epiTitle;
        this.webtoonId = webtoonId;
        this.epiFileName = epiFileName;
        this.epiFileUri = epiFileUri;
        this.epiFileType = epiFileType;
        this.epiSize = epiSize;
        this.conFileName = conFileName;
        this.conFileUri = conFileUri;
        this.conFileType = conFileType;
        this.conSize = conSize;
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

    public String getConFileName() {
    	return this.conFileName;
    }
    public void setConFileName(String conFileName) {
    	this.conFileName = conFileName;
    }

    public String getConFileUri() {
    	return this.conFileUri;
    }
    public void setConFileUri(String conFileUri) {
    	this.conFileUri = conFileUri;
    }

    public String getConFileType() {
    	return this.conFileType;
    }
    public void setConFileType(String conFileType) {
    	this.conFileType = conFileType;
    }

    public long getConSize() {
    	return this.conSize;
    }
    public void setConSize(long conSize) {
    	this.conSize = conSize;
    }
}