package com.example.cheezetoon.repository;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import com.example.cheezetoon.model.Toon;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ToonRepository extends JpaRepository<Toon, Integer>{
    
    @Query(value="Select t.tno , t.title from toon t", nativeQuery = true)
    List<Map<String, Object>> getToonIdAndName();
   }