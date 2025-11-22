package com.tp.conferenceservice.web;

import com.tp.conferenceservice.entities.Conference;
import com.tp.conferenceservice.repository.ConferenceRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class ConferenceController {

    private final ConferenceRepository conferenceRepository;

    public ConferenceController(ConferenceRepository conferenceRepository) {
        this.conferenceRepository = conferenceRepository;
    }

    @GetMapping("/conferences")
    public List<Conference> getAllConferences(){
        return conferenceRepository.findAll();
    }

    @GetMapping("/conferences/{id}")
    public Conference getConferenceById(@PathVariable UUID id){
        return conferenceRepository.findById(id).get();
    }

    @PostMapping("/conferences")
    public Conference addConference(@RequestBody Conference conference){
        return conferenceRepository.save(conference);
    }
    @PutMapping("/conferences/{id}")
    public Conference updateConference(@PathVariable UUID id,@RequestBody Conference conference){
        Conference c = conferenceRepository.findById(id).get();
        c.setTitre(conference.getTitre());
        c.setDuree(conference.getDuree());
        c.setNbreInscrit(conference.getNbreInscrit());
        c.setScore(conference.getScore());
        c.setType(conference.getType());
        c.setKeynotes(conference.getKeynotes());
        return conferenceRepository.save(c);
    }

    @DeleteMapping("/conferences/{id}")
    public void deleteConference(@PathVariable UUID id){
        conferenceRepository.deleteById(id);
    }

}
