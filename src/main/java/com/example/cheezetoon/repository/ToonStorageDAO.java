package com.example.cheezetoon.repository;


import java.util.List;
import java.util.Map;

import com.example.cheezetoon.model.ToonStorage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface ToonStorageDAO extends JpaRepository<ToonStorage, Integer> {

    @Query(value="Select t.id , t.title from toon_storage t", nativeQuery = true)
    List<Map<String, Object>> getToonIdAndName();
}