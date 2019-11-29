package com.example.cheezetoon.repository;

import java.util.Optional;

import javax.transaction.Transactional;

import com.example.cheezetoon.model.EpiThumbnail;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EpiThumbnailRepository extends JpaRepository<EpiThumbnail, Integer> {
    @Query(value= "Select * from epi_thumbnail e where e.episode_no = ?1", nativeQuery = true)
    Optional<EpiThumbnail> getEpiThumbnailById(int id);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value="delete from epi_thumbnail where episode_no = ?1",nativeQuery = true)
    Integer deleteEpiThumbnail(Integer id);
}