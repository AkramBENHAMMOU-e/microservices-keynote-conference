package com.tp.conferenceservice.repository;

import com.tp.conferenceservice.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.UUID;

@RepositoryRestResource
public interface ReviewRepository extends JpaRepository<Review, UUID> {
}
