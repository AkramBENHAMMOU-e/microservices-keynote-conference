package com.tp.conferenceservice.web;

import com.tp.conferenceservice.entities.Conference;
import com.tp.conferenceservice.feign.KeynoteRestClient;
import com.tp.conferenceservice.model.Keynote;
import com.tp.conferenceservice.repository.ConferenceRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class ConferenceController {

    private final ConferenceRepository conferenceRepository;
    private final KeynoteRestClient keynoteRestClient;

    public ConferenceController(ConferenceRepository conferenceRepository, KeynoteRestClient keynoteRestClient) {
        this.conferenceRepository = conferenceRepository;
        this.keynoteRestClient = keynoteRestClient;
    }

    @GetMapping("/conferences")
    public List<Conference> getAllConferences(){
       List<Conference> conferences = conferenceRepository.findAll();
       List<Keynote> keynotes = keynoteRestClient.getAllKeynotes();
       conferences.get(0).setKeynotes(keynotes);
       return conferences;
    }

    @GetMapping("/conferences/{id}")
    public Conference getConferenceById(@PathVariable UUID id){
        return conferenceRepository.findById(id).get();
    }

    @PostMapping("/conferences")
    public Conference addConference(@RequestBody Conference conference){
        if (conference.getId() == null) {
            conference.setId(UUID.randomUUID());
        }
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
