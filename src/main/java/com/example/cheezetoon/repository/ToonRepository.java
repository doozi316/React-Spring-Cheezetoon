package com.example.cheezetoon.repository;

import com.example.cheezetoon.model.Toon;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ToonRepository extends JpaRepository<Toon, Integer>{
    
}