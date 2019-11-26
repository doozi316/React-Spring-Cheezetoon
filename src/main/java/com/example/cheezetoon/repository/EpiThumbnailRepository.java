package com.example.cheezetoon.repository;

import com.example.cheezetoon.model.EpiThumbnail;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EpiThumbnailRepository extends JpaRepository<EpiThumbnail, Integer> {
    
}