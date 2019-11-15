package com.example.cheezetoon.repository;

import com.example.cheezetoon.model.NewWebtoon;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewWebtoonRepository extends JpaRepository<NewWebtoon, Long>{
    
}