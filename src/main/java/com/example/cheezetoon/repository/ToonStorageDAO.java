package com.example.cheezetoon.repository;


import java.util.Collection;
import java.util.List;
import java.util.Map;

import com.example.cheezetoon.model.ToonStorage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository
public interface ToonStorageDAO extends JpaRepository<ToonStorage, Integer> {

    @Query(value="Select t.id , t.title from toon_storage t", nativeQuery = true)
    List<Map<String, Object>> getToonIdAndName();


    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value="update toon_storage t set t.file_name = NULL, t.file_uri = NULL, t.file_type = NULL, t.size = NULL where t.id = ?",nativeQuery = true)
    Integer deleteFileInfo(Integer id);

}