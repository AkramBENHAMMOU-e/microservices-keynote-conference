package com.tp.conferenceservice.services;

import com.tp.conferenceservice.entities.Conference;
import com.tp.conferenceservice.feign.KeynoteRestClient;
import com.tp.conferenceservice.model.Keynote;
import com.tp.conferenceservice.repository.ConferenceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ConferenceService {

    private final ConferenceRepository conferenceRepository;
    private final KeynoteRestClient keynoteRestClient;

    public ConferenceService(ConferenceRepository conferenceRepository, KeynoteRestClient keynoteRestClient) {
        this.conferenceRepository = conferenceRepository;
        this.keynoteRestClient = keynoteRestClient;
    }


    public Conference assigneKeynotesToConference(List<UUID> keynoteIds, UUID conferenceId) {
        Conference conf = conferenceRepository.findById(conferenceId).orElseThrow();
        conf.setKeynoteIds(keynoteIds);

        return conferenceRepository.save(conf);
    }

    public void deleteKeynoteFromConference(UUID conferenceId, UUID keynoteId) {
        Conference conf = conferenceRepository.findById(conferenceId).orElseThrow();
        conf.setKeynoteIds(conf.getKeynoteIds()
                .stream()
                .filter(id -> !id.equals(keynoteId))
                .collect(Collectors.toList()));
        conferenceRepository.save(conf);
    }

}
