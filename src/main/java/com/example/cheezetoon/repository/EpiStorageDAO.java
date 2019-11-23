package com.example.cheezetoon.repository;

import com.example.cheezetoon.model.EpiStorage;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EpiStorageDAO extends JpaRepository<EpiStorage, Integer> {
    
}