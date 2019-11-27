package com.example.cheezetoon.repository;

import java.util.Collection;

import com.example.cheezetoon.model.Episode;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EpisodeRepository extends JpaRepository<Episode, Integer> {
    
    @Query(value="Select * from episode e where e.webtoon_id = ?1", nativeQuery = true)
    Collection<Episode> getEpiById(Integer id);
}