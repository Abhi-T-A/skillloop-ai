package com.abhi.skillloopai.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.abhi.skillloopai.entity.VivaResult;

public interface VivaResultRepository
        extends JpaRepository<VivaResult, Long> {

    java.util.List<VivaResult> findByUser(com.abhi.skillloopai.entity.User user);

    java.util.Optional<VivaResult> findByIdAndUser(Long id, com.abhi.skillloopai.entity.User user);
}