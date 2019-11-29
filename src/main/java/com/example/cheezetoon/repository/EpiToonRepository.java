package com.example.cheezetoon.repository;

import java.util.Optional;

import javax.transaction.Transactional;

import com.example.cheezetoon.model.EpiToon;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EpiToonRepository extends JpaRepository<EpiToon, Integer>{
    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value="delete from epi_toon where epi_no = ?1",nativeQuery = true)
    void deleteEpiToon(Integer id);

    @Query(value="select * from epi_toon where epi_no=?1", nativeQuery = true)
    Optional<EpiToon> getEpiToon(Integer id);

    
}