package com.tp.conferenceservice.repository;

import com.tp.conferenceservice.entities.Conference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.UUID;

@RepositoryRestResource
public interface ConferenceRepository extends JpaRepository<Conference, UUID> {

}
