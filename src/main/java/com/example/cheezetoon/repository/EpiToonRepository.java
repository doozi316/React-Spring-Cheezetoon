package com.example.cheezetoon.repository;

import com.example.cheezetoon.model.EpiToon;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EpiToonRepository extends JpaRepository<EpiToon, Integer>{

}