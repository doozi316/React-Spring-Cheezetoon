package com.example.cheezetoon.repository;

import java.util.Optional;

import javax.transaction.Transactional;

import com.example.cheezetoon.model.ToonThumbnail;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ToonThumbnailRepository extends JpaRepository<ToonThumbnail, Integer> {
    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value="Delete from toon_thumbnail where toon_no = ?1", nativeQuery = true)
    void deleteToonThumbnail(Integer id);
    
    @Query(value="Select * from toon_thumbnail t where t.toon_no = ?1", nativeQuery = true)
    Optional<ToonThumbnail> getToonThumbnailByID(int id);
}