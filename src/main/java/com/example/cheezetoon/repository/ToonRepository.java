package com.example.cheezetoon.repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.example.cheezetoon.model.Toon;
import com.example.cheezetoon.model.ToonThumbnail;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ToonRepository extends JpaRepository<Toon, Integer>{
    
    @Query(value="Select t.tno , t.title from toon t", nativeQuery = true)
    List<Map<String, Object>> getToonIdAndName();
    
    @Query(value="Select * from toon_thumbnail t where t.toon_no = ?1", nativeQuery = true)
    List<Map<String, Object>> getToonThumbnailByID(Integer id);
}