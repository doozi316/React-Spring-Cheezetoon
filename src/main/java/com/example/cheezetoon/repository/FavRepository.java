package com.example.cheezetoon.repository;

import java.util.Optional;

import javax.transaction.Transactional;

import com.example.cheezetoon.model.Fav;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface FavRepository extends JpaRepository<Fav, Integer>{
    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value="Delete from fav where tid=?1 and username=?2", nativeQuery=true)
    void deleteFav(Integer id, String user);

    
    @Query(value="Select * from fav f where f.tid=?1 and f.username=?2", nativeQuery=true)
    Optional<Fav> getFav(Integer id, String user);
}