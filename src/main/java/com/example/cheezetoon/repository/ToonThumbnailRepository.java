package com.example.cheezetoon.repository;

import com.example.cheezetoon.model.ToonThumbnail;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ToonThumbnailRepository extends JpaRepository<ToonThumbnail, Integer> {
    
}