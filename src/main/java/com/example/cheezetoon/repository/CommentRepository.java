package com.example.cheezetoon.repository;

import java.util.Collection;

import com.example.cheezetoon.model.Comment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    @Query(value="Select * from comment c where c.epi_id = ?1", nativeQuery = true)
    Collection<Comment> getComment(Integer id);
}