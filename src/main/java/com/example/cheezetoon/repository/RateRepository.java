package com.example.cheezetoon.repository;

import java.util.Optional;

import com.example.cheezetoon.model.Rate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RateRepository extends JpaRepository<Rate, Integer>{
    @Query(value= "Select * from rate r where r.episode_id = ?1 and r.username = ?2", nativeQuery = true)
    Optional<Rate> getRateByEpiId(int id, String user);

    @Query(value="Select avg(rate) from rate where episode_id = ?1", nativeQuery = true)
    Double getAvgRate(int id);
}