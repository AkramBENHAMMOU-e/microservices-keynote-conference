package com.tp.conferenceservice.web;

import com.tp.conferenceservice.entities.Conference;
import com.tp.conferenceservice.enums.ConferenceType;
import com.tp.conferenceservice.feign.KeynoteRestClient;
import com.tp.conferenceservice.model.Keynote;
import com.tp.conferenceservice.repository.ConferenceRepository;
import com.tp.conferenceservice.services.ConferenceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class ConferenceController {

    private static final Logger log = LoggerFactory.getLogger(ConferenceController.class);

    private final ConferenceRepository conferenceRepository;
    private final KeynoteRestClient keynoteRestClient;
    private final ConferenceService conferenceService;

    public ConferenceController(ConferenceRepository conferenceRepository, KeynoteRestClient keynoteRestClient, ConferenceService conferenceService) {
        this.conferenceRepository = conferenceRepository;
        this.keynoteRestClient = keynoteRestClient;
        this.conferenceService = conferenceService;
    }

    @GetMapping("/conferences")
    public List<Conference> getAllConferences(){
       List<Conference> conferences = conferenceRepository.findAll();
       try {
           List<Keynote> keynotes = keynoteRestClient.getAllKeynotes();
           if (!conferences.isEmpty()) {
               conferences.get(0).setKeynotes(keynotes);
           }
       } catch (Exception ex) {
           log.warn("Unable to fetch keynotes for conferences list: {}", ex.getMessage());
       }
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
        c.setDate(conference.getDate());
        c.setScore(conference.getScore());
        c.setType(conference.getType());
        c.setKeynotes(conference.getKeynotes());
        return conferenceRepository.save(c);
    }

    @DeleteMapping("/conferences/{id}")
    public void deleteConference(@PathVariable UUID id){
        conferenceRepository.deleteById(id);
    }


    @GetMapping("/types")
    public List<ConferenceType> getAllTypes(){
        return List.of(ConferenceType.values());
    }

    @GetMapping("/conferences/{confId}/keynotes")
    public List<Keynote> getKeynotesByConferenceId(@PathVariable UUID confId){
        List<UUID> keynotesIds = conferenceRepository.findById(confId).get().getKeynoteIds();
        return keynoteRestClient.getAllKeynotes().stream().filter(keynote -> keynotesIds.contains(keynote.getId())).toList();
    }

    @PostMapping("/conferences/{confId}/keynotes")
    public Conference addKeynoteToConference(@PathVariable UUID confId,@RequestBody List<UUID> keynoteIds){
        return conferenceService.assigneKeynotesToConference(keynoteIds,confId);
    }

    @DeleteMapping("/conferences/{confId}/keynotes/{keynoteId}")
    public void deleteKeynoteFromConference(@PathVariable UUID confId,@PathVariable UUID keynoteId){
        conferenceService.deleteKeynoteFromConference(confId,keynoteId);
    }
}
