package com.example.cheezetoon.repository;

import com.example.cheezetoon.model.ToonStorage;

import org.springframework.data.repository.CrudRepository;

public interface ToonStorageDAO extends CrudRepository<ToonStorage, Integer> {
    
}