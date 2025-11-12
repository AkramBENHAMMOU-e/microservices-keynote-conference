package com.tp.keynoteserice.repository;

import com.tp.keynoteserice.entities.Keynote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.UUID;
@RepositoryRestResource
public interface KeynoteRepository extends JpaRepository<Keynote, UUID> {
}
